import { createRequire } from 'module';
import fs from 'fs';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import config from '../config/index.js';
export default class VerifyService {
  constructor() {
    this.require = createRequire(import.meta.url);
    this.data = this.require('../data/main.json');
    this.pathData = new URL('../data/main.json', import.meta.url);
  }

  verifySwitch() {
    if (this.data.activate) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return this.data.token;
  }

  async hashPassword(password) {
    bcrypt.hash(password, 10, (err, hash) => {
      console.log(hash);
      return hash;
    });
  }

  async verifyPassword(password) {
    console.log(config.password);
    bcrypt.compare(password, config.password, function (err, res) {
      return res;
    });
  }

  async initiateSwitch() {
    this.data.activate = true;
    this.data.token = nanoid();
    fs.writeFile(this.pathData, JSON.stringify(this.data, null, 2), (err) => {
      if (err) {
        throw new Error('Could not save!');
      }
    });
  }

  async updateTime() {
    this.data.last_updated = Date.now();
    this.data.activate = false;
    fs.writeFile(this.pathData, JSON.stringify(this.data, null, 2), (err) => {
      if (err) {
        throw new Error('Could not save!');
      }
    });
  }
}
