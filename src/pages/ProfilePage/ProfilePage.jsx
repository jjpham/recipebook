import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function Profile({ user }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const profileName = useParams().name;

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

  async function getAllRecipes() {
    let id = userProfile._id;

    if (!userProfile._id) return;

    const allRecipesRes = await sendRequest(
      `/api/recipes/fetchRecipesForUser/${id}`,
      "GET"
    );
    setAllRecipes(() => {
      return allRecipesRes;
    });
  }


  useEffect(() => {
    setUserProfile([]);
    getUserProfile();
    setAllRecipes([]);
  }, []);

  useEffect(() => {
    getAllRecipes();
  }, [userProfile]);


  return (
    <>
      <div>
        {profileName === user.username ? (
          <h1>Your Recipes</h1>
        ) : (
          <h1>{profileName}'s Recipes</h1>
        )}
        {profileName === user.username ? (
          <Link to="/recipes/new">ADD RECIPE</Link>
        ) : null}
        {allRecipes.length === 0 && profileName === user.userName ? (
          <p>Click on ADD RECIPE to start contributing</p>
        ) : (
          <div className="recipeContainer">
            {allRecipes.map((rec) => {
              return (
                <RecipeCard
                  key={rec._id}
                  profileName={profileName}
                  user={user}
                  rec={rec}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
