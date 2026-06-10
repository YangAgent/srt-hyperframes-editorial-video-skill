# evidence-annotations

family: `evidence`

适用：多个证据、案例、引用、截图要点、局部证明或来源定位。

## Layout Contract

- prototype 中的证据行、标注和规格读数数量只是示例；按真实证据增减，但保持证据主体主导。
- 证据主体必须占据主区域，annotation 贴靠证据局部。
- 左侧文字组只负责结论和真实元信息，不替代证据。
- 标注若出现，可以使用短 leader line，但必须连接到证据主体附近。
- 禁止没有证据主体时使用本 layout；禁止把证据做成小卡片或角落截图。

## Layout Variants

`layout_variant` 必须选择下列之一。variant 只改变 evidence family 内证据主体和标注的组织方式；
证据、来源和标注必须来自真实内容。

- `document-annotation`：默认文档 / 截图主体 + 局部 annotation。适合证明点来自一个完整证据表面。
  annotation 必须贴靠证据局部。
- `zoom-callout`：证据主体保留全貌，同时放大一个局部。适合字幕重点是证据中的某个细节。
  放大局部不能脱离证据上下文。
- `side-proof-board`：证据主体与一侧 proof board 并列。适合需要展示证据和 1-2 个证明读数。
  proof board 只放真实元信息或短证据点。

## Content Adaptation Contract

- `HTML Skeleton` / `CSS Skeleton` 展示核心视觉语法，不是固定数量模板；不要逐字复制示例内容。
- 可见内容必须来自 scene-plan 的 `visibleContent`、`headline`、`body` 或 `screenShouldShow`；禁止为填满列表、节点、格子、步骤、候选项、检查项或指标而新增概念。
- 按真实内容增减、合并、重排 slot；如果真实内容少于示例，保留主视觉关系并删除多余槽位。
- 证据主体、annotation、规格读数和来源标签必须有真实依据；没有证据细节时减少标注或改用 statement / concept layout。

## Motion Direction

适合证据、引用、截图要点、图片说明和局部证明。

动作组合：

- 证据主体先安静显现。
- scan line、marker ring 或 highlight rect 定位关键区域。
- callout 线条绘制到标签。
- source / citation 稍后落位，强化可信度。

节奏特点：像编辑把观众视线带到证据上，而不是把证据一次性堆满。

## Design Intent

左侧是一组编辑式标题和元信息，右侧大面积展示证据主体，例如运行日志、截图、表格局部或引用原文。
证据内部有局部高亮；annotation 位于证据左侧，短 leader line 从标注贴向关键行/区域。观众先看到
右侧大证据主体，再沿 leader 读到左侧标注。

## HTML Skeleton

```html
<section id="scene_xxx" class="ed-scene" style="opacity: 0;">
  <div class="scene-pad ev-layout">
    <span class="ed-ghost-type ev-ghost" data-anim="ghost">Proof</span>
    <div class="ev-left">
      <span class="ed-kicker label-mono ev-kicker" data-anim="kicker">EVIDENCE</span>
      <h1 class="serif-cn ev-title" data-anim="headline">证据本身，<br>就是最好的说明</h1>
      <div class="label-mono ev-meta" data-anim="source-meta">SOURCE · REAL META</div>
    </div>
    <div class="ev-stage" data-anim="evidence-stage">
      <div class="ev-shot" data-anim="evidence">
        <div class="ev-bar"><span class="d"></span><span class="d"></span><span class="d"></span><span class="ttl">evidence.log</span></div>
        <div class="ev-body">
          <span class="ln">普通证据行</span>
          <span class="ln ev-hl" data-anim="highlight">关键证据行 <span class="ok">done</span></span>
          <span class="ln">普通证据行</span>
          <span class="ln ev-hl" data-anim="highlight">关键证据行 <span class="ok">ready</span></span>
        </div>
      </div>
      <span class="ev-leader l1" data-anim="leader"></span>
      <div class="ev-annot a1" data-anim="annotation">
        <div class="an-k label-mono">MARK A</div><div class="an-t">贴靠证据局部的说明</div>
      </div>
      <span class="ev-leader l2" data-anim="leader"></span>
      <div class="ev-annot a2" data-anim="annotation">
        <div class="an-k label-mono">MARK B</div><div class="an-t">贴靠证据局部的说明</div>
      </div>
    </div>
  </div>
</section>
```

## CSS Skeleton

```css
#scene_xxx .ev-layout {
  position: relative;
  display: grid;
  grid-template-columns: 0.62fr 1.38fr;
  gap: 80px;
  align-items: center;
}
#scene_xxx .ev-left {
  align-self: stretch;
  display: flex;
  flex-direction: column;
}
#scene_xxx .ev-kicker {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 30px;
  color: var(--text-mute);
  letter-spacing: 0.32em;
}
#scene_xxx .ev-kicker::before {
  content: "";
  width: 44px;
  height: 2px;
  background: var(--accent);
}
#scene_xxx .ev-title {
  margin: 0;
  font-size: 66px;
  line-height: 1.08;
}
#scene_xxx .ev-meta {
  margin-top: auto;
  margin-bottom: 80px;
  padding-top: 28px;
  border-top: var(--rule-w) var(--rule-style) var(--rule);
  color: var(--text-mute);
  font-size: 17px;
  line-height: 2;
}
#scene_xxx .ev-stage {
  position: relative;
  padding-left: 340px;
}
#scene_xxx .ev-shot {
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: var(--surface);
  border: var(--rule-w) var(--rule-style) var(--rule);
  border-radius: var(--r-sm);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.5);
}
#scene_xxx .ev-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 22px;
  border-bottom: var(--rule-w) var(--rule-style) var(--rule);
  color: var(--text-mute);
  font-family: var(--font-mono);
}
#scene_xxx .ev-bar span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--rule);
}
#scene_xxx .ev-bar .ttl {
  margin-left: 14px;
}
#scene_xxx .ev-body {
  padding: 30px 36px;
  font-family: var(--font-mono);
  font-size: 21px;
  line-height: 2.1;
  color: var(--text-2);
}
#scene_xxx .ev-body .ln {
  display: block;
  white-space: nowrap;
}
#scene_xxx .ev-body .ok {
  color: var(--accent);
}
#scene_xxx .ev-hl {
  margin-left: -38px;
  padding-left: 36px;
  background: var(--accent-soft);
  border-left: 2px solid var(--accent);
}
#scene_xxx .ev-annot {
  position: absolute;
  left: 0;
  z-index: 3;
  width: 270px;
  padding: 16px 20px;
  background: var(--shell);
  border: var(--rule-w) var(--rule-style) var(--accent);
  border-radius: var(--r-sm);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.5);
}
#scene_xxx .ev-annot .an-k {
  color: var(--accent);
  font-size: 14px;
  letter-spacing: 0.2em;
  margin-bottom: 8px;
}
#scene_xxx .ev-annot .an-t {
  color: var(--text);
  font-size: 19px;
  line-height: 1.5;
}
#scene_xxx .ev-annot.a1 { top: 92px; }
#scene_xxx .ev-annot.a2 { top: 224px; }
#scene_xxx .ev-leader {
  position: absolute;
  left: 270px;
  z-index: 2;
  width: 70px;
  height: 1px;
  background: var(--accent);
  opacity: 0.6;
}
#scene_xxx .ev-leader.l1 { top: 148px; }
#scene_xxx .ev-leader.l2 { top: 280px; }
#scene_xxx .ev-ghost {
  left: 3%;
  bottom: 2%;
  font-size: 170px;
}
```

## Animation Hooks

`ghost`, `kicker`, `headline`, `source-meta`, `evidence-stage`, `evidence`, `highlight`,
`leader`, `annotation`.

## Do Not Change

不要在没有证据主体时伪造 annotation；不要让标注脱离证据区域；不要把运行证据缩到角落。
