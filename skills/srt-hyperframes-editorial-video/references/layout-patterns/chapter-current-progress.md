# chapter-current-progress

family: `chapter`

适用：当前章节、当前进度、长教程中段定位、章节切换、下一步提示。

## Layout Contract

- 画面必须明确区分已完成、当前、下一步或后续阶段。
- 当前章节或当前进度必须是主视觉锚点。
- 已完成和后续阶段只做上下文，不与当前阶段同权。
- 适合长视频中的定位场景，不适合普通目录页。
- 禁止把章节做成平均目录列表、底部进度条或页面导航。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 chapter family 内当前章节和进度上下文的组织方式；
章节、进度和下一步必须来自真实内容。

- `chapter-stack`：默认章节堆叠。适合显示已完成、当前、下一步的层级关系。
  当前章节必须是主视觉。
- `progress-rail`：进度 rail 贯穿画面，当前节点放大。适合长教程中段定位。
  进度节点只做上下文。
- `current-island`：当前章节作为孤岛式主块，前后阶段退到边缘。适合强调“现在进入这里”。
  边缘阶段不能与当前同权。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 时间点、章节项和进度节点按真实阶段数量生成；没有明确时间或章节时，不要补虚构年份、版本、阶段或下一步。

## Motion Direction

适合在长教程中帮助观众重新获得方向感。

动作组合：

- 阶段组先以弱态建立。
- 已完成阶段轻微确认并降权。
- 当前阶段放大、提亮或被 marker 锁定。
- 下一步阶段以弱态提示，最终焦点停在当前阶段。

节奏特点：不是报目录，而是确认“现在讲到这里”。

## Use When

内容是在章节切换、中段回顾、进入下一部分之前，告诉观众已经完成什么、当前正在做什么、下一步会做什么。

## Design Intent

右侧是一组阶段柱状区域，当前阶段最高、最亮、拥有 `CURRENT` 和 `You are here` 确认。已完成阶段
保留为左侧上下文，后续阶段逐渐降权。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad cp-layout">
    <span class="ed-ghost-type cp-ghost" data-anim="ghost">Here</span>
    <div class="cp-wrap">
      <aside class="cp-copy">
        <span class="ed-kicker label-mono cp-kicker" data-anim="kicker">CURRENT CHAPTER</span>
        <h1 class="serif-cn cp-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline cp-sub" data-anim="subline">已完成、当前、下一步保持层级，让长教程重新获得方向感。</p>
      </aside>
      <main class="cp-stage" data-anim="stage">
        <div class="cp-progress">
          <div class="cp-steps" data-anim="steps">
            <!-- Render only real chapter progress items from visibleContent. Do not pad to five. -->
            <div class="cp-step is-done" data-no="<!-- doneItems[0].index -->"><span><!-- doneItems[0].status --></span><b><!-- doneItems[0].text --></b></div>
            <div class="cp-step is-current" data-no="<!-- currentItem.index -->"><span><!-- currentItem.status --></span><b><!-- currentItem.text --></b><em><!-- currentItem.note --></em></div>
            <div class="cp-step is-future" data-no="<!-- nextItem.index -->"><span><!-- nextItem.status --></span><b><!-- nextItem.text --></b></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .cp-layout { position: relative; }
#scene_xxx .cp-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .cp-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .cp-kicker { margin-bottom: 34px; }
#scene_xxx .cp-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .cp-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .cp-stage { align-self: center; }
#scene_xxx .cp-progress { position: relative; height: 650px; isolation: isolate; }
#scene_xxx .cp-steps { position: absolute; inset: 58px 58px 70px 68px; display: grid; grid-template-columns: 0.78fr 0.9fr 1.38fr 0.9fr 0.78fr; align-items: end; gap: 18px; }
#scene_xxx .cp-step { position: relative; min-height: 260px; padding: 28px 24px; background: linear-gradient(180deg, var(--surface-2), var(--surface-3)); overflow: hidden; }
#scene_xxx .cp-step:nth-child(2) { min-height: 338px; }
#scene_xxx .cp-step:nth-child(4) { min-height: 390px; opacity: 0.48; }
#scene_xxx .cp-step:nth-child(5) { min-height: 470px; opacity: 0.3; }
#scene_xxx .cp-step::before { content: attr(data-no); position: absolute; right: 16px; top: 18px; font-family: var(--font-display-en); font-size: 116px; line-height: 0.8; color: var(--ghost-type-color); }
#scene_xxx .cp-step span { position: relative; z-index: 1; display: block; font-family: var(--font-mono); color: var(--text-mute); letter-spacing: 0.22em; font-size: 14px; }
#scene_xxx .cp-step b { position: relative; z-index: 1; display: block; margin-top: 22px; font-family: var(--font-display-cn); font-size: 34px; line-height: 1.12; letter-spacing: 0.04em; }
#scene_xxx .cp-step.is-current { min-height: 520px; background: radial-gradient(110% 80% at 50% 0%, var(--accent-soft), var(--surface) 66%); box-shadow: 0 44px 120px var(--surface-3); opacity: 1; }
#scene_xxx .cp-step.is-current::before { color: var(--accent-soft); font-size: 150px; }
#scene_xxx .cp-step.is-current b { font-size: 54px; }
#scene_xxx .cp-step.is-current em { position: relative; z-index: 1; display: block; margin-top: 30px; font-style: normal; font-family: var(--font-mono); color: var(--accent); letter-spacing: 0.2em; text-transform: uppercase; }
#scene_xxx .cp-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `steps`.

## Do Not Change

不要把当前章节做成普通目录项；不要让后续阶段同权；不要用底部细进度条替代主视觉。
