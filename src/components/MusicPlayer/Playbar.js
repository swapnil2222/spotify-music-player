/** @jsx jsx */
import React, { useContext, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/react'
import { StoreContext } from '.'
import AudioPlayer from './AudioPlayer'
const handleProgress = (time, duration) => {
  const width = 300 * (time / duration)
  if (Number.isNaN(width)) {
    return 0
  }
  return width
}
const Playbar = () => {
  const { state, dispatch } = useContext(StoreContext)
  const song = state.media[state.currentSongId]
  const isFav = state.playlists.favorites.has(state.currentSongId)
  useEffect(() => {
    if (state.currentTime / state.currentDuration === 1) {
      dispatch({ type: 'PAUSE' })
      dispatch({ type: 'SET_CURRENT_TIME', time: 0 })
    }
  }, [state.currentTime, state.currentDuration])

  const playNext = () => {
    let idx = state.media.ids.findIndex((item) => item === state.currentSongId)
    if (idx === -1 && !state.currentSongId) {
      dispatch({ type: 'SET_CURRENT_SONG', songId: state.media.ids[0] })
      dispatch({ type: 'PLAY', songId: state.media.ids[0] })
    }
    if (idx !== -1) {
      if (idx === state.media.ids.length - 1) {
        idx = 0
      } else {
        idx = idx + 1
      }
      dispatch({ type: 'SET_CURRENT_SONG', songId: state.media.ids[idx] })
      dispatch({ type: 'PLAY', songId: state.media.ids[idx] })
    }
  }
  const formatTime = (inputSeconds) => {
    let seconds = Math.floor(inputSeconds % 60)
    if (seconds < 10) seconds = `0${seconds}`
    const minutes = Math.floor(inputSeconds / 60)
    return `${minutes}:${seconds}`
  }
  const playPrevious = () => {
    let idx = state.media.ids.findIndex((item) => item === state.currentSongId)
    if (idx !== -1) {
      if (idx === 0) {
        idx = state.media.ids.length - 1
      } else {
        idx = idx - 1
      }
    } else {
      idx = state.media.ids.length - 1
    }
    dispatch({ type: 'SET_CURRENT_SONG', songId: state.media.ids[idx] })
    dispatch({ type: 'PLAY', songId: state.media.ids[idx] })
  }
  const playOrPause = () =>
    state.playing ? dispatch({ type: 'PAUSE' }) : dispatch({ type: 'PLAY' })

  return (
    <div className="Playbar" css={CSS}>
      <div className="left">
        {song && (
          <>
            <div>
              {song.title}
              {isFav && <i className="fa fa-heart" aria-hidden="true" />}
            </div>
            <div className="artist">{song.artist}</div>
          </>
        )}
      </div>
      <div className="middle">
        <div className="nav-bar">
          <div className="play-backward" onClick={playPrevious}>
            <i className="fa fa-step-backward" aria-hidden="true"></i>
          </div>
          <div className="play-pause-circle" onClick={playOrPause}>
            <i
              aria-hidden="true"
              className={`fa fa-${state.playing ? 'pause' : 'play'}`}
              style={{ transform: state.playing ? '' : 'translateX(1.5px)' }}
            ></i>
          </div>
          <div className="play-forward" onClick={playNext}>
            <i className="fa fa-step-forward" aria-hidden="true"></i>
          </div>
        </div>
        <div>
          <div
            className="progress-bar"
            style={{
              marginTop: '2.5px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span>{formatTime(Math.floor(state.currentTime))}</span>
            <div className="progress-container">
              <div
                className="bar"
                style={{
                  width: handleProgress(
                    state.currentTime,
                    state.currentDuration
                  )
                }}
              />
            </div>
            <span>{formatTime(Math.floor(state.currentDuration))}</span>
          </div>
          <AudioPlayer />
        </div>
      </div>
      <div className="right">
        <i
          className={`fa fa-${
            state.currentVolume > 0.5
              ? 'volume-up'
              : state.currentVolume > 0
              ? 'volume-down'
              : 'volume-off'
          }`}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={state.currentVolume}
          style={{ marginLeft: '15px' }}
          onChange={(e) =>
            dispatch({ type: 'SET_VOLUME', value: e.target.value })
          }
        />
      </div>
    </div>
  )
}

const CSS = css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #282828;
  z-index: 99;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 225px;
    .artist {
      font-size: 14px;
      color: '#999999';
      margin-top: 5px;
    }
  }
  .middle {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fa-play,
  .fa-pause {
    font-size: 14px;
  }
  .fa-heart {
    padding-left: 15px;
  }
  .play-pause-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
  }
  .play-backward,
  .play-forward {
    padding: 0 25px;
  }
  i {
    cursor: pointer;
  }
  .progress-container {
    width: 300px;
    height: 7px;
    background-color: #8e8988;
    .bar {
      height: 100%;
      background-color: rgb(167 167 167);
    }
  }
  .progress-bar {
    span {
      padding: 0 10px;
    }
  }
`

export default Playbar
