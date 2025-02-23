import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleAuth = () => {
        if (isLoggedIn) {
            sessionStorage.removeItem("authToken");
            setIsLoggedIn(false);
            navigate("/login");
        } else {
            navigate("/login");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-around align-items-center w-100">

                <a className="navbar-brand fw-bold" href="#">IFBA</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-around" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gerenciamento">Gerenciamento</Link>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={handleAuth}
                                className="btn btn-outline-success">
                                {isLoggedIn ? "Logout" : "Login"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;