import React from 'react';
import editIcon from '../images/__Vector (2).png';
import addIcon from '../images/Vector (3).png';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);


    return(
        <section className="body">
            <div className="page">
            <main className="content">
        <section className="profile">
        <img className="profile__image-avatar" src={currentUser.avatar} alt="avatar profile" />
            <div className="profile__image-overlay" >
            <img className="profile__image-button" src={editIcon} alt="icono editar foto" onClick={props.onEditAvatarClick}/>
            </div>
            <div className="profile__info">
                <div className="profile__text">
                <h2 className="profile__name">{currentUser.name} </h2>
                <p className="profile__ocupation">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__edit" onClick={props.onEditProfileClick}>
                <img src={editIcon} alt="icono de lapiz para editar" />
                </button>
            </div>
                <button className="profile__add-button" onClick={props.onAddPlaceClick}>
                <img src={addIcon} alt="icono de agregar" />
                </button>
                
        </section>

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
            {props.cards.map((card)=>{
                return(
                    <Card
                    owner={card.owner}
                    key={card._id}
                    card={card}
                    name={card.name}
                    link={card.link}
                    likes={card.likes}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                    />
                );
            })}
        </section>
        </main>
            </div>
        </section>
    );
}

export default Main;