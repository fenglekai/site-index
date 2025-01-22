import { NavLinkItem } from ".";

export default {
  navTitle: "个人建站",
  children: [
    {
      site: "个人博客",
      url: "https://github-pages.devkai.cn/vitepress-blog/",
      introduction: "零碎的前端知识",
    },
    {
      site: "导出excel",
      url: "https://www.npmjs.com/package/awesome-excel",
      introduction: "基于exceljs集成简易导出功能",
    },
    {
      icon: "logo.png",
      site: "LessWriteUI组件",
      url: "https://github-pages.devkai.cn/less-write/",
      introduction: "Vue3组件库, Element Plus项目风格",
    },
    {
      icon: "logo.png",
      site: "版本Changelog生成",
      url: "https://github-pages.devkai.cn/less-write-changelog/",
      introduction:
        "基于conventional-changelog制作的Github Release日志生成工具",
    },
    {
      icon: "logo.png",
      site: "Vitepress主题",
      url: "https://github-pages.devkai.cn/less-write-vitepress-theme",
      introduction:
        "简易安装的Vitepress主题, 集成UnoCSS彩虹主题, Element Plus示例代码组件",
    },
    {
      site: "Github代理",
      url: "https://github.devkai.cn/",
      introduction: "可以访问Github查阅项目",
    },
    {
      icon: "logo.png",
      site: "首页站点",
      url: "/home",
      introduction: "个人设计的首页封面",
    },
    {
      icon: "logo.png",
      site: "Three.js效果",
      url: "/demo",
      introduction: "一些Three.js的示例",
    },
  ],
} as NavLinkItem;
