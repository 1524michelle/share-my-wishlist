import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddItemForm } from '../components';

const Create = () => {
    const [eventTitle, setEventTitle] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchEventTitle = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/event_title`);
                setEventTitle(response.data.eventTitle);
            } catch (error) {
                setEventTitle("default event title")
                console.error('Error fetching event title:', error);
            }
        };

        fetchEventTitle();
    }, []);

    const addItemToList = (newItem) => {
        setItems(prevItems => [...prevItems, newItem]);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 'calc(100vh - 80px)', padding: '0 20px' }}>
            <div style={{ flex: 1, marginRight: '20px' }}>
                <div style={{ textAlign: 'left' }}>
                    <h1>create your list for {eventTitle}</h1>
                    <AddItemForm addItemToList={addItemToList} />
                </div>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
                <h1>{eventTitle}</h1>
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
