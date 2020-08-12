# Provide / Inject

> 本指南假定你已经阅读了[Composition API简介](composition-api-introduction.html) 和[响应式基础](reactivity-fundamentals.html)。如果你不熟悉组合API，请先阅读这篇文章。

我们可以使用[provide/inject](component-provide-inject.html)以及Composition API。两者都只能在当前活动实例的 [`setup()`](composition-api-setup.html) 期间调用。

例如，如果要在根组件上提供一个book名称，并将其注入子组件：

```js
import { provide, inject } from 'vue'

const RootComponent = {
  setup() {
    provide('book', 'Vue 3 guide')
  }
}

const MyBook = {
  setup() {
    const book = inject(
      'book',
      'Eloquent Javascript' /* 可选的默认值 */
    )
    return {
      book
    }
  }
}
```

`inject` 接受可选的默认值作为第二个参数。如果未provided默认值，并且在provide上下文中找不到该property，则 `inject` 返回 `undefined`。

如果我们需要提供或注入多个值，我们可以分别通过调用 `provide` 或 `inject` 来实现：

```js{5-6,12-16}
import { provide, inject } from 'vue'

const RootComponent = {
  setup() {
    provide('book', 'Vue 3 guide')
    provide('year', '2020')
  }
}

const MyBook = {
  setup() {
    const book = inject(
      'book',
      'Eloquent Javascript' /* optional default value */
    )
    const year = inject('year')

    return {
      book,
      year
    }
  }
}
```

##  注入响应式

为了保持提供值和注入值之间的响应式，我们可以在提供值时使用 [ref](reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)或 [响应式](reactivity-fundamentals.html#declaring-reactive-state)：

```js
import { ref, reactive } from 'vue'

// in provider
setup() {
  const book = reactive({
    title: 'Vue 3 Guide',
    author: 'Vue Team'
  })
  const year = ref('2020')

  provide('book', book)
  provide('year', year)
}

// in consumer
setup() {
  const book = inject('book')
  const year = inject('year')

  return { book, year }
}
```

现在，当 `book` 或 `year`在 *provider* 组件上被更改时，我们可以观察到它们在注入它们的组件上发生了变化。

::: warning
我们不建议在注入响应式property时对其进行变更，因为它会破坏Vue单向数据流。相反，尝试在提供值的地方对值进行转换，或者提供一个方法来对它们进行转换
```js
import { ref, reactive } from 'vue'

// in provider
setup() {
  const book = reactive({
    title: 'Vue 3 Guide',
    author: 'Vue Team'
  })

  function changeBookName() {
    book.title = 'Vue 3 Advanced Guide'
  }

  provide('book', book)
  provide('changeBookName', changeBookName)
}

// in consumer
setup() {
  const book = inject('book')
  const changeBookName = inject('changeBookName')

  return { book, changeBookName }
}
```

:::
