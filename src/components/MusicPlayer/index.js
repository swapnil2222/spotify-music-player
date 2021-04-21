/** @jsx jsx */
import React, { createContext, useReducer } from 'react'
import { css, jsx } from '@emotion/react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Content from './Content'
import Playbar from './Playbar'
import { initialState, reducer } from '../../reducers'

export const StoreContext = createContext(null)

const MusicPlayer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="MusicPlayer" css={CSS}>
        <Topbar></Topbar>
        <Sidebar />
        <Content />
        <Playbar />
      </div>
    </StoreContext.Provider>
  )
}

const CSS = css`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  color: white;
`

export default MusicPlayer
