# MathStudy 高三数学学习站

面向新高考学生的导数与立体几何学习网站。项目是纯静态站点：课程、例题和题库都直接写在 HTML 中，配合原生 CSS、JavaScript 与 MathJax，不使用前端框架、数据库或构建工具。

## 当前页面

- 学习首页：`site/index.html`
- 导数：导数基础、单调性、极值与最值、切线、零点、参数、不等式、综合训练与实际优化
- 立体几何：空间向量、平行与垂直、空间角、距离、体积、综合证明、外接球与截面
- 题库：内嵌 HTML 题目，按专题、难度和年份筛选
- 阶段测验：基础卷与 24 分综合卷
- 学习工具：公式速查、解题模板、高频易错清单和浏览器本地学习进度
- 开发计划：HTML 网站脑图与里程碑

## 访问方式

可以直接打开 `site/index.html`。为模拟 GitHub Pages 的访问方式，也可以启动本地静态服务器：

```bash
python3 -m http.server 8000 --directory site
```

然后打开 <http://localhost:8000>。

## GitHub Pages

仓库包含 GitHub Pages 工作流。推送到 `main` 或 `newstudy` 分支后，工作流会把 `site/` 作为纯静态网站发布，不会执行打包或编译。

在仓库的 **Settings → Pages → Build and deployment** 中将 Source 设置为 **GitHub Actions**。

## 自动检查

```bash
python3 -m unittest discover -s tests -v
```

## 内容范围

- 正式高考：2022—2026 年，北京、上海、江苏、浙江、广东、四川、湖北、湖南。
- 模拟考试：2024—2026 年；北京海淀与西城，上海市级，南京与南通，杭州与宁波，广州与深圳，成都与绵阳，武汉与黄冈，长沙与衡阳，以及对应省级统考。
- 真题和模拟题必须完成来源核验；解析独立编写，不复制商业教辅解析。
