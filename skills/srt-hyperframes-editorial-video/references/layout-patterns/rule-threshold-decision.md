# rule-threshold-decision

family: `rule`

适用：阈值判断、质量边界、复杂度边界、风险边界、是否升级策略。

## Layout Contract

- 画面必须围绕一条清晰阈值线、边界线或决策区展开。
- 阈值两侧必须有不同状态：继续观察、准备调整、立即处理等。
- 当前对象、当前指标或当前情况必须落在某个区域，并形成最终判断。
- 允许出现数字、百分比、等级或短标签，但不要伪造不存在的精确数据。
- 禁止把阈值判断做成普通三列卡片、说明列表或纯文字建议。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 rule family 内阈值、区域和当前 marker 的关系；
阈值、状态和判断必须来自真实内容或明确相对关系。

- `threshold-line`：默认单条阈值线 + 当前 marker。适合清楚的边界判断。
  marker 必须落在某个状态区域。
- `zone-map`：多区域边界图。适合继续观察、准备调整、立即处理等多状态规则。
  区域数量按真实规则增减。区域应主要通过背景带、横向分组、标签和 marker 表达；不要叠加密集
  竖向网格、多个竖向边框和多条阈值竖线。
- `gauge-marker`：仪表式边界。适合等级、风险或质量边界的直观判断。
  gauge 不伪造精确刻度。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 阈值、错误项、正确项、示例和状态标签按真实规则生成；没有明确数值或示例时，不要编造百分比、边界或案例。

## Motion Direction

适合把模糊建议压成可执行判断。

动作组合：

- 背景刻度、区域和阈值线先建立。
- 当前对象或指标 marker 从低风险区、待观察区或空位进入。
- 阈值线、当前值和动作区域被依次确认。
- 最终让 marker 停在推荐动作所在区域，形成稳定结论。

节奏特点：先建立判断尺度，再确认当前状态，最后给出动作方向。

## Use When

内容是在讲“达到什么条件后要换做法”，例如：什么时候升级工具、什么时候停止尝试、什么时候收窄目标、
什么时候必须先处理风险。

## Design Intent

左侧是标题解释，右侧是横向风险/成本/复杂度判断区。主视觉是一条靠右的阈值线和当前状态 marker。
观众应先看到“边界在哪里”，再看到“当前已经越过边界”，最后理解应该进入行动区。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad rt-layout">
    <span class="ed-ghost-type rt-ghost" data-anim="ghost">Limit</span>
    <div class="rt-wrap">
      <aside class="rt-copy">
        <span class="ed-kicker label-mono rt-kicker" data-anim="kicker">DECISION LINE</span>
        <h1 class="serif-cn rt-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline rt-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="rt-stage" data-anim="stage">
        <div class="rt-map">
          <!-- Render only real threshold zones from visibleContent. Do not pad zones. -->
          <div class="rt-zone rt-safe" data-anim="zone"><b><!-- zones[0].text --></b><span><!-- zones[0].note --></span></div>
          <div class="rt-zone rt-action" data-anim="action-zone"><b><!-- actionZone.text --></b><span><!-- actionZone.note --></span></div>
          <div class="rt-threshold" data-anim="threshold"><span><!-- threshold.label --></span><strong><!-- threshold.value --></strong></div>
          <div class="rt-marker" data-anim="marker"><span><!-- marker.label --></span><b><!-- marker.value --></b></div>
          <div class="rt-scale"><span>LOW</span><span>RISK / COST / COMPLEXITY</span><span>HIGH</span></div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .rt-layout { position: relative; }
#scene_xxx .rt-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .rt-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .rt-kicker { margin-bottom: 34px; }
#scene_xxx .rt-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .rt-title .ed-accent { color: var(--accent); }
#scene_xxx .rt-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .rt-stage { position: relative; align-self: center; min-height: 0; }
#scene_xxx .rt-map { position: relative; height: 620px; border-top: var(--rule-w) var(--rule-style) var(--rule); border-bottom: var(--rule-w) var(--rule-style) var(--rule); overflow: hidden; background: linear-gradient(90deg, var(--surface-2), transparent 48%, var(--accent-soft)); }
#scene_xxx .rt-map::before { content: none; }
#scene_xxx .rt-zone { position: absolute; top: 86px; bottom: 94px; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 34px 34px; }
#scene_xxx .rt-zone b { font-family: var(--font-display-cn); font-size: 42px; letter-spacing: 0.04em; }
#scene_xxx .rt-zone span { margin-top: 14px; color: var(--text-mute); font-size: 20px; line-height: 1.5; }
#scene_xxx .rt-safe { left: 0; width: 36%; }
#scene_xxx .rt-watch { left: 36%; width: 28%; }
#scene_xxx .rt-action { left: 64%; width: 36%; background: var(--accent-soft); }
#scene_xxx .rt-threshold { position: absolute; top: 0; bottom: 0; left: 64%; width: 2px; background: var(--accent); }
#scene_xxx .rt-threshold span { position: absolute; top: 38px; left: 22px; font-family: var(--font-mono); font-size: 15px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); white-space: nowrap; }
#scene_xxx .rt-threshold strong { position: absolute; top: 92px; left: 22px; font-family: var(--font-display-en); font-size: 86px; line-height: 0.9; font-weight: 400; color: var(--text); }
#scene_xxx .rt-marker { position: absolute; left: 75%; top: 215px; width: 190px; height: 190px; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--accent); display: grid; place-content: center; text-align: center; background: var(--surface); box-shadow: 0 30px 80px var(--surface-3); }
#scene_xxx .rt-marker span { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.22em; color: var(--text-mute); text-transform: uppercase; }
#scene_xxx .rt-marker b { font-family: var(--font-display-en); font-size: 72px; font-weight: 400; color: var(--accent); }
#scene_xxx .rt-scale { position: absolute; left: 28px; right: 28px; bottom: 26px; display: flex; justify-content: space-between; font-family: var(--font-mono); color: var(--text-mute); letter-spacing: 0.18em; font-size: 14px; text-transform: uppercase; }
#scene_xxx .rt-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `zone`, `action-zone`, `threshold`, `marker`.

## Variant Notes

- `threshold-line` 可以使用一条明确竖向阈值线，但最多一条，且必须承担判断边界语义。
- `zone-map` 不应使用 repeating vertical grid、每个 zone 的左边框和多条竖向 threshold 叠加。
  多区域质量边界优先用横向 row、区域背景、标签和当前 marker 组织，避免画面变成混乱表格。
- 如果内容已经是多指标表格，例如“达标线 / 优秀线”按多行指标展开，优先保留横向 row 分隔；
  竖向线条可全部省略，由列文本和背景区域承担分组。

## Do Not Change

不要把阈值线弱化成装饰线；不要把当前状态 marker 放到底部角落；不要把三段区域改成平均信息卡片。
