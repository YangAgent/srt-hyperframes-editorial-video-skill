# statement-diagonal-command

family: `statement`

适用：强主张、核心概念、结论、判断或行动建议。

## Layout Contract

- prototype 中的 kicker、rule、subline 和 ghost 文案只是示例；按真实主张取舍，但保持 headline 第一视觉。
- headline 是第一视觉，通常占有效画面 60-80%；字号按文本长度调整，但必须保持海报级标题体量。
- kicker、rule、subline 若出现，必须贴靠 headline，形成同一个标题组。
- 英文 ghost type 只做背景情绪层，不得成为第二标题。
- accent 最多落在 headline 关键词或 rule marker 上。
- 禁止把 subline、行动句或结论放到底部、角落或远离 headline 的位置。
- 禁止用通用 headline token 把标题缩成普通大标题；如果文本较长，应优先换行，而不是整体缩小。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 statement family 内的压迫方向和冲击构图；
可见内容仍只能来自 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。

- `slash-command`：默认斜向命令构图。适合停止、转向、砍掉、重选等动作感强的短主张。保留斜向压边、
  巨大 headline 和单点 accent。
- `edge-pressure`：标题贴近画面边缘形成压迫感。适合强提醒、警告或必须立刻执行的行动建议。
  kicker、rule 和 subline 必须贴靠标题组，不创建独立底部说明。
- `split-impact`：画面被一条斜向分割线切开，命令词和补充句分居两侧。适合“从 A 切到 B”的决断句。
  分割线只服务主张，不扩展成 compare layout。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 文字主导 layout 的辅助 kicker、关键词、边注或 badge 只在真实内容需要时保留；不要为了让画面更满而新增口号、关键词或引用来源。

## Motion Direction

适合强主张、大标题、重要结论或图片配标题的冲击式文字画面。

动作组合：

- 小号 mono kicker 先出现。
- rule 或 accent 线条被画出来。
- headline 从轻微缩放、轻微模糊中变清晰并落位。
- accent 词或英文 italic 短语作为结论状态延后归位。
- ghost type 或背景层做缓慢漂移。

节奏特点：前 1 秒有明确冲击，但收尾保持稳，不做弹跳式喜剧感。

## Use When

标题有明显动作感或决断感，语义是砍掉、停止、决定、转向、重新选择、把某件事强行压下去。

## Design Intent

斜向压边的编辑指令页。巨型中文标题从左上向画面中部倾斜压入，右侧窄栏承载一条贴边证明短句，
底部 rule 与斜向标题形成压迫感。英文 ghost 倾斜贴右下角，只提供决断气质。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad sh2-layout">
    <span class="ed-ghost-type sh2-ghost" data-anim="ghost">Decide</span>
    <div class="sh2-wrap">
      <span class="ed-kicker label-mono sh2-kicker" data-anim="kicker">ACTION</span>
      <h1 class="serif-cn sh2-title" data-anim="headline">把重复劳动<br><span class="sh2-indent"><span class="ed-accent" data-anim="accent-word">剪掉</span></span></h1>
      <hr class="rule sh2-rule" data-anim="rule" />
      <aside class="sh2-side" data-anim="side-proof">
        <p>贴靠标题的证明短句，不写成长段解释。</p>
      </aside>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .sh2-layout {
  position: relative;
}
#scene_xxx .sh2-wrap {
  position: relative;
  height: 100%;
}
#scene_xxx .sh2-kicker {
  position: absolute;
  left: 0;
  top: 4px;
  letter-spacing: 0.42em;
}
#scene_xxx .sh2-title {
  position: absolute;
  left: -18px;
  top: 118px;
  max-width: 1320px;
  margin: 0;
  font-size: 164px;
  line-height: 0.98;
  letter-spacing: 0.055em;
  transform: rotate(-4deg);
  transform-origin: left top;
}
#scene_xxx .sh2-indent {
  display: block;
  margin-left: 230px;
}
#scene_xxx .sh2-side {
  position: absolute;
  right: 0;
  top: 210px;
  bottom: 132px;
  width: 330px;
  border-left: var(--rule-w) var(--rule-style) var(--rule);
  padding-left: 34px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
#scene_xxx .sh2-side p {
  margin: 0;
  font-size: 28px;
  line-height: 1.5;
  color: var(--text-2);
  letter-spacing: 0.04em;
}
#scene_xxx .sh2-rule {
  position: absolute;
  left: 120px;
  right: 410px;
  bottom: 156px;
}
#scene_xxx .sh2-ghost {
  right: -36px;
  bottom: 34px;
  font-size: 340px;
  transform: rotate(-8deg);
  transform-origin: right bottom;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `accent-word`, `rule`, `side-proof`.

## Do Not Change

不要拉直标题；不要把右侧证明栏改成卡片；不要把斜向标题缩成普通居中标题。
