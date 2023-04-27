<p align = "center">
<img src="https://i.postimg.cc/NfqfDkRb/001.png" width="270px" />
<br><br>
<img src="https://img.shields.io/github/languages/top/thysrael/ficus" />
<img src="https://img.shields.io/github/downloads/thysrael/ficus/total" />
<img src="https://img.shields.io/github/issues/thysrael/ficus" />
<img src="https://img.shields.io/github/issues-pr-closed-raw/thysrael/ficus">
<img src="https://img.shields.io/github/release-date/thysrael/ficus">
<br><br>
</p>

<h1 align="center">Ficus</h1>


README: [中文](./README-zh.md) | [English](./README.md)

$\tt{Ficus}$ is a software for editing and managing `markdown` documents, developed by the $\tt{gg=G}$ team.

$\tt{Ficus}$ is named after the fig tree, which has the characteristics of "umbrella-like canopy, and one tree forming a forest". This is also the core service that this software wants to provide to users: to allow users' md documents to be browsed and edited like a fig tree, and to allow users' multiple md documents to be associated in various forms like a fig forest. We hope that users' experience is like the slogan of this software:

<img src="https://i.postimg.cc/RVggP09M/slogan.png"/>

$\tt{Ficus}$ is developed based on the `Vue3, Electron` framework and provides installation packages for Windows, macOS, and Linux systems.

Detailed information can be obtained on the [ficus website](https://ficus.world/).

## Preview

**Rich Text Mode**

<p align = "center">
<img src="https://i.postimg.cc/vZZqrjcy/rtext.png"/>
</p>

**Source Code Mode**

<p align = "center">
<img src="https://i.postimg.cc/N0GNmLP0/fcode.png"/>
</p>

**Ficus Tree Mode**

<p align = "center">
<img src="https://i.postimg.cc/TPkt9GZJ/ftree.png"/>
</p>

**Ficus Graph Mode**

<p align = "center">
<img src="https://i.postimg.cc/P5Q3C1yc/fgraph.png"/>
</p>


## Build

You can download the packaged application directly from the [download link](https://ficus.world/pages/53ff34/).

If you want to build it yourself, it is recommended to use the node v16.19.1 version and install the yarn package manager. Run the following commands in the shell:

```shell
git clone git@github.com:Thysrael/Ficus.git
cd ./Ficus/
yarn install
yarn electron:build
```

The resulting build can be found in `Ficus/dist_electron/linux_unpacked` or `Ficus/dist_electron/win_unpacked`.

Please note that the installation path cannot contain **Chinese**, and for Windows users, only the `Only for me` option is supported in the installation program:

<p align = "center">
<img src="https://i.postimg.cc/nchN0BvS/only.png"/>
</p>


## Run

It is recommended to use the node v16.19.1 version and install the yarn package manager. Run the following commands in the shell:

```shell
git clone git@github.com:Thysrael/Ficus.git
cd ./Ficus/
yarn install
yarn electron:serve
```

## Architecture

The project architecture is as shown in the figure.

<p align = "center">
<img src="https://i.postimg.cc/3rjtxS26/ficus-arch.png" />
</p>

The project directory structure is as follows:

```
├── build: Resources required for building
├── public: Art style resources
│   └── css
│       └── content-theme
├── src: Project source code
│   ├── common: Public resources
│   ├── IR: FicIR 
│   │   ├── block: IR basic data structure
│   │   │   ├── base 
│   │   │   │   ├── content: Node information
│   │   │   │   ├── linkedList
│   │   │   │   └── type: Type
│   │   │   └── factory: Factory method
│   │   ├── component: IR top-level data structure
│   │   ├── history: History record
│   │   ├── manager: Data manager, the only external interface
│   │   └── utils: External tools
│   │       └── marked: Markdown lexical analyzer
│   ├── main: Electron backend
│   │   ├── filesystem: File operation method
│   │   ├── helper: Utility method
│   │   └── update: Packaging method
│   └── renderer: Vue frontend
│       ├── assets: Front-end static resources
│       ├── components: Vue components
│       │   ├── header: Top bar
│       │   ├── mindEditor: Ficus mode editor
│       │   │   └── assets
│       │   ├── richTextEditor: Rich text editor
│       │   ├── sideBar: Sidebar
│       │   └── textArea: Text editor
│       ├── store: Storage
│       └── utils
│           └── keyboardbinding: Shortcut key binding
└── test: Unit test
    ├── IR: IR test
    │   ├── data
    │   ├── factory
    │   └── manager
    └── main: Main process method test
        ├── data
        └── filesystem
```

We have also rewritten the software package repositories as follows:

- [ficus-editor](https://github.com/Hyggge/ficus-editor)
- [lute-for-ficus](https://github.com/Dofingert/lute-for-ficus)
- [vue3-mindmap](https://github.com/GwokHiujin/vue3-mindmap)


## Changelog

- 2023.04.26: Ficus 0.1.0 version
  - WYSIWYG markdown editing
  - Opening files and folders
  - Basic framework construction
  - Hot updates
  - Support for fig tree functionality, only supports fig tree display functionality, does not support fig tree editing functionality, and does not support fig forest functionality
  - ```diff
    - Please do not open important files with Ficus at will, as this version has a certain risk of clearing user files
    ```

## Contribution

If you are interested in our project, please feel free to join us! You can [submit an issue](https://github.com/Thysrael/Ficus/issues/new) or submit a pull request.

For specific contributions or ways to support us, please refer to [here](https://ficus.world/pages/87ba98/).

## Team

<img src="https://i.postimg.cc/hvFgCKQh/Untitled.png" width="450px" />

gg=G is a software engineering team consisting of seven members from the Beijing University of Aeronautics and Astronautics, Department of Computer Science, Class of 2020. This is our [team blog](https://blog.csdn.net/gg_equal_G).

## License

[MIT](LICENSE) © gg=G


