/** @jsx jsx */
import React, { useContext, useRef, useState } from 'react'
import { css, jsx } from '@emotion/react'
import logo from '../../img/spotify-white.png'
import Modal from './Modal.js'
import Toast from './Toast'
import { StoreContext } from '.'
const Sidebar = () => {
  const [sidebarState, setSidebarState] = useState({
    showModal: false,
    toast: ''
  })
  const { state, dispatch } = useContext(StoreContext)
  const playListRef = useRef(null)
  const playlists = Object.keys(state.playlists)
  const addPlaylist = (e) => {
    e.preventDefault()
    const list = playListRef.current.value
    setSidebarState({
      ...sidebarState,
      showModal: false,
      toast: 'Your playlist was created successfully.'
    })
    dispatch({ type: 'ADD_PLAYLIST', playlist: list })
  }
  return (
    <ul className="Sidebar" css={CSS}>
      <img src={logo} />
      <li className="library">Library</li>
      {playlists.map((list) => (
        <li
          key={list}
          className={list === state.currentPlaylist ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_PLAYLIST', playlist: list })}
        >
          {list}
        </li>
      ))}
      <li className="new-playlist">
        <i
          className="fa fa-plus-circle"
          onClick={() => {
            setSidebarState({ ...sidebarState, showModal: true })
          }}
        ></i>
        <span>New Playlist</span>
      </li>
      <Modal
        show={sidebarState.showModal}
        close={() => {
          setSidebarState({ ...sidebarState, showModal: false })
        }}
      >
        <form onSubmit={addPlaylist}>
          <div className="title">New Playlist</div>
          <div className="content-wrap">
            <input type="text" required="required" ref={playListRef} />
            <br />
            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>
      <Toast
        toast={sidebarState.toast}
        close={() => {
          setSidebarState({
            ...sidebarState,
            toast: null
          })
        }}
      ></Toast>
    </ul>
  )
}

const CSS = css`
  width: 200px;
  height: 100%;
  background: #000000;
  padding-top: 20px;

  img {
    height: 60px;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  li {
    padding-left: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: capitalize;
    cursor: pointer;
  }
  li.active {
    border-left: 2px solid #fff;
    padding-left: 18px;
  }
  li.library {
    font-weight: normal;
    color: #999;
    text-transform: capitalize;
    cursor: unset;
  }
  li.new-playlist {
    position: absolute;
    bottom: 80px;
    i {
      margin-right: 5px;
      &:before {
        font-size: 20px;
      }
    }
    span {
      color: #999;
      font-weight: 300;
    }
  }
  .title {
    margin: 0;
    margin-bottom: 15px;
  }
  input {
    height: 35px;
    padding-left: 8px;
    margin-bottom: 20px;
    font-size: 16px;
    width: 100%;
  }
  button {
    background-color: #2bcc6c;
    padding: 12.5px 20px;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 20px;
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
  }
  .content-wrap {
    text-align: center;
    margin: 0px auto;
    max-width: 250px;
  }
`

export default Sidebar
