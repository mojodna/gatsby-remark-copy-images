const visit = require(`unist-util-visit`)
const isRelativeUrl = require(`is-relative-url`)
const fsExtra = require(`fs-extra`)
const path = require(`path`)
const _ = require(`lodash`)

module.exports = ({ files, linkPrefix, markdownNode, markdownAST, getNode }) => {
  // Copy linked files to the public directory and modify the AST to point to
  // new location of the files.
  const visitor = link => {
    if (isRelativeUrl(link.url)) {
      const linkPath = path.join(getNode(markdownNode.parent).dir, link.url)
      const linkNode = _.find(files, file => {
        if (file && file.absolutePath) {
          return file.absolutePath === linkPath
        }
        return null
      })
      if (linkNode && linkNode.absolutePath) {
        const newPath = path.join(
          process.cwd(),
          `public`,
          `${linkNode.relativePath}`
        )
        link.url = path.join(linkPrefix || "/", linkNode.relativePath)
        if (!fsExtra.existsSync(newPath)) {
          fsExtra.copy(linkPath, newPath, err => {
            if (err) {
              console.error(`error copying file`, err)
            }
          })
        }
      }
    }
  }

  visit(markdownAST, `image`, image => visitor(image))
}
