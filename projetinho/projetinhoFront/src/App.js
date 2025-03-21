// App.js
import React, { useState } from 'react';
import './App.css';
import LoginAccountForm from './LoginAccountForm';
import UserAccountForm from './UserAccountForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDataForm from './ProductDataForm';
import SupplierAccountForm from './SupplierAccountForm';
import SupplierLoginForm from './SupplierLoginForm';


function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setCurrentPage('product');
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="#">Titulo principal</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-success" onClick={() => handleNavClick('createAccount')}>Criar conta usuário</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-success" onClick={() => handleNavClick('login')}>Login usuário</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-info" onClick={() => handleNavClick('createAccountSupplier')}>Criar conta fornecedor</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-info" onClick={() => handleNavClick('loginSupplier')}>Login fornecedor</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-danger" onClick={() => handleNavClick('logout')}>Sair</button>
            </li>
          </ul>
        </div>
      </nav>
      {/* Conteúdo principal */}
      <div className='conteiner text-center mt-5'>
        {currentPage === 'landing' && (
          <div className='mt-4'>
            <h1 className='display-4'>Segundo Bimestre</h1>
          </div>
        )}

        {/* Criar conta */}
        {currentPage === 'createAccount' && (
          <div className='mt-4'>
            <div>
              <UserAccountForm />
            </div>
          </div>
        )}

        {/* Login */}
        {currentPage === 'login' && (
          <div className='mt-4'>
            <LoginAccountForm onLoginSuccess={handleLoginSuccess} />
          </div>
        )}

        {/* Criar conta */}
        {currentPage === 'createAccountSupplier' && (
          <div className='mt-4'>
            <div>
              <SupplierAccountForm />
            </div>
          </div>
        )}

        {/* Login */}
        {currentPage === 'loginSupplier' && (
          <div className='mt-4'>
            <SupplierLoginForm onLoginSuccess={handleLoginSuccess} />
          </div>
        )}

        {/* Produtos */}
        {currentPage === 'product' && (
          <div className='mt-4'>
            <ProductDataForm />
          </div>
        )}

        {/* Sair */}
        {currentPage === 'logout' && (
          <div className='mt-4'>
            {/* Adicione lógica para logout aqui */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
