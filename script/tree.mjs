import fs from 'node:fs';
import path from 'node:path';
export class Tree {
  /**
   * @type {Map<string,string>}
   */
  cache = new Map();
  /**
   *
   * @param {string} filepath
   * @returns {string}
   */
  read(filepath) {
    let content = this.cache.get(filepath);
    if (content === undefined) {
      content = fs.readFileSync(filepath, 'utf-8');
      this.cache.set(filepath, content);
    }
    return content;
  }
  has(filepath) {
    return this.cache.has(filepath) || fs.existsSync(filepath);
  }
  write(filepath, content) {
    this.cache.set(filepath, content);
  }
  save() {
    for (const [filepath, content] of this.cache) {
      const dirpath = path.dirname(filepath);
      if (fs.existsSync(dirpath) === false) {
        fs.mkdirSync(dirpath, { recursive: true });
      }
      fs.writeFileSync(filepath, content);
    }
    this.cache.clear();
  }
}
