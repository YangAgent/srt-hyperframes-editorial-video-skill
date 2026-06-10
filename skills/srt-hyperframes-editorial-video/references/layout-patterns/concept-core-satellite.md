# concept-core-satellite

family: `concept`

适用：解释概念由哪些部分组成，或展示概念之间的关系、分组和层级。

## Layout Contract

- prototype 中的节点、层级和说明数量只是示例；按真实概念结构增减，但保持模型的核心组织方式。
- 中心概念是主视觉，卫星节点围绕它组织。
- 左侧文字组负责解释模型，右侧 diagram 负责关系结构。
- 允许 SVG 连接线，但必须稳定连接中心与卫星，不画自由散点。
- 禁止 taxonomy 卡片板、层叠盒子、中心大矩形加四角节点。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 concept family 内的模型组织方式；核心概念、
卫星节点和层级内容仍只能来自 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。

- `left-copy-orbit`：默认左文案、右核心卫星图。适合需要标题解释模型，diagram 承载关系结构的场景。
  保留当前 skeleton 的左侧 copy、右侧 core + satellites 和轻量连接关系。
- `center-orbit`：核心居中，卫星围绕四周。适合核心概念非常明确、外围项数量适中的解释模型。
  不要补足四周节点；节点少时扩大核心并减少连线。
- `layered-rings`：核心 + 多层环形结构。适合层级能力、内外圈机制或从核心向外扩展的概念。
  环层必须表示真实层级或分组，不能只做装饰圆环。
- `side-stack-core`：一侧核心，另一侧卫星纵向堆叠。适合少量模块、能力清单或核心概念与 2-3 个
  关联项的关系。堆叠项必须贴靠核心方向，不做普通卡片列表。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 中心概念、卫星节点和层级数量按真实概念结构生成；如果只有核心概念和少量关联项，减少节点并放大核心，不补模块。

## Motion Direction

适合概念图、模块关系、层级结构、证据版面和图形化信息组织。

动作组合：

- 分区、括号或容器先建立。
- 节点、模块或标签按结构区域依次落位。
- 分组边界、括号、编号或区域标签补上关系。
- 当前重点模块使用 accent 或轻微 scale 进入稳定焦点。

节奏特点：像编辑版面和解释图被组装起来，强调秩序。

## Design Intent

左侧是 kicker、标题和 note；右侧大面积 diagram 中央放圆形 core，四周是卫星能力组，通过细
SVG 线与核心连接。关系结构轻而明确，accent 集中在核心或少量卫星 marker。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad cd-layout">
    <span class="ed-ghost-type cd-ghost" data-anim="ghost">Model</span>
    <div class="cd-copy">
      <span class="ed-kicker label-mono cd-kicker" data-anim="kicker">CONCEPT MAP</span>
      <h1 class="serif-cn cd-title" data-anim="headline"><!-- headline --></h1>
      <p class="ed-subline cd-note" data-anim="note"><!-- subline --></p>
    </div>
    <div class="cd-stage" data-anim="diagram">
      <svg class="ed-svg-layer cd-svg" viewBox="0 0 700 760" aria-hidden="true">
        <line class="cd-link" data-anim="link" x1="350" y1="380" x2="190" y2="150" />
        <line class="cd-link" data-anim="link" x1="350" y1="380" x2="540" y2="170" />
        <line class="cd-link" data-anim="link" x1="350" y1="380" x2="170" y2="600" />
        <line class="cd-link" data-anim="link" x1="350" y1="380" x2="540" y2="610" />
      </svg>
      <div class="cd-node cd-core-node" data-anim="core" style="left:50%; top:50%;">
        <div class="cd-core"><span class="label-mono"><!-- core.kicker --></span><span class="serif-cn"><!-- core.text --></span></div>
      </div>
      <!-- Render only real satellite nodes from visibleContent. Do not pad to four. -->
      <div class="cd-node cd-sat" data-anim="satellite" style="left:27%; top:20%;"><span></span><h3><!-- satellites[0].text --></h3><p><!-- satellites[0].note --></p></div>
      <div class="cd-node cd-sat" data-anim="satellite" style="left:77%; top:80%;"><span></span><h3><!-- satellites[1].text --></h3><p><!-- satellites[1].note --></p></div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .cd-layout {
  position: relative;
  display: grid;
  grid-template-columns: 0.78fr 1.22fr;
  gap: 70px;
  align-items: center;
}
#scene_xxx .cd-copy {
  align-self: stretch;
  display: flex;
  flex-direction: column;
}
#scene_xxx .cd-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 30px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .cd-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .cd-title {
  margin: 0;
  font-size: 72px;
  line-height: 1.06;
}
#scene_xxx .cd-note {
  margin-top: 36px;
  max-width: 24ch;
  font-size: 23px;
  line-height: 1.6;
}
#scene_xxx .cd-stage {
  position: relative;
  height: 760px;
}
#scene_xxx .cd-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
#scene_xxx .cd-link {
  stroke: var(--rule);
  stroke-width: 1.5;
}
#scene_xxx .cd-node {
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
}
#scene_xxx .cd-core {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  display: grid;
  place-content: center;
  gap: 6px;
  background: radial-gradient(120% 120% at 50% 30%, var(--surface-2), var(--surface));
  border: var(--rule-w) var(--rule-style) var(--rule);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
}
#scene_xxx .cd-core .label-mono {
  color: var(--accent);
  font-size: 15px;
  letter-spacing: 0.24em;
}
#scene_xxx .cd-core .serif-cn {
  font-size: 48px;
  line-height: 1.1;
}
#scene_xxx .cd-sat span {
  display: block;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--accent);
  margin: 0 auto 14px;
  box-shadow: 0 0 0 6px var(--accent-soft);
}
#scene_xxx .cd-sat h3 {
  margin: 0 0 8px;
  font-family: var(--font-display-cn);
  font-size: var(--type-body-min);
}
#scene_xxx .cd-sat p {
  max-width: 18ch;
  margin: 0;
  color: var(--text-mute);
  font-size: 18px;
  line-height: 1.5;
}
#scene_xxx .cd-ghost {
  right: 4%;
  bottom: 3%;
  font-size: 180px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `note`, `diagram`, `link`, `core`, `satellite`.

## Do Not Change

不要把卫星节点放进卡片；不要让中心概念变成矩形；不要增加无语义的自由连线。
