# data-dominant-number

family: `data`

适用：单个真实数字、指标、排行、计数或明确量化结果。

## Layout Contract

- prototype 中的辅助指标和 ruler 标注数量只是示例；按真实数字信息增减，但保持主数字第一视觉。
- 一个巨大数字是第一视觉，单位、解释和辅助指标若出现，必须贴靠它。
- 支撑指标只能放在底部基线系统中，不得与主数字同权重。
- accent 优先落在主数字；每帧最多再有 1 个辅助 accent。
- 禁止数字被缩成角落标签、卡片标题或列表项。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 data family 内主数字和支撑读数的构图；
数字、单位和指标必须来自真实内容。

- `center-stat`：默认中心巨大数字。适合单个冲击数字、比例或计数本身就是结论的场景。
  单位和解释必须贴靠主数字。
- `left-stat-right-proof`：左侧巨大数字，右侧放 1-2 个支撑读数或短解释。适合数字需要上下文证明时使用。
  右侧内容不能与主数字同权。
- `bottom-metric-deck`：主数字占上方或中部，底部基线承载少量辅助指标。适合有 2-3 个真实支撑指标时使用。
  底部 deck 只做支撑，不变成 dashboard。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 数字、刻度、柱、曲线点、marker 和支撑指标必须来自真实内容或 scene-plan 明确改写；没有明确数值时，用关系、趋势或状态表达，不要编造数据。

## Motion Direction

适合真实数字、指标、排行、百分比和计数。

动作组合：

- `.ed-stat` 可以先以占位、弱态或初值进入。
- 数字做有限 count-up 到最终值。
- bar、rule 或辅助比较线被画出来。
- accent glow 只作为数字完成后的辅助确认，不单独承担语义。

节奏特点：数字出现要抓眼，但不能循环闪烁。

## Design Intent

编辑式数据大字报。上方是 kicker 和一句数据结论，中央用超大英文衬线数字压倒画面，单位和
解释贴在数字右侧同一基线。底部三项辅助指标沿一条 hairline 分栏，作为证据而不是第二主视觉。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad dh-layout">
    <span class="ed-ghost-type dh-ghost" data-anim="ghost">Impact</span>
    <div class="dh-head">
      <span class="ed-kicker label-mono dh-kicker" data-anim="kicker">METRIC</span>
      <h1 class="serif-cn dh-headline" data-anim="headline">数字结论标题</h1>
    </div>
    <div class="dh-hero" data-anim="number-group">
      <span class="hero-num dh-number" data-anim="number">18</span>
      <span class="serif-cn dh-unit" data-anim="unit">分钟</span>
      <span class="dh-number-label" data-anim="number-label">端到端示例耗时</span>
    </div>
    <div class="dh-metrics" data-anim="metrics">
      <!-- Render only real support metrics from visibleContent. Do not pad to three. -->
      <div class="dh-metric"><div class="ed-stat"><!-- metrics[0].value --><span><!-- metrics[0].unit --></span></div><p><!-- metrics[0].label --></p></div>
      <div class="dh-metric"><div class="ed-stat"><!-- metrics[1].value --><span><!-- metrics[1].unit --></span></div><p><!-- metrics[1].label --></p></div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .dh-layout {
  position: relative;
  justify-content: flex-start;
  gap: 58px;
}
#scene_xxx .dh-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 30px;
  color: var(--text-mute);
  letter-spacing: 0.34em;
}
#scene_xxx .dh-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .dh-headline {
  margin: 0;
  font-size: var(--type-result);
  line-height: 1.08;
  color: var(--text-2);
}
#scene_xxx .dh-hero {
  display: flex;
  align-items: center;
  gap: 36px;
  margin-top: 30px;
}
#scene_xxx .dh-number {
  font-size: 360px;
  line-height: 0.74;
  color: var(--accent);
}
#scene_xxx .dh-unit {
  padding-bottom: 40px;
  font-size: 80px;
}
#scene_xxx .dh-number-label {
  max-width: 18ch;
  padding-bottom: 52px;
  color: var(--text-mute);
  font-size: var(--type-body-min);
  line-height: 1.55;
  letter-spacing: 0.01em;
}
#scene_xxx .dh-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: var(--rule-w) var(--rule-style) var(--rule);
}
#scene_xxx .dh-metric {
  padding: 44px 56px 0 0;
}
#scene_xxx .dh-metric + .dh-metric {
  border-left: var(--rule-w) var(--rule-style) var(--rule);
  padding-left: 56px;
}
#scene_xxx .dh-metric .ed-stat {
  font-family: var(--font-display-en);
  font-size: 104px;
  line-height: 0.9;
}
#scene_xxx .dh-metric .ed-stat span {
  font-size: 0.42em;
  color: var(--text-mute);
  margin-left: 6px;
}
#scene_xxx .dh-metric p {
  margin: 22px 0 0;
  color: var(--text-mute);
  font-size: 24px;
}
#scene_xxx .dh-ghost {
  right: 6%;
  top: 6%;
  font-size: 220px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `number-group`, `number`, `unit`, `number-label`, `metrics`.

## Do Not Change

不要用卡片包住主数字；不要把辅助指标做成三张卡片；不要让任何图形比主数字更抢眼。
