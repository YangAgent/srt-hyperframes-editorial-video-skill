# Storyboard Parser Reference

本文件是 `srt-hyperframes-editorial-video` 工作流中的“分镜生成阶段”协议，由主 Agent 指派
SubAgent 读取并执行。

## 输入契约

- `skillRoot`: `srt-hyperframes-editorial-video` skill 的绝对路径
- `projectRoot`: 项目根目录绝对路径
- `srtPath`: SRT 文件绝对路径

强制要求：

- 所有输入路径均由主 Agent 提供为绝对路径。
- 不要猜测仓库根目录。
- 不要使用相对路径。
- 不要直接生成 `storyboard.json` 的时间字段；时间字段由脚本计算。

## 输出

1. `{projectRoot}/groups.json`
2. `{projectRoot}/storyboard.json`
3. 返回结构化结果：

```json
{
  "success": true,
  "storyboardPath": "/path/to/storyboard.json",
  "groupsPath": "/path/to/groups.json",
  "sceneCount": 12
}
```

## 工作流程

### 1. 读取并分析 SRT

读取 `srtPath`，记录字幕总条数、每条字幕的开始时间、结束时间和文本。分组时必须结合
字幕时间，不要只看文本条数。

### 2. 语义分组

把连续字幕分组为 storyboard scene。每组对应最终视频中的一个 `.ed-scene`。

分组原则：

- 一个 storyboard scene 只承载一个主语义动作。主语义动作可以是：提出主张、解释机制、
  展示数据结果、建立对比、说明因果、推进流程、定位证据、给出行动结论。
- 当字幕从一种主语义动作切换到另一种主语义动作时，优先拆成新 scene，即使总时长还没有
  达到 12 秒。
- 语义完整。
- 主题一致。
- 单 scene 目标时长为 12-18 秒。
- 短 scene 可以接受。若 5-10 秒内已经形成一个清晰主语义动作，不要为了凑时长把下一层语义
  合并进来。
- 当累计时长接近 15-18 秒时，主动寻找自然边界。
- 若超过 18 秒且存在合理切分点，优先拆分。
- 只有同一连续表达拆开会明显破坏理解时，才允许 18 秒以上。
- 避免超过 25 秒的 scene。
- 避免把“机制解释”和“行动建议”放进同一 scene。
- 避免把“正反对比”和“核心结论/建议”放进同一 scene，除非后者只是对比的短 caption。
- 避免把“不是 A，而是 B”与后续“所以要做 C”合并；前者是判断/机制，后者是行动结论。

优先切分边界：

- 明显停顿。
- 语义转折。
- 从结论切到解释。
- 从解释切到举例。
- 从举例切到总结。
- 从机制解释切到行动建议。
- 从数据结果切到原则/方法。
- 从对比事实切到“关键在于 / 所以 / 因此 / 重要的是”等结论句。
- 出现新的视觉关系或新的信息层级。

弱切分信号：

- 同一句话被拆成多条字幕。
- 连续列举项。
- 同一视觉动作下的补充说明。
- 问答对。

不要把弱切分信号误判成必须合并。只有这些字幕仍服务同一个主语义动作时才合并。

### 粒度示例

下面这类连续字幕应拆成多个 scene：

```text
关键在于
复利的核心不是利率
而是时间
起步早的人
优势会随时间成指数级放大
所以重要的不是一次做多少
而是能不能坚持去做
```

推荐拆分：

```text
scene A: 关键在于 / 复利的核心不是利率 / 而是时间
scene B: 起步早的人 / 优势会随时间成指数级放大
scene C: 所以重要的不是一次做多少 / 而是能不能坚持去做
```

原因：A 是机制判断，B 是时间优势解释，C 是行动结论。三者应分别拥有自己的主视觉锚点。

### 3. 写入 groups.json

只写连续字幕分组，不写时间字段：

```json
{
  "groups": [
    {
      "sceneId": "scene_001",
      "fromIndex": 1,
      "toIndex": 3
    }
  ]
}
```


### 4. 验证分组连续性

必须检查：

1. 第一组 `fromIndex === 1`
2. 每组 `fromIndex === 上一组.toIndex + 1`
3. 最后一组 `toIndex === SRT 总条数`
4. `sceneId` 连续递增：`scene_001`, `scene_002`, ...
5. 每个分组累计时长合理，明显超过 18 秒时回看是否过粗
6. 存在超过 25 秒的分组时优先拆分
7. 每个分组只包含一个主语义动作；如果一个分组同时包含机制判断、数据结果、时间优势解释、
   行动建议等多个动作，必须拆分

### 5. 运行脚本生成 storyboard.json

执行：

```bash
node "{skillRoot}/scripts/generate-storyboard.mjs" \
  "{srtPath}" \
  "{projectRoot}/groups.json" \
  "{projectRoot}/storyboard.json"
```

脚本负责：

- 解析 SRT 时间信息。
- 校验 `groups.json`。
- 计算 `startTime`、`duration`。
- 计算 `segments[].relativeStart`、`segments[].relativeDuration`。
- 生成 `storyboard.json`。

## 完成后返回

成功：

```json
{
  "success": true,
  "storyboardPath": "{projectRoot}/storyboard.json",
  "groupsPath": "{projectRoot}/groups.json",
  "sceneCount": 12
}
```

失败：

```json
{
  "success": false,
  "error": "失败原因"
}
```
