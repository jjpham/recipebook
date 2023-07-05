import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service'
export default function NavBar({user, setUser}){
    function handleLogOut(){
        userService.logOut()
        setUser(null)
    }
    return(
        <nav>
            <Link to="/recipes">Recipe Book</Link>
            &nbsp; | &nbsp;
            <Link to="/recipes/new"> New Recipe</Link>
            &nbsp; | &nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}