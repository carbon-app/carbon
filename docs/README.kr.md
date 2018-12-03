<p align="center"><img width=100% src="https://user-images.githubusercontent.com/10369094/31211729-591d059c-a950-11e7-86af-fa5ea3d7dbac.png"></p>


<!--[![Dependencies](https://img.shields.io/david/dawnlabs/carbon.svg)](https://github.com/dawnlabs/carbon/blob/readme-badges/package.json)-->
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![MIT License](https://img.shields.io/github/license/dawnlabs/carbon.svg)](https://github.com/dawnlabs/carbon/blob/master/LICENSE)
[![Greenkeeper badge](https://badges.greenkeeper.io/dawnlabs/carbon.svg)](https://greenkeeper.io/)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/carbon-now)
<br></br>
[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/dawnlabs/carbon&env=TWITTER_CONSUMER_KEY&env=TWITTER_CONSUMER_SECRET&env=TWITTER_ACCESS_TOKEN_KEY&env=TWITTER_ACCESS_TOKEN_SECRET&env=LOGS_SECRET_PREFIX)

##### Translations
- [Español](/docs/README.es.md)
- [हिंदी](/docs/README.hi.md)
- [Deutsch](/docs/README.de.md)
- [简体中文](/docs/README.cn.zh.md)
- [Português](/docs/README.br.pt.md)
- [മലയാളം](/docs/README.ml.md)
- [Türkçe](/docs/README.tr.md)
- [한국어](/docs/README.kr.md)

## Introduction

트위터에서 공유되고 있는 [그](https://twitter.com/dan_abramov/status/890191815567175680) [많은](https://twitter.com/reactjs/status/890511993261654017) [코드](https://twitter.com/notquiteleo/status/873483329345028096) [스크린샷](https://twitter.com/zeithq/status/805779711154647040)들을 알고 계신가요? 코드들은 대체로 훌륭하지만, 미적인 부분에서 조금 개선할 점이 보입니다. Carbon은 당신의 소스코드를 손쉽게 아름다운 이미지로 만들고, 공유할 수 있게 합니다. 무엇을 망설이나요? 당신의 디자인 감각으로 follower들을 감동시키세요!

이 프로젝트를 더 알고싶다면 [carbon.now.sh](https://carbon.now.sh)에 방문하시거나 [우리의 post](https://dawnlabs.io/case-studies/carbon/)를 읽어주세요.
## Features

* **GitHub gist에서 가져오기**. 그저 url에 github gist id를 입력하세요.
* **커스터마이징**.  코드 스크린샷의 syntax theme, window style 등 많은 것들을 커스터마이징하세요.
* **빠르게 공유하기**. 클릭 한 번으로 이미지를 저장하거나 Tweet에 공유하세요.

## Example

<p align="center"><img width=100% src="https://user-images.githubusercontent.com/10369094/30791512-cb001438-a167-11e7-952b-f0f0e5c4499e.png"></p>

## Usage

#### Import

Carbon에 코드를 적용시키는데는 몇 가지 방법이 있습니다: 
- 편집기에 file을 놓기
- url에 GitHub gist id 붙여넣기 (예시. `carbon.now.sh/GIST_ID_HERE`)
- Paste your code directly

#### Customization

Carbon에 코드를 넣었다면, syntax theme, 배경 색, window theme 그리고 padding 등 이미지를 커스터마이징 할 수 있습니다.

#### Export/Sharing

코드 이미지를 커스터마이징 하고 나면, 곧바로 이미지를 저장하고, Tweet에 공유 할 수 있습니다. 

## Community
우리의 멋진 커뮤니티가 만든 아래의 프로젝트들을 확인해보세요:

##### Editor Plugins
- [IntelliJ IDEA `carbon-now-sh`](https://plugins.jetbrains.com/plugin/10469-carbon-now-sh) - context menu를 통해서 IntelliJ IDEA file의 선택 영역을 Carbon에서 엽니다.
- [Atom `carbon-now-sh`](https://atom.io/packages/carbon-now-sh) - `shift-cmd-A`를 사용해 현재 보고있는 Atom 파일을 Carbon에서 엽니다. 
- [VS Code `carbon-now-sh`](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh) - `carbon`명령어를 사용해 현재 보고있는 VS Code 파일을 Carbon에서 엽니다.
- [Sublime Text 3 `carbon-now-sh`](https://github.com/molnarmark/carbonSublime) - 
커스텀 키를 사용해 Sublime Text 3 파일의 선택 영역을 Carbon에서 엽니다. 
- [Vim `carbon-now-sh`](https://github.com/kristijanhusak/vim-carbon-now-sh) - 
`CarbonNowSh()` 함수를 사용해 현재 보고 있는 Vim/Neovim 선택 영역을 엽니다.
- [Emacs `carbon-now-sh`](https://github.com/veelenga/carbon-now-sh.el) - ineractive 함수인 `carbon-now-sh`를 사용해 현재 보고있는 Emacs 선택 영역을 엽니다.

##### CLIs
- [CLI `carbon-now-cli`](https://github.com/mixn/carbon-now-cli) - `carbon-now` 명령을 사용해서 곧바로 파일을 열거나 다운로드 받으세요. 이 것은 대화형 모드가 지원되고 선택인 하이라이팅 등 많은 것들을 지원합니다.

##### Libraries
- [R `carbonate`](https://yonicd.github.io/carbonate/) - `R`을 통해서 이미지의 미적인 부분을 조작하고, 그 이미지를 다운 받거나 Carbon에서 열 수 있습니다. 

##### Textbooks
- ["CS 101 - An Introduction to Computational Thinking"](https://itunes.apple.com/us/book/id1435714196) - Sarbo Roy가 쓴 컴퓨터 사이언스 교과서.

## Contribute
풀리퀘스트는 환영합니다! 더 자세한 내용은 [CONTRIBUTING.md](https://github.com/dawnlabs/carbon/blob/master/.github/CONTRIBUTING.md)를 참조해주세요.
## Thanks To
[ ▲ ZEIT ](https://zeit.co/)가 Carbon 호스팅을 지원해주고 있습니다..

## Authors
Carbon is a project by <a href="http://dawnlabs.io/"><img width=8% src="https://cloud.githubusercontent.com/assets/10369094/25406306/dacebd4c-29cb-11e7-8e1c-468687cde495.png"></a>
- Mike Fix ([@mfix22](https://github.com/mfix22))
- Brian Dennis ([@briandennis](https://github.com/briandennis))
- Jake Dexheimer ([@jakedex](https://github.com/jakedex))

## Contributors

아래의 모든 멋진 분들께 감사 드립니다 ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/10078572?v=4" width="100px;"/><br /><sub><b>briandennis</b></sub>](https://github.com/briandennis)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=briandennis "Code") [📖](https://github.com/dawnlabs/carbon/commits?author=briandennis "Documentation") [🚇](#infra-briandennis "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-briandennis "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/8397708?v=4" width="100px;"/><br /><sub><b>mfix22</b></sub>](https://github.com/mfix22)<br />[💬](#question-mfix22 "Answering Questions") [💻](https://github.com/dawnlabs/carbon/commits?author=mfix22 "Code") [🤔](#ideas-mfix22 "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/10369094?v=4" width="100px;"/><br /><sub><b>jakedex</b></sub>](https://github.com/jakedex)<br />[💬](#question-jakedex "Answering Questions") [💻](https://github.com/dawnlabs/carbon/commits?author=jakedex "Code") [🎨](#design-jakedex "Design") [📹](#video-jakedex "Videos") | [<img src="https://avatars1.githubusercontent.com/u/10191084?v=4" width="100px;"/><br /><sub><b>andrewda</b></sub>](https://github.com/andrewda)<br />[💬](#question-andrewda "Answering Questions") [💻](https://github.com/dawnlabs/carbon/commits?author=andrewda "Code") [🐛](https://github.com/dawnlabs/carbon/issues?q=author%3Aandrewda "Bug reports") [👀](#review-andrewda "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/14703164?v=4" width="100px;"/><br /><sub><b>yeskunall</b></sub>](https://github.com/yeskunall)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=yeskunall "Code") [📖](https://github.com/dawnlabs/carbon/commits?author=yeskunall "Documentation") [🔧](#tool-yeskunall "Tools") [🐛](https://github.com/dawnlabs/carbon/issues?q=author%3Ayeskunall "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/2652676?v=4" width="100px;"/><br /><sub><b>stoshfabricius</b></sub>](https://github.com/stoshfabricius)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=stoshfabricius "Code") | [<img src="https://avatars1.githubusercontent.com/u/11639896?v=4" width="100px;"/><br /><sub><b>jkling38</b></sub>](https://github.com/jkling38)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=jkling38 "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/225946?v=4" width="100px;"/><br /><sub><b>otobrglez</b></sub>](https://github.com/otobrglez)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=otobrglez "Code") | [<img src="https://avatars3.githubusercontent.com/u/11488612?v=4" width="100px;"/><br /><sub><b>darahak</b></sub>](https://github.com/darahak)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=darahak "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/246651?v=4" width="100px;"/><br /><sub><b>dom96</b></sub>](https://github.com/dom96)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=dom96 "Code") | [<img src="https://avatars3.githubusercontent.com/u/784056?v=4" width="100px;"/><br /><sub><b>elrumordelaluz</b></sub>](https://github.com/elrumordelaluz)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=elrumordelaluz "Code") | [<img src="https://avatars2.githubusercontent.com/u/21217?v=4" width="100px;"/><br /><sub><b>cjb</b></sub>](https://github.com/cjb)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=cjb "Code") | [<img src="https://avatars1.githubusercontent.com/u/5427083?v=4" width="100px;"/><br /><sub><b>Krzysztof-Cieslak</b></sub>](https://github.com/Krzysztof-Cieslak)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=Krzysztof-Cieslak "Code") | [<img src="https://avatars0.githubusercontent.com/u/2369851?v=4" width="100px;"/><br /><sub><b>fernahh</b></sub>](https://github.com/fernahh)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=fernahh "Documentation") |
| [<img src="https://avatars1.githubusercontent.com/u/10941033?v=4" width="100px;"/><br /><sub><b>g3r4n</b></sub>](https://github.com/g3r4n)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=g3r4n "Code") | [<img src="https://avatars0.githubusercontent.com/u/55830?v=4" width="100px;"/><br /><sub><b>Mat Gadd</b></sub>](http://drarok.com/)<br />[🐛](https://github.com/dawnlabs/carbon/issues?q=author%3ADrarok "Bug reports") [💻](https://github.com/dawnlabs/carbon/commits?author=Drarok "Code") | [<img src="https://avatars1.githubusercontent.com/u/11805775?v=4" width="100px;"/><br /><sub><b>Brad Davies</b></sub>](https://bradlab.co.uk)<br />[🐛](https://github.com/dawnlabs/carbon/issues?q=author%3Avarbrad "Bug reports") [💻](https://github.com/dawnlabs/carbon/commits?author=varbrad "Code") | [<img src="https://avatars1.githubusercontent.com/u/9087886?v=4" width="100px;"/><br /><sub><b>Rafael Câmara</b></sub>](http://www.rafaelcamaram.com/)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=rafaelcamaram "Code") | [<img src="https://avatars1.githubusercontent.com/u/2212006?v=4" width="100px;"/><br /><sub><b>Gleb Bahmutov</b></sub>](https://glebbahmutov.com/)<br />[⚠️](https://github.com/dawnlabs/carbon/commits?author=bahmutov "Tests") [🔧](#tool-bahmutov "Tools") | [<img src="https://avatars2.githubusercontent.com/u/10677789?v=4" width="100px;"/><br /><sub><b>Iván Munguía</b></sub>](https://ivan-munguia.netlify.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=warborn "Code") | [<img src="https://avatars1.githubusercontent.com/u/2755722?v=4" width="100px;"/><br /><sub><b>Dillon Mulroy</b></sub>](https://dillonmulroy.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=dmmulroy "Code") |
| [<img src="https://avatars2.githubusercontent.com/u/253398?v=4" width="100px;"/><br /><sub><b>Nihad Abbasov</b></sub>](https://github.com/NARKOZ)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=NARKOZ "Code") | [<img src="https://avatars1.githubusercontent.com/u/7328625?v=4" width="100px;"/><br /><sub><b>Hugo Torzuoli</b></sub>](https://torzuolih.github.io)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=TorzuoliH "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/1906977?v=4" width="100px;"/><br /><sub><b>Bruno C. Couto</b></sub>](https://github.com/imbrn)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=imbrn "Code") | [<img src="https://avatars2.githubusercontent.com/u/13263073?v=4" width="100px;"/><br /><sub><b>Mark Molnar</b></sub>](https://github.com/molnarmark)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=molnarmark "Code") | [<img src="https://avatars1.githubusercontent.com/u/1459450?v=4" width="100px;"/><br /><sub><b>Takahiko Inayama</b></sub>](https://www.behance.net/tetra2000)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=TETRA2000 "Code") | [<img src="https://avatars1.githubusercontent.com/u/14319020?v=4" width="100px;"/><br /><sub><b>François Martin</b></sub>](https://github.com/martinfrancois)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=martinfrancois "Code") | [<img src="https://avatars3.githubusercontent.com/u/3630346?v=4" width="100px;"/><br /><sub><b>Raphael Amorim</b></sub>](http://raphamorim.io)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=raphamorim "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/27292?v=4" width="100px;"/><br /><sub><b>Camron Flanders</b></sub>](http://camronflanders.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=camflan "Code") | [<img src="https://avatars0.githubusercontent.com/u/6516758?v=4" width="100px;"/><br /><sub><b>Eric Adamski</b></sub>](https://ericadamski.github.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=ericadamski "Code") | [<img src="https://avatars0.githubusercontent.com/u/4671080?v=4" width="100px;"/><br /><sub><b>Winner Crespo</b></sub>](http://winnercrespo.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=wistcc "Code") [🎨](#design-wistcc "Design") | [<img src="https://avatars3.githubusercontent.com/u/672237?v=4" width="100px;"/><br /><sub><b>Milos</b></sub>](http://twitter.com/mixn)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=mixn "Code") [🔧](#tool-mixn "Tools") [📖](https://github.com/dawnlabs/carbon/commits?author=mixn "Documentation") [🌍](#translation-mixn "Translation") | [<img src="https://avatars1.githubusercontent.com/u/29014463?v=4" width="100px;"/><br /><sub><b>Yashu Mittal</b></sub>](https://mittalyashu.now.sh/)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=mittalyashu "Code") | [<img src="https://avatars0.githubusercontent.com/u/22792183?v=4" width="100px;"/><br /><sub><b>Rachel M. Carmena</b></sub>](https://twitter.com/bberrycarmen)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=rachelcarmena "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/19369949?v=4" width="100px;"/><br /><sub><b>Miguel Salazar</b></sub>](https://www.linkedin.com/in/miguel-salazar-823b07a1/)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=ucdstudent95618 "Documentation") [🌍](#translation-ucdstudent95618 "Translation") |
| [<img src="https://avatars3.githubusercontent.com/u/19145803?v=4" width="100px;"/><br /><sub><b>Vyom Jain</b></sub>](https://www.linkedin.com/in/vyom-jain-233a28139)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=vvyomjjain "Documentation") [🌍](#translation-vvyomjjain "Translation") | [<img src="https://avatars0.githubusercontent.com/u/5010047?v=4" width="100px;"/><br /><sub><b>racaljk</b></sub>](http://www.cnblogs.com/racaljk/)<br />[🌍](#translation-racaljk "Translation") | [<img src="https://avatars3.githubusercontent.com/u/3892149?v=4" width="100px;"/><br /><sub><b>Sean</b></sub>](https://lastblocklabs.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=raboid "Code") | [<img src="https://avatars0.githubusercontent.com/u/19255077?v=4" width="100px;"/><br /><sub><b>Izabela Borges</b></sub>](http://izabelacborges.com/)<br />[🌍](#translation-izabelacborges "Translation") | [<img src="https://avatars2.githubusercontent.com/u/18573510?v=4" width="100px;"/><br /><sub><b>Shinil M S</b></sub>](https://ghuser.io/shinilms)<br />[🌍](#translation-shinilms "Translation") | [<img src="https://avatars1.githubusercontent.com/u/10579633?v=4" width="100px;"/><br /><sub><b>Berke Atac</b></sub>](https://github.com/berkeatac)<br />[🌍](#translation-berkeatac "Translation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->
