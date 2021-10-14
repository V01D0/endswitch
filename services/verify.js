import { createRequire } from 'module';
import fs from 'fs';
import { nanoid } from 'nanoid';

export default class VerifyService {
  constructor() {
    this.require = createRequire(import.meta.url);
    this.data = this.require('../data/main.json');
  }

  verifySwitch() {
    if (this.data.activate) {
      return true;
    } else {
      return false;
    }
  }

  initiateSwitch() {
    this.data.activate = true;
    this.data.token = nanoid();
    fs.writeFile(
      new URL('../data/main.json', import.meta.url),
      JSON.stringify(this.data, null, 2),
      (err) => {
        if (err) {
          throw new Error('Could not save!');
        }
      },
    );
  }

  updateTime() {
    this.data.last_updated = Date.now();
    this.data.activate = false;
    fs.writeFile(
      new URL('../data/main.json', import.meta.url),
      JSON.stringify(this.data, null, 2),
      (err) => {
        if (err) {
          throw new Error('Could not save!');
        }
      },
    );
  }
}
