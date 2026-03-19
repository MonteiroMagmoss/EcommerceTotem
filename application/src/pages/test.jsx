import { useState } from 'react'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(null); // null = deslogado
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Simulação de banco de dados da loja
  const [listaUsuarios] = useState([
    { id: 1, nome: "Ailton Mestre", email: "admin@prtss.com", senha: "123", cargo: "admin" },
    { id: 2, nome: "Vendedor 01", email: "venda@prtss.com", senha: "123", cargo: "operador" }
  ]);

  const sneakers = [
    { id: 1, nome: "Qix California", preco: 189.99 },
    { id: 2, nome: "Qix Plaza 2", preco: 399.99 },
    { id: 3, nome: "Qix Chorão", preco: 360.76 }
  ];

  const realizarLogin = () => {
    const achado = listaUsuarios.find(u => u.email === email && u.senha === senha);
    if (achado) setUsuario(achado);
    else alert("Credenciais inválidas!");
  };

  // 1. TELA DE LOGIN (Baseada no seu formulário rosa)
  if (!usuario) {
    return (
      <div className="app-container">
        <header className="header"><div className="logo-texto">PRTSS LOGIN</div></header>
        <div className="form-container">
          <h2>ACESSO AO SISTEMA</h2>
          <label>E-mail:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Senha:</label>
          <input type="password" onChange={(e) => setSenha(e.target.value)} />
          <button className="btn-login" onClick={realizarLogin}>ENTRAR</button>
        </div>
      </div>
    );
  }

  // 2. TELA PRINCIPAL (Pós-Login)
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-texto">PRTSS SNEAKERS</div>
        <span>Olá, {usuario.nome} ({usuario.cargo})</span>
        <button className="btn-sair" onClick={() => setUsuario(null)}>Sair</button>
      </header>

      <main style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Painel de Controle</h1>

        {usuario.cargo === "admin" ? (
          /* VISÃO DO ADMINISTRADOR */
          <section>
            <h2 style={{color: '#cc4996'}}>Gerenciamento de Equipe</h2>
            <table className="tabela-admin">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Colaborador</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody>
                {listaUsuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nome}</td>
                    <td>{u.cargo.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          /* VISÃO DO OPERADOR (VENDEDOR) */
          <section>
            <h2 style={{color: '#4f8dcd'}}>Estoque de Vendas</h2>
            <div className="galeria">
              {sneakers.map(s => (
                <div className="item" key={s.id}>
                  <p className="fonte">{s.nome}</p>
                  <p>Preço Sugerido: $R\$ {s.preco.toFixed(2)}$</p>
                  <button style={{background: '#2ecc71', color: 'white'}}>Vender</button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;