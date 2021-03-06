import React from 'react'

const Layout = (props: any) => (
  <main
    style={{ minHeight: 'calc(100vh - 292px)' }}
    className="mx-auto w-3/4 max-w-3xl p-6"
    {...props}
  />
)

export default Layout
