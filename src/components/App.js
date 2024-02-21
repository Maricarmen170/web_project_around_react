import React from 'react';
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
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from "../utils/auth";



function App() {
  const [currentUser,setCurrentUser]= useState({});
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard,setSelectedCard] = useState({});
  const [isImagePopupOpen,setIsImagePopupOpen] = useState(false);
  const [cards,setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");


  const navigate = useNavigate();

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
function handleLogin () {
  setLoggedIn(true);
}
const handleSignOut = () => {
  localStorage.removeItem("jwt");
  setEmail("");
  setLoggedIn(false);
};

/*async function handleRegisterUser(email, password) {
  const response = await registerUser(email, password);
  return response;
}*/

useEffect(() => {
  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/");
          } else {
            console.error("El token no es válido");
          }
        })
        .catch((err) => {
          console.error("Error al verificar el token:",err);
        });
    }
  };
  handleTokenCheck();
}, [loggedIn, navigate]);

  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleSignOut={handleSignOut} email={email} />
        <Routes>
          <Route path="/signin" element={<Login handleLogin={handleLogin}/>}/>
          <Route path='*' element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Register/>}/>
          <Route path='/' element={<ProtectedRoute loggedIn={loggedIn}/>}>
          <Route path="/" 
            element={<Main
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
            />}
          />
          </Route>
        </Routes>
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
