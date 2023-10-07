import React from 'react'

function PopupWithForm({title, name , children,isOpen,onClose, onSubmit}) {
  return (
    <form method="get" className={`popup popup_type_${name} ${isOpen ? 'popup__opened':''}`}  id="popup-profile">
    <button type="button" className="popup__profile-close-icon" id="close-icon-popup" onClick={onClose}>
    </button>
    <fieldset className="popup__container" >
        <label className="popup__title">{title}</label>
        {children}
        <button type="submit" className="popup__button" id="submit-profile" 
        onClick={(evt)=>{
          onSubmit(evt);
        }}>Guardar</button>
    </fieldset>
    </form>
  )
}

export default PopupWithForm