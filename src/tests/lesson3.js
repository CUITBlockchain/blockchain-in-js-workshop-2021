import Block, { DIFFICULTY } from '../models/Block.js'
import Blockchain from '../models/Blockchain.js'
import sha256 from 'crypto-js/sha256.js'
import { calcNonce } from '../utils.js'

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
  console.assert(DIFFICULTY > 0, 'Error: Need config DIFFICULTY on Block file')

  // 构建区块
  let newBlock = new Block(
    blockchain,
    genesisBlock.hash,
    1,
    sha256(new Date().getTime().toString()).toString(),
    miner,
  )

  console.assert(
    newBlock.coinbaseBeneficiary == miner,
    'Error: Block niner public key error',
  )

  // 验证区块难度合法性
  console.assert(newBlock.isValid() == false, 'Error: Very low probability')

  newBlock = calcNonce(newBlock)

  console.assert(newBlock.isValid() == true, 'Error: Very low probability')

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

  console.assert(longestChain.length == 2, 'Error: Block height should be 2')

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
  console.assert(longestChain.length == 3, 'Block height should be 2')
  console.assert(
    longestChain[2].hash == thirdBlock.hash,
    `Height block hash should be ${thirdBlock.hash}`,
  )

  // UTXO check

  console.assert(
    blockchain.containsBlock(thirdBlock) == true,
    'Error: blockchain should contain third block',
  )

  console.log(thirdBlock.utxoPool)
  console.assert(
    thirdBlock.utxoPool.utxos[miner] &&
      thirdBlock.utxoPool.utxos[miner].amount > 0,
    'Error: miner should got BTC',
  )

  console.assert(
    thirdBlock.utxoPool.utxos[miner] &&
      thirdBlock.utxoPool.utxos[miner].amount == 37.5,
    'Error: miner should got BTC',
  )
}

main()
