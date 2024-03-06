import React from 'react';
import { NameForm } from '../components';

const Home = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>never double-gift again.</h1>
                <p>Create a personalized event wishlist, share it with friends, and let them choose the perfect gifts for you!</p>
                <NameForm type="owner" wishlistUuid="" />
            </div>
        </div>
    );
}

export default Home;
