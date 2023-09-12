import React from 'react'
import trash from '../images/__trash(1).png'
import icon from '../images/__iconlike.png'

function Card(props) {
    function handleClick() {
      props.onCardClick(props)
    }
  return (
    <div className="element">
    <img className="element__image" src={props.link} alt=" " onClick={handleClick}/>
    <div className="remove">
        <img className="icon-remove" id="trashButton" src={trash} alt="icono de bote de basura" />
    </div>
    <div className="element__footer-photo">
        <p className="element__footer-text">{props.name}</p>
        <img className="icon-like"  id="likeButton" src={icon}alt="iconolike" />
        <p className="icon-like_number">{props.likes.length}</p>
    </div>
    </div>
  )
}

export default Card