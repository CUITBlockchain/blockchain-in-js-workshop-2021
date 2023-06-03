import sha256 from "crypto-js/sha256.js";

class MerkelTree {
    constructor(data) {
        this.leaves = data.map(item => this.hash(item));
        this.root = this.buildTree(this.leaves);
    }

    hash(data) {
        return sha256(data).toString()
    }

    buildTree(nodes) {
        if (nodes.length === 1) {
            return nodes[0];
        }

        const nextLevel = [];
        for (let i = 0; i < nodes.length; i += 2) {
            const left = nodes[i];
            const right = (i + 1 < nodes.length) ? nodes[i + 1] : left;
            const combinedHash = this.combineHashes(left, right);
            nextLevel.push(combinedHash);
        }

        return this.buildTree(nextLevel);
    }

    combineHashes(left, right) {
        const combinedData = left + right;
        return this.hash(combinedData);
    }

}
export default MerkelTree