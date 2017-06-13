# gatsby-remark-copy-images

Copies images referenced from markdown to your `public` folder.

## Install

`npm install --save gatsby-remark-copy-images`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-copy-images`,
      ]
    }
  }
]
```

Then in your Markdown files, simply reference the image.

E.g.

```markdown

---
title: My awesome blog post
---

Hey everyone, I just made a sweet GIF with lots of interesting stuff in
it.

![](my-awesome-gif.gif)
```

`my-awesome-gif.gif` should be in the same directory as the markdown
file. When you build your site, the file will be copied to the `public`
folder and the markdown HTML will be modified to point to it.

## Background

This was adapted from [gatsby-remark-copy-linked-files](https://github.com/gatsbyjs/gatsby/blob/1.0/packages/gatsby-remark-copy-linked-files/).
