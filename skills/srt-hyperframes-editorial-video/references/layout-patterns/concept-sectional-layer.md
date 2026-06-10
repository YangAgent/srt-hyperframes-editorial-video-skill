# concept-sectional-layer

family: `concept`

适用：解释概念由哪些部分组成，或展示概念之间的关系、分组和层级。

## Layout Contract

- prototype 中的节点、层级和说明数量只是示例；按真实概念结构增减，但保持模型的核心组织方式。
- 中心概念是主视觉，卫星节点围绕它组织。
- 左侧文字组负责解释模型，右侧 diagram 负责关系结构。
- 允许 SVG 连接线，但必须稳定连接中心与卫星，不画自由散点。
- 禁止 taxonomy 卡片板、层叠盒子、中心大矩形加四角节点。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 concept family 内剖面、层级和核心关系；
层级与节点必须来自真实概念结构。

- `layered-section`：默认分层剖面。适合输入层、能力层、核心层、输出层等清楚层级。
  层数按真实内容增减。
- `cutaway-core`：核心被剖开，周围层级贴靠核心。适合解释一个系统内部由哪些层组成。
  cutaway 不能变成普通卡片堆叠。
- `vertical-strata`：纵向地层式结构。适合从基础到结果、从底层到表层的概念解释。
  当前重点层必须稳定确认。

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

## Use When

内容是输入层、能力层、核心层、输出层，模块不是环绕中心并列，而是由外到内逐层组织。

## Design Intent

左侧解释，右侧是干净的横向分层剖面。三段 strata 由一条左侧竖轴串起，每一层是完整横向行：
大编号、英文层名、中文层标题和一条短说明。核心层不是嵌套在盒子里，而是作为最后一行被
accent 背景和编号提权。它表达系统从输入、能力到内核的层级组织，而不是卫星节点关系。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad cd2-layout">
    <span class="ed-ghost-type cd2-ghost" data-anim="ghost">Layers</span>
    <div class="cd2-left">
      <span class="ed-kicker label-mono cd2-kicker" data-anim="kicker">SECTION MAP</span>
      <h1 class="serif-cn cd2-title" data-anim="headline">三层结构，托住<span class="ed-accent">流程内核</span></h1>
      <p class="ed-subline cd2-note" data-anim="note">贴靠标题的层级解释。</p>
    </div>
    <div class="cd2-stack" data-anim="stack">
      <span class="cd2-axis" data-anim="axis"></span>
      <div class="cd2-strata">
        <div class="cd2-row" data-anim="layer">
          <div class="no num-mono">01</div>
          <div><div class="k label-mono">Input Layer</div><div class="t">脚本、素材与品牌规则</div><div class="p">原始材料先被收进同一上下文。</div></div>
        </div>
        <div class="cd2-row" data-anim="layer">
          <div class="no num-mono">02</div>
          <div><div class="k label-mono">Capability Layer</div><div class="t">分镜、配音、字幕与渲染</div><div class="p">能力被同一流程顺序调用。</div></div>
        </div>
        <div class="cd2-row core" data-anim="core">
          <div class="no num-mono">03</div>
          <div><div class="k label-mono">Core Layer</div><div class="t">流程内核</div><div class="p">节奏、上下文和输出标准在这里统一。</div></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .cd2-layout { position: relative; display: grid; grid-template-columns: 0.68fr 1.32fr; gap: 74px; align-items: center; }
#scene_xxx .cd2-left { align-self: stretch; display: flex; flex-direction: column; }
#scene_xxx .cd2-kicker { margin-bottom: 30px; }
#scene_xxx .cd2-title { margin: 0; font-size: 72px; line-height: 1.07; }
#scene_xxx .cd2-note { margin-top: 36px; max-width: 25ch; font-size: 24px; line-height: 1.6; }
#scene_xxx .cd2-stack { position: relative; height: 690px; display: flex; flex-direction: column; justify-content: center; }
#scene_xxx .cd2-axis { position: absolute; left: 0; top: 80px; bottom: 80px; width: 1px; background: var(--rule); }
#scene_xxx .cd2-axis::before,
#scene_xxx .cd2-axis::after { content: ""; position: absolute; left: -6px; width: 13px; height: 13px; border-radius: 50%; background: var(--shell); border: 2px solid var(--rule); }
#scene_xxx .cd2-axis::before { top: 0; }
#scene_xxx .cd2-axis::after { bottom: 0; border-color: var(--accent); background: var(--accent); box-shadow: 0 0 0 7px var(--accent-soft); }
#scene_xxx .cd2-strata { margin-left: 58px; border-top: var(--rule-w) var(--rule-style) var(--rule); border-bottom: var(--rule-w) var(--rule-style) var(--rule); }
#scene_xxx .cd2-row { min-height: 150px; display: grid; grid-template-columns: 170px 1fr; gap: 42px; align-items: center; border-bottom: var(--rule-w) var(--rule-style) var(--rule); padding: 30px 0; }
#scene_xxx .cd2-row:last-child { border-bottom: 0; }
#scene_xxx .cd2-row .no { font-family: var(--font-display-en); font-size: 92px; line-height: 0.8; letter-spacing: -0.04em; color: var(--text); opacity: 0.92; }
#scene_xxx .cd2-row .k { font-size: 16px; letter-spacing: 0.22em; color: var(--text-mute); margin-bottom: 16px; }
#scene_xxx .cd2-row .t { font-family: var(--font-display-cn); font-size: 42px; letter-spacing: 0.03em; color: var(--text-2); line-height: 1.12; }
#scene_xxx .cd2-row .p { margin-top: 14px; font-size: 20px; line-height: 1.48; color: var(--text-mute); max-width: 42ch; }
#scene_xxx .cd2-row.core { background: linear-gradient(90deg, var(--accent-soft), transparent); }
#scene_xxx .cd2-row.core .no,
#scene_xxx .cd2-row.core .k { color: var(--accent); opacity: 1; }
#scene_xxx .cd2-row.core .t { color: var(--text); font-size: 50px; }
#scene_xxx .cd2-ghost { right: 48px; bottom: 26px; font-size: 170px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `note`, `stack`, `axis`, `layer`, `core`.

## Do Not Change

不要把层级剖面改成卫星节点；不要恢复嵌套盒子或输出大字；不要增加自由连线。
