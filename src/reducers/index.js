import media from '../media.json'
const DEFAULT_PLAYLIST = 'home'
export const initialState = {
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

export const reducer = (state, action) => {
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
