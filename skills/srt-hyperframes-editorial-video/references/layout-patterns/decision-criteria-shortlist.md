# decision-criteria-shortlist

family: `decision`

适用：候选项筛选、筛选标准、推荐候选、工具/方案/模板选择。

## Layout Contract

- 画面必须呈现候选项如何被多个标准逐层减少。
- 每一层标准都应有候选数量、候选点或保留结果的可见变化。
- 最终推荐项必须稳定出现，并说明它满足哪些关键标准。
- 标准数量和候选数量可按内容调整，但必须保留“标准筛选 -> 推荐结果”的主关系。
- 禁止使用营销式造型、普通列表、平均卡片或只有结论没有筛选过程的画面。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 decision family 内筛选过程和最终候选的构图；
标准、候选和推荐结果必须来自真实内容。

- `funnel-shortlist`：默认漏斗式筛选。适合候选逐层减少并得到推荐项。
  每层变化必须可见。
- `criteria-lanes`：多个标准 lane 并列，候选在 lane 中被保留或剔除。适合标准本身需要被看见时。
  lane 数量按真实标准增减。
- `elimination-board`：候选板逐项降权，最终保留推荐项。适合候选清单比漏斗层级更重要的场景。
  不做平均卡片网格。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 候选项、条件分支和筛选标准按真实决策内容生成；没有多个候选或标准时，不要补齐候选点或筛选层。

## Motion Direction

适合表达“推荐不是拍脑袋，而是由标准筛出来”。

动作组合：

- 候选层或标准层依次建立。
- 候选点在每层减少、压缩或被降权。
- 最后一层标准被 accent 确认。
- 推荐结果从筛选结构下方或末端出现并保持。

节奏特点：候选数量逐层减少，最终结果要有被推导出来的感觉。

## Use When

内容是在讲如何选择工具、方案、模型、插件、素材、模板或流程，只要有多个候选和明确筛选标准，
就适合使用。

## Design Intent

右侧由宽到窄的标准层构成，候选点随标准推进而减少。最终推荐项位于结构末端，带有简短说明，
让观众看到选择过程和结论之间的因果关系。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ds-layout">
    <span class="ed-ghost-type ds-ghost" data-anim="ghost">Select</span>
    <div class="ds-wrap">
      <aside class="ds-copy">
        <span class="ed-kicker label-mono ds-kicker" data-anim="kicker">SELECTION CRITERIA</span>
        <h1 class="serif-cn ds-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline ds-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="ds-stage" data-anim="stage">
        <div class="ds-stack">
          <!-- Render only real criteria and candidate dots from visibleContent. Do not pad to three criteria. -->
          <div class="ds-row is-wide" data-anim="criterion"><span><!-- criteria[0].index --></span><b><!-- criteria[0].text --></b><em><!-- criteria[0].countLabel --></em><!-- candidate dots reflect criteria[0].candidateCount --><i></i><i></i></div>
          <div class="ds-row is-narrow" data-anim="criterion-final"><span><!-- finalCriterion.index --></span><b><!-- finalCriterion.text --></b><em><!-- finalCriterion.countLabel --></em><!-- candidate dots reflect finalCriterion.candidateCount --><i></i></div>
          <div class="ds-result" data-anim="result"><small><!-- result.kicker --></small><strong><!-- result.text --></strong><p><!-- result.note --></p></div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ds-layout { position: relative; }
#scene_xxx .ds-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .ds-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .ds-kicker { margin-bottom: 34px; }
#scene_xxx .ds-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .ds-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .ds-stage { align-self: center; }
#scene_xxx .ds-stack { height: 650px; display: grid; align-content: center; justify-items: center; gap: 26px; }
#scene_xxx .ds-row { position: relative; height: 120px; border: var(--rule-w) var(--rule-style) var(--rule); display: flex; align-items: center; gap: 26px; padding: 0 36px; background: var(--surface-2); }
#scene_xxx .ds-row.is-wide { width: 1240px; }
#scene_xxx .ds-row.is-mid { width: 960px; }
#scene_xxx .ds-row.is-narrow { width: 660px; border-color: var(--accent); background: var(--accent-soft); }
#scene_xxx .ds-row span { font-family: var(--font-mono); color: var(--text-mute); letter-spacing: 0.2em; }
#scene_xxx .ds-row b { min-width: 250px; font-family: var(--font-display-cn); font-size: 38px; letter-spacing: 0.04em; }
#scene_xxx .ds-row em { margin-right: auto; font-style: normal; color: var(--text-mute); font-family: var(--font-mono); letter-spacing: 0.16em; text-transform: uppercase; }
#scene_xxx .ds-row i { width: 24px; height: 24px; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--rule); background: var(--surface-3); }
#scene_xxx .ds-row.is-narrow i { background: var(--accent); border-color: var(--accent); }
#scene_xxx .ds-result { width: 520px; padding: 28px 36px; border: var(--rule-w) var(--rule-style) var(--accent); text-align: center; background: var(--accent-soft); }
#scene_xxx .ds-result small { font-family: var(--font-mono); color: var(--accent); letter-spacing: 0.24em; text-transform: uppercase; }
#scene_xxx .ds-result strong { display: block; margin-top: 16px; font-family: var(--font-display-cn); font-size: 42px; letter-spacing: 0.04em; }
#scene_xxx .ds-result p { margin: 12px 0 0; color: var(--text-mute); font-size: 19px; line-height: 1.45; }
#scene_xxx .ds-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `criterion`, `criterion-final`, `result`.

## Do Not Change

不要只展示最终推荐项；不要把标准层做成普通步骤卡；不要把候选点变成无意义装饰。
