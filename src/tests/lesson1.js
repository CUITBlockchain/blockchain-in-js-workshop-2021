import Block from '../models/Block.js'
import Blockchain from '../models/Blockchain.js'
import sha256 from 'crypto-js/sha256.js'

const main = () => {
  // 初始化区块链
  let blockchain = new Blockchain('BitCoin')

  // 创建创世区块
  let genesisBlock = new Block(blockchain, 'root', 0, 'root')

  // 设置创世区块
  blockchain.genesis = genesisBlock

  // 构建高度为1的区块
  let newBlock = new Block(
    blockchain,
    genesisBlock.hash,
    1,
    sha256(new Date().getTime().toString()).toString(),
  )

  // 将高度为1的区块添加到链中
  blockchain.blocks[newBlock.hash] = newBlock

  // 定义高度为2的区块1号
  let nextBlock = new Block(
    blockchain,
    newBlock.hash,
    2,
    sha256(new Date().getTime().toString()).toString(),
  )

  // 定义高度为2的区块2号
  let nextCompetitionBlock = new Block(
    blockchain,
    newBlock.hash,
    2,
    sha256((new Date().getTime() + 1).toString()).toString(),
  )

  // 添加两个区块高度为 2  的的竞争区块
  blockchain.blocks[nextBlock.hash] = nextBlock
  blockchain.blocks[nextCompetitionBlock.hash] = nextCompetitionBlock

  console.log() //必须要加这行代码，不然运行时会有概率的运行成功？？？为什么

  // 定义longestChain数组，使它等于区块链的最长链
  let longestChain = blockchain.longestChain()

  // JavaScript 的 console.assert() 方法，它的作用是对某个条件进行断言，如果条件不成立，就会输出一个错误信息
  // 最长的区块链应该有两个块。如果这个条件不成立，就会输出错误信息 'Block height should be 2'
  console.assert(longestChain.length === 2, 'Block height should be 2')

  // 定义高度为3的区块
  let thirdBlock = new Block(
    blockchain,
    nextCompetitionBlock.hash,
    3,
    sha256(new Date().getTime().toString()).toString(),
  )

  // 将高度为3的区块加入到链中
  blockchain.blocks[thirdBlock.hash] = thirdBlock

  // 重新得到整个链的最长链
  // 注意：此时整个链有两条支链
  longestChain = blockchain.longestChain()

  // console.log("这是最长链")
  // console.log(longestChain)
  // console.log("这是区块链")
  // console.log(blockchain)

  // 区块检查
  console.assert(longestChain.length === 3, 'Block height should be 2')
  console.assert(
    longestChain[2].hash === thirdBlock.hash,
    `Height block hash should be ${thirdBlock.hash}`,
  )
}

main()
