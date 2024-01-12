import React from 'react';
import { NameForm } from '../components';

const Home = () => {
    return (
        <div>
        
            <h1>never double-gift again.</h1>
            <p>create a personalized wishlist, share it with friends, and let them choose the perfect gifts for you!</p>
            <NameForm type="owner" wishlistUuid="" />

        </div>
    );
}

export default Home;