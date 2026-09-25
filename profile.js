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
   城市写到「中国 · 合肥」这一级就够了，不要写到区/街道。

   三步搞定：
     1. 把下面引号里的内容换成你自己的信息；
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
       页面上显示、点击发信、复制按钮都照常工作。

       ⚠️ 现在两行都是空的 —— 主页顶部的「邮箱」按钮和「联系方式」里的
          邮箱条目会自动隐藏，联系方式暂时只剩 GitHub。
          把下面两行填上，邮箱就会自动出现在页面上，不用改别的地方。

       为什么不用学校邮箱：那个地址的用户名就是你真实姓名的拼音，
       而主页用的是网名 XBingbing —— 两者一对上就等于公开真名，
       而且它刚从 Git 历史里清理过，不该再主动放出来。

       建议注册一个与网名一致的专用邮箱（Outlook / 163 都免费）：
           xbingbing@outlook.com   ·   xbingbing.dev@163.com
       只用来投简历，不混私人邮件。将来开始收到垃圾邮件，直接弃用换一个。 */
    email: {
      user: "",       // @ 前面的部分，例如 "xbingbing"
      domain: ""      // @ 后面的部分，例如 "outlook.com"
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
     1 · 顶部个人信息（头像旁边那一块）
     ====================================================================== */
  hero: {
    name:     { zh: "XBingbing", en: "XBingbing" },
    role:     { zh: "中国科学技术大学 · 机器人工程（本科在读）",
                en: "Robotics Engineering Undergraduate · USTC" },
    tagline:  { zh: "专注机器人结构设计与机械设计。RoboMaster 校 RoboWalker 战队机械组成员，目前在校机器人创新实践基地做轮腿底盘研发。",
                en: "Focused on robotic structural design and mechanical engineering. Mechanical team member of the USTC RoboWalker RoboMaster team, currently developing a wheel-legged chassis at the campus robotics base." },

    // 只写到城市。不要写「××区××路××号」
    location: { zh: "中国 · 合肥", en: "Hefei, China" },

    status:   { zh: "寻找结构设计方向实习", en: "Seeking a structural design internship" },

    // 头像旁边的按钮。url 留空的那一项会自动隐藏
    // url 写 "#email" 表示「用上面 settings.email 拼出来的邮箱」，不用重复填
    links: [
      { icon: "github", label: { zh: "GitHub", en: "GitHub" }, url: "https://github.com/Albert-code-1114" },
      { icon: "mail",   label: { zh: "邮箱",   en: "Email"  }, url: "#email" },
      { icon: "file",   label: { zh: "下载简历", en: "Resume" }, url: "" }
      // ↑ 简历 PDF 里印着手机号和邮箱，直接放进公开仓库等于公开下载链接，
      //   而且提交后会永久留在 Git 历史里。放之前先看 GUIDE.md 的「简历 PDF」一节。
    ]
  },

  /* ======================================================================
     2 · 关于我
     ====================================================================== */
  about: {
    enabled: true,
    bio: {
      zh: "我是 XBingbing，中国科学技术大学工程科学学院机器人工程专业本科生。喜欢把设计从图纸做到实物：构型比选、建模出图、对接加工、装配调试，整条链路都想亲手走一遍。目前在校机器人创新实践基地负责轮腿底盘的机械结构，同时是 RoboMaster 校 RoboWalker 战队机械组成员。",
      en: "I'm XBingbing, an undergraduate in Robotics Engineering at the School of Engineering Science, USTC. I like taking a design all the way from drawing to hardware: concept selection, modeling and drafting, fabrication coordination, assembly and tuning. I currently work on the mechanical structure of a wheel-legged chassis at the campus robotics base and serve on the mechanical team of the USTC RoboWalker RoboMaster team."
    },
    facts: [
      { label: { zh: "求职方向",   en: "Looking for"  }, value: { zh: "机器人结构设计 / 机械设计",       en: "Robotic Structural Design / Mechanical Design" } },
      { label: { zh: "在研方向",   en: "Current focus" }, value: { zh: "轮腿底盘 / 轮腿英雄机器人结构",   en: "Wheel-legged chassis & Hero robot structure" } },
      { label: { zh: "目前状态",   en: "Status"       }, value: { zh: "大二在读，预计 2029 年 6 月毕业", en: "Sophomore, graduating June 2029" } }
    ]
  },

  /* ======================================================================
     3 · 教育经历
     ====================================================================== */
  education: {
    enabled: true,
    items: [
      {
        school: { zh: "中国科学技术大学", en: "University of Science and Technology of China" },
        major:  { zh: "工程科学学院 · 机器人工程", en: "School of Engineering Science · Robotics Engineering" },
        degree: { zh: "本科", en: "B.Eng." },
        period: { zh: "2025.09 – 2029.06", en: "Sep 2025 – Jun 2029" },
        score:  { zh: "英语 CET-4 581 / CET-6 520", en: "English: CET-4 581 / CET-6 520" },
        details: [
          { zh: "核心课程：数学分析、力学、电磁学、理论力学、机械设计基础、电路、工程制图、人工智能",
            en: "Core courses: Mathematical Analysis, Mechanics, Electromagnetism, Theoretical Mechanics, Fundamentals of Mechanical Design, Circuits, Engineering Drawing, Artificial Intelligence" },
          { zh: "拟修读华五「AI+X」微专业；完成英文学术演讲（人工肌肉与仿人机器人）",
            en: "Planning to take the Yangtze Delta Five Universities 「AI+X」 micro-major; delivered an academic presentation in English on artificial muscles and humanoid robots" }
        ]
      }
    ]
  },

  /* ======================================================================
     4 · 科研经历
     ====================================================================== */
  research: {
    enabled: true,
    items: [
      {
        org:    { zh: "机器人创新实践基地 · 轮腿底盘研发", en: "Robotics Innovation Practice Base · Wheel-Legged Chassis R&D" },
        title:  { zh: "机械组核心成员", en: "Core member, Mechanical Group" },
        period: { zh: "2025.09 – 2026.09", en: "Sep 2025 – Sep 2026" },
        details: [
          { zh: "主导第一版轮腿底盘研制：调研全国高校机器人实验室方案，完成构型比选与整机装配调试",
            en: "Led the development of the first wheel-legged chassis: surveyed robot labs across Chinese universities, completed configuration trade-off studies, and handled full-machine assembly and tuning" },
          { zh: "独立重构腿部轴系，提升承载与传动稳定性；完成 4 台机器人云台的加工与组装",
            en: "Independently redesigned the leg shaft system to improve load capacity and transmission stability; machined and assembled 4 robot gimbals" },
          { zh: "参与底盘轻量化设计；培训低年级同学机械设计并沉淀装配调试规范",
            en: "Contributed to chassis lightweighting; trained junior students in mechanical design and documented assembly & tuning standards" },
          { zh: "导师评语：「该同学机械设计能力深厚，同时积极负责实验室相关事务……综合来看，该生表现优秀。」",
            en: "Advisor's comment: “Deep mechanical design skills and a strong sense of responsibility for lab affairs… Overall an outstanding student.”" }
        ]
      }
    ]
  },

  /* ======================================================================
     5 · 竞赛与荣誉（条目可选加 details，写多行要点）
     ====================================================================== */
  awards: {
    enabled: true,
    items: [
      {
        title: { zh: "RoboMaster 2026 机甲大师超级对抗赛（RMUC）· 全国赛二等奖",
                 en: "RoboMaster 2026 University Championship (RMUC) · National Second Prize" },
        date:  { zh: "2025.10 – 2026.08", en: "Oct 2025 – Aug 2026" },
        note:  { zh: "校 RoboWalker 战队 · 机械组", en: "USTC RoboWalker Team · Mechanical Group" },
        details: [
          { zh: "全国赛二等奖（团队奖，校 RoboWalker 战队）",
            en: "National Second Prize (team award, USTC RoboWalker Team)" },
          { zh: "区域赛（东部赛区）与全国赛梯队队员；26 赛季复活赛担任 1 号机器人操作手",
            en: "Rotation-squad member at the East China Regional and the National Finals; operated robot No.1 in the 2026 season revival round" },
          { zh: "设计 26 赛季轮腿英雄机器人结构：零件建模与出图、BOM 编制，对接 CNC / 碳纤维 / 3D 打印加工资源",
            en: "Designed the wheel-legged Hero robot structure for the 2026 season: part modeling and drafting, BOM preparation, and coordination with CNC, carbon-fiber and 3D-printing vendors" }
        ]
      },
      {
        title: { zh: "中国科大武术协会比武大会 · 自由搏击男子组轻量级一等奖",
                 en: "USTC Martial Arts Association Tournament · First Prize, Men's Lightweight Free Combat" },
        date:  { zh: "2026", en: "2026" },
        note:  ""
      },
      {
        title: { zh: "大学生骨干培训班结业 · 优秀学员",
                 en: "Student Leadership Training Program · Outstanding Trainee" },
        date:  "",
        note:  ""
      }
    ]
  },

  /* ======================================================================
     6 · 项目经历
     ====================================================================== */
  projects: {
    enabled: true,
    items: [
      {
        name:   { zh: "开源插件依赖解析缺陷定位与修复", en: "Diagnosing and Fixing a Dependency-Resolution Defect in an Open-Source Plugin" },
        role:   { zh: "独立完成", en: "Solo project" },
        period: { zh: "2026.09", en: "Sep 2026" },
        summary: { zh: "定位并修复某开源工具第三方插件依赖预检的误报缺陷，解除其对插件安装的真实阻断。",
                   en: "Tracked down and fixed a false-positive defect in an open-source tool's plugin dependency pre-check, which was genuinely blocking plugin installation." },
        highlights: [
          { zh: "定位根因：预检逻辑仅扫描单层 node_modules，未遵循 Node 逐级向上解析语义。",
            en: "Root cause: the pre-check only scanned a single level of node_modules and did not follow Node's step-by-step upward resolution semantics." },
          { zh: "量化影响：面板报出 32 个「缺失依赖」，实测 31 个可正常解析，且热挂载拦截会真实阻断插件安装。",
            en: "Quantified the impact: the panel reported 32 “missing dependencies”, of which 31 resolved normally in practice — while the hot-mount guard genuinely blocked installation." },
          { zh: "重写解析链（逐级向上枚举 + 从插件自身目录解析），消除误报并解除拦截；产出补丁文档与原件备份。",
            en: "Rewrote the resolution chain (step-by-step upward enumeration plus resolution from the plugin's own directory), eliminating the false positives and lifting the block; produced patch documentation and a backup of the original files." }
        ],
        tech: ["JavaScript", "Node.js"],
        links: []
      },
      {
        name:   { zh: "GitHub Pages 中英双语个人主页模板", en: "Bilingual Personal Homepage Template on GitHub Pages" },
        role:   { zh: "独立开发", en: "Solo project" },
        period: { zh: "2026.09", en: "Sep 2026" },
        summary: { zh: "零第三方依赖的中英双语个人主页模板，改单一配置文件即可上线。",
                   en: "A bilingual personal homepage template with zero third-party dependencies — edit a single config file and it goes live." },
        highlights: [
          { zh: "构建配置驱动的渲染引擎，页面全部内容由 profile.js 提供，中英一键切换。",
            en: "Built a config-driven rendering engine: all page content comes from profile.js, with one-click Chinese/English switching." },
          { zh: "内置隐私防护：邮箱拆分存储防爬、危险协议拦截、robots.txt 挡 PDF、noindex 开关。",
            en: "Built-in privacy protection: split-format email storage against scrapers, dangerous-protocol blocking, robots.txt PDF exclusion and a noindex switch." },
          { zh: "不加载任何 CDN、外部字体或统计脚本，访客信息不流向第三方。",
            en: "Loads no CDN, external fonts or analytics scripts, so no visitor data leaks to third parties." }
        ],
        tech: ["JavaScript", "HTML", "CSS"],
        links: [
          { label: { zh: "源码", en: "Source" }, url: "https://github.com/Albert-code-1114/Albert-code-1114.github.io" }
        ]
      }
    ]
  },

  /* ======================================================================
     7 · 校园经历（学生工作与志愿服务）
     ====================================================================== */
  experience: {
    enabled: true,
    items: [
      {
        org:    { zh: "校学生武术协会", en: "USTC Student Martial Arts Association" },
        title:  { zh: "团支书（2026 – 2027 届）", en: "League Branch Secretary (2026 – 2027 term)" },
        period: { zh: "2026.06 – 至今", en: "Jun 2026 – Present" },
        details: [
          { zh: "负责协会团务与思想引领；参与组织「武动青春」比武大会等大型活动。",
            en: "Responsible for the association's League affairs and student guidance; helped organize large events such as the 「Martial Youth」 tournament." }
        ]
      },
      {
        org:    { zh: "芳草社青年志愿者协会", en: "Fangcao Youth Volunteer Association" },
        title:  { zh: "活动实践部 干事", en: "Officer, Activity & Practice Department" },
        period: { zh: "2025.09 – 2026.08", en: "Sep 2025 – Aug 2026" },
        details: [
          { zh: "参与社团嘉年华、助残日、「天天向上」项目等事务（校团委出具履职证明）。",
            en: "Took part in the club carnival, Disability Care Day and the 「Keep Going Up」 project, among others (service certificate issued by the University Youth League Committee)." }
        ]
      }
    ]
  },

  /* ======================================================================
     8 · 专业技能
     ====================================================================== */
  skills: {
    enabled: true,
    groups: [
      {
        name: { zh: "机械设计", en: "Mechanical Design" },
        items: [
          { zh: "SolidWorks（零件 / 装配 / 工程图）", en: "SolidWorks (parts / assemblies / drawings)" },
          { zh: "机构方案设计", en: "Mechanism concept design" },
          { zh: "CNC 与碳纤维加工工艺对接", en: "CNC & carbon-fiber fabrication coordination" },
          { zh: "BOM 编制", en: "BOM preparation" }
        ]
      },
      {
        name: { zh: "编程开发", en: "Programming" },
        items: [
          { zh: "C / C++（51 单片机、STM32 入门）", en: "C / C++ (8051 MCU, beginner-level STM32)" },
          "Python",
          { zh: "JavaScript / HTML / CSS", en: "JavaScript / HTML / CSS" },
          { zh: "Git 与 GitHub", en: "Git & GitHub" }
        ]
      },
      {
        name: { zh: "工具平台", en: "Tools & Platforms" },
        items: ["SolidWorks", "VS Code", "CLion", "Keil uVision", "MATLAB", "WPS / Office"]
      },
      {
        name: { zh: "语言与其他", en: "Languages & Other" },
        items: [
          { zh: "英语 CET-4 581 / CET-6 520", en: "English: CET-4 581 / CET-6 520" },
          { zh: "可读写专业文献与英文技术资料", en: "Reads and writes professional literature and technical material in English" },
          { zh: "可完成英文学术演讲", en: "Can deliver academic presentations in English" },
          { zh: "文献检索与信息整理", en: "Literature search and information synthesis" }
        ]
      }
    ]
  },

  /* ======================================================================
     9 · 联系方式（value 留空的那一条会自动隐藏）
     ----------------------------------------------------------------------
     手机号已按你的要求留空。写之前请想清楚：写在公开页面上 = 全网可见，
     可能招来骚扰电话和诈骗短信。
     ====================================================================== */
  contact: {
    enabled: true,
    intro: { zh: "有结构设计相关的实习机会，或者想聊聊机器人，都欢迎通过下面的方式找我。",
             en: "If you have a structural design internship, or just want to talk robots, feel free to reach out below." },
    items: [
      // "#email" = 自动使用 settings.email 里拼出来的邮箱
      { icon: "mail",   label: { zh: "邮箱",   en: "Email"  }, value: "#email", url: "#email" },
      { icon: "github", label: { zh: "GitHub", en: "GitHub" }, value: "Albert-code-1114", url: "https://github.com/Albert-code-1114" },

      // 下面几条默认留空（页面上不显示）。确认要公开再填
      { icon: "phone",  label: { zh: "电话",   en: "Phone"  }, value: "", url: "" },
      { icon: "globe",  label: { zh: "博客",   en: "Blog"   }, value: "", url: "" },
      { icon: "users",  label: { zh: "微信",   en: "WeChat" }, value: "", url: "" }
    ]
  }

};
