import { useState } from 'react'
import { useEffect } from 'react';
import { listaProdutos as dadosIniciais} from './data/produtos.js';
import Cliente from './pages/cliente.jsx'
import Admin from './pages/admin.jsx'
import './App.css'

function App() {
  const[usuario, setUsuario] = useState(null);
  const[email, setEmail] = useState("");
  const[senha, setSenha] = useState("");
  const[produtos, setProdutos] = useState(dadosIniciais);
  const[pedidos, setPedidos] = useState([]);

  const[listaUsuarios] = useState([
    {id: 1, email: "admin@admin.com", senha: "123", cargo: "admin"},
    {id: 2, email: "cliente@cliente.com", senha: "123", cargo: "cliente"}
  ]);
  const realizarLogin = () =>{
    const achado = listaUsuarios.find(u => u.email === email && u.senha === senha);

    if(achado){
      setUsuario(achado);
    }else{
      alert("Email ou senha incorretos!");
    }
  }

  if(!usuario){
    return (
      <>
        <header className="header"><div className="logo-text">Las Esfihas</div></header>
        <div className="login-container">
          <h2 className="login-title">Tela de acesso</h2>
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Senha:</label>
          <input type="password" onChange={(e) => setSenha(e.target.value)} />
          <button className="login-button" onClick={realizarLogin}>Entrar</button>
        </div>
      </>
    )
  }
  return(
    <>
      <header className="header">
        <div className="logo-text">Las Esfihas</div>
      </header>
      <main className="main-content">
        {usuario.cargo === "admin" ? (
            <section className='section-container'>
              <div>
                <h2>Área de Administração</h2>
                <h2>Perfil:</h2>
                <p>Email: {usuario.email}</p>
                <p>Cargo: {usuario.cargo}</p>
              </div>
              <Admin 
                produtos={produtos} 
                setProdutos={setProdutos}
                pedidos={pedidos} 
                listaUsuarios={listaUsuarios}
              />
              <button className="logout-button" onClick={() => setUsuario(null)}>Sair</button>
            </section>
          ) : (
            <section className='section-container'>
              <Cliente 
                setUsuario={setUsuario} 
                produtos={produtos}
                pedidos={pedidos}
                setPedidos={setPedidos}
              />
            </section>
          )}
      </main>
    </>
  );
}

export default App
