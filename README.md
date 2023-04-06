# Ficus

Ficus 是 gg=G 团队开发的一款 markdown 编辑管理软件。


# 项目初始化

建议使用 node v16.19.1 版本，预先安装好 yarn 包管理器，使用 yarn 进行包管理

```
yarn install
```

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

# 提交要求

在每次提交之前，使用 yarn eslint 对所有代码进行格式化，并在本地运行 yarn test 保证通过所有已有测试。

提交时，要求使用 yarn commit 完成 commit message 的自动编写。

## 提交信息 commit message

使用 yarn commit 进行 commit，不允许直接运行 git commit 。

具体格式如下：

<提交类型>(<影响文件/影响模块（可选）>): <提交概述>

<提交详细信息（可选）>

样例：

```
chore(package.json): 优化 eslint 相关配置

支持 yarn eslint ，对所有文件进行自动的配置检查，且不检查 node 库的 eslint 情况。
```

# 分支说明

代码仓库分为以下六类分支：

1. main 分支 `稳定的版本`
    1. 提供给用户使用的**正式版本**和**稳定版本**；
    2. 🏷️ 所有**版本发布**和 **Tag** 操作都在这里进行；
    3. ❌ **不允许**开发者日常 push，只允许从 release 合并。
2. release 分支 `将要上线的版本`
    1. 从 develop 分支检出，只用于发布前的确认；
    2. 允许从中分出 fix 分支，修复的 commit 需要 push 回 dev；
    3. ❌ **不允许**开发者日常 push，只允许从 dev 合并。
3. dev 分支 `日常开发汇总`
    1. 开发者可以检出 feature 和 fix 分支，开发完成后 push 回 dev；
    2. 保证领先于 main；
    3. ❌ **不允许**开发者日常 push，只允许完成功能开发或 bug 修复后通过 pull request 进行合并。
4. feature 分支
    1. 从 dev 分支检出，用于新功能开发；
    2. 命名为 `feature/name`，如 `feature/resume_generation`；
    3. 开发完毕，经过测试后合并到 dev 分支；
    4. ✅ 允许开发者日常 push.
5. fix 分支
    1. 从 dev 或 release 分支检出，用于 bug 修复（feature 过程中的 bug 直接就地解决）；
    2. **特殊情况下**允许直接从 main 直接开 fix 分支进行修复；
    3. 命名为 `fix/issue_id`，如 `fix/2` ;
    4. 修复完毕，经过测试后合并到原来的分支（dev/release/main），**并且保证同时合并到 dev**;
    5. ✅ 允许开发者日常 push.
6. chore 分支
    1. 从 dev 分支检出，用于各项修正，如重构、风格优化等；
    2. 命名为 `chore/name`，如 `chore/resume_generation`；
    3. 开发完毕，经过测试后合并到 dev 分支；
    4. ✅ 允许开发者日常 push.

# pull request 要求

在完成代码的开发后，保证当前分支已经 `rebase` 到远端的目标分支，如从 `dev` 迁出的分支`feature/xxxxx`，要合并回 `dev` 分支，使用如下命令：

```bash
git checkout feature/xxxxx
git fetch
git rebase origin/feature
```

此时，有可能出现冲突，在本地手动的解决所有冲突文件后，手工使用 `git add` 添加冲突文件，再使用 `git rebase --continue` 继续分支的合并。

如果存在多个 commit 有冲突的情况，需要对每一个 commit 单独的进行冲突的处理。 

新建 pull request 发出合并请求。由 reviewer 完成代码的审核后合并。

代码复核者，需要检查对应提交是否可以通过单元测试，是否通过 `eslint` 的格式检查，分支提交命名是否符合规范，进行相应符合修改后，以`rebase`的方式合入主分支。

# git rebase -i 的说明

`git rebase -i` 可以方便的对本地分支进行整理，合并，或者对提交信息进行修改。

使用 `git rebase -i <目标commit>` 可以交互式的修改从目标commit 到目前HEAD的所有提交。

使用这条命令之后，会弹出 git 默认使用的文本编辑器，在文本编辑器中，对每一个 commit 可以单独配置。

详细教程见：[分支整理教程](https://blog.csdn.net/the_power/article/details/104651772/)

# 修改本地提交信息

如果需要对本地提交信息进行修正，或者合并多次提交进行合并，可以尝试使用 `git rebase -i`， 也可以尝试使用 `git reset --soft`，将 commit 中的修改返回工作区，再使用 yarn commit 等完成提交。
