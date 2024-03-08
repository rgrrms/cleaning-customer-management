import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../services/api.ts";
import Modal from "../../components/modal/modal.tsx";

type ICustomer = {
    name: string;
    email: string;
    phone: string;
    x: number;
    y: number;
}

type IRoute = {
    name: string;
    x: number;
    y: number;
}

const ListCustomers = () => {
    const [customersList, setCustomersList] = useState<ICustomer[]>([]);
    const [customersFilteredList, setCustomersFilteredList] = useState<ICustomer[]>([]);
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [routeList, setRouteList] = useState<IRoute[]>([]);

    useEffect(() => {
        const a = async () => {
            try {
                const customers = await api.get("/v1");
                setCustomersList(customers.data);
                setCustomersFilteredList(customers.data);
            } catch (e) {
                alert("Erro ao buscar clientes");
            }
        }
        a();
    }, [])

    const handleInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);

        if (value.length === 0) setCustomersFilteredList(customersList);

        const filtered = customersList.filter(custumer => custumer.name.toLowerCase().includes(value)
            || custumer.email.toLowerCase().includes(value) || custumer.phone.toLowerCase().includes(value));
        setCustomersFilteredList(filtered);
    }

    const onHandleCalculateRoute = async () => {
        try {
            const route = await api.get("/v1/routes");
            console.log(route.data);
            setRouteList(route.data);
        } catch (e) {
            alert("Erro ao calcular a rota");
        }
        setIsOpen(true);
    }

    return (
        <div className="container">
            <div>
                <label>Pesquisar </label>
                <input type="text" value={search} onChange={handleInputChange} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>X</th>
                        <th>Y</th>
                    </tr>
                </thead>
                <tbody>
                    {customersFilteredList?.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer?.name}</td>
                            <td>{customer?.email}</td>
                            <td>{customer?.phone}</td>
                            <td>{customer?.x}</td>
                            <td>{customer?.y}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/create-customer" className="link">
                <FiArrowRight />
                Cadastrar Cliente
            </Link>

            <div>
                <button onClick={() => onHandleCalculateRoute()}>Calcular rota</button>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <h2>Rota mais curta</h2>
                    <ul>
                        {routeList?.map((route, index) => (
                            <li key={index}>{route?.name} : {route?.x} - {route?.y}</li>
                        ))}
                    </ul>
                </Modal>
            </div>
        </div>
    );
}

export default ListCustomers;