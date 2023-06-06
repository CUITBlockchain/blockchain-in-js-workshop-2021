class TrieNode {
    constructor() {
        this.children = {};  // 子节点
        this.isEnd = false;  // 是否是某个单词的结尾
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

// 插入单词到字典树中
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            if (!node.children[ch]) {
                node.children[ch] = new TrieNode();
            }
            node = node.children[ch];
        }
        node.isEnd = true;
    }

// 检查字典树中是否存在指定的单词
    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            if (!node.children[ch]) {
                return false;
            }
            node = node.children[ch];
        }
        return node.isEnd;
    }

// 检查字典树中是否存在以指定前缀开头的单词
    startsWith(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const ch = prefix[i];
            if (!node.children[ch]) {
                return false;
            }
            node = node.children[ch];
        }
        return true;
    }

// 删除指定单词
    delete(word) {
        const nodesInPath = [];
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            const ch = word[i];
            if (!node.children[ch]) {
                return false;  // 单词不存在
            }
            nodesInPath.push(node);
            node = node.children[ch];
        }
        if (!node.isEnd) {
            return false;  // 单词不存在
        }
        node.isEnd = false;  // 设置结尾标记为false
        if (Object.keys(node.children).length === 0) {
            for (let i = nodesInPath.length - 1; i >= 0; i--) {
                const parent = nodesInPath[i];
                delete parent.children[word[i+1]];  // 从后往前删
                if (Object.keys(parent.children).length > 0 || parent.isEnd) {
                    break;  // 如果父节点还有其他子节点或者仍然是某个单词结尾，则不继续删除
                }
            }
        }
        return true;
    }
}

const trie = new Trie();
trie.insert('hello');
trie.insert('world');
console.log(trie.search('hello'));     // true
console.log(trie.search('worlds'));    // false
console.log(trie.startsWith('hell'));  // true
console.log(trie.delete('hell'));      // false
console.log(trie.delete('hello'));     // true
console.log(trie.search('hello'));     // false