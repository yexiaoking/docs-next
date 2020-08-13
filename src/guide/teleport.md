# 传入

Vue 鼓励我们通过将 UI 和相关行为封装到组件中来构建 UI。我们可以将它们嵌套在另一个内部，以构建一个组成应用程序 UI 的树。

然而，有时组件模板的一部分逻辑上属于该组件，而从技术角度来看，最好将模板的这一部分移动到 DOM 中 Vue app 之外的其他位置。例如，由于样式要求，我们希望使用`id="endofbody"`将 `<p id="content">` 从它的深层嵌套位置移动到 `<div>`

```html
<body>
  <div id="app" class="demo">
    <h3>Move the #content with the portal component</h3>
    <div>
      <p id="content">
        This should be moved to #endofbody.
      </p>
      <span>This content should be nested</span>
    </div>
  </div>
  <div id="endofbody"></div>
</body>
```

为此，我们可以使用 Vue 的内置 `<teleport>` 组件：

```html
<body>
  <div id="app" class="demo">
    <h3>Move the #content with the portal component</h3>
    <div>
      <teleport to="#endofbody">
        <p id="content">
          This should be moved to #endofbody.
        </p>
      </teleport>
      <span>This content should be nested</span>
    </div>
  </div>
  <div id="endofbody"></div>
</body>
```

因此，我们将在渲染的 DOM 树中移动 `teleport` 内容：

<p class="codepen" data-height="300" data-theme-id="39028" data-default-tab="html,result" data-user="Vue" data-slug-hash="WNrXYXd" data-preview="true" data-editable="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Teleport">
  <span>See the Pen <a href="https://codepen.io/team/Vue/pen/WNrXYXd">
  Teleport</a> by Vue (<a href="https://codepen.io/Vue">@Vue</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

如你所见， `<teleport>` 的所有子元素将追加到 `<div id="endofbody">`

## 在 Vue 组件中使用

如果 `<teleport>` 包含 Vue 组件，则它仍将是 `<teleport>` 父组件的逻辑子组件：

```js
const app = Vue.createApp({
  template: `
    <h1>Root instance</h1>
    <parent-component />
  `
})

app.component('parent-component', {
  template: `
    <h2>This is a parent component</h2>
    <teleport to="#endofbody">
      <child-component name="John" />
    </teleport>
  `
})

app.component('child-component', {
  props: ['name'],
  template: `
    <div>Hello, {{ name }}</div>
  `
})
```

在这种情况下，即使在不同的地方渲染 `child-component` ，它仍将是 `parent-component` 的子级，并将从中接收 `name` prop。

这也意味着来自父组件的注入按预期工作，并且子组件将嵌套在 Vue Devtools 中的父组件之下，而不是放在实际内容移动到的位置。

## 在同一目标上使用多个传送

A common use case scenario would be a reusable `<Modal>` component of which there might be multiple instances active at the same time. For this kind of scenario, multiple `<teleport>` components can mount their content to the same target element. The order will be a simple append - later mounts will be located after earlier ones within the target element.

一个常见的用例场景是一个可重用的 `<Modal>` 组件，它可能同时有多个实例处于活动状态。对于这种情况，多个 `<teleport>` 组件可以将其内容挂载到同一个目标元素。顺序将是一个简单的追加 —— 稍后挂载将位于目标元素中较早的挂载之后。

```html
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

你可以在[API reference](../api/built-in-components.html#teleport)查看 `teleport` 组件。