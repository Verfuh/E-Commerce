import React, { useState } from 'react';
import axios from 'axios';

const UserAccountForm = () => {
    const [responseMessage, setResponseMessage] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
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

        try{
            console.log('Salvando dados');
            const responde = await axios.post('http://localhost:8080/users/newUser', formData);
        if(responde.status === 200){
            setResponseMessage('Conta criada com sucesso!');
        }
        else{
            setResponseMessage('Erro ao criar a conta de usuários.');
        }
        } catch (error) {
            setResponseMessage('Falha ao conectar com o servidor');
        }
    };
    
    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Crie sua conta de usuário</h3>
                <form onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nome:</label>
                        <input
                            type='text'
                            id="username"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type='email'
                            id="email"
                            name='email'
                            value={formData.email}
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

export default UserAccountForm;