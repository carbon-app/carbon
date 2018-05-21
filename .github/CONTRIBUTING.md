## Contributing

If you have discovered a bug or have a feature suggestion, feel free to create an issue on GitHub.

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
