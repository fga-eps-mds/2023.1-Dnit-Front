import React, { useState } from 'react'
import './styles.css'

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => { setModal(!modal) };

  return (
    <div className="overlay" onClick={toggleModal}>
      <div className="div br-modal medium">
        <div className="br-modal-header">Título da modal
          <button className="br-button close circle" type="button" data-dismiss="br-modal" aria-label="Close" onClick={toggleModal}><i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="br-modal-body">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus commodi laboriosam vel sequi quam deleniti, laborum mollitia blanditiis dolores officiis nulla quos dolorem repellat in nisi alias nesciunt fugit. Similique!</p>
        </div>
        <div className="br-modal-footer justify-content-end">
          <button className="br-button secondary" type="button">Ação 1
          </button>
          <button className="br-button primary ml-2" type="button" onClick={toggleModal}>
            Ação2
          </button>
        </div>
      </div>
    </div>
  );
}