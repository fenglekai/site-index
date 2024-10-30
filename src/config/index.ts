import sgImg from "../assets/sgImg.png";
import reflect from "../assets/reflect.png";
import service from "../assets/service.png";
import sigma from "../assets/6sigma.png";
import cloudService from "../assets/cloudService.png";
import webSearch from "../assets/webSearch.png";

import previewSG from "../assets/previewSG.png";
import previewEcom from "../assets/previewEcom.png";
import previewStock from "../assets/previewStock.png";
import preview6Sigma from "../assets/preview6Sigma.png";
import previewMCS from "../assets/previewMCS.png";
import previewTCCS from "../assets/previewTCCS.png";
import previewE5AGV from "../assets/previewE5AGV.png";

const projectContain = [
  {
    url: "",
    LogoImg: sgImg,
    title: "品管系统 SmartGuard",
    description:
      "以热力图彰显风险痛点，结合稽核排配算法自动生成稽核计划。并以NLP技术结合CNN与机器学习算法，推荐解决对策与预防对策方向",
    detailImg: previewSG,
  },
  {
    url: "",
    LogoImg: reflect,
    title: "安规管理系统 E-compliance",
    description:
      "以热力图彰显安规产品执行状况，并与Agile系统对接，及时执行关键件变更，智能推算下次PVT/ECN时间，提前预警邮件通知",
    detailImg: previewEcom,
  },
  {
    url: "",
    LogoImg: service,
    title: "智能仓库管理",
    description:
      "可视化仓库内与仓库间工作绩效，对异常与员工进行精准化管理，同时建模预测所需人力，此外提供发料对策与预防对策推荐，给予仓管员与产线人员实作",
    detailImg: previewStock,
  },
  {
    url: "",
    LogoImg: sigma,
    title: "6 sigma智能搜寻引擎",
    description:
      "建立HMM模型，结合关键字词搜寻，建立关键字词与专案关联，能快速聚焦目标专案，提高使用效率",
    detailImg: preview6Sigma,
  },
  {
    url: "",
    LogoImg: cloudService,
    title: "MCS",
    description: "",
    detailImg: previewMCS,
  },
  {
    url: "",
    LogoImg: webSearch,
    title: "TCCS",
    description: "",
    detailImg: previewTCCS,
  },
  {
    url: "",
    LogoImg: webSearch,
    title: "E5-AGV投框看板",
    description:
      "与斯坦德AGV中控进行通信，简洁直观的展示大屏数据可视化界面。调度AGV订单任务实现一站式解决产线频繁切换页面的操作",
    detailImg: previewE5AGV,
  },
];

/**
 * 请注意添加网址尽量在最后，以免造成使用者习惯点错链接
 */

const navLink = [
  {
    navTitle: "个人建站",
    children: [
      {
        site: "个人博客",
        url: "https://blog.devkai.site/",
        introduction: "零碎的前端知识",
      },
      {
        site: "导出excel",
        url: "https://www.npmjs.com/package/awesome-excel",
        introduction: "基于exceljs集成简易导出功能",
      },
      {
        icon: "https://raw.githubusercontent.com/fenglekai/image-bed/refs/heads/master/logo.jpeg",
        site: "LessWriteUI组件",
        url: "https://fenglekai.github.io/less-write/",
        introduction: "Vue3组件库, Element Plus项目风格",
      },
      {
        icon: "https://raw.githubusercontent.com/fenglekai/image-bed/refs/heads/master/logo.jpeg",
        site: "版本Changelog生成",
        url: "https://fenglekai.github.io/less-write-changelog/",
        introduction:
          "基于conventional-changelog制作的Github Release日志生成工具",
      },
      {
        icon: "https://raw.githubusercontent.com/fenglekai/image-bed/refs/heads/master/logo.jpeg",
        site: "Vitepress主题",
        url: "https://fenglekai.github.io/less-write-vitepress-theme",
        introduction:
          "简易安装的Vitepress主题, 集成UnoCSS彩虹主题, Element Plus示例代码组件",
      },
      {
        site: "Github代理",
        url: "https://github.devkai.site/",
        introduction: "可以访问Github查阅项目",
      },
      {
        icon: "https://raw.githubusercontent.com/fenglekai/image-bed/refs/heads/master/logo.jpeg",
        site: "首页站点",
        url: "/home",
        introduction: "个人设计的首页封面",
      },
      {
        icon: "https://raw.githubusercontent.com/fenglekai/image-bed/refs/heads/master/logo.jpeg",
        site: "Three.js效果",
        url: "/demo",
        introduction: "一些Three.js的示例",
      },
    ],
  },
  {
    navTitle: "Web框架/服务框架",
    children: [
      {
        site: "Vue",
        url: "https://cn.vuejs.org/",
        introduction: "易学易用，性能出色，适用场景丰富的 Web 前端框架。",
      },
      {
        site: "Nuxt",
        url: "https://nuxt.com/",
        introduction: "Vue 3 框架的 SSR 版本",
      },
      {
        site: "React",
        url: "https://zh-hans.react.dev/",
        introduction: "用于构建 Web 和原生交互界面的库",
      },
      {
        site: "React Native",
        url: "https://www.reactnative.cn/",
        introduction: "使用 React 来创建 Android 和 iOS 的原生应用",
      },
      {
        site: "Koa",
        url: "https://koa.bootcss.com/",
        introduction: "基于 Node.js 平台的下一代 web 开发框架",
      },
      {
        site: "Electron",
        url: "https://www.electronjs.org/",
        introduction: "使用 JavaScript、HTML 和 CSS 构建跨平台桌面应用程序",
      },
      {
        icon: "https://vutron.cdget.com/favicon.ico",
        site: "Vutron",
        url: "https://vutron.cdget.com/",
        introduction:
          "Vutron 是一个用于开发 `Electron` 跨平台桌面应用程序的预配置模板。它使用 `Vue 3`，可让您轻松构建快速开发环境。",
      },
      {
        site: "Taro",
        url: "https://docs.taro.zone/docs/",
        introduction:
          "Taro 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 / 快手 小程序 / H5 / RN 等应用。",
      },
      {
        site: "Midway",
        url: "https://midwayjs.org/",
        introduction:
          "Midway 是阿里巴巴 - 淘宝前端架构团队，基于渐进式理念研发的 Node.js 框架，通过自研的依赖注入容器，搭配各种上层模块，组合出适用于不同场景的解决方案。",
      },
      {
        site: "微信公众平台",
        url: "https://mp.weixin.qq.com/",
        introduction:
          "微信公众平台，给个人、企业和组织提供业务服务与用户管理能力的全新服务平台。",
      },
    ],
  },
  {
    navTitle: "插件工具库",
    children: [
      {
        site: "Vite",
        url: "https://cn.vitejs.dev/",
        introduction:
          "Vite 是一个超快速的前端构建工具，推动着下一代网络应用的发展",
      },
      {
        site: "Grunt",
        url: "https://gruntjs.com/",
        introduction: "JavaScript 任务运行器",
      },
      {
        site: "Gulp",
        url: "https://gulpjs.com/",
        introduction: "自动化和增强工作流程的工具包",
      },
      {
        site: "Gulp(中文翻译)",
        url: "https://www.gulpjs.com.cn/",
        introduction: "自动化和增强工作流程的工具包",
      },
      {
        site: "rollup.js",
        url: "https://rollupjs.org/",
        introduction: "JavaScript 模块打包器",
      },
      {
        site: "Pinia",
        url: "https://pinia.vuejs.org/",
        introduction: "符合直觉的 Vue.js 状态管理库",
      },
      {
        site: "Vue Router",
        url: "https://router.vuejs.org/",
        introduction: "为 Vue.js 提供富有表现力、可配置的、方便的路由",
      },
      {
        site: "Redux",
        url: "https://redux.js.org/",
        introduction: "一个可预测、可维护的全局状态管理的 JS 库",
      },
      {
        site: "MobX(中文翻译)",
        url: "https://cn.mobx.js.org/",
        introduction: "React 简单、可扩展的状态管理",
      },
      {
        site: "Vue Use",
        url: "https://vueuse.org/",
        introduction: "Vue 组合实用程序集合, 包含了常用的组合式函数",
      },
      {
        site: "Lodash",
        url: "https://www.lodashjs.com/",
        introduction:
          "Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。",
      },
      {
        site: "Axios",
        url: "https://axios-http.com/",
        introduction:
          "Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js",
      },
      {
        site: "Socket.IO",
        url: "https://socket.io/",
        introduction: "适用于每个平台的双向低延迟通信",
      },
      {
        site: "Go Packages",
        url: "https://pkg.go.dev/",
        introduction:
          "Go 是一种开源编程语言，可以轻松构建简单、可靠、高效的软件。这里可以找到许多Go相关开源的库",
      },
      {
        site: "crates.io",
        url: "https://crates.io/",
        introduction: "Rust 社区的相关仓库",
      },
      {
        site: "Sequelize",
        url: "https://www.sequelize.cn/",
        introduction:
          "Sequelize 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。",
      },
      {
        site: "TypeORM",
        url: "https://www.sequelize.cn/",
        introduction:
          "可以在 NodeJS、浏览器、Cordova、PhoneGap、Ionic、React Native、NativeScript、Expo 和 Electron 平台上运行，并且可以与 TypeScript 和 JavaScript（ES5、ES6、ES7、ES8）一起使用。",
      },
      {
        site: "Leaflet",
        url: "https://leafletjs.cn/examples/quick-start/",
        introduction: "一个开源并且对移动端友好的交互式地图 JavaScript 库",
      },
    ],
  },
  {
    navTitle: "UI组件库",
    children: [
      {
        site: "Element Plus",
        url: "https://element-plus.org/zh-CN/",
        introduction: "基于 Vue 3，面向设计师和开发者的组件库",
      },
      {
        icon: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        site: "Ant Design",
        url: "https://ant.design/index-cn",
        introduction:
          "基于 Ant Design 设计体系的 React UI 组件库，用于研发企业级中后台产品。",
      },
      {
        site: "Vuetify",
        url: "https://vuetifyjs.com/zh-Hans/",
        introduction:
          "Vuetify 是一个不需要设计技能的开源 UI 库，具有精美手工制作的 Vue 组件。",
      },
      {
        site: "Vuesax",
        url: "https://vuesax.com/",
        introduction:
          "我们热爱自己的工作。让我们帮助您做您喜欢的事。一个设计风格独特的开源 UI 组件库",
      },
      {
        site: "Layui",
        url: "https://layui.dev/",
        introduction:
          "原生态 · 开源极简模块化 Web UI 组件库",
      },
      {
        site: "Naive UI",
        url: "https://www.naiveui.com/zh-CN/light",
        introduction:
          "一个 Vue 3 组件库 比较完整，主题可调，使用 TypeScript，快 有点意思",
      },
      {
        site: "Nut UI",
        url: "https://nutui.jd.com/#/",
        introduction:
          "京东风格的轻量级移动端组件库",
      },
      {
        site: "Taro UI",
        url: "https://taro-ui.jd.com/",
        introduction:
          "一套基于 Taro 框架开发的多端 UI 组件库",
      },
      {
        site: "Arco Design",
        url: "https://arco.design/",
        introduction:
          "字节跳动出品的企业级设计系统",
      },
      {
        site: "T Design",
        url: "https://tdesign.tencent.com/",
        introduction:
          "TDesign 是腾讯开源的企业级设计体系，提供了统一价值观，一致的设计语言和视觉风格，和开箱即用的 UI 组件库。致力于为设计师 & 开发者，打造工作美学。",
      },
      {
        site: "QFluentWidgets",
        url: "https://qfluentwidgets.com/zh/pages/about",
        introduction:
          "基于 C++ Qt/PyQt/PySide 的 Fluent Design 风格组件库，包含数以百计的流畅设计组件，为简化开发、提高效率而生。",
      },
      {
        site: "shadcn",
        url: "https://ui.shadcn.com/",
        introduction:
          "设计精美的组件，您可以将其复制并粘贴到您的应用中。",
      },
      {
        site: "shadcn-vue",
        url: "https://www.shadcn-vue.com/",
        introduction:
          "设计精美的组件，您可以将其复制并粘贴到您的应用程序中。可访问。可定制。开源。",
      },
      {
        site: "shadcn-vue",
        url: "https://www.shadcn-vue.com/",
        introduction:
          "设计精美的组件，您可以将其复制并粘贴到您的应用程序中。可访问。可定制。开源。",
      },
      {
        site: "fluent2",
        url: "https://fluent2.microsoft.design/",
        introduction:
          "探索 Microsoft 设计系统的下一次演进，实现前所未有的无缝协作和创造力。在设计到开发、应用之间和平台之间流畅切换。",
      },
    ],
  },
  {
    navTitle: "CSS框架",
    children: [
      {
        site: "Less",
        url: "https://lesscss.org/",
        introduction:
          "Less 使用变量、混合、操作和函数等动态行为扩展了 CSS。Less 可在服务器端（使用 Node.js 和 Rhino）或客户端（仅限现代浏览器）运行。",
      },
      {
        site: "Less(中文翻译)",
        url: "https://less.bootcss.com/",
        introduction:
          "Less 使用变量、混合、操作和函数等动态行为扩展了 CSS。Less 可在服务器端（使用 Node.js 和 Rhino）或客户端（仅限现代浏览器）运行。",
      },
      {
        site: "Sass",
        url: "https://sass-lang.com/",
        introduction:
          "Sass 是世界上最成熟、最稳定、最强大的专业级 CSS 扩展语言。",
      },
      {
        site: "Sass(中文翻译)",
        url: "https://www.sass.hk/",
        introduction:
          "Sass 是世界上最成熟、最稳定、最强大的专业级 CSS 扩展语言。",
      },
      {
        site: "Tailwindcss",
        url: "https://www.tailwindcss.cn/",
        introduction:
          "只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。",
      },
      {
        site: "UnoCSS",
        url: "https://unocss.dev/",
        introduction: "即时按需原子 CSS 引擎",
      },
    ],
  },
  {
    navTitle: "2D/3D图表库",
    children: [
      {
        site: "Echarts",
        url: "https://echarts.apache.org/zh/index.html",
        introduction: "一个基于 JavaScript 的开源可视化图表库",
      },
      {
        site: "AntV",
        url: "https://antv.antgroup.com/",
        introduction: "蚂蚁企业级数据可视化解决方案，让人们在数据世界里获得视觉化思考能力",
      },
      {
        site: "DataV",
        url: "http://datav-react.jiaminghi.com/",
        introduction: "React 大屏数据展示组件库(github有Vue版本)",
      },
      {
        icon: "https://threejs.org/files/favicon.ico",
        site: "ThreeJS",
        url: "https://threejs.org/",
        introduction: "3D动态模型绘制",
      },
      {
        site: "ThreeJS(中文教程)",
        url: "http://www.webgl3d.cn/",
        introduction: "提供Three.js、WebGL视频课程",
      },
      {
        site: "Pixijs",
        url: "https://pixijs.com/",
        introduction: "HTML5 创作引擎 使用最快、最灵活的 2D WebGL 渲染器创建精美的数字内容。",
      },
      {
        site: "Pixijs",
        url: "https://konvajs.org/",
        introduction: "用于桌面和移动应用程序的 HTML5 2d 画布 js 库",
      },
      {
        site: "LogicFlow",
        url: "https://site.logic-flow.cn/",
        introduction: "业务流程图编辑框架，低成本实现让逻辑管理更简单、更高效",
      },
    ],
  },
  {
    navTitle: "API文档/Mock调试",
    children: [
      {
        site: "Apifox",
        url: "https://app.apifox.com",
        introduction:
          "API 文档、API 调试、API Mock、API 自动化测试一体化协作平台",
      },
      {
        site: "Apipost",
        url: "https://www.apipost.cn/",
        introduction:
          "不止于API设计、调试、文档、自动化测试",
      },
    ],
  },
  {
    navTitle: "Web测试工具",
    children: [
      {
        site: "Playwright",
        url: "https://playwright.nodejs.cn/",
        introduction: "Playwright 为现代 Web 应用提供可靠的端到端测试。",
      },
    ],
  },
  {
    navTitle: "笔记文档/知识库工具",
    children: [
      {
        site: "语雀",
        url: "https://www.yuque.com",
        introduction: "十万阿里人都在用的笔记与文档知识库，面向企业、组织或个人，提供全新的体系化知识管理，打造轻松流畅的工作协同。金融级数据安全、丰富的应用场景、强大的知识创作与管理，助力企业、个人轻松拥有云端知识库",
      },
      {
        site: "飞书",
        url: "https://www.feishu.cn/",
        introduction: "飞书——AI 时代先进生产力平台，不仅一站式整合即时沟通、智能日历、音视频会议、飞书文档、云盘等办公协作套件，更提供飞书OKR、飞书招聘、飞书绩效等组织管理产品，让目标更清晰，信息流动更顺畅，每一个人工作更高效更愉悦。先进团队，先用飞书。",
      },
      {
        site: "钉钉",
        url: "https://www.dingtalk.com/",
        introduction: "钉钉（Ding Talk）是阿里巴巴集团打造的企业级智能移动办公平台，引领未来新一代工作方式，将陪伴每一个企业成长，是数字经济时代的企业组织协同办公和应用开发平台，是新生产力工具。",
      },
    ],
  },
  {
    navTitle: "技术文档",
    children: [
      {
        site: "MDN",
        url: "https://developer.mozilla.org/zh-CN/docs/Web",
        introduction: "面向 Web 开发者的文档",
      },
      {
        site: "思否",
        url: "https://segmentfault.com/",
        introduction: "SegmentFault 思否是中国领先的开发者技术社区。",
      },
      {
        icon: "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg",
        site: "稀土掘金",
        url: "https://juejin.cn/",
        introduction: "掘金是面向全球中文开发者的技术内容分享与交流平台。",
      },
      {
        site: "TGideas团队前端规范",
        url: "https://tgideas.qq.com/doc/frontend/",
        introduction:
          "本前端重构规范是由TGideas团队制定，面向合作伙伴的前端重构人员",
      },
      {
        site: "凹凸实验室前端规范",
        url: "https://guide.aotu.io/docs/index.html",
        introduction:
          "基于 W3C、苹果开发者 等官方文档，并结合团队日常业务需求以及团队在日常开发过程中总结提炼出的经验而制定。",
      },
      {
        site: "ES6 入门教程",
        url: "https://es6.ruanyifeng.com/",
        introduction:
          "JavaScript 语言教程，全面介绍 ECMAScript 6 新引入的语法特性",
      },
    ],
  },
  {
    navTitle: "设计资源",
    children: [
      {
        site: "即时设计",
        url: "https://js.design/",
        introduction: "可云端编辑的专业级 UI 设计工具",
      },
      {
        site: "摹客",
        url: "https://www.mockplus.cn/",
        introduction: "全能设计协作平台，产品经理用 RP，UI设计师用 DT",
      },
      {
        site: "蓝湖",
        url: "https://lanhuapp.com/",
        introduction: "蓝湖是一款产品文档和设计图的共享平台，帮助互联网团队更好地管理文档和设计图。蓝湖可以在线展示Axure，自动生成设计图标注，与团队共享设计图，展示页面之间的跳转关系。蓝湖支持从Sketch、Ps一键共享、在线讨论，而且蓝湖只需简单几步就能将设计图变成一个可以点击的演示原型，蓝湖还支持分享给同事，让他也可以在手机中查看设计效果。蓝湖已经成为新一代产品设计的工作方式。",
      },
      {
        site: "墨刀",
        url: "https://modao.cc/",
        introduction: "墨刀是A股上市公司万兴科技旗下的原型设计工具,支持APP、网站页面、管理后台、可视化大屏、工业HMI、小程序、H5多场景领域原型设计，AI智能生成组件、页面，智能填充，支持执行AI语义化指令，支持团队项目实时协作和管理，金融级数据安全保障，还支持私有化部署，是产品经理、设计师和技术开发团队必备工具。",
      },
      {
        site: "ColorSpace",
        url: "https://mycolor.space/",
        introduction: "设置自己喜欢的颜色并生成对应的渐变色",
      },
      {
        site: "palettemaker",
        url: "https://palettemaker.com/",
        introduction:
          "使用 AI 创建独特的配色方案并查看它们在真实的设计实例中栩栩如生",
      },
      {
        site: "coolors",
        url: "https://coolors.co/",
        introduction: "创建完美的调色板或从数千种美丽的配色方案中获得灵感。",
      },
      {
        site: "uigradients",
        url: "https://uigradients.com/",
        introduction: "选择你喜欢的渐变色并拷贝代码",
      },
      {
        site: "uigradients",
        url: "https://webgradients.com/",
        introduction:
          "180 个线性渐变的免费集合，您可以将其用作您网站任何部分的内容背景。",
      },
      {
        site: "gradienthunt",
        url: "https://gradienthunt.com/",
        introduction: "选择你喜欢的渐变色并拷贝代码",
      },
    ],
  },
  {
    navTitle: "线上代码",
    children: [
      {
        site: "StackBlitz",
        url: "https://stackblitz.com/",
        introduction:
          "StackBlitz 是适用于 JavaScript 生态系统的即时全栈 Web IDE。它由Web容器，第一个基于 WebAssembly 的操作系统，可在几毫秒内在您的浏览器选项卡内安全地启动 Node.js 环境。",
      },
      {
        site: "CodePen",
        url: "https://codepen.io/",
        introduction:
          "Pen Editor 是 CodePen 上最重要的页面！这是您实际编写制作笔的代码的地方。标准编辑器是 HTML、CSS 和 JavaScript。",
      },
      {
        site: "Codeblitz",
        url: "https://codeblitz.cloud.alipay.com/zh",
        introduction:
          "Codeblitze 是由蚂蚁云研发团队打造的基于 OpenSumi 的纯前端 IDE 基础框架，相比于我们传统的 Cloud IDE，最大的特点是无需容器，只需一个浏览器就能运行 Web IDE。",
      },
    ],
  },
  {
    navTitle: "其他工具",
    children: [
      {
        site: "Can I Use",
        url: "https://caniuse.com/",
        introduction: "查询浏览器css的支持范围",
      },
      {
        site: "Compose 模板文件",
        url: "https://yeasy.gitbook.io/docker_practice/compose/compose_file",
        introduction:
          "还在用复杂冗余的docker run？赶紧来试试编写Docker Compose",
      },
      {
        site: "设计导航",
        url: "http://hao.shejidaren.com/",
        introduction: "站点导航的灵感来源，集成了很多前端设计的站点",
      },
      {
        site: "Docker Hub",
        url: "https://hub.docker.com/",
        introduction: "Docker提供的一项服务，用于与您的团队查找和共享容器映像",
      },
      {
        site: "Emoji大全 | Emoji表情符号词典 | EmojiAll中文官方网站",
        url: "https://www.emojiall.com/zh-hans",
        introduction: "该网站提供了最新、完整的Emoji搜索和相关信息，包括表情符号含义、使用示例、Unicode代码点、高分辨率图片、复制和粘贴，以及Emoji大数据排名、矢量图形和动态图表、智能算法情感分析和表情符号语言学研究。",
      },
      {
        site: "Kenney",
        url: "https://www.kenney.nl/",
        introduction: "数以千计的完全免费的游戏资产供您使用。",
      },
      {
        site: "Free3D",
        url: "https://free3d.com/zh/",
        introduction: "免费3D模型，TF3DM是您可以分享您的免费3D资产并立即下载任何您喜欢的地方。 TF3DM拥有15000+三维模型，各种格式的BLENDER，OBJ，3DS，C4D，MAX，MAYA，您可以完全免费下载。",
      },
      {
        site: "在线转换图标文件",
        url: "https://www.aconvert.com/cn/icon/",
        introduction: "在线转换图标文件 - 将PNG转换为图标，将JPG转换为图标，将GIF转换为图标，将WEBP转换为图标，将SVG转换为图标。",
      },
      {
        site: "在线一次性调整多个图像文件的尺寸",
        url: "https://www.iloveimg.com/zh-cn/resize-image",
        introduction: "在几秒钟内，轻松地调整多个JPG, PNG, SVG或GIF图片的尺寸，并且免费。通过定义像素或百分比来批量调整图像的大小。",
      },
    ],
  },
];

export { projectContain, navLink };
