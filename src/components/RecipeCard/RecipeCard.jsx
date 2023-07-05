import React from 'react'
import { Link } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'

export default function RecipeCard({rec, user, profileName}){
    async function handleDelete(e){
        e.preventDefault()
        const deleteRec = await sendRequest(`/api/recipes/delete/${rec._id}`,'DELETE')
        window.location.replace(`/profile/${user.username}`)
    }
    return(
        <Link to = {`/reviews-list/${rec._id}`}>
            <div>
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
