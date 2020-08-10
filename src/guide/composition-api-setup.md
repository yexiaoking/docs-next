# Setup

> This section uses [single-file component](single-file-component.html) syntax for code examples

> This guide assumes that you have already read the [Composition API Introduction](composition-api-introduction.html) and [Reactivity Fundamentals](reactivity-fundamentals.html). Read that first if you are new to Composition API.

## 参数

使用 `setup` 函数时，它将接受两个参数：

1. `props`
2. `context`

让我们更深入地研究如何使用每个参数。

### Props

`setup` 函数中的第一个参数是 `props` 参数。正如您在标准组件中所期望的那样，`setup` 函数中的 `props` 是响应式的，当传入新的prop时，它将被更新。

```js
// MyBook.vue

export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

:::warning
但是，因为 `props` 是响应性的，你不能**使用ES6解构**，因为它会消除道具的反应性。
:::

如果需要销毁prop，可以通过使用 `setup` 函数中的 [toRefs](reactivity-fundamentals.html#destructuring-reactive-state) 来安全地完成此操作。

```js
// MyBook.vue

import { toRefs } from 'vue'

setup(props) {
	const { title } = toRefs(props)

	console.log(title.value)
}
```

### 上下文

传递给 `setup` 函数的第二个参数是 `context` 。`context` 是一个普通的JavaScript对象，它暴露三个组件 property：

```js
// MyBook.vue

export default {
  setup(props, context) {
    // Attribute (响应式 Property)
    console.log(context.attrs)

    // Slots (响应式 Property)
    console.log(context.slots)

    // Emit 事件 (方法)
    console.log(context.emit)
  }
}
```

因为它是一个普通的JavaScript对象，也就是说，它不是被动的，这意味着您可以安全地对 `context` 使用ES6解构。

```js
// MyBook.vue
export default {
	setup(props, { attrs, slots, emit }) {
		...
	}
}
```

因此，与 `props` 类似，如果需要分解这些property中的任何一个，可以使用 `toRefs` 方法创建类似的效果。

```jsx
// MyBook.vue

import { toRefs } from 'vue'

export default {
	setup(props, { attrs }) {
		const { id } = toRefs(attrs)
		console.log(id.value)
	}
)
```

## 访问组件property

执行 `setup` 时，尚未创建组件实例。因此，你只能访问以下property：

- `props`
- `attrs`
- `slots`
- `emit`

换句话说，你**将无法**访问以下组件选项：

- `data`
- `computed`
- `methods`

## 使用模板

如果 `setup` 返回一个对象，则可以在组件的模板中访问该对象的property：

```vue-html
<!-- MyBook.vue -->
<template>
  <div>{{ readersNumber }} {{ book.title }}</div>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })

      // expose to template
      return {
        readersNumber,
        book
      }
    }
  }
</script>
```

注意，从 `setup` 返回的[refs](../api/refs-api.html#ref) 在模板中访问时是[automatically unwrapped](../api/refs-api.html#access-in-templates)，因此不应在模板中使用 `.value` 。


## 使用渲染函数

`setup`还可以返回一个渲染函数，该函数可以直接使用在同一作用域中声明的响应式状态：

```js
// MyBook.vue

import { h, ref, reactive } from 'vue'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // Please note that we need to explicitly expose ref value here
    return () => h('div', [readersNumber.value, book.title])
  }
}
```

## 使用 `this`

**在 `setup()` 内部，`this` 不会引用Vue实例**，因为在解析其他组件选项之前调用了 `setup()` ，因此 `this` 内部 `setup()` 的行为与其他选项中的 `this` 完全不同。在使用 `setup()` 和其他选项API时，这可能会导致混淆。
