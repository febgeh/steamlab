import React from "react";
import './css/Profile.css';
import  { useState } from "react";



function Profile() {

    window.onload = function() {
        fetch('http://localhost:4000/Profile', { method: 'GET', })
            .then(response => {
                console.log(response);
                return response;  
            })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = '/'; 
                    return response.json();
                }else{
                    return response.json();
                }
            })
            .catch(error => console.error('Error:', error));
    }

    const info = {
        displayName: "febgeh",
        username: "febgeh12",
        level: 11,
        SteamId: 76561198000000000,
        lastSeen: "2020-12-12",
        picture: require("./bilder/google.png")
    }
    
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClick = (option) => {
      setSelectedOption(option);
    };

    const handleLogout = () => {
        fetch('http://localhost:4000/logout', { method: 'GET', })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // const renderComponent = () => {
    //     switch (selectedOption) {
    //       case "Users":
    //         return <UsersComponent />;
    //       case "Achievements":
    //         return <AchievementsComponent />;
    //       case "Friends":
    //         return <FriendsComponent />;
    //       default:
    //         return null;
    //     }
    //   };

    return (
        <div className="center">
            <div className="Profile">
                <div className="ProfileImg">
                    <img src={info.picture} alt="" />
                    <div className="ProfileInfo">
                        
                        <div className="Info1">
                            <p>{info.displayName}</p>
                            <div className="LevelRound">
                                <p>{info.level}</p> 
                            </div>
                        </div>
                        <p className="username">{info.username}</p>

                        <div className="Info2">
                            <p>SteamId: {info.SteamId}</p>
                            <p>Last seen: {info.lastSeen}</p>
                        </div>
                    </div>
                </div>
                <div className="options">
                    <a href="#" className={selectedOption === "Users" ? "selected" : ""} onClick={() => handleClick("Users")}>
                        <p>Users</p>
                    </a>
                    <a href="#" className={selectedOption === "Achievements" ? "selected" : ""} onClick={() => handleClick("Achievements")}>
                        <p>Achievements</p>
                    </a>
                    <a href="#" className={selectedOption === "Friends" ? "selected" : ""} onClick={() => handleClick("Friends")}>
                        <p>Friends</p>
                    </a>
                </div>
                {/* <div className="component">
                    {renderComponent()}
                </div> */}
            <button id="logoutButton" onClick={handleLogout}>Logout</button>
            </div>
        </div>

    );
}

export default Profile;