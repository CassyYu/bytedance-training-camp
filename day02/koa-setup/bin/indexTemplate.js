import ejs from "ejs";
import fs from "fs";
import prettier from "prettier";

// 问题驱动
// 1. 手动创建
// 模板
// 开发思想  - 小步骤的开发思想
// 动态生成代码模板
export function createIndexTemplate(config) {
  const template = fs.readFileSync("./template/index.ejs", "utf-8");

  const code = ejs.render(template, {
    router: config.middleware.router,
    static: config.middleware.static,
    port: config.port,
  });

  return prettier.format(code, {
    parser: "babel",
  });
}
