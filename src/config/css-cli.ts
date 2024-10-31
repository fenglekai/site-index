import { NavLinkItem } from ".";

export default {
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
} as NavLinkItem;
