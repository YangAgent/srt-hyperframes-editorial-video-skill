# error-fix-before-after

family: `error`

适用：错误状态、修正动作、修正后结果、参数/结构/操作改法。

## Layout Contract

- 画面必须呈现修正前、修正动作、修正后三段关系。
- 修正动作必须作为中间主节点或工具节点出现，不能只用左右替换表达。
- 修正前应弱化或暴露错误点；修正后应稳定、清晰、被确认。
- 内容应是具体改法，例如拆分、重排、替换、对齐、删除、收窄。
- 禁止做成普通 before/after 对比，禁止省略修正动作。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 error family 内修正前、修正动作和修正后的构图；
错误状态、修正动作和结果必须来自真实内容。

- `three-stage-fix`：默认三段式修正路径。适合完整展示 before → fix → after。
  中间修正动作必须可见。
- `repair-spotlight`：修正动作被放大，前后状态作为两侧上下文。适合改法本身是字幕重点。
  spotlight 不能遮挡结果。
- `before-after-rebuild`：修正前后占主画面，中间用重建动作贯穿。适合结构被重排、替换或对齐。
  仍必须保留明确 fix 节点。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 现象、原因、修正动作和结果按真实故障叙述生成；不要为了完整诊断图而补不存在的症状或修复步骤。

## Motion Direction

适合展示“改哪里”和“改完变成什么”。

动作组合：

- 修正前状态先出现，错误点被划线或定位。
- 中间修正动作节点进入。
- 修正后状态从弱态进入并被 accent 确认。
- 修正前保持弱态，修正后停在最终可读状态。

节奏特点：观众必须看懂从错误到正确中间发生了什么动作。

## Use When

内容是在讲错误写法改成正确写法、错误操作改成推荐操作、提示词结构修正、参数修正、画面结构修正。

## Design Intent

右侧是一条横向修复路径：左边错误状态，中间修正动作，右边修正后结果。中间节点负责承接动作，
避免画面只是简单替换。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ef-layout">
    <span class="ed-ghost-type ef-ghost" data-anim="ghost">Repair</span>
    <div class="ef-wrap">
      <aside class="ef-copy">
        <span class="ed-kicker label-mono ef-kicker" data-anim="kicker">FIX THE POINT</span>
        <h1 class="serif-cn ef-title" data-anim="headline">不是替换画面，而是展示<span class="ed-accent">改哪里</span></h1>
        <p class="ed-subline ef-sub" data-anim="subline">修正前、修正动作、修正后连成一条可理解路径。</p>
      </aside>
      <main class="ef-stage" data-anim="stage">
        <div class="ef-lane">
          <div class="ef-state ef-before" data-anim="before"><small>Before</small><strong>目标 + 示例 + 限制全部混在一起</strong><span>优先级混乱</span></div>
          <div class="ef-tool" data-anim="fix"><b>Fix</b><p>拆分目标 / 限制 / 示例</p></div>
          <div class="ef-state ef-after" data-anim="after"><small>After</small><strong>目标先行，限制收束，示例校准</strong><span>结构清洁</span></div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ef-layout { position: relative; }
#scene_xxx .ef-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .ef-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .ef-kicker { margin-bottom: 34px; }
#scene_xxx .ef-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .ef-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .ef-stage { align-self: center; }
#scene_xxx .ef-lane { height: 640px; display: grid; grid-template-columns: 1fr 240px 1fr; align-items: center; gap: 36px; }
#scene_xxx .ef-state { min-height: 430px; border: var(--rule-w) var(--rule-style) var(--rule); padding: 40px; position: relative; overflow: hidden; }
#scene_xxx .ef-state small { font-family: var(--font-mono); letter-spacing: 0.25em; color: var(--text-mute); text-transform: uppercase; }
#scene_xxx .ef-state strong { display: block; margin-top: 32px; font-family: var(--font-display-cn); font-size: 50px; line-height: 1.18; letter-spacing: 0.04em; }
#scene_xxx .ef-state span { position: absolute; left: 40px; bottom: 38px; font-family: var(--font-mono); letter-spacing: 0.2em; color: var(--text-mute); text-transform: uppercase; }
#scene_xxx .ef-before { opacity: 0.68; background: repeating-linear-gradient(-8deg, var(--surface-2) 0 28px, transparent 28px 56px); }
#scene_xxx .ef-before::after { content: ""; position: absolute; left: 38px; right: 100px; top: 242px; height: var(--rule-w); background: var(--rule); transform: rotate(-5deg); }
#scene_xxx .ef-after { border-color: var(--accent); background: linear-gradient(180deg, var(--accent-soft), transparent 65%); }
#scene_xxx .ef-tool { width: 220px; height: 220px; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--accent); display: grid; place-content: center; text-align: center; background: var(--surface); }
#scene_xxx .ef-tool b { font-family: var(--font-display-en); font-size: 62px; font-weight: 400; color: var(--accent); }
#scene_xxx .ef-tool p { margin: 8px auto 0; max-width: 12ch; color: var(--text-mute); font-size: 18px; line-height: 1.4; }
#scene_xxx .ef-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `before`, `fix`, `after`.

## Do Not Change

不要省略中间修正动作；不要让修正前和修正后同权；不要把修正说明放成底部 caption。
