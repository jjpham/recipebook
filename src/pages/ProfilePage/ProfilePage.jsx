import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import user from "../../../models/user";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function Profile({user}){
    const[allReviews,setAllReviews] = useState([])
    const [allReviewsIndividual, setAllReviewsIndividual] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    
    const profileName = useParams().name


    async function getUserProfile() {
        let returnUser;
        if (!profileName) return;
        if (profileName === user.username) {
          returnUser = await sendRequest(
            `/api/users/fetchOneUser/${user.username}`,
            "GET"
          );
        } else {
          returnUser = await sendRequest(
            `/api/users/fetchOneUser/${profileName}`,
            "GET"
          );
        }
        setUserProfile(returnUser);
    }
    async function getAllReviews() {
        let id = userProfile._id;
    
        if (!userProfile._id) return;
    
        const allReviewsRes = await sendRequest(
          `/api/reviews/fetchReviewsForUser/${id}`,
          "GET"
        );
        setAllReviews(() => {
          return allReviewsRes;
        });
      }
    
      function fillAllReviews() {
        if (allReviews.length == 0) return;
    
        for (let i = 0; i < allReviews.length; i++) {
          for (let j = 0; j < allReviews[i].reviews.length; j++) {
            setAllReviewsIndividual((current) => [...current, allReviews[i].reviews[j]]);
          }
        }
        setIsLoading(false);
      }
    
      useEffect(() => {
        setUserProfile([]);
        getUserProfile();
        setAllReviews([]);
        setAllReviewsIndividual([]);
      }, []);
    
      useEffect(() => {
        getAllReviews();
      }, [userProfile]);
    
      useEffect(() => {
        fillAllReviews();
      }, [allReviews]);
    

    return(
        <>
        (
            <div>
              {profileName === user.username ?(
                <h1>Your Recipes</h1>
              ):
              <h1> {profileName}'s Recipes</h1>
              }
            {profileName === user.username ? (
                <Link to="/addRecipeForm"> ADD RECIPE</Link>
            ):null}
            {allReviews.length ===0 &&
            profileName === user.userName ? (
                <p> Click on ADD RECIPE to start contributing</p>
            ):(
                <div className="recipeCtn">
                    {allReviews.map((rec) =>{
                        return(
                            <RecipeCard key={rec._id} profileName={profileName} user={user} rec={rec}/>
                        )
                    })}
                </div>
            )}
            </div>
        )
        
        </>
    )
}