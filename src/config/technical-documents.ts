import { NavLinkItem } from ".";

export default {
  id: 'doc',
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
    {
      site: "JSDoc 中文文档",
      url: "https://jsdoc.bootcss.com/",
      introduction:
        "JSDoc 3 是一个用于 JavaScript 的API文档生成器，类似于 Javadoc 或 phpDocumentor。可以将文档注释直接添加到源代码中。",
    },
    {
      site: "WebAssembly中文网",
      url: "https://wasmdev.cn/",
      introduction:
        "一个收集和翻译WebAssembly技术文章和教程的网站。",
    },
    {
      icon: "https://kaisery.github.io/trpl-zh-cn/favicon.png",
      site: "Rust 程序设计语言中文版",
      url: "https://kaisery.github.io/trpl-zh-cn/",
      introduction:
        "本书的英文原版作者为 Steve Klabnik 和 Carol Nichols，并由 Rust 社区补充完善。本简体中文译本由 Rust 中文社区翻译。",
    },
  ],
} as NavLinkItem;
