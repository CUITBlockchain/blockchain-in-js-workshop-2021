# 实验报告模板

## 小组成员

- 2021131027-王晨 （组长）
- 2021131028-翁忠旭
- 2021131050-张蕊
- 2021131051-黄诗怡
- 2021131053-吕梓桐
- 2021131077-程诗杰


## 代码仓库链接

https://github.com/OrrrGE/blockchain-in-js-workshop-2021



## 第一课代码  
Block.js  
import sha256 from 'crypto-js/sha256.js'  
class Block {  
  // 1. 完成构造函数及其参数  
  /* 构造函数需要包含  
  
  */  
  constructor(blockchain,previousHash, height, data) {  
    this.previousHash=previousHash  
    this.blockchain=blockchain  
    this.height=height  
    this.data=data  
    this.hash=sha256(this.previousHash+this.blockchain+this.height+JSON.stringify(this.data)).toString()  
  }  
}  

export default Block  

Blockchain.js  
// Blockchain  
class Blockchain {  
  // 1. 完成构造函数及其参数  
  /* 构造函数需要包含  
      - 名字  
      - 创世区块  
      - 存储区块的映射  
  */  
  constructor(name) {  
    this.name = name  
    this.genesis = null  
    this.blocks = {}  
  }  

  // 2. 定义 longestChain 函数  
  /*  
    返回当前链中最长的区块信息列表  
  */  
    longestChain() {  
        let high=null  
        // 找出高度最高的区块  
        for (let hash in this.blocks) {  
            if(!high){  
                high=this.blocks[hash]  
            }  
            if(high.height<this.blocks[hash].height){  
                high=this.blocks[hash]  
            }  
        }  
        let longest=[]  
        //由最高的区块反推到创世区块  
        longest.push(high)  
        //找到创世区块就停止循环  
        while (high.previousHash!==this.genesis.hash) {  
            //循环blocks找到前一个区块  
            for (let hash in this.blocks) {  
                let block = this.blocks[hash]  
                if (high.previousHash === block.hash) {  
                    //找到的区块放入最长链表中  
                    longest.push(block)  
                    high = block  
                }  
            }  
        }  
        //逆转数组元素  
        return longest.reverse()  
    }  


}  

export default Blockchain  



### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![https://www.aliyundrive.com/s/nMapy7sX3SQ](链接)


### 主观与讨论题内容



---

## 第二课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---


## 第三课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第四课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第五课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第六课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](图片链接放这里)


### 主观与讨论题内容



---


## 结课报告





