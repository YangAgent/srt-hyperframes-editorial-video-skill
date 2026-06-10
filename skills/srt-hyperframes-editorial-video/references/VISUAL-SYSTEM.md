# 视觉系统

写 HTML 和 CSS 前先读取本文件。所有 scene 都必须通过统一 token 接入当前项目的视觉系统，
并以 `layout-patterns/` 中的单 layout 高保真 skeleton 作为主视觉结构来源。

## 视觉接入原则

所有视觉实现必须通过 `styles/tokens.css` 中的 token 接入当前视觉配置。layout 文件中的
HTML/CSS skeleton 是第一优先级；本文件只提供 token、字体、线条和少量安全 primitive 的
使用边界。

不要把 primitive class 当成可自由组合的组件库，也不要把 scene 做成盒子阵列。主视觉对象、
版面比例和 slot 结构必须来自当前 `layout_id` 对应的 layout 文件。

## 职责边界

`styles/tokens.css` 负责：

- 调色板：shell、surface、text、rule、accent。
- 字体家族：中文衬线 display、英文衬线 display / 数字、无衬线正文、等宽元信息。
- 性格旋钮：舞台 padding、小圆角、分割线粗细、hero 数字风格、暗角、颗粒、
  motion 默认时长和 easing。

scene 负责：

- 具体构图。
- 内容需要的局部字号和间距。
- 画面信息密度和视觉焦点。
- GSAP timeline 编排。

scene CSS 不要硬编码颜色和字体家族。不要写配置专属 class，也不要依赖当前项目以外的
视觉文件。能进入 scene 的视觉信息只有 token、当前 layout skeleton 和下方允许的辅助
primitive。

## 必备 Token

scene 只使用下列 token。不要使用当前项目以外的私有变量。

```css
--shell
--surface
--surface-2
--surface-3
--text
--text-2
--text-mute
--text-faint
--ghost-type-color
--rule
--accent
--accent-soft
--accent-glow
--font-display-cn
--font-display-en
--font-body
--font-mono
--font-features
--stage-pad-x
--stage-pad-y
--r-flat
--r-sm
--rule-w
--rule-style
--hero-num-font
--hero-num-style
--hero-num-weight
--hero-num-track
--type-kicker
--type-meta
--type-body-min
--type-body
--type-callout
--type-node
--type-result
--type-headline-sm
--type-headline-md
--type-headline-lg
--type-headline-xl
--type-stat
--type-ghost
--dur-enter
--dur-emphasis
--ease-enter
--ease-draw
--ease-impact
--surface-vignette
--grain-opacity
```

## Primitive Class

这些 class 是辅助视觉语言，不是布局组件库。优先使用当前 layout 文件给出的 class 和 slot；
只有在 skeleton 明确需要时，才补充使用下面的 primitive。

### 安全 Primitive

- `.ed-scene`：完整 1920x1080 scene 根节点。
- `.scene-pad`：token 控制的安全区和内容 padding。
- `.serif-cn`：中文 display 声音。
- `.serif-it`：英文 Playfair italic 编辑声音。
- `.label-mono`：大写等宽元信息和短标签。
- `.ed-meta`：来源、单位、时间、索引等元信息。
- `.ed-subline`：贴靠 headline 的内容性补充句。
- `.ed-result-label`：贴靠结果节点、after state、图形终点或 headline 组的结果短语。
- `.hero-num`：大号编辑感数字。
- `.rule`：token 控制的细线分割线。
- `.ed-axis`：克制的横向或纵向轴线，用于流程、对比、数据参照。
- `.ed-stat`：大号 tabular 数据数字。
- `.ed-ghost-type`：超大、低透明度英文背景字。
- `.ed-svg-layer`：SVG 图形、图表、路径和标注的承载层。
- `.ed-chart`：图表主体容器。
- `.ed-chart-axis`：图表轴线、基线或参照线。
- `.ed-chart-bar`：柱状、比例块或进度块。
- `.ed-path`：需要被 GSAP 绘制的图表线、趋势线、时间线、轨道或装饰性路径。
- `.ed-callout`：证据、截图、图片或图表上的标注说明。
- `.ed-marker`：关键点、拐点、证据定位或当前状态的视觉标记。
- `.ed-badge`：短标签、状态、编号或分类。
- `.ed-connector`：结构性轨道、轴线、分割线或容器内部的稳定线段。

不同 token 值会改变这些 primitive 的气质，但不改变 class 名称。scene 层只组合这些
class，不要为某套视觉配置另起一套组件名。

## Ghost Type Material Contract

`.ed-ghost-type` 是统一的背景材质 primitive，不是 scene 层可重新设计的标题组件。它只能承载
英文单词、短英文词组或拉丁缩写；不要使用中文 ghost type。

ghost type 的视觉强度由 `--ghost-type-color` 自带透明度决定。`.ed-ghost-type` 本身保持
`opacity: 1`，动画只负责从不可见淡入到该材质本身，不再用任意 opacity 数值调节强弱。

scene CSS 和 layout-specific ghost class 只能调整这些构图属性：

- 位置：`left`、`right`、`top`、`bottom`。
- 比例：`font-size` 或 `var(--type-ghost)` 的局部覆盖。
- 裁切和贴边关系：`transform`。

scene CSS 不得覆盖 `.ed-ghost-type` 的 `font-family`、`font-style`、`font-weight`、`letter-spacing`、
`line-height`、`color`、`opacity`、`pointer-events`、`user-select` 或 `white-space`。如果 ghost
type 过强或过弱，应调整 theme token `--ghost-type-color`，不要在单个 scene 中改 opacity。

## 图形 primitive 使用边界

图形化对象选择、主视觉锚点和 layout slot 归属由 `BEAT-ARCHETYPES.md` 和对应
`layout-patterns/<layout_id>.md` 文件决定。本文件只定义 scene 如何消费 token，以及哪些辅助 primitive
可以安全接入主题视觉系统。

如果 layout 文件与本文件的 primitive 清单发生冲突，以 layout 文件为准；如果 creator
想添加 skeleton 没有声明的大矩形、卡片阵列、面板阵列、节点阵列或 highlight 区域，应删除该
元素，而不是自行扩展版式。

## 连线禁用规则

不要绘制从一个独立元素指向另一个独立元素的自由连线，例如中心节点连四周节点、
节点之间的斜线、卡片到卡片的箭头、callout 线精确指向某个盒子。这类连线很容易因为
布局、字号或缩放变化而连歪。

表达关系时优先使用这些稳定形式：

- 邻接和对齐：把相关元素放在同一行、同一列或同一分区。
- 分组容器：用 cluster boundary、surface band、bracket 或 layout 明确给出的证据/
  状态表面表达归属；不要默认使用泛用面板或卡片。
- 轨道和轴线：使用不需要精确接到元素边缘的横向/纵向 rail、timeline、axis。
- 编号顺序：用数字、badge、step label 表达流程或因果顺序。
- 区域变化：用 before/after container、impact zone、highlight area 表达状态转化。

允许的线条只包括图表轴线、趋势线、时间线、分割线、括号、容器边界、扫描线和不需要连接
两个独立元素端点的轨道线。

## 字体分工

- 中文衬线 display 用于主标题、金句、结论句、结果主句和情绪重音。不要把长正文全设成 display。
- 英文衬线 display 用于英文强调词、ghost type、hero number、stat 数字和少量气质词。
- 数字优先使用 `.hero-num` 或 `.ed-stat`，保持 tabular nums；中文单位可贴靠数字，但解释句不要进入数字或 mono 样式。
- 等宽字体用于 kicker、编号、来源、单位、索引、极短英文分类标签和流程节点编号。
- 正文说明、节点描述、图注、结果解释使用 body 字体，保持无衬线可读性，不追求装饰性。
- 同一个 scene 中最多使用 2-3 种字体声音；标题、标签、正文的职责要清楚。

## 视频字号纪律

- 内容性中文文字不得低于 `--type-body-min`。
- 节点、状态容器、callout 和结果短语优先使用当前 layout skeleton 的专用 class，并配合
  `.ed-callout`、`.ed-result-label` 或对应 type token。
- `.label-mono` 只能承载 kicker、编号、来源、单位、索引、极短英文/数字元信息，不承载中文内容句。
- `caption`、`source`、`meta rail` 只能放真实元信息；来自 SRT 的语义内容应进入 headline、
  subline、structure label、result label、callout、axis label、state label 或 quote line。

## 线条和轴线

- 线条用于建立关系：分割、连接、轴线、数据参照。
- 线条必须细、少、克制；不要把画面做成复杂 dashboard。
- 流程线、轴线、分割线适合用 GSAP 绘制出来。
- 一幕里不要同时使用多套轴线和复杂边框。
- 边框只能用于证据主体、状态碎片、after block、chokepoint、annotation 等 layout 明确需要的
  局部对象；不要用边框框住每个概念。

## Token 消费纪律

- scene CSS 可以写局部字号、布局、gap 和动画 selector。
- scene CSS 不要写颜色 hex、字体名或配置专属变量。
- SVG 的 `stroke`、`fill`、`background`、`border` 等视觉属性也必须使用 token 或
  `currentColor`，不要写主题 hex。
- 如果视觉效果没有接入当前视觉配置，优先检查 scene 是否绕过 token 或 primitive class。

## 禁止事项

- 不要在 scene CSS 里写任意 hex 颜色。
- 不要在 scene CSS 里硬编码字体名。
- 不要把中文内容句写成 `.label-mono`、`source`、`caption` 或底部注脚。
- 不要用 emoji 当视觉图标。
- 不要用紫蓝/粉紫对角渐变、彩色左边框卡片、网页 UI 尺寸卡片。
- 不要快速搭出三列、四宫格、步骤卡片、状态卡片、因果卡片或结果大盒子。
- 不要所有 scene 都做居中堆叠。要锚定边缘，使用分屏，并制造明确主次层级。
- 不要用稳定页眉、页脚、脚注系统来模拟 PPT；本 skill 是视频，不是 slide deck。
