import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Login from '../pages/login';
import Home from '../pages/Home';



function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>);
} export default Rotas