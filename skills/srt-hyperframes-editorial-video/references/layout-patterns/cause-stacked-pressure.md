# cause-stacked-pressure

family: `cause`

适用：原因、阻力、后果、反馈环、分支影响或“为什么会这样”的解释。

## Layout Contract

- prototype 中的 cause、pressure、result 数量只是示例；按真实内容增减，但保持压力到结果的视觉框架。
- 因果必须呈现为压力带 → 阻断点 → 结果区的方向结构。
- cause 是 stacked pressure band，blocker 是圆形 chokepoint，effect 是编辑式结果区。
- accent 只落在最强 cause、chokepoint 或结果关键词。
- 禁止三栏等权大盒子、两个卡片加箭头、无标签色块、底部说明。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 cause family 内多重压力如何叠加和压出结果；
压力项与结果必须来自真实内容。

- `stacked-bands`：默认多条压力带叠加。适合多个原因共同压出一个结果。
  最强压力或最终结果使用单点 accent。
- `weight-column`：压力项垂直堆叠成重量柱。适合强调负担累积、阻力越来越重。
  柱体不能变成普通列表。
- `pressure-slab`：多个压力被压成一块 slab 指向结果。适合表达复杂原因被整体压缩成后果。
  slab 仍要能读出真实压力来源。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 压力源、原因项、阻断点和结果项按真实因果链生成；原因不足示例数量时，用更大的主压力区或结果区承载重点，不补虚构原因。

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

## Use When

原因不是线性链路，而是多重压力累积；需要表达“问题被层层压出来”，不需要明确连接线。

## Design Intent

左侧压力源层层错位叠加，越靠近结果越强；右侧是单个 result slab。画面没有连接箭头，靠压力场
的位移、权重和 accent cause 推出结果。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ce2-layout">
    <span class="ed-ghost-type ce2-ghost" data-anim="ghost">Weight</span>
    <div class="ce2-wrap">
      <div class="ce2-head">
        <span class="ed-kicker label-mono ce2-kicker" data-anim="kicker">PRESSURE</span>
        <h1 class="serif-cn ce2-title" data-anim="headline">多重压力，压出<span class="ed-accent">同一个结果</span></h1>
      </div>
      <div class="ce2-chain" data-anim="chain">
        <div class="ce2-pressure" data-anim="pressure">
          <div class="ce2-source" data-anim="source"><span class="idx">01</span><h3>压力一</h3><p>短说明</p></div>
          <div class="ce2-source" data-anim="source"><span class="idx">02</span><h3>压力二</h3><p>短说明</p></div>
          <div class="ce2-source is-accent" data-anim="source-accent"><span class="idx">03</span><h3>关键压力</h3><p>短说明</p></div>
        </div>
        <div class="ce2-result" data-anim="effect"><div class="serif-cn rh">结果主句，<br><span class="ed-accent">关键词</span></div></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ce2-layout { position: relative; }
#scene_xxx .ce2-wrap { height: 100%; display: flex; flex-direction: column; }
#scene_xxx .ce2-head { max-width: 980px; margin-bottom: 42px; }
#scene_xxx .ce2-kicker { margin-bottom: 28px; }
#scene_xxx .ce2-title { margin: 0; font-size: 76px; line-height: 1.06; }
#scene_xxx .ce2-chain { flex: 1; position: relative; display: grid; grid-template-columns: 1fr 420px; gap: 68px; align-items: stretch; }
#scene_xxx .ce2-pressure { position: relative; padding-top: 8px; display: flex; flex-direction: column; justify-content: center; gap: 18px; }
#scene_xxx .ce2-source { position: relative; min-height: 112px; padding: 22px 34px; background: var(--surface-2); border-left: 4px solid var(--rule); }
#scene_xxx .ce2-source:nth-child(2) { margin-left: 70px; opacity: 0.9; }
#scene_xxx .ce2-source:nth-child(3),
#scene_xxx .ce2-source.is-accent { margin-left: 140px; border-left-color: var(--accent); background: var(--accent-soft); }
#scene_xxx .ce2-source .idx { position: absolute; right: 26px; top: 20px; font-family: var(--font-display-en); font-size: 70px; line-height: 0.8; color: var(--text-faint); }
#scene_xxx .ce2-source h3 { margin: 0 0 10px; font-family: var(--font-display-cn); font-size: 36px; color: var(--text-2); letter-spacing: 0.03em; }
#scene_xxx .ce2-source p { margin: 0; max-width: 30ch; font-size: 20px; line-height: 1.45; color: var(--text-mute); }
#scene_xxx .ce2-result { position: relative; align-self: center; padding: 66px 48px 54px; background: var(--surface); border-top: var(--rule-w) var(--rule-style) var(--rule); border-bottom: 2px solid var(--accent); box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45); overflow: hidden; }
#scene_xxx .ce2-result::before { content: ""; position: absolute; left: 48px; top: 34px; width: 9px; height: 9px; border-radius: 50%; background: var(--accent); }
#scene_xxx .ce2-result .rh { font-size: 58px; line-height: 1.12; color: var(--text); letter-spacing: 0.03em; }
#scene_xxx .ce2-ghost { right: 60px; top: 58px; font-size: 188px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `chain`, `pressure`, `source`, `source-accent`, `effect`.

## Do Not Change

不要加连接箭头；不要把压力源做成等宽列表；不要让结果 slab 变成普通右侧说明框。
