# Vue-next 中文文档翻译项目2

![Vue-docs CI](https://github.com/veaba/docs-next/workflows/Vue-docs%20CI/badge.svg)     

> 使用声明：鉴于个人英文水平有限，个别术语翻译可能不太准确，不代表最终版！建议大家去看英文版，或有能力的，可以发起PR，来修正该问题，我会尽快回应！谢谢！！

## 状态

###  同步

2020年8月26日已同步最新：

- [`vuejs/docs-next`](https://github.com/vuejs/docs-next) 官方 [commit 列表](https://github.com/vuejs/docs-next/commits/master)
- hash: [22536d00c7871b6ab8d08c2ecdb943183e022edb](https://github.com/vuejs/docs-next/commit/22536d00c7871b6ab8d08c2ecdb943183e022edb)
- commit: [docs: add in transition migration guide docs (#428) ](https://github.com/vuejs/docs-next/commit/22536d00c7871b6ab8d08c2ecdb943183e022edb)

### 待翻译项

- 待翻译 /src/cookbook

## 如何参与本仓库？

### 开发

1. clone 本仓库
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


### 存在争议的翻译

如果发现某些段落有疑虑，不顺畅的，可以打个记号，以让其他人协助完成。

|记录|翻译人|校验人|状态|
|----|----|----|----|
|[[argue-1]](/src/guide/installation.md#argue-1)||-||
|[[argue-2]](/src/guide/reactivity-computed-watchers.md#argue-2)|-|||
|[[argue-3]](/src/guide/reactivity-computed-watchers.md#argue-3)|-|||
|Identity hazards|-|||
| side effect|-|||


## 引用与参考

- [vue 2 中文文档.md](https://cn.vuejs.org)
- [vue 2 英文文档.md](https://vuejs.org)
- [vue 3 英文文档.md](https://v3.vuejs.org)


## 部署


本仓库使用的是Github Actions 部署。

主仓库，发起PR 会自动部署
