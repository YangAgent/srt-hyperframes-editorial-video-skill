# checklist-risk-scan

family: `checklist`

适用：检查项、风险项定位、发布前检查、调试检查、质量复核。

## Layout Contract

- 画面必须是一组有秩序的检查项，并有一个明确风险项或当前检查项。
- 风险项应被扫描线、边框、callout 或 marker 锁定。
- 检查项数量可增减，但主视觉应保留“扫描并定位”的关系。
- 扫描线 / 扫描条必须与当前 `.cr-item` 的真实区域对齐；检查项 top、gap、高度或数量变化后，
  不能继续使用旧的固定 `top` 数值。
- 扫描线初始必须隐藏；只有进入第一个检查 cue 时才出现并定位到第一项，后续只移动位置。
- callout 必须贴靠风险项或检查区，不要变成底部注释。
- 禁止做成普通待办清单、完成度面板或平均状态卡片。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变检查关系的构图，不改变 checklist family 的
语义边界；检查项、风险项和 callout 仍只能来自 `visibleContent`、`headline`、`body` 或
`screenShouldShow`。

- `side-copy-board`：默认左文案、右检查板结构。适合标题需要解释检查目的，同时右侧承载多项扫描。
  保留当前 skeleton 的横向扫描线、检查板和贴靠风险项的 callout。
- `full-board-callout`：检查板占据主画面，标题压到上方或上左。适合检查项较多、风险定位是主体动作。
  callout 必须贴靠风险行或检查区域内部，不能变成底部说明。
- `vertical-scan-rail`：纵向扫描轨道，风险项沿竖轴定位。适合流程式复核、从上到下排查或阶段检查。
  扫描线可改为竖向 rail，但仍必须有当前项 / 风险项的稳定确认。
- `radar-focus`：中心风险对象 + 周围检查项环绕，扫描线聚焦当前风险。适合少量检查项围绕一个核心
  风险或质量对象。不要补无来源环绕节点；少项时放大中心和当前风险。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 检查项和风险项按真实待检查内容生成；示例中的多项列表不是数量要求，少项时放大当前风险或确认对象。

## Motion Direction

适合把“逐项检查”做成有推进感的定位过程。

动作组合：

- 检查板和检查项先建立。
- 扫描线在第一个检查 cue 才从隐藏状态出现，并立即对齐第一条当前项。
- 扫描线沿列表移动时，位置必须根据当前检查项和列表容器的真实 DOM 位置或同源 CSS 变量计算：
  `scanTop = list.offsetTop + item.offsetTop + item.offsetHeight / 2 - scan.offsetHeight / 2`。
- 不要使用 `itemHeight * index`、`top: 318px`、固定 `y` 偏移等近似值；这些会在 item 高度、
  gap 或 variant 改变时产生错位。
- 已确认项降权，风险项被边线或 accent 锁定。
- callout 贴靠风险项出现，最终停在处理建议上。

节奏特点：像质检过程，不像罗列任务。

## Use When

内容是在讲检查、复核、排查、发布前确认，尤其适合“这些都没问题，真正风险在这一项”。

## Design Intent

右侧是大型检查板，横向扫描线穿过当前风险项。左侧标题解释检查目的，右侧 callout 明确指出风险
和下一步处理动作。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad cr-layout">
    <span class="ed-ghost-type cr-ghost" data-anim="ghost">Scan</span>
    <div class="cr-wrap">
      <aside class="cr-copy">
        <span class="ed-kicker label-mono cr-kicker" data-anim="kicker">RISK CHECK</span>
        <h1 class="serif-cn cr-title" data-anim="headline"><!-- headline --></h1>
        <p class="ed-subline cr-sub" data-anim="subline"><!-- subline --></p>
      </aside>
      <main class="cr-stage" data-anim="stage">
        <div class="cr-board">
          <div class="cr-beam" data-anim="scan"></div>
          <div class="cr-list" data-anim="list">
            <!-- Render only real checklist items from visibleContent. Do not pad to four. -->
            <div class="cr-item is-ok"><span><!-- checkItems[0].index --></span><b><!-- checkItems[0].text --></b><em><!-- checkItems[0].status --></em></div>
            <div class="cr-item is-risk"><span><!-- riskItem.index --></span><b><!-- riskItem.text --></b><em><!-- riskItem.status --></em></div>
          </div>
          <div class="cr-callout" data-anim="callout"><small><!-- riskItem.kicker --></small><strong><!-- riskItem.text --></strong><p><!-- riskItem.note --></p></div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .cr-layout { position: relative; }
#scene_xxx .cr-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .cr-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .cr-kicker { margin-bottom: 34px; }
#scene_xxx .cr-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .cr-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .cr-stage { position: relative; align-self: center; }
#scene_xxx .cr-board { position: relative; height: 650px; border: var(--rule-w) var(--rule-style) var(--rule); overflow: hidden; background: linear-gradient(135deg, var(--surface-2), transparent 55%); }
#scene_xxx .cr-beam { position: absolute; left: 0; right: 0; top: var(--scan-top, 0px); height: var(--scan-h, 92px); opacity: 0; border-top: var(--rule-w) var(--rule-style) var(--accent); border-bottom: var(--rule-w) var(--rule-style) var(--accent); background: var(--accent-soft); }
#scene_xxx .cr-list { position: absolute; left: 64px; top: 58px; width: 860px; display: grid; gap: 22px; }
#scene_xxx .cr-item { height: 112px; display: grid; grid-template-columns: 96px 1fr auto; align-items: center; border-bottom: var(--rule-w) var(--rule-style) var(--rule); color: var(--text-2); }
#scene_xxx .cr-item span { font-family: var(--font-mono); font-size: 19px; color: var(--text-mute); }
#scene_xxx .cr-item b { font-family: var(--font-display-cn); font-size: 42px; letter-spacing: 0.04em; }
#scene_xxx .cr-item em { font-style: normal; font-family: var(--font-mono); font-size: 15px; letter-spacing: 0.2em; color: var(--text-mute); text-transform: uppercase; }
#scene_xxx .cr-item.is-risk { color: var(--text); border-color: var(--accent); }
#scene_xxx .cr-item.is-risk em { color: var(--accent); }
#scene_xxx .cr-item.is-dim { opacity: 0.42; }
#scene_xxx .cr-callout { position: absolute; right: 70px; top: 238px; width: 470px; min-height: 260px; border: var(--rule-w) var(--rule-style) var(--accent); padding: 38px; background: var(--surface); box-shadow: 0 30px 90px var(--surface-3); }
#scene_xxx .cr-callout small { font-family: var(--font-mono); color: var(--accent); letter-spacing: 0.26em; text-transform: uppercase; }
#scene_xxx .cr-callout strong { display: block; margin-top: 28px; font-family: var(--font-display-cn); font-size: 48px; line-height: 1.16; letter-spacing: 0.04em; }
#scene_xxx .cr-callout p { margin: 22px 0 0; color: var(--text-mute); font-size: 21px; line-height: 1.55; }
#scene_xxx .cr-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `scan`, `list`, `check-item`, `callout`.

扫描线 JS 必须从真实行位置读取坐标。注意：`q(...)` 返回 scoped selector 字符串，不是 DOM
element；读取 `offsetTop` / `offsetHeight` 时必须用 `scene.querySelector(...)` 获取 DOM。
因为 `.cr-item` 位于绝对定位的 `.cr-list` 内，而 scan beam 位于 `.cr-board` 内，所以必须加上
list 容器自身的 `offsetTop`：

```js
const scan = scene.querySelector("[data-anim='scan']");
const list = scene.querySelector(".cr-list");
const items = scene.querySelectorAll("[data-anim='check-item']");
const alignScanTo = (item) => {
  const top = list.offsetTop + item.offsetTop + item.offsetHeight / 2 - scan.offsetHeight / 2;
  return top;
};

tl.set(q("[data-anim='scan']"), { opacity: 0, top: () => alignScanTo(items[0]) }, at(0));
tl.to(q("[data-anim='scan']"), { opacity: 1, duration: 0.25 }, cue(firstCheckSegment, 0));
tl.to(q("[data-anim='scan']"), { top: () => alignScanTo(items[index]), duration: 0.45, ease: "power2.inOut" }, cue(segment, 80));
```

检查板、列表和标题属于 skeleton，必须在 scene 开始后约 0.8-1.4 秒内建立。不要把整个
`stage` 延迟到后段 cue 才出现；如果扫描条和 callout 还没出现，检查项本身也应该已经可读，
避免场景前段空白。

## Do Not Change

不要把扫描过程变成逐项打勾；不要让风险 callout 远离检查项；不要把所有检查项做成同权卡片；
不要用固定 top / y 偏移模拟扫描条位置；不要让扫描条在第一个检查 cue 之前可见。
