import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [productId, setProductId] = useState(''); // Para buscar um produto
    const [products, setProducts] = useState([]); // Para armazenar todos os produtos


    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    // Criar objeto para busca pelo ID.
    // Tratar o evento change dos campos do form.
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Tratar o gravar dados.
    const handleSave = async (e) => {
        e.preventDefault();
        const token = getAuthToken();

        try {
            console.log('Salvando dados');
            const response = await axios.post(
                'http://localhost:8080/product/createProduct',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setResponseMessage('Produto cadastrado com sucesso!');
            } else {
                setResponseMessage('Erro ao cadastrar produto.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar com o servidor');
        }
    };

    // Limpar os dados
    const handleClear = () => {
        setFormData({
            name: '',
            description: '',
            category: '',
            price: '',
            stock: '',
        });
        setResponseMessage('');
    };

    // Função para buscar produtos
    const handleSearch = async () => {
        if (!productId) {
            setResponseMessage('Por favor, insira um ID de produto.');
            return;
        }

        console.log('Buscando produto com ID:', productId);
        const token = getAuthToken();

        try {
            const response = await axios.get(
                `http://localhost:8080/product/getProductById`,
                {
                    params: { id: productId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setFormData(response.data);
                setResponseMessage('Produto encontrado e carregado.');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setResponseMessage('Produto não encontrado.');
            } else {
                setResponseMessage('Erro ao buscar produto.');
            }
        }
    };

    // Função para excluir produto
    const handleDelete = async () => {
        if (!productId) {
            setResponseMessage('Por favor, insira um ID de produto.');
            return;
        }

        const token = getAuthToken();

        try {
            const response = await axios.delete(
                `http://localhost:8080/product/deleteProduct`,
                {
                    data: { id: productId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setResponseMessage('Produto excluído com sucesso!');
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    stock: '',
                });
            } else {
                setResponseMessage('Erro ao excluir produto.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar com o servidor');
        }
    };

    // Função para atualizar produto
    const handleUpdate = async () => {
        if (!productId) {
            setResponseMessage('Por favor, insira um ID de produto.');
            return;
        }

        const token = getAuthToken();

        try {
            const response = await axios.put(
                'http://localhost:8080/product/updateProduct',
                {
                    id: productId,
                    ...formData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setResponseMessage('Produto atualizado com sucesso!');
            } else {
                setResponseMessage('Erro ao atualizar produto.');
            }
        } catch (error) {
            setResponseMessage('Falha ao conectar com o servidor');
        }
    };

    // Função para buscar todos os produtos
    const handleGetAllProducts = async () => {
        const token = getAuthToken();
        try {
            const response = await axios.get('http://localhost:8080/product/getAllProducts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setProducts(response.data);
                setResponseMessage('Produtos carregados com sucesso.');
            }
        } catch (error) {
            setResponseMessage('Erro ao carregar produtos.');
        }
    };


    return (
        <div className="user-account-form">
            <h3>Cadastro de produtos</h3>
            <form onSubmit={handleSave}>
                <div className='form-group'>
                    <label>Nome:</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Descrição:</label>
                    <input
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <label>Categoria:</label>
                    <input
                        type='text'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <label>Preço:</label>
                    <input
                        type='number'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <label>Estoque:</label>
                    <input
                        type='text'
                        name='stock'
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type='submit' className="btn btn-primary">Criar Produto</button>
                    <button type='button' className="btn btn-secondary" onClick={handleClear}>Limpar</button>
                </div>
            </form>

            {/* Campo para busca por ID */}
            <div className="form-group mt-3">
                <label>ID do Produto:</label>
                <input
                    type="text"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Digite o ID do produto"
                />
                <button type="button" className="btn btn-info" onClick={handleSearch}>Buscar Produto</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Excluir Produto</button>
                <button type="button" className="btn btn-warning" onClick={handleUpdate}>Atualizar Produto</button>
            </div>

            {/* Botão para exibir todos os produtos */}
            <button type="button" className="btn btn-success mt-3" onClick={handleGetAllProducts}>Exibir Todos os Produtos</button>

            {/* Exibindo a lista de produtos */}
            <div className="mt-3">
                {products.length > 0 ? (
                    <ul className="list-group">
                        {products.map((product) => (
                            <li key={product.id} className="list-group-item">
                                {product.name} - {product.category} - {product.price} - {product.stock}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>

            {/* Mensagem de resposta */}
            <div className="mt-3">
                {responseMessage && <div className="alert alert-info">{responseMessage}</div>}
            </div>
        </div>
    );
};

export default ProductDataForm;
