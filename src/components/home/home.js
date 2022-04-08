import React from 'react';
import './home.css';

export default function Home(userInfoFromGoogle) {
    const userInfo = userInfoFromGoogle;
    // console.log(userInfo);


    return (
        <div className='homeContainer'>
            <div className='homeGreeting'>
                Hello {userInfo}<br />
                What are you going to do today?<br />
            </div> <br />
            <div className='smallerGreeting'>
                Pick Stock to Browse stocks <br />
                Pick Portfolio to build, optimize and analyze portfolio
            </div>
            <div className='homePicture'></div>
            
        </div>

    )
}
