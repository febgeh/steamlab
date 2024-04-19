import React from "react";
import './css/Login.css';

function loginWithSteam() {
    const url = "http://localhost:4000/api/auth/steam";
    window.open(url, 'Steam Login', 'width=1000,height=500,scrollbars=yes'); 
}

// href="http://localhost:4000/api/auth/steam"
function Login() {
    return (
        <div>
            <div className="Login">
                <div>
                    <img src={require("./bilder/warning.png")} alt="" />
                    <div>
                        <p>You have to login to browse!</p>
                    </div>
                </div>
                <a onClick={loginWithSteam}><p className="loginLink">Do you want to login?</p></a>
            </div>
        </div>
    );
}


export default Login;