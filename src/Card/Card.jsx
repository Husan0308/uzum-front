import React, { useState, useEffect } from 'react';
import './Card.css';
import { AiOutlineShopping } from "react-icons/ai";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from 'axios';

const Card = ({ data, handleAddToCart }) => {
    const [likedItems, setLikedItems] = useState([]); 
    
    
    

    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get_liked_items/');
                setLikedItems(response.data.data);  
            } catch (error) {
                console.error('Error fetching liked items:', error);
            }
        };

        fetchLikedItems();
    }, []);

    
    const handleLikeToggle = async (item) => {
         

        try {
            const isLiked = likedItems.some(likedItem => likedItem.id === item.id);

            if (isLiked) {
                await axios.post('http://127.0.0.1:8000/api/unlike_item/', { id: item.id });
                setLikedItems(likedItems.filter(likedItem => likedItem.id !== item.id)); 
            } else {
                await axios.post('http://127.0.0.1:8000/api/like_item/', { id: item.id });
                setLikedItems([...likedItems, item]); 
            }
        } catch (error) {
            console.error('Error toggling like status:', error); 
        }
    };

    return (
        <div className="product-card">
            {data.map(item => (
                <div key={item.id} className="card">
                    <a className="like-icon" onClick={() => {
                        handleLikeToggle(item);
                    }}>
                        {likedItems.some(likedItem => likedItem.id === item.id) 
                            ? <IoMdHeart style={{ color: '#8a2bfd' }} />  
                            : <IoMdHeartEmpty />} 
                    </a>

                    <div className="card-image">
                        <img 
                            src={item.img || 'default-image.jpg'} 
                            alt={item.title || 'Product Image'} 
                        />
                    </div>
                    <div className="card-content">
                        <h3>{item.title}</h3>
                        <p className="monthly">{item.monthly.toLocaleString()} so'm/oyiga</p>
                        <div className="product-bottom-details">
                            <div className="product-price">
                                {item.discount && <small>{item.discount.toLocaleString()} so'm</small>}
                                <br />
                                <strong>{item.cost.toLocaleString()} so'm</strong>
                            </div>
                            <div className="product-links">
                                <a 
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <AiOutlineShopping />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
