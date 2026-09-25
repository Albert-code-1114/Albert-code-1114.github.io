# 维护说明

这份文档是给**你自己**看的操作手册，不是给访客看的。
（访客看到的是 [README.md](README.md) 和线上主页。）

> 不需要这份文档的话，直接删掉这个文件即可 —— `profile.js` 里的注释已经涵盖了大部分内容。

---

## 三步上手

1. **改内容**：打开 `profile.js`，把引号里的示例文字换成你自己的信息。
2. **提交**：把改动 push 到 GitHub 的 `main` 分支。
3. **看效果**：等 1 分钟左右，打开 <https://albert-code-1114.github.io/>（没更新就按 `Ctrl + F5` 强制刷新）。

> 只改**引号里面**的字，别动引号外面的字段名、逗号和括号 —— 少一个逗号整页会变空白。

---

## 🔒 隐私保护（每次改动前扫一眼）

**这个仓库是公开的，`profile.js` 里的每一个字全世界都能看到**，还会被搜索引擎收录、被爬虫抓取，而且是永久留在 Git 历史里的 —— 就算你之后删掉，别人翻历史提交照样看得到。

### 模板已经替你做的防护

| 措施 | 说明 |
|---|---|
| **邮箱拆两半** | `settings.email` 拆成 `user` 和 `domain` 两段，静态源码里搜不到完整的 `xxx@yyy` 字符串，只在访客的浏览器里拼起来。邮箱采集机器人抓不到，但页面显示和点击发信完全正常。 |
| **手机号默认留空** | 联系方式里电话/微信/博客默认是 `""`，页面上直接不显示。想公开再自己填。 |
| **危险链接拦截** | 只允许 `http/https/mailto/tel` 和站内相对路径，`javascript:` 之类的链接会被丢弃。 |
| **零第三方请求** | 不加载 Google Fonts、不用 CDN、不埋统计代码。访客的信息不会因为你的主页流向任何第三方。这也是 README 里不放 shields.io 徽章的原因。 |
| **PDF 不收录** | `robots.txt` 里挡住了所有 PDF，避免简历被搜索引擎直接索引下载。 |
| **一键低调模式** | `settings.searchEngineIndex` 改成 `false`，会加 `noindex` 标记请求搜索引擎不要收录。 |
| **`.gitignore` 兜底** | `private/`、`drafts/`、`.env`、密钥文件默认不会被提交。 |

### 绝对不要写进 `profile.js` 的东西

- ❌ 身份证号、护照号、学号、工号
- ❌ 家庭住址、宿舍楼栋房号 —— 地址写到「中国 · 北京」这一级就够了
- ❌ 完整出生日期（年月日）—— 常被用来做身份验证，写年份或干脆不写
- ❌ 银行卡号、密码、验证码、任何密钥
- ❌ 手机号 —— 除非你确实想让全网看到。填之前想一下骚扰电话和诈骗短信
- ❌ 微信 / QQ 号 —— 常被用来做账号找回和社会工程攻击，建议留空让 HR 先发邮件

### ⚠️ 邮箱不要写进 README 或 index.html

邮箱只在 `settings.email` 里拆成两段写。README、`index.html` 的 `<noscript>` 块、提交信息里都不要出现完整邮箱 —— 静态文本里的邮箱会被爬虫直接抓走，那样拆分防爬就白做了。

### 简历 PDF 要特别注意

简历 PDF 一般印着手机号和邮箱，**放进这个公开仓库 = 公开下载链接**，而且提交之后就永久留在 Git 历史里。

推荐做法（从安全到方便排序）：

1. **最稳**：不放 PDF。让访客通过邮箱联系你，你再用邮件把简历发过去。
2. **较稳**：传到网盘（Google Drive / OneDrive / 阿里云盘），设成「仅获得链接的人可查看」，把分享链接填到 `hero.links` 里那个「下载简历」按钮上。
3. **图省事**：放进仓库 `assets/resume.pdf`。那样谁都能下载，你自己权衡 —— 如果 PDF 里只有姓名和邮箱、没有手机号，风险可以接受。

另外记得：`assets/img/` 里放的头像也会公开。用摄像头随手拍的原图会带 EXIF 信息（拍摄地点、设备、时间），上传前建议先压缩或重新导出一遍。

### 已做过的历史清理（供以后参考）

`git config user.email` 曾用过真实邮箱，导致 3 个已推送提交的作者信息泄露。已通过 `git commit-tree` 重建全部提交对象修掉，全局配置也换成了 `313784302+Albert-code-1114@users.noreply.github.com`。

建议去 [github.com/settings/emails](https://github.com/settings/emails) 勾上：

- **Keep my email addresses private**
- **Block command line pushes that expose my email**

这样以后在任何仓库都不会再犯同样的错。

> 顺带一提：改写历史后，本地和远程会失去共同祖先，此时 `git pull` 会报 `Unable to merge unrelated histories`。**这种情况下应该 force push，而不是 pull。**

---

## `profile.js` 字段速查

### 0 · 站点设置 `settings`

| 字段 | 作用 |
|---|---|
| `defaultLang` | 首次打开的语言，`"zh"` 或 `"en"` |
| `accent` | 主题色，一个颜色决定整站配色。备选：`#0f766e` 墨绿 / `#7c3aed` 紫 / `#ea580c` 橙 / `#0e7490` 青 |
| `avatar` | 头像路径，如 `"assets/img/avatar.jpg"`；留空自动用姓名首字生成 |
| `email.user` / `email.domain` | 邮箱的 `@` 前后两段，分开写防爬虫 |
| `searchEngineIndex` | `false` 请求搜索引擎不要收录 |
| `footerNote` | 页脚右下角的字，留空不显示 |

### 1 · 顶部 `hero`

`name` `role` `tagline` `location` `status`，以及 `links` 数组（按钮）。

每个按钮：`{ icon, label, url }`。

- 可用的 `icon`：`github` `mail` `file` `download` `globe` `phone` `location` `calendar` `award` `star` `code` `book` `cap` `briefcase` `users` `link`
- `url` 写 `"#email"` 会自动用 `settings.email` 拼出来的邮箱
- `url` 留空 `""` 的按钮自动隐藏

### 2–8 · 各版块

每个版块都有一个 `enabled` 开关，`false` 就整个隐藏，导航栏里的入口也会一起消失：

| 版块 | 关键字段 |
|---|---|
| `about` | `bio` 一段自我介绍；`facts[]` 是「标签 + 内容」的关键信息行 |
| `education` | `items[]`：`school` `major` `degree` `period` `score` `details[]` |
| `research` | 科研经历。`items[]`：`org` `title` `period` `details[]` |
| `awards` | 竞赛与荣誉。`items[]`：`title` `date` `note` `details[]`（可选多行要点） |
| `projects` | `items[]`：`name` `role` `period` `summary` `highlights[]` `tech[]` `links[]` |
| `experience` | 校园经历。`items[]`：`org` `title` `period` `details[]` |
| `skills` | `groups[]`：`name` 组名 + `items[]` 技能（可以直接写字符串） |
| `contact` | `intro` 一句话；`items[]`：`icon` `label` `value` `url` |

> `research` 和 `experience` 共用同一套时间线结构，字段完全一样，想加第二段科研经历直接往 `research.items` 里再追加一个对象即可。

**通用规则**

- 中英双语：`{ zh: "中文", en: "English" }`；只写 `"一句话"` 则两种语言显示同一句
- 任何字段**留空 `""` 或空数组 `[]`，页面上就不显示**，不会留下空壳
- 英文留空会自动回退显示中文
- 列表条目按「主字段」判断是否显示：教育看 `school`、科研/校园看 `org` 或 `title`、竞赛看 `title`、项目看 `name`、技能组看 `name`、联系方式看 `value`/`url`

---

## 文件结构

```
index.html            页面骨架，不用改
profile.js            ★ 个人信息全在这里
assets/css/style.css  样式（想调配色/字号再来看）
assets/js/main.js     渲染引擎（一般不用动）
assets/favicon.svg    标签页小图标
robots.txt            告诉搜索引擎哪些不要收录
.gitattributes        统一 LF 行尾，消除 CRLF 告警
.nojekyll             让 GitHub Pages 跳过 Jekyll 处理
README.md             访客看到的自我介绍
GUIDE.md              本文件，给你自己看
```

---

## 常见修改

**换主题色** —— 改 `settings.accent` 一处即可，按钮、序号、标签、链接会一起变。

**换头像** —— 新建 `assets/img/` 文件夹，把照片放进去，然后 `avatar: "assets/img/avatar.jpg"`。路径区分大小写。

**加一个项目** —— 复制 `projects.items` 里的一整段 `{ ... }`，粘在它后面，改内容。注意两段之间要有逗号。

**导航顺序/名称** —— 导航根据「已启用的版块」自动生成，不用手写。想调整顺序或名称，改 `assets/js/main.js` 顶部的 `SECTIONS`。

**加图标** —— 在 `assets/js/main.js` 顶部的 `ICONS` 里加一条 SVG path，然后在 `profile.js` 里用 `icon: "名字"`。

**导出成 PDF 简历** —— 浏览器里 `Ctrl + P`，模板已写好打印样式：自动隐藏导航栏和按钮，卡片不跨页断开。

---

## 本地预览

直接双击 `index.html` 就能在浏览器里打开（全部是相对路径，不需要起服务器）。改完 `profile.js` 保存，刷新页面即可。

---

## 部署

仓库名 `Albert-code-1114.github.io` 属于**用户主页仓库**，推送到 `main` 分支后会自动发布到 <https://albert-code-1114.github.io/>，不需要在 Settings 里额外配置。

想换域名或改发布分支：仓库 **Settings → Pages**。

---

## 常见问题

**改了没生效？** 先 `Ctrl + F5` 强制刷新（浏览器缓存），再等 1–2 分钟让 GitHub Pages 构建完成。可以在仓库的 **Actions** 标签页看到部署进度。

**整页空白？** 八成是 `profile.js` 里的语法错误：漏了逗号、引号没配对、用了中文引号 `“ ”`。按 `F12` 打开控制台，红色的报错会告诉你第几行。

**`git add` 报 LF/CRLF 告警？** 已经用 `.gitattributes` 修好了。如果换到别的仓库又遇到，照抄一份 `.gitattributes` 即可。

**中英切换按钮点了没反应？** 语言选择存在浏览器 `localStorage` 里，无痕模式下可能不保存，但不影响本次浏览。

**想让页面默认英文？** 改 `settings.defaultLang: "en"`。
