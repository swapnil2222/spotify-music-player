/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/react'

const Modal = ({ children, show, close }) => {
  if (!show) return null
  return (
    <div className="Modal" css={CSS}>
      <div className="modal-content">
        <i onClick={close} className="fa fa-close"></i>
        {children}
      </div>
    </div>
  )
}

const CSS = css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.75);
  .modal-content {
    position: relative;
    width: 400px;
    background-color: #282828;
    padding: 25px;
    border-radius: 4px;
  }
  i {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
`

export default Modal
