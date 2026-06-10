# compare-asymmetric-recommendation

family: `compare`

适用：before/after、新旧对比、两种选择、优劣变化。

## Layout Contract

- prototype 中的条目、marker 和辅助说明数量只是示例；按真实对比内容增减，但保持分栏主次关系。
- 对比必须是中缝编辑式分栏，左右内容组语义对齐。
- 推荐侧或 after 侧通过 accent、小 badge、亮度和 marker 提权。
- 旧侧 / before 侧可以压缩，但必须可读；不要用过低 opacity 或 `var(--text-mute)` 承载主要反例文字。
- badge 是可选信息，只在内容明确有推荐标签时出现，不要为了装饰自动添加。
- 左右区域不使用大边框盒子；中缝只是一条 hairline。
- 禁止左右 state 大框、差异轴大标签、底部结果 caption。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 compare family 内推荐侧的权重和证明方式；
推荐点和旧侧上下文必须来自真实内容。

- `hero-recommendation`：推荐侧作为主视觉，旧侧压缩为边栏。适合结论明显偏向新方案。
  推荐侧必须有稳定 accent。
- `narrow-before-wide-after`：旧侧 35%、after 侧 65%。适合 before / after 转换，after 是最终记忆点。
  窄栏只保留必要旧状态。
- `proof-stack-recommendation`：推荐侧叠放 1-2 个证明点或结果标签。适合推荐理由比旧侧细节更重要的场景。
  proof stack 不得伪造指标。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 左右两侧的对比项数量可以不对称；只保留真实差异和推荐点，不要为了形成三行列表而补无来源的优缺点。
- “而不是 / 不要 / 旧做法”这类文字虽然降权，但仍是语义对照的一半；字号不应低于 20px，
  颜色不应低于 `var(--text-2)` 的可读层级。

## Motion Direction

适合左右对比、问题/解法、旧方案/新方案和 before/after。

动作组合：

- 分割线、差异轴或遮罩先出现。
- 左右两侧从相反方向进入。
- 可比较项按行对齐出现。
- 推荐侧、解法侧或关键差异使用 accent 确认，旧侧可降权。
- 必要时让旧侧轻微降权，新侧稳定保留。

节奏特点：对照关系必须清楚，左右内容不要同时糊成一团。

## Use When

已经有明确推荐结论，旧方案只是被压缩展示，新方案才是重点；要表达“不是二选一，而是推荐右侧”。

## Design Intent

不对称对比场。左侧旧方案压缩成同宽碎片 chips 和一句弱结论，右侧新方案占更大宽度，拥有大标题、
推荐 badge 和按真实内容生成的结果读数。中缝仍然存在，但权重明显向推荐侧倾斜。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad cs2-layout">
    <span class="ed-ghost-type cs2-ghost" data-anim="ghost">Better</span>
    <div class="cs2-wrap">
      <div class="cs2-head">
        <span class="ed-kicker label-mono cs2-kicker" data-anim="kicker">COMPARISON</span>
        <h1 class="serif-cn cs2-title" data-anim="headline"><!-- headline --></h1>
      </div>
      <div class="cs2-field" data-anim="field">
        <section class="cs2-old" data-anim="before">
          <div class="label-mono cs2-label">Before</div>
          <div class="chips">
            <!-- Render only real old-side chips from visibleContent. Do not pad to three. -->
            <span class="chip"><!-- oldItems[0].text --></span>
            <span class="chip"><!-- oldItems[1].text --></span>
          </div>
          <h3><!-- oldConclusion.text --></h3>
        </section>
        <section class="cs2-new" data-anim="after">
          <!-- Optional: render only if the scene-plan explicitly contains a recommendation label. -->
          <span class="label-mono cs2-pick" data-anim="pick"><!-- optionalBadge --></span>
          <div class="label-mono cs2-label">After</div>
          <h2><!-- recommendation.title with accent --></h2>
          <div class="cs2-list" data-anim="metrics">
            <!-- Render only real recommendation metrics from visibleContent. Do not pad to three. -->
            <div><div class="v"><!-- metrics[0].value --></div><div class="l"><!-- metrics[0].label --></div></div>
            <div><div class="v"><!-- metrics[1].value --></div><div class="l"><!-- metrics[1].label --></div></div>
          </div>
        </section>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .cs2-layout { position: relative; }
#scene_xxx .cs2-wrap { height: 100%; display: flex; flex-direction: column; }
#scene_xxx .cs2-head { margin-bottom: 58px; }
#scene_xxx .cs2-kicker { margin-bottom: 28px; }
#scene_xxx .cs2-title { margin: 0; font-size: 76px; line-height: 1.06; }
#scene_xxx .cs2-field { flex: 1; display: grid; grid-template-columns: 0.72fr 1.28fr; border-top: var(--rule-w) var(--rule-style) var(--rule); }
#scene_xxx .cs2-old { padding: 50px 56px 0 0; border-right: var(--rule-w) var(--rule-style) var(--rule); }
#scene_xxx .cs2-new { position: relative; padding: 46px 0 0 78px; }
#scene_xxx .cs2-label { font-size: 17px; letter-spacing: 0.22em; color: var(--text-mute); margin-bottom: 30px; }
#scene_xxx .cs2-old .chips { display: flex; flex-direction: column; gap: 14px; max-width: 360px; }
#scene_xxx .cs2-old .chip { width: 100%; border: var(--rule-w) var(--rule-style) var(--rule); color: var(--text-2); padding: 14px 18px; font-size: 21px; border-radius: var(--r-sm); transform: rotate(var(--r, 0deg)); background: var(--surface); }
#scene_xxx .cs2-old .chip:nth-child(2) { --r: -2deg; }
#scene_xxx .cs2-old .chip:nth-child(5) { --r: 2deg; }
#scene_xxx .cs2-old h3 { margin: 44px 0 0; font-family: var(--font-display-cn); font-size: 42px; color: var(--text-2); letter-spacing: 0.03em; }
#scene_xxx .cs2-pick { position: absolute; right: 0; top: 44px; color: var(--accent); border: var(--rule-w) var(--rule-style) var(--accent); border-radius: 999px; padding: 8px 18px; font-size: 15px; letter-spacing: 0.2em; }
#scene_xxx .cs2-new .cs2-label { color: var(--accent); }
#scene_xxx .cs2-new h2 { max-width: 780px; margin: 0 0 42px; font-family: var(--font-display-cn); font-size: 86px; line-height: 1.02; letter-spacing: 0.04em; color: var(--text); }
#scene_xxx .cs2-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; border-top: var(--rule-w) var(--rule-style) var(--rule); padding-top: 34px; }
#scene_xxx .cs2-list .v { font-family: var(--font-display-en); font-size: 74px; color: var(--text); line-height: 0.9; letter-spacing: -0.03em; }
#scene_xxx .cs2-list .l { margin-top: 14px; font-size: 21px; line-height: 1.45; color: var(--text-2); }
#scene_xxx .cs2-ghost { left: 58%; bottom: 28px; transform: translateX(-50%); font-size: 190px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `field`, `before`, `after`, `pick`（optional）, `metrics`.

## Do Not Change

不要把左右重新均分；不要把推荐 badge 放到底部；不要把旧方案扩展成与新方案同权；
不要把 before / old side 的核心文字压暗到不可读。
