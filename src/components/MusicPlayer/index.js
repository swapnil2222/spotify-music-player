/** @jsx jsx */
import React, { createContext, useReducer } from 'react'
import { css, jsx } from '@emotion/react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Content from './Content'
import Playbar from './Playbar'
import media from '../../media.json'

export const StoreContext = createContext(null)
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist]: new Set() }
      }
    case 'SET_PLAYLIST':
      return {
        ...state,
        currentPlaylist: action.playlist
      }
    case 'ADD_FAVORITE':
      state.playlists.favorites.add(action.songId)
      return { ...state }
    case 'REMOVE_FAVORITE':
      state.playlists.favorites.delete(action.songId)
      return { ...state }
    case 'SET_CURRENT_SONG':
      return { ...state, currentSongId: action.songId }
    case 'PLAY':
      return {
        ...state,
        currentSongId: action.songId || state.currentSongId,
        playing: true
      }
    case 'PAUSE':
      return {
        ...state,
        playing: false
      }
    case 'SET_VOLUME':
      return {
        ...state,
        currentVolume: action.value
      }
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.time
      }
    case 'SET_CURRENT_DURATION':
      return {
        ...state,
        currentDuration: action.duration
      }
  }
  return state
}
const DEFAULT_PLAYLIST = 'home'
const initialState = {
  currentPlaylist: DEFAULT_PLAYLIST,
  playlists: {
    home: new Set(media.ids),
    favorites: new Set()
  },
  media,
  playing: false,
  currentSongId: null,
  currentVolume: 0.5,
  currentTime: 0,
  currentDuration: 0
}

const MusicPlayer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div className="MusicPlayer" css={CSS}>
        <Topbar></Topbar>
        <Sidebar />
        <Content />
        <Playbar></Playbar>
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
