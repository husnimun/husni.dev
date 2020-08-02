import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./blog-post.module.scss"
import "katex/dist/katex.min.css"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  useEffect(() => {
    const script = document.createElement("script")
    const comments = document.getElementById("comments")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", "husnimun/husni.dev.comments")
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("repo", "husnimun/husni.dev.comments")
    script.setAttribute("label", "comment")
    script.setAttribute("theme", "github-light")
    script.setAttribute("crossorigin", "anonymous")
    comments.appendChild(script)
  }, [])

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header className={styles.Header}>
          <h1 className={styles.HeaderTitle}>{post.frontmatter.title}</h1>
          <p className={styles.HeaderDate}>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <footer></footer>
      </article>
      <hr className={styles.Separator}></hr>
      <div id="comments" className={styles.Comments}></div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
