# 介绍

## 什么是 Composition API?

::: tip 提示
在阅读文档之前，你应该已经熟悉了这两个[Vue基础]((introduction.md)和 [创建组件](component-basics.md)。
:::

通过创建Vue组件，我们可以将接口的可重复部分及其功能提取到可重用的代码段中。仅此一项就可以使我们的应用程序在可维护性和灵活性方面走得更远。然而，我们的经验已经证明，光靠这一点可能是不够的，尤其是当你的应用程序变得非常大的时候——想想几百个组件。在处理如此大的应用程序时，共享和重用代码变得尤为重要。

假设在我们的应用程序中，我们有一个视图来显示某个用户的仓库列表。除此之外，我们还希望应用搜索和筛选功能。处理此视图的组件可能如下所示：

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  data () {
    return {
      repositories: [], // 1
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // 使用`这个用户`获取用户仓库
    }, // 2
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```


该组件有以下几个职责：

1. 从假定的外部API获取该用户名的仓库，并在用户更改时刷新它
2. 使用 `searchQuery` 字符串搜索存储库
3. 使用 `filters` 对象筛选仓库

用组件的选项（`data`、`computed`、`methods`、`watch`）组织逻辑在大多数情况下都有效。然而，当我们的组件变得更大时，**逻辑关注点**的列表也会增长。这可能会导致组件难以阅读和理解，尤其是对于那些一开始就没有编写这些组件的人来说。

![Vue 选项 API: 按选项类型分组的代码](https://user-images.githubusercontent.com/499550/62783021-7ce24400-ba89-11e9-9dd3-36f4f6b1fae2.png)

一个大型组件的示例，其中**逻辑关注点**是按颜色分组。

这种碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

如果我们能够将与同一个逻辑关注点相关的代码配置在一起会更好。而这正是Composition API使我们能够做到的。

## Composition API 基础

Now that we know the **why** we can get to the **how**. To start working with the Compsition API we first need a place where we can actually use it. In a Vue component, we call this place the `setup`.

### `setup` 组件选项

新的 `setup` 组件选项在**创建组件之前**执行，一旦 `props` 被解析，并充当合成API的入口点。

::: warning
由于在执行 `setup` 时尚未创建组件实例，因此在 `setup` 选项中没有 `this`。这意味着，除了`props`之外，您将无法访问组件中声明的任何属性 —— **本地状态**、**计算属性**或**方法**。
:::

`setup` 选项应该是一个接受 `props` 和 `context` 的函数，我们将在[稍后](composition-api-setup.html#arguments) 讨论。 此外，我们从 `setup` 返回的所有内容都将暴露给组件的其余部分（计算属性、方法、生命周期钩子等等）以及组件的模板。

让我们添加 `setup` 到我们的组件中：

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    console.log(props) // { user: '' }

    return {} // 这里返回的任何内容都可以用于组件的其余部分
  }
  // 组件的“其余部分”
}
```

现在让我们从提取第一个逻辑关注点开始（在原始代码段中标记为“1”）。

> 1. 从假定的外部API获取该用户名的仓库，并在用户更改时刷新它

我们将从最明显的部分开始：

- 仓库列表
- 更新仓库列表的函数
- 返回列表和函数，以便其他组件选项可以访问它们

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'

// 在我们的组件内
setup (props) {
  let repositories = []
  const getUserRepositories = async () => {
    repositories = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories // 返回的函数与方法的行为相同
  }
}
```

这是我们的出发点，但它还不能工作，因为我们的 `repositories` 变量不是被动的。这意味着从用户的角度来看，仓库列表将保持为空。我们来解决这个问题！

### 带 `ref` 的响应式变量

在Vue 3.0中，我们可以通过一个新的 `ref` 函数使任何响应式变量在任何地方起作用，如下所示：

```js
import { ref } from 'vue'

const counter = ref(0)
```

`ref` 接受参数并返回它包装在具有 `value` property 的对象中，然后可以使用该 property 访问或更改响应式变量的值：

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```

Wrapping values inside an object might seem unnecessary but is required to keep the behavior unified across different data types in JavaScript. That’s because in JavaScript, primitive types like `Number` or `String` are passed by value, not by reference:

![Pass by reference vs pass by value](https://blog.penjee.com/wp-content/uploads/2015/02/pass-by-reference-vs-pass-by-value-animation.gif)

Having a wrapper object around any value allows us to safely pass it across our whole app without worrying about losing its reactivity somewhere along the way.

::: tip Note
In other words, `ref` creates a **Reactive Reference** to our value. The concept of working with **References** will be used often throughout the Composition API.
:::

Back to our example, let's create a reactive `repositories` variable:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

// in our component
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  return {
    repositories,
    getUserRepositories
  }
}
```

Done! Now whenever we call `getUserRepositories`, `repositories` will be mutated and the view will be updated to reflect the change. Our component should now look like this:

```js
// src/components/UserRepositories.vue
import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup (props) {
    const repositories = ref([])
    const getUserRepositories = async () => {
      repositories.value = await fetchUserRepositories(props.user)
    }

    return {
      repositories,
      getUserRepositories
    }
  },
  data () {
    return {
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

We have moved several pieces of our first logical concern into the `setup` method, nicely put close to each other. What’s left is calling `getUserRepositories` in the `mounted` hook and setting up a watcher to do that whenever the `user` prop changes.

We will start with the lifecycle hook.

### 生命周期钩子注册内部 `setup`

To make Composition API feature-complete compared to Options API, we also need a way to register lifecycle hooks inside `setup`. This is possible thanks to several new functions exported from Vue. Lifecycle hooks on composition API have the same name as for Options API but are prefixed with `on`: i.e. `mounted` would look like `onMounted`.

These functions accept a callback that will be executed when the hook is called by the component.

Let’s add it to our `setup` function:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted } from 'vue'

// in our component
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  onMounted(getUserRepositories) // on `mounted` call `getUserRepositories`

  return {
    repositories,
    getUserRepositories
  }
}
```

Now we need to react to the changes made to the `user` prop. For that we will use the standalone `watch` function.

### `watch` 响应式更改

Just like how we set up a watcher on the `user` property inside our component using the `watch` option, we can do the same using the `watch` function imported from Vue. It accepts 3 arguments:

- A **Reactive Reference** or getter function that we want to watch
- A callback
- Optional configuration options

**Here’s a quick look at how it works.**

```js
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter value is: ' + counter.value)
})
```

Whenever `counter` is modified, for example `counter.value = 5`, the watch will trigger and execute the callback (second argument) which in this case will log `'The new counter value is: 5'` into our console.

**Below is the Options API equivalent:**

```js
export default {
  data() {
    return {
      counter: 0
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log('The new counter value is: ' + this.counter)
    }
  }
}
```

For more details on `watch`, refer to our [in-depth guide]().

**Let’s now apply it to our example:**

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

// in our component
setup (props) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // update `props.user` to `user.value` to access the Reference value
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // set a watcher on the Reactive Reference to user prop
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

You probably have noticed the use of `toRefs` at the top of our `setup`. This is to ensure our watcher will react to changes made to the `user` prop.

With those changes in place, we've just moved the whole first logical concern into a single place. We can now do the same with the second concern – filtering based on `searchQuery`, this time with a computed property.

### 独立的 `computed` 属性

Similar to `ref` and `watch`, computed properties can also be created outside of a Vue component with the `computed` function imported from Vue. Let’s get back to our counter example:

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```

Here, the `computed` function returns a _read-only_ **Reactive Reference** to the output of the getter-like callback passed as the first argument to `computed`. In order to access the **value** of the newly-created computed variable, we need to use the `.value` property just like with `ref`.

Let’s move our search functionality into `setup`:

```js
// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs, computed } from 'vue'

// in our component
setup (props) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // update `props.user` to `user.value` to access the Reference value
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // set a watcher on the Reactive Reference to user prop
  watch(user, getUserRepositories)

  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(
      repository => repository.name.includes(searchQuery.value)
    )
  })

  return {
    repositories,
    getUserRepositories,
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

We could do the same for other **logical concerns** but you might be already asking the question – _Isn’t this just moving the code to the `setup` option and making it extremely big?_ Well, that’s true. That’s why before moving on with the other responsibilities, we will first extract the above code into a standalone **composition function**. Let's start with creating `useUserRepositories`:

```js
// src/composables/useUserRepositories.js

import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

export default function useUserRepositories(user) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

And then the searching functionality:

```js
// src/composables/useRepositoryNameSearch.js

import { ref, onMounted, watch, toRefs } from 'vue'

export default function useRepositoryNameSearch(repositories) {
  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(repository => {
      return repository.name.includes(searchQuery.value)
    })
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

**Now having those two functionalities in separate files, we can start using them in our component. Here’s how this can be done:**

```js
// src/components/UserRepositories.vue
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import { toRefs } from 'vue'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup (props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    return {
      // Since we don’t really care about the unfiltered repositories
      // we can expose the filtered results under the `repositories` name
      repositories: repositoriesMatchingSearchQuery,
      getUserRepositories,
      searchQuery,
    }
  },
  data () {
    return {
      filters: { ... }, // 3
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
  },
  methods: {
    updateFilters () { ... }, // 3
  }
}
```

At this point you probably already know the drill, so let’s skip to the end and migrate the leftover filtering functionality. We don’t really need to get into the implementation details as it’s not the point of this guide.

```js
// src/components/UserRepositories.vue
import { toRefs } from 'vue'
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import useRepositoryFilters from '@/composables/useRepositoryFilters'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  setup(props) {
    const { user } = toRefs(props)

    const { repositories, getUserRepositories } = useUserRepositories(user)

    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)

    const {
      filters,
      updateFilters,
      filteredRepositories
    } = useRepositoryFilters(repositoriesMatchingSearchQuery)

    return {
      // Since we don’t really care about the unfiltered repositories
      // we can expose the end results under the `repositories` name
      repositories: filteredRepositories,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    }
  }
}
```

And we are done!

Keep in mind that we've only scratched the surface of Composition API and what it allows us to do. To learn more about it, refer to the in-depth guide.
