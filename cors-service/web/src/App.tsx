import React from 'react'
import styled from '@emotion/styled'
import { Header, RequestBox, ResponseBox } from './components'

const App: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <RequestBox />
      <ResponseBox />
    </Fragment>
  )
}

export default App

const Fragment = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
`
