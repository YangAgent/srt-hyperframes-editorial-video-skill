# transform-fragments-to-block

family: `transform`

适用：旧状态变新状态、问题被压缩成解法、系统重组、模式切换或前后结构变化。

## Layout Contract

- prototype 中的 fragments、状态项和结果说明数量只是示例；按真实变化内容增减，但保持转化结构。
- 旧状态必须是散碎 fragments，新状态必须是聚合后的 consolidated block。
- 中间 seam 表达压缩、重组或转译动作。
- accent 只落在转换动作、after block 边框或新状态关键词。
- 禁止旧列表 + 右侧大空框；禁止 before/after 两个等权大盒子。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 transform family 内碎片如何变成稳定结果；
before fragments、转换动作和 after block 必须来自真实内容。

- `scattered-to-block`：默认散碎 fragments → consolidated block。适合从混乱、碎片到结构化结果。
  fragments 数量按真实内容增减。
- `split-before-after`：左右 before / after 清晰分区，中间 seam 表达转换。适合前后状态都需要阅读时。
  不退化为普通 compare 卡片。
- `funnel-compress`：碎片通过漏斗或压缩区收拢成结果块。适合强调筛选、归并或压缩动作。
  漏斗只服务真实转换。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- before/after 碎片、状态块和结果对象按真实状态变化生成；碎片不足时强化转化动作，不补无来源碎片。

## Motion Direction

适合旧状态变新状态、结构重组、问题压缩成解法和模式切换。

动作组合：

- before state 先建立。
- 噪声项、阻力项或旧结构被压缩、淡出、收拢或移位。
- after state 的结构重排、展开或聚焦。
- 最终结果节点或新秩序用 accent 稳定强调。

节奏特点：观众应该看到“变化发生了”，不是只看到 before/after 硬切。

## Design Intent

上方是标题组，下方三栏：左侧 before 是一堆轻微错位的碎片标签，中间是垂直转换缝和橙色箭头，
右侧 after 是一个聚合 block。观众看到材料从散乱状态被压缩重组为单一产出。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad tr-layout">
    <span class="ed-ghost-type tr-ghost" data-anim="ghost">Shift</span>
    <div class="tr-head">
      <span class="ed-kicker label-mono tr-kicker" data-anim="kicker">TRANSFORM</span>
      <h1 class="serif-cn tr-title" data-anim="headline"><!-- headline --></h1>
    </div>
    <div class="tr-stage" data-anim="stage">
      <div class="tr-state tr-old" data-anim="before">
        <div class="label-mono tr-state-k">BEFORE</div>
        <div class="tr-frags">
          <!-- Render only real fragments from visibleContent. Do not pad to four. -->
          <span data-anim="fragment"><!-- fragments[0].text --></span><span data-anim="fragment"><!-- fragments[1].text --></span>
        </div>
        <div class="serif-cn tr-caption"><!-- before.caption --></div>
      </div>
      <div class="tr-seam" data-anim="seam">
        <span class="label-mono">COMPRESS</span><i></i><b>-></b><i></i><span class="label-mono">REBUILD</span>
      </div>
      <div class="tr-state tr-new" data-anim="after">
        <div class="label-mono tr-state-k">AFTER</div>
        <div class="tr-block" data-anim="result-block">
          <div class="serif-cn tr-block-title"><!-- after.title --></div>
          <p><!-- after.note --></p>
        </div>
        <div class="serif-cn tr-caption"><!-- after.caption with accent --></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .tr-layout {
  position: relative;
  justify-content: space-between;
}
#scene_xxx .tr-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .tr-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .tr-title {
  margin: 0;
  font-size: 76px;
  line-height: 1.05;
}
#scene_xxx .tr-stage {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  align-items: center;
}
#scene_xxx .tr-state-k {
  margin-bottom: 26px;
  color: var(--text-mute);
  font-size: 18px;
}
#scene_xxx .tr-frags {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  max-width: 560px;
}
#scene_xxx .tr-frags span {
  padding: 16px 22px;
  background: var(--surface);
  border: var(--rule-w) var(--rule-style) var(--rule);
  border-radius: var(--r-sm);
  color: var(--text-mute);
  font-size: 21px;
  transform: rotate(var(--r, 0deg));
}
#scene_xxx .tr-frags span:nth-child(2) { --r: -2deg; }
#scene_xxx .tr-frags span:nth-child(3) { --r: 1.5deg; }
#scene_xxx .tr-frags span:nth-child(4) { --r: -1.5deg; }
#scene_xxx .tr-caption {
  margin-top: 30px;
  font-size: 34px;
  color: var(--text-2);
}
#scene_xxx .tr-seam {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
#scene_xxx .tr-seam i {
  width: 1px;
  height: 120px;
  background: linear-gradient(var(--rule), var(--accent), var(--rule));
}
#scene_xxx .tr-seam b {
  color: var(--accent);
  font-family: var(--font-display-en);
  font-size: var(--type-result);
  font-weight: 400;
  line-height: 1;
}
#scene_xxx .tr-new {
  padding-left: 70px;
  border-left: var(--rule-w) var(--rule-style) var(--rule);
}
#scene_xxx .tr-block {
  padding: 44px 48px;
  background: radial-gradient(130% 120% at 30% 20%, var(--surface-2), var(--surface));
  border: var(--rule-w) var(--rule-style) var(--accent);
  border-radius: var(--r-sm);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
}
#scene_xxx .tr-block-title {
  font-size: 52px;
  line-height: 1.12;
}
#scene_xxx .tr-block p {
  margin: 22px 0 0;
  color: var(--text-2);
  font-size: 22px;
  line-height: 1.55;
}
#scene_xxx .tr-ghost {
  left: 50%;
  bottom: 2%;
  transform: translateX(-50%);
  font-size: 170px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `stage`, `before`, `fragment`, `seam`, `after`, `result-block`.

## Do Not Change

不要把 before/after 做成两个等权大矩形；不要让旧状态只是普通列表；不要把 result label 放到底部。
