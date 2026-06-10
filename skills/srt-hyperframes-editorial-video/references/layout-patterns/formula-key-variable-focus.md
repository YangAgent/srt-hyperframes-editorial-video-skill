# formula-key-variable-focus

family: `formula`

适用：关键变量、影响因素、干扰项降权、核心原因聚焦。

## Layout Contract

- 若原文确实包含多个因素或干扰项，画面先呈现这些真实因素，再聚焦一个关键变量。
- 关键变量必须是唯一主焦点，其他真实因素可保留为弱态上下文。
- 适合讲真正影响结果的因素，不适合泛泛罗列概念。
- 聚焦区应有明显边界、光圈、框选或中心结构。
- 禁止把因素做成同权矩阵，禁止让多个变量同时高亮。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 formula family 内因素降权和关键变量聚焦方式；
因素和关键变量必须来自真实内容。

- `variable-spotlight`：默认关键变量被 spotlight 锁定。适合变量已经明确、需要放大其影响。
  其他因素保持弱态。
- `factors-orbit`：多个因素围绕结果或核心，关键变量进入 accent。适合真实因素并列但只有一个关键。
  不补无来源因素。
- `ranked-dropoff`：因素按影响力或相关性递减，最后聚焦关键变量。适合讲“真正影响的是 X”。
  排序必须来自语义判断，不伪造数值排名。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 因素数量由真实干扰项决定，推荐 2-5 个真实因素；不要求 2x3 网格，只有 1 个核心对象时可弱化或移除因素网格。

## Motion Direction

适合表达“真正要改的是这个变量”。

动作组合：

- 真实因素先作为背景、左侧 grid 或贴近 spotlight 的弱态短标签出现。
- 干扰项降权，关键变量被保留。
- 关键变量进入 spotlight、框选或中心区域。
- 最终关键变量和解释句稳定可读。

节奏特点：从真实因素或叙述上下文中抽出唯一关键点。

## Use When

内容是在讲影响视频质量、提示词效果、剪辑节奏、模型输出、发布效果的关键变量，或解释“问题不在 A，
而在 B”。

## Design Intent

左侧可以是多个真实因素的弱态网格，也可以是少量贴近 spotlight 的弱态短标签；右侧或中心是
关键变量聚焦区。画面应让观众看到并非所有因素同等重要，真正需要优化的是被隔离出来的变量。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad fk-layout">
    <span class="ed-ghost-type fk-ghost" data-anim="ghost"><!-- ghostWord --></span>
    <div class="fk-wrap">
      <aside class="fk-copy">
        <span class="ed-kicker label-mono fk-kicker" data-anim="kicker"><!-- kicker --></span>
        <h1 class="serif-cn fk-title" data-anim="headline"><!-- headline with key variable accent --></h1>
        <p class="ed-subline fk-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="fk-stage" data-anim="stage">
        <div class="fk-isolation">
          <div class="fk-factors" data-anim="factors">
            <!-- Render only real factors from visibleContent. Do not pad to six. -->
            <span><!-- factorItems[0].text --></span>
            <span class="is-key"><!-- keyVariable.text --></span>
          </div>
          <div class="fk-spotlight" data-anim="spotlight"><small><!-- keyVariable.kicker --></small><strong><!-- keyVariable.text --></strong><p><!-- keyVariable.note --></p></div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .fk-layout { position: relative; }
#scene_xxx .fk-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .fk-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .fk-kicker { margin-bottom: 34px; }
#scene_xxx .fk-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .fk-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .fk-stage { align-self: center; }
#scene_xxx .fk-isolation { height: 650px; display: grid; grid-template-columns: 1fr 520px; gap: 80px; align-items: center; }
#scene_xxx .fk-factors { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; opacity: 0.72; }
#scene_xxx .fk-factors span { height: 116px; border: var(--rule-w) var(--rule-style) var(--rule); display: grid; place-items: center; font-family: var(--font-display-cn); font-size: 36px; letter-spacing: 0.04em; color: var(--text-mute); background: var(--surface-2); }
#scene_xxx .fk-factors .is-key { color: var(--text); border-color: var(--accent); opacity: 1; }
#scene_xxx .fk-spotlight { width: 520px; height: 520px; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--accent); display: grid; place-content: center; text-align: center; padding: 70px; background: radial-gradient(circle at 50% 40%, var(--accent-soft), var(--surface) 68%); }
#scene_xxx .fk-spotlight small { font-family: var(--font-mono); color: var(--accent); letter-spacing: 0.24em; text-transform: uppercase; }
#scene_xxx .fk-spotlight strong { display: block; margin-top: 28px; font-family: var(--font-display-cn); font-size: 70px; line-height: 1.05; letter-spacing: 0.04em; }
#scene_xxx .fk-spotlight p { margin: 24px 0 0; color: var(--text-2); font-size: 22px; line-height: 1.5; }
#scene_xxx .fk-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `factors`, `spotlight`.

## Do Not Change

不要让多个因素同时成为主焦点；不要把关键变量放在小角标里；不要把因素网格做成主要结论。
