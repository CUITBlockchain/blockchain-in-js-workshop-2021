// import sha256 from 'crypto-js/sha256.js'
//
// export const DIFFICULTY = 2 // 难度常量 DIFFICULTY，用于指定哈希值的前缀中 0 的数量
//
// class Block {
//   // 1. 完成构造函数及其参数
//
//   constructor(blockChain, previousHash, height, hash,coinbaseBeneficiary, nonce, utxoPool) {
//     this.blockChain = blockChain;
//     this.previousHash = previousHash;
//     this.height = height;
//     this.hash = hash;
//     this.nonce = nonce; // 添加一个nonce属性用于存储区块的随机数
//     this.utxoPool = utxoPool; // 添加utxoPool属性用于存储未使用的交易输出池
//     this.coinbaseBeneficiary = coinbaseBeneficiary; // 添加coinbaseBeneficiary属性用于存储币库收益地址（一般是矿工地址）
//   }
//
//
//   /**
//    isValid() 方法检查当前区块的哈希值是否符合难度要求
//
//    哈希值前缀中 0 的个数应该大于或等于难度值 DIFFICULTY 才认为哈希值符合标准。
//    因为难度值越大，要求哈希值前缀中 0 的个数就越多，这就要求哈希值的计算越困难
//
//    ！！！-----------但是函数中这里来又为什么是等于呢？？？------------！！！
//    在我们的实现中，我们定义了一个难度常量 DIFFICULTY，用于指定哈希值的前缀中 0 的数量。
//    当哈希值前缀中 0 的数量等于 DIFFICULTY 时，我们就认为该哈希值满足了要求。
//    这里的“等于”指的是“大于等于”。也就是说，如果哈希值前缀中 0 的数量大于等于 DIFFICULTY，我们就认为该哈希值满足要求
//
//    hash.substring(0, DIFFICULTY) 表示从字符串 hash 的第一个字符开始取 DIFFICULTY 个字符
//    '0'.repeat(DIFFICULTY) 表示由 DIFFICULTY 个 0 组成的字符串
//    如果哈希值的前缀中包含至少 DIFFICULTY 个 0，则认为该哈希值满足要求
//    */
//   isValid() {
//     const hash = this.calculateHash()
//     return hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY)
//   }
//
//   // setNonce(nonce) 方法用于设置当前区块的随机数属性
//   setNonce(nonce) {
//     this.nonce = nonce
//   }
//
//   // 计算当前区块的哈希值
//   calculateHash() {
//     return sha256(
//         this.previousHash + this.height + this.nonce
//     ).toString()
//   }
//
// }
//
// export default Block

import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2 // 难度常量 DIFFICULTY，用于指定哈希值的前缀中 0 的数量

class Block {
  constructor(blockchain, prevHash, height, data, miner = null) {
    this.blockchain = blockchain
    this.prevHash = prevHash
    this.height = height
    this.hash = sha256(height + prevHash + data).toString()
    this.nonce = 0
    this.data = data
    this.miner = miner
    this.utxoPool = blockchain.utxoPool.clone()
  }

<<<<<<< Updated upstream
  constructor(blockChain,previousHash,height,hash,nonce) {
    this.blockChain = blockChain
    this.previousHash = previousHash
    this.height = height
    this.hash = hash
    this.nonce = nonce // 添加一个nonce属性用于存储区块的随机数
  }

  /*
   isValid() 方法检查当前区块的哈希值是否符合难度要求

   哈希值前缀中 0 的个数应该大于或等于难度值 DIFFICULTY 才认为哈希值符合标准。
   因为难度值越大，要求哈希值前缀中 0 的个数就越多，这就要求哈希值的计算越困难

   ！！！-----------但是函数中这里来又为什么是等于呢？？？------------！！！
   在我们的实现中，我们定义了一个难度常量 DIFFICULTY，用于指定哈希值的前缀中 0 的数量。
   当哈希值前缀中 0 的数量等于 DIFFICULTY 时，我们就认为该哈希值满足了要求。
   这里的“等于”指的是“大于等于”。也就是说，如果哈希值前缀中 0 的数量大于等于 DIFFICULTY，我们就认为该哈希值满足要求

   hash.substring(0, DIFFICULTY) 表示从字符串 hash 的第一个字符开始取 DIFFICULTY 个字符
   '0'.repeat(DIFFICULTY) 表示由 DIFFICULTY 个 0 组成的字符串
   如果哈希值的前缀中包含至少 DIFFICULTY 个 0，则认为该哈希值满足要求
   */
  isValid() {
    const hash = this.calculateHash()
    return hash.substring(0, DIFFICULTY) === '0'.repeat(DIFFICULTY)
  }

  // setNonce(nonce) 方法用于设置当前区块的随机数属性
  setNonce(nonce) {
    this.nonce = nonce
  }

  // 计算当前区块的哈希值
  calculateHash() {
    return sha256(
        this.previousHash + this.height + this.nonce
    ).toString()
  }

=======
  isValid() {
    const target = Array(DIFFICULTY + 1).join("0")
    return this.hash.substring(0, DIFFICULTY) === target
  }

  setNonce(nonce) {
    this.nonce = nonce
    this.hash = sha256(this.height + this.prevHash + this.data + nonce).toString()
  }
>>>>>>> Stashed changes
}

export default Block

