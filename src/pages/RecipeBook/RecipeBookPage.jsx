import { useState, useEffect } from "react";
import sendRequest from "../../utilities/send-request";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import './RecipeBookPage.css'
export default function RecipeBookPage({ user }) {
  const [allRecipes, setAllRecipes] = useState([]);

  async function fetchAllRecipes() {
    const returnRcp = await sendRequest("/api/recipes/fetchAll", "GET");
    setAllRecipes(returnRcp);
  }

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe Book</h1>
      <div className="recipe-card-grid">
      {allRecipes && (
        <div>
          {allRecipes.map((rcpLoop) => (
            <RecipeCard key={rcpLoop._id} user={user} rec={rcpLoop} />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}