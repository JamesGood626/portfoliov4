import React from "react"
import axios from "axios"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import About from "../components/about"
import Projects from "../components/projects"
import Contact from "../components/contact"

axios.defaults.headers.common["x-api-key"] = process.env.SES_SECRET

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Hero />
    <About />
    <Projects />
    <Contact />
  </Layout>
)

export default IndexPage
