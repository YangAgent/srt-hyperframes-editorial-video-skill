# Layout Selection Guide

`storyboard scene` 对应一个 `.ed-scene`；SRT 内部拍点由 `focusPlan` / `focusCue`
表达。creator 先通过本文的 Layout Selection Table 选择 `family`、`layout_id` 和
`layout_variant`，自检重复度约束后，再只读取实际使用到的
`references/layout-patterns/<layout_id>.md`。

本文件只负责 layout 选择索引、图形化思考和所有 layout 共用的实现契约。具体 slot、
HTML/CSS skeleton、motion direction 和 layout 专属禁令只写在单个 layout 文件中。
不要一次性读取整个 `layout-patterns/` 目录。

## 选择规则

- 开工先问四件事：这段字幕真正要观众看懂什么？它能被看成关系、大小、方向、顺序、定位、
  分组、前后状态或机制吗？这一幕最值得放大的 1 个主对象是什么？画面能否比字幕多提供一个
  可见细节，例如数字、标签、证据点、状态差异或机制部件？
- 画面要演事情，不只是把字幕打字上屏。非文字主导 scene 的 `body` 应写可执行视觉对象、
  短标签、数据点、节点、证据点或状态差异，不写抽象形容词或字幕摘要。
- 让 LLM 自己决定具体画面对象，但必须落入下方某个 `layout_id`。图形化优先只在它能产生清楚的
  数据、趋势、流程、因果、机制、对比、证据、状态变化或结构关系时成立。如果图形化会变成
  牵强扫描、无意义节点、装饰性路径或一堆弱标签，应选择文字主导 layout。
- 非文字主导 layout 必须有真实主视觉对象：数字、图表、连续进程轴、时间轴、中缝分栏、
  压力带、中心模型、证据主体或状态转化结构。禁止只用均分矩形、节点阵列、大边框、
  卡片网格或简单文字罗列承载语义。
- layout 是高保真视觉架构，不是 wireframe，也不是固定元素清单。creator 必须保留所选 layout 的
  核心构图语法、主视觉关系、标题组位置、阅读路径、ghost type、hairline 和单点 accent 逻辑。
- `layout_id` 表示语义家族；`layout_variant` 只改变同一语义家族内的构图、阅读路径和主视觉锚点，
  不能改变 layout 的语义边界，也不能把一个 layout 自由混搭成另一个 layout。
- 当相邻或近邻 scene 必须重复同一 `layout_id` 时，应优先切换 `layout_variant` 拉开视觉节奏。
- 当前 creator 内的 scene-plan 会被 `validate-scene-plan.mjs` 做本地重复度硬校验。写 plan 前必须
  先用 Layout Selection Table 完成当前分片的 layout selection ledger，并按表格下方的重复度约束
  自检。
- 当某个 layout 或 family 已接近上限时，优先选择更具体的语义 family：`rule-*` 表达规则边界，
  `decision-*` 表达路径选择，`formula-*` 表达组成关系，`evidence-*` 表达证据定位，
  `transform-*` 表达前后变化，`error-*` 表达异常诊断或修复。
- `statement-*` 不应成为默认兜底；只有句子本身就是最佳视觉对象时才使用。`compare-*` 过多时，
  必须判断当前内容是否其实更适合 `rule-*`、`decision-*`、`transform-*` 或 `error-*`。
- ghost type 属于统一背景材质。layout 可以决定 ghost 文案、位置、字号比例、贴边裁切和
  transform，但不得重写 `.ed-ghost-type` 的字体、颜色、透明度、字重、字距或 line-height。
- 相邻 scene 应优先选择不同 `layout_id` 拉开节奏。只有当两段内容确实需要同一视觉结构时，才允许
  连续使用同一 `layout_id`，并需在 `visual_intent` 中说明为什么不能换型。
- 文字主导 layout 不是默认兜底。强判断、情绪冲击、行动号召、转场提问、总结句、必须完整阅读的
  核心表达，如果句子本身就是最佳视觉对象，应直接选择文字主导 layout。因为“不知道怎么画”而退回
  文字主导 layout 是失败；为了避免文字主导而硬做弱图形同样是失败。
- 数字、比例、排行、计数、明确量化结果：优先 `data-*` 或 `chart-*`。
- 趋势、阶段推进、增长、衰减、历史变化：优先 `chart-*` 或 `timeline-*`。
- 流程、系统链路、步骤、工作流：优先 `process-*`。
- 因果、原因、阻力、为什么：优先 `cause-*`、`process-*` 或 `transform-*`。
- 心理机制、概念解释、认知偏差或解释模型：优先 `concept-*`、`cause-*` 或 `transform-*`。
- 新旧对比、before/after、两种选择、优劣变化：优先 `compare-*` 或 `transform-*`。
- 多候选比较、A/B/C 方案比较、工具/模板/模型横向选择：优先 `compare-multi-option-board`；不要硬塞
  二分 before/after。
- 速度 vs 质量、成本 vs 效果、简单 vs 可控等二维取舍：优先 `compare-tradeoff-matrix`。
- 罗列、分类、特征并列、优先级：优先 `list-*`。`list-*` 不是 checklist、process、decision 或
  formula；没有检查动作、步骤推进、筛选条件或组合结果时，不要强行使用这些 family。
- 术语解释、概念定义、“是什么 / 不是什么 / 应该如何理解”：优先 `definition-*`。如果重点是解释模型
  内部关系，才使用 `concept-*`；如果只是强判断句，才使用 `statement-*`。
- 具体 case 举例、用一个场景说明一句话：优先 `example-*`。如果画面主对象是真实证据、截图、引用或
  来源定位，才使用 `evidence-*`；如果是错误 / 正确做法，优先 `rule-correct-wrong-example`。
- 证据、案例、引用、截图要点、来源定位：优先 `evidence-*`。生活经历、情境引入、开场提问不是
  天然 evidence；没有真实证据主体、截图、引用、来源或可标注局部时，不要使用 `evidence-*`。
- 行动建议：如果是短口号、结论句或需要被完整读到的提醒，使用 `statement-*`。如果包含清楚的
  前后状态、行为变化或替换关系，使用 `transform-*` 或 `compare-*`。
  “请记住 / 所以 / 下次 / 当你”这类语气或触发词优先进入 kicker、headline 或 subline，
  不得作为底部 label、caption 或 final-label。
- 教程中的阈值判断、质量边界、风险边界、是否升级策略：优先 `rule-threshold-decision`。
- 教程中的错误做法、推荐做法、常见误区、正确示例：优先 `rule-correct-wrong-example`。
- 检查项、发布前确认、调试复核、风险项定位：优先 `checklist-risk-scan`。
- 条件判断、根据素材状态或用户条件选择路径：优先 `decision-condition-path`。
- 多个候选项按筛选标准逐层减少，最终得到推荐候选：优先 `decision-criteria-shortlist`。
- 现象、异常、失败状态到原因诊断：优先 `error-symptom-diagnosis`。
- 修正前、修正动作、修正后结果：优先 `error-fix-before-after`。
- 输入要素组合成结果、方法配方、提示词组成：优先 `formula-input-to-result`。
- 多个因素中聚焦一个关键变量：优先 `formula-key-variable-focus`。
- 软件教程、工具教程中的连续操作步骤和当前步骤：优先 `sequence-operation-steps`。
- 长教程中的当前章节、当前进度、下一步提示：优先 `chapter-current-progress`。

## Video Text Hierarchy Contract

本 skill 输出的是 1920x1080 视频，不是网页、仪表盘或 slide 脚注系统。文字必须像杂志视频
排版一样形成清楚的阅读组。

- 禁止 orphan copy：内容性文字不能孤立出现在画面边角、底部，或远离 headline、图形主体、
  状态容器、轴线、节点、quote 的位置。
- 禁止 footnote-style copy：SRT 内容句、结论句、行动提示、心理解释不能被做成
  `source`、`caption`、`final-label`、`meta rail` 中的 16-24px 小字。
- `caption` / `source` / `meta rail` 只承载真实元信息：来源、单位、时间、编号、索引或极短
  分类标签。它们不能承载字幕里的语义内容。
- 来自 SRT 语义内容的文字必须进入 headline、subline、structure label、result label、callout、
  axis label、state label 或 quote line。
- `.label-mono` 只用于 kicker、编号、单位、来源、极短英文/数字元标签；不得承载中文内容句。
- 内容性中文文字最低使用 `--type-body-min`。结论、结果、行动建议、状态变化结果应使用
  `--type-result` 或 headline 档位。
- kicker 是例外：它可以使用小号 mono 风格，但必须贴靠 headline 组，不能独立出现在底部或角落。
- 如果某个辅助短语找不到明确父对象，应删除、并入 headline/subline，或更换 layout。

## Layout 通用契约

- 每个 scene 必须有主视觉锚点：大标题、大数字、核心短语、关键对象、状态对比或关系结构。
- 每个 scene 只放大 1 个 primary object，最多 1-2 个辅助读数或辅助标记；不要把字幕里所有
  概念都搬上屏。
- 每个 scene 必须有至少一个 final accent / focus confirmation：关键词、数字、marker、active
  node、selected side、final state、crop frame 或 highlight 都可以，但不能整场没有被确认的视觉焦点。
  accent 的状态时机以 `TIMING-CANON.md` 为准。
- 每个 scene 必须使用一个平级 `layout_id` 对应的高保真 layout；不要自由混搭其他 layout 的主结构。
- 每个 scene 必须写入合法 `layout_variant`。具体 variants 以所选 layout 文件为准；所有 layout
  文件都必须声明具名 variants，禁止使用 `default`。
- `layout_variant` 必须在最终 HTML/CSS 中体现为真实构图差异，而不是只改 plan 字段、文字内容或动画节奏。
  同一 `layout_id` 在同个 creator 内重复使用时，后一个 scene 必须明显改变至少一种结构骨架：
  主视觉锚点、grid 比例、阅读路径、主对象位置、分区方向、dominant object 面积或辅助信息退让方式。
- 采用 layout 后，以对应 `HTML Skeleton` 和 `CSS Skeleton` 为视觉架构起点，复用核心布局框架和视觉层级。
- skeleton 是 variant 的起点，不是所有 variants 的共同终点。选择某个 variant 后，必须按该 variant 的
  构图说明改造 skeleton；禁止不同 `layout_variant` 生成几乎相同的 HTML/CSS，只替换文案。
- 内容优先于模板完整度。可以替换、删减、合并或重排辅助文案、节点数量、SVG 图形、证据内容、
  局部尺寸和说明行数；不要为了填满 prototype 示例而伪造指标、步骤、时间点、证据或标签。
- 调整内容填充时，不要破坏 layout 的主轴方向、核心视觉关系、headline 对齐、阅读路径和
  designer prototype 的整体美感。
- JS 动画只绑定实际渲染出来的 `data-anim` hooks；不要为了满足 hook 名单制造空元素，也不要
  临时发明一套与骨架无关的动画目标。
- primary object 对应一个 primary visual family，例如 `headline`、`number`、`bar`、`curve`、
  `state container`、`timeline`、`process rail`、`core model`、`evidence`。
  同一 scene 中可以有辅助元素，但只能服务 primary visual family。
- 大型视觉对象必须来自 `visibleContent`、`body` 或 `screenShouldShow`，包括 chart、曲线、状态容器、
  evidence surface、highlight region、大色块、巨大数字和流程轨道。
- layout skeleton 是视觉语法示例，不是固定数量模板。可见内容对象、列表项、节点、步骤、候选项、
  检查项、指标和标签必须按 `visibleContent` 的真实内容增减，禁止为了填满 skeleton 示例新增概念。
- headline、body、result、meta、focus 应落入所选 layout 的对应阅读区域。内容性文字不能进入
  `source`、`caption` 或 `meta rail`，除非它已经被改写成真实元信息。
- body 中的主图形对象应进入 layout 的主视觉区域，并占据主视觉面积；曲线、图表、状态容器、
  流程轨道不能被画成小 inset，除非 layout 明确允许。
- 主视觉区域内只能有一个 dominant visual object。bar、curve、巨大数字、状态容器、
  证据主体、流程轨道和节点图不能同权重并列。
- 如果确实需要同时出现两类图形对象，必须明确主次：primary 对象承担画面解释，secondary
  对象只能作为 marker、meta、reference、ghost layer 或贴靠 primary 的辅助读数。
- 不要添加 skeleton、`body` 或 `screenShouldShow` 未声明的大矩形、色块、surface、highlight
  region 或大型图形对象。
- 禁止自由漂浮元素。accent word、formula、meta、callout、marker、subline 必须贴靠标题组、
  图形主体、结构线、状态容器、轴线或节点。不要创建底部脚注区。
- 非纯文字 layout 的元素应贴合 layout 明确给出的 rail、axis、container、zone、band 或 stack；
  禁止用 `position:absolute` 把节点散放到画面四角，除非 layout 明确给出固定槽位。
- layout 必须能承载 `TIMING-CANON.md` 要求的 initial / progression / final 三态。

## Layout Selection Table

在读取任何 `layout-patterns/<layout_id>.md` 前，creator 只能通过下表选择 `family`、`layout_id`
和候选 `layout_variant`。先用表格完成当前 creator 分片的 plan-stage selection ledger，检查重复度约束后，
再读取实际使用到的 layout 文件。

硬性重复度约束：

- 同一 `layout_id + layout_variant` 组合最多出现 1 次。
- 同一 `layout_id` 最多出现 2 次。
- 同一 layout family 通常最多出现 3 次；短分片以 `validate-scene-plan.mjs` 为准。

| family | layout_id | layout_variant | 作用 | 适用场景 |
|---|---|---|---|---|
| statement | `statement-editorial` | `cover-left-anchor` | 左锚定杂志封面式大标题 | 稳定判断、总结、承诺 |
| statement | `statement-editorial` | `center-quote-lockup` | 居中大标题锁定一句核心话 | 一句话就是画面主体的结论 |
| statement | `statement-editorial` | `vertical-rail` | 竖向 rail + 横向大标题 | 原则、命令、章节感主张 |
| statement | `statement-editorial` | `cropped-keyword` | 巨大裁切关键词带动标题组 | 可抽取强关键词的短句 |
| statement | `statement-diagonal-command` | `slash-command` | 斜向压边命令构图 | 停止、转向、砍掉、重选 |
| statement | `statement-diagonal-command` | `edge-pressure` | 标题贴边形成压迫感 | 强提醒、警告、立即行动 |
| statement | `statement-diagonal-command` | `split-impact` | 斜线切分命令词和补充句 | “从 A 切到 B”的决断句 |
| quote | `quote-oversized` | `center-monument` | 居中纪念碑式 quote | 需要完整读完的 takeaway |
| quote | `quote-oversized` | `cropped-mark` | 裁切引号或关键词托住正文 | 情绪强、短而重的句子 |
| quote | `quote-oversized` | `wide-breathing` | 宽版留白的安静 quote | 慢节奏、沉稳结论 |
| quote | `quote-margin-index` | `margin-ledger` | quote + 边注账本系统 | 有出处、编号、日期、关键词索引 |
| quote | `quote-margin-index` | `side-index` | 竖向 index rail + quote | 带章节、主题编号或关键词 |
| quote | `quote-margin-index` | `archive-strip` | 档案条组织来源信息 | 摘录、记录、文件感 quote |
| data | `data-dominant-number` | `center-stat` | 中心巨大数字 | 单个冲击数字、比例、计数 |
| data | `data-dominant-number` | `left-stat-right-proof` | 左数字 + 右支撑读数 | 数字需要上下文证明 |
| data | `data-dominant-number` | `bottom-metric-deck` | 主数字 + 底部辅助指标 | 有 2-3 个真实支撑指标 |
| data | `data-cropped-ruler` | `edge-cropped-scale` | 贴边裁切数字 + 标尺 | 比例、压缩率、损耗、占比 |
| data | `data-cropped-ruler` | `vertical-ruler` | 纵向标尺定位数值 | 上下限、等级、边界判断 |
| data | `data-cropped-ruler` | `horizontal-gauge` | 横向 gauge 显示位置 | 进度、距离、区间位置 |
| chart | `chart-dominant-marker` | `right-chart-left-claim` | 左结论 + 右大图表 | 图表证明一个结论 |
| chart | `chart-dominant-marker` | `full-bleed-chart` | 图表近全画面主导 | 趋势或拐点本身最重要 |
| chart | `chart-dominant-marker` | `cropped-curve-marker` | 放大裁切曲线和 marker | 峰值、异常点、转折点 |
| chart | `chart-interval-stability` | `banded-range` | 稳定带 / 区间带主导 | 波动范围、上下限、稳定区间 |
| chart | `chart-interval-stability` | `stacked-intervals` | 多个区间上下堆叠 | 阶段区间、耗时段、范围对比 |
| chart | `chart-interval-stability` | `threshold-window` | 阈值窗口判断当前区间 | 合格区、风险区、边界判断 |
| process | `process-advancing-spine` | `horizontal-spine` | 横向连续流程轴 | 3-5 步工作流或系统链路 |
| process | `process-advancing-spine` | `stepped-rail` | 阶梯式推进轨道 | 逐步升级、层层加工 |
| process | `process-advancing-spine` | `endpoint-emphasis` | 放大终点结果 | 字幕重点落在最终产出 |
| process | `process-descending-construction` | `diagonal-drop` | 斜向下降加工路径 | 任务一路被加工成结果 |
| process | `process-descending-construction` | `cascade-build` | 瀑布式层层落位 | 多输入或步骤累积成结果 |
| process | `process-descending-construction` | `layered-descent` | 分层向下构建 | 上游材料到输出层的顺序关系 |
| timeline | `timeline-alternating-axis` | `alternating-axis` | 上下交错横向时间轴 | 多阶段沿时间推进 |
| timeline | `timeline-alternating-axis` | `compressed-milestones` | 压缩里程碑轴 | 长时间跨度的关键节点 |
| timeline | `timeline-alternating-axis` | `turning-point-focus` | 放大单个转折点 | 某个关键变化是重点 |
| timeline | `timeline-compressed-tempo` | `compression-band` | 压缩时间带 | 周期缩短、等待减少、节奏加快 |
| timeline | `timeline-compressed-tempo` | `before-after-tempo` | 前后节奏对照 | 旧流程慢、新流程快 |
| timeline | `timeline-compressed-tempo` | `sprint-lanes` | 多条短节奏 lane | 多任务流或批次被压缩 |
| list | `list-priority-stack` | `ranked-column` | 纵向优先级列表 | 最重要三点、从高到低排序 |
| list | `list-priority-stack` | `hero-first-stack` | 第一项作为主视觉 | 先做什么、第一优先级需要放大 |
| list | `list-priority-stack` | `compressed-priority-deck` | 多项压缩成层级 deck | 较多优先项但仍需主次 |
| list | `list-grouped-catalog` | `sectioned-ledger` | 分组账本式分类罗列 | 几类素材、几种情况、类型归纳 |
| list | `list-grouped-catalog` | `two-group-columns` | 两类对象并列分组 | 两组类别、两类情况 |
| list | `list-grouped-catalog` | `cluster-catalog` | 多类别分区 catalog | 多组分类清单、类别目录 |
| list | `list-feature-board` | `single-feature-focus` | 主特征放大，辅助特征贴靠 | 多个特征里聚焦一个关键特征 |
| list | `list-feature-board` | `offset-feature-board` | 主特征与辅助特征错位排布 | 特征并列但需要主次层级 |
| list | `list-feature-board` | `editorial-feature-grid` | 非均分 editorial feature grid | 特征较多但不能做平均网格 |
| compare | `compare-editorial-split` | `vertical-split` | 左右中缝分栏 | before/after、旧方案/新方案 |
| compare | `compare-editorial-split` | `diagonal-split` | 斜向切分对比 | 强烈转向、从混乱切到清晰 |
| compare | `compare-editorial-split` | `top-bottom-split` | 上下状态对照 | 过程前后、输入输出 |
| compare | `compare-editorial-split` | `asymmetric-35-65` | 不对称推荐对比 | 结论明显偏向一侧 |
| compare | `compare-asymmetric-recommendation` | `hero-recommendation` | 推荐侧主视觉 | 新方案明显占主导 |
| compare | `compare-asymmetric-recommendation` | `narrow-before-wide-after` | 窄 before + 宽 after | before/after 转换，after 是记忆点 |
| compare | `compare-asymmetric-recommendation` | `proof-stack-recommendation` | 推荐侧叠放证明点 | 推荐理由比旧侧细节重要 |
| compare | `compare-multi-option-board` | `option-columns` | 多候选横向列 | A/B/C 方案、工具、模板、模型比较 |
| compare | `compare-multi-option-board` | `winner-highlight` | 推荐候选提权 | 多候选中有明确推荐项 |
| compare | `compare-multi-option-board` | `criteria-row-board` | 标准 rail 对齐候选 | 候选需要按同一标准横向比较 |
| compare | `compare-tradeoff-matrix` | `quadrant-map` | 二维象限权衡 | 速度/质量、成本/效果取舍 |
| compare | `compare-tradeoff-matrix` | `axis-tradeoff` | 两条取舍轴为主视觉 | 简单/可控、快/稳等双轴关系 |
| compare | `compare-tradeoff-matrix` | `sweet-spot-marker` | 推荐落点 marker | 需要确认目标区间或平衡点 |
| cause | `cause-pressure-chokepoint` | `left-pressure-right-result` | 压力带 → 阻断点 → 结果 | 清楚单向因果 |
| cause | `cause-pressure-chokepoint` | `center-chokepoint` | 居中放大瓶颈 | 瓶颈本身是主焦点 |
| cause | `cause-pressure-chokepoint` | `diagonal-pressure-flow` | 斜向压力流 | 下坠、失控、被挤压的因果 |
| cause | `cause-stacked-pressure` | `stacked-bands` | 多条压力带叠加 | 多个原因共同压出结果 |
| cause | `cause-stacked-pressure` | `weight-column` | 压力垂直堆成重量柱 | 负担累积、阻力越来越重 |
| cause | `cause-stacked-pressure` | `pressure-slab` | 压力压成 slab 指向结果 | 复杂原因整体压缩成后果 |
| concept | `concept-core-satellite` | `left-copy-orbit` | 左文案 + 右核心卫星图 | 标题解释模型，diagram 承载关系 |
| concept | `concept-core-satellite` | `center-orbit` | 核心居中，卫星环绕 | 核心概念明确、外围项适中 |
| concept | `concept-core-satellite` | `layered-rings` | 核心 + 多层环形结构 | 层级能力、内外圈机制 |
| concept | `concept-core-satellite` | `side-stack-core` | 一侧核心 + 一侧堆叠模块 | 少量模块或 2-3 个关联项 |
| concept | `concept-sectional-layer` | `layered-section` | 分层剖面 | 输入层、能力层、核心层、输出层 |
| concept | `concept-sectional-layer` | `cutaway-core` | 核心 cutaway + 周围层级 | 解释系统内部组成 |
| concept | `concept-sectional-layer` | `vertical-strata` | 纵向地层结构 | 从基础到结果的概念层级 |
| definition | `definition-term-breakdown` | `term-left-breakdown` | 术语锚点 + 拆解说明 | 定义术语、解释概念 |
| definition | `definition-term-breakdown` | `center-term-radial` | 术语居中，拆解项贴靠 | 核心术语需要被完整读到 |
| definition | `definition-term-breakdown` | `keyword-cutaway` | 关键词局部放大拆解 | 把抽象词拆成可见部件 |
| definition | `definition-not-this-that` | `rejected-definition` | 错误定义降权或划掉 | 纠正误解、撤掉错误理解 |
| definition | `definition-not-this-that` | `replacement-lockup` | 正确定义放大确认 | 重新定义、锁定正确理解 |
| definition | `definition-not-this-that` | `two-line-correction` | 不是 X / 而是 Y 的短句纠偏 | “不是 X，而是 Y” |
| evidence | `evidence-annotations` | `document-annotation` | 证据主体 + 局部标注 | 完整截图、文档、案例证明 |
| evidence | `evidence-annotations` | `zoom-callout` | 全貌 + 放大局部 | 证据中的某个细节是重点 |
| evidence | `evidence-annotations` | `side-proof-board` | 证据 + 侧边 proof board | 证据和 1-2 个证明读数并列 |
| evidence | `evidence-final-file-proof` | `hero-file-proof` | 最终文件作为主视觉 | 强调结果对象已经完成 |
| evidence | `evidence-final-file-proof` | `spec-readout` | 交付物 + 规格读数 | 输出格式、尺寸、质量参数证明 |
| evidence | `evidence-final-file-proof` | `delivery-poster` | 交付物 proof poster | 结尾或确认交付场景 |
| example | `example-case-card` | `hero-example` | 具体 case 作为主视觉 | 举例说明、case 引入 |
| example | `example-case-card` | `annotated-example` | case 主体 + 局部关键标注 | 用一个具体场景解释一句话 |
| example | `example-case-card` | `example-result-pair` | case 与结果读数并列 | 示例需要同时看到前后结果 |
| transform | `transform-fragments-to-block` | `scattered-to-block` | 散碎 fragments 到稳定块 | 混乱、碎片到结构化结果 |
| transform | `transform-fragments-to-block` | `split-before-after` | 左右 before/after + seam | 前后状态都需要阅读 |
| transform | `transform-fragments-to-block` | `funnel-compress` | 碎片经漏斗压缩成块 | 筛选、归并、压缩动作 |
| transform | `transform-compression-release` | `center-compressor` | 中心压缩器处理输入 | 处理动作本身是重点 |
| transform | `transform-compression-release` | `cloud-to-output` | 碎片云收拢为输出 | 零散素材或想法整理成产物 |
| transform | `transform-compression-release` | `release-slab` | 压缩后释放结果 slab | 压实后成为可交付结构 |
| rule | `rule-threshold-decision` | `threshold-line` | 阈值线 + 当前 marker | 清楚边界判断 |
| rule | `rule-threshold-decision` | `zone-map` | 多区域规则图 | 多状态规则：观察、调整、处理 |
| rule | `rule-threshold-decision` | `gauge-marker` | 仪表式边界判断 | 等级、风险、质量边界 |
| rule | `rule-correct-wrong-example` | `wrong-right-split` | 错误 / 正确左右分区 | 两种做法并列阅读 |
| rule | `rule-correct-wrong-example` | `corrected-example-focus` | 错误示例被修正为正确示例 | 强调具体改法 |
| rule | `rule-correct-wrong-example` | `rule-lockup` | 最终规则为主视觉 | 字幕重点是可记忆规则 |
| checklist | `checklist-risk-scan` | `side-copy-board` | 左文案 + 右检查板 | 多项扫描且标题需解释目的 |
| checklist | `checklist-risk-scan` | `full-board-callout` | 检查板占据主画面 | 检查项较多，风险定位为主体动作 |
| checklist | `checklist-risk-scan` | `vertical-scan-rail` | 纵向扫描轨道 | 从上到下排查或阶段检查 |
| checklist | `checklist-risk-scan` | `radar-focus` | 中心风险 + 环绕检查项 | 少量检查项围绕核心风险 |
| decision | `decision-condition-path` | `forked-path` | 分叉路径 | 一个条件分出多条行动路线 |
| decision | `decision-condition-path` | `decision-diamond` | 中心判断菱形 + 出口 | 软件教程或流程中的判断点 |
| decision | `decision-condition-path` | `highlighted-route` | 完整路径弱态，当前路线高亮 | 路径较长但只聚焦当前选择 |
| decision | `decision-criteria-shortlist` | `funnel-shortlist` | 漏斗式筛选 | 候选逐层减少得到推荐 |
| decision | `decision-criteria-shortlist` | `criteria-lanes` | 多标准 lane | 标准本身需要被看见 |
| decision | `decision-criteria-shortlist` | `elimination-board` | 候选板逐项降权 | 候选清单比漏斗层级更重要 |
| error | `error-symptom-diagnosis` | `symptom-scan` | 扫描现象定位异常 | 从表面问题进入诊断 |
| error | `error-symptom-diagnosis` | `root-cause-lock` | 锁定根因作为主视觉 | 字幕直接指出原因 |
| error | `error-symptom-diagnosis` | `split-symptom-cause` | 现象和原因分区 | 现象和原因都需要阅读 |
| error | `error-fix-before-after` | `three-stage-fix` | before → fix → after 三段路径 | 完整展示修正过程 |
| error | `error-fix-before-after` | `repair-spotlight` | 放大修正动作 | 改法本身是字幕重点 |
| error | `error-fix-before-after` | `before-after-rebuild` | 前后重建对照 | 结构被重排、替换或对齐 |
| formula | `formula-input-to-result` | `ingredient-grid-output` | 输入网格汇入结果块 | 多个组成部分共同产出结果 |
| formula | `formula-input-to-result` | `equation-rail` | 公式轨道串联输入和结果 | 方法公式、提示词组成、配方结构 |
| formula | `formula-input-to-result` | `mixer-core` | 中心混合区合成输出 | 组合、融合、生成动作 |
| formula | `formula-key-variable-focus` | `variable-spotlight` | spotlight 锁定关键变量 | 变量明确且需要放大影响 |
| formula | `formula-key-variable-focus` | `factors-orbit` | 多因素围绕核心，关键项确认 | 真实因素并列但只有一个关键 |
| formula | `formula-key-variable-focus` | `ranked-dropoff` | 因素递减后聚焦关键变量 | “真正影响的是 X” |
| sequence | `sequence-operation-steps` | `command-rail` | 命令轨道 | 短操作串、命令顺序、工具步骤 |
| sequence | `sequence-operation-steps` | `current-step-zoom` | 当前步骤放大 | 字幕只讲一个关键操作 |
| sequence | `sequence-operation-steps` | `stacked-actions` | 纵向堆叠操作动作 | 连续点击、设置、短任务序列 |
| chapter | `chapter-current-progress` | `chapter-stack` | 已完成、当前、下一步堆叠 | 长视频章节定位 |
| chapter | `chapter-current-progress` | `progress-rail` | 进度 rail + 当前节点 | 长教程中段定位 |
| chapter | `chapter-current-progress` | `current-island` | 当前章节孤岛式主块 | 强调“现在进入这里” |
