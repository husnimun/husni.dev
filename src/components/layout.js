import React from "react"
import styles from "./layout.module.scss"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  return (
    <div
      className={styles.Container}
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
      }}
    >
      <header className={styles.Header}>
        <Link to="/">Husni Munaya</Link>
      </header>
      <main className={styles.Main}>{children}</main>
      <footer className={styles.Footer}>
        © {new Date().getFullYear()} Husni Munaya.{" "}
        <Link to="/rss.xml">Subscribe (RSS)</Link>.
      </footer>
    </div>
  )
}

export default Layout
