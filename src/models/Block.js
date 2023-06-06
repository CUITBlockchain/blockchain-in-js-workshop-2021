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
    this.transactions = {}
    //this.calculateMerkelRoot()
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
        this.transactions
        //this.MerkelTreeRoot
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
    if (Object.values(this.transactions).length === 0)
      return "No Transactions";
    return sha256(
        Object.values(this.transactions).map(tx =>tx.hash).join("")
    )
  }

  // 添加交易到区块
  /**
   * 
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction(transaction) {
    if (!this.isValidTransaction(transaction)) return;
    this.transactions[transaction.hash] = transaction
    this.utxoPool.handleTransaction(transaction)
    this.setHash()
  }
  isValidTransaction(transaction){
    return this.utxoPool.isValidTransaction(transaction.inputPublicKey,transaction.value)
  }


}

export default Block
