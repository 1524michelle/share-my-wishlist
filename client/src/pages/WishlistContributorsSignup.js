import React from 'react';
import { NameForm } from '../components';
import { useParams } from 'react-router-dom';

const WishlistContributorsSignup = ({ owner_name }) => {
    const { wishlistUuid } = useParams();
    return (
        <div>
        
        <h1>welcome to {owner_name}'s wishlist!</h1>
        <p>enter your name to begin checking items off {owner_name}'s wishlist!</p>
        <NameForm type="contributor" wishlistUuid={`${wishlistUuid}`} />
            
        </div>
    );
}

export default WishlistContributorsSignup;