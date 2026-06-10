# list-priority-stack

family: `list`

适用：最重要三点、优先级、先做什么、从高到低排序。

## Layout Contract

- 画面必须呈现清楚的优先级层级，第一项是唯一主视觉锚点。
- 后续项只能作为辅助层级，不与第一项同权。
- 适合罗列“先后重要性”，不适合检查、流程推进、筛选或公式组合。
- 禁止做成平均待办卡片、普通 checklist 或均分列表。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 list family 内优先级层级的构图；列表项必须来自
真实内容。

- `ranked-column`：纵向优先级列表，第一项最大。适合 3-5 个真实优先项。
- `hero-first-stack`：第一项作为主视觉，后续项贴靠补充。适合字幕重点落在“先做这个”。
- `compressed-priority-deck`：较多优先项压缩成层级 deck。适合项数更多但仍需主次。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了填满优先级列表、编号或层级 deck 而新增概念。
- 按真实优先项数量增减；没有明确优先级时不要伪造排序，应改用 `list-feature-board` 或其他 layout。

## Motion Direction

- 第一优先项先建立或最终放大确认。
- 后续项依次进入并降权。
- 最后一拍停在第一优先项或当前行动项。

节奏特点：不是逐项打勾，而是确认“先做哪一个”。

## Use When

内容是在讲最重要的几件事、优先顺序、先处理哪项，或把一组建议按重要性推开。

## Design Intent

左侧标题解释优先级判断，右侧是纵向 priority stack。第一项拥有最大序号、最高亮度和 accent，
后续项逐级退后。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad lp-layout">
    <span class="ed-ghost-type lp-ghost" data-anim="ghost">Priority</span>
    <div class="lp-wrap">
      <aside class="lp-copy">
        <span class="ed-kicker label-mono lp-kicker" data-anim="kicker"><!-- kicker --></span>
        <h1 class="serif-cn lp-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline lp-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="lp-stage" data-anim="stage">
        <div class="lp-stack" data-anim="stack">
          <!-- Render only real priority items. Do not pad to three. -->
          <section class="lp-item is-first"><span><!-- 01 --></span><b><!-- firstItem.text --></b><p><!-- firstItem.note --></p></section>
          <section class="lp-item"><span><!-- 02 --></span><b><!-- item.text --></b></section>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .lp-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .lp-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .lp-stage { align-self: center; }
#scene_xxx .lp-stack { height: 650px; display: grid; gap: 24px; }
#scene_xxx .lp-item { display: grid; grid-template-columns: 160px 1fr; align-items: center; border-left: var(--rule-w) var(--rule-style) var(--rule); padding: 28px 40px; background: var(--surface-2); opacity: 0.58; }
#scene_xxx .lp-item span { font-family: var(--font-display-en); font-size: 112px; color: var(--ghost-type-color); }
#scene_xxx .lp-item b { font-family: var(--font-display-cn); font-size: 42px; line-height: 1.12; }
#scene_xxx .lp-item.is-first { border-color: var(--accent); opacity: 1; background: var(--accent-soft); }
#scene_xxx .lp-item.is-first span { color: var(--accent-soft); font-size: 160px; }
#scene_xxx .lp-item.is-first b { font-size: 60px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `stack`.

## Do Not Change

不要把优先级做成普通待办列表；不要让多个项同时高亮；不要补没有来源的排序理由。
