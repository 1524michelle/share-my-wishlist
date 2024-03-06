import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddItemForm } from '../components';

const Create = () => {
    const [ownerName, setOwnerName] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchOwnerName = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/owner_name`);
                setOwnerName(response.data.ownerName);
            } catch (error) {
                console.error('Error fetching owner name:', error);
            }
        };

        fetchOwnerName();
    }, []);

    const addItemToList = (newItem) => {
        setItems(prevItems => [...prevItems, newItem]);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 'calc(100vh - 80px)', padding: '0 20px' }}>
            <div style={{ flex: 1, marginRight: '20px' }}>
                <div style={{ textAlign: 'left' }}>
                    <h1>create your list!</h1>
                    <AddItemForm addItemToList={addItemToList} />
                </div>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
                <h1>{ownerName}'s wishlist</h1>
                <div>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>{item.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Create;
