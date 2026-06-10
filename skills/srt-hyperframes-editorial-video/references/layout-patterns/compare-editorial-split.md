# compare-editorial-split

family: `compare`

适用：before/after、新旧对比、两种选择、优劣变化。

## Layout Contract

- prototype 中的条目、marker 和辅助说明数量只是示例；按真实对比内容增减，但保持分栏主次关系。
- 对比必须是中缝编辑式分栏，左右内容组语义对齐。
- 推荐侧或 after 侧通过 accent、小 badge、亮度和 marker 提权。
- badge 是可选信息，只在原始内容明确需要“推荐 / 关键 / 胜出”标签时出现；不要自动添加
  `CONCLUSION`、`RECOMMENDED` 等装饰性 tag。
- 结论句里的 accent 关键词必须不小于同一句正文；通常应使用同字号加色，或放大 1.08-1.2 倍。
- 左右区域不使用大边框盒子；中缝只是一条 hairline。
- 禁止左右 state 大框、差异轴大标签、底部结果 caption。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 compare family 内的分割方向和主次权重；
对比内容仍只能来自 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。

- `vertical-split`：默认左右中缝分栏。适合 before / after、旧方案 / 新方案和两组并列差异。
  保留当前 skeleton 的左右语义对齐、hairline 中缝和推荐侧提权。
- `diagonal-split`：斜向切分。适合强烈转向、抛弃旧法、从混乱切到清晰的对比。斜切只是分割方式，
  不能把内容做成自由漂浮标签。
- `top-bottom-split`：上下对照。适合过程前后、输入输出、修改前后或时间顺序更强的状态变化。
  上下两组仍要语义对齐，结果侧或 after 侧必须稳定提权。
- `asymmetric-35-65`：推荐侧占 65%，旧侧降权为窄栏。适合结论明显偏向一侧的选择建议。窄栏只保留
  必要旧状态，不为了填满而添加负面点。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 左右两侧的对比项数量可以不对称；只保留真实差异和推荐点，不要为了形成三行列表而补无来源的优缺点。
- 如果对比最终落在一句 verdict / conclusion 上，verdict 中的关键差异词必须作为同级或更高层级 accent，
  不要因为包在 inline span 中继承到更小字号。
- `cs-pick` / badge 文案必须来自 `visibleContent`、`screenShouldShow` 或明确语义；纯装饰标签直接删除。

## Motion Direction

适合左右对比、问题/解法、旧方案/新方案和 before/after。

动作组合：

- 分割线、差异轴或遮罩先出现。
- 左右两侧从相反方向进入。
- 可比较项按行对齐出现。
- 推荐侧、解法侧或关键差异使用 accent 确认，旧侧可降权。
- 必要时让旧侧轻微降权，新侧稳定保留。

节奏特点：对照关系必须清楚，左右内容不要同时糊成一团。

## Design Intent

画面上方是 kicker 和大标题，下方左右两栏从同一中缝展开。左侧通常是 before / less preferred，
用低权重文字和减号 marker；右侧是 after / recommended，用橙色 tag、推荐 badge 和更亮正文。
版式像杂志专栏对照，而不是 UI 双框对比。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad cs-layout">
    <span class="ed-ghost-type cs-ghost" data-anim="ghost">Versus</span>
    <div class="cs-head">
      <span class="ed-kicker label-mono cs-kicker" data-anim="kicker">COMPARISON</span>
      <h1 class="serif-cn cs-title" data-anim="headline"><!-- headline --></h1>
    </div>
    <div class="cs-cols" data-anim="split">
      <div class="cs-col cs-left" data-anim="left">
        <span class="label-mono cs-tag">BEFORE</span>
        <h2>旧方案标题</h2>
        <ul>
          <!-- Render only real left comparison points from visibleContent. Do not pad to three. -->
          <li><span>-</span><strong><!-- leftItems[0].text --></strong></li>
          <li><span>-</span><strong><!-- leftItems[1].text --></strong></li>
        </ul>
      </div>
      <div class="cs-col cs-right" data-anim="right">
        <!-- Optional: render only if the scene-plan explicitly contains a recommendation / winner / critical label. -->
        <span class="label-mono cs-pick" data-anim="pick"><!-- optionalBadge --></span>
        <span class="label-mono cs-tag">AFTER</span>
        <h2>新方案标题</h2>
        <ul>
          <!-- Render only real right recommendation points from visibleContent. Do not pad to three. -->
          <li><span>+</span><strong><!-- rightItems[0].text --></strong></li>
          <li><span>+</span><strong><!-- rightItems[1].text --></strong></li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .cs-layout {
  position: relative;
  justify-content: space-between;
}
#scene_xxx .cs-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .cs-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .cs-title {
  margin: 0;
  font-size: 74px;
  line-height: 1.05;
}
#scene_xxx .cs-cols {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 56px;
}
#scene_xxx .cs-col {
  display: flex;
  flex-direction: column;
  padding-top: 14px;
}
#scene_xxx .cs-left {
  padding-right: 80px;
}
#scene_xxx .cs-right {
  position: relative;
  padding-left: 80px;
  border-left: var(--rule-w) var(--rule-style) var(--rule);
}
#scene_xxx .cs-tag {
  margin-bottom: 24px;
  color: var(--text-mute);
  font-size: 18px;
  letter-spacing: 0.24em;
}
#scene_xxx .cs-col h2 {
  margin: 0 0 36px;
  font-family: var(--font-display-cn);
  font-size: 54px;
  line-height: 1.08;
  color: var(--text-2);
}
#scene_xxx .cs-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 26px;
}
#scene_xxx .cs-col li {
  display: flex;
  gap: 20px;
  color: var(--text-mute);
  font-size: 25px;
  line-height: 1.45;
}
#scene_xxx .cs-col li span {
  width: 22px;
  flex: none;
  color: var(--rule);
  font-family: var(--font-mono);
  font-size: 28px;
}
#scene_xxx .cs-right .cs-tag,
#scene_xxx .cs-right li span {
  color: var(--accent);
}
#scene_xxx .cs-right .cs-tag::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 14px;
}
#scene_xxx .cs-right h2,
#scene_xxx .cs-right li {
  color: var(--text);
}
#scene_xxx .cs-pick {
  position: absolute;
  top: 0;
  right: 0;
  color: var(--accent);
  border: var(--rule-w) var(--rule-style) var(--accent);
  border-radius: 999px;
  padding: 7px 16px;
  font-size: 15px;
}
#scene_xxx .cs-verdict .ed-accent,
#scene_xxx .cs-col p .ed-accent {
  font-size: 1.08em;
}
#scene_xxx .cs-ghost {
  left: 50%;
  bottom: 3%;
  transform: translateX(-50%);
  font-size: 200px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `split`, `left`, `right`, `pick`（optional）。

## Do Not Change

不要添加左右大矩形背景；不要把对比点做成卡片；不要让中央差异词取代左右内容结构；
不要添加无来源的 `CONCLUSION` / `RECOMMENDED` 小 tag；不要让 verdict 的 accent 词比正文更小。
