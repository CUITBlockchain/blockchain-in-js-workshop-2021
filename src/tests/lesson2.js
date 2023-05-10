import Block, { DIFFICULTY } from '../models/Block.js'
import Blockchain from '../models/Blockchain.js'
import sha256 from 'crypto-js/sha256.js'
import { calcNonce } from '../utils.js'

const main = () => {
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
  )

  // 验证区块难度合法性
  console.assert(newBlock.isValid() == false, 'Error: Very low probability')

  newBlock = calcNonce(newBlock)

  console.assert(newBlock.isValid() == true, 'Error: Very low probability')

  blockchain.blocks[newBlock.hash] = newBlock

  let nextBlock = new Block(
    blockchain,
    newBlock.hash,
    2,
    sha256(new Date().getTime().toString()).toString(),
  )

  let nextCompetitionBlock = new Block(
    blockchain,
    newBlock.hash,
    2,
    sha256((new Date().getTime() + 1).toString()).toString(),
  )

  nextBlock = calcNonce(nextBlock)
  nextCompetitionBlock = calcNonce(nextCompetitionBlock)
  // 添加两个区块高度为 2  的的竞争区块
  blockchain.blocks[nextBlock.hash] = nextBlock
  blockchain.blocks[nextCompetitionBlock.hash] = nextCompetitionBlock

  let longestChain = blockchain.longestChain()

  console.assert(longestChain.length == 2, 'Error: Block height should be 2')

  let thirdBlock = new Block(
    blockchain,
    nextCompetitionBlock.hash,
    3,
    sha256(new Date().getTime().toString()).toString(),
  )

  
  thirdBlock = calcNonce(thirdBlock)

  blockchain.blocks[thirdBlock.hash] = thirdBlock

  longestChain = blockchain.longestChain()

  // 区块检查
  console.assert(longestChain.length == 3, 'Block height should be 2')
  console.assert(
    longestChain[2].hash == thirdBlock.hash,
    `Height block hash should be ${thirdBlock.hash}`,
  )
}

main()
