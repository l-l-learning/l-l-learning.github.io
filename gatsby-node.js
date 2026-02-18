const path = require(`path`)
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Define templates
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const tagTemplate = path.resolve('src/templates/tag.js')

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 100
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 100) {
        group(field: frontmatter___tag) {
          fieldValue
        }
      }
    }
  `)

  // Create Pages
  const posts = result.data.allMarkdownRemark.nodes
  if (posts.length > 0) {
    posts.forEach(post => {
      createPage({
        path: post.fields.slug,
        component: postTemplate,
        context: {
          id: post.id,
          previousPostId,
          nextPostId
        }
      })
    })

    const tags = result.data.tagsGroup.group
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue
        }
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type SiteSiteMetadata {
			title: String
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
			update: Date @dateformat
      tag: [String]
      summary: String
    }

    type Fields {
      slug: String
    }
  `)
}
