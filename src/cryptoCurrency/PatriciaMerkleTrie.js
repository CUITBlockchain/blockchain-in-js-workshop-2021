
import keccak256 from "keccak256";

// MPT节点类型
class Node {
    constructor() {
        this.type = '';
        this.value = '';
        this.children = {};
    }
}

// 叶子节点
class Leaf extends Node {
    constructor(key, value) {
        super();
        this.type = 'leaf';
        this.value = value;
        this.key = key;
    }
}

// 扩展节点
class Extension extends Node {
    constructor(key, node) {
        super();
        this.type = 'extension';
        this.key = key;
        this.children = {
            [key[0]]: node,
        };
    }
}

// 分支节点
class Branch extends Node {
    constructor() {
        super();
        this.type = 'branch';
        this.children = {};
    }
}

// MPT树
class Tree {
    constructor() {
        this.root = new Branch();
    }

// 插入地址
    insertAddress(address, balance) {
        const key = address.substr(2); // 去掉地址前的 0x
        let currentNode = this.root;

        for (let i = 0; i < key.length; i += 2) {
            const nibble = key.substr(i, 2); // 取每个数字的 nibble

            let child = currentNode.children[nibble];
            if (!child) {
// 如果节点不存在，则新建叶子节点
                child = new Leaf(nibble, balance);
                currentNode.children[nibble] = child;
                return;
            } else if (child.type === 'extension') {
// 如果节点是扩展节点，则继续向下遍历
                currentNode = child.children[nibble[0]];
                i -= 2; // 因为扩展节点占用了两个 nibble，所以要将 i 减去 2
            } else if (child.type === 'leaf') {
// 如果节点是叶子节点，则更新它的值
                child.value = balance;
                return;
            } else if (child.type === 'branch') {
// 如果节点是分支节点，则继续向下遍历
                currentNode = child;
            }
        }

// 更新根节点的哈希值
        this.root = this._updateBranchNode(this.root);
    }

// 更新分支节点
    _updateBranchNode(node) {
        let encodedNode = '';

        for (let i = 0; i < 16; i++) {
            const nibble = i.toString(16);
            const childNode = node.children[nibble] || new Leaf(nibble, '');
            encodedNode += childNode.type === 'extension' ? childNode.key : nibble + childNode.value;
        }

        const hash = keccak256(encodedNode).toString('hex');
        const branchNode = new Branch();
        branchNode.value = hash;

        for (let i = 0; i < 16; i++) {
            const nibble = i.toString(16);
            const childNode = node.children[nibble] || new Leaf(nibble, '');
            branchNode.children[nibble] = childNode.type === 'extension' ? childNode.children[nibble[0]] : childNode;
        }

        return branchNode;
    }

// 获取地址的余额
    getBalance(address) {
        const key = address.substr(2); // 去掉地址前的 0x
        let currentNode = this.root;

        for (let i = 0; i < key.length; i += 2) {
            const nibble = key.substr(i, 2); // 取每个数字的 nibble

            let child = currentNode.children[nibble];
            if (!child) {
// 如果节点不存在，则该地址不存在
                return null;
            } else if (child.type === 'extension') {
// 如果节点是扩展节点，则继续向下遍历
                currentNode = child.children[nibble[0]];
                i -= 2; // 因为扩展节点占用了两个 nibble，所以要将 i 减去 2
            } else if (child.type === 'leaf') {
// 如果节点是叶子节点，则返回它的值
                return child.value;
            } else if (child.type === 'branch') {
// 如果节点是分支节点，则继续向下遍历
                currentNode = child;
            }
        }

        return null;
    }

// 验证 MPT 数据是否正确
    validate(address, balance) {
        const key = address.substr(2); // 去掉地址前的 0x
        let currentNode = this.root;

        for (let i = 0; i < key.length; i += 2) {
            const nibble = key.substr(i, 2); // 取每个数字的 nibble

            let child = currentNode.children[nibble];
            if (!child) {
// 如果节点不存在，则该地址不存在
                return false;
            } else if (child.type === 'extension') {
// 如果节点是扩展节点，则继续向下遍历
                currentNode = child.children[nibble[0]];
                i -= 2; // 因为扩展节点占用了两个 nibble，所以要将 i 减去 2
            } else if (child.type === 'leaf') {
// 如果节点是叶子节点，则检查它的值是否正确
                return child.value === balance;
            } else if (child.type === 'branch') {
// 如果节点是分支节点，则继续向下遍历
                currentNode = child;
            }
        }

        return false;
    }

// 计算哈希值
    getHash() {
        let encodedRoot = '';
        const root = this.root;
        for (let i = 0; i < 16; i++) {
            const nibble = i.toString(16);
            const childNode = root.children[nibble] || new Leaf(nibble, '');
            encodedRoot += childNode.type === 'extension' ? childNode.key : nibble + childNode.value;
        }
        return keccak256(encodedRoot).toString('hex');
    }
}



const mpt = new Tree();
mpt.insertAddress('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', '1000000000000000000');
console.log(mpt.getBalance('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5')); // 输出: 1000000000000000000
console.log(mpt.validate('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5', '1000000000000000000')); // 输出: true


