class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(index,previousHash,hash,timestamp) {
    this.index = index;
    this.hash=hash
    this.previousHash = previousHash.toString();
    this.timestamp = timestamp;

  }
}

export default Block
