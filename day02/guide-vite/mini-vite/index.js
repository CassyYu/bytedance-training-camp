const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

app.use((ctx) => {
  const url = ctx.request.url;
  console.log(url);
  if (url === "/") {
    // 加载 html
    ctx.body = fs.readFileSync("./index.html", "utf-8");
  } else if (url.endsWith(".js")) {
    // 找到对应的路径 去加载 然后给到浏览器
    console.log(url.slice(1));
    const p = path.resolve(__dirname, url.slice(1));
    console.log(p);
    ctx.type = "text/javascript";
    // 做一个标识 如果是 import * from "vue" -> node_modules
    // from 排除 ./ & ../ 
    const source = fs.readFileSync(p, "utf-u");
    ctx.body = rewriteImport(source);
  } else if (url.startsWith("/@modules")) {
    // 应该去 node_modules 里面去查找
    const moduleName = url.replace("/@modules","");
    // url -> vue
    const prefix = __dirname + "/node_moduels" + moduleName;
    // package.json
    const module = require(prefix + "/package.json").module;
    console.log(module);

    fs.readFileSync(prefix, resolve(prefix, module), "utf-8");
    ctx.type = "text/javascript";
    ctx.body = code;
  }
})

function rewriteImport(source) {
  return source.replace(/(from\s+['"])(?![\.\/])/g, "$1/@modules")
    .replace(/process\.env.\.NODE_ENV/g, '"development"');
}

app.listen(8080, (ctx) => {
  console.log("open server localhost:8080");
})