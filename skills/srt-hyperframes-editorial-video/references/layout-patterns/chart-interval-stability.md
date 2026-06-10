# chart-interval-stability

family: `chart`

适用：多个数据点、比例、趋势、排行、矩阵、区间变化或图表解释。

## Layout Contract

- prototype 中的数据点、区间和标注数量只是示例；按真实数据增减，但保持 chart 主导的视觉框架。
- 图表主体必须占据画面右侧或主区域的大面积，不能缩成小 inset。
- 左侧文字组负责说结论，图表负责让关系可见。
- accent 只标出一个关键 marker、拐点、阈值或异常区间。
- 禁止用列表、卡片或抽象节点替代真实 chart body。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 chart family 内区间、稳定带和阈值窗口的组织方式；
区间和标注必须来自真实内容或明确的相对关系。

- `banded-range`：默认稳定带 / 区间带主导。适合波动范围、上下限和稳定区间说明。
  accent 只锁定当前区间或异常区间。
- `stacked-intervals`：多个区间上下堆叠比较。适合阶段区间、耗时段或多个候选范围对比。
  堆叠项数量按真实内容增减。
- `threshold-window`：阈值窗口占据主视觉，当前值或区间落入窗口内外。适合边界、合格区和风险区判断。
  不伪造精确阈值。

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

## Use When

内容强调耗时区间、波动范围、上下限、阶段区间对比，或从不稳定进入稳定。

## Design Intent

左侧是结论、note 和稳定区间读数；右侧是大面积区间柱图。每个柱表达上下限范围，只有一个稳定
区间使用 accent。画面答案不是某个点，而是“区间变窄并稳定”。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ch2-layout">
    <span class="ed-ghost-type ch2-ghost" data-anim="ghost">Band</span>
    <div class="ch2-left">
      <span class="ed-kicker label-mono ch2-kicker" data-anim="kicker">STABILITY BAND</span>
      <h1 class="serif-cn ch2-title" data-anim="headline">耗时进入<span class="ed-accent">稳定带</span></h1>
      <p class="ed-subline ch2-note" data-anim="note">贴靠标题的区间解释。</p>
      <div class="ch2-stat" data-anim="readout"><div class="v">18-24</div><div class="l">分钟级稳定输出区间</div></div>
    </div>
    <div class="ch2-stage" data-anim="chart">
      <div class="ch2-plot">
        <div class="ch2-scale">
          <!-- Render only real scale labels from visibleContent. Do not pad to four. -->
          <span><!-- scaleLabels[0] --></span><span><!-- scaleLabels[1] --></span>
        </div>
        <span class="ch2-gridline g1"></span><span class="ch2-gridline g2"></span><span class="ch2-gridline g3"></span><span class="ch2-gridline g4"></span>
        <div class="ch2-bars">
          <div class="ch2-bar" data-anim="bar"><div class="ch2-range" style="height: 430px;"><span class="ch2-minmax">6.5h</span></div><div class="label-mono ch2-lab">Manual</div></div>
          <div class="ch2-bar" data-anim="bar"><div class="ch2-range" style="height: 310px;"><span class="ch2-minmax">3.2h</span></div><div class="label-mono ch2-lab">Template</div></div>
          <div class="ch2-bar" data-anim="bar"><div class="ch2-range" style="height: 205px;"><span class="ch2-minmax">68m</span></div><div class="label-mono ch2-lab">Semi Auto</div></div>
          <div class="ch2-bar is-accent" data-anim="bar-accent"><div class="ch2-range" style="height: 94px;"><span class="ch2-minmax">24m</span></div><div class="label-mono ch2-lab">Skill</div></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ch2-layout {
  position: relative;
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 76px;
  align-items: stretch;
}
#scene_xxx .ch2-left { display: flex; flex-direction: column; }
#scene_xxx .ch2-kicker { margin-bottom: 32px; }
#scene_xxx .ch2-title { margin: 0; font-size: 74px; line-height: 1.07; }
#scene_xxx .ch2-note { margin-top: 36px; max-width: 27ch; font-size: 25px; line-height: 1.65; }
#scene_xxx .ch2-stat { margin-top: auto; margin-bottom: 80px; border-top: var(--rule-w) var(--rule-style) var(--rule); padding-top: 30px; }
#scene_xxx .ch2-stat .v { font-family: var(--font-display-en); font-size: 96px; line-height: 0.88; color: var(--text); letter-spacing: -0.03em; }
#scene_xxx .ch2-stat .l { margin-top: 16px; color: var(--text-mute); font-size: var(--type-body-min); line-height: 1.45; }
#scene_xxx .ch2-stage { position: relative; display: flex; align-items: center; }
#scene_xxx .ch2-plot {
  position: relative;
  width: 100%;
  height: 650px;
  border-left: var(--rule-w) var(--rule-style) var(--rule);
  border-bottom: var(--rule-w) var(--rule-style) var(--rule);
  padding: 68px 56px 76px 72px;
}
#scene_xxx .ch2-scale {
  position: absolute;
  left: 0;
  top: 66px;
  bottom: 76px;
  width: 58px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 17px;
  color: var(--text-mute);
  letter-spacing: 0.12em;
}
#scene_xxx .ch2-gridline { position: absolute; left: 72px; right: 56px; height: 1px; background: var(--rule); }
#scene_xxx .ch2-gridline.g1 { top: 118px; }
#scene_xxx .ch2-gridline.g2 { top: 244px; }
#scene_xxx .ch2-gridline.g3 { top: 370px; }
#scene_xxx .ch2-gridline.g4 { top: 496px; }
#scene_xxx .ch2-bars { position: relative; height: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 56px; align-items: end; z-index: 1; }
#scene_xxx .ch2-bar { position: relative; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; }
#scene_xxx .ch2-range { position: relative; width: 100%; border: var(--rule-w) var(--rule-style) var(--rule); background: var(--surface-2); }
#scene_xxx .ch2-range::before,
#scene_xxx .ch2-range::after { content: ""; position: absolute; left: -10px; right: -10px; height: 1px; background: var(--rule); }
#scene_xxx .ch2-range::before { top: 0; }
#scene_xxx .ch2-range::after { bottom: 0; }
#scene_xxx .ch2-bar.is-accent .ch2-range { border-color: var(--accent); background: var(--accent-soft); box-shadow: 0 0 0 7px var(--accent-soft); }
#scene_xxx .ch2-bar.is-accent .ch2-range::before,
#scene_xxx .ch2-bar.is-accent .ch2-range::after { background: var(--accent); }
#scene_xxx .ch2-lab { margin-top: 24px; font-size: 18px; color: var(--text-mute); letter-spacing: 0.14em; }
#scene_xxx .ch2-bar.is-accent .ch2-lab { color: var(--accent); }
#scene_xxx .ch2-minmax { position: absolute; right: 0; top: -34px; font-family: var(--font-display-en); font-size: 42px; line-height: 0.9; color: var(--text-2); letter-spacing: -0.03em; }
#scene_xxx .ch2-bar.is-accent .ch2-minmax { color: var(--text); }
#scene_xxx .ch2-ghost { right: 56px; top: 58px; font-size: 190px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `note`, `readout`, `chart`, `bar`, `bar-accent`, `range`.

## Do Not Change

不要把区间柱改成折线；不要让多个区间同时 accent；不要把 plot 缩成右下角小图。
