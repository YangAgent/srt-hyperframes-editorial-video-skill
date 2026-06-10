# example-case-card

family: `example`

适用：举一个例子、看这个 case、用具体场景解释一句话。

## Layout Contract

- 具体 case 必须是主视觉对象。
- 局部标注只能指出关键细节，不得变成证据报告。
- 适合案例说明，不适合 evidence 证明、rule 正误示例或 before/after 修复流程。
- 禁止多个元素互相重叠；标注、读数和 case 主体必须有清楚距离。

## Layout Variants

- `hero-example`：具体 case 作为主视觉。适合只需要展示一个案例主体。
- `annotated-example`：case 主体 + 局部关键标注。适合字幕聚焦案例中的某个细节。
- `example-result-pair`：case 与结果读数并列。适合案例需要同时看到前后结果。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了填满 case surface、标注或读数而新增概念。
- case 主体、标注和读数必须来自真实内容。
- 没有具体场景或案例对象时，不要使用本 layout。
- 如果素材是真实截图、引用、来源或证明主体，优先 `evidence-*`；如果是错误/正确示例，优先
  `rule-correct-wrong-example`。

## Motion Direction

- case 主体先建立。
- 关键区域或标注随后出现。
- 结果读数或结论最后稳定确认。

节奏特点：让观众直接看这个案例，而不是听抽象解释。

## Use When

内容是在用一个具体案例、场景、片段或操作结果来解释一句话。

## Design Intent

左侧标题说明“看这个案例”的目的；右侧 case surface 是主视觉。标注和读数放在 case 旁边，保持呼吸感，
不使用长 leader line。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ex-layout">
    <span class="ed-ghost-type ex-ghost" data-anim="ghost">Example</span>
    <div class="ex-wrap">
      <aside class="ex-copy">
        <span class="ed-kicker label-mono ex-kicker" data-anim="kicker"><!-- kicker --></span>
        <h1 class="serif-cn ex-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline ex-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="ex-stage" data-anim="stage">
        <section class="ex-case" data-anim="case"><h2><!-- case.title --></h2><div class="ex-surface"><!-- case visual --></div></section>
        <aside class="ex-annot" data-anim="annotation"><small><!-- label --></small><strong><!-- keyDetail --></strong><p><!-- note --></p></aside>
        <div class="ex-readouts" data-anim="readouts"><div><span><!-- label --></span><b><!-- value --></b></div></div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ex-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .ex-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .ex-stage { position: relative; height: 650px; align-self: center; }
#scene_xxx .ex-case { position: absolute; left: 52px; top: 108px; width: 520px; min-height: 430px; border: var(--rule-w) var(--rule-style) var(--rule); padding: 34px; background: var(--surface-2); }
#scene_xxx .ex-case h2 { margin: 0 0 28px; font-family: var(--font-display-cn); font-size: 34px; }
#scene_xxx .ex-annot { position: absolute; right: 54px; top: 112px; width: 360px; padding: 30px 34px; border-left: var(--rule-w) var(--rule-style) var(--accent); background: var(--surface); }
#scene_xxx .ex-annot strong { display: block; margin-top: 20px; font-family: var(--font-display-cn); font-size: 36px; line-height: 1.14; }
#scene_xxx .ex-readouts { position: absolute; right: 54px; bottom: 132px; width: 360px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
#scene_xxx .ex-readouts b { display: block; margin-top: 12px; font-family: var(--font-display-cn); font-size: 28px; line-height: 1.15; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `case`, `annotation`, `readouts`.

## Subtitle Safety

- `.ex-readouts` 是结果读数，不是装饰性底栏；默认 `bottom` 不低于 `132px`。

## Do Not Change

不要把案例做成证据报告；不要把标注和读数压在一起；不要没有具体 case 时使用本 layout。
