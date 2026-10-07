# Fusion-UI 中文版使用与自定义指南

本项目基于 [VeniceUnleashed/Fusion-UI](https://github.com/VeniceUnleashed/Fusion-UI) 制作，已进行中文本地化和字体适配。  
即使你完全没学过编程，按照下面的步骤也能自己编译、替换图片、修改颜色。

---

## 一、准备工作：安装 Node.js

编译这个 UI 需要用到 Node.js。如果你电脑上还没有，请先去官网下载安装：

👉 https://nodejs.org/  
下载 **LTS 版本**，一路点“下一步”安装即可。

安装完成后，打开电脑的“命令提示符”（Windows 按 `Win + R`，输入 `cmd`，回车）。

---

## 二、编译 UI（生成 ui.vuic 文件）

1. 在命令提示符里，进入本项目所在的文件夹。  
   例如你的项目在 `D:\Fusion-UI`，就输入：
   ```
   cd /d D:\Fusion-UI
   ```
   然后回车。

2. 输入以下命令并回车，安装项目需要的工具（只需执行一次）：
   ```
   npm install
   ```
   等待它下载完成，可能需要几分钟。

3. 输入以下命令并回车，开始编译：
   ```
   npm run build
   ```
   编译成功后，你会得到一个 **ui.vuic** 文件（通常在项目根目录或 `dist` 文件夹里）。

> **小提示**：如果提示 `npm 不是内部或外部命令`，说明 Node.js 没装好，重新安装一次，安装时勾选“Add to PATH”。

---

## 三、把 UI 装进游戏

1. 找到 VU 的客户端目录：  
   一般路径是 `%LocalAppData%/VeniceUnleashed/client/vu`。  
   在文件管理器地址栏直接粘贴这个路径并回车就能打开。

2. 把刚才生成的 **ui.vuic** 文件复制进去。

3. **重要**：VU 每次启动都会自动下载官方 UI 并覆盖你的文件。为了防止被覆盖，请右键点击 `vu.vuic` → 属性 → 勾选“只读” → 确定。  
   或者，更推荐把这个 `ui.vuic` 作为 VEXT 模组的一部分来加载（放在 `Admin/Mods` 里）。

---

## 四、替换图片（换背景、换新闻图、换士兵图）

所有图片都在 `Fusion-UI/public/assets/img/` 和 `Fusion-UI/public/images/` 这两个文件夹里。

**替换规则：**
- 找到你想换的图片，比如背景图 `background.png`。
- 准备一张新图片，**文件名必须和原来完全一样**（包括大小写），**后缀也必须一样**（原来 `.png` 就必须是 `.png`）。
- 用新图片覆盖原文件。
- 重新执行第二步的 `npm run build`，再把新的 `ui.vuic` 复制到游戏目录。

**常见图片位置：**
- 背景图：`public/assets/img/background.png`
- 新闻图：`public/assets/img/news-bg.png`、`news-secondary-bg.png`，以及 `public/images/` 里对应的图。
- 士兵图：`public/assets/img/soldier-bg.png`，以及 `public/images/` 里对应的图。

> 建议新图片的分辨率和原图差不多，否则可能拉伸变形。

---

## 五、修改文字颜色（包括修改 RGBA）

文字颜色都写在 `Fusion-UI/src/styles/` 文件夹里的 `.scss` 文件里。  
推荐用 **VSCode** 打开项目，修改起来最方便。

**主要文件：**
- 全局文字颜色：`src/styles/screen.scss`
- 服务器浏览器：`src/styles/_server-browser.scss`
- 按钮和表单：`src/styles/_buttons.scss`、`src/styles/_forms.scss`
- 弹窗：`src/styles/_popup.scss`

**颜色格式说明：**
你会看到类似这样的代码：
```scss
color: #ffffff;          // 十六进制颜色，这里是白色
background: rgba(0, 0, 0, 0.8);  // RGBA 颜色，黑色，最后一位 0.8 是透明度
```

- **十六进制**：`#ffffff` 代表白色，`#000000` 代表黑色，`#e14d43` 是红橙色。  
  在 VSCode 里，颜色代码旁边会有一个小色块，点击它就能弹出调色板，随便选颜色，自动替换，非常方便。

- **RGBA**：`rgba(红, 绿, 蓝, 透明度)`  
  例如 `rgba(225, 77, 67, 0.8)` 就是红橙色加 80% 不透明。  
  改透明度就改最后那个数字（0 完全透明，1 完全不透明）。

**改完颜色后，同样要重新 `npm run build`，再把 `ui.vuic` 复制到游戏目录。**

---

## 六、字体说明（中文显示关键）

原版字体不支持中文，本项目已经加入了“阿里巴巴普惠体”。  
**但请注意：**
- 项目中只引入了 **400（常规）** 和 **700（加粗）** 两种字重。
- **不要写 `font-weight: 500` 或 `600`**，否则 Gameface 会找不到字体，中文会变粗或报错。
- 如果你自己换字体，记得修改 `src/styles/_fonts.scss`，并保证字体文件放在 `public/assets/fonts/` 下。

---

## 七、开发调试（可选）

如果你想在浏览器里预览 UI，可以在项目文件夹里执行：
```
npm start
```
浏览器会自动打开，并加载一些测试数据。  
测试数据在 `src/test/useTest.ts` 里，你可以修改里面的服务器名和玩家名。  
**建议测试数据保持英文**，这样能准确看出中英文混排的效果。

---

## 八、遇到问题怎么办？

- **编译报错**：先确认 `npm install` 是否成功，Node.js 版本是否太旧（建议 18 以上）。
- **UI 没变化**：检查 `ui.vuic` 是否复制到了正确位置，是否被 VU 自动覆盖（设只读）。
- **中文显示方块**：检查 `_fonts.scss` 和 `screen.scss` 里的字体名称是否正确，字体文件是否存在。
- **颜色改了没生效**：改完要重新 `npm run build`，并替换游戏目录里的 `ui.vuic`。
