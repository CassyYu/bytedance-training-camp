#!/usr/bin/env node
// esm
import fs from "fs";
import { createIndexTemplate } from "./indexTemplate.js";
import { createPackageJsonTemplate } from "./packageJsonTemplate.js";
import { question } from "./question/index.js";
import { createConfig } from "./config.js";
import execa from "execa";
// 1. 把功能实现
// 2. 重构

// require commonjs

// input

// process
// output

// 程序的input
// input
// cli  -> gui

const answer = await question();
const config = createConfig(answer);

// 核心：自动化思维
// happy path
// 1. 创建了文件夹 （项目名）
fs.mkdirSync(getRootPath());

// // 2. 创建了 index.js
fs.writeFileSync(getRootPath() + "/index.js", createIndexTemplate(config));

// // 3. 创建了 Package.json
// // 练习点： 基于数据生成 package.json
fs.writeFileSync(
  getRootPath() + "/package.json",
  createPackageJsonTemplate(config)
);

// // 4. 安装依赖
// // TODO package  -> yarn
execa("yarn", {
  cwd: getRootPath(),
  stdio: [2, 2, 2],
});

function getRootPath() {
  console.log("rootPath", process.cwd());
  return "./haha";
}
