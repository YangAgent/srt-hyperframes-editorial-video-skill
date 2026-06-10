# statement-editorial

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

`layout_variant` 必须选择下列之一。variant 只改变构图和阅读路径，不改变 statement family 的
语义边界；可见内容仍只能来自 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。

- `cover-left-anchor`：默认杂志封面式左锚定大标题。适合稳定判断、总结和承诺。保留当前 skeleton
  的左侧标题组、kicker、rule、subline 与右下 ghost 关系。
- `center-quote-lockup`：居中大标题 / 金句式锁定。适合一句话本身就是画面主体的结论。标题组居中，
  rule 和 subline 贴近标题下方，ghost 退到边缘或底部；不要变成 PPT 标题页。
- `vertical-rail`：左或右侧竖向 rail + 大标题横向展开。适合带有“原则 / 命令 / 章节感”的主张。
  kicker、编号或短 meta 进入竖向 rail，headline 仍占主视觉。
- `cropped-keyword`：巨大裁切关键词作为主视觉，辅助标题贴靠关键词边缘。适合可抽取强关键词的短句。
  裁切词必须来自真实内容或英文 ghost，不新增概念；辅助标题不能漂到角落。

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

## Design Intent

暗色杂志封面式陈述页。标题组锚定在画面中部偏左的编辑版心，上下留出均衡呼吸；巨型中文标题
必须占据视觉中心，而不是贴近底部的普通标题条。kicker 用等宽小字和橙色短线建立栏目感，
细 rule 和 subline 贴靠标题形成完整阅读组。超大英文 italic ghost 压在右下角，只提供气质和
空间深度。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad sh-editorial">
    <span class="ed-ghost-type sh-ghost" data-anim="ghost">SAVE</span>
    <div class="sh-content">
      <span class="ed-kicker label-mono sh-kicker" data-anim="kicker">SKILL WORKFLOW</span>
      <h1 class="serif-cn sh-title" data-anim="headline">
        强主张标题<span class="ed-accent" data-anim="accent-word">关键词</span>
      </h1>
      <hr class="rule sh-rule" data-anim="rule" />
      <p class="ed-subline sh-subline" data-anim="subline">贴靠主标题的一行补充说明</p>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .sh-editorial {
  position: relative;
  justify-content: center;
}
#scene_xxx .sh-content {
  width: min(1500px, 88%);
  transform: translateY(-24px);
}
#scene_xxx .sh-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  color: var(--text-mute);
  margin-bottom: 40px;
  letter-spacing: 0.42em;
}
#scene_xxx .sh-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .sh-title {
  margin: 0;
  font-size: 184px;
  line-height: 1.02;
  letter-spacing: 0.05em;
}
#scene_xxx .sh-rule {
  margin: 44px 0 36px;
  max-width: 1280px;
}
#scene_xxx .sh-subline {
  max-width: 980px;
  font-size: var(--type-body);
  letter-spacing: 0.05em;
  color: var(--text-2);
}
#scene_xxx .sh-ghost {
  right: 4%;
  bottom: 3%;
  font-size: var(--type-ghost);
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `accent-word`, `rule`, `subline`.

## Do Not Change

不要把 headline 居中做成 PPT 标题页；不要添加卡片、面板或多列结构；不要使用中文 ghost type。
