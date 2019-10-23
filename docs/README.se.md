<p align="center">
  <img width="100%" src="https://user-images.githubusercontent.com/10369094/31211729-591d059c-a950-11e7-86af-fa5ea3d7dbac.png" />
</p>

<p align="center">
  <a href="https://reporanger.com">
    <img src="https://img.shields.io/badge/maintained%20with-Ranger-1f93f3.svg" alt="maintained with Ranger" />  
  </a>
  <a href="#contributors">
    <img src="https://img.shields.io/badge/all_contributors-53-orange.svg" alt="All Contributors" />
  </a>
  <a href="https://github.com/carbon-app/carbon/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/carbon-app/carbon.svg" alt="MIT License" />
  </a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon?ref=badge_shield">
    <img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon.svg?type=shield" alt="FOSSA Status" />
  </a>
</p>

<p align="center">
  <a href="https://opencollective.com/carbon-app">
    <img src="https://opencollective.com/carbon-app/tiers/badge.svg?label=Financial%20Contributors&color=297eff" alt="Open Collective sponsors" />
  </a>
  <a href="https://opencollective.com/carbon-app#backers">
    <img src="https://opencollective.com/carbon-app/tiers/backers/badge.svg?label=Backers&color=297eff" alt="Open Collective backers" />
  </a>
  <a href="https://opencollective.com/carbon-app#sponsors">
    <img src="https://opencollective.com/carbon-app/tiers/sponsors/badge.svg?label=Sponsors&color=297eff" alt="Open Collective sponsors" />
  </a>
</p>

<br>

## Introduktion

Du vet [alla](https://twitter.com/dan_abramov/status/890191815567175680) [dom](https://twitter.com/reactjs/status/890511993261654017) [där](https://twitter.com/notquiteleo/status/873483329345028096) [kodskärmdumparna](https://twitter.com/zeithq/status/805779711154647040) som du ser på Twitter? Även om koden vanligtvis är imponerande såg vi utrymme för förbättringar inom den estetiska avdelningen. Carbon gör det enkelt att skapa och dela vackra bilder av din källkod. Så vad väntar du på? Gå imponera på alla dina följare med dina nyfunna designfärdigheter.

<p align="center">
  <img width="100%" alt="Carbon example" src="https://user-images.githubusercontent.com/8397708/63456416-b27d1a80-c403-11e9-9572-105b089be885.png">
</p>

## Funktioner

- **Anpassning**. Anpassa saker som bildens syntaxtema, fönsterstil och mer
- **Dela snabbt**. Spara din bild eller en länk med ett klick
- **Importera från GitHub gist**. Lägg superlätt till ett GitHub gist id till url:en

## Användande

#### Importera

Det finns några olika sätt att importera kod till Carbon:

- Släpp en fil till editorn
- Lägg till ett GitHub gist id till url:en (t.ex. "carbon.now.sh / GIST_ID_HERE")
- Klistra in din kod direkt

#### Anpassning

När du har fått all din kod i Carbon, kan du anpassa din bild genom att ändra syntaxtema, bakgrundsfärg, fönstertema eller padding.

#### Exportera/Delning

När du har anpassat din bild kan du antingen Tweet:a en länk till bilden eller spara den direkt.

Om du använder &apos;Tweet&apos;-knappen, kommer Carbon automatiskt göra din bild tillgänglig. Om du däremot vill tweet:a din bild manuellt, kolla in [hur du gör dina Twitterbilder åtkomliga](https://help.twitter.com/en/using-twitter/picture-descriptions).

Om du inkluderar en Carbon bild i ett inlägg, kommer källkoden att vara osynlig för hjälpmedel, det kommer inte att vara möjligt att förstora den eller kopiera, osv. Tänk på att göra källkoden tillgänglig i text, som ett [HTML Details Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) under bilden.

#### Installera Carbon för skrivbordet (Offline)

Om du använder Google Chrome, eller en annan webbläsare som stöder Progressive Web Apps, kan du installera Carbon för användning offline genom att:

1. Besöka [https://carbon.now.sh](https://carbon.now.sh)
2. Klicka på webbläsarens inställningsmeny
3. Klicka på "Installera Carbon..."

## Community

Kolla in dessa projekt som vår fantastiska community har skapat:

##### Editor Plugins

- [IntelliJ IDEA `carbon-now-sh`](https://plugins.jetbrains.com/plugin/10469-carbon-now-sh) - Öppna urvalet i din nuvarande IntelliJ IDEA fil i Carbon genom en kontext meny
- [Atom `carbon-now-sh`](https://atom.io/packages/carbon-now-sh) - Öppna din nuvarande Atom fil i Carbon med `shift-cmd-A`
- [VS Code `carbon-now-sh`](https://marketplace.visualstudio.com/items?itemName=ericadamski.carbon-now-sh) - Öppna din nuvarande VS Code fil i Carbon med kommando `carbon`
- [Sublime Text 3 `carbon-now-sh`](https://github.com/molnarmark/carbonSublime) - Öppna urvalet i din nuvarande Sublime Text 3 fil med en anpassad bunden nyckel
- [Vim `carbon-now-sh`](https://github.com/kristijanhusak/vim-carbon-now-sh) - Öppna urvalet i din aktuella Vim/Neovim med funktionen `CarbonNowSh()`
- [Emacs `carbon-now-sh`](https://github.com/veelenga/carbon-now-sh.el) - Öppna urvalet i dina nuvarande Emacs med hjälp av interaktiv funktionen `carbon-now-sh`
- [Xcode `carbon-now-sh`](https://github.com/StevenMagdy/CarboNow4Xcode) - Öppna ditt nuvarande val i `carbon.now.sh`

##### Verktyg

- [CLI `carbon-now-cli`](https://github.com/mixn/carbon-now-cli) - Öppna en fil i Carbon eller ladda ner den direkt med `carbon-now`, med ett interaktivt läge, selektiv markering och mer
- [Carbonize](https://itunes.apple.com/us/app/carbonize/id1451177988) - Ett macOS omslag med utökade inbyggda funktioner
- [CodeExpander](https://codeexpander.com) - En smart GitHub gist klient med TextExpander funktionerna.
- [`nef`](https://github.com/bow-swift/nef#-exporting-carbon-code-snippets) - Exportera flera Carbon kodavsnitt från `Xcode Playground`.

##### Bibliotek

- [R `carbonate`](https://yonicd.github.io/carbonate/) - Iterativt manipulera bildestetik i `R` och antingen öppna i Carbon eller ladda ner direkt.

##### Läroböcker

- ["CS 101 - An Introduction to Computational Thinking"](https://itunes.apple.com/us/book/id1435714196) - En datavetenskaplig lärobok av Sarbo Roy.

## Författare

Carbon är ett projekt av:

- Mike Fix ([@mfix22](https://twitter.com/fixitup2))
- Brian Dennis ([@briandennis](https://github.com/briandennis))
- Jake Dexheimer ([@jakedex](https://github.com/jakedex))

#### Licens

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcarbon-app%2Fcarbon?ref=badge_large)

<br />
<br />

---

## Bidra & Support

Pull requests är välkomna! Snälla Se våra [bidragsriktlinjer](https://github.com/carbon-app/carbon/blob/master/.github/CONTRIBUTING.md) för mer detaljer.

### Sponsorer

Använder ditt företag Carbon? Överväg att sponsra projektet för att finansiera nya funktioner, bugfixar och mer.

<a href="https://fossa.com" style="margin-right: 2rem;" target="_blank"><img width="280px" src="https://fossa.com/images/logo.svg" /></a>
<a href="https://opencollective.com/carbon-app/sponsors/0/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/0/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/1/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/1/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/2/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/2/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/3/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/3/avatar"></a>
<a href="https://opencollective.com/carbon-app/sponsors/4/website" target="_blank"><img src="https://opencollective.com/carbon-app/sponsors/4/avatar"></a>

### Backers

Älskar du att använda Carbon? Överväg att stödja projektet för att hitta nya funktioner och förbättringar

<a href="https://opencollective.com/carbon-app/backers/0/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/0/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/1/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/1/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/2/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/2/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/3/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/3/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/4/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/4/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/5/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/5/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/6/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/6/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/7/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/7/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/8/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/8/avatar"></a>
<a href="https://opencollective.com/carbon-app/backers/9/website" target="_blank"><img src="https://opencollective.com/carbon-app/backers/9/avatar"></a>

### Tack vare

[ ▲ ZEIT ](https://zeit.co/) för sponsring Carbon's hosting.

### Medskapare

![Contributors image](https://opencollective.com/carbon-app/contributors.svg?width=1024)

#### Alla som bidragit

Tack till alla dessa underbara människor ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/briandennis"><img src="https://avatars0.githubusercontent.com/u/10078572?v=4" width="100px;" alt="briandennis"/><br /><sub><b>briandennis</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=briandennis" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/commits?author=briandennis" title="Documentation">📖</a> <a href="#infra-briandennis" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#review-briandennis" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/mfix22"><img src="https://avatars0.githubusercontent.com/u/8397708?v=4" width="100px;" alt="mfix22"/><br /><sub><b>mfix22</b></sub></a><br /><a href="#question-mfix22" title="Answering Questions">💬</a> <a href="https://github.com/carbon-app/carbon/commits?author=mfix22" title="Code">💻</a> <a href="#ideas-mfix22" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jakedex"><img src="https://avatars1.githubusercontent.com/u/10369094?v=4" width="100px;" alt="jakedex"/><br /><sub><b>jakedex</b></sub></a><br /><a href="#question-jakedex" title="Answering Questions">💬</a> <a href="https://github.com/carbon-app/carbon/commits?author=jakedex" title="Code">💻</a> <a href="#design-jakedex" title="Design">🎨</a> <a href="#video-jakedex" title="Videos">📹</a></td>
    <td align="center"><a href="https://github.com/andrewda"><img src="https://avatars1.githubusercontent.com/u/10191084?v=4" width="100px;" alt="andrewda"/><br /><sub><b>andrewda</b></sub></a><br /><a href="#question-andrewda" title="Answering Questions">💬</a> <a href="https://github.com/carbon-app/carbon/commits?author=andrewda" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/issues?q=author%3Aandrewda" title="Bug reports">🐛</a> <a href="#review-andrewda" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/yeskunall"><img src="https://avatars2.githubusercontent.com/u/14703164?v=4" width="100px;" alt="yeskunall"/><br /><sub><b>yeskunall</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=yeskunall" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/commits?author=yeskunall" title="Documentation">📖</a> <a href="#tool-yeskunall" title="Tools">🔧</a> <a href="https://github.com/carbon-app/carbon/issues?q=author%3Ayeskunall" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/stoshfabricius"><img src="https://avatars1.githubusercontent.com/u/2652676?v=4" width="100px;" alt="stoshfabricius"/><br /><sub><b>stoshfabricius</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=stoshfabricius" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jkling38"><img src="https://avatars1.githubusercontent.com/u/11639896?v=4" width="100px;" alt="jkling38"/><br /><sub><b>jkling38</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=jkling38" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/otobrglez"><img src="https://avatars1.githubusercontent.com/u/225946?v=4" width="100px;" alt="otobrglez"/><br /><sub><b>otobrglez</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=otobrglez" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/darahak"><img src="https://avatars3.githubusercontent.com/u/11488612?v=4" width="100px;" alt="darahak"/><br /><sub><b>darahak</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=darahak" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dom96"><img src="https://avatars0.githubusercontent.com/u/246651?v=4" width="100px;" alt="dom96"/><br /><sub><b>dom96</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=dom96" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/elrumordelaluz"><img src="https://avatars3.githubusercontent.com/u/784056?v=4" width="100px;" alt="elrumordelaluz"/><br /><sub><b>elrumordelaluz</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=elrumordelaluz" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cjb"><img src="https://avatars2.githubusercontent.com/u/21217?v=4" width="100px;" alt="cjb"/><br /><sub><b>cjb</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=cjb" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Krzysztof-Cieslak"><img src="https://avatars1.githubusercontent.com/u/5427083?v=4" width="100px;" alt="Krzysztof-Cieslak"/><br /><sub><b>Krzysztof-Cieslak</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=Krzysztof-Cieslak" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/fernahh"><img src="https://avatars0.githubusercontent.com/u/2369851?v=4" width="100px;" alt="fernahh"/><br /><sub><b>fernahh</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=fernahh" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/g3r4n"><img src="https://avatars1.githubusercontent.com/u/10941033?v=4" width="100px;" alt="g3r4n"/><br /><sub><b>g3r4n</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=g3r4n" title="Code">💻</a></td>
    <td align="center"><a href="http://drarok.com/"><img src="https://avatars0.githubusercontent.com/u/55830?v=4" width="100px;" alt="Mat Gadd"/><br /><sub><b>Mat Gadd</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/issues?q=author%3ADrarok" title="Bug reports">🐛</a> <a href="https://github.com/carbon-app/carbon/commits?author=Drarok" title="Code">💻</a></td>
    <td align="center"><a href="https://bradlab.co.uk"><img src="https://avatars1.githubusercontent.com/u/11805775?v=4" width="100px;" alt="Brad Davies"/><br /><sub><b>Brad Davies</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/issues?q=author%3Avarbrad" title="Bug reports">🐛</a> <a href="https://github.com/carbon-app/carbon/commits?author=varbrad" title="Code">💻</a></td>
    <td align="center"><a href="http://www.rafaelcamaram.com/"><img src="https://avatars1.githubusercontent.com/u/9087886?v=4" width="100px;" alt="Rafael Câmara"/><br /><sub><b>Rafael Câmara</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=rafaelcamaram" title="Code">💻</a></td>
    <td align="center"><a href="https://glebbahmutov.com/"><img src="https://avatars1.githubusercontent.com/u/2212006?v=4" width="100px;" alt="Gleb Bahmutov"/><br /><sub><b>Gleb Bahmutov</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=bahmutov" title="Tests">⚠️</a> <a href="#tool-bahmutov" title="Tools">🔧</a></td>
    <td align="center"><a href="https://ivan-munguia.netlify.com"><img src="https://avatars2.githubusercontent.com/u/10677789?v=4" width="100px;" alt="Iván Munguía"/><br /><sub><b>Iván Munguía</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=warborn" title="Code">💻</a></td>
    <td align="center"><a href="https://dillonmulroy.com"><img src="https://avatars1.githubusercontent.com/u/2755722?v=4" width="100px;" alt="Dillon Mulroy"/><br /><sub><b>Dillon Mulroy</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=dmmulroy" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/NARKOZ"><img src="https://avatars2.githubusercontent.com/u/253398?v=4" width="100px;" alt="Nihad Abbasov"/><br /><sub><b>Nihad Abbasov</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=NARKOZ" title="Code">💻</a></td>
    <td align="center"><a href="https://torzuolih.github.io"><img src="https://avatars1.githubusercontent.com/u/7328625?v=4" width="100px;" alt="Hugo Torzuoli"/><br /><sub><b>Hugo Torzuoli</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=TorzuoliH" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/imbrn"><img src="https://avatars1.githubusercontent.com/u/1906977?v=4" width="100px;" alt="Bruno C. Couto"/><br /><sub><b>Bruno C. Couto</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=imbrn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/molnarmark"><img src="https://avatars2.githubusercontent.com/u/13263073?v=4" width="100px;" alt="Mark Molnar"/><br /><sub><b>Mark Molnar</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=molnarmark" title="Code">💻</a></td>
    <td align="center"><a href="https://www.behance.net/tetra2000"><img src="https://avatars1.githubusercontent.com/u/1459450?v=4" width="100px;" alt="Takahiko Inayama"/><br /><sub><b>Takahiko Inayama</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=TETRA2000" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/martinfrancois"><img src="https://avatars1.githubusercontent.com/u/14319020?v=4" width="100px;" alt="François Martin"/><br /><sub><b>François Martin</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=martinfrancois" title="Code">💻</a></td>
    <td align="center"><a href="http://raphamorim.io"><img src="https://avatars3.githubusercontent.com/u/3630346?v=4" width="100px;" alt="Raphael Amorim"/><br /><sub><b>Raphael Amorim</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=raphamorim" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://camronflanders.com"><img src="https://avatars0.githubusercontent.com/u/27292?v=4" width="100px;" alt="Camron Flanders"/><br /><sub><b>Camron Flanders</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=camflan" title="Code">💻</a></td>
    <td align="center"><a href="https://ericadamski.github.com"><img src="https://avatars0.githubusercontent.com/u/6516758?v=4" width="100px;" alt="Eric Adamski"/><br /><sub><b>Eric Adamski</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=ericadamski" title="Code">💻</a></td>
    <td align="center"><a href="http://winnercrespo.com"><img src="https://avatars0.githubusercontent.com/u/4671080?v=4" width="100px;" alt="Winner Crespo"/><br /><sub><b>Winner Crespo</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=wistcc" title="Code">💻</a> <a href="#design-wistcc" title="Design">🎨</a></td>
    <td align="center"><a href="http://twitter.com/mixn"><img src="https://avatars3.githubusercontent.com/u/672237?v=4" width="100px;" alt="Milos"/><br /><sub><b>Milos</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=mixn" title="Code">💻</a> <a href="#tool-mixn" title="Tools">🔧</a> <a href="https://github.com/carbon-app/carbon/commits?author=mixn" title="Documentation">📖</a> <a href="#translation-mixn" title="Translation">🌍</a></td>
    <td align="center"><a href="https://mittalyashu.now.sh/"><img src="https://avatars1.githubusercontent.com/u/29014463?v=4" width="100px;" alt="Yashu Mittal"/><br /><sub><b>Yashu Mittal</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=mittalyashu" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/bberrycarmen"><img src="https://avatars0.githubusercontent.com/u/22792183?v=4" width="100px;" alt="Rachel M. Carmena"/><br /><sub><b>Rachel M. Carmena</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=rachelcarmena" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/miguel-salazar-823b07a1/"><img src="https://avatars0.githubusercontent.com/u/19369949?v=4" width="100px;" alt="Miguel Salazar"/><br /><sub><b>Miguel Salazar</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=ucdstudent95618" title="Documentation">📖</a> <a href="#translation-ucdstudent95618" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/vyom-jain-233a28139"><img src="https://avatars3.githubusercontent.com/u/19145803?v=4" width="100px;" alt="Vyom Jain"/><br /><sub><b>Vyom Jain</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=vvyomjjain" title="Documentation">📖</a> <a href="#translation-vvyomjjain" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.cnblogs.com/racaljk/"><img src="https://avatars0.githubusercontent.com/u/5010047?v=4" width="100px;" alt="racaljk"/><br /><sub><b>racaljk</b></sub></a><br /><a href="#translation-racaljk" title="Translation">🌍</a></td>
    <td align="center"><a href="https://lastblocklabs.com"><img src="https://avatars3.githubusercontent.com/u/3892149?v=4" width="100px;" alt="Sean"/><br /><sub><b>Sean</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=raboid" title="Code">💻</a></td>
    <td align="center"><a href="http://izabelacborges.com/"><img src="https://avatars0.githubusercontent.com/u/19255077?v=4" width="100px;" alt="Izabela Borges"/><br /><sub><b>Izabela Borges</b></sub></a><br /><a href="#translation-izabelacborges" title="Translation">🌍</a></td>
    <td align="center"><a href="https://ghuser.io/shinilms"><img src="https://avatars2.githubusercontent.com/u/18573510?v=4" width="100px;" alt="Shinil M S"/><br /><sub><b>Shinil M S</b></sub></a><br /><a href="#translation-shinilms" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/berkeatac"><img src="https://avatars1.githubusercontent.com/u/10579633?v=4" width="100px;" alt="Berke Atac"/><br /><sub><b>Berke Atac</b></sub></a><br /><a href="#translation-berkeatac" title="Translation">🌍</a></td>
    <td align="center"><a href="https://wooooooak.github.io/"><img src="https://avatars3.githubusercontent.com/u/18481078?v=4" width="100px;" alt="LEE YONGJUN"/><br /><sub><b>LEE YONGJUN</b></sub></a><br /><a href="#translation-wooooooak" title="Translation">🌍</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://matthewnielsen.ca"><img src="https://avatars2.githubusercontent.com/u/35040439?v=4" width="100px;" alt="Matthew Nielsen"/><br /><sub><b>Matthew Nielsen</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=MatthewNielsen27" title="Code">💻</a></td>
    <td align="center"><a href="https://www.boy.sh"><img src="https://avatars2.githubusercontent.com/u/225410?v=4" width="100px;" alt="Boy"/><br /><sub><b>Boy</b></sub></a><br /><a href="#platform-boyvanamstel" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://vetrivelcsamy.xyz"><img src="https://avatars2.githubusercontent.com/u/26738977?v=4" width="100px;" alt="Vetrivel Chinnasamy"/><br /><sub><b>Vetrivel Chinnasamy</b></sub></a><br /><a href="#translation-vetrivelcsamy" title="Translation">🌍</a></td>
    <td align="center"><a href="https://farzadyz.com"><img src="https://avatars2.githubusercontent.com/u/8332043?s=460&v=4" width="100px;" alt="Farzad YZ"/><br /><sub><b>Farzad YZ</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=farskid" title="Code">💻</a> <a href="#ideas-farskid" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/yannickl"><img src="https://avatars0.githubusercontent.com/u/798235?s=460&v=4" width="100px;" alt="Yannick Loriot"/><br /><sub><b>Yannick Loriot</b></sub></a><br /><a href="#translation-yannickl" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/Joel-hanson"><img src="https://avatars2.githubusercontent.com/u/17215044?s=460&v=4" width="100px;" alt="Joel Hanson"/><br /><sub><b>Joel Hanson</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=Joel-hanson" title="Code">💻</a></td>
    <td align="center"><a href="https://muzzammil.xyz/?ref=github"><img src="https://avatars2.githubusercontent.com/u/12321712?v=4" width="100px;" alt="Muhammad Muzzammil"/><br /><sub><b>Muhammad Muzzammil</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=muhammadmuzzammil1998" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/souppower"><img src="https://avatars2.githubusercontent.com/u/19849611?v=4" width="100px;" alt="souppower"/><br /><sub><b>souppower</b></sub></a><br /><a href="#infra-souppower" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://uraway.hatenablog.com/"><img src="https://avatars3.githubusercontent.com/u/15242484?v=4" width="100px;" alt="Masato Urai (@uraway_)"/><br /><sub><b>Masato Urai (@uraway_)</b></sub></a><br /><a href="#translation-uraway" title="Translation">🌍</a></td>
    <td align="center"><a href="http://techinpark.com"><img src="https://avatars3.githubusercontent.com/u/45546296?v=4" width="100px;" alt="Fernando"/><br /><sub><b>Fernando</b></sub></a><br /><a href="#translation-techinpark" title="Translation">🌍</a></td>
    <td align="center"><a href="https://github.com/megsachdev"><img src="https://avatars1.githubusercontent.com/u/22325351?v=4" width="100px;" alt="Megha Sachdev"/><br /><sub><b>Megha Sachdev</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=megsachdev" title="Code">💻</a> <a href="https://github.com/carbon-app/carbon/commits?author=megsachdev" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://techgeekhub.ml"><img src="https://avatars0.githubusercontent.com/u/6022231?v=4" width="100px;" alt="Anudeep Reddy"/><br /><sub><b>Anudeep Reddy</b></sub></a><br /><a href="#infra-anudeepreddy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://munieru.jp"><img src="https://avatars2.githubusercontent.com/u/20086673?v=4" width="100px;" alt="Munieru"/><br /><sub><b>Munieru</b></sub></a><br /><a href="#translation-munierujp" title="Translation">🌍</a></td>
    <td align="center"><a href="http://www.etoxin.net"><img src="https://avatars0.githubusercontent.com/u/393002?v=4" width="100px;" alt="Adam Lusted"/><br /><sub><b>Adam Lusted</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=etoxin" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JoseNoriegaa"><img src="https://avatars2.githubusercontent.com/u/28733681?v=4" width="100px;" alt="Jose Noriega"/><br /><sub><b>Jose Noriega</b></sub></a><br /><a href="#translation-JoseNoriegaa" title="Translation">🌍</a></td>
    <td align="center"><a href="https://discord.club"><img src="https://avatars2.githubusercontent.com/u/33966852?v=4" width="100px;" alt="Merlin Fuchs"/><br /><sub><b>Merlin Fuchs</b></sub></a><br /><a href="#translation-Merlintor" title="Translation">🌍</a></td>
    <td align="center"><a href="https://glossier.com"><img src="https://avatars0.githubusercontent.com/u/23482161?v=4" width="100px;" alt="Ramy Majouji"/><br /><sub><b>Ramy Majouji</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=majouji" title="Code">💻</a></td>
    <td align="center"><a href="http://stackoverflow.com/users/872395/nemesv"><img src="https://avatars0.githubusercontent.com/u/251330?v=4" width="100px;" alt="Viktor Nemes"/><br /><sub><b>Viktor Nemes</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=nemesv" title="Code">💻</a></td>
    <td align="center"><a href="https://ericwbailey.design/"><img src="https://avatars3.githubusercontent.com/u/634191?v=4" width="100px;" alt="Eric Bailey"/><br /><sub><b>Eric Bailey</b></sub></a><br /><a href="https://github.com/carbon-app/carbon/commits?author=ericwbailey" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
