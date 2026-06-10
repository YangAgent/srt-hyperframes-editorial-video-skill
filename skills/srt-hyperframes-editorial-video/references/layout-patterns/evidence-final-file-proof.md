# evidence-final-file-proof

family: `evidence`

适用：多个证据、案例、引用、截图要点、局部证明或来源定位。

## Layout Contract

- prototype 中的证据行、标注和规格读数数量只是示例；按真实证据增减，但保持证据主体主导。
- 证据主体必须占据主区域，annotation 贴靠证据局部。
- 左侧文字组只负责结论和真实元信息，不替代证据。
- 标注若出现，可以使用短 leader line，但必须连接到证据主体附近。
- 禁止没有证据主体时使用本 layout；禁止把证据做成小卡片或角落截图。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 evidence family 内最终交付物和规格读数的呈现方式；
文件、规格和 proof 信息必须来自真实内容。

- `hero-file-proof`：最终文件 / 交付物作为主视觉。适合强调结果对象本身已经完成。
  文件表面必须占据主区域。
- `spec-readout`：交付物旁贴靠规格读数。适合输出格式、时长、尺寸、质量等参数是可信度来源。
  规格读数不得伪造。
- `delivery-poster`：交付物做成海报式 proof，标题和状态贴靠其边缘。适合结尾或确认交付场景。
  状态标签必须来自真实结果。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 证据主体、annotation、规格读数和来源标签必须有真实依据；没有证据细节时减少标注或改用 statement / concept layout。

## Motion Direction

适合证据、引用、截图要点、图片说明和局部证明。

动作组合：

- 证据主体先安静显现。
- scan line、marker ring 或 highlight rect 定位关键区域。
- callout 线条绘制到标签。
- source / citation 稍后落位，强化可信度。

节奏特点：像编辑把观众视线带到证据上，而不是把证据一次性堆满。

## Use When

证据重点不是过程截图或局部行，而是一个已经满足发布条件的最终文件、交付物或结果对象。
适合展示 final mp4、报告、导出文件、交付包、审核通过状态和几项关键规格。

## Design Intent

左侧仍是编辑式标题和元信息，右侧变成一张大号 proof poster：顶部状态胶囊确认 ready，
中部用巨大文件名/结果对象作为主视觉，底部规格读数支撑可信度。规格和标注数量按真实证据内容
生成，通常保持少量且贴靠 poster。它强调最终结果本身，而不是局部放大。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ev2-layout">
    <span class="ed-ghost-type ev2-ghost" data-anim="ghost">Proof</span>
    <div class="ev2-left">
      <span class="ed-kicker label-mono ev2-kicker" data-anim="kicker">EVIDENCE</span>
      <h1 class="serif-cn ev2-title" data-anim="headline">不用解释流程，<br>直接看<span class="ed-accent">结果文件</span></h1>
      <div class="label-mono ev2-meta" data-anim="source-meta">Evidence · Publish File</div>
    </div>
    <div class="ev2-stage" data-anim="stage">
      <div class="ev2-proof" data-anim="proof">
        <span class="ev2-status" data-anim="status">Ready</span>
        <div class="ev2-proof-k label-mono" data-anim="proof-kicker">final export · evidence object</div>
        <div class="ev2-file" data-anim="evidence"><!-- evidenceFile.name --><span><!-- evidenceFile.ext --></span></div>
        <div class="ev2-specs">
          <div class="ev2-spec" data-anim="spec"><div class="v">1080p</div><div class="l">直接进入发布规格</div></div>
          <div class="ev2-spec" data-anim="spec"><div class="v">&lt;32ms</div><div class="l">音画偏差已被锁定</div></div>
          <div class="ev2-spec" data-anim="spec"><div class="v">6</div><div class="l">镜头节拍全部匹配版式</div></div>
        </div>
      </div>
      <div class="ev2-note" data-anim="annotation"><div class="k label-mono">MARK</div><div class="t">证据不是过程截图，而是已经满足发布条件的最终文件。</div></div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ev2-layout { position: relative; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 78px; align-items: center; }
#scene_xxx .ev2-left { align-self: stretch; display: flex; flex-direction: column; }
#scene_xxx .ev2-kicker { margin-bottom: 30px; }
#scene_xxx .ev2-title { margin: 0; font-size: 66px; line-height: 1.09; }
#scene_xxx .ev2-meta { margin-top: auto; margin-bottom: 80px; padding-top: 28px; border-top: var(--rule-w) var(--rule-style) var(--rule); font-size: 17px; letter-spacing: 0.16em; color: var(--text-mute); line-height: 2; }
#scene_xxx .ev2-stage { position: relative; height: 700px; }
#scene_xxx .ev2-proof { position: absolute; left: 0; right: 0; top: 42px; bottom: 132px; padding: 48px 56px; background: radial-gradient(120% 120% at 68% 24%, var(--accent-soft), transparent 42%), linear-gradient(135deg, var(--surface), var(--surface-2)); border: var(--rule-w) var(--rule-style) var(--rule); border-radius: var(--r-sm); box-shadow: 0 32px 92px rgba(0, 0, 0, 0.55); }
#scene_xxx .ev2-proof::before { content: ""; position: absolute; left: 56px; right: 56px; top: 126px; height: 1px; background: var(--rule); }
#scene_xxx .ev2-status { position: absolute; right: 56px; top: 52px; border: var(--rule-w) var(--rule-style) var(--accent); color: var(--accent); border-radius: 999px; padding: 8px 18px; font-family: var(--font-mono); font-size: 15px; letter-spacing: 0.2em; text-transform: uppercase; }
#scene_xxx .ev2-proof-k { font-size: 17px; letter-spacing: 0.22em; color: var(--text-mute); }
#scene_xxx .ev2-file { margin-top: 90px; font-family: var(--font-display-en); font-size: 126px; line-height: 0.82; letter-spacing: -0.055em; color: var(--text); }
#scene_xxx .ev2-file span { color: var(--accent); }
#scene_xxx .ev2-specs { position: absolute; left: 56px; right: 56px; bottom: 46px; display: grid; grid-template-columns: repeat(3, 1fr); border-top: var(--rule-w) var(--rule-style) var(--rule); }
#scene_xxx .ev2-spec { padding-top: 26px; padding-right: 28px; }
#scene_xxx .ev2-spec + .ev2-spec { border-left: var(--rule-w) var(--rule-style) var(--rule); padding-left: 30px; }
#scene_xxx .ev2-spec .v { font-family: var(--font-display-en); font-size: 64px; line-height: 0.9; color: var(--text); letter-spacing: -0.03em; }
#scene_xxx .ev2-spec .l { margin-top: 13px; font-size: 19px; line-height: 1.45; color: var(--text-mute); }
#scene_xxx .ev2-note { position: absolute; right: 40px; top: 260px; width: 360px; padding: 18px 22px; background: var(--shell); border-top: 2px solid var(--accent); box-shadow: 0 18px 60px rgba(0, 0, 0, 0.42); }
#scene_xxx .ev2-note .k { font-size: 14px; letter-spacing: 0.2em; color: var(--accent); margin-bottom: 8px; }
#scene_xxx .ev2-note .t { font-size: 20px; line-height: 1.5; color: var(--text); }
#scene_xxx .ev2-ghost { left: 34px; bottom: 22px; font-size: 165px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `source-meta`, `stage`, `proof`, `status`, `proof-kicker`, `evidence`, `spec`, `annotation`.

## Subtitle Safety

- `ev2-note` 是内容标注，不是 ghost 装饰或底部脚注；默认 `bottom` 不低于 `132px`。
- proof poster 内部的 specs 可以贴近 poster 底部，但 poster 自身必须给字幕流程预留底部安全区。
- 如果 proof poster 同时有 specs 和 annotation，annotation 应使用 `top` 定位贴靠 evidence 中部，
  不要与底部 specs 抢同一空间。

## Do Not Change

不要把 proof poster 改回日志表格或局部 zoom；不要让规格读数比文件名更强；不要把标注移成底部脚注。
