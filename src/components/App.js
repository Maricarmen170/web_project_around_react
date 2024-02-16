import '../index.css';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main'
import { useState, useEffect } from 'react';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { Switch,Route } from 'react-router-dom/cjs/react-router-dom.min';
import ProtectedRoute from './ProtectedRoute';
import { registerUser } from '../utils/auth.js';



function App() {
  const [currentUser,setCurrentUser]= useState({});
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard,setSelectedCard] = useState({});
  const [isImagePopupOpen,setIsImagePopupOpen] = useState(false);
  const [cards,setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(()=>{
    api.getCardList().then((data)=>{
        setCards(data)
    })
    .catch((err)=>{
        console.log(err);
    })
},[])

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  });
}

function handleDeleteCard(card) {
  api.removeCard(card._id).then(()=> {
      setCards(cards.filter((item)=> {
          return item._id !== card._id
      }))
  })
}

  useEffect(()=> {
    api.getUserInfo()
    .then((response)=> {
      setCurrentUser(response);
    })
    .catch((err)=>console.log(err))
  },[])

  function handleUpdateUser (user){
    api.handleEditProfile({name:user.name, about:user.about}).then((data)=>{
      setCurrentUser(data);
      closeAllPopups();
    })
  }

  function handleUpdateAvatar (avatar){
    api.editUserAvatar(avatar).then((data)=>{
      setCurrentUser(data);
      closeAllPopups();
    })
  }

  function handleAddPlace(title,src ){
    api.addCard({title, src}).then((data) =>{
      setCards([data, ...cards]);
      closeAllPopups();
    })
  }


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

async function handleRegisterUser(email, password) {
  const response = await registerUser(email, password);
  return response;
}


  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Switch>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register onRegister={async () => handleRegisterUser}/>
          </Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}
            component={Main}
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          />
        </Switch>
        <Footer />

        <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        />

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
    </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
