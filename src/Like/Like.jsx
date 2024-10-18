import './Like.css';
import { useState, useEffect, useMemo } from 'react';
import { AiOutlineShopping } from "react-icons/ai";
import { IoMdHeart } from "react-icons/io";
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link } from "react-router-dom";
import notLiked from './hearts.png';
import Alert from '../Main/Alert';

export default function Like() {
    const [liked, setLiked] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [showAlert, setShowAlert] = useState(false); 
    const [alertData, setAlertData] = useState({ name: '', img: '' });  
    const [newTotalQuantity, setNewTotalQuantity] = useState(0);

    const handleAddToCart = async (item) => {
        setQuantities(prevQuantities => {
            const currentQuantity = prevQuantities[item.id] || 0;
            return { ...prevQuantities, [item.id]: currentQuantity + 1 }; 
        });

        try {
            const response = await axios.post('https://farxodovich1811.pythonanywhere.com/api/add-item/', { id: item.id });
            console.log('Item added to cart:', response.data);

            const updatedQuantity = (quantities[item.id] || 0) + 1;
            setNewTotalQuantity(updatedQuantity)

            setAlertData({ 
                message: 'Maxsulot savatga qo`shildi!', 
                name: item.title, 
                img: item.img 
            });
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

        } catch (error) {
            console.error('Error adding item to cart:', error);
            setAlertData({
                message: 'Xatolik yuz berdi. Iltimos, qayta urinib ko`ring.',
                name: '',
                img: ''
            });
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    const totalQuantity = useMemo(() => {
        return Object.keys(quantities).length
    }, [quantities]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('https://farxodovich1811.pythonanywhere.com/api/get_cart_items/');
                const initialQuantities = {};
                response.data.data.forEach(item => {
                    initialQuantities[item.id] = (initialQuantities[item.id] || 0) + 1; 
                });
                setQuantities(initialQuantities); 
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                const response = await axios.get('https://farxodovich1811.pythonanywhere.com/api/get_liked_items/');
                setLiked(response.data.data);
            } catch (error) {
                console.log('Error fetching data');
            }
        };
        fetchLikedItems();
    }, []);

    const removeFromCart = async (itemId) => {
        try {
            setLiked(prevLiked => prevLiked.filter((item) => item.id !== itemId));
            const response = await axios.delete(`https://farxodovich1811.pythonanywhere.com/api/delete_from_liked/${itemId}/`);
            if (response.data.status !== 'success') {
                console.log('Error: Item was not deleted');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            {showAlert && (
                    <Alert 
                        message={alertData.message} 
                        onClose={() => setShowAlert(false)} 
                        data={{ name: alertData.name, img: alertData.img }} 
                        totalQuantity={newTotalQuantity}
                    />
                )}
            <Navbar cartCount={totalQuantity} />
            <br />
            <h2>Istaklarim</h2>
            <hr />
            {liked.length > 0 ? (
                <div className="product-card">
                    {liked.map(item => (
                        <div key={item.id} className="card">
                            <div className="card-image">
                                <a href='#' className="liked-icon" onClick={() => removeFromCart(item.id)}>
                                    <IoMdHeart />
                                </a>
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
                                        <a href='#' onClick={() => handleAddToCart(item)}>
                                            <AiOutlineShopping />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <img className='notlike' src={notLiked} />
                    <h3>Sizga yoqqanini qo'shing</h3>
                    <p>Mahsulotdagi ♡ belgisini bosing. Akkauntga kiring va barcha saralanganlar saqlanib qoladi.</p>
                    <br />
                    <Link to='/' className='backtohome'>Istak qo'shish</Link>
                </div>
            )}
        </div>
    );
}
