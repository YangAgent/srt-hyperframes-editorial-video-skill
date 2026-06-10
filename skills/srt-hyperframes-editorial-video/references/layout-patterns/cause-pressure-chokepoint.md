# cause-pressure-chokepoint

family: `cause`

适用：原因、阻力、后果、反馈环、分支影响或“为什么会这样”的解释。

## Layout Contract

- prototype 中的 cause、pressure、result 数量只是示例；按真实内容增减，但保持压力到结果的视觉框架。
- 因果必须呈现为压力带 → 阻断点 → 结果区的方向结构。
- cause 是 stacked pressure band，blocker 是圆形 chokepoint，effect 是编辑式结果区。
- accent 只落在最强 cause、chokepoint 或结果关键词。
- 压力源文字必须可读；可以通过尺寸、边线强弱和位置建立层级，但不要把主要 cause 文案压到
  `var(--text-mute)` 加低 opacity 的双重弱化状态。
- 禁止三栏等权大盒子、两个卡片加箭头、无标签色块、底部说明。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 cause family 内压力、阻断点和结果区的方向；
cause、chokepoint 和 result 必须来自真实内容。

- `left-pressure-right-result`：默认左侧压力带 → 中央阻断点 → 右侧结果区。适合清楚的单向因果。
  保持压力到结果的方向结构。
- `center-chokepoint`：阻断点居中放大，压力从一侧或多侧汇入。适合瓶颈本身是主焦点的解释。
  结果区不能抢走 chokepoint。
- `diagonal-pressure-flow`：斜向压力流穿过阻断点到结果。适合因果带有下坠、失控或被挤压的语义。
  不画自由箭头。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 压力源、原因项、阻断点和结果项按真实因果链生成；原因不足示例数量时，用更大的主压力区或结果区承载重点，不补虚构原因。
- 被 narration 点名的 cause 项，颜色至少使用 `var(--text-2)`；只有辅助说明 `.s` 可以使用
  `var(--text-mute)`。

## Motion Direction

适合因果、关系、依赖和从 A 到 B 的解释。

动作组合：

- cause/source 节点先出现。
- 中间的阶段轨道、影响区域或状态 band 被绘制，方向清楚。
- effect/target 区域跟随阶段推进出现。
- 阻断点、关键阶段或影响区用 marker / accent 确认为当前状态。

节奏特点：让观众看到关系被建立，而不是只看到两个卡片和一个箭头。

结构稳定规则：

- connector、impact path、impact band、timeline rail 这类结构线在语义绘制完成后必须稳定保持。
- 禁止对结构线本体使用 `yoyo`、`repeat`、反向 scale、左右位移或任何会改变端点、长度、方向、
  位置的 ambient 动画。
- 若需要呼吸感，只能作用在 glow、box-shadow、filter、opacity、marker、背景纹理或独立 wrapper 上；
  不要让主线伸缩、漂移或来回移动。
- marker / accent 可以轻微 pulse，但 connector 本体应该像编辑图解一样在确认后稳住。

## Design Intent

左侧多条 cause 像压力带一样层层堆叠，越靠近阻断点权重越高；中间是橙色圆形 seal，表达卡住的
瓶颈；右侧用竖向 hairline 分隔出结果区，放大后果主句和短解释。画面看起来是流向，而不是
三个并排面板。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ce-layout">
    <span class="ed-ghost-type ce-ghost" data-anim="ghost">Cause</span>
    <div class="ce-head">
      <span class="ed-kicker label-mono ce-kicker" data-anim="kicker">CAUSE MAP</span>
      <h1 class="serif-cn ce-title" data-anim="headline">三股阻力，<span class="ed-accent">卡在同一个点</span></h1>
    </div>
    <div class="ce-flow" data-anim="flow">
      <div class="ce-causes" data-anim="causes">
        <div class="ce-cause" data-anim="cause"><div class="t">原因一</div><div class="s">短说明</div></div>
        <div class="ce-cause" data-anim="cause"><div class="t">原因二</div><div class="s">短说明</div></div>
        <div class="ce-cause is-strong" data-anim="cause"><div class="t">关键原因</div><div class="s">短说明</div></div>
      </div>
      <div class="ce-block" data-anim="blocker">
        <span class="ce-arrow">-></span>
        <div class="ce-seal">阻断</div>
        <span class="label-mono ce-label">CHOKEPOINT</span>
      </div>
      <div class="ce-result" data-anim="effect">
        <div class="label-mono ce-result-k">RESULT</div>
        <div class="serif-cn ce-result-h">结果主句</div>
        <p>贴靠结果区的解释句。</p>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ce-layout {
  position: relative;
  justify-content: space-between;
}
#scene_xxx .ce-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .ce-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .ce-title {
  margin: 0;
  font-size: 74px;
  line-height: 1.05;
}
#scene_xxx .ce-flow {
  flex: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.5fr 1.1fr;
  align-items: center;
}
#scene_xxx .ce-causes {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
#scene_xxx .ce-cause {
  position: relative;
  padding: 22px 30px;
  background: var(--surface);
  border-left: 3px solid var(--rule);
}
#scene_xxx .ce-cause:nth-child(1) { border-left-color: var(--rule); }
#scene_xxx .ce-cause:nth-child(2) { border-left-color: var(--rule); }
#scene_xxx .ce-cause.is-strong { border-left-color: var(--accent); }
#scene_xxx .ce-cause .t {
  font-family: var(--font-display-cn);
  font-size: 32px;
  color: var(--text-2);
}
#scene_xxx .ce-cause .s {
  margin-top: 8px;
  color: var(--text-mute);
  font-size: 19px;
}
#scene_xxx .ce-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
#scene_xxx .ce-arrow {
  font-family: var(--font-mono);
  font-size: 40px;
  color: var(--accent);
}
#scene_xxx .ce-seal {
  width: 120px;
  height: 120px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: var(--font-display-cn);
  font-size: 30px;
  color: var(--accent);
  box-shadow: 0 0 0 9px var(--accent-soft);
}
#scene_xxx .ce-label {
  color: var(--text-mute);
}
#scene_xxx .ce-result {
  padding-left: 70px;
  border-left: var(--rule-w) var(--rule-style) var(--rule);
}
#scene_xxx .ce-result-k {
  margin-bottom: 22px;
  color: var(--text-mute);
  letter-spacing: 0.2em;
}
#scene_xxx .ce-result-h {
  font-size: 58px;
  line-height: 1.12;
}
#scene_xxx .ce-result p {
  max-width: 26ch;
  margin: 28px 0 0;
  color: var(--text-mute);
  font-size: 23px;
  line-height: 1.55;
}
#scene_xxx .ce-ghost {
  right: 5%;
  top: 6%;
  font-size: 190px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `flow`, `causes`, `cause`, `blocker`, `effect`.

## Do Not Change

不要把 cause、blocker、effect 做成三个同权重矩形；不要画自由箭头；不要让解释句脱离结果区；
不要用低 opacity 让主要 cause 文案不可读。
