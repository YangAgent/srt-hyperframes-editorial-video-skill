# timeline-compressed-tempo

family: `timeline`

适用：时间线、阶段推进、版本变化、历史演进和生命周期。

## Layout Contract

- prototype 中的时间点、阶段说明和节奏标记数量只是示例；按真实阶段增减，但保持横向时间轴主结构。
- 横向时间轴是主结构，事件卡片沿轴线上下交错。
- 只允许一个 turning point 使用 accent。
- 年份、版本号或阶段标签若出现，必须贴靠各自节点。
- 禁止做成均分卡片、表格、三段 band 或纵向列表。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 timeline family 内时间压缩、等待减少和节奏带；
时间单位、阶段和变化必须来自真实内容。

- `compression-band`：默认压缩时间带。适合表达周期缩短、等待减少或节奏加快。
  压缩前后必须可见。
- `before-after-tempo`：前后两段节奏对照。适合旧流程慢、新流程快或等待时间变化。
  对照仍沿时间轴组织，不变成 compare layout。
- `sprint-lanes`：多条短节奏 lane 并列。适合多个任务流、批次或阶段同时被压缩。
  lane 数量按真实内容增减。

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

## Use When

内容强调效率演进、周期压缩、生产节奏变化、等待减少，时间线不是历史记录而是越来越快的过程。

## Design Intent

下半部是一条压缩时间带，不是普通轴线。一个 accent cut 把节奏切开，阶段条目上下错落贴近带状核心，
表达时间被压缩、等待被减少。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad tl2-layout">
    <span class="ed-ghost-type tl2-ghost" data-anim="ghost">Tempo</span>
    <div class="tl2-wrap">
      <div class="tl2-head">
        <span class="ed-kicker label-mono tl2-kicker" data-anim="kicker">TIMELINE</span>
        <h1 class="serif-cn tl2-title" data-anim="headline">每一次迭代，都在减少一次等待</h1>
      </div>
      <div class="tl2-band" data-anim="band">
        <div class="tl2-core" data-anim="core"></div>
        <div class="tl2-cut" data-anim="cut"></div>
        <div class="tl2-items" style="--tl2-count: 5;">
          <div class="tl2-item up" data-anim="item"><div class="tl2-year">01</div><h3>阶段</h3><p>短说明</p></div>
          <div class="tl2-item down" data-anim="item"><div class="tl2-year">02</div><h3>阶段</h3><p>短说明</p></div>
          <div class="tl2-item up turn" data-anim="turn"><div class="tl2-year">03</div><h3>切点</h3><p>短说明</p></div>
          <div class="tl2-item down" data-anim="item"><div class="tl2-year">04</div><h3>阶段</h3><p>短说明</p></div>
          <div class="tl2-item up" data-anim="item"><div class="tl2-year">05</div><h3>阶段</h3><p>短说明</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .tl2-layout { position: relative; }
#scene_xxx .tl2-wrap { height: 100%; display: flex; flex-direction: column; }
#scene_xxx .tl2-head { max-width: 980px; }
#scene_xxx .tl2-kicker { margin-bottom: 28px; }
#scene_xxx .tl2-title { margin: 0; font-size: 76px; line-height: 1.06; }
#scene_xxx .tl2-band { position: relative; margin-top: auto; margin-bottom: 132px; height: 430px; }
#scene_xxx .tl2-core {
  position: absolute;
  left: 0;
  right: 0;
  top: 48%;
  height: 86px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, var(--surface), var(--surface-2), var(--accent-soft), var(--surface));
  border-top: var(--rule-w) var(--rule-style) var(--rule);
  border-bottom: var(--rule-w) var(--rule-style) var(--rule);
}
#scene_xxx .tl2-cut { position: absolute; left: 55%; top: 32px; bottom: 32px; width: 2px; background: var(--accent); box-shadow: 0 0 0 8px var(--accent-soft); }
#scene_xxx .tl2-items { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(var(--tl2-count, 5), 1fr); }
#scene_xxx .tl2-item { position: relative; padding-right: 42px; }
#scene_xxx .tl2-year { font-family: var(--font-display-en); font-size: 68px; line-height: 0.9; letter-spacing: -0.03em; color: var(--text); }
#scene_xxx .tl2-item h3 { margin: 14px 0 10px; font-family: var(--font-display-cn); font-size: 32px; color: var(--text-2); letter-spacing: 0.03em; }
#scene_xxx .tl2-item p { margin: 0; max-width: 22ch; font-size: 19px; line-height: 1.48; color: var(--text-mute); }
#scene_xxx .tl2-item.up { padding-top: 0; }
#scene_xxx .tl2-item.down { padding-top: 270px; }
#scene_xxx .tl2-item.turn .tl2-year { color: var(--accent); }
#scene_xxx .tl2-item.turn h3 { color: var(--text); }
#scene_xxx .tl2-ghost { right: 60px; top: 60px; font-size: 190px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `band`, `core`, `cut`, `item`, `turn`.

## Do Not Change

不要把 tempo band 改成普通细时间轴；不要让多个 cut 同时 accent；不要把条目做成卡片。
