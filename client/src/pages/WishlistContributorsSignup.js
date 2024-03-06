import React from 'react';
import { NameForm } from '../components';
import { useParams } from 'react-router-dom';

const WishlistContributorsSignup = ({ event_title }) => {
    const { wishlistUuid } = useParams();
    return (
        <div>
        
        <h1>welcome to {event_title}!</h1>
        <p>enter your name to begin checking items off!</p>
        <NameForm type="contributor" wishlistUuid={`${wishlistUuid}`} />
            
        </div>
    );
}

export default WishlistContributorsSignup;