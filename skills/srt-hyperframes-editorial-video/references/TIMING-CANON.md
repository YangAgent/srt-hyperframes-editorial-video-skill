# Timing Canon

本文件定义 SRT 驱动的 HyperFrames Editorial 时间语言。它补充 `MOTION-CANON.md`，
重点处理 `relativeStart` / `relativeDuration` 如何影响 scene 内动画。

## 概念

- `storyboard scene`：一组连续 SRT 字幕形成的语义场景，对应一个 `.ed-scene`。
- `segment`：SRT 中的一条字幕，是时间原子，包含 `relativeStart` 和 `relativeDuration`。
- `focusCue`：scene 内部的焦点引导拍点，绑定一个或多个相邻 segments。

`BEAT-ARCHETYPES.md` 的 `layout_id` 是 scene 级 layout 选择，不是字幕内部 cue。

## 核心原则

- 每个 scene 前 0.8-1.4 秒快速建立 skeleton，但 skeleton 是未完成态，不是最终答案。
- skeleton 必须包含空间结构、阅读方向和主视觉锚点的 initial state。
- skeleton 禁止一次性揭示全部语义结论；如果后续 cue 只剩闪烁、变色或弱装饰，说明
  skeleton 泄露了过多结论。
- 不按字幕逐个生成主要元素；主要结构应尽早出现，但关键结论应由 cue 推进完成。
- `relativeStart` / `relativeDuration` 用于语义推进和焦点引导，不用于逐个堆元素。
- 元素入场保持短窗口，通常 0.2-0.6 秒。
- 第一条字幕可与 skeleton entrance 重叠；第一焦点 cue 可延迟到 skeleton 可读后立即发生。
- 图表、流程、因果、证据、状态变化仍必须有解释性动画，但解释对象应先建立，再通过焦点变化
  引导理解。
- 第一条字幕对应的 focus cue 可以与 skeleton 重叠，但不能替代 skeleton；主视觉锚点仍要在
  场景开头尽快可读。

## 三态设计

creator 必须为每个 scene 设计三态：

- `initial state`：skeleton 建立的未完成态。可以出现版面结构、主锚点位置、弱态数字、
  空位、基线、轨道、容器、before state、标题组或待完成的图形框架。
- `progression state`：每个 `cue(...)` 推动一个语义动作，例如数字 count-up、关键值 reveal、
  趋势展开、marker 定位、状态替换、推荐侧确认、旧侧降权、callout 归位。
- `final settled state`：最后稳定可读的完整结论。accent、降权、marker 和标签都应停在有语义
  的状态，而不是闪一下又回到无意义的默认状态。
- `final settled state` 不写默认退场动画。scene 切换由最终 composition 硬切处理，creator
  不要在每个 scene 末尾把主标题、主数字、结论词或关键图形 fade out / slide out。
- 最后一场、结论场、行动建议场和 `resolve-hold` recipe 必须把最终结论保持到 scene 结束。
  结论可以轻微呼吸或保持 ambient，但不能消失、降到不可读，或被 ghost layer 抢走。

示例：

- 数字类 scene：initial state 可以是数字槽位、公式、低权重初值或空位；真实冲击数字在
  对应 cue 中 count-up 或 reveal，final settled state 保持为可读结论。
- 对比类 scene：initial state 可以是分割线和两侧标签；左右最终差异、推荐侧或失败侧降权
  在对应 cue 中完成。
- statement hero：initial state 可以是 headline lockup 或关键词对照；“不是 X / 而是 Y”
  应通过 X 降权、Y 确认、rule 或 subline 归位完成，而不是让 X/Y 随机闪色。

## Accent 状态规则

accent 是语义状态，不是闪烁特效。

- 如果主视觉锚点一开始是普通文字，后续变成 accent，必须表示“当前焦点被确认”或“最终结论
  完成”，并保持为 final settled state。
- layout skeleton 示例中的 `ed-accent` / `is-accent` 表示最终态对象，不表示 HTML 初始态必须
  直接高亮。如果 accent 由 cue 完成，初始 HTML/CSS 使用普通态、弱态或 mask 态，JS 在 cue
  中一次性确认到稳定 accent。
- 不要让主焦点刚出现时是白色，随后立刻变成 accent，形成类似闪一下的错觉。需要 accent 时，
  优先在 initial state 就使用弱 accent / outline / mask 占位，或在对应 cue 中一次性确认到
  accent 稳定态。
- 不要对同一个核心词反复做白色、accent、白色之间的状态来回切换，除非内容本身明确表达
  状态反转。
- 非焦点可以降权，焦点不能在 final settled state 被降到不可读。

## Focus Cue 推荐动作

focus cue 应像编辑完成语义，而不是像 UI 元素依次弹出或给静态海报补闪烁。

推荐：

- 未完成数字 count-up / reveal 到最终值，并保持稳定。
- marker scale / opacity 定位关键节点，并停留为当前证据或结论。
- scan line 或 highlight rect 扫过证据区域。
- 关键词、数字或标签从弱态变为当前焦点，或从错误项降权为非焦点。
- rule、axis、threshold line 被绘制、延展或加强，用来完成关系。
- 非焦点区域轻微降权，焦点区域保持清晰并稳定。
- callout 或注释在已有骨架上补充定位，并贴靠图形主体或标题组。

避免：

- 每条字幕来了才创建一个新的主要对象。
- 每个 focus cue 都让卡片从画面外飞入。
- 把整个 segment 时长当成普通元素入场时长。
- 为了配合字幕逐字显示原文长句。
- 对已经完成的元素做 accent flash，再还原到原色，且没有语义状态变化。
- skeleton 已经完成全部结论，cue 只能做 pulse、闪色、轻微漂移等弱动作。

## JS 片段时间 helper

scene JS 不创建 timeline，不注册 `window.__timelines`，只使用 `registerEdScene`：

```js
registerEdScene("scene_001", ({ tl, scene, label, at, cue, q }) => {
  tl.set(q("[data-anim='skeleton']"), { opacity: 0, y: 24 }, at(0));
  tl.to(q("[data-anim='skeleton']"), { opacity: 1, y: 0, duration: 0.45 }, at(180));
  tl.to(q("[data-focus='risk']"), { borderColor: "var(--accent)", duration: 0.24 }, cue(1, 120));
});
```

helper 含义：

- `at(ms)`：当前 scene 起点后的 timeline position。
- `cue(index, offsetMs = 0)`：当前 scene 第 `index` 个 segment 的 `relativeStart` 加偏移。
- `q(selector)`：把 selector 自动限定到当前 scene 内。

creator 的 scene JS 必须把每个 timeline 调用定位到 `at(...)` 或 `cue(...)`：

- `at(...)` 用于 scene 开头固定节奏，例如 skeleton entrance。
- `cue(...)` 用于跟某条 segment 对齐的 progression state，例如 reveal、count-up、状态确认、
  marker 定位、rule 延展、区域降权或 callout 归位。
- scene 在最终 composition 中会先把整个 `.ed-scene` 设为可见，再执行 scene 内动画。因此，
  所有不是 scene 起点就应该可见的元素，都必须在 `at(0)` 使用 `tl.set(...)` 锁定初始状态。
- 禁止只依赖晚于 scene 起点的 `tl.from(...)` 或 `tl.fromTo(...)` 的 fromVars 作为隐藏初态。
  例如某个 headline 在 `at(240)` 或 `cue(1, 120)` 才入场时，必须先写
  `tl.set(q("[data-anim='headline']"), { opacity: 0, y: 28 }, at(0))`，再用 `tl.to(...)`
  入场。否则 scene 被显示后，HTML/CSS 默认终态会先露出，再被 GSAP 拉回 from 状态，造成闪烁。
- 对 `opacity`、`autoAlpha`、`scale`、`scaleX`、`scaleY`、`x`、`y` 这类入场属性，推荐写法是
  `tl.set(..., at(0))` + `tl.to(...)`。只有 tween 本身就在 `at(0)` 开始时，才允许直接使用
  `from(...)` / `fromTo(...)`。
- 如果 `cue(0, offsetMs)` 早于某个 skeleton `at(ms)` tween，不要让二者控制同一个元素的
  `opacity`、`color`、`borderColor` 或 transform final state。后发 skeleton 会覆盖 cue，
  造成闪烁、变暗或状态回退。
- 更直接地说：`cue(0, offsetMs)` 如果早于某个 `at(ms)` skeleton tween，就不得控制同一个
  selector 的同一状态属性，包括 `opacity`、`color`、`borderColor`、`backgroundColor`、
  `scale`、`scaleX`、`scaleY`、`x` 或 `y`。
- 修复策略只能选其一：把 skeleton tween 提前到 cue 之前完成；把 cue offset 延后到 skeleton
  之后；拆分 selector，让 skeleton 控制 wrapper、cue 控制 child；或删除后发 skeleton 对同一
  属性的回拉。
- 弱态父容器不能承载最终可读文本。父容器若停在 `opacity < 1`，子元素即使写到 `opacity: 1`
  也仍会被压暗；要么恢复父容器，要么把弱态放到具体子项上。
- 不要省略 position；省略后 GSAP 会追加到全局 timeline 末尾。
- 不要写数字 position，例如 `12.62`。
- 不要读取 `scene.startTime`、`relativeStart`、`relativeDuration` 自己计算时间。

反例：

```js
tl.fromTo(q("[data-anim='headline']"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.56 }, at(240));
tl.to(q("[data-anim='subline']"), { opacity: 1, duration: 0.42 }, cue(0, 300));
tl.fromTo(q("[data-anim='subline']"), { opacity: 0 }, { opacity: 0.35, duration: 0.42 }, at(760));
```

正确：

```js
tl.set(q("[data-anim='headline']"), { opacity: 0, y: 28 }, at(0));
tl.to(q("[data-anim='headline']"), { opacity: 1, y: 0, duration: 0.56 }, at(240));
tl.set(q("[data-anim='subline']"), { opacity: 0 }, at(0));
tl.to(q("[data-anim='subline']"), { opacity: 0.35, duration: 0.42 }, at(180));
tl.to(q("[data-anim='subline']"), { opacity: 1, duration: 0.42 }, cue(0, 760));
```

## Scene 空隙策略

最终 composition 中，一个 scene 默认显示到下一个 scene 的 `startTime`。如果 SRT 场景之间有
空隙，上一 scene 保持可见，不插黑场，不压缩时间。
