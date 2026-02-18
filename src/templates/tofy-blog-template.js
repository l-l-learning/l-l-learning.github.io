import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../assets/References/Tofu-main/src/components/layout";
import Seo from "../components/seo";
import Share from "../assets/References/Tofu-main/src/components/share";
import Breadcrumb from "../assets/References/Tofu-main/src/components/breadcrumb";
import Message from "../assets/References/Tofu-main/src/components/message";
import Lift from "../images/lift.svg";
import Print from "../images/print.svg";
import { Divider } from "@mui/material";

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const sns = data.site.siteMetadata;
  function print() {
    window.print();
  };

  return (
    <Layout>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <span class="tag_box" id="top">{post.frontmatter.tag}</span>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.description}</p>
          <span class="sub_header">
            <p>Last Updated: {post.frontmatter.date} | Read Time: {post.timeToRead} min</p>
          </span>
          <span>
            <Share title={sns.title} quote={sns.title} url={sns.siteUrl} />
          </span>
        </header>
        <hr />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <Message />
        <div className="footer">
          <img src={Print} onClick={print} width="90px" height="90px" alt="Print" />
          <Link to="#top"><img src={Lift} width="90px" height="90px" alt="Move To Top" /></Link>
        </div>
        <Divider sx={{mb: "24px"}}/>
        <Breadcrumb tag={post.frontmatter.tag} title={post.frontmatter.title} />
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
				tag
      }
    }
  }
`;
