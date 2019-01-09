# gatsby-remark-embed-carbon
> Embed Carbon screenshots in your markdown files

## Getting started

1. Install plugin to your site:

```bash
yarn add gatsby-remark-embed-carbon
```

2. Add `gatsby-remark-embed-carbon` to your `gatsby-transformer-remark` plugins in `gatsby-config.js`:

```js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: ['gatsby-remark-embed-carbon']
    }
  }
];
```

## Configuration

```js
plugins: [
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-embed-carbon',
          options: {
            width: '100%', // default is '1024px'
            height: '600px' // default is '473px'
          }
        }
      ]
    }
  }
]
```

## Example
Add a carbon screenshot directly in your markdown file:

```md
# Blog Post

This link will get replaced with a Carbon iframe:

https://carbon.now.sh/?bg=red
```

## Thanks
This project was completely inspired by (copied from) @garetmckinley's [`gatsby-remark-embed-spotify`](https://github.com/garetmckinley/gatsby-remark-embed-spotify) :star:
