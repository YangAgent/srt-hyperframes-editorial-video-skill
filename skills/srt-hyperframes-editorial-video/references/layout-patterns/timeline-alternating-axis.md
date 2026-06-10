# timeline-alternating-axis

family: `timeline`

适用：时间线、阶段推进、版本变化、历史演进和生命周期。

## Layout Contract

- prototype 中的时间点、阶段说明和节奏标记数量只是示例；按真实阶段增减，但保持横向时间轴主结构。
- 横向时间轴是主结构，事件卡片沿轴线上下交错。
- 只允许一个 turning point 使用 accent。
- 年份、版本号或阶段标签若出现，必须贴靠各自节点。
- 禁止做成均分卡片、表格、三段 band 或纵向列表。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 timeline family 内时间轴密度和转折点处理；
时间点、阶段和版本标签必须来自真实内容。

- `alternating-axis`：默认上下交错时间轴。适合多个阶段沿时间推进且每段都有短说明。
  只允许一个主 turning point。
- `compressed-milestones`：压缩里程碑轴。适合时间跨度长、只需要保留关键节点的演进。
  节点数量按真实阶段删减。
- `turning-point-focus`：转折点放大，前后阶段弱化为上下文。适合字幕重点是某个关键变化时。
  accent 停在转折点或其结果标签上。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 时间点、章节项和进度节点按真实阶段数量生成；没有明确时间或章节时，不要补虚构年份、版本、阶段或下一步。

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

画面上方是标题组，下半部是一条横向时间轴。事件说明上下交错，节点和 stem 贴靠同一条轴线；
关键转折点用橙色节点、stem 和版本号强调。右上角 ghost type 补充路径感。时间点按内容的真实
阶段数生成；重点不是凑满示例节点，而是保持上下交错的横向 axis 架构。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad tl-layout">
    <span class="ed-ghost-type tl-ghost" data-anim="ghost">Path</span>
    <div class="tl-head">
      <span class="ed-kicker label-mono tl-kicker" data-anim="kicker">TIMELINE</span>
      <h1 class="serif-cn tl-title" data-anim="headline">从旧阶段，到新阶段</h1>
    </div>
    <div class="tl-strip" data-anim="timeline">
      <div class="tl-axis" data-anim="axis"></div>
      <div class="tl-axis-cap"></div>
      <div class="tl-points" style="--tl-count: 5;">
        <div class="tl-pt up" data-anim="point"><span class="tl-stem"></span><span class="tl-node"></span><div class="tl-entry"><div class="tl-year">v0</div><h3>阶段</h3><p>短说明</p></div></div>
        <div class="tl-pt down" data-anim="point"><span class="tl-stem"></span><span class="tl-node"></span><div class="tl-entry"><div class="tl-year">v1</div><h3>阶段</h3><p>短说明</p></div></div>
        <div class="tl-pt up is-turn" data-anim="turn"><span class="tl-stem"></span><span class="tl-node"></span><div class="tl-entry"><div class="tl-year">v2</div><h3>转折点</h3><p>短说明</p></div></div>
        <div class="tl-pt down" data-anim="point"><span class="tl-stem"></span><span class="tl-node"></span><div class="tl-entry"><div class="tl-year">v3</div><h3>阶段</h3><p>短说明</p></div></div>
        <div class="tl-pt up" data-anim="point"><span class="tl-stem"></span><span class="tl-node"></span><div class="tl-entry"><div class="tl-year">now</div><h3>现在</h3><p>短说明</p></div></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .tl-layout {
  position: relative;
  justify-content: space-between;
}
#scene_xxx .tl-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .tl-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .tl-title {
  margin: 0;
  font-size: 74px;
  line-height: 1.05;
}
#scene_xxx .tl-strip {
  position: relative;
  margin-top: auto;
  height: 520px;
  margin-bottom: 132px;
}
#scene_xxx .tl-axis {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  background: var(--rule);
}
#scene_xxx .tl-axis-cap {
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 14px solid var(--rule);
  transform: translateY(-50%);
}
#scene_xxx .tl-points {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(var(--tl-count, 5), 1fr);
}
#scene_xxx .tl-pt {
  position: relative;
}
#scene_xxx .tl-node {
  position: absolute;
  left: 14%;
  top: 50%;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--shell);
  border: 2px solid var(--text-2);
  transform: translate(-50%, -50%);
}
#scene_xxx .tl-stem {
  position: absolute;
  left: 14%;
  width: 1px;
  background: var(--rule);
}
#scene_xxx .tl-pt.up .tl-stem { bottom: 50%; height: 130px; }
#scene_xxx .tl-pt.down .tl-stem { top: 50%; height: 130px; }
#scene_xxx .tl-entry {
  position: absolute;
  left: 14%;
  width: 280px;
  transform: translateX(-50%);
}
#scene_xxx .tl-pt.up .tl-entry { bottom: calc(50% + 142px); }
#scene_xxx .tl-pt.down .tl-entry { top: calc(50% + 142px); }
#scene_xxx .tl-year {
  font-family: var(--font-display-en);
  font-size: 60px;
  line-height: 0.9;
}
#scene_xxx .tl-entry h3 {
  margin: 16px 0 10px;
  font-family: var(--font-display-cn);
  font-size: 30px;
}
#scene_xxx .tl-entry p {
  margin: 0;
  color: var(--text-mute);
  font-size: 19px;
  line-height: 1.5;
}
#scene_xxx .tl-pt.is-turn .tl-node {
  width: 20px;
  height: 20px;
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 7px var(--accent-soft);
}
#scene_xxx .tl-pt.is-turn .tl-stem { background: var(--accent); opacity: 0.5; }
#scene_xxx .tl-pt.is-turn .tl-year { color: var(--accent); }
#scene_xxx .tl-ghost {
  right: 5%;
  top: 6%;
  font-size: 200px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `timeline`, `axis`, `point`, `turn`.

## Do Not Change

不要把事件做成等权矩形；不要让多个节点同时 accent；不要把时间轴缩成底部小装饰。
