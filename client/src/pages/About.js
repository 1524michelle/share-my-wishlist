import React from 'react';

const About = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
            <div style={{ textAlign: 'left' }}>
                <h1>about wishlistify!</h1>
                <p>wishlistify is a site inspired by when2meet, where friends can easily make wishlists and send them to each other during any gifting occasion.</p>
            </div> 
        </div>
    );
}

export default About;