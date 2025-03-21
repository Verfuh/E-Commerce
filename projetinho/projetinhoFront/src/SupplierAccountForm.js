import React, { useState } from 'react';
import axios from 'axios';

const SupplierAccountForm = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const [formData, setFormData] = useState({
        corporateName: '',
        cnpj: '',
        password: '',
    });

    const handleChange = (e) => {
        console.log('Entrou aqui')
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Salvando dados');
            const responde = await axios.post('http://localhost:8080/supplier/newSupplier', formData);
            if (responde.status === 200) {
                setResponseMessage('Conta criada com sucesso!');
            }
            else {
                setResponseMessage('Erro ao criar a conta.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar com o servidor');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Crie sua conta de fornecedor</h3>
                <form onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="corporateName" className="form-label">Razão Social:</label>
                        <input
                            type='text'
                            id="corporateName"
                            name='corporateName'
                            value={formData.corporateName}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">CNPJ:</label>
                        <input
                            type='text'
                            id="cnpj"
                            name='cnpj'
                            value={formData.cnpj}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type='password'
                            id="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button type='submit' className="btn btn-primary">Criar Conta</button>
                    </div>
                </form>
                {responseMessage && (
                    <div className="mt-3 alert alert-info">
                        <p className="mb-0">{responseMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupplierAccountForm;