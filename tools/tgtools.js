const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram');
const TELEGRAM_SESSIONS_DIR = path.join(__dirname, '../database/telegramSessions');
const SPAM_REPORTS_DIR = path.join(__dirname, '../database/spamReports');
const KEY_FILE = path.join(__dirname, '../database', 'keyList.json');
if (!fs.existsSync(TELEGRAM_SESSIONS_DIR)) {
  fs.mkdirSync(TELEGRAM_SESSIONS_DIR, { recursive: true });
}
if (!fs.existsSync(SPAM_REPORTS_DIR)) {
  fs.mkdirSync(SPAM_REPORTS_DIR, { recursive: true });
}

const TELEGRAM_API_ID = 32526121;
const TELEGRAM_API_HASH = "e2bdf10b44eb87eca820b0e1c59e366a";

const pendingLogins = new Map();
const activeReports = new Map();
const sessionPasswordVerifications = new Map();

let sesionKey = {};

class ToolsController {
  static validateKey(key) {
    const keyInfo = sesionKey[key]
    if (!keyInfo) {
      return { valid: false, keyInfo };
    }
    console.log(keyInfo.username, key);
    return { valid: true, keyInfo };
  }

  static getUserTelegramDir(username) {
    const userDir = path.join(TELEGRAM_SESSIONS_DIR, username);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    return userDir;
  }

  static saveTelegramSession(username, phone, sessionString) {
    try {
      const userDir = ToolsController.getUserTelegramDir(username);
      const sessionFile = path.join(userDir, `${phone.replace('+', '')}.txt`);
      fs.writeFileSync(sessionFile, sessionString);
      return true;
    } catch (error) {
      return false;
    }
  }

  static getTelegramSession(username, phone) {
    try {
      const userDir = ToolsController.getUserTelegramDir(username);
      const sessionFile = path.join(userDir, `${phone.replace('+', '')}.txt`);
      if (!fs.existsSync(sessionFile)) {
        return null;
      }
      return fs.readFileSync(sessionFile, 'utf-8');
    } catch (error) {
      return null;
    }
  }

  static deleteTelegramSession(username, phone) {
    try {
      const userDir = ToolsController.getUserTelegramDir(username);
      const sessionFile = path.join(userDir, `${phone.replace(/\D/g, '')}.txt`);
      if (fs.existsSync(sessionFile)) {
        fs.unlinkSync(sessionFile);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  static getTelegramSessionsList(username) {
    try {
      const userDir = ToolsController.getUserTelegramDir(username);
      const files = fs.readdirSync(userDir);
      const sessionsList = [];
      files.forEach(file => {
        if (file.endsWith('.txt')) {
          const phone = `+${file.replace('.txt', '')}`;
          const sessionFile = path.join(userDir, file);
          const stats = fs.statSync(sessionFile);
          sessionsList.push({
            phone,
            username,
            lastModified: stats.mtime,
            filePath: sessionFile,
            isActive: true
          });
        }
      });
      return sessionsList.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    } catch (error) {
      return [];
    }
  }

  static async checkTelegramSession(username, phone) {
    try {
      const sessionString = ToolsController.getTelegramSession(username, phone);
      if (!sessionString) {
        return false;
      }
      const client = new TelegramClient(new StringSession(sessionString), TELEGRAM_API_ID, TELEGRAM_API_HASH, {
          connectionRetries: 5,
          timeout: 30000,
          floodSleepThreshold: 120,
          retryDelay: 2000,
          autoReconnect: true,
          updateWorkers: 0
      });
      await client.connect();
      await client.getMe();
      await client.disconnect();
      return true;
    } catch (error) {
      return false;
    }
  }

  static saveSpamReport(reportId, reportData) {
    try {
      const reportFile = path.join(SPAM_REPORTS_DIR, `${reportId}.json`);
      fs.writeFileSync(reportFile, JSON.stringify(reportData, null, 2));
      return true;
    } catch (error) {
      return false;
    }
  }

  static getSpamReport(reportId) {
    try {
      const reportFile = path.join(SPAM_REPORTS_DIR, `${reportId}.json`);
      if (!fs.existsSync(reportFile)) {
        return null;
      }
      const data = fs.readFileSync(reportFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  static cleanupExpiredLogins() {
    const now = Date.now();
    for (const [loginId, data] of pendingLogins.entries()) {
      if (now - data.createdAt > 300000) {
        if (data.client) {
          try {
            data.client.disconnect();
          } catch (e) {}
        }
        pendingLogins.delete(loginId);
      }
    }
  }

  static async initiateUnifiedTelegramLogin(req, res) {
    const { key, phone } = req.query;
    if (!key) {
      return res.json({ valid: false, error: true, message: "key not defined" });
    }
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    if (!phone) {
      return res.json({ valid: false, error: true, message: "Phone number is required" });
    }
    const phoneFormatted = phone.startsWith('+') ? phone : `+${phone}`;
    const loginId = uuidv4();
    const username = validation.keyInfo.username;
    const client = new TelegramClient(
      new StringSession(""),
      TELEGRAM_API_ID,
      TELEGRAM_API_HASH,
      {
          connectionRetries: 5,
          timeout: 30000,
          floodSleepThreshold: 120,
          retryDelay: 2000,
          autoReconnect: true,
          updateWorkers: 0
      }
    );
    pendingLogins.set(loginId, {
      username,
      phone: phoneFormatted,
      client,
      step: 'wait_code',
      resolve: null,
      createdAt: Date.now()
    });
    (async () => {
      try {
        await client.start({
          phoneNumber: async () => phoneFormatted,
          phoneCode: async () => {
            return new Promise((resolve) => {
              const data = pendingLogins.get(loginId);
              if (!data) throw new Error("Login expired");
              data.step = 'wait_code';
              data.resolve = resolve;
              pendingLogins.set(loginId, data);
            });
          },
          password: async () => {
            return new Promise((resolve) => {
              const data = pendingLogins.get(loginId);
              if (!data) throw new Error("Login expired");
              data.step = 'wait_password';
              data.resolve = resolve;
              pendingLogins.set(loginId, data);
            });
          },
          onError: (err) => {
          condole.log(err.message);
          }
        });
        const sessionString = client.session.save();
        ToolsController.saveTelegramSession(username, phoneFormatted, sessionString);
        pendingLogins.delete(loginId);
      } catch (err) {
        pendingLogins.delete(loginId);
        try { await client.disconnect(); } catch {}
      }
    })();
    return res.json({
      valid: true,
      loginId,
      step: 'wait_code',
      message: "OTP sent, please submit code"
    });
  }

  static async submitTelegramAuth(req, res) {
    const { key, loginId, input } = req.query;
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    const loginData = pendingLogins.get(loginId);
    if (!loginData) {
      return res.json({ valid: false, error: true, message: "Invalid or expired login" });
    }
    if (!loginData.resolve) {
      return res.json({ valid: false, error: true, message: "Not waiting for input" });
    }
    loginData.resolve(input);
    loginData.resolve = null;
    if (loginData.step === 'wait_code') {
      return res.json({
        valid: true,
        step: 'wait_password',
        message: "OTP accepted. If 2FA is enabled, please submit password."
      });
    } else if (loginData.step === 'wait_password') {
      return res.json({
        valid: true,
        step: 'completed',
        message: "Password accepted. Login process completing..."
      });
    }
    return res.json({
      valid: true,
      step: loginData.step,
      message: "Authentication in progress..."
    });
  }

  static async checkLoginStatus(req, res) {
    const { key, loginId } = req.query;
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    const loginData = pendingLogins.get(loginId);
    if (!loginData) {
      const username = validation.keyInfo.username;
      const sessions = ToolsController.getTelegramSessionsList(username);
      const recentSession = sessions.find(s => 
        new Date(s.lastModified) > new Date(Date.now() - 60000)
      );
      if (recentSession) {
        return res.json({
          valid: true,
          completed: true,
          phone: recentSession.phone,
          message: "Login completed successfully"
        });
      }
      return res.json({ valid: false, error: true, message: "Invalid or expired login" });
    }
    return res.json({
      valid: true,
      completed: false,
      step: loginData.step,
      message: `Waiting for ${loginData.step.replace('wait_', '')}`
    });
  }

  static async verifySessionPassword(req, res) {
    const { key, phone, password } = req.body;
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    if (!phone || !password) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Phone number and password parameters are required." 
      });
    }
    try {
      const username = validation.keyInfo.username;
      const phoneFormatted = phone.startsWith('+') ? phone : `+${phone}`;
      const sessionString = ToolsController.getTelegramSession(username, phoneFormatted);
      if (!sessionString) {
        return res.json({ valid: false, error: true, message: "Session not found." });
      }
      const client = new TelegramClient(new StringSession(sessionString), TELEGRAM_API_ID, TELEGRAM_API_HASH, {
          connectionRetries: 5,
          timeout: 30000,
          floodSleepThreshold: 120,
          retryDelay: 2000,
          autoReconnect: true,
          updateWorkers: 0
      });
      let loginSuccess = false;
      let newSessionString = null;
      try {
        await client.start({
          phoneNumber: async () => phoneFormatted,
          phoneCode: async () => {
            throw new Error('OTP_ALREADY_VERIFIED');
          },
          password: async () => password,
          onError: (err) => {
            throw err;
          }
        });
        loginSuccess = true;
        newSessionString = client.session.save();
        await client.disconnect();
      } catch (error) {
        try { await client.disconnect(); } catch (e) {}
        const message = error.message.includes('PASSWORD_HASH_INVALID') ? "Incorrect 2FA password." : `Verification failed: ${error.message}`;
        return res.json({ valid: false, error: true, message });
      }
      if (loginSuccess && newSessionString) {
        const success = ToolsController.saveTelegramSession(username, phoneFormatted, newSessionString);
        if (success) {
          return res.json({ 
            valid: true, 
            phone: phoneFormatted, 
            message: "Password verification successful. Session updated." 
          });
        } else {
          return res.json({ valid: false, error: true, message: "Failed to update session." });
        }
      }
      return res.json({ valid: false, error: true, message: "Unknown error occurred." });
    } catch (error) {
      return res.json({ valid: false, error: true, message: "Failed to verify password." });
    }
  }
    
  static async getTelegramSessions(req, res) {
    const { key } = req.query;
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    try {
      const username = validation.keyInfo.username;
      const sessions = ToolsController.getTelegramSessionsList(username);
      return res.json({ 
        valid: true, 
        sessions,
        message: "Sessions retrieved successfully." 
      });
    } catch (error) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Failed to get sessions. Please try again later." 
      });
    }
  }

  static async removeTeleSes(req, res) {
    const { key, phone } = req.query;
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    if (!phone) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Phone number parameter is required." 
      });
    }
    try {
      const username = validation.keyInfo.username;
      const success = await ToolsController.deleteTelegramSession(username, phone);
      if (success) {
        return res.json({ 
          valid: true, 
          phone,
          message: "Session deleted successfully." 
        });
      } else {
        return res.json({ 
          valid: false, 
          error: true, 
          message: "Session not found." 
        });
      }
    } catch (error) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Failed to delete session. Please try again later." 
      });
    }
  }

  static async refreshTelegramSessions(req, res) {
    const { key } = req.query;
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    try {
      const username = validation.keyInfo.username;
      const sessions = ToolsController.getTelegramSessionsList(username);
      const inactiveSessions = [];
      for (const session of sessions) {
        const isActive = await ToolsController.checkTelegramSession(username, session.phone);
        if (!isActive) {
          inactiveSessions.push(session.phone);
          ToolsController.deleteTelegramSession(username, session.phone);
        }
      }
      return res.json({ 
        valid: true, 
        inactiveSessions,
        message: `Sessions refreshed. Removed ${inactiveSessions.length} inactive sessions.` 
      });
    } catch (error) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Failed to refresh sessions. Please try again later." 
      });
    }
  }

  static async getSpamReportStatus(req, res) {
    const { key, reportId } = req.query;
    const validation = ToolsController.validateKey(key);
    if (!validation.valid) {
      return res.json({ valid: false, error: true, message: validation.message });
    }
    if (!reportId) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Report ID parameter is required." 
      });
    }
    try {
      const reportData = ToolsController.getSpamReport(reportId);
      if (!reportData) {
        return res.json({ 
          valid: false, 
          error: true, 
          message: "Report not found." 
        });
      }
      if (reportData.username !== validation.keyInfo.username) {
        return res.json({ 
          valid: false, 
          error: true, 
          message: "Access denied." 
        });
      }
      return res.json({ 
        valid: true, 
        report: reportData 
      });
    } catch (error) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Failed to get report status. Please try again later." 
      });
    }
  }

static async startSpamReport(req, res) {
  const { key, target, count, message, link } = req.body;
  const validation = ToolsController.validateKey(key);
  if (!validation.valid) {
    return res.json({ valid: false, error: true, message: validation.message });
  }
  const reportCount = parseInt(count) || 50;
  if (reportCount <= 0 || reportCount > 1000) {
    return res.json({ 
      valid: false, 
      error: true, 
      message: "Report count must be between 1 and 1000." 
    });
  }
  try {
    const username = validation.keyInfo.username;
    const sessions = ToolsController.getTelegramSessionsList(username);
    if (sessions.length === 0) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "No active sessions found. Please add a Telegram session first." 
      });
    }
    const reportId = uuidv4();
    let targetInfo = null;
    try {
      const firstSession = sessions[0];
      const sessionString = ToolsController.getTelegramSession(username, firstSession.phone);
      if (sessionString) {
        const client = new TelegramClient(new StringSession(sessionString), TELEGRAM_API_ID, TELEGRAM_API_HASH, {
          connectionRetries: 5,
          timeout: 30000,
          floodSleepThreshold: 120,
          retryDelay: 2000,
          autoReconnect: true,
          updateWorkers: 0
        });
        await client.connect();
        const entity = await client.getInputEntity(target);
        const fullEntity = await client.getEntity(entity);
        targetInfo = {
          id: fullEntity.id.toString(),
          username: fullEntity.username ? `@${fullEntity.username}` : null,
          firstName: fullEntity.firstName,
          lastName: fullEntity.lastName,
          name: `${fullEntity.firstName}${fullEntity.lastName ? ` ${fullEntity.lastName}` : ''}`
        };
        await client.disconnect();
      }
    } catch (error) {
      return res.json({ 
        valid: false, 
        error: true, 
        message: "Failed to get target information. Please check the target and try again." 
      });
    }
    const reportData = {
      id: reportId,
      username,
      target,
      targetInfo,
      count: reportCount,
      message: message || "This account is violating Telegram's terms of service through spam and scam activities.",
      link: link || "",
      sessions: sessions.map(s => s.phone),
      progress: 0,
      total: reportCount,
      status: "Initializing",
      startTime: new Date().toISOString(),
      completed: false
    };
    ToolsController.saveSpamReport(reportId, reportData);
    ToolsController._executeSpamReport(reportId);
    return res.json({ 
      valid: true, 
      reportId,
      targetInfo,
      message: "Spam report started successfully." 
    });
  } catch (error) {
    return res.json({ 
      valid: false, 
      error: true, 
      message: "Failed to start spam report. Please try again later." 
    });
  }
}

static async _executeSpamReport(reportId) {
  try {
    const reportData = ToolsController.getSpamReport(reportId);
    if (!reportData) return;
    reportData.status = "Getting target information...";
    ToolsController.saveSpamReport(reportId, reportData);
    const sessions = reportData.sessions;
    const target = reportData.target;
    const message = reportData.message;
    const link = reportData.link;
    const reportCount = reportData.count;
    const reportMessage = `Hello this user (@${reportData.targetInfo.name}) is a scammer and he is scamming people bye the name of helping them. He takes money and then blocks the user. It's a humble request to Telegam that please give a scam tag to this user so that users will come to know that he is a scammer. This will increase the trust of telegam in the eyes of its users.
Thanks!

Copyright Disclaimer under Section 107 of the copyright act 1976, allowance is made for fair use for purposes such as criticism, comment, news reporting, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favour of fair use.\n\nAccount Details:\nName: ${reportData.targetInfo.name}\nUsername: ${reportData.targetInfo.username || 'N/A'}\nID: ${reportData.targetInfo.id}\n\nLink: ${link}\n\nDue to the repeated and harmful nature of these actions, I strongly request that this account be immediately frozen to prevent further abuse and protect other Telegram users.`;
    const reasons = [
new Api.InputReportReasonSpam(),
new Api.InputReportReasonViolence(),
new Api.InputReportReasonPornography(),
new Api.InputReportReasonChildAbuse(),
new Api.InputReportReasonCopyright(),
new Api.InputReportReasonIllegalDrugs(),
new Api.InputReportReasonPersonalDetails(),
new Api.InputReportReasonOther(),
new Api.InputReportReasonSpam(),
new Api.InputReportReasonViolence(),
new Api.InputReportReasonPornography(),
new Api.InputReportReasonChildAbuse(),
new Api.InputReportReasonCopyright()
];
    let totalReports = 0;
    let successfulReports = 0;
    const reportsPerSession = Math.ceil(reportCount / sessions.length);
    for (const phone of sessions) {
      try {
        reportData.status = `Processing with session ${phone}...`;
        ToolsController.saveSpamReport(reportId, reportData);
        const sessionString = ToolsController.getTelegramSession(reportData.username, phone);
        if (!sessionString) continue;
        const client = new TelegramClient(new StringSession(sessionString), TELEGRAM_API_ID, TELEGRAM_API_HASH, {
          connectionRetries: 5,
          timeout: 30000,
          floodSleepThreshold: 120,
          retryDelay: 2000,
          autoReconnect: true,
          updateWorkers: 0
        });
        await client.connect();
        const peer = await client.getInputEntity(target);
        for (let i = 0; i < reportsPerSession && totalReports < reportCount; i++) {
          try {
            const reasonIndex = i % reasons.length;
            await client.invoke(new Api.account.ReportPeer({ 
              peer: peer, 
              reason: reasons[reasonIndex], 
              message: reportMessage 
            }));
            successfulReports++;
            totalReports++;
            reportData.progress = totalReports;
            ToolsController.saveSpamReport(reportId, reportData);
            console.log("Report", peer);
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error) {
            totalReports++;
            reportData.progress = totalReports;
            ToolsController.saveSpamReport(reportId, reportData);
          }
        }
        await client.disconnect();
      } catch (error) {
      }
      if (totalReports >= reportCount) {
        break;
      }
    }
    reportData.status = "Completed";
    reportData.completed = true;
    reportData.endTime = new Date().toISOString();
    ToolsController.saveSpamReport(reportId, reportData);
    setTimeout(async () => {
      try {
        reportData.status = "Checking target status...";
        ToolsController.saveSpamReport(reportId, reportData);
        const firstSession = sessions[0];
        const sessionString = ToolsController.getTelegramSession(reportData.username, firstSession.phone);
        if (sessionString) {
          const client = new TelegramClient(new StringSession(sessionString), TELEGRAM_API_ID, TELEGRAM_API_HASH, {
          connectionRetries: 5,
          timeout: 30000,
          floodSleepThreshold: 120,
          retryDelay: 2000,
          autoReconnect: true,
          updateWorkers: 0
          });
          try {
            await client.connect();
            const entity = await client.getEntity(target);
            const targetStatus = {
              id: entity.id.toString(),
              username: entity.username ? `@${entity.username}` : null,
              firstName: entity.firstName,
              lastName: entity.lastName,
              name: `${entity.firstName}${entity.lastName ? ` ${entity.lastName}` : ''}`,
              status: "Active",
              restricted: entity.restricted || false,
              verified: entity.verified || false,
              scam: entity.scam || false,
              fake: entity.fake || false,
              support: entity.support || false
            };
            reportData.status = "Completed - Target still active";
            reportData.targetStatus = targetStatus;
            reportData.completed = true;
            ToolsController.saveSpamReport(reportId, reportData);
          } catch (error) {
            let targetStatus = {
              status: "Unknown",
              error: error.message
            };
            if (error.message.toLowerCase().includes("not found") || 
                error.message.toLowerCase().includes("no user") ||
                error.message.toLowerCase().includes("deactivated") ||
                error.message.toLowerCase().includes("blocked")) {
              targetStatus.status = "Banned/Restricted";
              if (error.message.toLowerCase().includes("not found") || 
                  error.message.toLowerCase().includes("no user")) {
                targetStatus.reason = "Account not found";
              } else if (error.message.toLowerCase().includes("deactivated")) {
                targetStatus.reason = "Account deactivated";
              } else if (error.message.toLowerCase().includes("blocked")) {
                targetStatus.reason = "Account blocked";
              }
              reportData.status = "Completed - Target frozen/banned";
              reportData.targetStatus = targetStatus;
              reportData.completed = true;
              ToolsController.saveSpamReport(reportId, reportData);
            } else {
              reportData.status = "Completed - Target status unknown";
              reportData.targetStatus = targetStatus;
              reportData.completed = true;
              ToolsController.saveSpamReport(reportId, reportData);
            }
          }
          await client.disconnect();
        }
      } catch (error) {
        reportData.status = "Completed - Error checking status";
        reportData.targetStatus = {
          status: "Error",
          error: error.message
        };
        reportData.completed = true;
        ToolsController.saveSpamReport(reportId, reportData);
      }
    }, 60000);
  } catch (error) {
    const reportData = ToolsController.getSpamReport(reportId);
    if (reportData) {
      reportData.status = "Error";
      reportData.completed = true;
      reportData.targetStatus = {
        status: "Error",
        error: error.message
      };
      ToolsController.saveSpamReport(reportId, reportData);
    }
  }
}
}

module.exports = { ToolsController, sesionKey };