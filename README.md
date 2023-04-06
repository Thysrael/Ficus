# Ficus

Ficus 是 gg=G 团队开发的一款 markdown 编辑管理软件。

# 工作区域说明

```
src/main/ - 主进程/系统层相关
src/renderer/ - 渲染进程/VUE
src/renderer/components/mindEditor/ - 图编辑器插件相关
src/renderer/components/richTextEditor/ - md编辑器插件相关
src/renderer/store/ - vuex & vue control
src/common/ - 共用，可用于一些全局常量定义
src/ficIR/ - ficus数据结构

test/ - 测试
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
