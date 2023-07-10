import React from 'react'
import { Link } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'
import "./RecipeCard.css"

export default function RecipeCard({rec, user, profileName}){
    async function handleDelete(e){
        e.preventDefault()
        const deleteRec = await sendRequest(`/api/recipes/delete/${rec._id}`,'DELETE')
        window.location.replace(`/profile/${user.username}`)
    }
    return(
        <Link to = {`/recipe-page/${rec._id}`}>
            
            <div className='rcpCard'>
                <h4 style = {{margin:'4%'}}>-{rec.name}-</h4>
                <p>{rec.description}</p>
                {profileName === user.username ?
                <div>
                    <Link to={`/recipe-edit/${rec._id}`}><button>EDIT</button>
                    </Link>
                    <button onClick={handleDelete}>DELETE</button>
                </div>
                :
                null    
                }
            </div>
        </Link>
    )

}
