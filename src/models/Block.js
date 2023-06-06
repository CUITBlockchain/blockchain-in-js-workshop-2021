import sha256 from 'crypto-js/sha256.js'
import UTXOPool from "./UTXOPool.js";
import MerkelTree from "../cryptoCurrency/MerkelTree.js"
import {values} from "ramda";
export const DIFFICULTY = 3

class Block {
  // 1. 完成构造函数及其参数





  constructor(blockchain,previousHash,height,hash,coinbaseBeneficiary) {
    this.blockchain = blockchain;
    this.hash=hash
    this.previousHash = previousHash.toString();
    this.height = height;
    this.coinbaseBeneficiary = coinbaseBeneficiary
    this.utxoPool = new UTXOPool()
    this.transactions = []
    this.MerkelTreeRoot = null
  }

  isValid() {
    return  this.hash === this.calculateHash()&&
        (this.hash.substring(0,DIFFICULTY) ==='0'.repeat(DIFFICULTY))
  }

  setNonce(nonce) {
    this.nonce=nonce
    this.setHash()
  }
  /*
  calculateMerkelRoot(){
    const merkelTree = new MerkelTree(this.transactions)
    this.MerkelTreeRoot = merkelTree.root
  }

   */
  calculateHash(){
    return sha256(
      this.nonce+
        this.previousHash+
        this.height+
        this.coinbaseBeneficiary+
        this.transactions+
        this.MerkelTreeRoot
    ).toString();
  }
  setHash(){
    this.hash = this.calculateHash()
  }




  // 根据交易变化更新区块 hash


  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  combinedTransactionsHash() {
    if (this.transactions.length === 0)
      return "No Transactions";
    const transactionHashes = this.transactions.map(tx => tx.hash);
    const combinedHash = transactionHashes.join("");
    return sha256(combinedHash).toString();
  }

  // 添加交易到区块
  /**
   * 
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction(transaction) {
    if (!this.isValidTransaction(transaction)) return;
    this.transactions.push(transaction);
    this.utxoPool.handleTransaction(transaction);
    this.MerkelTreeRoot = new MerkelTree(this.transactions).root; // 更新默克尔树的根哈希
    this.setHash();
  }
  isValidTransaction(transaction){
    return this.utxoPool.isValidTransaction(transaction.inputPublicKey,transaction.value)
  }


}

export default Block
