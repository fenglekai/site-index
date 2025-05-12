import { NavLinkItem } from ".";
import router from "../router";


export default {
  id: 'person',
  navTitle: "个人建站",
  children: [
    {
      icon: "logo.png",
      site: "站点导航",
      url: "/nav",
      introduction: "非常多的站点收集",
      onClick: () => router.push('/nav')
    },
    {
      icon: "logo.png",
      site: "星空",
      url: "/threejs",
      introduction: "一些Three.js的示例",
      onClick: () => router.push('/threejs')
    },
    {
      icon: "logo.png",
      site: "IAI首页",
      url: "/iai-home",
      introduction: "落地页展示",
      onClick: () => router.push('/iai-home')
    },
    {
      icon: "logo.png",
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
      url: "https://www.npmjs.com/package/less-write-changelog/",
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
  ],
} as NavLinkItem;
