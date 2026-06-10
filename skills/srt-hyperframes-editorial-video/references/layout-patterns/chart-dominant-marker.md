# chart-dominant-marker

family: `chart`

适用：多个数据点、比例、趋势、排行、矩阵、区间变化或图表解释。

## Layout Contract

- prototype 中的数据点、区间和标注数量只是示例；按真实数据增减，但保持 chart 主导的视觉框架。
- 图表主体必须占据画面右侧或主区域的大面积，不能缩成小 inset。
- 左侧文字组负责说结论，图表负责让关系可见。
- accent 只标出一个关键 marker、拐点、阈值或异常区间。
- 禁止用列表、卡片或抽象节点替代真实 chart body。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 chart family 内图表主区域和结论文字的比例；
数据点、marker 和标签必须来自真实内容。

- `right-chart-left-claim`：默认左侧结论、右侧大图表。适合结论需要标题说明，图表负责证明关系。
  marker 只能突出一个关键点。
- `full-bleed-chart`：图表占据几乎全画面，标题和标签贴靠图表边缘。适合趋势或拐点本身最重要的场景。
  文案不能遮挡关键曲线。
- `cropped-curve-marker`：曲线被放大裁切，关键 marker 成为主视觉。适合单个峰值、异常点或转折点。
  裁切后仍必须能看出方向关系。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 数字、刻度、柱、曲线点、marker 和支撑指标必须来自真实内容或 scene-plan 明确改写；没有明确数值时，用关系、趋势或状态表达，不要编造数据。

## Motion Direction

适合折线、时间线、阶段推进、增长、衰减和变化方向。

动作组合：

- 主轴或时间线先被绘制。
- 趋势 path 或 sweep mask 沿方向展开。
- 关键转折节点跟随出现。
- 当前阶段、峰值或拐点被 accent 确认为当前结论。

节奏特点：观众应该感觉时间或趋势在推进。

## Design Intent

左文右图的编辑式图表解释页。左侧是 kicker、两行以内大标题、短 note 和一个关键读数；右侧是
大图表区域。图表用低权重网格和基础趋势线建立上下文，用橙色线段、点和 marker label 标出
真正要看的位置。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ch-layout">
    <span class="ed-ghost-type ch-ghost" data-anim="ghost">Trend</span>
    <div class="ch-copy">
      <span class="ed-kicker label-mono ch-kicker" data-anim="kicker">TREND</span>
      <h1 class="serif-cn ch-title" data-anim="headline">图表结论，<span class="ed-accent">关键变化</span></h1>
      <p class="ed-subline ch-note" data-anim="note">贴靠标题的解释句，不写成长段摘要。</p>
      <div class="ch-readout" data-anim="readout">
        <div class="ed-stat"><!-- stat.value --><span><!-- stat.unit --></span></div>
        <div class="ch-readout-label">关键读数说明</div>
      </div>
    </div>
    <div class="ch-chart-wrap" data-anim="chart">
      <svg class="ed-svg-layer ch-chart" viewBox="0 0 900 620" aria-hidden="true">
        <line class="ed-chart-axis ch-grid" x1="70" y1="120" x2="880" y2="120" />
        <line class="ed-chart-axis ch-grid" x1="70" y1="280" x2="880" y2="280" />
        <line class="ed-chart-axis ch-grid" x1="70" y1="520" x2="880" y2="520" />
        <path class="ch-area" data-anim="chart-area" d="M120,470 L330,440 L540,400 L750,140 L750,520 L120,520 Z" />
        <polyline class="ed-path is-muted" data-anim="line-muted" points="120,470 330,440 540,400" />
        <polyline class="ed-path" data-anim="line-accent" points="540,400 750,140" />
        <circle class="ed-marker ch-dot" data-anim="marker" cx="750" cy="140" r="11" />
        <line class="ch-marker-line" data-anim="marker-line" x1="750" y1="140" x2="750" y2="520" />
        <text class="ch-flag" data-anim="flag" x="700" y="115">拐点</text>
      </svg>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ch-layout {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.55fr;
  gap: 96px;
  align-items: stretch;
}
#scene_xxx .ch-copy {
  display: flex;
  flex-direction: column;
}
#scene_xxx .ch-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 34px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .ch-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .ch-title {
  margin: 0;
  font-size: 76px;
  line-height: 1.06;
}
#scene_xxx .ch-note {
  margin-top: 38px;
  max-width: 26ch;
  font-size: 26px;
  line-height: 1.62;
}
#scene_xxx .ch-readout {
  margin-top: auto;
  margin-bottom: 80px;
  border-top: var(--rule-w) var(--rule-style) var(--rule);
  padding-top: 30px;
}
#scene_xxx .ch-readout .ed-stat {
  font-family: var(--font-display-en);
  font-size: 96px;
  line-height: 0.9;
}
#scene_xxx .ch-readout .ed-stat span {
  font-size: 0.34em;
  color: var(--accent);
  margin-left: 10px;
}
#scene_xxx .ch-readout-label {
  margin-top: 14px;
  color: var(--text-mute);
  font-size: var(--type-body-min);
  line-height: 1.45;
}
#scene_xxx .ch-chart-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#scene_xxx .ch-chart {
  width: 100%;
  height: 620px;
}
#scene_xxx .ch-grid {
  stroke: var(--rule);
}
#scene_xxx .ch-area {
  fill: var(--accent-soft);
  opacity: 0.55;
}
#scene_xxx .ch-marker-line {
  stroke: var(--accent);
  stroke-width: 1.5;
  stroke-dasharray: 6 7;
  opacity: 0.6;
}
#scene_xxx .ch-flag {
  fill: var(--accent);
  font-family: var(--font-mono);
  font-size: 19px;
  letter-spacing: 0.14em;
}
#scene_xxx .ch-ghost {
  right: 5%;
  top: 5%;
  font-size: 200px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `note`, `readout`, `chart`, `chart-area`, `line-muted`,
`line-accent`, `marker`, `marker-line`, `flag`.

## Do Not Change

不要把图表做成小装饰；不要用均分卡片解释趋势；不要出现多个同权重 accent marker。
