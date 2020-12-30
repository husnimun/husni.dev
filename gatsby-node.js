const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve(`./src/templates/blog-post.js`)
  const blogsQuery = await graphql(
    `
      {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/blog/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              slug
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (blogsQuery.errors) {
    throw blogsQuery.errors
  }

  // Create blog posts pages.
  const posts = blogsQuery.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.slug,
      component: blogTemplate,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const pagesQuery = await graphql(
    `
      {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/page/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
          node {
              slug
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (pagesQuery.errors) {
    throw pagesQuery.errors
  }

  // Create blog posts pages.
  const pages = pagesQuery.data.allMdx.edges

  pages.forEach(post => {
    createPage({
      path: post.node.slug,
      component: pageTemplate,
      context: {
        slug: post.node.slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
