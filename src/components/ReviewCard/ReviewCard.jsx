import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import './ReviewCard.css'
export default function ReviewCard({review,user}){

    return(
        <div className="card">
            <h4>Posted by {review.user.username}</h4>
            <h4>{review.rating} ⭐</h4>
            <p>Review: <br/> {review.description}</p>
        </div>
    )
}