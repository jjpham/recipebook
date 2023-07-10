import { useState, useEffect  } from "react";
import sendRequest from "../../utilities/send-request";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function NewReviewForm({user}){
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState("")
    const [recipe, setRecipe] = useState("")

    const {recID} = useParams()
    const navigate = useNavigate()
    async function fetchRec(){
        const rec = await sendRequest(`/api/recipes/fetchOne/${recID}`, 'GET')
        setRecipe(rec._id)
    }
    useEffect(() => {
        fetchRec();
      }, []);
    const handleChange = (evt) =>{
        const {name, value} = evt.target
        switch(name){
            case 'rating':
                setRating(value)
                break
            case 'description':
                setDescription(value)
                break
            
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
          rating,
          description,
          user: user._id,
          recipe
        };
        try {
          const response = await sendRequest('/api/reviews/create', 'POST', data);
          navigate(`/recipe-page/${recipe}`); 
        } catch (error) {
        }
    }
    return (
        <div>
          <h1>New Review</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                name="rating"
                value={rating}
                min={1}
                max={5}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}
