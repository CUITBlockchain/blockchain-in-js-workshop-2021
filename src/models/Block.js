import sha256 from 'crypto-js/sha256.js'
import UTXOPool from "./UTXOPool.js";
import MerkelTree from "../cryptoCurrency/MerkelTree.js"
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



}

export default Block
