import './Navbar.css';
import logo from './uzum-logo.png';
import Search from '../Search/Search';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export default function Navbar({ search, value, cartCount }) {

    
    return (
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <img src={logo} height="30" className="d-inline-block align-top" alt=""/>
            </Link>
            <Search value={value} search={search}/>

            <div className="header-links">
                <svg xmlns="http://www.w3.org/2000/svg" width="250x" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M5 20V19C5 16.2386 7.23858 14 10 14H14C16.7614 14 19 16.2386 19 19V20M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button id="login-btn" className="header_link" href="">Kirish</button>
            </div>

            <div className="header-links">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <path d="M4.42602 12.3115L12 19.8854L19.574 12.3115C21.4753 10.4101 21.4753 7.32738 19.574 5.42602C17.6726 3.52466 14.5899 3.52466 12.6885 5.42602L12 6.11456L11.3115 5.42602C9.4101 3.52466 6.32738 3.52466 4.42602 5.42602C2.52466 7.32738 2.52466 10.4101 4.42602 12.3115Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <Link className="header_link" to='/like'>Saralanganlar</Link>
            </div>

            <div className="header-links">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 15 15" version="1.1" id="shop">
                    <path d="M13.33,6H11.5l-0.39-2.33c-0.1601-0.7182-0.7017-1.2905-1.41-1.49C9.3507,2.0676,8.9869,2.007,8.62,2H6.38C6.0131,2.007,5.6493,2.0676,5.3,2.18C4.5917,2.3795,4.0501,2.9518,3.89,3.67L3.5,6H1.67C1.3939,5.9983,1.1687,6.2208,1.167,6.497C1.1667,6.5489,1.1744,6.6005,1.19,6.65l1.88,6.3l0,0C3.2664,13.5746,3.8453,13.9996,4.5,14h6c0.651-0.0047,1.2247-0.4289,1.42-1.05l0,0l1.88-6.3c0.0829-0.2634-0.0635-0.5441-0.3269-0.627C13.4268,6.0084,13.3786,6.0007,13.33,6z M4.52,6l0.36-2.17c0.0807-0.3625,0.3736-0.6395,0.74-0.7C5.8663,3.0524,6.1219,3.0087,6.38,3h2.24c0.2614,0.0078,0.5205,0.0515,0.77,0.13c0.3664,0.0605,0.6593,0.3375,0.74,0.7L10.48,6h-6H4.52z" />
                </svg>
                <Link className="header_link" to="/order">Savat</Link>
                {/* Display cart count if greater than 0 */}
                {cartCount > 0 && (
                    <span className="cart-counter">{cartCount}</span>
                )}
            </div>
        </nav>
    );
}
