# Fusion UI（VU 客户端主菜单 UI 汉化版）

本项目基于 [VeniceUnleashed/Fusion-UI](https://github.com/VeniceUnleashed/Fusion-UI) 进行中文本地化与字体适配，原作者为 VU 开发团队。

## 一、快速开始

确保已安装 Node.js，在项目根目录依次执行：

```bash
npm install
npm run build
```

构建完成后，会生成 `ui.vuic` 文件。

## 二、安装到游戏

将 `ui.vuic` 复制到 `%LocalAppData%/VeniceUnleashed/client/vu` 目录下（如果 VU 安装在非标准位置，请复制到 `<VU安装目录>/vu`）。

> **注意：防止被覆盖**
> VU 每次启动都会自动下载最新的官方 UI 并替换你的文件。请将复制过去的 `vu.vuic` 文件属性设置为**“只读”**。或者，更推荐将 `ui.vuic` 作为 VEXT 模组的一部分来加载，这样更安全。

## 三、开发调试

在 `npm install` 之后，运行：

```bash
npm start
```

UI 会自动在浏览器中打开，并加载测试数据方便预览。测试数据位于 `src/test/useTest.ts`，你可以随意修改里面的服务器名称和玩家名称进行测试。**注意：为了准确预览中英文混排效果，测试数据建议保持英文，不要翻译。**

## 四、汉化说明

*   **字体依赖**：原版字体不支持中文。本项目在 `src/styles/_fonts.scss` 中引入了阿里普惠体，并在 `screen.scss` 中设置了字体栈，以确保中文和英文字体正常渲染。
*   **字重限制**：因为只引入了 400（常规）和 700（加粗）字重，**请勿在代码中写 `font-weight: 500` 或 `600`**，否则 Gameface 引擎会因为找不到对应字体而报错或变粗。
*   **渲染兼容性**：Gameface 内核不支持 `-webkit-` 等浏览器私有属性以及 `display: inline-block`，请使用标准 Flex 布局。

## 五、许可证

本项目遵循原项目许可证。中文翻译与本地化由社区贡献者提供。
