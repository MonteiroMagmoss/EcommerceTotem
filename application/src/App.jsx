import { useState } from 'react'
import './App.css'

function App() {
  const[usuario, setUsuario] = useState(null);
  const[email, setEmail] = useState("");
  const[senha, setSenha] = useState("");

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
        <button className="logout-button" onClick={() => setUsuario(null)}>Sair</button>
      </header>
      <main className="main-content">
        {usuario.cargo === "admin" ? (
            <section className='section-container'>
              <h2>Área de Administração</h2>
            </section>
          ) : (
            <section className='section-container'>
              <div className='offer'>
                <div className='offer-content'>
                  <h2>20% OFF</h2>
                  <p className='offer-description'>Descontos especiais para você!</p>
                </div>
                <div className='content'>
                  <div className='category-content'>
                    <h2>Categorias</h2>
                    <ul className='category-list'>
                      <li className='category-item'><button>Esfihas</button></li>
                      <li className='category-item'><button>Combo</button></li>
                      <li className='category-item'><button>Bebidas</button></li>
                      <li className='category-item'><button>Sobremesas</button></li>
                    </ul>
                  </div>
                  <div className='product-content'>
                    <h2>Produtos em Destaque</h2>
                    <ul className='product-list'>
                      <li className='product-item'>
                        <div className='product-box'>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s" alt="Esfiha de Carne" className='product-image' />
                          <div className='product-info'>
                            <h2>Esfiha de Carne</h2>
                            <p>R$ 5,00</p>
                            <button>Adicionar ao Carrinho</button>
                          </div>
                        </div>
                        <div className='product-box'>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s" alt="Esfiha de Carne" className='product-image' />
                          <div className='product-info'>
                            <h2>Esfiha de Frango</h2>
                            <p>R$ 5,00</p>
                            <button>Adicionar ao Carrinho</button>
                          </div>
                        </div>
                        <div className='product-box'>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s" alt="Esfiha de Carne" className='product-image' />
                          <div className='product-info'>
                            <h2>Esfiha de Queijo</h2>
                            <p>R$ 5,00</p>
                            <button>Adicionar ao Carrinho</button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}
      </main>
    </>
  );
}

export default App
