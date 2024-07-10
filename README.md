<div><h1 align="center">KAI的实验室</h1></div></div>

采用Vue3+Vite脚手架构建，搭配Element Plus和TailwindCSS简化代码体积。

![image-20240710142802043](https://raw.githubusercontent.com/fenglekai/image-bed/master/image-20240710142802043.png)

## 简介

本项目整合站点快速找到对应网站提供信息，不再依赖浏览器收藏夹；另外实现一些视觉效果。

- 首页布局设计
- 初始加载过渡
- 优化过渡效果
- 音乐歌词文字加载效果
- 毛玻璃卡牌效果
- 专案预览缩略图
- threeJS模型展示
- B站动态头部导航背景
- Gzip压缩构建包大小加快访问速度
- Jenkins自动部署流程
- 提供个人网站收藏与历史访问纪录
- 下载、上传本地链接
- 本地链接搜索提示
- giscus评论插件
- PWA支持



## 起步

```
pnpm install
pnpm run dev
```

### 配置

- 在`src/config/index.ts`下配置“专案服务介绍 / 链接”的`projectContain`卡牌信息
- 在`src/config/index.ts`下配置“站点导航”的`navLink`卡牌信息

## 打包

```
pnpm run build
```
