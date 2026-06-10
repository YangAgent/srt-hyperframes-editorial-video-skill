# decision-condition-path

family: `decision`

适用：条件判断、路径选择、二选一操作路线、根据素材状态选择下一步。

## Layout Contract

- 画面必须有一个明确判断点，以及至少两条条件路径。
- 当前推荐路径或当前字幕对应路径必须被高亮确认。
- 非推荐路径保留为弱态上下文，不要抢走主视觉。
- 路径终点应承载行动建议，而不是抽象标签。
- 禁止做成普通左右选项卡、流程卡片或均分对比。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 decision family 内判断点和路径组织方式；
条件、路径和行动终点必须来自真实内容。

- `forked-path`：默认分叉路径。适合一个条件分出两条或多条行动路线。
  推荐路径必须最终高亮。
- `decision-diamond`：中心判断菱形 + 多个出口。适合软件教程或流程中的明确判断点。
  菱形只承载判断，不承载长句。
- `highlighted-route`：完整路径图弱态呈现，当前路线被追踪确认。适合路径较长但字幕只聚焦当前选择。
  非当前路径保持弱态上下文。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 候选项、条件分支和筛选标准按真实决策内容生成；没有多个候选或标准时，不要补齐候选点或筛选层。

## Motion Direction

适合表达“先判断，再走对应路线”。

动作组合：

- 判断点和弱态路径先建立。
- 推荐路径被绘制或加强。
- 路径终点行动块进入并被确认。
- 非推荐路径降权，最终画面停在推荐路径上。

节奏特点：路径关系要一眼看懂，当前行动路线要稳定保留。

## Use When

内容是在讲如果满足某条件就执行 A，否则执行 B，例如素材是否稳定、是否已有脚本、是否适合批量生成、
是否需要先补资料。

## Design Intent

主视觉是一处分叉判断点。两条路径从判断点延伸到不同操作建议，其中推荐路径以 accent 路径和高亮
终点确认。观众应先看到问题，再看到当前该走哪条行动路线。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad dc-layout">
    <span class="ed-ghost-type dc-ghost" data-anim="ghost">Path</span>
    <div class="dc-wrap">
      <aside class="dc-copy">
        <span class="ed-kicker label-mono dc-kicker" data-anim="kicker">CONDITION FIRST</span>
        <h1 class="serif-cn dc-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline dc-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="dc-stage" data-anim="stage">
        <svg class="dc-paths" viewBox="0 0 1000 572" aria-hidden="true">
          <path class="dc-path is-weak" data-anim="path-weak" d="M56 280 C230 280 292 96 460 96 L928 96" />
          <path class="dc-path is-active" data-anim="path-active" d="M56 280 C236 280 304 464 470 464 L936 464" />
        </svg>
        <div class="dc-question" data-anim="question"><span><!-- condition.kicker --></span><b><!-- condition.text --></b></div>
        <!-- Render only real decision branches from visibleContent. Do not pad branches. -->
        <div class="dc-branch dc-top" data-anim="branch-muted"><small><!-- branches[0].label --></small><strong><!-- branches[0].text --></strong><p><!-- branches[0].note --></p></div>
        <div class="dc-branch dc-bottom is-active" data-anim="branch-active"><small><!-- activeBranch.label --></small><strong><!-- activeBranch.text --></strong><p><!-- activeBranch.note --></p></div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .dc-layout { position: relative; }
#scene_xxx .dc-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .dc-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .dc-kicker { margin-bottom: 34px; }
#scene_xxx .dc-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .dc-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .dc-stage { position: relative; height: 640px; align-self: center; }
#scene_xxx .dc-paths { position: absolute; inset: 34px 40px; width: calc(100% - 80px); height: 572px; overflow: visible; }
#scene_xxx .dc-path { fill: none; stroke-width: 3; stroke-linecap: round; vector-effect: non-scaling-stroke; }
#scene_xxx .dc-path.is-weak { stroke: var(--rule); }
#scene_xxx .dc-path.is-active { stroke: var(--accent); filter: drop-shadow(0 0 16px var(--accent-soft)); }
#scene_xxx .dc-question { position: absolute; left: 260px; top: 224px; width: 300px; height: 192px; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--rule); display: grid; place-content: center; text-align: center; background: var(--surface); }
#scene_xxx .dc-question span,
#scene_xxx .dc-branch small { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.24em; color: var(--text-mute); text-transform: uppercase; }
#scene_xxx .dc-question b { margin-top: 14px; font-family: var(--font-display-cn); font-size: 35px; line-height: 1.2; letter-spacing: 0.04em; }
#scene_xxx .dc-branch { position: absolute; right: 0; width: 390px; padding: 32px 34px; border: var(--rule-w) var(--rule-style) var(--rule); background: var(--surface); }
#scene_xxx .dc-top { top: 30px; opacity: 0.58; }
#scene_xxx .dc-bottom { bottom: 132px; }
#scene_xxx .dc-branch.is-active { border-color: var(--accent); }
#scene_xxx .dc-branch strong { display: block; margin-top: 18px; font-family: var(--font-display-cn); font-size: 48px; letter-spacing: 0.04em; }
#scene_xxx .dc-branch p { margin: 16px 0 0; color: var(--text-mute); font-size: 20px; line-height: 1.5; }
#scene_xxx .dc-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `path-weak`, `path-active`, `question`, `branch-muted`, `branch-active`.

## Subtitle Safety

- `.dc-bottom` 是路径分支内容卡，不得贴近画面底边；默认 `bottom` 不低于 `132px`。
- 如果上下分支距离变紧，优先缩短 branch 高度、字号或 stage 高度，不要侵占字幕安全区。

## Do Not Change

不要把路径终点做成抽象选项；不要让两条路径同权；不要增加多条自由连线。
