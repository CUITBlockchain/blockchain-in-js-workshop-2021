import sha256 from 'crypto-js/sha256.js'

export const validateHash = () => {}

export const calcNonce = (block) => {
  console.log(`calc nonce of block ${block.height} `)
  const start = new Date().getTime()
  let calcTimes = 0
  while (!block.isValid()) {
    block.setNonce(sha256(new Date().getTime().toString()).toString())
    calcTimes++
  }
  const end = new Date().getTime()
  console.log(
    `calc nonce cost ${(end - start) / 1000}s, try ${calcTimes} times`,
  )
  return block
}
