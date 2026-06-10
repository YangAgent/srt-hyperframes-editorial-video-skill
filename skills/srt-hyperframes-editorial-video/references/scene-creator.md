# Scene Creator Reference

本文件是 creator SubAgent 的主协议。creator 负责把 `scenesDataPath` 中列出的
storyboard scenes 转成 scene-plan，并实现独立 scene 片段。

## 输入契约

主 Agent 只传入下列绝对路径和事实：

- `projectRoot`: 项目根目录。
- `scenesDataPath`: 当前任务的 scene 数据文件。
- `planPath`: scene-plan JSON 输出路径。
- `referencesRoot`: skill 的 `references` 目录。
- `tokensPath`: 当前项目运行态 token 文件，通常是 `{projectRoot}/styles/tokens.css`。
- `validateScript`: `validate-scene-plan.mjs` 的绝对路径。
- `validateJsScript`: `validate-scene-js.mjs` 的绝对路径。

不要依赖 creator 编号、完整 `storyboard.json`、主题源码目录或最终 `index.html`。这些属于
主流程编排信息，不是 creator 的设计事实源。

## 必读顺序

开始工作前按顺序读取：

1. 全局 `hyperframes` skill：composition、layout、timeline 和 render 规则。
2. 全局 `gsap` skill：timeline、selector、tween、position parameter 和性能规则。
3. 全局 `hyperframes-cli` skill：lint、inspect、preview、render 和排查流程。
4. `{scenesDataPath}`：唯一内容事实源。
5. `{tokensPath}`：当前主题的 token 声音。
6. `{referencesRoot}/BEAT-ARCHETYPES.md`：layout 选择索引、图形化思考和 layout 通用契约。
7. `{referencesRoot}/VISUAL-SYSTEM.md`：token、primitive class 和视觉红线。
8. `{referencesRoot}/TIMING-CANON.md`：SRT 相对时间、三态、`at(...)` 和 `cue(...)`。
9. `{referencesRoot}/MOTION-CANON.md`：通用动画契约和动画红线。

前三个全局 skill 是硬性前置门槛，不是可选参考。无法读取任一全局 skill 时，立即停止并
返回失败；不要继续根据模板或已有代码猜测 HyperFrames / GSAP API。

不要一次性读取 `{referencesRoot}/layout-patterns/` 下的全部文件。creator 必须先只用
`BEAT-ARCHETYPES.md` 的 Layout Selection Table 和 `scenesDataPath`，为当前分片建立内存中的
layout selection ledger；ledger 自检通过后，只读取实际使用到的
`{referencesRoot}/layout-patterns/<layout_id>.md`。每个 layout 文件只包含一个 layout family 的
高保真 layout 契约、variants 和 motion direction。

## 工作流

对 `scenesDataPath` 中的每个 scene 依次完成：

1. 理解这段字幕真正要让观众看懂什么，不复述字幕原文。
2. 先从当前 scene 的 segments 中抽取真实可见内容对象，写入 scene-plan 的
   `visibleContent`。这些对象包括画面上承担内容含义的文字、数字、节点、图形对象或状态对象。
3. 用 `BEAT-ARCHETYPES.md` 的 Layout Selection Table 判断每个 scene 应被看成哪类 primary
   visual family，并为当前 `scenesDataPath` 中全部 scenes 建立 layout selection ledger。
4. 在读取任何 layout 文件前，按 `BEAT-ARCHETYPES.md` 的重复度约束自检 ledger。若超限，先调整
   family / `layout_id`，再调整 `layout_variant`，不要等校验失败后再补读其他 layout 文件。
5. ledger 自检通过后，只读取实际使用到的 layout 文件，并确认每个 scene 的 `layout_variant`
   符合对应 layout 文件的 `Layout Variants`。
6. 写入 plan 前再次按 ledger 检查 layout 分布，确保最终 `{planPath}` 不会触发本地重复度硬校验。
7. 按 `TIMING-CANON.md` 设计 initial state、progression state 和最终稳定态。
8. 写入 `{planPath}`，运行 scene-plan 校验。
9. 校验通过后，遵循 `BEAT-ARCHETYPES.md` 的 Layout 通用契约，并参考所选 layout 的
   `HTML Skeleton` / `CSS Skeleton` / `Motion Direction` 完成 scene 的最终稳定画面，再编写
   `src/scenes/SceneXXX.html/css/js`。
10. 如果当前 creator 内有多个 scene 使用同一 `layout_id`，实现第二个及后续 scene 前必须回看
   同 `layout_id` 的已写 scene，确认本 scene 的 `layout_variant` 在 HTML/CSS 中改变了构图骨架。
   不得复制同一个 skeleton 后只替换文案；必须改变主视觉锚点、grid 比例、阅读路径、主对象位置、
   分区方向、dominant object 面积或辅助信息退让方式中的至少一项。
11. 运行 `validate-scene-js.mjs` 校验当前 creator 的所有 SceneXXX.js。失败时先修正 JS timing，
   不要把错误留到最终 composition 阶段。

layout skeleton 是视觉语法示例，不是固定数量模板。编码阶段只能使用 `visibleContent`、
`headline`、`body`、`screenShouldShow` 中已经声明的内容性文字或对象。如果 layout skeleton 的
槽位多于真实内容，必须删减、合并、重排或更换 layout，禁止为了填满模板新增字幕和 plan 中没有
的概念、标签、指标、步骤或节点。

`layout_variant` 不是只影响 plan 的标签。编码阶段必须落实 variant 的构图差异。比如
`error-symptom-diagnosis / symptom-scan` 可以保留现象扫描为主体；但
`error-symptom-diagnosis / root-cause-lock` 必须让根因成为 dominant object，现象退成侧边 rail、
顶部 strip 或弱态上下文，不能继续使用同一套 symptom -> locator -> root 三栏比例。

## Scene Plan

`{planPath}` 必须是 JSON 数组。每个元素对应一个 scene：

```json
[
  {
    "sceneId": "scene_001",
    "layout_id": "chart-dominant-marker",
    "layout_variant": "right-chart-left-claim",
    "headline": "画面主结论",
    "body": "短标签、节点、数据点、callout 或关系说明",
    "visual_intent": "说明字幕内容如何转成视觉对象",
    "skeleton": "场景开始阶段如何建立主视觉锚点和空间结构的未完成态",
    "screenShouldShow": [
      "最终画面中的图形关系",
      "关键词锚点"
    ],
    "visibleContent": [
      {
        "text": "画面中出现的内容对象",
        "sourceSegments": [0],
        "note": "它在画面中的用途"
      }
    ],
    "focusPlan": [
      {
        "segments": [0],
        "target": "主标题或核心对象",
        "action": "reveal / count-up / 状态确认 / rule 延展 / marker 定位等语义推进"
      }
    ]
  }
]
```

字段要求：

- `sceneId` 必须与当前 scenesData 中某个 scene 的 `id` 完全一致。
- `layout_id` 必须来自 `BEAT-ARCHETYPES.md` 的 Layout Selection Table。
- `layout_variant` 必须来自所选 layout 文件的 `Layout Variants`。所有 layout 文件都必须声明
  具名 variants；不得写 `"default"`。
- `headline` 是画面第一阅读焦点对应的凝练主张。
- `body` 写视觉对象清单、短标签、节点、数据点或关系说明，不写摘要段落。
- `visual_intent` 写观众会看到什么视觉对象、使用哪个 `layout_id` 和 `layout_variant`，
  以及它如何帮助理解；
  同时用自然语言说明本 scene 的 primary visual family，不新增 JSON 字段。
- `skeleton` 描述 scene 开始阶段如何建立主视觉锚点和空间结构的未完成态。
- `visibleContent` 是画面可见内容清单。每项的 `text` 表示画面上承担内容含义的文字、数字、
  节点、图形对象或状态对象；`sourceSegments` 绑定当前 scene 的 segment index；`note` 是自由文本，
  说明该对象在画面中的用途。
- `focusPlan` 只声明 segment 绑定和语义推进动作，不写时间字段。

`visibleContent` 不需要记录装饰性英文 ghost、kicker、纯编号、单位、来源等元信息，除非它们
承载 SRT 语义。编码时不得添加 `visibleContent`、`headline`、`body` 或 `screenShouldShow` 中
没有声明的内容性文字、节点、指标、步骤或对象。

## Layout Selection Ledger

为了避免校验阶段反复打回、再额外读取 layout 文件消耗上下文，creator 必须在读取任何 layout 文件前，
按 `BEAT-ARCHETYPES.md` 的 Layout Selection Table 为全部 scenes 建立 plan-stage selection
ledger。ledger 是正式 plan 流程的一部分，但只存在于推理上下文，不落盘；不要写
`creator-xx.layout.json`、`layout-draft.json` 或其他中间 JSON。

ledger 至少包含：`sceneId`、primary semantic action、family、`layout_id`、`layout_variant`。
creator 必须按 `BEAT-ARCHETYPES.md` 中的重复度约束自检 ledger。若超限，优先重选更匹配语义的
family / `layout_id`，其次才调整 `layout_variant`；不要为了通过重复校验而选择不匹配语义的
layout。

最终只写入正式 `{planPath}`。`validate-scene-plan.mjs` 是重复度、合法 `layout_variant` 和字段契约
的权威校验来源。

## Focus Plan 规则

- 默认每个 segment 对应一个 focus cue。
- 相邻 segments 明显属于同一句连续表达时，可以合并。
- 合并仅允许发生在相邻 segments 之间。
- 禁止跳跃组合，例如 `[0, 2]`。
- 当前 scene 的全部 segments 必须被完整覆盖且只覆盖一次。
- 禁止在 plan 中写 `startMs`、`duration`、`frame`、`absoluteTime`、`startTime` 等第二套时间。
- `action` 必须能让画面从 initial state 推进到最终稳定态；不能只写“闪一下”、
  “变色一下”、“pulse 一下”。

## 片段输出

每个 scene 输出三个文件：

```text
{projectRoot}/src/scenes/Scene001.html
{projectRoot}/src/scenes/Scene001.css
{projectRoot}/src/scenes/Scene001.js
```

HTML：

```html
<section id="scene_001" class="ed-scene" style="opacity: 0;">
  ...
</section>
```

CSS：

```css
#scene_001 .scene-specific-class {
  color: var(--text);
}
```

JS：

```js
registerEdScene("scene_001", ({ tl, scene, storyScene, label, at, cue, q }) => {
  tl.set(q("[data-anim='skeleton']"), { opacity: 0, y: 24 }, at(0));
  tl.to(q("[data-anim='skeleton']"), { opacity: 1, y: 0, duration: 0.45 }, at(180));
});
```

`registerEdScene` 的参数契约：

- `tl`: 最终 composition 传入的唯一 GSAP timeline。
- `scene`: 当前 scene 的 DOM element，即 `document.getElementById(sceneId)`。需要测量布局、
  查找当前 scene 内 DOM 或读取 `offsetTop` / `offsetHeight` 时，可以使用
  `scene.querySelector(...)` / `scene.querySelectorAll(...)`。
- `storyScene`: 当前 scene 的 storyboard 数据对象。它只用于只读语义数据；不要用它计算第二套
  时间。若需要按字幕 segment 对齐动画，必须使用 `cue(segmentIndex, offsetMs)`。
- `label`: 当前 scene id。
- `at(ms)`: 当前 scene 内相对毫秒转全局 timeline position。
- `cue(segmentIndex, offsetMs)`: 当前 scene 的字幕 segment 相对时间转全局 timeline position。
- `q(selector)`: 返回带当前 scene id 作用域的 CSS selector 字符串。

每个 `tl.to`、`tl.from`、`tl.fromTo`、`tl.set`、`tl.call` 都必须显式传入 `at(...)` 或
`cue(...)` 作为 position。creator 只写当前 scene 内的局部时间，不计算全局时间，不读取
`storyScene.startTime`、`storyScene.displayDuration`、`relativeStart` 或 `relativeDuration`
手动拼时间。`scene` 是 DOM element，不是 storyboard 数据；禁止读取 `scene.segments`、
`scene.startTime`、`scene.duration` 或 `scene.displayDuration`。具体 timing 规则以
`TIMING-CANON.md` 为准。

凡是使用 `opacity: 0`、`autoAlpha: 0`、`scale`、`scaleX`、`scaleY`、`x`、`y` 作为入场
起点的目标，必须先在 `at(0)` 写 `tl.set(...)` 锁定初态，再用 `tl.to(...)` 入场。不要把晚于
scene 起点的 `tl.from(...)` / `tl.fromTo(...)` 当作初态声明；最终 composition 会先显示整个
scene，如果元素没有在 `at(0)` 被隐藏，就会先露出再被拉回 from 状态，造成闪烁。

动画选择器必须稳定指向实际渲染对象。重复节点可整体 stagger，或在 HTML 中添加 scene-local
class / data attribute 后分别选择；不要用 `:nth-child()` 猜测节点顺序，尤其不要在 SVG、core
节点和 satellite 节点混排的容器里用它定位单个元素。

`q(...)` 返回 scoped CSS selector 字符串，不是 DOM element。它可以直接传给 GSAP 作为 target；
如果确实需要读取或修改 DOM，必须使用 `document.querySelector(q(...))` 或
`document.querySelectorAll(q(...))`。禁止写 `q(...).querySelectorAll(...)`、
`q(...).textContent`、`q(...).classList` 等把 selector 字符串当 DOM 元素使用的代码。

禁止把 `[data-anim='xxx']:nth-of-type(n)` 当作“第 n 个 data-anim 元素”。`:nth-of-type` 按 tag
兄弟计数，不按属性匹配结果计数，混有 SVG、core node 或其他 div 时容易导致 GSAP target not
found。需要单独动画的重复元素，应添加明确的 scene-local class 或 data attribute。

ghost type 的最终视觉强度由 `--ghost-type-color` 决定。若动画 ghost，淡入目标必须是
`opacity: 1`，不要写任何低于 1 的终态透明度；后续漂移也只动 `x`、`y` 或轻微 `scale`，不要
再次改 opacity。

## 校验

生成 `{planPath}` 后必须执行：

```bash
node "{validateScript}" "{planPath}" "{scenesDataPath}"
```

校验失败时先修正 plan，再实现片段。不要跳过校验。

完成 `src/scenes/SceneXXX.html/css/js` 后必须执行：

```bash
node "{validateJsScript}" "{projectRoot}" "{scenesDataPath}"
```

JS 校验失败时先修正 `at(...)` / `cue(...)`、`q(...)` selector 使用和 scene 内状态覆盖问题，
再返回成功。不要等最终 `validate-ed.mjs` 或 `generate-composition.mjs` 才发现这些问题。

## 完成后返回

成功：

```json
{
  "success": true,
  "globalSkillsRead": ["hyperframes", "gsap", "hyperframes-cli"],
  "planPath": "{planPath}",
  "jsTimingValidated": true,
  "implementedScenes": [
    {
      "sceneId": "scene_001",
      "htmlPath": "{projectRoot}/src/scenes/Scene001.html",
      "cssPath": "{projectRoot}/src/scenes/Scene001.css",
      "jsPath": "{projectRoot}/src/scenes/Scene001.js"
    }
  ]
}
```

失败：

```json
{
  "success": false,
  "error": "失败原因",
  "globalSkillsRead": ["已成功读取的全局 skill"]
}
```
