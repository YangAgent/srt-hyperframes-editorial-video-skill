# transform-compression-release

family: `transform`

适用：旧状态变新状态、问题被压缩成解法、系统重组、模式切换或前后结构变化。

## Layout Contract

- prototype 中的 fragments、状态项和结果说明数量只是示例；按真实变化内容增减，但保持转化结构。
- 旧状态必须是散碎 fragments，新状态必须是聚合后的 consolidated block。
- 中间 seam 表达压缩、重组或转译动作。
- accent 只落在转换动作、after block 边框或新状态关键词。
- 禁止旧列表 + 右侧大空框；禁止 before/after 两个等权大盒子。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 transform family 内压缩、释放和输出块的构图；
输入碎片、压缩动作和释放结果必须来自真实内容。

- `center-compressor`：中心压缩器作为主动作，碎片从两侧汇入并释放结果。适合强调处理动作本身。
  compressor 不能成为无意义装饰。
- `cloud-to-output`：碎片云收拢成稳定输出块。适合零散信息、素材或想法被整理成产物。
  输出块必须是最终可读对象。
- `release-slab`：压缩后释放出一块结果 slab。适合强调“压实后变成可交付结构”。
  slab 边框或关键词作为 final accent。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- before/after 碎片、状态块和结果对象按真实状态变化生成；碎片不足时强化转化动作，不补无来源碎片。

## Motion Direction

适合旧状态变新状态、结构重组、问题压缩成解法和模式切换。

动作组合：

- before state 先建立。
- 噪声项、阻力项或旧结构被压缩、淡出、收拢或移位。
- after state 的结构重排、展开或聚焦。
- 最终结果节点或新秩序用 accent 稳定强调。

节奏特点：观众应该看到“变化发生了”，不是只看到 before/after 硬切。

## Use When

变化重点是从散乱材料变成一个产物，语义强调压缩、聚合、重组、统一出口和释放成结果。

## Design Intent

左侧是漂浮碎片云，中间是圆形压缩核心和上下 release/compress 标记，右侧是单一输出块。它比
左右 before/after 更强调过程感：碎片被中心吸入，再释放为一个结果。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad tr2-layout">
    <span class="ed-ghost-type tr2-ghost" data-anim="ghost">Merge</span>
    <div class="tr2-wrap">
      <div class="tr2-head">
        <span class="ed-kicker label-mono tr2-kicker" data-anim="kicker">COMPRESSION</span>
        <h1 class="serif-cn tr2-title" data-anim="headline"><!-- headline --></h1>
      </div>
      <div class="tr2-stage" data-anim="stage">
        <div class="tr2-cloud" data-anim="cloud">
          <!-- Render only real fragments from visibleContent. Do not pad fragments. -->
          <span class="tr2-frag" data-anim="fragment" style="left:10px; top:36px; --r:-3deg;"><!-- fragments[0].text --></span>
          <span class="tr2-frag" data-anim="fragment" style="left:270px; top:88px; --r:2deg;"><!-- fragments[1].text --></span>
        </div>
        <div class="tr2-mid" data-anim="compressor"><span class="lbl label-mono">compress</span><span class="bar"></span><div class="tr2-core">压缩</div><span class="bar"></span><span class="lbl label-mono">release</span></div>
        <div class="tr2-output" data-anim="output"><div class="k label-mono"><!-- output.kicker --></div><div class="t serif-cn"><!-- output.text --></div><div class="p"><!-- output.note --></div></div>
        <div class="tr2-cap serif-cn" data-anim="caption"><!-- caption with accent --></div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .tr2-layout { position: relative; }
#scene_xxx .tr2-wrap { height: 100%; display: flex; flex-direction: column; }
#scene_xxx .tr2-head { margin-bottom: 46px; }
#scene_xxx .tr2-kicker { margin-bottom: 28px; }
#scene_xxx .tr2-title { margin: 0; font-size: 76px; line-height: 1.06; }
#scene_xxx .tr2-stage { flex: 1; position: relative; display: grid; grid-template-columns: 0.94fr 220px 0.9fr; align-items: center; gap: 46px; }
#scene_xxx .tr2-cloud { position: relative; height: 520px; border-top: var(--rule-w) var(--rule-style) var(--rule); border-bottom: var(--rule-w) var(--rule-style) var(--rule); }
#scene_xxx .tr2-frag { position: absolute; background: var(--surface); border: var(--rule-w) var(--rule-style) var(--rule); border-radius: var(--r-sm); padding: 15px 20px; font-size: 21px; color: var(--text-mute); transform: rotate(var(--r, 0deg)); }
#scene_xxx .tr2-mid { display: flex; flex-direction: column; align-items: center; gap: 26px; }
#scene_xxx .tr2-mid .lbl { font-size: 15px; letter-spacing: 0.22em; color: var(--text-mute); }
#scene_xxx .tr2-mid .bar { width: 1px; height: 112px; background: linear-gradient(var(--rule), var(--accent), var(--rule)); }
#scene_xxx .tr2-core { position: relative; margin: 0 auto; width: 190px; height: 190px; border-radius: 50%; border: 2px solid var(--accent); display: grid; place-items: center; font-family: var(--font-display-cn); font-size: 38px; color: var(--accent); background: var(--shell); box-shadow: 0 0 0 12px var(--accent-soft), 0 28px 80px rgba(0, 0, 0, 0.5); z-index: 2; }
#scene_xxx .tr2-core::before,
#scene_xxx .tr2-core::after { content: ""; position: absolute; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--accent); opacity: 0.28; inset: -34px; }
#scene_xxx .tr2-core::after { inset: -72px; border-color: var(--rule); opacity: 0.45; }
#scene_xxx .tr2-output { position: relative; width: 100%; padding: 46px 50px; background: var(--surface); border: var(--rule-w) var(--rule-style) var(--accent); border-radius: var(--r-sm); box-shadow: 0 28px 80px rgba(0, 0, 0, 0.5); }
#scene_xxx .tr2-output .k { font-size: 17px; letter-spacing: 0.22em; color: var(--accent); margin-bottom: 24px; }
#scene_xxx .tr2-output .t { font-size: 58px; line-height: 1.12; color: var(--text); letter-spacing: 0.03em; }
#scene_xxx .tr2-output .p { margin-top: 22px; font-size: 22px; line-height: 1.55; color: var(--text-2); }
#scene_xxx .tr2-cap { position: absolute; left: 0; bottom: 132px; font-size: 34px; color: var(--text-2); letter-spacing: 0.03em; }
#scene_xxx .tr2-ghost { left: 50%; bottom: 22px; transform: translateX(-50%); font-size: 165px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `stage`, `cloud`, `fragment`, `compressor`, `output`, `caption`.

## Subtitle Safety

- `.tr2-cap` 是内容 caption，默认 `bottom` 不低于 `132px`。若输出卡较大，优先压缩 cloud 或
  output 高度，不要把 caption 放进字幕安全区。

## Do Not Change

不要把碎片云改成普通列表；不要删除中心压缩核心；不要把 output block 做成和碎片同权的盒子。
