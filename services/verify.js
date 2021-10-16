import { createRequire } from 'module';
import fs from 'fs';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import config from '../config/index.js';
import moment from 'moment';
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

  isEndswitchActivated() {
    return this.data.endswitch;
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
    return await bcrypt.compare(password, config.password);
  }

  async initiateSwitch() {
    this.data.activate = true;
    this.data.token = nanoid();
    fs.writeFile(this.pathData, JSON.stringify(this.data, null, 2), (err) => {
      if (err) {
        throw new Error('Could not save!');
      }
    });
    return this.data.token;
  }

  async activateSwitch() {
    this.data.endswitch = true;
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
    return this.data.last_updated;
  }
  async calculateDate(startDate) {
    let end = moment.unix(Date.now());
    let start = moment.unix(startDate);
    let diff = Math.ceil(moment.duration(end.diff(start)).asDays());
    return diff;
  }
}
