import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
            author {
              name
            }
          }
        }
      }
    `
  )

  const defaultTitle = site.siteMetadata.title
  const siteUrl = site.siteMetadata.siteUrl
  const metaDescription = site.siteMetadata.title

  return (
    <>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <meta
        name="format-detection"
        content="email=no,telephone=no,address=no"
      />

      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:card" content="website" />

      <title>
        {title} | {defaultTitle}
      </title>
      {children}
    </>
  )
}

export default Seo
