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

import personSite from "./person-site";
import webCli from "./web-cli";
import pluginTools from "./plugin-tools";
import uiComponents from "./ui-components";
import cssCli from "./css-cli";
import charts from "./charts";
import technicalDocuments from "./technical-documents";
import designResources from "./design-resources";
import otherTools from "./other-tools";
import ai from "./ai";

export type NavLinkItem = {
  id: string;
  navTitle: string;
  children: NavLinkItemChild[];
};

export type NavLinkItemChild = {
  site: string;
  url: string;
  introduction: string;
  icon?: string;
  onClick?: () => void
};

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

const navLink: NavLinkItem[] = [
  personSite,
  webCli,
  pluginTools,
  uiComponents,
  cssCli,
  charts,
  {
    id: 'api-doc',
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
        introduction: "不止于API设计、调试、文档、自动化测试",
      },
    ],
  },
  {
    id: 'web-test',
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
    id: 'operations',
    navTitle: "系统运维",
    children: [
      {
        site: "Docker",
        url: "https://www.docker.com/",
        introduction: "开发速度更快。随处运行。",
      },
      {
        site: "Docker Hub",
        url: "https://hub.docker.com/",
        introduction: "Docker提供的一项服务，用于与您的团队查找和共享容器映像",
      },
      {
        site: "Compose 模板文件",
        url: "https://yeasy.gitbook.io/docker_practice/compose/compose_file",
        introduction:
          "还在用复杂冗余的docker run？赶紧来试试编写Docker Compose",
      },
    ],
  },
  {
    id: 'ci-cd',
    navTitle: "CI/CD集成",
    children: [
      {
        site: "Jenkins",
        url: "https://www.jenkins.io/",
        introduction:
          "一个开源自动化服务器，使世界各地的开发人员能够可靠地构建、测试和部署他们的软件",
      },
      {
        site: "Drone",
        url: "https://drone.cool/",
        introduction:
          "Drone 是一个现代化的持续集成平台，它使忙碌的团队能够使用强大的云原生流水线引擎自动化他们的构建、测试和发布工作流。",
      },
    ],
  },
  {
    id: 'knowledge',
    navTitle: "笔记文档/知识库工具",
    children: [
      {
        icon: "https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*vMxOQIh4KBMAAAAAAAAAAAAADvuFAQ/original",
        site: "语雀",
        url: "https://www.yuque.com",
        introduction:
          "十万阿里人都在用的笔记与文档知识库，面向企业、组织或个人，提供全新的体系化知识管理，打造轻松流畅的工作协同。金融级数据安全、丰富的应用场景、强大的知识创作与管理，助力企业、个人轻松拥有云端知识库",
      },
      {
        site: "GitBook",
        url: "https://www.gitbook.com/",
        introduction:
          "GitBook 是一款面向工程团队的知识管理工具。它简化了知识共享，支持文档即代码，并具有 AI 驱动的搜索和洞察功能。免费注册！",
      },
      {
        site: "飞书",
        url: "https://www.feishu.cn/",
        introduction:
          "飞书——AI 时代先进生产力平台，不仅一站式整合即时沟通、智能日历、音视频会议、飞书文档、云盘等办公协作套件，更提供飞书OKR、飞书招聘、飞书绩效等组织管理产品，让目标更清晰，信息流动更顺畅，每一个人工作更高效更愉悦。先进团队，先用飞书。",
      },
      {
        site: "钉钉",
        url: "https://www.dingtalk.com/",
        introduction:
          "钉钉（Ding Talk）是阿里巴巴集团打造的企业级智能移动办公平台，引领未来新一代工作方式，将陪伴每一个企业成长，是数字经济时代的企业组织协同办公和应用开发平台，是新生产力工具。",
      },
    ],
  },
  technicalDocuments,
  {
    id: 'algorithm',
    navTitle: "数据结构与算法",
    children: [
      {
        site: "LeetCode",
        url: "https://leetcode.cn/",
        introduction:
          "海量技术面试题库，拥有算法、数据结构、系统设计等 1000+题目，帮助你高效提升编程技能，轻松拿下世界 IT 名企 Dream Offer。",
      },
      {
        site: "算法可视化",
        url: "https://segmentfault.com/a/1190000043803652",
        introduction: "一文弄懂 10 大排序算法",
      },
      {
        icon: "https://1908355091-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/spaces%2F-MJeEIvPDza7mczG0t-l%2Favatar-1602734260263.png?generation=1602734260462040&alt=media",
        site: "力扣加加",
        url: "https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution",
        introduction: "努力做西湖区最好的算法题解",
      },
      {
        site: "Hello 算法",
        url: "https://www.hello-algo.com/",
        introduction: "动画图解、一键运行的数据结构与算法教程",
      },
    ],
  },
  ai,
  designResources,
  {
    id: 'online-code',
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
        icon: "https://mdn.alipayobjects.com/huamei_frp8ut/afts/img/A*4jwaQZ4RGlgAAAAAAAAAAAAADt-KAQ/original",
        site: "Codeblitz",
        url: "https://codeblitz.cloud.alipay.com/zh",
        introduction:
          "Codeblitze 是由蚂蚁云研发团队打造的基于 OpenSumi 的纯前端 IDE 基础框架，相比于我们传统的 Cloud IDE，最大的特点是无需容器，只需一个浏览器就能运行 Web IDE。",
      },
    ],
  },
  otherTools,
];

export { projectContain, navLink };
