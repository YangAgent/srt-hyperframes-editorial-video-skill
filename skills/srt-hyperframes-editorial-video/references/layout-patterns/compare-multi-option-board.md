# compare-multi-option-board

family: `compare`

适用：3-4 个方案、工具、模型、模板或路径横向比较。

## Layout Contract

- 画面必须有 3-4 个真实候选，并用同一组标准或同一阅读路径比较。
- 推荐候选可以提权，但其他候选必须保留可比较上下文。
- 适合多对象比较，不适合 before/after 二分或筛选漏斗。
- 禁止普通卡片表格、平均营销卡片或只展示推荐项。

## Layout Variants

- `option-columns`：A/B/C 多候选横向列。适合候选都需要被看见。
- `winner-highlight`：推荐候选提权。适合有明确推荐结论。
- `criteria-row-board`：底部或中部标准 rail 对齐候选。适合标准本身需要可见。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了填满候选列、标准 rail 或推荐理由而新增概念。
- 候选、标准和推荐理由必须来自真实内容。
- 候选少于 3 个时优先使用 `compare-editorial-split` 或 `compare-asymmetric-recommendation`。
- 不要为形成 A/B/C 而新增无来源候选。

## Motion Direction

- 候选列先并列建立。
- 标准 rail 或比较点随后对齐出现。
- 推荐项被 accent、badge 或亮度确认。

节奏特点：横向比较，而不是筛选出结果。

## Use When

内容是在比较多个工具、模板、模型、流程或方案，并需要观众理解为什么某一项更合适。

## Design Intent

左侧标题说明比较目的，右侧多个候选列使用同一结构。推荐列更高、更亮或带 badge，底部标准 rail
让比较维度清楚。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad cm-layout">
    <span class="ed-ghost-type cm-ghost" data-anim="ghost">Options</span>
    <div class="cm-wrap">
      <aside class="cm-copy"><span class="ed-kicker label-mono cm-kicker" data-anim="kicker"><!-- kicker --></span><h1 class="serif-cn cm-title" data-anim="headline"><!-- headline --></h1><p class="ed-subline cm-sub" data-anim="subline"><!-- subline --></p></aside>
      <main class="cm-stage" data-anim="stage">
        <div class="cm-options" data-anim="options">
          <!-- Render only real options. Do not pad to three. -->
          <section class="cm-option"><small><!-- option.label --></small><h2><!-- option.title --></h2><ul><li><!-- option.point --></li></ul></section>
          <section class="cm-option is-winner"><small><!-- option.label --></small><h2><!-- option.title --></h2></section>
        </div>
        <div class="cm-criteria" data-anim="criteria"><span><!-- criterion.text --></span></div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .cm-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .cm-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .cm-stage { align-self: center; height: 650px; display: grid; grid-template-rows: 1fr 86px; gap: 28px; }
#scene_xxx .cm-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
#scene_xxx .cm-option { padding: 34px 32px; border-left: var(--rule-w) var(--rule-style) var(--rule); background: var(--surface-2); }
#scene_xxx .cm-option h2 { margin: 42px 0 28px; font-family: var(--font-display-cn); font-size: 44px; line-height: 1.12; }
#scene_xxx .cm-option.is-winner { border-color: var(--accent); background: var(--accent-soft); }
#scene_xxx .cm-criteria { border-top: var(--rule-w) var(--rule-style) var(--rule); display: flex; align-items: center; justify-content: space-around; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `options`, `criteria`.

## Do Not Change

不要把多候选强行改成左右二分；不要只保留推荐项；不要为凑列数新增候选。
