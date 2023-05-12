import sha256 from 'crypto-js/sha256.js'

export const validateHash = () => {}

export const calcNonce = (block) => { // 定义一个名为 calcNonce 的常量，其值为一个接受一个 Block 对象作为参数的函数
  console.log(`calc nonce of block ${block.height} `)
  const start = new Date().getTime() // 获取当前时间的时间戳（开始时间）
  let calcTimes = 0 // 用于记录计算次数，初始化为0

  // 在 while 循环中，我们首先调用 block.isValid() 方法检查当前区块的哈希值是否符合难度要求。
  // 如果不符合要求，则更新 nonce 属性为一个新的随机字符串，并将 calcTimes 加一。
  // 这样循环会一直进行，直到区块的哈希值符合要求
  while (!block.isValid()) {
    block.setNonce(sha256(new Date().getTime().toString()).toString())
    calcTimes++
  }

  // 获取当前时间的时间戳（结束循环时间）
  const end = new Date().getTime()

  // 其中 ${(end - start) / 1000}s 表示计算耗时，${calcTimes} 表示计算次数
  console.log(
    `calc nonce cost ${(end - start) / 1000}s, try ${calcTimes} times`,
  )

  return block
}
