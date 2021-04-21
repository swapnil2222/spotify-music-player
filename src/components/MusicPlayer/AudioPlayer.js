import React, { useEffect } from 'react'
import { useContext, useRef } from 'react'
import { StoreContext } from '.'

const AudioPlayer = () => {
  const audioRef = useRef()
  const { state, dispatch } = useContext(StoreContext)
  const song = state.media[state.currentSongId]
  useEffect(() => {
    if (state.playing) {
      audioRef.current.load()
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [state.playing, state.currentSongId])
  useEffect(() => {
    audioRef.current.volume = state.currentVolume
  }, [state.currentVolume])
  return (
    <audio
      ref={audioRef}
      src={
        song && song.title ? `./media/${song.title} - ${song.artist}.mp3` : ``
      }
      onLoadedMetadata={() => {
        dispatch({
          type: 'SET_CURRENT_DURATION',
          duration: audioRef.current.duration
        })
      }}
      onTimeUpdate={(e) => {
        dispatch({ type: 'SET_CURRENT_TIME', time: e.target.currentTime })
      }}
    />
  )
}
export default AudioPlayer
