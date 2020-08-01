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
      <main>{children}</main>
    </div>
  )
}

export default Layout
