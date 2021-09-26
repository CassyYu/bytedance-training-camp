// node_modules ->

// esbuild -> go语言编写 -> 打包贼快
// esbuild -> 一个文件 -> 只返回一个 文件 浏览器就能理解了

// lodash-es -> n个import -> http -> 多了后 浏览器吃不消
// lodash-es n个 -> 变成一个(esbuild) 

// ts -> serve -> 将ts变成浏览器能理解的代码 -> esbuild(js) -> 就可以给到浏览器了

// vite -> 缓存(空间换时间)
import { createApp } from "vue";

console.log(createApp);

console.log("main.js");