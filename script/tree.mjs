import fs from 'node:fs';
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
    write(filepath, content) {
        this.cache.set(filepath, content);
    }
    save() {
        for (const [filepath, content] of this.cache) {
            fs.writeFileSync(filepath, content);
        }
        this.cache.clear();
    }
}