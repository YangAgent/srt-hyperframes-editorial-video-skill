# list-feature-board

family: `list`

适用：多个特征、原则、能力点并列，但没有流程或检查动作。

## Layout Contract

- 画面必须有一个主特征，其他特征只能贴靠并辅助解释。
- 适合并列特征，但不能做成平均标签墙。
- 若内容存在明确优先级，优先 `list-priority-stack`；若内容是分类，优先 `list-grouped-catalog`。
- 禁止均分网格、无主次 chip wall 或装饰性标签堆。

## Layout Variants

- `single-feature-focus`：一个主特征放大，其他特征辅助。适合主特征明确。
- `offset-feature-board`：主特征与辅助特征错位排布。适合需要视觉节奏但仍有主次。
- `editorial-feature-grid`：特征较多时使用非均分 editorial grid。适合 4-6 个真实特征。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了填满特征板、辅助模块或标签位置而新增概念。
- 主特征和辅助特征必须来自真实内容。
- 辅助特征数量按内容增减；不要为了填满版面补标签。
- 没有主特征时，选择一个最能解释标题的特征作为 primary，并在 `visual_intent` 说明。

## Motion Direction

- 主特征先建立或最终放大。
- 辅助特征以弱态贴靠出现。
- 最后一拍确认主特征。

节奏特点：不是罗列所有点，而是让一个特征带动全组。

## Use When

内容是在讲几个特征、原则、能力点或条件属性，但没有检查、排序、流程或筛选动作。

## Design Intent

左侧标题解释这组特征的意义；右侧主特征为大块，辅助特征作为较弱模块贴靠主特征。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad lf-layout">
    <span class="ed-ghost-type lf-ghost" data-anim="ghost">Feature</span>
    <div class="lf-wrap">
      <aside class="lf-copy"><span class="ed-kicker label-mono lf-kicker" data-anim="kicker"><!-- kicker --></span><h1 class="serif-cn lf-title" data-anim="headline"><!-- headline --></h1><p class="ed-subline lf-sub" data-anim="subline"><!-- subline --></p></aside>
      <main class="lf-stage" data-anim="stage">
        <section class="lf-main" data-anim="primary"><small><!-- primary.kicker --></small><b><!-- primary.text --></b><p><!-- primary.note --></p></section>
        <div class="lf-supports" data-anim="supports"><div><!-- support.text --></div></div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .lf-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .lf-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .lf-stage { position: relative; height: 650px; align-self: center; }
#scene_xxx .lf-main { position: absolute; left: 64px; top: 92px; width: 720px; min-height: 440px; padding: 48px 54px; border-left: var(--rule-w) var(--rule-style) var(--accent); background: var(--surface-2); }
#scene_xxx .lf-main b { display: block; margin-top: 36px; font-family: var(--font-display-cn); font-size: 72px; line-height: 1.04; }
#scene_xxx .lf-supports { position: absolute; right: 70px; top: 104px; width: 500px; display: grid; gap: 30px; }
#scene_xxx .lf-supports div { min-height: 130px; padding: 28px 34px; background: var(--surface); font-family: var(--font-display-cn); font-size: 34px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `primary`, `supports`.

## Do Not Change

不要做成平均网格；不要让辅助特征抢主焦点；不要把特征当作检查项或流程步骤。
