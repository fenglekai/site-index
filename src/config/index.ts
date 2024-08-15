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
        site: "LessWriteUI组件",
        url: "https://www.npmjs.com/package/less-write-ui",
        introduction: "Vue3组件库",
      },
      {
        site: "Github代理",
        url: "https://github.devkai.site/",
        introduction: "可以访问Github查阅项目",
      },
      {
        site: "首页站点",
        url: "/home",
        introduction: "个人设计的首页封面",
      },
      {
        site: "Three.js效果",
        url: "/demo",
        introduction: "一些Three.js的示例",
      },
    ],
  },
  {
    navTitle: "框架、UI",
    children: [
      {
        site: "Vue",
        url: "https://cn.vuejs.org/",
        introduction: "易学易用，性能出色，适用场景丰富的 Web 前端框架。",
      },
      {
        site: "Element Plus",
        url: "https://element-plus.org/zh-CN/",
        introduction: "基于 Vue 3，面向设计师和开发者的组件库",
      },
      {
        site: "Ant Design",
        url: "https://ant.design/index-cn",
        introduction:
          "助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～",
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
        site: "稀土掘金",
        url: "https://juejin.cn/",
        introduction: "掘金是面向全球中文开发者的技术内容分享与交流平台。",
      },
      {
        site: "TGideas团队前端规范",
        url: "https://tgideas.qq.com/doc/frontend/",
        introduction: "本前端重构规范是由TGideas团队制定，面向合作伙伴的前端重构人员",
      },
      {
        site: "凹凸实验室前端规范",
        url: "https://guide.aotu.io/docs/index.html",
        introduction: "基于 W3C、苹果开发者 等官方文档，并结合团队日常业务需求以及团队在日常开发过程中总结提炼出的经验而制定。",
      },
      {
        site: "ES6 入门教程",
        url: "https://es6.ruanyifeng.com/",
        introduction: "JavaScript 语言教程，全面介绍 ECMAScript 6 新引入的语法特性",
      },
    ],
  },
  {
    navTitle: "组件库",
    children: [
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
      {
        site: "Echarts",
        url: "https://echarts.apache.org/zh/index.html",
        introduction: "一个基于 JavaScript 的开源可视化图表库",
      },
      {
        site: "DataV",
        url: "http://datav-react.jiaminghi.com/",
        introduction: "React 大屏数据展示组件库(github有Vue版本)",
      },
      {
        site: "ThreeJS",
        url: "https://threejs.org/",
        introduction: "3D动态模型绘制",
      },
    ],
  },
  {
    navTitle: "设计资源",
    children: [
      {
        site: "即时设计",
        url: "https://js.design/home",
        introduction:
          "可云端编辑的专业级 UI 设计工具",
      },
      {
        site: "摹客",
        url: "https://www.mockplus.cn/",
        introduction:
          "全能设计协作平台，产品经理用 RP，UI设计师用 DT",
      },
      {
        site: "ColorSpace",
        url: "https://mycolor.space/",
        introduction:
          "设置自己喜欢的颜色并生成对应的渐变色",
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
        introduction:
          "创建完美的调色板或从数千种美丽的配色方案中获得灵感。",
      },
      {
        site: "uigradients",
        url: "https://uigradients.com/",
        introduction:
          "选择你喜欢的渐变色并拷贝代码",
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
        introduction:
          "选择你喜欢的渐变色并拷贝代码",
      },
    ],
  },
  {
    navTitle: "线上代码",
    children: [
      {
        site: "StackBlitz",
        url: "https://stackblitz.com/",
        introduction: "StackBlitz 是适用于 JavaScript 生态系统的即时全栈 Web IDE。它由Web容器，第一个基于 WebAssembly 的操作系统，可在几毫秒内在您的浏览器选项卡内安全地启动 Node.js 环境。",
      },
      {
        site: "CodePen",
        url: "https://codepen.io/",
        introduction: "Pen Editor 是 CodePen 上最重要的页面！这是您实际编写制作笔的代码的地方。标准编辑器是 HTML、CSS 和 JavaScript。",
      },
    ]
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
        introduction:
          "Docker提供的一项服务，用于与您的团队查找和共享容器映像",
      },
      {
        site: "emojiall",
        url: "https://www.emojiall.com/zh-hans",
        introduction:
          "你可能需要一些表情包来修饰你文字内容",
      },
      {
        site: "Apifox",
        url: "https://app.apifox.com/main",
        introduction:
          "API 文档、API 调试、API Mock、API 自动化测试一体化协作平台",
      },
    ],
  },
];

export { projectContain, navLink };
