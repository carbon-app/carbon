<p align="center">
  <img width="100%" src="https://user-images.githubusercontent.com/10369094/31211729-591d059c-a950-11e7-86af-fa5ea3d7dbac.png" />
</p>

<p align="center">
  <a href="https://reporanger.com">
    <img src="https://img.shields.io/badge/maintained%20with-Ranger-1f93f3.svg" alt="maintained with Ranger" />  
  </a>
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-78-orange.svg" alt="All Contributors" />
  </a>
  <a href="/LICENSE">
    <img src="https://img.shields.io/github/license/carbon-app/carbon.svg" alt="MIT License" />
  </a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon?ref=badge_shield">
    <img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon.svg?type=shield" alt="FOSSA Status" />
  </a>
</p>

<br></br>

## 简介

你见过推特上面的 [这些](https://twitter.com/dan_abramov/status/890191815567175680) [代码](https://twitter.com/reactjs/status/890511993261654017) [图片](https://twitter.com/notquiteleo/status/873483329345028096) 吗? 虽然这些代码令人印象深刻，但从审美角度来说还有提升空间。Carbon 能够轻松地将你的源码生成漂亮的图片并分享。还等什么呢？用这个新发现的美化工具秀给你的 followers 看吧。

<p align="center">
  <img width="100%" alt="Carbon example" src="https://user-images.githubusercontent.com/8397708/63456416-b27d1a80-c403-11e9-9572-105b089be885.png">
</p>

## 特性

- **定制化**：定制选项包括图片的语法主题、窗口样式等
- **快速分享**：一键生成图片并分享
- **从 GitHub gist 导入**：只需要在 url 后面加上 GitHub gist id

## 使用

#### 导入

有几种不同的方法可以将代码导入到 Carbon：

- 把文件拖放到编辑器中
- 在 carbon url 后面添加 GitHub gist id （比如 [`carbon.now.sh/<你的_gist_id>`](https://carbon.now.sh/3208813b324d82a9ebd197e4b1c3bae8)）
- 直接粘贴代码

#### 定制化

当你把代码导入到 Carbon 后，你可以定制生成的代码图片。定制选项包括语法主题、背景颜色、窗口主题、以及 padding 距离。

#### 导出/分享

当你定制完图片样式后，可以分享到推特上面，或者直接保存。

如果你通过 "Tweet" 按钮分享，Carbon 将自动设置你的图片为公开访问。不过如果你想手动分享图片，可以查看 [如何设置 Twitter 图片公开访问](https://help.twitter.com/en/using-twitter/picture-descriptions)。

如果你在文章中添加 Carbon 图片，注意到图片中的源代码对于无障碍技术来说是不可见的，比如无法放大字号或复制。可以考虑新增一个元素展示文本形式的源代码，比如在图片下方加一个 [详细信息展现元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/details)。

#### 安装 Carbon 桌面客户端（离线）

如果你使用的是 Google Chrome 或别的支持 PWA 技术的浏览器，你可以安装 Carbon 并离线使用：

1. 访问 [https://carbon.now.sh](https://carbon.now.sh)
2. 点击浏览器的设置按钮
3. 点击 "安装 Carbon..."

## 社区

浏览社区中的这些优秀项目：

##### 编辑器插件

- [IntelliJ IDEA `carbon-now-sh`](https://plugins.jetbrains.com/plugin/10469-carbon-now-sh) - 在 IntelliJ IDEA 中通过右键菜单导入选中的代码到 Carbon
- [Atom `carbon-now-sh`](https://atom.io/packages/carbon-now-sh) - 在 Atom 中通过 `shift-cmd-A` 快捷键导入当前文件到 Carbon
- [VS Code `carbon-now-sh`](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh) - 在 VS Code 中通过 `carbon` 命令导入当前文件到 Carbon
- [Sublime Text 3 `carbon-now-sh`](https://github.com/molnarmark/carbonSublime) - 在 Sublime Text 3 中通过自定义快捷键导入选中的代码到 Carbon
- [Vim `carbon-now-sh`](https://github.com/kristijanhusak/vim-carbon-now-sh) - 在 Vim/Neovim 中通过 `CarbonNowSh()` 函数导入选中的代码到 Carbon
- [Emacs `carbon-now-sh`](https://github.com/veelenga/carbon-now-sh.el) - 在 Emacs 中通过 `carbon-now-sh` 交互函数导入选中的代码到 Carbon
- [Xcode `carbon-now-sh`](https://github.com/StevenMagdy/CarboNow4Xcode) - 在 `carbon.now.sh` 中打开选中的代码
- [Xcode `nef`](https://github.com/bow-swift/nef-plugin) - 这个 Xcode 扩展程序能让你将选中的代码一键导出成 Carbon 片段

##### 工具

- [CLI `carbon-now-cli`](https://github.com/mixn/carbon-now-cli) - 用 `carbon-now` 命令在 Carbon 中打开一个文件或者直接下载它，包含交互式选项、可选高亮等功能
- [CodeExpander](https://codeexpander.com) - 是一个智能并具有像 TextExpander 特性的 GitHub Gist 客户端
- [`nef`](https://github.com/bow-swift/nef#-exporting-carbon-code-snippets) - 从 `Xcode Playground` 导出多个 Carbon 代码片段。

##### 库

- [R `carbonate`](https://yonicd.github.io/carbonate/) - 用 `R` 脚本迭代处理图片样式并在 Carbon 中打开或直接下载。

##### 书籍

- ["CS 101 - An Introduction to Computational Thinking"](https://itunes.apple.com/us/book/id1435714196) - Sarbo Roy 写的一本计算机科学书.

## 项目作者

Carbon 项目由 TA 们发起：

- Mike Fix ([@mfix22](https://github.com/mfix22))
- Brian Dennis ([@briandennis](https://github.com/briandennis))
- Jake Dexheimer ([@jakedex](https://github.com/jakedex))

#### 许可

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon?ref=badge_large)

<br />
<br />

---

## 贡献代码

欢迎 PR！请查看 [贡献指南](/.github/CONTRIBUTING.md) 了解详情。

### 赞助商

你的公司在用 Carbon 吗？考虑一下为此项目的新功能开发、bug 修复等提供赞助。

<a href="https://fossa.com" style="margin-right: 2rem;" target="_blank"><img width="160px" src="https://assets-global.website-files.com/5f4d9ea2592c16056cb0f7a5/5f4d9ea2592c16d9a2b0f7da_logo-FOSSA-night-blue.svg" /></a>
<a href="https://opencollective.com/carbon-app/sponsors/0/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/0/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/1/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/1/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/2/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/2/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/3/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/3/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/4/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/4/avatar"></a>

### 赞助者

喜欢用 Carbon 吗？考虑一下为此项目的新功能开发或改进提供赞助。

<a href="https://opencollective.com/carbon-app/backers/0/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/0/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/1/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/1/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/2/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/2/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/3/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/3/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/4/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/4/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/5/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/5/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/6/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/6/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/7/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/7/avatar"></a>

### 感谢

[ ▲ Vercel ](https://vercel.com/) 赞助了 Carbon 的服务托管。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fcarbon-app%2Fcarbon&project-name=carbon&repo-name=carbon)

### 贡献者

感谢所有这些优秀的贡献者们 ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/briandennis"><img src="https://avatars0.githubusercontent.com/u/10078572?v=4?s=100" width="100px;" alt=""/><br /><sub><b>briandennis</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=briandennis" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/commits?author=briandennis" title="Documentation">📖</a> <a href="#infra-briandennis" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/carbon-app/carbon/pulls?q=is%3Apr+reviewed-by%3Abriandennis" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/mfix22"><img src="https://avatars0.githubusercontent.com/u/8397708?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mfix22</b></sub></a><br /><a href="#question-mfix22" title="Answering Questions">💬</a> <a href="https://github.com/carbon-app/carbon/commits?author=mfix22" title="Code">💻</a> <a href="#ideas-mfix22" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jakedex"><img src="https://avatars1.githubusercontent.com/u/10369094?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jakedex</b></sub></a><br /><a href="#question-jakedex" title="Answering Questions">💬</a> <a href="https://github.com/carbon-app/carbon/commits?author=jakedex" title="Code">💻</a> <a href="#design-jakedex" title="Design">🎨</a> <a href="#video-jakedex" title="Videos">📹</a></td>
    <td align="center"><a href="https://github.com/andrewda"><img src="https://avatars1.githubusercontent.com/u/10191084?v=4?s=100" width="100px;" alt=""/><br /><sub><b>andrewda</b></sub></a><br /><a href="#question-andrewda" title="Answering Questions">💬</a> <a href="https://github.com/carbon-app/carbon/commits?author=andrewda" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/issues?q=author%3Aandrewda" title="Bug reports">🐛</a> <a href="https://github.com/carbon-app/carbon/pulls?q=is%3Apr+reviewed-by%3Aandrewda" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/yeskunall"><img src="https://avatars2.githubusercontent.com/u/14703164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>yeskunall</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=yeskunall" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/commits?author=yeskunall" title="Documentation">📖</a> <a href="#tool-yeskunall" title="Tools">🔧</a> <a href="https://github.com/carbon-app/carbon/issues?q=author%3Ayeskunall" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/stoshfabricius"><img src="https://avatars1.githubusercontent.com/u/2652676?v=4?s=100" width="100px;" alt=""/><br /><sub><b>stoshfabricius</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=stoshfabricius" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jkling38"><img src="https://avatars1.githubusercontent.com/u/11639896?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jkling38</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=jkling38" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/otobrglez"><img src="https://avatars1.githubusercontent.com/u/225946?v=4?s=100" width="100px;" alt=""/><br /><sub><b>otobrglez</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=otobrglez" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/darahak"><img src="https://avatars3.githubusercontent.com/u/11488612?v=4?s=100" width="100px;" alt=""/><br /><sub><b>darahak</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=darahak" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dom96"><img src="https://avatars0.githubusercontent.com/u/246651?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dom96</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=dom96" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/elrumordelaluz"><img src="https://avatars3.githubusercontent.com/u/784056?v=4?s=100" width="100px;" alt=""/><br /><sub><b>elrumordelaluz</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=elrumordelaluz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cjb"><img src="https://avatars2.githubusercontent.com/u/21217?v=4?s=100" width="100px;" alt=""/><br /><sub><b>cjb</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=cjb" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Krzysztof-Cieslak"><img src="https://avatars1.githubusercontent.com/u/5427083?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Krzysztof-Cieslak</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=Krzysztof-Cieslak" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/fernahh"><img src="https://avatars0.githubusercontent.com/u/2369851?v=4?s=100" width="100px;" alt=""/><br /><sub><b>fernahh</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=fernahh" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/g3r4n"><img src="https://avatars1.githubusercontent.com/u/10941033?v=4?s=100" width="100px;" alt=""/><br /><sub><b>g3r4n</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=g3r4n" title="Code">💻</a></td>
    <td align="center"><a href="http://drarok.com/"><img src="https://avatars0.githubusercontent.com/u/55830?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mat Gadd</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/issues?q=author%3ADrarok" title="Bug reports">🐛</a> <a href="https://github.com/carbon-app/carbon/commits?author=Drarok" title="Code">💻</a></td>
    <td align="center"><a href="https://bradlab.co.uk"><img src="https://avatars1.githubusercontent.com/u/11805775?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brad Davies</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/issues?q=author%3Avarbrad" title="Bug reports">🐛</a> <a href="https://github.com/carbon-app/carbon/commits?author=varbrad" title="Code">💻</a></td>
    <td align="center"><a href="http://www.rafaelcamaram.com/"><img src="https://avatars1.githubusercontent.com/u/9087886?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rafael Câmara</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=rafaelcamaram" title="Code">💻</a></td>
    <td align="center"><a href="https://glebbahmutov.com/"><img src="https://avatars1.githubusercontent.com/u/2212006?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gleb Bahmutov</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=bahmutov" title="Tests">⚠️</a> <a href="#tool-bahmutov" title="Tools">🔧</a></td>
    <td align="center"><a href="https://ivan-munguia.netlify.com"><img src="https://avatars2.githubusercontent.com/u/10677789?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Iván Munguía</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=warborn" title="Code">💻</a></td>
    <td align="center"><a href="https://dillonmulroy.com"><img src="https://avatars1.githubusercontent.com/u/2755722?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dillon Mulroy</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=dmmulroy" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/NARKOZ"><img src="https://avatars2.githubusercontent.com/u/253398?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nihad Abbasov</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=NARKOZ" title="Code">💻</a></td>
    <td align="center"><a href="https://torzuolih.github.io"><img src="https://avatars1.githubusercontent.com/u/7328625?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hugo Torzuoli</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=TorzuoliH" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/imbrn"><img src="https://avatars1.githubusercontent.com/u/1906977?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bruno C. Couto</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=imbrn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/molnarmark"><img src="https://avatars2.githubusercontent.com/u/13263073?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mark Molnar</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=molnarmark" title="Code">💻</a></td>
    <td align="center"><a href="https://www.behance.net/tetra2000"><img src="https://avatars1.githubusercontent.com/u/1459450?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Takahiko Inayama</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=TETRA2000" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/martinfrancois"><img src="https://avatars1.githubusercontent.com/u/14319020?v=4?s=100" width="100px;" alt=""/><br /><sub><b>François Martin</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=martinfrancois" title="Code">💻</a></td>
    <td align="center"><a href="http://raphamorim.io"><img src="https://avatars3.githubusercontent.com/u/3630346?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Raphael Amorim</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=raphamorim" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://camronflanders.com"><img src="https://avatars0.githubusercontent.com/u/27292?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Camron Flanders</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=camflan" title="Code">💻</a></td>
    <td align="center"><a href="https://ericadamski.github.com"><img src="https://avatars0.githubusercontent.com/u/6516758?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eric Adamski</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=ericadamski" title="Code">💻</a></td>
    <td align="center"><a href="http://winnercrespo.com"><img src="https://avatars0.githubusercontent.com/u/4671080?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Winner Crespo</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=wistcc" title="Code">💻</a> <a href="#design-wistcc" title="Design">🎨</a></td>
    <td align="center"><a href="http://twitter.com/mixn"><img src="https://avatars3.githubusercontent.com/u/672237?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Milos</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=mixn" title="Code">💻</a> <a href="#tool-mixn" title="Tools">🔧</a> <a href="https://github.com/carbon-app/carbon/commits?author=mixn" title="Documentation">📖</a> <a href="#translation-mixn" title="Translation">🌍</a></td>
    <td align="center"><a href="https://mittalyashu.now.sh/"><img src="https://avatars1.githubusercontent.com/u/29014463?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yashu Mittal</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=mittalyashu" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/bberrycarmen"><img src="https://avatars0.githubusercontent.com/u/22792183?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rachel M. Carmena</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=rachelcarmena" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/miguel-salazar-823b07a1/"><img src="https://avatars0.githubusercontent.com/u/19369949?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Miguel Salazar</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=ucdstudent95618" title="Documentation">📖</a> <a href="#translation-ucdstudent95618" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/vyom-jain-233a28139"><img src="https://avatars3.githubusercontent.com/u/19145803?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vyom Jain</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=vvyomjjain" title="Documentation">📖</a> <a href="#translation-vvyomjjain" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.cnblogs.com/racaljk/"><img src="https://avatars0.githubusercontent.com/u/5010047?v=4?s=100" width="100px;" alt=""/><br /><sub><b>racaljk</b></sub></a><br /><a href="#translation-racaljk" title="Translation">🌍</a></td>
    <td align="center"><a href="https://lastblocklabs.com"><img src="https://avatars3.githubusercontent.com/u/3892149?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sean</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=raboid" title="Code">💻</a></td>
    <td align="center"><a href="http://izabelacborges.com/"><img src="https://avatars0.githubusercontent.com/u/19255077?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Izabela Borges</b></sub></a><br /><a href="#translation-izabelacborges" title="Translation">🌍</a></td>
    <td align="center"><a href="https://ghuser.io/shinilms"><img src="https://avatars2.githubusercontent.com/u/18573510?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shinil M S</b></sub></a><br /><a href="#translation-shinilms" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/berkeatac"><img src="https://avatars1.githubusercontent.com/u/10579633?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Berke Atac</b></sub></a><br /><a href="#translation-berkeatac" title="Translation">🌍</a></td>
    <td align="center"><a href="https://wooooooak.github.io/"><img src="https://avatars3.githubusercontent.com/u/18481078?v=4?s=100" width="100px;" alt=""/><br /><sub><b>LEE YONGJUN</b></sub></a><br /><a href="#translation-wooooooak" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://matthewnielsen.ca"><img src="https://avatars2.githubusercontent.com/u/35040439?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matthew Nielsen</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=MatthewNielsen27" title="Code">💻</a></td>
    <td align="center"><a href="https://www.boy.sh"><img src="https://avatars2.githubusercontent.com/u/225410?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Boy</b></sub></a><br /><a href="#platform-boyvanamstel" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://vetrivelcsamy.xyz"><img src="https://avatars2.githubusercontent.com/u/26738977?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vetrivel Chinnasamy</b></sub></a><br /><a href="#translation-vetrivelcsamy" title="Translation">🌍</a></td>
    <td align="center"><a href="https://farzadyz.com"><img src="https://avatars2.githubusercontent.com/u/8332043?s=460&v=4?s=100" width="100px;" alt=""/><br /><sub><b>Farzad YZ</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=farskid" title="Code">💻</a> <a href="#ideas-farskid" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/yannickl"><img src="https://avatars0.githubusercontent.com/u/798235?s=460&v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yannick Loriot</b></sub></a><br /><a href="#translation-yannickl" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Joel-hanson"><img src="https://avatars2.githubusercontent.com/u/17215044?s=460&v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joel Hanson</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=Joel-hanson" title="Code">💻</a></td>
    <td align="center"><a href="https://muzzammil.xyz/?ref=github"><img src="https://avatars2.githubusercontent.com/u/12321712?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Muhammad Muzzammil</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=muhammadmuzzammil1998" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/souppower"><img src="https://avatars2.githubusercontent.com/u/19849611?v=4?s=100" width="100px;" alt=""/><br /><sub><b>souppower</b></sub></a><br /><a href="#infra-souppower" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://uraway.hatenablog.com/"><img src="https://avatars3.githubusercontent.com/u/15242484?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Masato Urai (@uraway_)</b></sub></a><br /><a href="#translation-uraway" title="Translation">🌍</a></td>
    <td align="center"><a href="http://techinpark.com"><img src="https://avatars3.githubusercontent.com/u/45546296?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fernando</b></sub></a><br /><a href="#translation-techinpark" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/megsachdev"><img src="https://avatars1.githubusercontent.com/u/22325351?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Megha Sachdev</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=megsachdev" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/commits?author=megsachdev" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://techgeekhub.ml"><img src="https://avatars0.githubusercontent.com/u/6022231?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anudeep Reddy</b></sub></a><br /><a href="#infra-anudeepreddy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://munieru.jp"><img src="https://avatars2.githubusercontent.com/u/20086673?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Munieru</b></sub></a><br /><a href="#translation-munierujp" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.etoxin.net"><img src="https://avatars0.githubusercontent.com/u/393002?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Lusted</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=etoxin" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JoseNoriegaa"><img src="https://avatars2.githubusercontent.com/u/28733681?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jose Noriega</b></sub></a><br /><a href="#translation-JoseNoriegaa" title="Translation">🌍</a></td>
    <td align="center"><a href="https://discord.club"><img src="https://avatars2.githubusercontent.com/u/33966852?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Merlin Fuchs</b></sub></a><br /><a href="#translation-Merlintor" title="Translation">🌍</a></td>
    <td align="center"><a href="https://glossier.com"><img src="https://avatars0.githubusercontent.com/u/23482161?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ramy Majouji</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=majouji" title="Code">💻</a></td>
    <td align="center"><a href="http://stackoverflow.com/users/872395/nemesv"><img src="https://avatars0.githubusercontent.com/u/251330?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viktor Nemes</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=nemesv" title="Code">💻</a></td>
    <td align="center"><a href="https://ericwbailey.design/"><img src="https://avatars3.githubusercontent.com/u/634191?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eric Bailey</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=ericwbailey" title="Code">💻</a></td>
    <td align="center"><a href="http://rsg-sweden.iscbsc.org"><img src="https://avatars0.githubusercontent.com/u/6730853?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nazeefa</b></sub></a><br /><a href="#translation-Nazeeefa" title="Translation">🌍</a></td>
    <td align="center"><a href="https://medium.com/@pratikbutani/carbon-create-and-share-beautiful-images-of-your-source-code-d31dedfe64bd"><img src="https://avatars2.githubusercontent.com/u/3306366?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pratik Butani</b></sub></a><br /><a href="#blog-pratikbutani" title="Blogposts">📝</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/baktiaditya"><img src="https://avatars0.githubusercontent.com/u/2070906?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bakti Aditya</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=baktiaditya" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/aquaductape"><img src="https://avatars1.githubusercontent.com/u/29286430?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Caleb Taylor</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=aquaductape" title="Code">💻</a></td>
    <td align="center"><a href="http://about.rmunhoz.me"><img src="https://avatars3.githubusercontent.com/u/3948961?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rogério Munhoz</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=rjmunhoz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/technoknol"><img src="https://avatars0.githubusercontent.com/u/6429418?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Technoknol</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=technoknol" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/tmakowski"><img src="https://avatars3.githubusercontent.com/u/38053499?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tymoteusz Makowski</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=tmakowski" title="Code">💻</a></td>
    <td align="center"><a href="https://nisar.dev"><img src="https://avatars3.githubusercontent.com/u/46004116?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nisar Hassan Naqvi</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/issues?q=author%3Anisarhassan12" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.wapgee.com"><img src="https://avatars2.githubusercontent.com/u/42450390?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ilyas Karim</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/issues?q=author%3Ailyaskarim" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://nickfix.me"><img src="https://avatars2.githubusercontent.com/u/6845581?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nick Fix</b></sub></a><br /><a href="#ideas-njfix6" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://noti.st/melsumner"><img src="https://avatars0.githubusercontent.com/u/4587451?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Melanie Sumner</b></sub></a><br /><a href="#ideas-MelSumner" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://aluc.io/"><img src="https://avatars2.githubusercontent.com/u/15520015?v=4?s=100" width="100px;" alt=""/><br /><sub><b>aluc</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=b6pzeusbc54tvhw5jgpyw8pwz2x6gs" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mearns"><img src="https://avatars1.githubusercontent.com/u/5140254?v=4?s=100" width="100px;" alt=""/><br /><sub><b>B. Mearns</b></sub></a><br /><a href="#ideas-mearns" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://jiepeng.me"><img src="https://avatars3.githubusercontent.com/u/10325111?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Peng Jie</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=neighborhood999" title="Code">💻</a></td>
    <td align="center"><a href="https://binyam.in"><img src="https://avatars3.githubusercontent.com/u/39805353?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Binyamin Aron Green</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=b3u" title="Code">💻</a></td>
    <td align="center"><a href="https://dev.to/mbiesiad"><img src="https://avatars0.githubusercontent.com/u/18367606?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michal</b></sub></a><br /><a href="#translation-mbiesiad" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/qw-in"><img src="https://avatars0.githubusercontent.com/u/19194187?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Quinn Blenkinsop</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=qw-in" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/seagalputra"><img src="https://avatars0.githubusercontent.com/u/15377132?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dwiferdio Seagal Putra</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=seagalputra" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ashwoodall"><img src="https://avatars3.githubusercontent.com/u/14588617?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ashley Woodall Clark</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=ashwoodall" title="Code">💻</a></td>
    <td align="center"><a href="https://tim.wienk.name/"><img src="https://avatars0.githubusercontent.com/u/150598?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tim Wienk</b></sub></a><br /><a href="#translation-timwienk" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/JeremyShih"><img src="https://avatars3.githubusercontent.com/u/7455516?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeremy Shih</b></sub></a><br /><a href="#translation-JeremyShih" title="Translation">🌍</a></td>
    <td align="center"><a href="http://georgemccarron.com/"><img src="https://avatars2.githubusercontent.com/u/9155723?v=4?s=100" width="100px;" alt=""/><br /><sub><b>George McCarron</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=george1410" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/artmxra7"><img src="https://avatars.githubusercontent.com/u/23070604?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Erwin Rahayu</b></sub></a><br /><a href="#translation-artmxra7" title="Translation">🌍</a> <a href="https://github.com/carbon-app/carbon/commits?author=artmxra7" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mlucap"><img src="https://avatars.githubusercontent.com/u/36577976?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Luca</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=mlucap" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adghayes"><img src="https://avatars.githubusercontent.com/u/37960853?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Hayes</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=adghayes" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/heybereket"><img src="https://avatars.githubusercontent.com/u/68391329?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bereket Semagn</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=heybereket" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/LorenzoLancia"><img src="https://avatars.githubusercontent.com/u/44911690?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lorenzo Lancia</b></sub></a><br /><a href="#translation-LorenzoLancia" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Guy-Adler"><img src="https://avatars.githubusercontent.com/u/44903310?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Guy Adler</b></sub></a><br /><a href="#translation-Guy-Adler" title="Translation">🌍</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
