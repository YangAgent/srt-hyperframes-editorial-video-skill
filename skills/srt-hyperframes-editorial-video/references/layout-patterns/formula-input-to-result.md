# formula-input-to-result

family: `formula`

适用：输入要素合成结果、方法公式、提示词组成、脚本配方、产出结构。

## Layout Contract

- 画面必须呈现多个输入要素参与形成一个结果。
- 输入要素应有各自位置和重量，不能只是平均标签。
- 结果块必须是最终主视觉之一，并明确说明产出是什么。
- 可以使用运算符、轨道、压缩区或结果 slab 表达合成关系。
- 禁止做成普通流程图、步骤卡片或纯公式文字。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 formula family 内输入要素如何合成为结果；
输入、运算和结果必须来自真实内容。

- `ingredient-grid-output`：输入要素网格汇入结果块。适合多个组成部分共同产出一个结果。
  网格项数量按真实输入增减。
- `equation-rail`：公式轨道串联输入、运算符和结果。适合结构像配方、提示词组成或方法公式。
  运算符不能伪造逻辑。
- `mixer-core`：中心混合区把输入要素合成为输出。适合强调组合、融合或生成动作。
  mixer 必须服务真实合成关系。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 输入要素、变量和结果按真实配方关系生成；示例中的 3 个输入或多个变量不是要求，禁止补无来源要素。

## Motion Direction

适合把“由哪些东西组成”变成合成过程。

动作组合：

- 输入要素先按空间节奏出现。
- 运算符、轨道或组合关系补上。
- 结果块从末端、右下或核心位置被压出。
- 最终结果保持稳定，输入要素作为上下文保留。

节奏特点：输入不是并列展示，而是参与结果形成。

## Use When

内容是在讲方法配方、提示词公式、脚本结构、剪辑结构、课程结构、工作流产出由哪些输入组成。

## Design Intent

画面以舞台式公式排版承载输入要素，结果块在右下角被合成出来。观众应看到“目标、限制、示例”等
输入如何共同形成可执行结果。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad fi-layout">
    <span class="ed-ghost-type fi-ghost" data-anim="ghost"><!-- ghostWord --></span>
    <div class="fi-assembly">
      <span class="ed-kicker label-mono fi-kicker" data-anim="kicker"><!-- kicker --></span>
      <div class="fi-title-block" data-anim="headline">
        <h1 class="serif-cn fi-title"><!-- headline --></h1>
        <p class="ed-subline fi-sub"><!-- subline --></p>
      </div>
      <div class="fi-field" data-anim="field">
        <!-- Render only real inputs from visibleContent. Do not pad to three. -->
        <div class="fi-word fi-w1" data-anim="input"><small>Input <!-- inputItems[0].index --></small><b><!-- inputItems[0].text --></b><span><!-- inputItems[0].note --></span></div>
        <div class="fi-operator fi-op1" data-anim="operator">×</div>
        <div class="fi-word fi-w2" data-anim="input"><small>Input <!-- inputItems[1].index --></small><b><!-- inputItems[1].text --></b><span><!-- inputItems[1].note --></span></div>
        <div class="fi-result" data-anim="result"><small><!-- result.kicker --></small><strong><!-- result.text --></strong><p><!-- result.note --></p></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .fi-layout { position: relative; }
#scene_xxx .fi-assembly { position: relative; height: 100%; isolation: isolate; }
#scene_xxx .fi-kicker { position: absolute; left: 0; top: 0; z-index: 4; }
#scene_xxx .fi-title-block { position: absolute; right: 0; top: 8px; width: 760px; z-index: 4; text-align: right; }
#scene_xxx .fi-title { margin: 0; font-size: 78px; line-height: 1.05; letter-spacing: 0.045em; }
#scene_xxx .fi-sub { margin: 22px 0 0 auto; max-width: 30ch; font-size: 22px; line-height: 1.52; text-align: right; }
#scene_xxx .fi-field { position: absolute; left: 18px; top: 304px; width: 1514px; height: 476px; }
#scene_xxx .fi-word { position: absolute; font-family: var(--font-display-cn); font-weight: 600; letter-spacing: 0.045em; color: var(--text); }
#scene_xxx .fi-word small { display: block; margin-bottom: 18px; font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--text-mute); }
#scene_xxx .fi-word b { display: block; font-size: 96px; line-height: 0.88; }
#scene_xxx .fi-word span { display: block; margin-top: 20px; max-width: 13em; font-family: var(--font-body); font-size: 19px; line-height: 1.45; font-weight: 400; color: var(--text-mute); letter-spacing: 0.02em; }
#scene_xxx .fi-w1 { left: 0; top: 0; }
#scene_xxx .fi-w2 { left: 360px; top: 132px; }
#scene_xxx .fi-w3 { left: 760px; top: 18px; }
#scene_xxx .fi-operator { position: absolute; font-family: var(--font-display-en); font-style: italic; font-size: 176px; line-height: 0.8; color: var(--accent); opacity: 0.55; z-index: 2; }
#scene_xxx .fi-op1 { left: 270px; top: 112px; }
#scene_xxx .fi-op2 { left: 640px; top: 114px; }
#scene_xxx .fi-result { position: absolute; right: 0; bottom: 0; width: 528px; height: 236px; padding: 38px 48px; background: linear-gradient(135deg, var(--accent-soft), var(--surface) 58%, var(--surface-2)); box-shadow: 0 54px 130px var(--surface-3); transform: rotate(-3deg); z-index: 5; }
#scene_xxx .fi-result small { font-family: var(--font-mono); color: var(--accent); letter-spacing: 0.24em; text-transform: uppercase; }
#scene_xxx .fi-result strong { display: block; margin-top: 24px; font-family: var(--font-display-cn); font-size: 54px; line-height: 1.05; letter-spacing: 0.05em; }
#scene_xxx .fi-result p { margin: 20px 0 0; color: var(--text-2); font-size: 19px; line-height: 1.48; }
#scene_xxx .fi-ghost { right: 52px; bottom: 16px; font-size: 250px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `field`, `input`, `operator`, `result`.

## Subtitle Safety

- `.fi-result` 是公式输出结论卡，但在本 skeleton 中它定位于 `.fi-field` 内部；不要把
  `.fi-result { bottom: 132px; }` 直接写在 field 内，否则会压到输入词和运算符。
- 本 skeleton 的 `.fi-field` 底部已经高于字幕安全区；如果实际实现把 result 作为 scene/stage
  直接子元素定位，才使用 `bottom: 132px`。
- 需要给字幕留空间时，优先整体上移或缩短 `.fi-field`，同时保持输入词、运算符和结果块之间的
  空间关系；不要只把结果块单独上移。

## Do Not Change

不要把输入要素排成普通步骤；不要弱化结果块；不要用无意义符号替代真实输入和结果。
