# quote-oversized

family: `quote`

适用：quote、论点、金句或需要被认真读完的 takeaway。

## Layout Contract

- prototype 中的边注、索引和来源项数量只是示例；按真实 quote 上下文增减，但保持 quote 第一视觉。
- quote line 是第一视觉，使用大号中文衬线，允许 2-4 行。
- 超大 opening quote mark 是情绪符号，不是装饰小图标。
- attribution/source 若提供，必须用 rule 贴靠 quote 组。
- accent 只落在 quote 内的 1 个关键词组。
- 禁止把 quote 拆成卡片、列表或底部脚注。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 quote family 内的阅读重心和留白方式；
quote 内容仍只能来自 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。

- `center-monument`：默认居中纪念碑式大 quote。适合需要被完整读完的一句话 takeaway。
  opening mark、rule 和 attribution 必须贴靠 quote 组。
- `cropped-mark`：超大引号或关键词被裁切在边缘，quote 贴靠其内侧。适合情绪强、短而重的句子。
  裁切符号不能压过正文可读性。
- `wide-breathing`：横向宽版留白，quote 占据画面中轴，边缘只保留极少 meta。适合慢节奏、沉稳结论。
  不添加多余装饰或散落注释。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 文字主导 layout 的辅助 kicker、关键词、边注或 badge 只在真实内容需要时保留；不要为了让画面更满而新增口号、关键词或引用来源。

## Motion Direction

适合 quote、金句、判断句或需要被认真读完的观点。

动作组合：

- quote 逐行揭示。
- source、citation 或 mono cue 稍后出现。
- accent 词最后出现并稳定承担结论焦点。
- 背景或 ghost type 做缓慢呼吸式位移。

节奏特点：节奏安静，给观众读完句子的时间。

## Design Intent

画面中心偏左是一段大号中文金句，上方压一个低透明橙色巨型引号，形成编辑式情绪入口。
署名和来源通过短 rule 贴靠在 quote 下方，右上角英文 ghost 提供背景声。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad qt-layout">
    <span class="ed-ghost-type qt-ghost" data-anim="ghost">Voice</span>
    <div class="qt-wrap">
      <div class="qt-mark" data-anim="quote-mark">"</div>
      <p class="serif-cn qt-text" data-anim="quote">
        金句文本里的<span class="ed-accent" data-anim="accent-word">关键词</span>
      </p>
      <div class="qt-foot" data-anim="attribution">
        <span class="qt-rule"></span>
        <span class="label-mono qt-author">SOURCE / NOTE</span>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .qt-layout {
  position: relative;
  justify-content: center;
}
#scene_xxx .qt-wrap {
  max-width: 1480px;
}
#scene_xxx .qt-mark {
  height: 150px;
  margin-bottom: 10px;
  font-family: var(--font-display-en);
  font-size: 340px;
  line-height: 0.5;
  color: var(--accent);
  opacity: 0.22;
}
#scene_xxx .qt-text {
  margin: 0;
  font-size: 92px;
  line-height: 1.42;
  letter-spacing: 0.04em;
}
#scene_xxx .qt-foot {
  margin-top: 72px;
  display: flex;
  align-items: center;
  gap: 28px;
}
#scene_xxx .qt-rule {
  width: 88px;
  height: 1px;
  background: var(--rule);
}
#scene_xxx .qt-author {
  color: var(--text-mute);
  font-size: 22px;
  letter-spacing: 0.18em;
}
#scene_xxx .qt-ghost {
  right: 5%;
  top: 8%;
  font-size: 240px;
}
```

## Animation Hooks

`ghost`, `quote-mark`, `quote`, `accent-word`, `attribution`.

## Do Not Change

不要把 quote 做成居中的小段落；不要添加左右卡片；不要让 attribution 离开 quote 组。
