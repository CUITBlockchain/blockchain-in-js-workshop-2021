import Block, { DIFFICULTY } from '../models/Block.js'
import Blockchain from '../models/Blockchain.js'
import Transaction from '../models/Transaction.js'
import { sign, verifySignature } from '../crypto.js'

import sha256 from 'crypto-js/sha256.js'
import { calcNonce, validateHash } from '../utils.js'

const { log, assert } = console

const main = () => {
  const miner =
    '04a48c7445aff5a6544f4086560e7a3959f9601bd418710cdd32536f803c79de8d9e7dbdbbaf8b906220523fe071ede64b1625f3187b3c41f7b27633110ca890e1'
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

  let latestUTXOPool = thirdBlock.utxoPool
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

  let minerPrivKey =
    '02ad0ea08b2512e7e4eef0074ac10a11ca8f1e6b39f09328f93c77f27bda4181'
  let receiverPubKey =
    '04e38f89b8d9957c5e4e3378eb8ab39b8e7e3312c1cce554a7631258f6e14fd80f48b43a7016cd658ab7fe873722fd8caeb8ceac31e7fd2734c25a60673b33df67'

  let receiverPrivKey =
    'a9a36877fa5cc006060aed6e542ba397767fbf8b3660292ebb21b66b0abf318f'
  let trx = new Transaction(miner, receiverPubKey, 1, 0.01)

  let trxSignature = sign(trx.hash, minerPrivKey)

  trx = new Transaction(miner, receiverPubKey, 1, 0.01, trxSignature)

  let verifyRes = verifySignature(trx.hash, trxSignature, miner)

  // log(verifyRes, 'verifyRes')
  assert(verifyRes == true, 'Error: signature not valid')
  assert(
    trx.hasValidSignature() == true,
    'Error: signature not valid with trx hasValidSignature',
  )

  assert(
    latestUTXOPool.isValidTransaction(trx) == true,
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

  let badTrx = new Transaction(miner, receiverPubKey, 100, 0.1)

  // 对比更新交易之后的 hash 数据
  let trxHash = thirdBlock.combinedTransactionsHash().toString()
  thirdBlock.addTransaction(badTrx)

  assert(
    trxHash == thirdBlock.combinedTransactionsHash().toString(),
    'Error: should  have same hash',
  )

  assert(
    latestUTXOPool.utxos[miner] && latestUTXOPool.utxos[miner].amount == 36.5,
    'Error: miner should got right balance',
  )

  assert(
    latestUTXOPool.utxos[receiverPubKey] &&
      latestUTXOPool.utxos[receiverPubKey].amount == 1,
    'Error: receiver should got right balance',
  )

  // check fee change

  let newTrx = new Transaction(receiverPubKey, miner, 0.1, 0.01)

  let newTrxSignature = sign(newTrx.hash, receiverPrivKey)

  newTrx = new Transaction(receiverPubKey, miner, 0.1, 0.01, newTrxSignature)
  thirdBlock.addTransaction(newTrx)

  assert(
    latestUTXOPool.utxos[receiverPubKey] &&
      latestUTXOPool.utxos[receiverPubKey].amount == 0.89,
    'Error: receiver should got right balance',
  )

  assert(
    latestUTXOPool.utxos[miner] && latestUTXOPool.utxos[miner].amount == 36.61,
    'Error: miner should got right balance',
  )

  log(latestUTXOPool)
}

main()
