# quote-margin-index

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

`layout_variant` 必须选择下列之一。variant 只改变 quote family 内的索引、边注和档案感组织方式；
可见 quote 与来源信息仍只能来自真实内容。

- `margin-ledger`：默认边注账本式结构。适合 quote 需要出处、编号、日期或关键词索引支撑时使用。
  边注必须贴靠 quote，不承载 SRT 内容句。
- `side-index`：一侧竖向 index rail，quote 占据另一侧大面积。适合带章节、关键词或主题编号的金句。
  rail 只能放元信息或极短标签。
- `archive-strip`：顶部或底部档案条组织来源信息，quote 作为主视觉。适合强调摘录、记录、文件感。
  档案条不能变成脚注式字幕容器。

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

## Use When

quote 需要出处、日期、关键词、方法论标签或思想索引感，而不是只展示一句漂亮金句。

## Design Intent

文化杂志跨页引用。左侧是大号 quote 正文和低透明 quote mark，右侧窄栏像索引边注，放
source/date/type 和关键词。右栏不是装饰卡片，而是与 quote 同等严肃的出处系统。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad qt2-layout">
    <span class="ed-ghost-type qt2-ghost" data-anim="ghost">Margin</span>
    <div class="qt2-wrap" data-anim="spread">
      <main class="qt2-main">
        <span class="qt2-mark" data-anim="quote-mark">"</span>
        <p class="qt2-text serif-cn" data-anim="quote">金句文本，强调<span class="ed-accent" data-anim="accent-word">关键词</span></p>
      </main>
      <aside class="qt2-side" data-anim="index">
        <div class="qt2-meta label-mono">SOURCE · <b>REAL META</b><br>DATE · <b>YYYY.MM.DD</b><br>TYPE · <b>TAKEAWAY</b></div>
        <div class="qt2-keywords">
          <!-- Render only real keywords from visibleContent. Do not pad to three. -->
          <span><!-- keywords[0].text --></span><span><!-- keywords[1].text --></span>
        </div>
      </aside>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .qt2-layout { position: relative; }
#scene_xxx .qt2-wrap {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 84px;
  align-items: center;
}
#scene_xxx .qt2-main {
  position: relative;
  padding-top: 70px;
}
#scene_xxx .qt2-mark {
  position: absolute;
  left: -18px;
  top: -18px;
  font-family: var(--font-display-en);
  font-size: 260px;
  line-height: 0.5;
  color: var(--text);
  opacity: 0.08;
}
#scene_xxx .qt2-text {
  max-width: 1100px;
  margin: 0;
  font-size: 84px;
  line-height: 1.42;
  letter-spacing: 0.055em;
}
#scene_xxx .qt2-side {
  align-self: stretch;
  border-left: var(--rule-w) var(--rule-style) var(--rule);
  padding-left: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#scene_xxx .qt2-meta {
  margin-top: 0;
  font-size: 17px;
  line-height: 2.1;
  letter-spacing: 0.18em;
  color: var(--text-mute);
}
#scene_xxx .qt2-meta b {
  color: var(--text-2);
  font-weight: 500;
}
#scene_xxx .qt2-keywords {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
#scene_xxx .qt2-keywords span {
  font-size: 24px;
  color: var(--text-2);
  letter-spacing: 0.04em;
}
#scene_xxx .qt2-ghost {
  right: 70px;
  bottom: 30px;
  font-size: 220px;
}
```

## Animation Hooks

`ghost`, `spread`, `quote-mark`, `quote`, `accent-word`, `index`.

## Do Not Change

不要把右侧索引栏做成独立卡片；不要把真实 source/date/type 做成远离 quote 的脚注；不要把关键词漂浮到 quote 外。
