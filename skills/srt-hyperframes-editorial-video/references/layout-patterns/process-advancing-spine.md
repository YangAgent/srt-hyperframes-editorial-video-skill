# process-advancing-spine

family: `process`

适用：工作流、流水线、步骤、系统链路和有顺序的因果链。

## Layout Contract

- prototype 中的步骤、刻度和结果说明数量只是示例；按真实流程增减，但保持连续推进的 spine / rail。
- 流程必须是一条连续推进的 spine / rail，步骤是刻度，结果是终点。
- 步骤说明贴靠刻度，不使用节点卡片阵列。
- accent 只落在推进轨道终点、当前节点或结果节点。
- 禁止三块 stage band、均分大盒子、卡片流程图和自由箭头。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 process family 内 spine / rail 的推进形态；
步骤、当前节点和结果必须来自真实流程。

- `horizontal-spine`：默认横向连续流程轴。适合 3-5 步顺序清楚的工作流或系统链路。
  步骤贴靠刻度，不做卡片阵列。
- `stepped-rail`：阶梯式推进轨道。适合阶段逐步升级、层层加工或状态逐级完成。
  阶梯高度必须表达真实阶段推进。
- `endpoint-emphasis`：终点结果放大，前序步骤作为弱态轨道。适合字幕重点落在最终产出或结果节点时。
  前序步骤只做路径上下文。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 步骤、轨道刻度和结果节点按真实流程数量生成；示例中的 3、4、5 步不是要求，少步骤时让当前步骤或结果节点占据主视觉。

## Motion Direction

适合流程、步骤、因果链和系统结构。

动作组合：

- 节点按顺序 cascade 出现。
- 进度轨道、阶段轴或编号序列跟随节点推进。
- active 或结果节点变成 accent 并保持为当前状态。
- ghost type、细线或背景文字轻微漂移。

节奏特点：让观众看见“关系被建立”，不是只看见元素出现。

## Design Intent

一条横向连续进程轴贯穿画面下半部，步骤是细小刻度点和说明文字，最终结果点更大并带橙色光晕。
上方大标题保留杂志感，流程区不靠大边框，而靠同一条轨道把动作串起来。步骤与终点说明按内容的
真实流程数量生成；重点不是凑满示例刻度，而是保持同一条连续 spine 的推进感。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad pb-layout">
    <span class="ed-ghost-type pb-ghost" data-anim="ghost"><!-- ghostWord --></span>
    <div class="pb-head">
      <span class="ed-kicker label-mono pb-kicker" data-anim="kicker">PROCESS</span>
      <h1 class="serif-cn pb-title" data-anim="headline"><!-- headline --></h1>
    </div>
    <div class="pb-rail" data-anim="rail-group">
      <div class="pb-track" data-anim="rail"></div>
      <div class="pb-track-fill" data-anim="rail-fill"></div>
      <div class="pb-steps" style="--pb-step-count: var(--step-count);">
        <!-- Render only real steps from visibleContent. Do not pad to four. -->
        <div class="pb-step" data-anim="step">
          <span class="pb-node"></span><div class="label-mono pb-idx">STEP <!-- stepItems[0].index --></div><h3><!-- stepItems[0].text --></h3><p><!-- stepItems[0].note --></p>
        </div>
        <div class="pb-step pb-result" data-anim="result">
          <span class="pb-node"></span><div class="label-mono pb-idx"><!-- result.indexLabel --></div><h3><!-- result.text --></h3><p><!-- result.note --></p>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .pb-layout {
  position: relative;
  justify-content: space-between;
}
#scene_xxx .pb-head {
  margin-bottom: 70px;
}
#scene_xxx .pb-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 30px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .pb-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .pb-title {
  margin: 0;
  font-size: 80px;
  line-height: 1.04;
}
#scene_xxx .pb-rail {
  position: relative;
  margin-top: auto;
  margin-bottom: 80px;
}
#scene_xxx .pb-track,
#scene_xxx .pb-track-fill {
  position: absolute;
  left: 0;
  top: 22px;
  height: 2px;
}
#scene_xxx .pb-track {
  right: 0;
  background: var(--rule);
}
#scene_xxx .pb-track-fill {
  width: 78%;
  background: linear-gradient(90deg, var(--rule) 0%, var(--accent) 100%);
}
#scene_xxx .pb-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--pb-step-count, 4), 1fr) 1.15fr;
}
#scene_xxx .pb-step {
  position: relative;
  padding-right: 56px;
}
#scene_xxx .pb-node {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--shell);
  border: 2px solid var(--text-2);
}
#scene_xxx .pb-idx {
  margin: 38px 0 16px;
  color: var(--text-mute);
  font-size: 17px;
  letter-spacing: 0.22em;
}
#scene_xxx .pb-step h3 {
  margin: 0 0 14px;
  font-family: var(--font-display-cn);
  font-size: var(--type-callout);
  line-height: 1.1;
}
#scene_xxx .pb-step p {
  margin: 0;
  max-width: 22ch;
  color: var(--text-mute);
  font-size: 21px;
  line-height: 1.55;
}
#scene_xxx .pb-result .pb-node {
  width: 22px;
  height: 22px;
  transform: translateY(-4px);
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 7px var(--accent-soft);
}
#scene_xxx .pb-result .pb-idx {
  color: var(--accent);
}
#scene_xxx .pb-result h3 {
  font-size: 46px;
}
#scene_xxx .pb-ghost {
  right: 5%;
  top: 6%;
  font-size: 210px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `rail-group`, `rail`, `rail-fill`, `step`, `result`.

## Do Not Change

不要使用盒子做步骤；不要把结果放到底部 caption；不要把流程拆成三块大色带。
