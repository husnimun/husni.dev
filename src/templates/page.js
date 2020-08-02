
import React from "react"
import { graphql } from "gatsby"

import "katex/dist/katex.min.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./blog-post.module.scss"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className={styles.Header}>
          <h1 className={styles.HeaderTitle}>{post.frontmatter.title}</h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer></footer>
      </article>
      <hr className={styles.Separator}></hr>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
