# 动画规范

写 GSAP timeline 前先读取本文件。所有动画必须可被 HyperFrames 确定性 seek 和 render。

本文件只定义通用动画契约、动画红线、常用 motion verb 和默认节奏。SRT 相对时间、focus cue、
三态、scene 结尾保持、以及 scene 内状态覆盖问题，统一以 `TIMING-CANON.md` 为权威来源。
具体 layout 的动作方向写在对应 `references/layout-patterns/<layout_id>.md` 中。

## HyperFrames + GSAP 契约

- 同步创建 timeline：`gsap.timeline({ paused: true })`。
- 同步注册 timeline：`window.__timelines["main"] = tl`。
- 不要为渲染关键动画调用 `tl.play()`。
- 不要在 `async`、`setTimeout`、Promise 或事件回调里创建 timeline。
- 不要使用 `repeat: -1`；循环必须计算成有限次数。
- ambient motion 必须挂在 `tl` 上，不能裸用 standalone `gsap.to()`。
- 不要手动调用媒体的 `play`、`pause`、`seek`。媒体播放由 HyperFrames 接管。
- 视频时长由 `data-duration` 决定，不要创建空 tween 只为了拉长时长。

## Scene 动画规则

每个 scene 必须有：

- 可见元素的 entrance animation。
- 至少一个 ambient motion layer。

图形解释型 scene 还必须有至少一种解释性动画：

- 图表线、时间线、轨道或轴线绘制。
- 图表增长或趋势扫过。
- 数字有限 count-up。
- 标注定位或局部高亮。
- 节点按语义顺序建立，并通过邻接、分组、编号、轨道或区域变化表达关系。
- before state 到 after state 的重排、压缩、替换或聚焦。

文字主导 layout：`statement-*`、`quote-*`。动画应服务高级杂志风排版，避免
强弹跳、夸张旋转、过多节点飞入和卡通式动效。

图形解释 layout：其他类型。动画必须展示信息如何被理解，图形对象不能只淡入；应有增长、
绘制、扫过、定位、分组、转化或重组。

## SVG / Chart / Diagram 规则

- SVG 路径只用于图表线、趋势线、时间线、轴线、扫描线、括号或不需要精确接到元素边缘的
  结构轨道。
- 不要绘制元素到元素的自由连线，例如节点连节点、卡片连卡片、中心节点连四周节点、
  callout 线精确指向某个盒子。
- 柱状图优先让 bar 的内层用 `scaleY` 或 `scaleX` 增长，避免直接改 `height`。
- 折线或曲线用 path draw；当前节点用 marker scale / opacity 强调。
- 面积图、比例块或矩阵可以使用 clip/mask reveal 或 cell stagger。
- 同一元素不要同时承担 entrance transform 和 ambient transform；需要分层时用 wrapper。

## Count-Up 规则

- 只用于真实数字。
- 使用有限时长和 `onUpdate` 更新文本，不使用无限循环。
- count-up 结束后保持稳定阅读状态。
- `q(selector)` 是 scoped selector helper，不是 DOM element。`onUpdate` 中需要写 DOM 文本时，
  使用 `document.querySelector(q("[data-anim='number']"))` 获取元素。
- 如果 scene-plan 或 screenShouldShow 中出现关键结果数字，最终画面必须真实显示该数字，不能
  只停留在初始占位值。

## 编排规则

常用 motion verb：

- `DRAW`：细线、图表 stroke、时间线、轴线或结构轨道被画出来。
- `GROW`：柱、比例块、进度、矩阵 cell 增长。
- `SWEEP`：趋势线、时间线、遮罩或扫描线扫过。
- `COUNT`：数字或时间值递增。
- `TRACE`：时间线、阶段轨道或影响区域按因果或流程顺序被追踪。
- `ANNOTATE`：标注、圈注、callout 和局部高亮定位证据。
- `TRANSFORM`：旧状态被压缩、替换、重组或展开为新状态。
- `DRIFT`：ghost type、图片或背景纹理缓慢漂移。
- `REVEAL`：标题、quote、图片 mask 或图表区域逐步显现。
- `FOCUS`：某个关键词、节点或数据从弱态进入当前焦点，并停在有语义的稳定状态。

避免：

- 所有 tween 使用同一个 ease。
- 所有 tween 使用同一个 duration。
- 所有元素都从 `y + opacity` 进入。
- 第一个 tween 从精确的 `0` 秒开始。
- 图形解释型 scene 只有淡入和漂移，没有解释性动作。
- 自由连线从一个独立元素接到另一个独立元素。
- 已完成元素只是短促变成 accent 再还原，没有 reveal、count-up、定位、降权或状态确认。
- 可读文本被上层透明度压暗。
- skeleton 已经完成全部结论，后续只能做 pulse、闪色或轻微漂移。

## 默认时长

- 第一个 entrance 从 `0.15-0.3s` 开始。
- scene entrance 阶段占前 25-35%。
- 图形解释阶段占中间 35-50%。
- hold / breathe 阶段占最后 20-35%。
- stagger 总序列控制在 0.6s 以内，除非该 scene 明确需要冥想式慢节奏。
