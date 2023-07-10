import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sendRequest from "../../utilities/send-request";

export default function ProfileCard({user}){
    return(
        <Link to = {`/profile/${user.name}`}>
            
        </Link>
    )
}