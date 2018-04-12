<p align="center"><img width=100% src="https://user-images.githubusercontent.com/10369094/31211729-591d059c-a950-11e7-86af-fa5ea3d7dbac.png"></p>


<!--[![Dependencies](https://img.shields.io/david/dawnlabs/carbon.svg)](https://github.com/dawnlabs/carbon/blob/readme-badges/package.json)-->
[![Build Status](https://travis-ci.org/dawnlabs/carbon.svg?branch=master)](https://travis-ci.org/dawnlabs/carbon)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![MIT License](https://img.shields.io/github/license/dawnlabs/carbon.svg)](https://github.com/dawnlabs/carbon/blob/master/LICENSE)
<br></br>
[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/dawnlabs/carbon&env=TWITTER_CONSUMER_KEY&env=TWITTER_CONSUMER_SECRET&env=TWITTER_ACCESS_TOKEN_KEY&env=TWITTER_ACCESS_TOKEN_SECRET&env=LOGS_SECRET_PREFIX)

## Introduction

You know [all](https://twitter.com/dan_abramov/status/890191815567175680) [of](https://twitter.com/reactjs/status/890511993261654017) [those](https://twitter.com/notquiteleo/status/873483329345028096) [code](https://twitter.com/thejameskyle/status/884986927954497536) [screenshots](https://twitter.com/zeithq/status/805779711154647040) you see on Twitter? Though the code's usually impressive, we saw room for improvement in the aesthetic department. Carbon makes it easy to create and share beautiful images of your source code. So what are you waiting for? Go impress all of your followers with your newfound design prowess.

Visit [carbon.now.sh](https://carbon.now.sh) or read [our post](https://dawnlabs.io/blog/carbon/) to learn more about the project.

## Features

* **Import from GitHub gist**. Simply append a GitHub gist id to the url
* **Customization**. Customize things like your image's syntax theme, window style, and more
* **Share quickly**. Save your image or Tweet a link with one click

## Example

<p align="center"><img width=100% src="https://user-images.githubusercontent.com/10369094/30791512-cb001438-a167-11e7-952b-f0f0e5c4499e.png"></p>

## Usage

#### Import

There are a few different ways to import code into Carbon:
- Drop a file onto the editor
- Append a GitHub gist id to the url  (e.g. `carbon.now.sh/GIST_ID_HERE`)
- Paste your code directly

#### Customization

Once you've got all of your code into Carbon, you can customize your image by changing the syntax theme, background color, window theme, or padding.

#### Export/Sharing

After you've customized your image you can either Tweet a link to the image, or save it directly.

## Community
Check out these projects our awesome community has created:
- [IntelliJ IDEA `carbon-now-sh`](https://plugins.jetbrains.com/plugin/10469-carbon-now-sh) - Open up the selection in your current IntelliJ IDEA file in Carbon through a context menu
- [Atom `carbon-now-sh`](https://atom.io/packages/carbon-now-sh) - Open up your current Atom file in Carbon with `shift-cmd-A`
- [VS Code `carbon-now-sh`](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh) - Open up your current VS Code file in Carbon with command `carbon`
- [Sublime Text 3 `carbon-now-sh`](https://github.com/molnarmark/carbonSublime) - Open up the selection in your current Sublime Text 3 file with a custom bound key
- [Vim `carbon-now-sh`](https://github.com/kristijanhusak/vim-carbon-now-sh) - Open up the selection in your current Vim/Neovim using function `CarbonNowSh()`
- [Emacs `carbon-now-sh`](https://github.com/veelenga/carbon-now-sh.el) - Open up the selection in your current Emacs using interactive function `carbon-now-sh`

## Contribute

If you have discovered a bug or have a feature suggestion, feel free to create an issue on Github.

If you'd like to make some changes yourself, see the following:
1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Make sure yarn is globally installed (`npm install -g yarn`)
3. Run `yarn` to download required packages.
4. Build and start the application: `yarn dev`
5. If you contributed something new, run `yarn contrib:add <your GitHub username>` to add yourself [below](#contributors)
6. Finally, submit a [pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) with your changes!

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!

### A note on adding themes/languages
We're happy to accept any PRs adding new themes and languages to Carbon! Currently there are a few ways to do so:

1. If the [theme](https://codemirror.net/demo/theme.html) or [language](https://codemirror.net/mode/index.html) is supported in Codemirror, all you have to do is add a [constant](https://github.com/dawnlabs/carbon/blob/master/lib/constants.js) for it.

2. If it's not supported, you can add a Codemirror compliant [custom file](https://github.com/dawnlabs/carbon/tree/master/lib/custom) to implement it and add a constant like above.

## Thanks To
[ ▲ ZEIT ](https://zeit.co/) for sponsoring Carbon's hosting.

## Authors
Carbon is a project by <a href="http://dawnlabs.io/"><img width=8% src="https://cloud.githubusercontent.com/assets/10369094/25406306/dacebd4c-29cb-11e7-8e1c-468687cde495.png"></a>
- Mike Fix ([@mfix22](https://github.com/mfix22))
- Brian Dennis ([@briandennis](https://github.com/briandennis))
- Jake Dexheimer ([@jakedex](https://github.com/jakedex))

## Contributors

Thanks goes out to all these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/10078572?v=4" width="100px;"/><br /><sub><b>briandennis</b></sub>](https://github.com/briandennis)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=briandennis "Code") [📖](https://github.com/dawnlabs/carbon/commits?author=briandennis "Documentation") [🚇](#infra-briandennis "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-briandennis "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/8397708?v=4" width="100px;"/><br /><sub><b>mfix22</b></sub>](https://github.com/mfix22)<br />[💬](#question-mfix22 "Answering Questions") [💻](https://github.com/dawnlabs/carbon/commits?author=mfix22 "Code") [🤔](#ideas-mfix22 "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/10369094?v=4" width="100px;"/><br /><sub><b>jakedex</b></sub>](https://github.com/jakedex)<br />[💬](#question-jakedex "Answering Questions") [💻](https://github.com/dawnlabs/carbon/commits?author=jakedex "Code") [🎨](#design-jakedex "Design") [📹](#video-jakedex "Videos") | [<img src="https://avatars1.githubusercontent.com/u/10191084?v=4" width="100px;"/><br /><sub><b>andrewda</b></sub>](https://github.com/andrewda)<br />[💬](#question-andrewda "Answering Questions") [💻](https://github.com/dawnlabs/carbon/commits?author=andrewda "Code") [🐛](https://github.com/dawnlabs/carbon/issues?q=author%3Aandrewda "Bug reports") [👀](#review-andrewda "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/14703164?v=4" width="100px;"/><br /><sub><b>yeskunall</b></sub>](https://github.com/yeskunall)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=yeskunall "Code") [📖](https://github.com/dawnlabs/carbon/commits?author=yeskunall "Documentation") [🔧](#tool-yeskunall "Tools") [🐛](https://github.com/dawnlabs/carbon/issues?q=author%3Ayeskunall "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/2652676?v=4" width="100px;"/><br /><sub><b>stoshfabricius</b></sub>](https://github.com/stoshfabricius)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=stoshfabricius "Code") | [<img src="https://avatars1.githubusercontent.com/u/11639896?v=4" width="100px;"/><br /><sub><b>jkling38</b></sub>](https://github.com/jkling38)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=jkling38 "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/225946?v=4" width="100px;"/><br /><sub><b>otobrglez</b></sub>](https://github.com/otobrglez)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=otobrglez "Code") | [<img src="https://avatars3.githubusercontent.com/u/11488612?v=4" width="100px;"/><br /><sub><b>darahak</b></sub>](https://github.com/darahak)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=darahak "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/246651?v=4" width="100px;"/><br /><sub><b>dom96</b></sub>](https://github.com/dom96)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=dom96 "Code") | [<img src="https://avatars3.githubusercontent.com/u/784056?v=4" width="100px;"/><br /><sub><b>elrumordelaluz</b></sub>](https://github.com/elrumordelaluz)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=elrumordelaluz "Code") | [<img src="https://avatars2.githubusercontent.com/u/21217?v=4" width="100px;"/><br /><sub><b>cjb</b></sub>](https://github.com/cjb)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=cjb "Code") | [<img src="https://avatars1.githubusercontent.com/u/5427083?v=4" width="100px;"/><br /><sub><b>Krzysztof-Cieslak</b></sub>](https://github.com/Krzysztof-Cieslak)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=Krzysztof-Cieslak "Code") | [<img src="https://avatars0.githubusercontent.com/u/2369851?v=4" width="100px;"/><br /><sub><b>fernahh</b></sub>](https://github.com/fernahh)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=fernahh "Documentation") |
| [<img src="https://avatars1.githubusercontent.com/u/10941033?v=4" width="100px;"/><br /><sub><b>g3r4n</b></sub>](https://github.com/g3r4n)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=g3r4n "Code") | [<img src="https://avatars0.githubusercontent.com/u/55830?v=4" width="100px;"/><br /><sub><b>Mat Gadd</b></sub>](http://drarok.com/)<br />[🐛](https://github.com/dawnlabs/carbon/issues?q=author%3ADrarok "Bug reports") [💻](https://github.com/dawnlabs/carbon/commits?author=Drarok "Code") | [<img src="https://avatars1.githubusercontent.com/u/11805775?v=4" width="100px;"/><br /><sub><b>Brad Davies</b></sub>](https://bradlab.co.uk)<br />[🐛](https://github.com/dawnlabs/carbon/issues?q=author%3Avarbrad "Bug reports") [💻](https://github.com/dawnlabs/carbon/commits?author=varbrad "Code") | [<img src="https://avatars1.githubusercontent.com/u/9087886?v=4" width="100px;"/><br /><sub><b>Rafael Câmara</b></sub>](http://www.rafaelcamaram.com/)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=rafaelcamaram "Code") | [<img src="https://avatars1.githubusercontent.com/u/2212006?v=4" width="100px;"/><br /><sub><b>Gleb Bahmutov</b></sub>](https://glebbahmutov.com/)<br />[⚠️](https://github.com/dawnlabs/carbon/commits?author=bahmutov "Tests") [🔧](#tool-bahmutov "Tools") | [<img src="https://avatars2.githubusercontent.com/u/10677789?v=4" width="100px;"/><br /><sub><b>Iván Munguía</b></sub>](https://ivan-munguia.netlify.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=warborn "Code") | [<img src="https://avatars1.githubusercontent.com/u/2755722?v=4" width="100px;"/><br /><sub><b>Dillon Mulroy</b></sub>](https://dillonmulroy.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=dmmulroy "Code") |
| [<img src="https://avatars2.githubusercontent.com/u/253398?v=4" width="100px;"/><br /><sub><b>Nihad Abbasov</b></sub>](https://github.com/NARKOZ)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=NARKOZ "Code") | [<img src="https://avatars1.githubusercontent.com/u/7328625?v=4" width="100px;"/><br /><sub><b>Hugo Torzuoli</b></sub>](https://torzuolih.github.io)<br />[📖](https://github.com/dawnlabs/carbon/commits?author=TorzuoliH "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/1906977?v=4" width="100px;"/><br /><sub><b>Bruno C. Couto</b></sub>](https://github.com/bruno02221)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=bruno02221 "Code") | [<img src="https://avatars2.githubusercontent.com/u/13263073?v=4" width="100px;"/><br /><sub><b>Mark Molnar</b></sub>](https://github.com/molnarmark)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=molnarmark "Code") | [<img src="https://avatars1.githubusercontent.com/u/1459450?v=4" width="100px;"/><br /><sub><b>Takahiko Inayama</b></sub>](https://www.behance.net/tetra2000)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=TETRA2000 "Code") | [<img src="https://avatars1.githubusercontent.com/u/14319020?v=4" width="100px;"/><br /><sub><b>François Martin</b></sub>](https://github.com/martinfrancois)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=martinfrancois "Code") | [<img src="https://avatars3.githubusercontent.com/u/3630346?v=4" width="100px;"/><br /><sub><b>Raphael Amorim</b></sub>](http://raphamorim.io)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=raphamorim "Code") |
| [<img src="https://avatars0.githubusercontent.com/u/27292?v=4" width="100px;"/><br /><sub><b>Camron Flanders</b></sub>](http://camronflanders.com)<br />[💻](https://github.com/dawnlabs/carbon/commits?author=camflan "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->
