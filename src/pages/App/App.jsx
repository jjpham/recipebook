import './App.css';
import { useState } from 'react';
import NewRecipePage from '../NewRecipePage/NewRecipePage';
import AuthPage from '../AuthPage/AuthPage';
import RecipeBookPage from '../RecipeBook/RecipeBookPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import ProfilePage from '../ProfilePage/ProfilePage'
import RecipePage from '../RecipePage/RecipePage';
import EditRecipeForm from '../EditRecipeForm/EditRecipeForm';
import NewReviewPage from '../NewReviewForm/NewReviewForm'
export default function App() {
  const [user,setUser] = useState(getUser())
  return (
    <main className='App'>
      {
       user ?
       <>
       <NavBar user = {user} setUser={setUser}/>
       <Routes>
        <Route path='/recipes/new' element={<NewRecipePage user ={user}/>}/>
        <Route path='/recipes' element={<RecipeBookPage user={user}/>}/>
        <Route path="/recipe-page/:recID" element={<RecipePage user={user}/>}/> 
        <Route path="/profile/:name" element={<ProfilePage user={user}/>}/>
        <Route path="/recipe-edit/:recID" element= {<EditRecipeForm user={user}/>}/>
        <Route path="/addReviewForm/:recID" element= {<NewReviewPage user={user}/>}/>
       </Routes>
      </>       
        :<AuthPage setUser={setUser}/> 

      }
      
    </main>
  );
}

