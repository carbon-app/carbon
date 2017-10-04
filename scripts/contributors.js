const fs = require('fs');
const got = require('got');

const BASE_URL = 'api.github.com';
const OWNER = 'dawnlabs';
const REPO = 'carbon';

const contribDefaults = {
    projectName: 'carbon',
    projectOwner: 'dawnlabs',
    files: [ 'README.md' ],
    imageSize: 100,
    commit: false,
};

let contributors = [];
const getContributors = (owner, repo) => got(`${BASE_URL}/repos/${OWNER}/${REPO}/stats/contributors`, { json: true })
    .then(response => response.body.forEach(({ author }) => {
        contributors.push({
            login: `${author.login}`,
            name: `${author.login}`,
            avatar_url: `${author.avatar_url}`,
            profile: `${author.html_url}`,
            contributions: []
        });
    }))
    .then(_ => {
        Object.assign(contribDefaults, { contributors });
        fs.writeFile('.all-contributorsrc', JSON.stringify(contribDefaults, null, 2), 'utf-8', () => {})
    })
    .catch(err => console.log(err));

getContributors(OWNER, REPO);