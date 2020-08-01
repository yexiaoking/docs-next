# Props

> 该页面假设你已经阅读过了[组件基础](component-basics.md。如果你还对组件不太了解，推荐你先阅读它。

## Prop 类型

到这里，我们只看到了以字符串数组形式列出的 prop：

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些 property 的名称和值分别是 prop 各自的名称和类型：

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // 或任何其他构造函数
}
```

这不仅为你的组件提供了文档，还会在它们遇到错误的类型时从浏览器的 JavaScript 控制台提示用户。你会在这个页面接下来的部分看到[类型检查和其它 prop 验证](#prop-validation)。

## 传递静态或动态 Prop

这样，你已经知道了可以像这样给 prop 传入一个静态的值：

```html
<blog-post title="My journey with Vue"></blog-post>
```

你也知道 prop 可以通过 `v-bind` 或 简写 `:` 动态赋值，例如：

```html
<!-- 动态赋予一个变量的值 -->
<blog-post :title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post :title="post.title + ' by ' + post.author.name"></blog-post>
```

在上述两个示例中，我们传入的值都是字符串类型的，但实际上任何类型的值都可以传给一个 prop。

### 传入一个数字

```html

<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue     -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post :likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post :likes="post.likes"></blog-post>
```

### 传入一个布尔值

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。          -->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue  -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post :is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。                                -->
<blog-post :is-published="post.isPublished"></blog-post>
```

### 传入一个数组

```html
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue        -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post :comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。                                -->
<blog-post :comment-ids="post.commentIds"></blog-post>
```

### 传入一个对象

```html
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue        -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。             -->
<blog-post
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。                                 -->
<blog-post :author="post.author"></blog-post>
```

### 传入一个对象的所有 property

如果你想要将一个对象的所有 property 都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind`:`prop-name`)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```

## 单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1.这个 **prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用**。在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值：

```js
props: ['initialCounter'],
data() {
  return {
    counter: this.initialCounter
  }
}
```

2. **这个 prop 以一种原始的值传入且需要进行转换**。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

::: tip 提示
注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。
:::

## Prop 验证

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```js
app.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
      default: function() {
        return 'Default function'
      }
    }
  }
})
```

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。

::: tip 提示
注意那些 prop 会在一个组件实例创建**之前**进行验证，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的。
:::

### 类型检查

`type` 可以是下列原生构造函数中的一个：

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
0
- Symbol

此外，`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```js
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

你可以使用：

```js
app.component('blog-post', {
  props: {
    author: Person
  }
})
```
来验证 `author` prop 的值是否是通过 `new Person` 创建的。

## 非 Prop 的 Attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。常见的示例包括 `class` 、`style` 和 `id` 属性。

### Attribute 继承

当组件返回单个根节点时，非prop attribute 将自动添加到根节点的 attribute 中。例如，在日期选择器组件的实例中：

```js
app.component('date-picker', {
  template: `
    <div class="date-picker">
      <input type="datetime" />
    </div>
  `
})
```

如果我们需要通过`data status` property 定义日期选择器组件的状态，它将应用于根节点（即`div.date-picker`）。

```html
<!-- 具有非prop attribute的Date-picker组件-->
<date-picker data-status="activated"></date-picker>

<!-- 渲染 date-picker 组件 -->
<div class="date-picker" data-status="activated">
  <input type="datetime" />
</div>
```

### 禁用 Attribute 继承

如果你**不**希望组件的根元素继承 attribute，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

需要禁用attribute继承时有两种常见情况：

1. 当 attribute 需要应用于根节点之外的其他元素时
2. 当一个组件有多个根节点时

通过将 `inheritAttrs` 选项设置为 `false`，您可以访问组件的 `$attrs` property，该属性包括组件 `props` 和 `emits` 属性中未包含的所有属性（例如，`class`、`style`、`v-on`侦听器等）。

#### 单根节点

使用 [上个章节](#attribute-inheritance) 中的 date-picker 组件示例，如果需要将所有非prop attribute 应用于 `input` 元素而不是根 `div` 元素，则可以使用 `v-bind` 快捷方式来完成。

```js{5}
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
  `
})
```

有了这个新配置， `data status` attribute 将应用于 `input` 元素！

```html
<!-- Date-picker 组件 使用非 prop attribute -->
<date-picker data-status="activated"></date-picker>

<!-- 渲染 date-picker 组件 -->
<div class="date-picker">
  <input type="datetime" data-status="activated" />
</div>
```

#### 多个根节点

与单个根节点组件不同，如果未定义 `inheritAttrs` 和 `$attrs`，则具有多个根节点的组件不会具有自动attribute故障转移行为。如果不这样做，将发出运行时警告

```js{2,5}
app.component('custom-layout', {
  inheritAttrs: false,
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
})
```

## Prop 的大小写 (camelCase vs kebab-case)

HTML 中的 attribute 名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：\

```js
const app = Vue.createApp({})

app.component('blog-post', {
  // camelCase in JavaScript
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!"></blog-post>
```

重申一次，如果你使用字符串模板，那么这个限制就不存在了。
