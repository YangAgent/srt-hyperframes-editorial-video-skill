# process-descending-construction

family: `process`

适用：工作流、流水线、步骤、系统链路和有顺序的因果链。

## Layout Contract

- prototype 中的步骤、刻度和结果说明数量只是示例；按真实流程增减，但保持连续推进的 spine / rail。
- 流程必须是一条连续推进的 spine / rail，步骤是刻度，结果是终点。
- 步骤说明贴靠刻度，不使用节点卡片阵列。
- accent 只落在推进轨道终点、当前节点或结果节点。
- 禁止三块 stage band、均分大盒子、卡片流程图和自由箭头。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 process family 内下降、加工和构建路径；
步骤和结果必须来自真实流程。

- `diagonal-drop`：默认斜向下降路径。适合任务一路被加工、筛选或转译成结果。
  斜向路径必须保持连续。
- `cascade-build`：瀑布式层层落位。适合多个输入或步骤逐层累积成最终结果。
  每层只承载真实步骤或状态。
- `layered-descent`：分层向下构建。适合从上游材料、能力层到输出层的顺序关系。
  不扩展成 concept-sectional-layer 的剖面模型。

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

## Use When

流程有逐步构建、一路落地、最终成品形成的感觉；重点不是每一步平等展示，而是结果如何被加工出来。

## Design Intent

标题停在左上，右侧是一条斜向下落的构建路径。步骤作为 editorial ticks 贴在线路附近，最终结果
位于右下并被 accent 点亮。路径比标准步骤轴更有运动感，但仍是一条连续流程。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad pb2-layout">
    <span class="ed-ghost-type pb2-ghost" data-anim="ghost">Route</span>
    <div class="pb2-wrap">
      <div class="pb2-head">
        <span class="ed-kicker label-mono pb2-kicker" data-anim="kicker">PROCESS</span>
        <h1 class="serif-cn pb2-title" data-anim="headline"><!-- headline --></h1>
      </div>
      <div class="pb2-map" data-anim="map">
        <svg class="ed-svg-layer pb2-svg" viewBox="0 0 1040 760" aria-hidden="true">
          <path class="pb2-path" data-anim="path" pathLength="1" d="M130,80 C310,100 330,210 470,250 C650,300 605,430 760,480" />
          <path class="pb2-path-accent" data-anim="path-accent" pathLength="1" d="M760,480 C850,515 900,595 930,660" />
        </svg>
        <!-- Render only real construction steps from visibleContent. Do not pad to three. -->
        <div class="pb2-step" data-anim="step" style="left:13%; top:11%;"><div class="pb2-node"></div><div class="label-mono idx">STEP <!-- stepItems[0].index --></div><h3><!-- stepItems[0].text --></h3><p><!-- stepItems[0].note --></p></div>
        <div class="pb2-step" data-anim="step" style="left:70%; top:63%;"><div class="pb2-node"></div><div class="label-mono idx">STEP <!-- stepItems[1].index --></div><h3><!-- stepItems[1].text --></h3><p><!-- stepItems[1].note --></p></div>
        <div class="pb2-step pb2-result" data-anim="result" style="left:89%; top:89%;"><div class="pb2-node"></div><div class="label-mono idx"><!-- result.indexLabel --></div><h3><!-- result.text --></h3><p><!-- result.note --></p></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .pb2-layout { position: relative; }
#scene_xxx .pb2-wrap { position: relative; height: 100%; }
#scene_xxx .pb2-head { max-width: 780px; }
#scene_xxx .pb2-kicker { margin-bottom: 28px; }
#scene_xxx .pb2-title { margin: 0; font-size: 78px; line-height: 1.06; }
#scene_xxx .pb2-map { position: absolute; inset: 160px 0 20px 520px; }
#scene_xxx .pb2-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
#scene_xxx .pb2-path { fill: none; stroke: var(--rule); stroke-width: 2; }
#scene_xxx .pb2-path-accent { fill: none; stroke: var(--accent); stroke-width: 3; }
#scene_xxx .pb2-step { position: absolute; transform: translate(-50%, -50%); width: 280px; }
#scene_xxx .pb2-node { width: 14px; height: 14px; border-radius: 50%; background: var(--shell); border: 2px solid var(--text-2); margin-bottom: 18px; }
#scene_xxx .pb2-step .idx { font-size: 16px; letter-spacing: 0.2em; color: var(--text-mute); margin-bottom: 12px; }
#scene_xxx .pb2-step h3 { margin: 0 0 10px; font-family: var(--font-display-cn); font-size: 36px; color: var(--text); letter-spacing: 0.03em; }
#scene_xxx .pb2-step p { margin: 0; font-size: 20px; line-height: 1.48; color: var(--text-mute); }
#scene_xxx .pb2-result { width: 380px; }
#scene_xxx .pb2-result .pb2-node { width: 24px; height: 24px; background: var(--accent); border-color: var(--accent); box-shadow: 0 0 0 8px var(--accent-soft); }
#scene_xxx .pb2-result .idx { color: var(--accent); }
#scene_xxx .pb2-result h3 { font-size: 50px; }
#scene_xxx .pb2-result p { color: var(--text-2); font-size: 23px; }
#scene_xxx .pb2-ghost { right: 58px; top: 58px; font-size: 200px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `map`, `path`, `path-accent`, `step`, `result`.

## Do Not Change

不要把斜向路径改回水平轴；不要用卡片承载步骤；不要让结果离开路径终点。
