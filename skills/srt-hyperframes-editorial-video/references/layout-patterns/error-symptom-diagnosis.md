# error-symptom-diagnosis

family: `error`

适用：异常现象、原因诊断、失败定位、从表象到根因。

## Layout Contract

- 画面必须同时呈现可见现象和原因判断。
- 现象区应表现异常、混乱、错位或失败信号；原因区应给出明确诊断。
- 中间必须有定位动作，例如扫描线、定位线、锁定 marker 或高亮路径。
- 最终焦点应停在原因或处理方向上。
- 禁止做成原因列表、普通问答页或只有报错文字的画面。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 error family 内现象、定位动作和根因锁定方式；
异常现象和诊断必须来自真实内容。

- `symptom-scan`：默认现象区被扫描并定位异常。适合从表面问题进入诊断。
  扫描动作必须停在真实问题点。
- `root-cause-lock`：根因作为主视觉被锁定，现象退为上下文。适合字幕直接指出原因时。
  lock marker 最终保持稳定。
- `split-symptom-cause`：现象和原因左右或上下分区，中间定位动作连接二者。适合现象和原因都需要阅读。
  连接不能变成自由箭头。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 现象、原因、修正动作和结果按真实故障叙述生成；不要为了完整诊断图而补不存在的症状或修复步骤。

## Motion Direction

适合帮助观众从表象跳到原因。

动作组合：

- 现象区先出现，异常信号以弱动效或错位线建立。
- 定位线从现象区指向原因区。
- 原因区被框定、提亮或出现 callout。
- 最终保留原因判断和下一步动作。

节奏特点：先让观众看到“哪里不对”，再带他看“问题通常在这里”。

## Use When

内容是在讲软件报错、生成失败、效果异常、音画不同步、输出质量差、提示词失效等问题背后的原因。

## Design Intent

右侧主结构是三段：现象区、定位线、原因区。现象区呈现异常信号，原因区以 accent 边框确认根因，
中间定位线把二者连接成可理解的诊断路径。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad es-layout">
    <span class="ed-ghost-type es-ghost" data-anim="ghost">Root</span>
    <div class="es-wrap">
      <aside class="es-copy">
        <span class="ed-kicker label-mono es-kicker" data-anim="kicker">SYMPTOM TO CAUSE</span>
        <h1 class="serif-cn es-title" data-anim="headline">看到这个现象，问题通常在<span class="ed-accent">这里</span></h1>
        <p class="ed-subline es-sub" data-anim="subline">从可见异常定位真正原因。</p>
      </aside>
      <main class="es-stage" data-anim="stage">
        <div class="es-diagnosis">
          <div class="es-symptom" data-anim="symptom">
            <small>SYMPTOM</small>
            <strong>画面节奏突然变乱</strong>
            <div class="es-lines"><i></i><i></i><i></i><i></i></div>
          </div>
          <div class="es-locator" data-anim="locator"></div>
          <div class="es-root" data-anim="root">
            <small>LIKELY CAUSE</small>
            <strong>字幕切分过粗</strong>
            <p>先把机制解释和行动建议拆成两个 scene。</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .es-layout { position: relative; }
#scene_xxx .es-wrap { height: 100%; display: grid; grid-template-columns: 0.58fr 1.42fr; gap: 76px; align-items: stretch; }
#scene_xxx .es-copy { display: flex; flex-direction: column; padding-top: 6px; }
#scene_xxx .es-kicker { margin-bottom: 34px; }
#scene_xxx .es-title { margin: 0; font-size: 76px; line-height: 1.08; letter-spacing: 0.045em; }
#scene_xxx .es-sub { margin-top: 34px; max-width: 28ch; font-size: 23px; line-height: 1.62; }
#scene_xxx .es-stage { align-self: center; }
#scene_xxx .es-diagnosis { position: relative; height: 650px; display: grid; grid-template-columns: 1fr 170px 0.9fr; align-items: center; }
#scene_xxx .es-symptom { height: 430px; border: var(--rule-w) var(--rule-style) var(--rule); padding: 42px; background: linear-gradient(160deg, var(--surface-2), transparent); }
#scene_xxx .es-symptom small,
#scene_xxx .es-root small { font-family: var(--font-mono); font-size: 15px; letter-spacing: 0.24em; color: var(--text-mute); text-transform: uppercase; }
#scene_xxx .es-symptom strong,
#scene_xxx .es-root strong { display: block; margin-top: 30px; font-family: var(--font-display-cn); font-size: 56px; line-height: 1.12; letter-spacing: 0.04em; }
#scene_xxx .es-lines { margin-top: 54px; display: grid; gap: 18px; }
#scene_xxx .es-lines i { height: 18px; width: 72%; background: var(--rule); display: block; }
#scene_xxx .es-lines i:nth-child(2) { width: 92%; transform: translateX(42px); background: var(--accent); }
#scene_xxx .es-lines i:nth-child(3) { width: 55%; }
#scene_xxx .es-lines i:nth-child(4) { width: 86%; transform: translateX(24px); }
#scene_xxx .es-locator { height: 2px; background: var(--accent); position: relative; }
#scene_xxx .es-locator::before,
#scene_xxx .es-locator::after { content: ""; position: absolute; top: 50%; width: 18px; height: 18px; border-radius: 50%; border: var(--rule-w) var(--rule-style) var(--accent); transform: translateY(-50%); background: var(--surface); }
#scene_xxx .es-locator::before { left: -9px; }
#scene_xxx .es-locator::after { right: -9px; }
#scene_xxx .es-root { min-height: 350px; border: var(--rule-w) var(--rule-style) var(--accent); padding: 42px; background: var(--surface); }
#scene_xxx .es-root p { margin: 24px 0 0; color: var(--text-mute); font-size: 22px; line-height: 1.55; }
#scene_xxx .es-ghost { right: 54px; bottom: 22px; font-size: 210px; }
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `subline`, `stage`, `symptom`, `locator`, `root`.

## Do Not Change

不要把原因区做成多个同权原因；不要让定位线变成自由连线网络；不要停留在现象描述而不给原因判断。
