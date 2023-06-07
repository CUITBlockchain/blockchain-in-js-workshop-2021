import Block, { DIFFICULTY } from '../models/Block.js'
import Blockchain from '../models/Blockchain.js'
import Transaction from '../models/Transaction.js'

import sha256 from 'crypto-js/sha256.js'
import { calcNonce, validateHash } from '../utils.js'

const { log, assert } = console

const main = () => {
  const miner =
    '04fc5783257a53bcfcc6e1ea3c5059393df15ef4a286f7ac4c771ab8caa67dd1391822f9f8c3ce74d7f7d2cb2055232c6382ccef5c324c957ef5c052fd57679e86'
  // 初始化区块链
  let blockchain = new Blockchain('BitCoin')

  // 创建创世区块
  let genesisBlock = new Block(blockchain, 'root', 0, 'root')

  // 设置创世区块
  blockchain.genesis = genesisBlock

  // 验证区块难度
  assert(DIFFICULTY > 0, 'Error: Need config DIFFICULTY on Block file')

  // 构建区块
  let newBlock = new Block(
    blockchain,
    genesisBlock.hash,
    1,
    sha256(new Date().getTime().toString()).toString(),
    miner,
  )

  assert(
    newBlock.coinbaseBeneficiary == miner,
    'Error: Block niner public key error',
  )

  // 验证区块难度合法性
  assert(newBlock.isValid() == false, 'Error: Very low probability')

  newBlock = calcNonce(newBlock)

  assert(newBlock.isValid() == true, 'Error: Very low probability')

  blockchain._addBlock(newBlock)

  let nextBlock = new Block(
    blockchain,
    newBlock.hash,
    2,
    sha256(new Date().getTime().toString()).toString(),
    miner,
  )

  nextBlock = calcNonce(nextBlock)
  // 添加两个区块高度为 2  的的竞争区块
  blockchain._addBlock(nextBlock)

  let longestChain = blockchain.longestChain()

  assert(longestChain.length == 2, 'Error: Block height should be 2')

  let thirdBlock = new Block(
    blockchain,
    nextBlock.hash,
    3,
    sha256(new Date().getTime().toString()).toString(),
  )

  thirdBlock = calcNonce(thirdBlock)

  blockchain._addBlock(thirdBlock)

  longestChain = blockchain.longestChain()

  // 区块检查
  assert(longestChain.length == 3, 'Block height should be 2')
  assert(
    longestChain[2].hash == thirdBlock.hash,
    `Height block hash should be ${thirdBlock.hash}`,
  )

  // UTXO check

  assert(
    blockchain.containsBlock(thirdBlock) == true,
    'Error: blockchain should contain third block',
  )

  const latestUTXOPool = thirdBlock.utxoPool
  log(latestUTXOPool)

  assert(
    latestUTXOPool.utxos[miner] && latestUTXOPool.utxos[miner].amount > 0,
    'Error: miner should got BTC',
  )

  assert(
    latestUTXOPool.utxos[miner] && latestUTXOPool.utxos[miner].amount == 37.5,
    'Error: miner should got BTC',
  )

  // check transactions

  let receiverPubKey =
    '0416fb87fec6248fb55d3f73e5210b51514ebd44e9ff2a5c0af87110e8a39da47bf063ef3cccec58b8b823791a6b62feb24fbd8427ff6782609dd3bda9ea138487'
  let trx = new Transaction(miner, receiverPubKey, 1)

  assert(validateHash(trx.hash), 'Error: Transaction hash invalid...')

  assert(trx._calculateHash() == trx.hash, 'Error: Trx hash invalid')

  assert(
    latestUTXOPool.isValidTransaction(miner, 1) == true,
    'Error: trx need to be validate',
  )

  // lesson5 check block

  thirdBlock.addTransaction(trx)

  assert(
    latestUTXOPool.utxos[miner] && latestUTXOPool.utxos[miner].amount == 36.5,
    'Error: miner should got right balance',
  )

  assert(
    latestUTXOPool.utxos[receiverPubKey] &&
      latestUTXOPool.utxos[receiverPubKey].amount == 1,
    'Error: receiver should got right balance',
  )

  // 打印最新的 UTXO pool
  log(latestUTXOPool)

  let badTrx = new Transaction(miner, receiverPubKey, 100)
  
  // 对比更新交易之后的 hash 数据
  let trxHash = thirdBlock.combinedTransactionsHash().toString()
  thirdBlock.addTransaction(badTrx)

  assert(trxHash != thirdBlock.combinedTransactionsHash().toString(), 'Error: new trx cannot have same hash')

  assert(
    latestUTXOPool.utxos[miner] && latestUTXOPool.utxos[miner].amount == 36.5,
    'Error: miner should got right balance',
  )

  assert(
    latestUTXOPool.isValidTransaction(receiverPubKey, 100) == false,
    'Error: trx need to be validate',
  )

  assert(
    latestUTXOPool.utxos[receiverPubKey] &&
      latestUTXOPool.utxos[receiverPubKey].amount == 1,
    'Error: receiver should got right balance',
  )
}

main()
