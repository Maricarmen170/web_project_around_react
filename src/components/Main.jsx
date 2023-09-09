import React from 'react';
import editar from '../Blocks/images/__Vector (2).png';
import agregar from '../Blocks/images/Vector (3).png';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = useState("");
    const [userDescription, setuserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards,setCards] = useState([]);

    useEffect(()=>{
        api.getUserInfo().then((data)=>{
            setUserName(data.name)
            setuserDescription(data.about)
            setUserAvatar(data.avatar)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    useEffect(()=>{
        api.getCardList().then((data)=>{
            setCards(data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <main className="content">
        <section className="profile">
        <img className="profile__image-avatar" src={userAvatar} alt="avatar profile" />
            <div className="profile__image-overlay" >
            <img className="profile__image-button" src={editar} alt="icono editar foto" onClick={props.onEditAvatarClick}/>
            </div>
            <div className="profile__info">
                <div className="profile__text">
                <h2 className="profile__name">{userName} </h2>
                <p className="profile__ocupation">{userDescription}</p>
                </div>
                <button type="button" className="profile__edit" onClick={props.onEditProfileClick}>
                <img src={editar} alt="icono de lapiz para editar" />
                </button>
            </div>
                <button className="profile__add-button" onClick={props.onAddPlaceClick}>
                <img src={agregar} alt="icono de agregar" />
                </button>
                
            <form method="get" className="popup" id="popup-place">
                <button type="button" className="popup__close-icon" id="close-icon-cards">
                </button>
                <fieldset className="popup__container" >
                    <label className="popup__title">New Place</label>
                    <input type="text" name="title" id="title" placeholder="Título" className="popup__text" minLength="2" maxLength="30" required />
                    <span className="popup__input-error title-place-error" id="title-error"></span>
                    <input type="url" name="src" id="link" placeholder="Enlace a la imagen" className="popup__text" required />
                    <span className="popup__input-error new-image-error" id="link-error"></span>
                    <button type="submit" className="popup__button" id="submit-place">Crear</button>
                </fieldset>
            </form>
        </section>
        
        <form method="get" className="popup" id="popup-profile">
            <button type="button" className="popup__profile-close-icon" id="close-icon-popup">
            </button>
            <fieldset className="popup__container" >
                <label className="popup__title">Edit Profile</label>
                <input type="text" name="name" id="name"  className="popup__text" minLength="2" maxLength="40" required />
                <span className="popup__input-error name-error" id="name-error"></span>
                <input type="text" name="about" id="about"  className="popup__text" minLength="2" maxLength="200" required />
                <span className="popup__input-error about-me-error" id="about-error"></span>
                <button type="submit" className="popup__button" id="submit-profile">Guardar</button>
            </fieldset>
        </form>
        
        <form method="get" className="popup" id="popup__trash">
            <button type="button" className="popup__profile-close-icon">
            </button>
            <fieldset className="popup__container" id="popup__trash_container">
                <label className="popup__trash-title">¿Estas Seguro/a?</label>
                <button type="submit" className="popup__button" id="popup__trash_button">Si</button>
            </fieldset>
        </form>
      
        <form method="get" className="popup" id="profile__img-edit">
            <button type="button" className="popup__profile-close-icon"></button>
            <fieldset className="popup__container" id="popup__img-edit_container">
                <label className="popup__img-title">Cambiar foto de perfil</label>
                <input type="url" name="src" id="src" className="popup__text" />
                <span id="src-error" className="popup__input-error about-me-error"></span>
                <button type="submit" className="popup__button" id="popup__img-edit_button">Guardar</button>
            </fieldset>
        </form>
        <section className="elements">
            {cards.map((card)=>{
                return(
                    <Card key={card._id} name={card.name} link={card.link}
                    likes={card.likes} onCardClick={props.onCardClick}/>
                )
            })}
        </section>
        </main>
    );
}

export default Main;