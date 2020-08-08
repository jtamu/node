import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function MyFiles({ data }) {
  return (
    <Layout>
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>relativeDirectory</th>
              <th>relativePath</th>
              <th>name</th>
              <th>size</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativeDirectory}</td>
                <td>{node.relativePath}</td>
                <td>{node.name}</td>
                <td>{node.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
query MyQuery {
  allFile {
    edges {
      node {
        relativeDirectory
        relativePath
        name
        size
      }
    }
  }
}
`
