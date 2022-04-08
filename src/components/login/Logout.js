import React from 'react';
import { Button } from '@mui/material';

export default function Logout() {


    const logoutfromGoogle = () =>{
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("givenName")
        window.location.href="/login";
    }


    return (
        <Button onClick={logoutfromGoogle}>Logout</Button>
    )
};
