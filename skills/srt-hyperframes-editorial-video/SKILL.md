---
name: srt-hyperframes-editorial-video
description: SRT 字幕驱动的 HyperFrames + GSAP生成Editorial风格的视频。当用户说"根据 SRT 字幕文件制作 HyperFrames 动画"，或者用户说"制作HyperFrames视频"，并提供SRT字幕文件时，使用这个skill"
---

# HyperFrames Editorial Video

把 SRT 字幕文件制作成 HyperFrames + GSAP 的 Editorial 风格视频。只支持 SRT 输入。

调用本 skill 时，用户必须提供 SRT 字幕文件路径。没有 `srtPath` 时，主 Agent 必须先暂停并
要求用户提供 `.srt` 文件路径。

制作前必须先选择主题：

- 暗色风格（`dark-editorial`）
- 牛皮纸风格（`kraft-editorial`）
- 克莱因蓝风格（`klein-blue`）
- 鼠尾草绿风格（`sage-green`）

## SubAgent 使用授权与硬性要求

当用户要求“使用 HyperFrames，根据 SRT 字幕生成视频”或以其他方式触发本 skill 时，视为用户
已经显式要求按本 skill 工作流使用 SubAgent。主 Agent 不得因为通用工具说明中“仅在用户明确
要求 sub-agent 时使用”的限制而跳过本 skill 规定的 SubAgent 阶段。

第 3 步和第 4 步是强制 SubAgent 阶段。若当前运行环境没有可用 SubAgent 工具，主 Agent 必须
立即暂停并向用户说明阻塞原因，不得降级为主 Agent 自行完成这些阶段。

## 核心原则

- SRT 时间是唯一时间事实源。
- AI 只负责语义分组、视觉转译和局部场景设计。
- 脚本负责 SRT 解析、连续性校验、相对时间计算、creator 分片、scene-plan 校验和最终
  composition 组装。
- creator 不直接修改最终 `index.html`，只写独立 scene 片段。

## Path Contract

主 Agent 和所有 SubAgent 统一使用绝对路径：

- `skillRoot`: 当前 `srt-hyperframes-editorial-video` 目录绝对路径
- `referencesRoot`: `{skillRoot}/references`
- `scriptsRoot`: `{skillRoot}/scripts`
- `themesRoot`: `{skillRoot}/themes`
- `srtPath`: 用户提供的 SRT 文件绝对路径
- `projectBaseDir`: `{dirname(srtPath)}/hyperframes-editorial-video-projects`
- `projectRoot`: `{projectBaseDir}/{yyyy-mm-dd-hh-mm-ss}`

强制要求：

- SubAgent prompt 中必须写入展开后的绝对路径，不要只传变量名。
- 阶段协议文档只能从 `referencesRoot` 读取。
- 脚本只能从 `scriptsRoot` 执行。
- 所有运行态状态必须由主 Agent 显式传递。

## 工作流

### 0. 环境预检

进入正式制作前，主 Agent 必须先完成环境预检。预检失败时立即暂停并报告缺失项。

预检命令：

```bash
node --version
npm --version
npx hyperframes --version
ffmpeg -version
```

判定规则：

- `node --version` 必须是 `v22.0.0` 或更高。
- `npm --version` 必须成功输出版本号。
- `npx hyperframes --version` 必须成功输出版本号；若首次执行需要联网下载 CLI，应在正式制作前完成。
- `ffmpeg -version` 必须成功输出版本信息。
- 如果任一预检失败，必须明确告诉用户是哪一项环境不符合要求，并附上失败命令、实际输出或缺失原因。

### 1. 确定主题和 SRT 路径

SRT 字幕文件路径是必须输入条件。用户未提供 SRT 路径时，先暂停并要求用户提供。

用户必须明确选择一个主题。向用户展示主题时优先使用 `theme.json` 中的 `nameZh`，并同时标明
对应 `themeId`：

- 暗色风格（`dark-editorial`）
- 牛皮纸风格（`kraft-editorial`）
- 克莱因蓝风格（`klein-blue`）
- 鼠尾草绿风格（`sage-green`）

如果用户未指定主题，先暂停并要求用户从上述中文风格名中选择；不要默认代选。实际执行脚本时
使用括号内的 `themeId`。

如果用户给的是相对 SRT 路径，主 Agent 必须先解析为绝对路径并确认文件存在。后续所有
步骤统一使用最终确认过的 `srtPath`。

### 2. 初始化项目

执行：

```bash
node "{scriptsRoot}/init-project.mjs" --srt-path "{srtPath}" --theme "{themeId}"
```

脚本会创建 `{dirname(srtPath)}/hyperframes-editorial-video-projects/{timestamp}/`，复制模板样式、
复制主题 token，写入 `.theme`，并创建 `src/scenes/` 与 `scene-plans/`。

### 3. 生成 groups.json 和 storyboard.json

本阶段必须使用 storyboard SubAgent 执行；用户触发本 skill 即视为已显式授权本阶段使用
SubAgent。主 Agent 禁止自行生成 `groups.json` 或直接生成 `storyboard.json` 来替代
storyboard SubAgent。主 Agent 只负责计算并展开：

- `storyboardReference = {referencesRoot}/storyboard-parser.md`
- `storyboardScript = {scriptsRoot}/generate-storyboard.mjs`

SubAgent 先读取 `storyboard-parser.md`，再读取 SRT，按语义和时间生成
`{projectRoot}/groups.json`。随后运行：

```bash
node "{storyboardScript}" "{srtPath}" "{projectRoot}/groups.json" "{projectRoot}/storyboard.json"
```

脚本负责解析 SRT、校验 groups 连续性，并生成 `storyboard.json`。

### 4. 按 creator 分片并并行实现 scene

主 Agent 读取 `{projectRoot}/storyboard.json` 后，必须每 10 个 storyboard scene 分配一个
creator。creator 分片是并行 SubAgent 工作单元，不是主 Agent 的本地实现任务。
creator 命名规则固定：

```js
const creatorId = `creator-${String(index + 1).padStart(2, "0")}`;
```

对每个 creator 执行：

```bash
node "{scriptsRoot}/generate-creator-scenes.mjs" \
  "{projectRoot}/storyboard.json" \
  "{creatorId}" \
  "10" \
  "{projectRoot}/scene-plans/{creatorId}.scenes.json"
```

必须为每个 creator 分片启动独立 creator SubAgent；如果 creator 数量大于 1，必须在同一轮尽量
并行启动全部 creator SubAgent，不要串行启动。每个 creator 只接收自己的 `.scenes.json` 事实源和
`references/scene-creator.md` 协议。全局 skill 和 creator 阶段参考文档由
`scene-creator.md` 按职责和选择结果要求读取，不在主流程重复列出。

主 Agent 禁止直接编写任何 `SceneXXX.html`、`SceneXXX.css` 或 `SceneXXX.js` 文件来代替
creator SubAgent。主 Agent 的职责是分片、启动 creator SubAgent、等待全部 creator 完成、审查
结果、组装 composition 和运行最终校验。

1. 生成 `{projectRoot}/scene-plans/{creatorId}.json`
2. 运行 `validate-scene-plan.mjs`
3. 编写 `{projectRoot}/src/scenes/SceneXXX.html`
4. 编写 `{projectRoot}/src/scenes/SceneXXX.css`
5. 编写 `{projectRoot}/src/scenes/SceneXXX.js`
6. 运行 `validate-scene-js.mjs`

creator 不得修改最终 `index.html`。

给 creator SubAgent 的 prompt 必须保持低噪声。`creatorId` 只用于主 Agent 分片和命名文件，
不要传给 SubAgent，也不要把 scene JSON 内联到 prompt。主 Agent 先展开：

```text
scenesDataPath = "{projectRoot}/scene-plans/{creatorId}.scenes.json"
planPath = "{projectRoot}/scene-plans/{creatorId}.json"
tokensPath = "{projectRoot}/styles/tokens.css"
validateScript = "{scriptsRoot}/validate-scene-plan.mjs"
validateJsScript = "{scriptsRoot}/validate-scene-js.mjs"
```

然后使用推荐模板：

```text
你是 HyperFrames Editorial scene creator，负责 scenesDataPath 中列出的所有 scenes。

## 路径

- projectRoot: "{projectRoot}"
- scenesDataPath: "{scenesDataPath}"
- planPath: "{planPath}"
- referencesRoot: "{referencesRoot}"
- tokensPath: "{tokensPath}"
- validateScript: "{validateScript}"
- validateJsScript: "{validateJsScript}"

## 任务

读取 "{referencesRoot}/scene-creator.md"，按其中协议完成 scene-plan、校验和
SceneXXX.html/css/js 片段实现。全局 skill 和二级参考文档的读取顺序以 scene-creator.md 为准。

scene-plan 校验命令：
node "{validateScript}" "{planPath}" "{scenesDataPath}"

写完 SceneXXX.html/css/js 后的 JS timing 校验命令：
node "{validateJsScript}" "{projectRoot}" "{scenesDataPath}"

不要修改最终 index.html。完成后按 scene-creator.md 的返回格式报告结果。
```

### 5. 组装 HyperFrames composition

所有 creator 完成后执行：

```bash
node "{scriptsRoot}/generate-composition.mjs" \
  "{projectRoot}" \
  "{projectRoot}/storyboard.json"
```

脚本会生成最终 `{projectRoot}/index.html`，创建唯一 paused GSAP timeline，硬切 scene，
并调用每个 scene 片段注册的 builder。

最终 HTML 必须同时服务两套 HyperFrames 事实源：

- GSAP 主 timeline：每个 scene 必须用 `tl.addLabel(scene.id, scene.startTime / 1000)` 注册 label，
  并按 SRT 时间硬切显示。
- Studio/调试时间轴：每个 `<section id="scene_xxx" class="ed-scene">` 必须由
  `generate-composition.mjs` 自动补齐 `class="clip"`、`data-start`、`data-duration` 和
  `data-track-index="0"`。`data-start` 来自 `storyScene.startTime / 1000`；`data-duration`
  对非最后一个 scene 使用“到下一个 scene 的间隔减 0.001 秒”，避免浮点边界被
  `npx hyperframes lint` 判成 `overlapping_clips_same_track`。

creator 片段不需要、也不得手写这些 clip 元数据；它们是最终组装脚本的职责。

### 6. 交付前校验

至少运行：

```bash
node "{scriptsRoot}/validate-ed.mjs" "{projectRoot}/index.html" "{projectRoot}/storyboard.json"
npx hyperframes lint "{projectRoot}"
storyboardDerivedTimes=$(node "{scriptsRoot}/generate-inspect-times.mjs" "{projectRoot}/storyboard.json")
npx hyperframes inspect "{projectRoot}" --at "$storyboardDerivedTimes" --json
```

`generate-inspect-times.mjs` 会从 `{projectRoot}/storyboard.json` 计算 `storyboardDerivedTimes`，
格式为逗号分隔的秒数。时间点覆盖每个 scene 的关键画面：

- scene 开始后约 0.2s。
- skeleton 建立后的稳定点，通常为 scene 开始后约 1.0s，短 scene 可适当提前。
- 每个 segment 的 `scene.startTime + segment.relativeStart` 附近。
- scene 结束前约 0.2s。

`inspect` 不使用 `--strict`；errors 必须修复，warnings 由主 Agent 结合语义判断是否需要修复。

`npx hyperframes lint` 必须达到 `errorCount: 0`。尤其不得出现：

- `timed_element_missing_clip_class`
- `overlapping_clips_same_track`

如果重新生成过 scene 数量、`data-start`、`data-duration` 或 `class="clip"`，并且用户正在使用
Studio/调试模式，主 Agent 应备份或清理 `{projectRoot}/.thumbnails`，让调试时间轴重新读取最新
scene clip 索引。优先使用非破坏性备份目录，例如 `.thumbnails.bak-<timestamp>`。

例外：ghost 文字允许刻意溢出画面。若 `inspect` 报出的 `text_box_overflow` 只发生在 ghost
类装饰性大字上，例如 `.ed-ghost-type`、`.sh-ghost`、`.es-ghost` 或语义等价的
ghost heading/text，且主体内容、字幕、图表、标签和关键视觉没有被遮挡或截断，则视为设计允许的
overflow，不要为了消除该错误去调整 ghost 的位置、字号、`bottom`、`overflow` 或裁切方式。
主 Agent 只需在校验总结中注明这些 `text_box_overflow` 属于 ghost 设计溢出并继续渲染。

### 7. 渲染最终视频

交付前校验通过后，执行：

```bash
npx hyperframes render "{projectRoot}" --quality high --output "{projectRoot}/output.mp4" > "{projectRoot}/render.log" 2>&1
node "{scriptsRoot}/validate-render-log.mjs" "{projectRoot}/render.log"
```

最终视频固定输出到 `{projectRoot}/output.mp4`。如果文件已存在，主 Agent 必须先确认当前渲染
是否应覆盖旧文件；不要把最终视频输出到默认 `renders/` 时间戳目录。

渲染完成后必须检查 `{projectRoot}/render.log`。如果日志中出现 timeline 未注册、JS exception、
`q(...)` 被当作 DOM 元素使用、或 GSAP target not found，主 Agent 必须先回到对应
`src/scenes/SceneXXX.js` 修复，再重新运行 `generate-composition.mjs`、交付前校验和 render。
不要只修改最终 `index.html`。

## 数据结构

### storyboard.json

```ts
interface Storyboard {
  totalDuration: number;
  sceneCount: number;
  scenes: {
    id: string;
    startTime: number;
    duration: number;
    displayDuration?: number;
    segments: {
      text: string;
      relativeStart: number;
      relativeDuration: number;
    }[];
  }[];
}
```

## 资源导航

- `assets/template/`：HyperFrames composition 样式模板。
- `themes/`：内置主题，每个主题包含 `theme.json` 和 `tokens.css`。
- `references/storyboard-parser.md`：SRT 到 groups/storyboard 的协议。
- `references/scene-creator.md`：creator 规划和片段实现协议。
- `references/TIMING-CANON.md`：SRT 相对时间和 focus cue 规则。
- `references/VISUAL-SYSTEM.md`：token、primitive class 和主题规则。
- `references/BEAT-ARCHETYPES.md`：layout 索引、图形化选择规则和 layout 通用契约。
- `references/layout-patterns/`：按 `layout_id` 渐进读取的单 layout 详细约束。
- `references/MOTION-CANON.md`：GSAP 与 HyperFrames 通用动画规则。
- `scripts/init-project.mjs`：从 SRT 和主题创建项目。
- `scripts/generate-storyboard.mjs`：从 SRT 和 groups 生成 storyboard。
- `scripts/generate-creator-scenes.mjs`：为 creator 切分局部 scenesData。
- `scripts/validate-scene-plan.mjs`：校验 creator scene-plan。
- `scripts/validate-scene-js.mjs`：在 creator 阶段校验 SceneXXX.js timing。
- `scripts/generate-composition.mjs`：组装最终 `index.html`。
- `scripts/generate-inspect-times.mjs`：从 `storyboard.json` 生成 `inspect --at` 时间点。
- `scripts/validate-ed.mjs`：补充静态检查。
- `scripts/validate-render-log.mjs`：检查最终 render 日志中的黑屏级运行时错误。

## 用户快捷指令

### 生成 4K 60 帧版本

当用户说“将某个视频生成 4K 60 帧版本”、“生成 4K60”、“导出 4k 60fps”等语义等价指令时，
主 Agent 自动执行本流程，不需要重新走 SRT 分组、scene creator 或 composition 生成流程。

先确定 `projectRoot`：

- 如果用户给的是 HyperFrames 项目目录，直接使用该目录。
- 如果用户给的是 `{projectRoot}/output.mp4`、`output.mp4` 或其他位于项目根目录的视频文件，
  且同目录存在 `index.html`，使用该视频文件所在目录作为 `projectRoot`。
- 如果只能拿到孤立视频文件，且无法从同目录推断出 HyperFrames 项目目录，先要求用户提供对应
  HyperFrames 项目目录；`npx hyperframes render` 是从 composition 重新渲染，不是普通视频转码。

执行前若 `{projectRoot}/output-4k.mp4` 已存在，必须先询问用户是否覆盖。未明确同意时不要覆盖。

执行：

```bash
npx hyperframes render "{projectRoot}" \
  --resolution landscape-4k \
  --fps 60 \
  --quality high \
  --output "{projectRoot}/output-4k.mp4" \
  > "{projectRoot}/render-4k.log" 2>&1
node "{scriptsRoot}/validate-render-log.mjs" "{projectRoot}/render-4k.log"
```

说明：

- `landscape-4k` 输出 3840x2160，适用于本 skill 默认的 1920x1080 横屏 composition。
- `--fps 60` 输出 60fps；`--quality high` 用于最终交付。
- 输出文件固定命名为 `{projectRoot}/output-4k.mp4`。
- 渲染完成后必须检查 `render-4k.log`。如果日志中出现 timeline 未注册、JS exception、
  `q(...)` 被当作 DOM 元素使用、或 GSAP target not found，先修复对应
  `src/scenes/SceneXXX.js`，重新运行 `generate-composition.mjs`，再重新渲染 4K 60 帧版本。

### 打开调试模式

当用户说“打开调试模式”、“进入调试模式”、“预览调试”等语义等价指令时，主 Agent 自动执行本流程。
调试模式使用 HyperFrames Studio preview。

先确定 `projectRoot`。如果当前对话没有明确项目目录，先要求用户提供 HyperFrames 项目目录；该目录
必须包含 `index.html`。

随后要求用户提供调试音频文件路径。拿到音频后：

1. 确认音频文件存在。
2. 如果音频不在 `{projectRoot}` 内，复制到 `{projectRoot}/assets/debug-audio{ext}`；如果
   `assets/` 不存在，先创建。
3. 在 `{projectRoot}/index.html` 中查找固定调试音频槽位，并只替换槽位内部内容。正常生成的
   `index.html` 已经预置该槽位；没有音频时槽位为空，不影响 preview 或 render：

```html
<!-- ED_DEBUG_AUDIO_SLOT_START -->
<!-- Debug audio is inserted here during preview-only debug mode. Keep empty for normal renders. -->
<!-- ED_DEBUG_AUDIO_SLOT_END -->
```

插入音频后应变为：

```html
<!-- ED_DEBUG_AUDIO_SLOT_START -->
<audio
  id="ed-debug-audio"
  data-start="0"
  data-track-index="99"
  src="assets/debug-audio.mp3"
  data-volume="1"
></audio>
<!-- ED_DEBUG_AUDIO_SLOT_END -->
```

规则：

- 只在 `ED_DEBUG_AUDIO_SLOT_START` 和 `ED_DEBUG_AUDIO_SLOT_END` 之间写入或移除调试音频。
  不要搜索 `<div id="main">` 或 scene 位置来自行决定插入点。
- 如果槽位中已经有旧调试 `<audio>`，直接替换槽位内部内容，不要重复插入多个 `<audio>`。
- 音频只作为调试辅助，不要写入 `src/scenes/SceneXXX.*`，不要修改 `storyboard.json`，不要重新分组。
- 如果重新运行 `generate-composition.mjs` 覆盖了 `index.html`，它会保留空槽位；需要重新把调试
  音频写入该槽位再 preview。
- 不要调用 `audio.play()`；HyperFrames 负责媒体播放和 timeline sync。

启动 preview：

```bash
npx hyperframes preview "{projectRoot}" --port "{port}"
```

选择一个未占用端口，优先从 `3002` 开始；如果被占用则递增。记录 preview 进程 PID / session，
用于停止调试模式。启动成功后把 Studio URL 告诉用户：

```text
http://localhost:{port}/#project/{project-directory-name}
```

如果 preview 没有自动打开浏览器，则使用系统打开命令打开上述 Studio URL。

调试模式期间，当用户说出“第 N 个场景有什么问题”、“scene_00N 有问题”、“某个画面元素遮挡、
错位、不出现、节奏不对”等具体反馈时：

1. 根据用户描述定位 storyboard scene：优先匹配 `scene_00N`；若用户说“第 N 个场景”，映射到
   `SceneNNN.html/css/js` 和 `scene_00N`。
2. 读取对应 `src/scenes/SceneNNN.html`、`SceneNNN.css`、`SceneNNN.js`、相关 scene-plan 和
   `storyboard.json` 片段。
3. 只修改对应 scene 源文件；不要直接修最终 `index.html` 中拼接后的片段。
4. 重新组装 composition，让 preview 热更新：

```bash
node "{scriptsRoot}/generate-composition.mjs" "{projectRoot}" "{projectRoot}/storyboard.json"
```

5. 重新把调试音频写入固定槽位，因为 `generate-composition.mjs` 会把槽位恢复为空。
6. 保持 preview 运行，让用户在 Studio 中继续查看。调试模式下不要自动运行校验脚本；只有用户明确要求
   检查、验收或渲染前确认时，再运行 `validate-scene-js.mjs`、`validate-ed.mjs` 或
   `npx hyperframes inspect`。

### 停止调试模式

当用户说“停止调试模式”、“关闭调试模式”、“退出调试”等语义等价指令时：

1. 清空 `{projectRoot}/index.html` 中 `ED_DEBUG_AUDIO_SLOT_START` 到 `ED_DEBUG_AUDIO_SLOT_END`
   之间的临时音频，保留槽位注释本身。
2. 停止之前记录的 `npx hyperframes preview` 进程 / session。
3. 不删除用户原始音频文件。`{projectRoot}/assets/debug-audio{ext}` 是调试副本，可保留；只有用户明确要求清理时再删除。
4. 报告调试模式已停止，并说明调试音频已从 timeline 移除。
