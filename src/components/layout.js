/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import { ThemeProvider } from "styled-components"

const theme = {
  primaryColor: "#001657",
  accentColor: "#07CEFF",
  primaryWhite: "#FFFEFE",
  textGrey: "#707070",
}

const Footer = styled.footer`
  width: 100vw;
  height: 6rem;
  background: ${props => props.theme.primaryColor};
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div>
            <main>{children}</main>
            <Footer>
              <p>TM</p>
            </Footer>
          </div>
        </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
