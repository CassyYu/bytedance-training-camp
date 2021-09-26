// 缓冲区
// js操作不了二进制 因此封装了类似C的语法过来

const buf1 = Buffer.alloc(10)
console.log(buf1)

const buf2 = Buffer.from('a')
console.log(buf2)

const buf3 = Buffer.from('中')
console.log(buf3)

const buf4 = Buffer.concat(buf3, buf4)
console.log(buf4, buf4.toString)