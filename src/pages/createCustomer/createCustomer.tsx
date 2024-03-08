import React, { FormEvent, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api.ts";
import "./createCustomer.css";

const CreateCustomer = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [x, setX] = useState("");
    const [y, setY] = useState("");

    const navigate = useNavigate();

    async function handleCreatedAccount(event: FormEvent) {
        event.preventDefault();

        const data = {
            name,
            email,
            phone,
            x,
            y
        }

        try {
            api.post("/v1", data);            
        }catch (e) {
            alert("Erro ao cadastrar usuario");
        }
        navigate('/');
    }

    return (
        <div className="container">
            <form onSubmit={handleCreatedAccount}>
                <fieldset>
                    <legend>
                        <h2 className="title">Cadastrar Cliente</h2>
                    </legend>
                    <div>
                        <label htmlFor="name">Nome</label>
                        <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone</label>
                        <input type="text" name="phone" id="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="x">X</label>
                        <input type="text" name="x" id="x" value={x} onChange={e => setX(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="y">Y</label>
                        <input type="text" name="y" id="y" value={y} onChange={e => setY(e.target.value)}/>
                    </div>
                    <button type="submit">Cadastrar Cliente</button>
                </fieldset>
                <Link to="/" className="link">
                    <FiArrowLeft />
                    Voltar
                </Link>
            </form>
        </div>
    );
}

export default CreateCustomer;