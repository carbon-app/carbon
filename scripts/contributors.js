const fs = require('fs');
const got = require('got');

const BASE_URL = 'api.github.com';
const OWNER = 'dawnlabs';
const REPO = 'carbon';

const getContributors = (owner, repo) => got(`${BASE_URL}/repos/${OWNER}/${REPO}/stats/contributors`, { json: true })
    .then(response => response.body.forEach(({ author }) => fs.appendFile('README.md', `[${author.login}](${author.url})\n`, 'utf-8', () => {})))
    .catch(err => console.log(err));

getContributors(OWNER, REPO);