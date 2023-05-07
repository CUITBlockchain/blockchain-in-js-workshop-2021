export const validateHash = () => {
    let block = this.blocks[this.blocks.length-1]
    while (block.previoushash != "root"){
        if (block.previousHash!=this.blocks[block.previousHash]){
            console.log("failure")
            return
        }
        block=this.blocks[block.previousHash]
    }
    console.log("blockchain is valid")
}