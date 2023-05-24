# KAI站点导航首页

采用Vue3+Vite脚手架构建，搭配Element Plus和TailwindCSS简化代码体积。

## 简介

本项目整合站点快速找到对应网站提供信息；不再依赖浏览器收藏夹。

- 首页布局设计
- 初始加载过渡
- 优化过渡效果
- 音乐歌词文字加载效果
- 毛玻璃卡牌效果
- 专案预览缩略图
- threeJS模型展示
- B站动态头部导航背景
- Gzip压缩构建包大小加快访问速度

### 将来实现

- [x] 设计卡牌组件
- [x] 整合站点列表到公共文件
- [x] 分类
- [ ] ~~预览网页~~
- [x] 提供个人网站收藏与历史访问纪录
- [x] 集成搜索引擎（google、bing、baidu）
- [x] 下载、上传本地链接
- [x] 本地链接搜索提示
- [ ] 智能推荐排序




## 起步

```
npm install
npm run dev
```

### 配置

- 在`src/config/index.ts`下配置“专案服务介绍 / 链接”的`projectContain`卡牌信息
- 在`src/config/index.ts`下配置“站点导航”的`navLink`卡牌信息

## 打包

```
npm run build
```



## 问题

如果出现`Module '"jarallax"' has no exported member 'jarallaxVideo'.`问题请在jarallax的声明文件声明函数

```
export function jarallaxVideo(): void;
```


