module.exports = {
  siteMetadata: {
    title: `Lifelong Learning Portal`,
    author: {
      name: `Amane Kobayashi`,
      summary: `who lives and works in San Francisco building useful things.`
    },
    description: `learner friendly blog.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
          quality: 95
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `posts`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              linkImagesToOriginal: 'false',
              quality: 95,
              withWebp: 'true',
              withAvif: 'true'
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              tight: true,
              fromHeading: 1,
              toHeading: 3
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              isIconAfterHeader: false,
              elements: [`h1`, `h2`, `h3`]
            }
          }
        ]
      }
    },
    `gatsby-remark-check-links`,
    `gatsby-remark-smartypants`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://l-l-learning.github.io`
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://l-l-learning.github.io',
        sitemap: 'https://l-l-learning.github.io/sitemap-index.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: [
              '/tag',
              '/tags/',
              '/about',
              '/archive',
              '/policy',
              '/post',
              '/contact',
              '/404'
            ]
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lifelong Learning`,
        short_name: `l-l-learning`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#0d0d0d`,
        display: `minimal-ui`,
        icon: `static/icon.png`
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/icon-path*']
        }
      }
    }
  ]
}
