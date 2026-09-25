/* ==========================================================================
   个人主页配置文件 —— 你只需要改这一个文件
   --------------------------------------------------------------------------
   ⚠️ 重要：这个文件是【公开】的
   GitHub Pages 的仓库任何人都能打开，profile.js 会被搜索引擎收录、被爬虫
   抓取。所以下面这些内容【千万不要】写进来：
     ✗ 学号 / 工号        ✗ 身份证号、护照号
     ✗ 家庭住址、宿舍楼号  ✗ 完整出生日期（年月日）
     ✗ 银行卡、密码、验证码、密钥
     ✗ 手机号（除非你确实想让全网看到）
   城市写到「中国 · 北京」这一级就够了，不要写到区/街道。

   三步搞定：
     1. 把下面引号里的示例内容换成你自己的信息；
     2. 用不到的版块，把 enabled 改成 false，页面上就自动隐藏；
     3. 保存 → 提交到 GitHub → 等一分钟，网站自动更新。

   五条小规则：
     · 只改【引号里】的文字，别动引号外面的字段名和括号结构；
     · 中英双语写成 { zh: "中文", en: "English" }；
       只写一句 "xxx" 也可以，中英文会显示同一句；
     · 留空 "" 或空数组 [] 的条目，页面上会自动不显示；
     · 英文懒得填就留空，会自动回退显示中文；
     · 用英文引号 " "，别用中文引号 “ ”。
   ========================================================================== */

const PROFILE = {

  /* ======================================================================
     0 · 站点设置
     ====================================================================== */
  settings: {
    defaultLang: "zh",   // 别人第一次打开时用什么语言："zh" 中文 / "en" 英文
    accent: "#2563eb",   // 主题色（一个颜色决定整站配色）
                         // 备选：#0f766e 墨绿 · #7c3aed 紫 · #ea580c 橙 · #0e7490 青
    avatar: "",          // 头像：把照片放进 assets/img/ 文件夹，再填 "assets/img/avatar.jpg"
                         // 留空 "" 会自动用姓名首字生成一个圆形头像

    /* ---- 邮箱防爬 ----------------------------------------------------
       故意拆成两段写。静态源码里不会出现完整的 xxx@yyy 字符串，
       只有访客的浏览器把它们拼起来，所以邮箱采集机器人抓不到。
       页面上显示、点击发信、复制按钮都照常工作。 */
    email: {
      user: "your-email",     // @ 前面的部分
      domain: "example.com"   // @ 后面的部分
    },

    /* ---- 是否允许搜索引擎收录 ----------------------------------------
       true  = 允许百度/谷歌收录（想让别人搜到你，用这个）
       false = 加 noindex 标记，请求搜索引擎不要收录（想低调一点，用这个）
       注意：这只是「请求」，不能阻止别人手动访问或转载。 */
    searchEngineIndex: true,

    footerNote: {        // 页脚右下角的一句话，留空则不显示
      zh: "由 GitHub Pages 托管",
      en: "Hosted on GitHub Pages"
    }
  },

  /* ======================================================================
     1 · 顶部个人信息（头像旁边那一块，改动最频繁的地方）
     ====================================================================== */
  hero: {
    name:     { zh: "XBingbing", en: "XBingbing" },
    role:     { zh: "计算机科学与技术 · 本科在读", en: "B.Sc. Student · Computer Science" },
    tagline:  { zh: "热爱编程与算法，正在寻找软件开发方向的实习机会。",
                en: "Passionate about coding and algorithms, looking for a software engineering internship." },

    // 只写到城市。不要写「××区××路××号」
    location: { zh: "中国 · 北京", en: "Beijing, China" },

    status:   { zh: "开放实习机会", en: "Open to internships" },  // 名字旁的小圆点标签，留空则不显示

    // 头像旁边的按钮。url 留空的那一项会自动隐藏
    // url 写 "#email" 表示「用上面 settings.email 拼出来的邮箱」，不用重复填
    links: [
      { icon: "github", label: { zh: "GitHub", en: "GitHub" }, url: "https://github.com/Albert-code-1114" },
      { icon: "mail",   label: { zh: "邮箱",   en: "Email"  }, url: "#email" },
      { icon: "file",   label: { zh: "下载简历", en: "Resume" }, url: "" }
      // ↑ 简历建议不要直接放进这个公开仓库：PDF 里通常有手机号和邮箱，
      //   一旦提交就永久留在 Git 历史里，谁都能下载。想放就看看 README 的「隐私保护」一节。
    ]
  },

  /* ======================================================================
     2 · 关于我（一段自我介绍 + 几个关键信息）
     ====================================================================== */
  about: {
    enabled: true,
    bio: {
      zh: "我是 XBingbing，目前就读于 ××大学计算机科学与技术专业。平时喜欢折腾后端开发和算法题，做过几个从零到一的小项目，也参加过一些学科竞赛。希望能在实习中把课堂上学到的东西用在真实的工程里。",
      en: "I'm XBingbing, an undergraduate majoring in Computer Science at ×× University. I enjoy backend development and algorithm problems, and I've built a few projects from scratch."
    },
    // 每个 fact 是一行「标签 + 内容」，不需要就把整行删掉
    facts: [
      { label: { zh: "求职方向",   en: "Looking for"  }, value: { zh: "后端开发 / 算法工程",           en: "Backend / Algorithm Engineering" } },
      { label: { zh: "可实习时间", en: "Availability" }, value: { zh: "2026 年暑期起，每周 4 天以上",   en: "From summer 2026, 4+ days per week" } },
      { label: { zh: "目前状态",   en: "Status"       }, value: { zh: "大三在读，预计 2027 年 6 月毕业", en: "Junior, graduating June 2027" } }
    ]
  },

  /* ======================================================================
     3 · 教育经历（可以写多段，比如本科 + 高中 / 交换经历）
     ====================================================================== */
  education: {
    enabled: true,
    items: [
      {
        school: { zh: "××大学", en: "×× University" },   // 写到学校名就好，不用写学院楼栋
        major:  { zh: "计算机科学与技术", en: "Computer Science" },
        degree: { zh: "本科", en: "B.Sc." },
        period: { zh: "2023.09 – 2027.06", en: "Sep 2023 – Jun 2027" },
        score:  { zh: "GPA 3.8 / 4.0（专业前 5%）", en: "GPA 3.8/4.0 (Top 5%)" },
                // ↑ 成绩排名属于可选信息。不想公开就把这行整个删掉，或改成 "GPA 3.8 / 4.0"
        details: [
          { zh: "核心课程：数据结构与算法、操作系统、计算机网络、数据库系统、机器学习",
            en: "Core courses: Data Structures & Algorithms, Operating Systems, Computer Networks, Database Systems, Machine Learning" },
          { zh: "连续两年获校级一等奖学金", en: "University First-class Scholarship for two consecutive years" }
        ]
      }
    ]
  },

  /* ======================================================================
     4 · 专业技能（每一组是一类技能，组名和内容都能改）
     ====================================================================== */
  skills: {
    enabled: true,
    groups: [
      {
        name: { zh: "编程语言", en: "Languages" },
        items: ["C / C++", "Python", "Java", "JavaScript", "SQL"]
      },
      {
        name: { zh: "框架与工具", en: "Frameworks & Tools" },
        items: ["Git", "Linux", "Docker", "MySQL", "Redis", "Spring Boot", "PyTorch"]
      },
      {
        name: { zh: "其他能力", en: "Other" },
        items: [
          { zh: "英语 CET-6（560 分），能读写英文技术文档", en: "English CET-6 (560)" },
          { zh: "熟悉常用数据结构与算法，刷题 400+",       en: "400+ algorithm problems solved" }
        ]
      }
    ]
  },

  /* ======================================================================
     5 · 项目经历（课程设计、竞赛作品、个人练手项目都写这里）
     ====================================================================== */
  projects: {
    enabled: true,
    items: [
      {
        name:   { zh: "校园二手交易平台", en: "Campus Second-hand Trading Platform" },
        role:   { zh: "课程项目 · 3 人小组，负责后端", en: "Course project · Team of 3, backend lead" },
        period: { zh: "2025.03 – 2025.06", en: "Mar 2025 – Jun 2025" },
        summary: { zh: "面向校内学生的二手物品交易网站，支持商品发布、分类搜索、站内私信与订单管理。",
                   en: "A second-hand trading website for students, supporting listings, search, private messages and order management." },
        // 每条写「我做了什么 + 结果/数字」，比只写功能有说服力
        highlights: [
          { zh: "用 Spring Boot + MySQL 设计并实现 12 个 REST 接口，压测 QPS 达到 800+。",
            en: "Designed 12 REST APIs with Spring Boot and MySQL, benchmarked at 800+ QPS." },
          { zh: "引入 Redis 缓存热门商品列表，列表接口平均响应时间从 210ms 降到 35ms。",
            en: "Added Redis caching for the hot-list API, cutting average latency from 210ms to 35ms." },
          { zh: "负责小组代码评审与 Git 分支规范，项目最终获课程评级 A。",
            en: "Led code review and Git workflow; the project received a grade of A." }
        ],
        tech: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
        links: [
          { label: { zh: "源码", en: "Source" }, url: "" },
          { label: { zh: "演示", en: "Demo"   }, url: "" }
        ]
      },
      {
        name:   { zh: "×× 数据可视化小工具", en: "×× Data Visualization Tool" },
        role:   { zh: "个人项目", en: "Personal project" },
        period: { zh: "2024.10 – 2024.12", en: "Oct 2024 – Dec 2024" },
        summary: { zh: "一个把 CSV 表格快速画成图表的网页小工具，纯前端实现，打开即用。",
                   en: "A pure front-end web tool that turns CSV files into charts instantly." },
        highlights: [
          { zh: "使用原生 JavaScript 实现 CSV 解析与图表绘制，无任何第三方依赖。",
            en: "Implemented CSV parsing and chart rendering in vanilla JavaScript with zero dependencies." },
          { zh: "部署到 GitHub Pages，累计被同学使用 300+ 次。",
            en: "Deployed on GitHub Pages with 300+ uses by classmates." }
        ],
        tech: ["JavaScript", "HTML", "CSS"],
        links: [
          { label: { zh: "源码", en: "Source" }, url: "" }
        ]
      }
    ]
  },

  /* ======================================================================
     6 · 校园经历（学生工作 / 社团 / 实习）—— 默认关闭，要用就把 enabled 改成 true
     ====================================================================== */
  experience: {
    enabled: false,
    items: [
      {
        org:    { zh: "校计算机协会", en: "Computer Association" },
        title:  { zh: "技术部 部长", en: "Head of Tech Department" },
        period: { zh: "2024.09 – 2025.06", en: "Sep 2024 – Jun 2025" },
        details: [
          { zh: "组织 6 场技术分享会，累计参与 400+ 人次。", en: "Organized 6 tech talks with 400+ attendees." },
          { zh: "带 12 人小组维护协会官网与报名系统。",       en: "Led a team of 12 maintaining the club website." }
        ]
      }
    ]
  },

  /* ======================================================================
     7 · 荣誉奖项
     ====================================================================== */
  awards: {
    enabled: true,
    items: [
      { title: { zh: "全国大学生数学建模竞赛 · 省级二等奖", en: "Mathematical Contest in Modeling · Provincial 2nd Prize" },
        date:  { zh: "2024.11", en: "Nov 2024" },
        note:  { zh: "担任队长", en: "Team lead" } },

      { title: { zh: "蓝桥杯程序设计大赛 · 省赛一等奖", en: "Lanqiao Cup Programming Contest · Provincial 1st Prize" },
        date:  { zh: "2024.04", en: "Apr 2024" },
        note:  { zh: "C/C++ 组", en: "C/C++ group" } },

      { title: { zh: "校级一等奖学金", en: "University First-class Scholarship" },
        date:  { zh: "2023 – 2024 学年", en: "2023 – 2024" },
        note:  "" }   // note 留空就不显示
    ]
  },

  /* ======================================================================
     8 · 联系方式（value 留空的那一条会自动隐藏）
     ----------------------------------------------------------------------
     写手机号之前请想清楚：写在这里 = 全网公开 + 可能被骚扰短信/诈骗电话盯上。
     更稳的做法是留空，让 HR 通过邮箱先联系你。
     微信 / QQ 号也一样，它们常被用来做账号找回和社会工程攻击，建议留空。
     ====================================================================== */
  contact: {
    enabled: true,
    intro: { zh: "欢迎通过下面任意一种方式联系我，我通常会在 24 小时内回复。",
             en: "Feel free to reach out through any channel below. I usually reply within 24 hours." },
    items: [
      // "#email" = 自动使用 settings.email 里拼出来的邮箱
      { icon: "mail",   label: { zh: "邮箱",   en: "Email"  }, value: "#email", url: "#email" },
      { icon: "github", label: { zh: "GitHub", en: "GitHub" }, value: "Albert-code-1114", url: "https://github.com/Albert-code-1114" },

      // ⚠️ 下面三条默认留空（页面上不显示）。确认要公开再填
      { icon: "phone",  label: { zh: "电话",   en: "Phone"  }, value: "", url: "" },
      { icon: "globe",  label: { zh: "博客",   en: "Blog"   }, value: "", url: "" },
      { icon: "users",  label: { zh: "微信",   en: "WeChat" }, value: "", url: "" }
    ]
  }

};
