import './App.css';
import { useState } from 'react';
import NewRecipePage from '../NewRecipePage/NewRecipePage';
import AuthPage from '../AuthPage/AuthPage';
import RecipeBookPage from '../RecipeBook/RecipeBookPage';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import ProfilePage from '../ProfilePage/ProfilePage'


export default function App() {
  const [user,setUser] = useState(getUser())
  return (
    <main className='App'>
      {
       user ?
       <>
       <NavBar user = {user} setUser={setUser}/>
       <Routes>
        <Route path='/recipes/new' element={<NewRecipePage/>}/>
        <Route path='/recipes' element={<RecipeBookPage user={user}/>}/>
        <Route path='/'/>
       </Routes>
      </>       
        :<AuthPage setUser={setUser}/> 

      }
      
    </main>
  );
}

