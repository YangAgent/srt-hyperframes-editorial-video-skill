# definition-term-breakdown

family: `definition`

适用：术语解释、概念定义、把抽象词拆成可见部件。

## Layout Contract

- 被定义的术语必须是主视觉锚点。
- 拆解项必须贴靠术语或作为清晰说明栈，不得变成概念卫星图。
- 适合解释“这个词是什么意思”，不适合机制模型或强判断 statement。
- 禁止术语和说明互相重叠；禁止用无意义连接线制造复杂感。

## Layout Variants

- `term-left-breakdown`：左侧术语锚点，右侧拆解说明。适合解释性定义。
- `center-term-radial`：术语居中，拆解项贴靠周围。适合术语需要完整读到且拆解项较短。
  如果使用底部标题 / 定义确认行，必须给字幕或后期 caption 流程预留安全区。
- `keyword-cutaway`：关键词局部放大拆解。适合把抽象词拆成可见部件。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`。
- 按真实内容增减、合并、重排 slot；不要为了填满拆解项、说明栈或术语部件而新增概念。
- 术语和拆解项必须来自真实内容。
- 拆解项数量按内容增减，推荐 2-3 个；不要为了三段结构补解释。
- 如果画面重点是内部机制关系，应改用 `concept-*`。

## Motion Direction

- 术语先作为主锚点建立。
- 拆解项依次出现，贴靠术语或说明栈。
- 最终回到术语本身确认定义。

节奏特点：先定义，再展开解释。

## Use When

内容是在解释一个术语、定义一个概念，或把抽象表达拆成几个可理解部件。

## Design Intent

左侧或中心是巨大术语，右侧是有呼吸感的拆解说明。说明块之间保持距离，不用密集 leader line。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad dt-layout">
    <span class="ed-ghost-type dt-ghost" data-anim="ghost">Define</span>
    <div class="dt-wrap">
      <aside class="dt-copy"><span class="ed-kicker label-mono dt-kicker" data-anim="kicker"><!-- kicker --></span><h1 class="serif-cn dt-title" data-anim="headline"><!-- headline --></h1><p class="ed-subline dt-sub" data-anim="subline"><!-- subline --></p></aside>
      <main class="dt-stage" data-anim="stage">
        <section class="dt-term" data-anim="term"><small><!-- term.kicker --></small><b><!-- term.text --></b></section>
        <div class="dt-parts" data-anim="parts">
          <!-- Render only real definition parts. -->
          <section><span><!-- part.label --></span><strong><!-- part.text --></strong><p><!-- part.note --></p></section>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .dt-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; }
#scene_xxx .dt-title { margin: 0; font-size: 76px; line-height: 1.08; }
#scene_xxx .dt-stage { position: relative; height: 650px; align-self: center; }
#scene_xxx .dt-term { position: absolute; left: 58px; top: 190px; width: 350px; padding-left: 36px; border-left: var(--rule-w) var(--rule-style) var(--accent); }
#scene_xxx .dt-term b { display: block; margin-top: 24px; font-family: var(--font-display-cn); font-size: 80px; line-height: 1.04; }
#scene_xxx .dt-parts { position: absolute; right: 52px; top: 82px; width: 450px; display: grid; gap: 24px; }
#scene_xxx .dt-parts section { padding: 26px 30px; background: var(--surface-2); }
#scene_xxx .dt-parts strong { display: block; margin-top: 16px; font-family: var(--font-display-cn); font-size: 31px; line-height: 1.16; }
#scene_xxx .dt-bottom-copy { margin-bottom: 80px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `term`, `parts`.

## Variant Notes

- `center-term-radial` 可以把 headline / definition confirmation 放在底部作为收束，但不得贴近画面
  底边。底部确认行默认使用 `margin-bottom: 80px`，结合 `.scene-pad` 形成约 150px 字幕安全区。
- 如果底部确认行文案较长，优先压缩 stage 高度、拆解项间距或标题字号；不要把标题行下压到字幕
  安全区内。
- 底部确认行应承担定义收束，例如“写 Skill 的 Skill”，不应变成 footnote、source 或小号 caption。

## Do Not Change

不要把定义拆解做成复杂模型；不要让术语压住说明文字；不要补无来源拆解项。
