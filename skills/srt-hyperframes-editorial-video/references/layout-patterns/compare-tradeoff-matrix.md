# compare-tradeoff-matrix

family: `compare`

适用：速度 vs 质量、成本 vs 效果、简单 vs 可控等二维取舍。

## Layout Contract

- 画面必须有两条明确取舍轴，并呈现推荐落点或目标区间。
- 象限和点位只表达语义关系，不伪造精确数据。
- 适合权衡关系，不适合普通优缺点列表、二分 before/after 或真实数据图表。
- 禁止过密数学图表、无语义散点或底部脚注说明。

## Layout Variants

- `quadrant-map`：二维象限权衡。适合四个区域都能帮助理解。
- `axis-tradeoff`：强调两条取舍轴。适合轴本身是字幕重点。
- `sweet-spot-marker`：推荐落点作为主视觉。适合需要确认平衡点或目标区间。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了填满象限、散点、说明句或 marker 而新增概念。
- 两条轴、象限标签和推荐点必须来自字幕语义或 scene-plan。
- 没有明确双轴取舍时，不要使用本 layout。
- 辅助散点只做语义参照，不要伪装成真实测量值。

## Motion Direction

- 坐标轴先建立。
- 语义区域或参照点弱态出现。
- 推荐落点被 accent marker 锁定。
- 最终焦点停在目标区间。

节奏特点：让观众看到取舍位置，而不是比较输赢。

## Use When

内容是在讲两个目标之间的取舍、平衡、折中、推荐区间或目标落点。

## Design Intent

左侧标题说明权衡问题，右侧是大矩阵。说明句贴在矩阵上方或侧边，推荐点在坐标中明确锁定。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ct-layout">
    <span class="ed-ghost-type ct-ghost" data-anim="ghost">Balance</span>
    <div class="ct-wrap">
      <aside class="ct-copy"><span class="ed-kicker label-mono ct-kicker" data-anim="kicker"><!-- kicker --></span><h1 class="serif-cn ct-title" data-anim="headline"><!-- headline --></h1><p class="ed-subline ct-sub" data-anim="subline"><!-- subline --></p></aside>
      <main class="ct-stage" data-anim="stage">
        <p class="ct-note" data-anim="note"><!-- note --></p>
        <div class="ct-matrix" data-anim="matrix">
          <span class="ct-axis-x"><!-- xAxis --></span><span class="ct-axis-y"><!-- yAxis --></span>
          <div class="ct-marker" data-anim="marker"><small><!-- marker.kicker --></small><b><!-- marker.text --></b></div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ct-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .ct-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .ct-stage { position: relative; height: 650px; align-self: center; }
#scene_xxx .ct-note { position: absolute; left: 92px; top: 42px; padding-left: 28px; border-left: var(--rule-w) var(--rule-style) var(--accent); }
#scene_xxx .ct-matrix { position: absolute; inset: 138px 74px 66px 92px; border-left: var(--rule-w) var(--rule-style) var(--rule); border-bottom: var(--rule-w) var(--rule-style) var(--rule); background: var(--surface-2); }
#scene_xxx .ct-marker { position: absolute; left: 63%; top: 32%; width: 216px; height: 216px; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--accent); display: grid; place-content: center; text-align: center; background: var(--surface); }
#scene_xxx .ct-marker b { font-family: var(--font-display-cn); font-size: 42px; line-height: 1.1; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `note`, `matrix`, `marker`.

## Do Not Change

不要把权衡矩阵变成真实统计图；不要让说明文字压在坐标上；不要没有双轴关系时使用本 layout。
