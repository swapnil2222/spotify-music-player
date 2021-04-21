/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'
import Modal from './Modal'

const AddToPlaylist = ({ show, close }) => {
  return (
    <div className="AddToPlaylist" css={CSS}>
      <Modal show={show} close={close}>
        <h3>Hey Buddy</h3>
      </Modal>
    </div>
  )
}

const CSS = css``

export default AddToPlaylist
