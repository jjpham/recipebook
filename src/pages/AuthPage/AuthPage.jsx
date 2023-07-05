import { useState } from "react"
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"


export default function AuthPage({setUser}){
    const[userPref,setUserPref] = useState('signup')
    function handlePref(){
        if(userPref === 'signup'){
            setUserPref('login')
        } else{
            setUserPref('signup')
        }
    }
    return(
        <div>
            <h1>AuthPage</h1>
            {userPref === 'signup' ? 
            <SignUpForm setUser={setUser}/> :
            <LoginForm setUser={setUser}/>
            }
            <button onClick={handlePref}>
                {userPref === 'signup' ? 'Log In' : 'Sign Up'}
            </button>
        </div>
    )
}