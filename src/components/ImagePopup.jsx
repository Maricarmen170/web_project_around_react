import React from 'react'
import close from '../Blocks/images/__CloseIcon.png'

function ImagePopup(props) {
  return (
    <div className="modal" id="modalPopup">
    <div className={`modal__popup-img ${props.isOpen ? 'popup__opened':''}`} >
            <img src={props.card.link} alt=" " class="modal__popup-img-background" id="cardPopup"/>
            <img src={close} alt="Equis para cerrar el formulario" class="modal__popup-img-close" id="closeImgBtn" onClick={props.onClose}/>
            <p class="modal__popup-img-title" id="popupImgTitle">{props.card.name}</p>
    </div>
    </div>   
  )
}

export default ImagePopup
