# Vue-next 中文文档翻译项目

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
> 基本参考或者直接搬用原[cn.vuejs.org](https://github.com/vuejs/cn.vuejs.org)

到需要注释的地方
```md
安装<sup>[[1]](#footnote-1)</sup>
```
在该注释文档的底部

```md
<small>**译者注**<a id="footnote-1"></a>[1] 对于中国大陆
用户，建议将 NPM 源设置为[国内的镜像](https://npm.taobao.org/)，可以
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



## 进度&贡献


## 引用与参考

- 原[vue2 中文文档.md](https://cn.vuejs.org)
- 原[vue 2 英文文档.md](https://vuejs.org)
- 原[vue 3 英文文档.md](https://v3.vuejs.org)


## Writing

See the [Vue Docs Writing Guide.md](https://v3.vuejs.org/guide/writing-guide.html) for our rules and recommendations on writing and maintaining documentation.

> The docs are in beta: The team is currently in the midst of changes and we are not ready for additional contributions yet. All content is subject to change. If you see a problem that you would like to bring to our attention, please [create an issue.md](https://github.com/vuejs/docs-next/issues/new) and we will get to it when we can. You may want to wait until the content is finalized, though.


## 部署

The site is automatically deployed when commits land in `master`, via [Netlify.md](https://www.netlify.com/).
