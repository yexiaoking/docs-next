# Vue-next 中文文档翻译项目

![Vue-docs CI](https://github.com/veaba/docs-next/workflows/Vue-docs%20CI/badge.svg)     



> 使用声明：鉴于个人英文水平有限，个别术语翻译可能不太准确，不代表最终版！建议大家去看英文版，或有能力的，可以发起PR，来修正该问题，我会尽快回应！谢谢！！

## 特性

- 支持i18n
- 同步官方英文文档
- 默认为中文文档

## 如何参与Vue 3 中文仓库项目+注意事项？

### 如何参与？

1. 然后clone 本仓库
```bash
git clone git@github.com:veaba/docs-next.git
```
  - 可以更新readme的 [进度](#进度) ，填写上你的Github账号，发起pr，以免重复翻译

2. 安装依赖
```bash
yarn # or npm install
```

3. 项目启动
```bash
yarn serve # or npm run serve
```

4. 翻译文档

5. 发起pr，会有专人记录


### 如何添加一个译者注释？
> 基本参考或者直接搬用原 [cn.vuejs.org](https://github.com/vuejs/cn.vuejs.org)

到需要注释的地方
```md
安装 <sup>[[1]](#footnote-1)</sup>
```
在该注释文档的底部

```md
<small>**译者注**<a id="footnote-1"></a>[1] 对于中国大陆
用户，建议将 NPM 源设置为 [国内的镜像](https://npm.taobao.org/)，可以
大幅提升安装速度。</small>
```

### 存在争议的翻译

如果发现某些段落有疑虑，不顺畅的，可以打个记号，以让其他人协助完成。

|记录|翻译人|校验人|状态|
|----|----|----|----|
|[[argue-1]](/src/guide/installation.md#argue-1)||-||
|[[argue-2]](/src/guide/reactivity-computed-watchers.md#argue-2)|-|||
|[[argue-3]](/src/guide/reactivity-computed-watchers.md#argue-3)|-|||
|Identity hazards|-|||
| side effect|-|||

### 翻译规范

- [术语翻译约定.md](https://github.com/vuejs/cn.vuejs.org/wiki)
- 【建议】：如果是link 的链接，应该前后加个空格出来

  <div class="style-example style-example-bad">
  <h4>反例</h4>

  ```markdown
  该页面假设你已经阅读过了[组件基础](component-basics.md)。如果你还对组件不太了解，推荐你先阅读它。
  ```

  <div class="style-example style-example-good">
  <h4>好例子</h4>

  ```markdown
  该页面假设你已经阅读过了 [组件基础](component-basics.md) 。如果你还对组件不太了解，推荐你先阅读它。
  ```
  </div>

### TODO 项

1. 官网原版文档依然存在一些TODO项目还需后续补充！
  - guide/installation.md
  - guide/reactivity
  - guide/transistion-enterleave.md

2. 逐个校对文档

## 引用与参考

- [vue2 中文文档.md](https://cn.vuejs.org)
- [vue 2 英文文档.md](https://vuejs.org)
- [vue 3 英文文档.md](https://v3.vuejs.org)


## 部署


本仓库使用的是Github Actions 部署。

主仓库，发起PR 会自动部署
