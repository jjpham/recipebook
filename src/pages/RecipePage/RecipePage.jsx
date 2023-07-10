import { useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import sendRequest from '../../utilities/send-request'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import './RecipePage.css'

export default function RecipePage({user}){
    const [recipe, setRecipe] = useState({})
    const [recUser, setRecUser] = useState({})
    const [allReviews, setAllReviews] = useState([])

    const {recID} = useParams()

    async function fetchRec(){
        const returnRec = await sendRequest(`/api/recipes/fetchOne/${recID}`, 'GET')
        setRecipe(returnRec)
    }
    async function fetchUser(){
        try{
        const returnUser = await sendRequest(`/api/users/fetchById/${recipe.user}`,'GET')
        setRecUser(returnUser)            
        } catch(err){
        }

    }
    async function fetchReviews(){
        const allRevs = await sendRequest(`/api/reviews/fetchRevsforRcp/${recID}`,'GET')
        setAllReviews (allRevs)
    }
    useEffect(()=>{
        fetchRec()
    },[])
    useEffect(()=>{
        if (recipe.user) {
            fetchUser()
            fetchReviews()
        }
    },[recipe])
    return(
        <div className="recipe-page-container">
            <div className="recipe-details">
                <h1>{recipe.name}</h1>
                <h3>Published by {recUser.username}</h3>
                {recipe.user !== user._id ? <Link to ={`/addReviewForm/${recID}`}><div>Add Review</div></Link>:null}
                <h4>Cook Time: {recipe.cookTime}</h4>
                <h4>Description: <br/></h4>
                <h5>{recipe.description}</h5>
                <h4>Directions: </h4>
                <h5>{recipe.directions}</h5>
            </div>
            <div className="review-cards-container">

                {allReviews.map((review)=>{
                    return <ReviewCard key={review._id} review={review} user={user}/>
                })}
            </div>

        </div>
    )
}