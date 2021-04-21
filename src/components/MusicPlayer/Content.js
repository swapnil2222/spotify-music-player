/** @jsx jsx */
import React, { useContext, useState } from 'react'
import { css, jsx } from '@emotion/react'
import { StoreContext } from '.'
import Modal from './Modal'
import AddToPlaylist from './AddToPlaylist'

const Content = () => {
  const { state, dispatch } = useContext(StoreContext)
  const [playlistModal, setPlaylistModal] = useState(false)
  const [hoverSong, setHoverSong] = useState({})
  const songIds = Array.from(state.playlists[state.currentPlaylist])
  const currentSong = state.media[state.currentSongId]
  if (songIds.length <= 0) {
    return (
      <div className="Content" css={CSS}>
        <div className="playlist-title">{state.currentPlaylist}</div>
        <div className="no-songs">No Songs found from playlist..</div>
      </div>
    )
  }
  return (
    <div className="Content" css={CSS}>
      {/*  */}
      <div className="playlist-title">{state.currentPlaylist}</div>
      <table>
        <thead>
          <tr>
            <td />
            <td />
            <td>Title</td>
            <td>Artist</td>
            <td>Length</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {songIds.map((id) => {
            const { title, artist, length } = state.media[id]
            const isFav = state.playlists.favorites.has(id)
            return (
              <tr
                style={
                  hoverSong && hoverSong.title === title
                    ? {
                        backgroundColor: '#282828'
                      }
                    : {}
                }
                onMouseEnter={(e) => {
                  e.preventDefault()
                  setHoverSong(state.media[id])
                }}
                key={title + length}
              >
                <td>
                  {hoverSong && hoverSong.title === title ? (
                    <>
                      {currentSong &&
                      currentSong.title === title &&
                      state.playing ? (
                        <i
                          className="fa fa-pause"
                          aria-hidden="true"
                          onClick={() => {
                            dispatch({ type: 'PAUSE' })
                          }}
                        />
                      ) : (
                        <i
                          className="fa fa-play"
                          aria-hidden="true"
                          onClick={() => {
                            dispatch({ type: 'SET_CURRENT_SONG', songId: id })
                            dispatch({ type: 'PLAY', songId: id })
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {currentSong &&
                      currentSong.title === title &&
                      state.playing ? (
                        <i className="fa fa-volume-up" aria-hidden="true" />
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </td>
                <td>
                  {isFav ? (
                    <i
                      className="fa fa-heart"
                      aria-hidden="true"
                      onClick={() => [
                        dispatch({ type: 'REMOVE_FAVORITE', songId: id })
                      ]}
                    />
                  ) : (
                    <i
                      className="fa fa-heart-o"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch({ type: 'ADD_FAVORITE', songId: id })
                      }}
                    />
                  )}
                </td>
                <td>{title}</td>
                <td>{artist}</td>
                <td>{length}</td>
                <td>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      setPlaylistModal(true)
                    }}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <AddToPlaylist
        show={playlistModal}
        close={() => {
          setPlaylistModal(false)
        }}
      ></AddToPlaylist>
    </div>
  )
}

const CSS = css`
  width: calc(100% - 200px);
  height: calc(100% - 75px);
  padding: 20px;
  background: #121212;
  padding-top: 70px;
  text-transform: capitalize;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #282828;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: initial;
  }
  table tr:not(:last-of-type) {
    border-bottom: 1px solid #282828;
  }
  table td {
    padding: 10px 0;
  }
  .no-songs {
    text-align: center;
    margin-top: 15px;
  }
  i {
    cursor: pointer;
  }
`

export default Content
