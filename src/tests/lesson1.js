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

  // 构建区块,创世区块后的第一个区块
  let newBlock = new Block(
    blockchain,
    genesisBlock.hash,
    1,
    sha256(new Date().getTime().toString()).toString(),
  )

  // 将一个新的区块（newBlock）添加到区块链（blockchain）中
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

  // 由longestChain()函数得到一个数组，该数组存储最长链上对应的区块,即[]
  let longestChain = blockchain.longestChain()

  // 断言的条件是longestChain.length == 2，即最长的区块链（longestChain）应该有两个区块。
  // 如果条件成立，则程序继续运行，否则抛出一个异常，并输出Block height should be 2作为错误信息。
  console.assert(longestChain.length === 2, 'Block height should be 2')

  // 加入两个竞争区块后，链上有两条分支，现在又定义第三个区块
  let thirdBlock = new Block(
    blockchain,
    nextCompetitionBlock.hash,
    3,
    sha256(new Date().getTime().toString()).toString(),
  )

  // 将高度为3的区块加入到链中
  blockchain.blocks[thirdBlock.hash] = thirdBlock

  // 现在返回的这个数组应是最长链所对应的所有区块，即[newBlock, nextCompetitionBloc, thirdBlock]
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
