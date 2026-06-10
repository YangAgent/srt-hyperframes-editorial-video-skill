# HyperFrames Editorial Video Skill

一个 Claude Code Skill，用于将 SRT 字幕文件自动生成 Editorial 风格的 HyperFrames + GSAP 视频合成。杂志排版美学与动态视频的融合——大号衬线字体、纤细分割线、留白、强调色、ghost 装饰大字、电影级节奏控制。

## 工作流程

```
输入 .srt 字幕文件
  │
  ├─ Step 0:  环境预检（Node v22+、npm、hyperframes CLI、ffmpeg）
  ├─ Step 1:  选择主题 + 确认 SRT 路径
  ├─ Step 2:  初始化项目（init-project.mjs）
  ├─ Step 3:  语义分组 + 生成 storyboard.json（SubAgent）
  ├─ Step 4:  并行 scene 创建（多 SubAgent，每10个scene一个creator）
  ├─ Step 5:  组装 HyperFrames composition（generate-composition.mjs）
  ├─ Step 6:  交付前校验（lint + inspect + validate-ed）
  └─ Step 7:  渲染最终视频（hyperframes render）
```

核心数据流：

```
input.srt
  → [SubAgent] groups.json（语义分组）
  → generate-storyboard.mjs → storyboard.json（完整时间轴）
  → generate-creator-scenes.mjs → creator-XX.scenes.json（分片）
  → [并行 SubAgent] SceneXXX.html + SceneXXX.css + SceneXXX.js
  → generate-composition.mjs → index.html（最终合成）
  → npx hyperframes render → output.mp4
```

## 输出文件

每次运行在 SRT 文件同目录下创建 `hyperframes-editorial-video-projects/{timestamp}/` 目录：

| 文件/目录 | 说明 |
|-----------|------|
| `index.html` | 最终 HyperFrames composition |
| `storyboard.json` | 完整时间轴与 scene 元数据 |
| `groups.json` | SRT 语义分组 |
| `src/scenes/SceneXXX.html` | scene HTML 片段 |
| `src/scenes/SceneXXX.css` | scene 样式片段 |
| `src/scenes/SceneXXX.js` | scene GSAP 动画脚本 |
| `scene-plans/` | creator scene-plan JSON |
| `styles/` | 基础样式 + 主题 token |
| `output.mp4` | 最终渲染视频 |

## 快速开始

### 1. 安装 Skill

通过 `npx skills add` 命令安装本 skill。

### 2. 环境要求

确保以下工具已安装：

| 工具 | 要求 |
|------|------|
| Node.js | v22.0.0 或更高 |
| npm | 正常安装可用 |
| hyperframes CLI | `npx hyperframes --version` 可执行 |
| ffmpeg | 正常安装可用 |

首次使用时 Skill 会自动执行环境预检。

### 3. 使用

在 Agent 中触发 Skill，提供 SRT 字幕文件路径即可：

> 根据 SRT 字幕文件制作 HyperFrames 视频，SRT 文件路径：/path/to/your/subtitles.srt

系统会要求你从 4 个主题中选择一个：

| 主题 | themeId | 风格描述 |
|------|---------|---------|
| 暗色风格 | `dark-editorial` | 暖调浓缩咖啡黑 + 火焰橙强调色，衬线大标题，电影氛围 |
| 牛皮纸风格 | `kraft-editorial` | 温暖牛皮纸底 + 深棕衬线 + 印章棕强调色，纪录片节奏 |
| 克莱因蓝风格 | `klein-blue` | 瑞士国际风灰白底 + 国际克莱因蓝强调色，无衬线，网格驱动 |
| 鼠尾草绿风格 | `sage-green` | 温暖鼠尾草绿 + 棕纸底 + 柔和绿强调色，平静纪录片节奏 |

### 4. 快捷指令

#### 生成 4K 60 帧版本

> 将视频生成 4K 60 帧版本

自动以 `landscape-4k`（3840×2160）+ 60fps 重新渲染，输出 `output-4k.mp4`。

#### 调试模式

> 打开调试模式

启动 HyperFrames Studio preview，支持实时预览和逐场景调试。提供调试音频文件后可同步播放。

> 停止调试模式

关闭 preview 服务，清理调试音频。

## 项目结构

```
skills/srt-hyperframes-editorial-video/
├── SKILL.md                              # Skill 定义（触发条件、完整工作流、约束）
├── assets/
│   └── template/
│       ├── index.html                    # composition 模板
│       └── styles/
│           ├── base.css                  # 基础 CSS：布局、排版基元
│           └── motion.css                # 动画就绪 CSS 默认值
├── references/
│   ├── BEAT-ARCHETYPES.md                # layout 选择指南（41个布局族，120+ 变体）
│   ├── MOTION-CANON.md                   # GSAP 动画规则与约束
│   ├── VISUAL-SYSTEM.md                  # token、primitive class、主题规则
│   ├── TIMING-CANON.md                   # SRT 时间、三态设计、cue/at 辅助函数
│   ├── scene-creator.md                  # creator SubAgent 协议
│   ├── storyboard-parser.md              # storyboard 生成协议
│   └── layout-patterns/                  # 41 个 layout pattern 详细约束文件
├── scripts/
│   ├── init-project.mjs                  # 从 SRT + 主题创建项目
│   ├── generate-storyboard.mjs           # SRT 解析 + groups → storyboard.json
│   ├── generate-creator-scenes.mjs       # 分片 storyboard 为 per-creator 数据
│   ├── validate-scene-plan.mjs           # 校验 scene-plan（layout 多样性、字段完整性）
│   ├── validate-scene-js.mjs             # 校验 scene JS timing 规则
│   ├── validate-ed.mjs                   # 全 composition 校验
│   ├── validate-render-log.mjs           # 检查渲染日志中的致命错误
│   ├── generate-inspect-times.mjs        # 从 storyboard 生成 inspect 时间点
│   ├── generate-composition.mjs          # 从 scene 片段组装最终 index.html
│   └── scene-js-timing-utils.mjs         # 共享 JS timing 校验逻辑
└── themes/
    ├── dark-editorial/
    │   ├── theme.json                    # 主题元数据
    │   └── tokens.css                    # 设计 token（暗色浓缩咖啡 + 火焰橙）
    ├── kraft-editorial/
    │   ├── theme.json
    │   └── tokens.css                    # 设计 token（牛皮纸 + 印章棕）
    ├── klein-blue/
    │   ├── theme.json
    │   └── tokens.css                    # 设计 token（瑞士灰白 + 克莱因蓝）
    └── sage-green/
        ├── theme.json
        └── tokens.css                    # 设计 token（鼠尾草绿 + 棕纸）
```

## 设计原则

- **SRT 时间是唯一时间事实源**：所有 scene 时长、segment 起止均由 SRT 时间戳驱动。
- **AI 负责语义转译，脚本负责确定性计算**：语义分组、视觉转译和局部场景设计由 AI 完成；SRT 解析、连续性校验、时间计算、分片、scene-plan 校验和最终组装全部由脚本执行。
- **多 Agent 并行创建 scene**：每 10 个 storyboard scene 分配一个 creator SubAgent，多个 creator 并行工作。
- **creator 不直接修改最终 index.html**：只写独立 scene 片段，由 `generate-composition.mjs` 统一组装。
- **Editorial 美学**：大号衬线字体、纤细 hairline 分割、大量留白、强调色、ghost 装饰大字、电影级动效节奏。
- **41 个布局族 120+ 变体**：强制布局多样性——同一 layout+variant 最多 1 次，同一 layout 最多 2 次，同一族最多 3 次。
- **三态设计**：每个 scene 有 initial skeleton（未完成态）→ progression（语义焦点 cue）→ final settled（最终态），严格避免闪烁和状态冲突。

## 布局体系

18 个语义类别，41 个布局族：

| 类别 | 布局族示例 |
|------|-----------|
| 陈述 | statement-editorial, statement-diagonal-command |
| 引用 | quote-oversized, quote-margin-index |
| 数据 | data-dominant-number, data-cropped-ruler |
| 图表 | chart-dominant-marker, chart-interval-stability |
| 流程 | process-advancing-spine, process-descending-construction |
| 时间线 | timeline-alternating-axis, timeline-compressed-tempo |
| 列表 | list-priority-stack, list-grouped-catalog, list-feature-board |
| 对比 | compare-editorial-split, compare-asymmetric-recommendation, compare-multi-option-board, compare-tradeoff-matrix |
| 因果 | cause-pressure-chokepoint, cause-stacked-pressure |
| 概念 | concept-core-satellite, concept-sectional-layer |
| 定义 | definition-term-breakdown, definition-not-this-that |
| 证据 | evidence-annotations, evidence-final-file-proof |
| 示例 | example-case-card |
| 转化 | transform-fragments-to-block, transform-compression-release |
| 规则 | rule-threshold-decision, rule-correct-wrong-example |
| 检查清单 | checklist-risk-scan |
| 决策 | decision-condition-path, decision-criteria-shortlist |
| 错误 | error-symptom-diagnosis, error-fix-before-after |
| 公式 | formula-input-to-result, formula-key-variable-focus |
| 序列 | sequence-operation-steps |
| 章节 | chapter-current-progress |

## 依赖

- Node.js v22+
- npm
- HyperFrames CLI（`npx hyperframes`）
- ffmpeg
- GSAP（CDN 加载，无需本地安装）

## 技术细节

### 字体

- Noto Serif SC（中文衬线标题）
- Playfair Display（英文衬线标题）
- Source Serif 4（辅助衬线）
- Noto Sans SC（中文正文）
- IBM Plex Mono（等宽数据标注）

### 设计 Token

每个主题定义约 55 个 CSS 自定义属性，覆盖：颜色（shell、surface、text、accent、ghost）、字体、字号梯度（18px kicker → 320px ghost）、圆角、分割线样式、hero 数字样式、动画时长/缓动、暗角渐变、颗粒纹理。

### 校验管线

5 层校验脚本保障质量：

| 脚本 | 校验内容 |
|------|---------|
| `validate-scene-plan.mjs` | layout 有效性、字段完整性、多样性约束、禁止的 timing key |
| `validate-scene-js.mjs` | position 用法（仅 at/cue）、选择器作用域、cue-skeleton 冲突、延迟入场初始态 |
| `validate-ed.mjs` | composition 结构、timeline 注册、scene clip 元数据、文字层级、hex 颜色警告 |
| `validate-render-log.mjs` | 渲染后：timeline 未注册、JS 异常、GSAP target 缺失 |
| `scene-js-timing-utils.mjs` | 共享 AST-free JS timing 解析器 |
