import './Main.css';
import Card from '../Card/Card';
import { useEffect, useMemo, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Filter from '../Filter/Filter';
import notImg from '../Images/notfound.png';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Alert from './Alert'; 

export default function Main() {
    const [productData, setProductData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]); 
    const [searchValue, setSearchValue] = useState('');
    const [currentType, setCurrentType] = useState('Hammasi');
    const [visible, setVisible] = useState(10);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
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
            setNewTotalQuantity(updatedQuantity); 

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            try {
                const [productResponse, cartResponse] = await Promise.all([
                    axios.get('https://farxodovich1811.pythonanywhere.com/api/get-data/'),
                    axios.get('https://farxodovich1811.pythonanywhere.com/api/get_cart_items/')
                ]);
                setProductData(productResponse.data.data);
                setFilteredData(productResponse.data.data);
                setQuantities(cartResponse.data.data.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));
            } catch (err) {
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        const filtered = productData.filter((item) => {
            const matchesSearchText = item.title && item.title.toLowerCase().startsWith(lowerCaseSearchValue);
            const matchesType = currentType === 'Hammasi' || item.type === currentType;
            return matchesSearchText && matchesType;
        });

        setFilteredData(filtered);
        setVisible(10); 
    }, [searchValue, currentType, productData]);



    const handleFilterChange = (selectedType) => {
        setCurrentType(selectedType);
    };

    const totalQuantity = useMemo(() => {
        return Object.keys(quantities).length;  
    }, [quantities]);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" role="status" className="spinner">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> 
        ); 
    }

    return (
        <main>
            <div className="container">
                {showAlert && (
                    <Alert 
                        message={alertData.message} 
                        onClose={() => setShowAlert(false)} 
                        data={{ name: alertData.name, img: alertData.img }}
                        totalQuantity={newTotalQuantity}
                    />
                )}
                <Navbar search={handleSearch} value={searchValue} cartCount={totalQuantity} />
                <Filter setType={handleFilterChange} />
                <h3>Mashhur &#10095;</h3>

                {filteredData.length > 0 ? (
                    <div className="main-content">
                        <Card data={filteredData.slice(0, visible)} handleAddToCart={handleAddToCart} />
                        {visible < filteredData.length && (
                            <button className="show-more" onClick={() => setVisible(visible + 10)}>
                                Ko`proq ko`rish
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="not-found-container">
                        <img className="not-found" src={notImg} alt="404" />
                        <p>Maxsulot topilmadi yoki mavjud bo`lmasligi mumkin.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
