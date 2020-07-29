# Vue-next 中文文档翻译项目

## 特性

- 支持i18n
- 同步官方英文文档
- 默认为中文文档


## 进度

|模块章节|翻译|校验|状态|
|----|----|----|----|
|[/guide/installation.md](/src/guide/installation.md)|[@veaba](https://github.com/veaba)|||
|/guide/installation|@veaba|||
|/guide/introduction|@veaba|||
|/guide/instance|@veaba|||
|/guide/template-syntax|@veaba|||
|/guide/computed|@veaba|||
|/guide/class-and-style|@veaba|||
|/guide/conditional|@veaba|||
|/guide/list|@veaba|||
|/guide/events|@veaba|||
|/guide/forms|@veaba|||
|/guide/component-basic|@veaba|||
|-|-|-|-|
'/guide/component-registration||||
'/guide/component-props||||
'/guide/component-custom-events||||
'/guide/component-slots||||
'/guide/component-provide-inject||||
'/guide/component-dynamic-async||||
'/guide/component-template-refs||||
'/guide/component-edge-case||||
|-|-|-|-|
|/guide/transitions-overview||||
|/guide/transitions-enterleave||||
|/guide/transitions-list||||
|/guide/transitions-stat||||
|-|-|-|-|
|/guide/mixins||||
|/guide/custom-directive||||
|/guide/teleport||||
|/guide/render-function||||
|/guide/plugin||||
|-|-|-|-|
|/guide/reactivity||||
|/guide/reactivity-fundamentals||||
|/guide/reactivity-computed-watchers||||
|-|-|-|-|
|/guide/composition-api-introduction||||
|/guide/composition-api-setup||||
|/guide/composition-api-lifecycle-hooks||||
|/guide/composition-api-provide-inject||||
|/guide/composition-api-template-ref||||
|-|-|-|-|
|/guide/optimizations||||
|/guide/change-detection||||
|-|-|-|-|
/guide/single-file-component||||
/guide/testing||||
|-|-|-|-|
|/guide/routing||||
|/guide/state-management||||
|/guide/ssr||||
|-|-|-|-|
|/guide/a11y-basics||||
|/guide/a11y-semantics||||
|/guide/a11y-standards||||
|/guide/a11y-resource||||
|-|-|-|-|
|migration/introduction.md|@veaba|-|- 翻译完成|
|migration/async-components.md|@veaba|-|- 翻译完成|
|migration/attribute-coercion.md|@veaba|-|- 翻译完成|
|migration/custom-directives.md|@veaba|-|- 翻译完成|
|migration/custom-elements-interop.md|@veaba|-|- 翻译完成|
|migration/data-option.md|@veaba|-|- 翻译完成|
|migration/events-api.md|@veaba|-|- 翻译完成|
|migration/filters.md|@veaba|-|- 翻译完成|
|migration/fragments|@veaba|-|- 翻译完成|
|migration/functional-components.md|@veaba|-|- 翻译完成|
|migration/global-api.md|@veaba|-|- 翻译完成|
|migration/global-api-treashaking.md|@veaba|-|- 翻译完成|
|migration/inline-template-modifiers.md|@veaba|-|- 翻译完成|
|migration/keycode-mofifiers.md|@veaba|-|- 翻译完成|
|migration/render-function-api.md|@veaba|-|- 翻译完成|
|migration/slots-unification.md|@veaba|-|- 翻译完成|
|migration/v-model.md|@veaba|-|- 翻译完成|
|-|-|-|-|
|contributing/writing-guide||||
|contributing/doc-style-guide||||
|contributing/translations||||
|-|-|-|-|
|/api/application-config||||
|/api/application-api||||
|/api/global-api||||
|-|-|-|-|
|/api/options-data||||
|/api/options-dom||||
|/api/options-lifecycle-hooks||||
|/api/options-assets||||
|/api/options-composition||||
|/api/options-misc||||
|-|-|-|-|
|/api/instance-properties||||
|/api/instance-methods||||
|/api/directives||||
|/api/special-attributes||||
|/api/built-in-components.md||||
|-|-|-|-|
|/api/basic-reactivity||||
|/api/refs-api||||
|/api/computed-watch-api||||
|-|-|-|-|
|/api/composition-api||||
|||||
## 翻译规范

- [术语翻译约定](https://github.com/vuejs/cn.vuejs.org/wiki)



## 参考

- 原 [vue2 中文文档](https://cn.vuejs.org)
- 原[vue 2 英文文档](https://vuejs.org)
- 原[vue 3 英文文档](https://v3.vuejs.org)
- tag 还是保留


|如果是上下文中tag单标html 的元素则保留||
|----|----|
|tag||
|||
|||



This site is built with [VuePress](https://vuepress.vuejs.org/). Site content is written in Markdown format located in `src`.

## Writing

See the [Vue Docs Writing Guide](https://v3.vuejs.org/guide/writing-guide.html) for our rules and recommendations on writing and maintaining documentation.

> The docs are in beta: The team is currently in the midst of changes and we are not ready for additional contributions yet. All content is subject to change. If you see a problem that you would like to bring to our attention, please [create an issue](https://github.com/vuejs/docs-next/issues/new) and we will get to it when we can. You may want to wait until the content is finalized, though.

## Developing

1. Clone repository

```bash
git clone git@github.com:veaba/docs-next.git
```

2. Install dependencies

```bash
yarn # or npm install
```

3. Start local development environment

```bash
yarn serve
```

## Deploying

The site is automatically deployed when commits land in `master`, via [Netlify](https://www.netlify.com/).