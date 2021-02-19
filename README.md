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

##### Translations

<table>
  <tbody>
    <tr>
      <td>
        <a href="/docs/README.es.md">Español</a>
      </td>
      <td>
        <a href="/docs/README.hi.md">हिंदी</a>
      </td>
      <td>
        <a href="/docs/README.de.md">Deutsch</a>
      </td>
      <td>
        <a href="/docs/README.cn.zh.md">简体中文</a>
      </td>
      <td>
        <a href="/docs/README.br.pt.md">Português</a>
      </td>
      <td>
        <a href="/docs/README.ml.md">മലയാളം</a>
      </td>
      <td>
        <a href="/docs/README.tr.md">Türkçe</a>
      </td>
      <td>
        <a href="/docs/README.kr.md">한국어</a>
      </td>
      <td>
        <a href="/docs/README.ta.md">தமிழ்</a>
      </td>
    </tr>
    <tr>      
      <td>
        <a href="/docs/README.fr.md">Français</a>
      </td>
      <td>
        <a href="/docs/README.ja.md">日本語</a>
      </td>
      <td>
        <a href="/docs/README.se.md">Svenska</a>
      </td>
      <td>
        <a href="/docs/README.pl.md">Polski</a>
      </td>
      <td align="center">
        <a href="/docs/README.nl.md">Nederlands</a>
      </td>
      <td>
        <a href="/docs/README.tw.md">臺灣</a>
      </td>
      <td>
        <a href="/docs/README.in.md">Indonesia</a>
      </td>
       <td>
        <a href="https://github.com/carbon-app/carbon/new/main/docs?filename=docs/README.%3Cnew%20language%3E.md">Add +</a>
      </td>
    </tr>
  </tbody>
</table>

## Introduction

You know [all](https://twitter.com/dan_abramov/status/890191815567175680) [of those](https://twitter.com/reactjs/status/890511993261654017) [code screenshots](https://twitter.com/notquiteleo/status/873483329345028096) you see on Twitter? Though the code's usually impressive, we saw room for improvement in the aesthetic department. Carbon makes it easy to create and share beautiful images of your source code. So what are you waiting for? Go impress all of your followers with your newfound design prowess.

<p align="center">
  <img width="100%" alt="Carbon example" src="https://user-images.githubusercontent.com/8397708/63456416-b27d1a80-c403-11e9-9572-105b089be885.png">
</p>

## Features

- **Customization**. Customize things like your image's syntax theme, font style, and more
- **Share quickly**. Save your image or
  a link with one click
- **Save snippets**. Create an account to save snippets for later. Shared snippets are automatically unfurled on Twitter and Slack.

## Usage

#### Import

There are a few different ways to import code into Carbon:

- Drop a file onto the editor
- Append a GitHub gist ID to the URL (e.g. [`carbon.now.sh/<gist_id_goes_here>`](https://carbon.now.sh/3208813b324d82a9ebd197e4b1c3bae8))
- Or just start typing!

#### Customization

Once you've got all of your code into Carbon, you can customize your image by changing the syntax theme, background color, window theme, padding, shadows, fonts, and more.

#### Exporting & Sharing

After you've customized your image you can share your snippet in a number of ways

##### Create a saved snippet

Sharing a saved snippet will automatically unfurl the image on platforms like Twitter and Slack. This lets users see your creation, while also giving them access to the source code via the link. Better yet, if you need to make an update, simply follow the link yourself to edit the snippet directly.

To create a saved snippet:

1. Login using the "Sign in/Sign up" button
2. Edit as you normally would — your snippet will get saved automatically
3. Copy the URL from your browser window and share away!

##### Embed a snippet

This is the recommended method for sharing Carbon on your own website or blog. Readers can even copy the code with the click of a button.

You can embed any Carbon snippet in your website directly using the `carbon.now.sh/embed` URL. The "Copy Menu" lets you quickly copy the correct iFrame snippet, or the encoded URL for embedding on platforms like Medium.

Finally, you can also embed saved snippets or GitHub gists using `carbon.now.sh/embed/:id`.

##### Use the Tweet button

The Tweet button will not only share the image on Twitter, but it will also correctly encode the `alt` text to ensure your images are accessible. However, if you want to tweet image yourself, please check out [how to make your Twitter images accessible](https://help.twitter.com/en/using-twitter/picture-descriptions).

##### Download the image directly

Carbon supports downloading your image as a PNG and SVG. You can also click `Export → Open` to open your image directly in the browser. Finally, you can copy the Carbon image directly to your clipboard by going to `Copy → Image`.

#### Installing Carbon for Desktop (Offline)

If you are using Google Chrome, or another browser that supports Progressive Web Apps, you can install Carbon for use offline by:

1. Visit [carbon.now.sh](https://carbon.now.sh)
2. Click your browser's settings menu
3. Click "Install Carbon..."

## Community

Check out these projects our awesome community has created:

##### Editor Plugins

- [IntelliJ IDEA `carbon-now-sh`](https://plugins.jetbrains.com/plugin/10469-carbon-now-sh) - Open up the selection in your current IntelliJ IDEA file in Carbon through a context menu
- [Atom `carbon-now-sh`](https://atom.io/packages/carbon-now-sh) - Open up your current Atom file in Carbon with `shift-cmd-A`
- [VS Code `carbon-now-sh`](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh) - Open up your current VS Code file in Carbon with command `carbon`
- [Sublime Text 3 `carbon-now-sh`](https://github.com/molnarmark/carbonSublime) - Open up the selection in your current Sublime Text 3 file with a custom bound key
- [Vim `carbon-now-sh`](https://github.com/kristijanhusak/vim-carbon-now-sh) - Open up the selection in your current Vim/Neovim using function `CarbonNowSh()`
- [Emacs `carbon-now-sh`](https://github.com/veelenga/carbon-now-sh.el) - Open up the selection in your current Emacs using interactive function `carbon-now-sh`
- [Xcode `carbon-now-sh`](https://github.com/StevenMagdy/CarboNow4Xcode) - Open up your current selection in `carbon.now.sh`
- [Xcode `nef`](https://github.com/bow-swift/nef-plugin) - This Xcode extension enables you to export a code selection as a Carbon snippet in a single action

##### Tools

- [CLI `carbon-now-cli`](https://github.com/mixn/carbon-now-cli) - Open a file in Carbon or download it directly using `carbon-now`, featuring an interactive mode, selective highlighting and more
- [CodeExpander](https://codeexpander.com) - A smart GitHub gist client with the TextExpander features
- [`nef`](https://github.com/bow-swift/nef#-exporting-carbon-code-snippets) - Export multiple Carbon code snippets from `Xcode Playground`.
- [`@carbonshbot`](https://t.me/carbonshbot) - A Telegram chatbot wich takes in a code snippet or gist URL and generates an Carbon image
- [R `carbonate`](https://yonicd.github.io/carbonate/) - Iteratively manipulate image aesthetics in `R` and either open in Carbon or download directly.

##### Citations

- ["CS 101 - An Introduction to Computational Thinking"](https://itunes.apple.com/us/book/id1435714196) - a computer science textbook by Sarbo Roy.

## Authors

Carbon is a project by:

- Mike Fix ([@mfix22](https://twitter.com/fixitup2))
- Brian Dennis ([@briandennis](https://github.com/briandennis))
- Jake Dexheimer ([@jakedex](https://github.com/jakedex))

#### License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon?ref=badge_large)

<br />
<br />

---

## Contribute & Support

Pull requests are welcome! Please see our [contributing guidelines](/.github/CONTRIBUTING.md) for more details.

### Sponsors & Backers

<a href="https://fossa.com" style="margin-right: 2rem;" target="_blank"><img width="160px" src="https://assets-global.website-files.com/5f4d9ea2592c16056cb0f7a5/5f4d9ea2592c16d9a2b0f7da_logo-FOSSA-night-blue.svg" /></a>


### Thanks To

[ ▲ Vercel ](https://vercel.com/) for sponsoring Carbon's hosting.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2Fcarbon-app%2Fcarbon&project-name=carbon&repo-name=carbon)


<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
