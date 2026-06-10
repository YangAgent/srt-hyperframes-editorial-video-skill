# sequence-operation-steps

family: `sequence`

适用：连续操作步骤、当前操作、软件教程短步骤、命令顺序。

## Layout Contract

- 画面必须突出当前操作步骤，其他步骤只作为前后节奏参考。
- 步骤应沿一条连续操作轨道组织，不做平均卡片列表。
- 当前步骤必须有明显编号、动作名称和一句执行说明。
- 适合短操作串，不适合复杂全流程拆解。
- 禁止把所有步骤同权展示，禁止用底部小字承载当前操作。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 sequence family 内当前步骤和前后步骤的呈现方式；
操作步骤必须来自真实教程内容。

- `command-rail`：默认命令轨道。适合短操作串、命令顺序或工具步骤。
  当前步骤沿轨道高亮。
- `current-step-zoom`：当前步骤放大，前后步骤缩成上下文。适合字幕只讲一个关键操作。
  放大内容必须是可执行动作。
- `stacked-actions`：操作动作纵向堆叠，当前动作被扫描或锁定。适合连续点击、设置或短任务序列。
  不变成 checklist。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 步骤、轨道刻度和结果节点按真实流程数量生成；示例中的 3、4、5 步不是要求，少步骤时让当前步骤或结果节点占据主视觉。

## Motion Direction

适合快速带过一组执行动作。

动作组合：

- 操作轨道和前后步骤刻度先建立。
- 当前步骤从轨道中被放大或推到主视觉位置。
- 当前动作说明出现并保持。
- 下一步可轻微提示，但不能抢当前步骤焦点。

节奏特点：当前操作压过画面，前后步骤只是节拍。

## Use When

内容是在讲打开项目、选择模板、填入文本、检查节拍、导出视频等连续操作，尤其适合软件教程或工具教程。

## Design Intent

斜向命令带形成强节奏，当前步骤被放大成画面主角。底部轨道只提供上下文，让观众不必读完整列表也
知道此刻要做什么。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad so-layout">
    <span class="ed-ghost-type so-ghost" data-anim="ghost">Command</span>
    <div class="so-ribbon">
      <div class="so-intro" data-anim="intro">
        <span class="ed-kicker label-mono so-kicker">NEXT ACTION</span>
        <h1 class="serif-cn so-title"><!-- headline with active command accent --></h1>
        <p class="ed-subline so-sub"><!-- subline --></p>
      </div>
      <div class="so-slash" data-anim="slash"></div>
      <div class="so-now" data-anim="current"><small><!-- activeStep.kicker --></small><strong><!-- activeStep.text --></strong><p><!-- activeStep.note --></p></div>
      <div class="so-rail" data-anim="steps">
        <!-- Render only real operation steps from visibleContent. Do not pad to five. -->
        <div class="so-step"><span><!-- steps[0].index --></span><b><!-- steps[0].text --></b></div>
        <div class="so-step is-active"><span><!-- activeStep.index --></span><b><!-- activeStep.text --></b></div>
        <div class="so-step"><span><!-- steps[1].index --></span><b><!-- steps[1].text --></b></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .so-layout { position: relative; }
#scene_xxx .so-ribbon { position: relative; height: 100%; isolation: isolate; }
#scene_xxx .so-intro { position: absolute; right: 0; top: 0; width: 560px; text-align: right; z-index: 4; }
#scene_xxx .so-kicker { justify-content: flex-end; }
#scene_xxx .so-kicker::before { order: 2; }
#scene_xxx .so-title { margin: 32px 0 0; font-size: 76px; line-height: 1.05; letter-spacing: 0.045em; }
#scene_xxx .so-sub { margin: 28px 0 0 auto; max-width: 28ch; font-size: 23px; line-height: 1.55; }
#scene_xxx .so-slash { position: absolute; left: -40px; top: 184px; width: 1540px; height: 330px; background: linear-gradient(105deg, var(--surface-2), var(--surface) 38%, var(--accent-soft) 58%, var(--surface-2)); transform: skewX(-17deg) rotate(-5deg); box-shadow: 0 60px 150px var(--surface-3); z-index: 1; }
#scene_xxx .so-now { position: absolute; left: 116px; top: 246px; z-index: 3; transform: rotate(-5deg); }
#scene_xxx .so-now small { display: block; font-family: var(--font-mono); font-size: 17px; letter-spacing: 0.32em; color: var(--accent); text-transform: uppercase; }
#scene_xxx .so-now strong { display: block; margin-top: 18px; font-family: var(--font-display-cn); font-size: 142px; line-height: 0.92; letter-spacing: 0.05em; color: var(--text); text-shadow: 0 32px 90px var(--surface-3); }
#scene_xxx .so-now p { margin: 40px 0 0 24px; max-width: 37ch; font-size: 24px; line-height: 1.45; color: var(--text-2); }
#scene_xxx .so-rail { position: absolute; left: 30px; bottom: 132px; width: 1460px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 24px; z-index: 4; }
#scene_xxx .so-step { min-height: 120px; padding-top: 16px; color: var(--text-mute); opacity: 0.58; }
#scene_xxx .so-step span { display: block; font-family: var(--font-mono); font-size: 15px; letter-spacing: 0.28em; }
#scene_xxx .so-step b { display: block; margin-top: 17px; font-family: var(--font-display-cn); font-size: 32px; letter-spacing: 0.05em; color: var(--text-2); }
#scene_xxx .so-step.is-active { opacity: 1; color: var(--accent); }
#scene_xxx .so-step.is-active b { color: var(--text); }
#scene_xxx .so-ghost { left: 64px; bottom: 24px; font-size: 246px; }
```

## Animation Hooks

`ghost`, `intro`, `slash`, `current`, `steps`.

## Implementation Notes

- `.so-now` 整组已经使用 `transform: rotate(-5deg)` 跟随斜向命令带；`.so-now p` 不得再写反向
  `rotate(...)`，否则说明文字会脱离当前步骤的倾斜方向。
- 当前步骤标题和说明之间用 `margin` 留出明确间距。不要用反向旋转制造“水平说明”，这会破坏
  `command-rail` 的整体透视关系。
- 底部步骤轨道必须为字幕或后期 caption 流程预留安全区，默认 `bottom` 不低于 `132px`。如果步骤
  文案较多，优先压缩 rail 高度、字号或列间距，不要把轨道贴到画面底边。
- 轨道列数必须按真实步骤数量设置，例如 `repeat(var(--step-count), 1fr)` 或直接写真实数量；
  不要保留示例中的 `repeat(5, 1fr)` 后再补空步骤。

## Do Not Change

不要把当前操作缩成轨道上的一个小点；不要让所有步骤同权；不要用于需要完整流程解释的长流程。
