import React from "react";
import GoogleLogin from "react-google-login";
import axios from 'axios';
import "../app.css";

export default function Login() {
  const userInfoFromGoogle = localStorage.getItem('givenName') ? JSON.parse(localStorage.getItem('givenName')): null

  const responseGoogle = (response) => {
    // console.log(response);
    axios.post("/api/token/obtain/", {
            token: response.tokenId,
        }).then((res) => {
            // console.log(res.data);
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            localStorage.setItem("givenName",JSON.stringify(response.profileObj.name));
            localStorage.setItem("userEmail",JSON.stringify(response.profileObj.email));
            localStorage.setItem("unique_id", JSON.stringify(response.profileObj.googleId));
            // localStorage.setItem("userInfo",JSON.stringify(response.profileObj));
            console.log(localStorage)
            window.location.href="/main";
        })
        .catch((err) => {
            console.log(err);
        });
  };

  return (
    <div className="index">
      <div className="title">AI Fund</div>
        <div className="login"> 
            <GoogleLogin
                clientId="1037334249034-4bjab8oqtlsv7bijjf4fgme6m2ur4sqg.apps.googleusercontent.com"
                buttonText="login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> 
        </div>
    </div>
  );
}