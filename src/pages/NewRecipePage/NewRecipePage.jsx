import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import sendRequest from '../../utilities/send-request'

export default function NewRecipePage({ user }) {
  const [name, setName] = useState('')
  const [cookTime, setCookTime] = useState(0)
  const [description, setDescription] = useState('')
  const [directions, setDirections] = useState('')

  const navigate = useNavigate()
  const handleChange = (evt) => {
    const { name, value } = evt.target
    switch (name) {
      case 'name':
        setName(value)
        break
      case 'cookTime':
        setCookTime(value)
        break
      case 'description':
        setDescription(value)
        break
      case 'directions':
        setDirections(value)
        break
      default:
        break
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name,
      cookTime,
      description,
      directions,
      user: user._id,
    }
    const newRcp = await sendRequest('/api/recipes/create', 'POST', data)
    navigate(`/profile/${user.username}`);
  }

  return (
    <div>
      <h1>Post a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Name</p>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div>
          <p>Cook Time</p>
          <input
            type="number"
            name="cookTime"
            value={cookTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Description</p>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Directions</p>
          <textarea
            name="directions"
            value={directions}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
        <Link to={`/profile/${user.username}`}>Cancel</Link>
      </form>
    </div>
  )
}