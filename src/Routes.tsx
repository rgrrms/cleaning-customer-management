import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateCustomer from "./pages/createCustomer/createCustomer.tsx";
import ListCustomer from "./pages/listCustomer/listCustomer.tsx";


const RoutesPages = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ListCustomer />} />
                <Route path="/create-customer" element={<CreateCustomer />} />
            </Routes>
        </Router>
    );
}

export default RoutesPages;