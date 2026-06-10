# rule-correct-wrong-example

family: `rule`

适用：错误做法 / 推荐做法、常见误区、正确示例、行为准则。

## Layout Contract

- 画面必须明确呈现错误做法和推荐做法，但最终记忆点应落在推荐做法。
- 错误做法可以被划掉、降权或归档；推荐做法必须被确认、提权或锁定。
- 正反两侧内容应语义对齐，例如错误动作对应正确动作、错误原因对应改法。
- 内容应是可执行规则，不是泛泛的价值判断。
- 禁止做成普通左右对比表、平均双栏说明或底部总结条。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 rule family 内错误、修正和规则记忆点的呈现方式；
错误示例和正确示例必须来自真实内容。

- `wrong-right-split`：默认错误 / 正确左右分区。适合两种做法需要并列阅读的场景。
  正确侧必须最终提权。
- `corrected-example-focus`：错误示例先出现并被修正，最终聚焦正确示例。适合强调具体改法。
  修正动作不能只是闪色。
- `rule-lockup`：最终规则作为主视觉，错误和正确示例作为支撑上下文。适合字幕重点是可记忆规则。
  示例不能抢走规则 headline。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 阈值、错误项、正确项、示例和状态标签按真实规则生成；没有明确数值或示例时，不要编造百分比、边界或案例。

## Motion Direction

适合从误区转向可执行规则。

动作组合：

- 正反两侧区域建立。
- 错误做法先出现并被划掉、降权或压暗。
- 推荐做法从弱态进入，边条、marker 或 stamp 确认。
- 最终保留推荐做法为主视觉，错误侧作为上下文留在弱态。

节奏特点：先暴露错误，再把观众注意力转到应该执行的做法。

## Use When

内容是在讲“不要这样，要这样”，例如提示词写法、软件操作、剪辑设置、表达方式、脚本结构、
发布检查中的具体正误示例。

## Design Intent

左侧承载错误示例并降权，右侧承载推荐做法并提权。中间是一条规则转移的纵向脊柱，帮助观众感到
注意力从错误示例移动到可执行规则。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad rc-layout">
    <span class="ed-ghost-type rc-ghost" data-anim="ghost">Correct</span>
    <div class="rc-wrap">
      <aside class="rc-copy">
        <span class="ed-kicker label-mono rc-kicker" data-anim="kicker">WRONG TO RIGHT</span>
        <h1 class="serif-cn rc-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline rc-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="rc-stage" data-anim="stage">
        <div class="rc-board">
          <section class="rc-col rc-wrong" data-anim="wrong">
            <div class="rc-head label-mono">Wrong Example</div>
            <!-- Render only real wrong examples from visibleContent. Do not pad examples. -->
            <div class="rc-row is-wrong"><b><!-- wrongItems[0].text --></b><span><!-- wrongItems[0].note --></span></div>
            <div class="rc-row is-wrong"><b><!-- wrongItems[1].text --></b><span><!-- wrongItems[1].note --></span></div>
            <div class="rc-note label-mono">COMMON MISTAKES</div>
          </section>
          <div class="rc-spine" data-anim="spine"><span>RULE TRANSFER</span></div>
          <section class="rc-col rc-correct" data-anim="correct">
            <div class="rc-head label-mono">Recommended</div>
            <!-- Render only real recommended examples from visibleContent. Do not pad examples. -->
            <div class="rc-row is-correct"><b><!-- correctItems[0].text --></b><span><!-- correctItems[0].note --></span></div>
            <div class="rc-row is-correct"><b><!-- correctItems[1].text --></b><span><!-- correctItems[1].note --></span></div>
            <div class="rc-stamp label-mono" data-anim="stamp">LOCKED RULE</div>
          </section>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .rc-layout { position: relative; }
#scene_xxx .rc-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .rc-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .rc-kicker { margin-bottom: 34px; }
#scene_xxx .rc-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .rc-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .rc-stage { align-self: center; }
#scene_xxx .rc-board { height: 640px; display: grid; grid-template-columns: 1fr 120px 1fr; border: var(--rule-w) var(--rule-style) var(--rule); background: var(--surface-2); }
#scene_xxx .rc-col { position: relative; padding: 42px 48px; display: grid; grid-template-rows: auto 1fr 1fr auto; gap: 24px; }
#scene_xxx .rc-wrong { opacity: 0.66; }
#scene_xxx .rc-correct { background: linear-gradient(180deg, var(--accent-soft), transparent 70%); }
#scene_xxx .rc-head { font-size: 16px; letter-spacing: 0.28em; color: var(--text-mute); border-bottom: var(--rule-w) var(--rule-style) var(--rule); padding-bottom: 20px; }
#scene_xxx .rc-row { position: relative; border-bottom: var(--rule-w) var(--rule-style) var(--rule); padding: 30px 0 26px; }
#scene_xxx .rc-row b { display: block; font-family: var(--font-display-cn); font-size: 42px; letter-spacing: 0.04em; font-weight: 600; }
#scene_xxx .rc-row span { display: block; margin-top: 14px; font-size: 20px; color: var(--text-mute); line-height: 1.5; }
#scene_xxx .is-wrong::after { content: ""; position: absolute; left: -6px; right: 18%; top: 52%; height: var(--rule-w); background: var(--rule); transform: rotate(-2deg); }
#scene_xxx .is-correct::before { content: ""; position: absolute; left: -20px; top: 38px; width: 8px; height: 72px; background: var(--accent); }
#scene_xxx .rc-spine { border-left: var(--rule-w) var(--rule-style) var(--rule); border-right: var(--rule-w) var(--rule-style) var(--rule); display: grid; place-items: center; }
#scene_xxx .rc-spine span { writing-mode: vertical-rl; font-family: var(--font-mono); color: var(--accent); letter-spacing: 0.24em; text-transform: uppercase; }
#scene_xxx .rc-note,
#scene_xxx .rc-stamp { font-size: 16px; letter-spacing: 0.22em; color: var(--text-mute); }
#scene_xxx .rc-stamp { color: var(--accent); }
#scene_xxx .rc-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `wrong`, `spine`, `correct`, `stamp`.

## Do Not Change

不要让错误做法和推荐做法同权；不要把推荐确认放到底部脚注；不要把中文内容句放进小号 meta 区。
