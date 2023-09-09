import '../index.css';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main'
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';


function App() {
  
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard,setSelectedCard] = useState({});
  const [isImagePopupOpen,setIsImagePopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
}

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true)
}

function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true)
}

function handleCardClick(card) {
  setSelectedCard(card)
  setIsImagePopupOpen(true)
}

function closeAllPopups() {
  setIsEditAvatarPopupOpen(false)
  setIsEditProfilePopupOpen(false)
  setIsAddPlacePopupOpen(false)
  setIsImagePopupOpen(false)
  setSelectedCard(false)
}
  return (
    <div className="body">
          <div className="page">
        <Header />
        <Main
        onEditProfileClick={handleEditProfileClick}
        onEditAvatarClick={handleEditAvatarClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm title="Editar perfil" name="editar" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="name" id="name"  className="popup__text" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-error" id="name-error"></span>
        <input type="text" name="about" id="about"  className="popup__text" minLength="2" maxLength="200" required />
        <span className="popup__input-error about-me-error" id="about-error"></span>
        </PopupWithForm>

        <PopupWithForm title="Nuevo lugar" name="place" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="title" id="title"  className="popup__text" minLength="2" maxLength="40" required />
        <span className="popup__input-error name-error" id="name-error"></span>
        <input type="url" name="src" id="link"  className="popup__text" minLength="2" maxLength="200" required />
        <span className="popup__input-error about-me-error" id="link-error"></span>
        </PopupWithForm>

        <PopupWithForm title="Actualizar foto de perfil" name="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" name="src" id="src"  className="popup__text" />
        <span className="popup__input-error about-me-error" id="src-error"></span>
        </PopupWithForm>
        
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
    </div>
    </div>
  );
}

export default App;
