# list-grouped-catalog

family: `list`

适用：几类素材、几种情况、类型归类、分类清单。

## Layout Contract

- 画面必须呈现分组关系，每组有明确组名和真实条目。
- 当前类别或关键类别可以被 accent 锁定，但其他类别只做上下文。
- 当口播逐个念出条目时，对应条目必须逐个 reveal、提亮或短暂 accent；不能只在第一帧显示完整 catalog。
- 适合分类罗列，不适合检查项、流程步骤、条件筛选或证据板。
- 禁止把分类做成平均卡片网格或普通目录页。

## Layout Variants

- `sectioned-ledger`：分组账本式分类罗列。适合 2-4 个真实类别。
- `two-group-columns`：两类对象并列分组。适合两组类别对照但不强调优劣。
- `cluster-catalog`：多个类别形成分区 catalog。适合类别多且需要分区浏览。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了填满列表、分组、类别或两列结构而新增概念。
- 可见分类和条目必须来自 scene-plan；不要为了填满两列而新增类别。
- 条目数量按真实内容增减；少项时放大类别标题和当前类别说明。
- 每个被 narration 单独点名的条目都应有独立 slot 和 animation hook；如果一个 cue 覆盖两项，
  两项也应使用短 stagger，而不是整组静态出现。
- 如果内容有检查动作，改用 `checklist-risk-scan`；如果有筛选标准，改用 `decision-criteria-shortlist`。

## Motion Direction

- 类别框架先建立。
- 当前类别被 accent 或亮度确认。
- 条目按 narration cue 逐个进入或提亮；被念到的条目必须有可见变化。
- 已经出现的条目可以降到 `var(--text-2)`，当前条目用 `var(--text)` 或 accent 短暂确认。
- 如果口播是“研究 Agent 找资料、写作 Agent 写内容”这种连续枚举，动画必须跟随每个 Agent，
  不要只 pulse 整个 group。

节奏特点：像编辑式分类账本，不像步骤推进。

## Use When

内容是在讲“这些东西分成几类”“几种情况分别是什么”“当前重点是哪一类”。

## Design Intent

左侧标题和当前类别说明，右侧是 sectioned ledger。当前类别占更大区域，其他类别保留为较弱上下文。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad lg-layout">
    <span class="ed-ghost-type lg-ghost" data-anim="ghost">Catalog</span>
    <div class="lg-wrap">
      <aside class="lg-copy">
        <span class="ed-kicker label-mono lg-kicker" data-anim="kicker"><!-- kicker --></span>
        <h1 class="serif-cn lg-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline lg-sub" data-anim="subline"><!-- subline --></p>
        <div class="lg-note" data-anim="note"><small><!-- current.kicker --></small><p><!-- current.note --></p></div>
      </aside>
      <main class="lg-stage" data-anim="stage">
        <div class="lg-catalog" data-anim="catalog">
          <!-- Render only real groups and group items. -->
          <section class="lg-group is-focus"><h2><!-- group.title --></h2><ul><li data-anim="item"><!-- item.text --></li></ul></section>
          <section class="lg-group"><h2><!-- group.title --></h2><ul><li data-anim="item"><!-- item.text --></li></ul></section>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .lg-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .lg-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .lg-note { margin-top: 42px; padding-top: 24px; border-top: var(--rule-w) var(--rule-style) var(--accent); }
#scene_xxx .lg-catalog { height: 650px; display: grid; grid-template-columns: 1fr 1fr; gap: 34px 62px; }
#scene_xxx .lg-group { border-top: var(--rule-w) var(--rule-style) var(--rule); padding-top: 26px; }
#scene_xxx .lg-group.is-focus { grid-row: span 2; border-color: var(--accent); }
#scene_xxx .lg-group h2 { margin: 0 0 24px; font-family: var(--font-display-cn); font-size: 48px; line-height: 1.12; }
#scene_xxx .lg-group.is-focus h2 { font-size: 64px; }
#scene_xxx .lg-group li { border-bottom: var(--rule-w) var(--rule-style) var(--rule); padding: 14px 0; font-size: 30px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `note`, `stage`, `catalog`, `item`, `current-item`.

## Do Not Change

不要把分类当成 checklist；不要把类别做成同权卡片；不要让当前类别说明漂到底部脚注区；
不要在逐项枚举的台词下保持 catalog 静止。
