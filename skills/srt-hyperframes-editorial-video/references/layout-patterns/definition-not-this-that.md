# definition-not-this-that

family: `definition`

适用：“不是 X，而是 Y”“不要理解成 X，要理解成 Y”、纠正误解、重新定义。

## Layout Contract

- 错误理解必须被降权、划掉或撤出主焦点。
- 正确定义必须是最终主视觉锚点。
- replacement marker 只能占据错误定义和正确定义之间的呼吸区；marker 与两侧正文至少保留
  48px 空隙。正确定义较长时，优先缩小、移动或省略 marker，不要让 marker 贴住文字。
- 错误定义可以弱化层级，但正文必须保持可读；不要对整个 wrong side 使用过低 opacity。
  通过尺寸、位置、线条或标签降权，而不是把重要汉字变成灰影。
- `replacement-lockup` 中，正确定义必须填满主视觉区域；中心不能只留下很小的 `IS` / `REPLACE`
  作为视觉主体。
- 本 layout 是定义纠偏，不是普通优缺点 compare。
- 禁止左右两侧同权；禁止把正确定义放成小注释。

## Layout Variants

- `rejected-definition`：错误定义降权或划掉。适合重点在撤掉误解。
- `replacement-lockup`：正确定义放大确认。适合重点在新定义本身；wrong side 只做可读的侧边证据，
  marker 可缩小或改为短 accent rule，不能制造中间空洞。
- `two-line-correction`：不是 X / 而是 Y 的短句纠偏。适合短定义句；marker 是辅助，不得贴近任一侧文字。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了形成左右纠偏结构而新增错误定义或正确定义。
- 错误理解和正确定义都必须来自当前内容。
- 如果只有正确定义、没有被纠正对象，改用 `definition-term-breakdown` 或 `statement-*`。
- 不要为形成左右结构而编造错误定义。
- 如果 wrong side 只是一个短词，必须让它仍然清楚可读；降权后的字号不应低于 48px，
  且颜色不低于 `var(--text-2)` 的可读层级。
- 如果 correct definition 超过两行，右侧区域要增宽或换行，marker 必须让位。

## Motion Direction

- 错误定义先弱态出现或被划掉。
- replacement marker 或分隔结构建立。
- 正确定义放大、提亮并最终稳定。

节奏特点：撤掉旧理解，锁定新定义。

## Use When

内容是在纠正听众可能的理解偏差，例如“layout 不是模板，而是语义结构”。

## Design Intent

画面左侧或左区是错误定义弱态，右侧是正确定义大标题。中心可以有 replacement marker，但不能抢主焦点，
也不能挤压两侧内容。判断画面是否成立的第一标准是“正确定义一眼成立”，不是中间标记是否醒目。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad dn-layout">
    <span class="ed-ghost-type dn-ghost" data-anim="ghost">Meaning</span>
    <div class="dn-wrap">
      <aside class="dn-copy"><span class="ed-kicker label-mono dn-kicker" data-anim="kicker"><!-- kicker --></span><h1 class="serif-cn dn-title" data-anim="headline"><!-- headline --></h1><p class="ed-subline dn-sub" data-anim="subline"><!-- subline --></p></aside>
      <main class="dn-stage" data-anim="stage">
        <section class="dn-not" data-anim="not"><small>NOT THIS</small><h2><!-- wrongDefinition --></h2><p><!-- note --></p></section>
        <div class="dn-marker" data-anim="marker"><span>REPLACE</span></div>
        <section class="dn-that" data-anim="that"><small>IT MEANS</small><h2><!-- correctDefinition --></h2><p><!-- note --></p></section>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .dn-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .dn-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .dn-stage { position: relative; height: 650px; align-self: center; }
#scene_xxx .dn-not, #scene_xxx .dn-that { position: absolute; top: 54px; bottom: 132px; width: 45%; display: flex; flex-direction: column; justify-content: center; }
#scene_xxx .dn-not { left: 0; color: var(--text-2); }
#scene_xxx .dn-that { right: 0; padding-left: 48px; }
#scene_xxx .dn-not small,
#scene_xxx .dn-that small,
#scene_xxx .dn-not p,
#scene_xxx .dn-that p { color: var(--text-mute); }
#scene_xxx .dn-not h2, #scene_xxx .dn-that h2 { margin: 34px 0 0; font-family: var(--font-display-cn); font-size: 72px; line-height: 1.05; }
#scene_xxx .dn-that h2 { font-size: 96px; }
#scene_xxx .dn-marker { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border: var(--rule-w) var(--rule-style) var(--accent); border-radius: 50%; width: 140px; height: 140px; display: grid; place-content: center; z-index: 2; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `not`, `marker`, `that`.

## Subtitle Safety

- `.dn-not` / `.dn-that` 是定义对照主体内容，默认 `bottom` 不低于 `132px`。
- 如果大字过高，优先缩小 h2 字号或压缩 stage 顶部留白，不要把面板下压到字幕安全区。

## Do Not Change

不要做成普通 compare；不要让错误定义和正确定义同权；不要补不存在的错误理解；不要让 marker
贴住正确定义；不要把 wrong side 整体压到不可读；不要让中心小词成为画面唯一焦点。
