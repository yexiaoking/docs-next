# 安装

## 发布版本说明

最新rc版本: 3.0.0-rc.5

每个版本的详细发行说明可在[GitHub](https://github.com/vuejs/vue-next/releases)上找到。

## Vue Devtools

> 当前是Beta阶段

> Vue Devtools 需要Vue 3 版本不得低于`vue@^3.0.0-rc.1`

在使用Vue时，我们推荐在你的浏览器上安装[Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) ，它允许你在一个更友好的界面中审查和调试 Vue 应用。

[获取 Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

[获取 Firefox 插件](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

[获取标准的Electron app](https://github.com/vuejs/vue-devtools/blob/dev/packages/shell-electron/README.md)

## CDN

对于制作原型或学习，你可以这样使用最新版本

```html
<script src="https://unpkg.com/vue@next"></script>
```
对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：

## NPM
在用 Vue 构建大型应用时推荐使用 NPM 安装<sup>[[1]](#footnote-1)</sup>。NPM 能很好地和诸如 [Webpack](https://webpack.js.org/)或 [Browserify](http://browserify.org/) 模块打包器配合使用。同时 Vue 也提供配套工具来开发[单文件组件](../guide/single-file-component.html)。

```bash
# 最新稳定版
$ npm install vue@next
```

## 命令行工具 (CLI)

Vue 提供了一个[官方的 CLI](https://github.com/vuejs/vue-cli)，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。更多详情可查阅 [Vue CLI 的文档](https://cli.vuejs.org)。


::: tip
CLI 工具假定用户对 Node.js 和相关构建工具有一定程度的了解。如果你是新手，我们强烈建议先在不用构建工具的情况下通读<a href="./">指南</a>，在熟悉 Vue 本身之后再使用 CLI。
:::

对于beta版，Vue CLI现在通过[vue-cli-plugin-vue-next](https://github.com/vuejs/vue-cli-plugin-vue-next)提供了实验支持。要将现有的Vue CLI项目Vue 2 升级到Vue 3，你需要运行：


```bash
vue add vue-next
```

## Vite

[Vite](https://github.com/vitejs/vite) 是一个web开发构建工具，由于其原生ES模块导入方法，它允许快速提供代码。

通过在终端中运行以下命令，可以使用Vite快速设置Vue项目。

使用 NPM：

```bash
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

或者yarn：

```bash
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## 对不同构建版本的解释

在 [NPM 包的 dist/ 目录](https://cdn.jsdelivr.net/npm/vue@3.0.0-rc.1/dist/)你将会找到很多不同的 Vue.js 构建版本。这里列出了它们之间的差别：

### 使用CDN或没有构建工具

#### `vue(.runtime).global(.prod).js`:

- 若要通过浏览器中的 `<script src="...">` 直接使用，则暴露Vue全局；
- 浏览器内模板编译:
  - `vue.global.js` 是包含编译器和运行时的“完整”构建，因此它支持动态编译模板。
  - `vue.runtime.global.js` 只包含运行时，并且需要在构建步骤期间预编译模板。
- 内联所有Vue核心内部包 —— 即：它是一个单独的文件，不依赖于其他文件，这意味着你必须导入此文件和此文件中的所有内容，以确保获得相同的代码实例。
- 包含硬编码的prod/dev分支，并且prod构建是预先缩小的。使用`*.prod.js`用于生产的文件。

:::tip 提示
全局打包不是[UMD](https://github.com/umdjs/umd) 构建的，它们被打包成 [IIFEs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)，并且仅用于通过 `<script src="...">` 直接使用。
:::

#### vue(.runtime).esm-browser(.prod).js:

- 用于通过原生ES模块导入使用（在浏览器中通过`<script type="module">`；
- 与全局构建共享相同的运行时编译、依赖内联和硬编码的prod/dev行为。

### 使用构建工具

#### vue(.runtime).esm-bundler.js:

- 使用构建工具像 `webpack`, `rollup` 和 `parcel`.
- <a id="argue-1"></a>TODO：将 prod/dev 分支留给 `process.env.NODE_ENV guards` (需要更换构建工具)
- 不提供最小化版本（捆绑后与其余代码一起完成）
- import 依赖 (例如： `@vue/runtime-core`, `@vue/runtime-compiler`)
  - Imported dependencies are also esm-bundler builds and will in turn import their dependencies (例如：@vue/runtime-core imports @vue/reactivity)
  - This means you **can** install/import these deps individually without ending up with different instances of these dependencies, but you must make sure they all resolve to the same version.
- In-browser template compilation:
  - `vue.runtime.esm-bundler.js` **(default)** is runtime only, and requires all templates to be pre-compiled. This is the default entry for bundlers (via module field in `package.json`) because when using a bundler templates are typically pre-compiled (例如：in `*.vue` files).
  - `vue.esm-bundler.js`: includes the runtime compiler. Use this if you are using a bundler but still want runtime template compilation (例如：in-DOM templates or templates via inline JavaScript strings). You will need to configure your bundler to alias vue to this file.

### 对于服务端渲染

- `vue.cjs(.prod).js`:
  - For use in Node.js server-side rendering via `require()`.
  - If you bundle your app with webpack with `target: 'node'` and properly externalize `vue`, this is the build that will be loaded.
  - The dev/prod files are pre-built, but the appropriate file is automatically required based on `process.env.NODE_ENV`.

## Runtime + Compiler vs. Runtime-only

If you need to compile templates on the client (例如：passing a string to the template option, or mounting to an element using its in-DOM HTML as the template), you will need the compiler and thus the full build:

```js
// this requires the compiler
Vue.createApp({
  template: '<div>{{ hi }}</div>'
})

// this does not
Vue.createApp({
  render() {
    return Vue.h('div', {}, this.hi)
  }
})
```

When using `vue-loader`, templates inside `*.vue` files are pre-compiled into JavaScript at build time. You don’t really need the compiler in the final bundle, and can therefore use the runtime-only build.

<small>
**译者注**
<a id="footnote-1"></a>[1] 对于中国大陆用户，建议将 NPM 源设置为[国内的镜像](https://npm.taobao.org/)，可以大幅提升安装速度。
</small>
