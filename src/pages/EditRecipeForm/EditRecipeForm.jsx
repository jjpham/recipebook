import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import sendRequest from "../../utilities/send-request";

export default function EditRecipeForm({ user }) {
    const [recipe, setRecipe] = useState({
        name: '',
        cookTime: 0,
        description: '',
        directions: ''
      });
    const { recID } = useParams()
    const navigate = useNavigate()

    async function fetchRec() {
        const rec = await sendRequest(`/api/recipes/fetchOne/${recID}`)
        setRecipe(rec)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const update = await sendRequest(`/api/recipes/update/${recID}`, "PUT", recipe)
        navigate(`/profile/${user.username}`);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setRecipe({
            ...recipe,
            [e.target.name]: value
        })
    }

    useEffect(() => {
        fetchRec()
    }, [])
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p>Name</p>
                <input type="text" name="name" value={recipe.name} onChange={handleChange} />
            </div>
            <div>
                <p>Cook Time</p>
                <input
                    type="number"
                    name="cookTime"
                    value={recipe.cookTime}
                    onChange={handleChange}
                />
            </div>
            <div>
                <p>Description</p>
                <input
                    type="text"
                    name="description"
                    value={recipe.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <p>Directions</p>
                <textarea
                    name="directions"
                    value={recipe.directions}
                    onChange={handleChange}
                ></textarea>
            </div>
            <button type="submit">Submit</button>

        </form>
    )
}