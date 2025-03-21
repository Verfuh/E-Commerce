// LoginAccountForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SupplierLoginForm = ({ onLoginSuccess }) => {
    const [cnpj, setCpnj] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/supplier/login', {
                cnpj,
                password,
            });

            const token = response.data.token;

            if (token) {

                localStorage.setItem('authToken', token);

                console.log('Login bem-sucedido!');


                onLoginSuccess();
            } else {
                console.log('Token não encontrado na resposta.');
            }
        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Erro no login.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Login Fornecedor</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">CNPJ:</label>
                        <input
                            type="text"
                            id="cnpj"
                            className="form-control"
                            value={cnpj}
                            onChange={(e) => setCpnj(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                {responseMessage && (
                    <div className="mt-3 alert alert-info">
                        <p className="mb-0">{responseMessage}</p>
                    </div>
                )}
                {error && (
                    <div className="mt-3 alert alert-danger">
                        <p className="mb-0">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupplierLoginForm;
