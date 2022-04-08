import React , { useState } from 'react';
import GoogleLogin from "react-google-login";
import axios from 'axios';

export default function Login(){
    const responseGoogle = (response) => {
        // console.log(response);
        
        axios.post("/api/token/obtain/", {
                token: response.tokenId,
            }).then((res) => {
                // console.log(res.data);
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);
                localStorage.setItem("givenName",JSON.stringify(response.profileObj.name));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
      <div>
          <GoogleLogin
                clientId="1037334249034-4bjab8oqtlsv7bijjf4fgme6m2ur4sqg.apps.googleusercontent.com"
                buttonText="login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
      </div>
    )
  
}
