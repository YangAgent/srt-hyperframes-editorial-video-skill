# data-cropped-ruler

family: `data`

适用：单个真实数字、指标、排行、计数或明确量化结果。

## Layout Contract

- prototype 中的辅助指标和 ruler 标注数量只是示例；按真实数字信息增减，但保持主数字第一视觉。
- 一个巨大数字是第一视觉，单位、解释和辅助指标若出现，必须贴靠它。
- 支撑指标只能放在底部基线系统中，不得与主数字同权重。
- accent 优先落在主数字；每帧最多再有 1 个辅助 accent。
- 禁止数字被缩成角落标签、卡片标题或列表项。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 data family 内裁切数字和标尺的关系；
所有数字、刻度和单位必须来自真实内容或明确改写。

- `edge-cropped-scale`：默认贴边裁切大数字 + 标尺。适合比例、压缩率、损耗或占比类表达。
  裁切不能损害关键数字识别。
- `vertical-ruler`：纵向标尺作为主参照，数字贴靠标尺一侧。适合上下限、等级或边界判断。
  标尺刻度不得伪造精确数据。
- `horizontal-gauge`：横向 gauge / ruler 承载数值位置，主数字贴靠当前 marker。适合进度、距离或区间位置。
  gauge 只表达真实比例或粗略关系。

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

## Use When

数字表达比例、占比、损耗、压缩率，或需要用右侧纵向标尺解释数字的组成和影响。

## Design Intent

巨大数字贴左下边缘裁切，制造压迫感；单位贴在数字右上，解释句贴在同一基线附近。右侧是一条
纵向 metric ruler，辅助指标像刻度一样解释数字，不与主数字同权。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad dh2-layout">
    <span class="ed-ghost-type dh2-ghost" data-anim="ghost">Ratio</span>
    <div class="dh2-wrap">
      <div class="dh2-head">
        <span class="ed-kicker label-mono dh2-kicker" data-anim="kicker">METRIC</span>
        <h1 class="serif-cn dh2-title" data-anim="headline">数字背后的判断句</h1>
      </div>
      <div class="dh2-num" data-anim="number">72</div>
      <div class="dh2-unit" data-anim="unit">%</div>
      <p class="dh2-label" data-anim="number-label">贴靠主数字的解释句。</p>
      <div class="dh2-ruler" data-anim="ruler">
        <div class="dh2-metric" data-anim="metric"><div class="v">4.6h</div><div class="l">辅助指标说明</div></div>
        <div class="dh2-metric" data-anim="metric"><div class="v">12</div><div class="l">辅助指标说明</div></div>
        <div class="dh2-metric" data-anim="metric"><div class="v">1</div><div class="l">辅助指标说明</div></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .dh2-layout { position: relative; }
#scene_xxx .dh2-wrap {
  position: relative;
  height: 100%;
}
#scene_xxx .dh2-head {
  position: absolute;
  left: 0;
  top: 0;
  max-width: 880px;
}
#scene_xxx .dh2-kicker { margin-bottom: 28px; }
#scene_xxx .dh2-title {
  margin: 0;
  font-size: 66px;
  line-height: 1.08;
  color: var(--text-2);
}
#scene_xxx .dh2-num {
  position: absolute;
  left: -78px;
  bottom: 132px;
  font-family: var(--font-display-en);
  font-size: 470px;
  line-height: 0.74;
  letter-spacing: -0.07em;
  color: var(--accent);
  font-weight: 600;
}
#scene_xxx .dh2-unit {
  position: absolute;
  left: 530px;
  bottom: 252px;
  font-family: var(--font-display-en);
  font-size: 190px;
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: var(--text);
}
#scene_xxx .dh2-label {
  position: absolute;
  left: 790px;
  bottom: 138px;
  max-width: 400px;
  margin: 0;
  font-size: 30px;
  line-height: 1.55;
  letter-spacing: 0.04em;
  color: var(--text-2);
}
#scene_xxx .dh2-ruler {
  position: absolute;
  right: 0;
  bottom: 132px;
  width: 420px;
  border-left: var(--rule-w) var(--rule-style) var(--rule);
  padding-left: 42px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}
#scene_xxx .dh2-metric {
  position: relative;
}
#scene_xxx .dh2-metric::before {
  content: "";
  position: absolute;
  left: -49px;
  top: 16px;
  width: 14px;
  height: 1px;
  background: var(--rule);
}
#scene_xxx .dh2-metric .v {
  font-family: var(--font-display-en);
  font-size: 74px;
  line-height: 0.9;
  color: var(--text);
  letter-spacing: -0.03em;
}
#scene_xxx .dh2-metric .l {
  margin-top: 12px;
  font-size: 22px;
  color: var(--text-mute);
  line-height: 1.45;
}
#scene_xxx .dh2-ghost {
  right: 50px;
  top: 58px;
  font-size: 210px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `number`, `unit`, `number-label`, `ruler`, `metric`.

## Do Not Change

不要把主数字完整居中；不要把 ruler 指标改成底部三栏；不要让辅助指标比裁切数字更强。
