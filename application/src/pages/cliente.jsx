import { useState } from 'react'
import React from 'react';
import './cliente.css';

function Cliente({setUsuario}) {
    const [pagina, setPagina] = useState(0);
    const [contador, setContador] = useState(0);
    const [carrinho, setCarrinho] = useState([]);

    const listaPaginas = [
        {id: 0, nome: "Inicio"},
        {id: 1, nome: "Home"},
        {id: 2, nome: "Carrinho"},
        {id: 3, nome: "Finalizar Pedido"}
    ];
    const listaProdutos = [
        {id: 1, nome: "Esfiha de Carne", preco: 5.00, categoria: "Esfihas", descricao: "Deliciosa esfiha de carne moída temperada com especiarias, perfeita para os amantes de sabores intensos.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s"},
        {id: 2, nome: "Esfiha de Frango", preco: 5.00, categoria: "Esfihas", descricao: "Saboroso pedaço de frango grelhado, recheado com queijo e temperado com especiarias.", imagem: "https://receitadaboa.com.br/wp-content/uploads/2024/07/esfiha-frango.jpg"},
        {id: 3, nome: "Esfiha de Queijo", preco: 5.00, categoria: "Esfihas", descricao: "Deliciosa esfiha recheada com queijo derretido e temperada com especiarias.", imagem: "https://img.cdndsgni.com/preview/10136544.jpg"},
        {id: 4, nome: "Esfiha de Calabresa", preco: 5.00, categoria: "Esfihas", descricao: "Esfiha saborosa recheada com calabresa e temperada com especiarias.", imagem: "https://www.seara.com.br/wp-content/uploads/2025/09/esfiha-aberta-de-calabresa-portal-minha-receita.webp"}
    ];
    const listaCategorias = [
        {id: 1, nome: "Novidades"},
        {id: 2, nome: "Esfihas"},
        {id: 3, nome: "Combo"},
        {id: 4, nome: "Bebidas"},
        {id: 5, nome: "Sobremesas"}
    ];
    function adicionarAoCarrinho(){
        setContador((contador) => contador + 1);
    }
    function removerDoCarrinho(){
        setContador((contador) => contador - 1);
    }

    function cancelarPedido(){
        setCarrinho([]);
        setContador(0);
        setPagina(0);
    }
    // Aba início
    if(pagina === 0){
        return(
            <section>
                <div className='main'>
                    <h2>Bem Vindo ao Las Esfihas</h2>
                    <p>Explore nosso cardápio e aproveite nossas ofertas especiais!</p>
                    <button onClick={() => setPagina(1)}>Entrar</button>
                    <img className='img-inicio' src="https://blog.biglar.com.br/wp-content/uploads/2022/10/iStock-537521984-1.jpeg" alt="img-Início" />
                    <button onClick={() => setUsuario(null)}>Sair</button>
                </div>
            </section>
        );
    }
    
    // Aba Home
    if(pagina === 1){
        return (
            <section>
                <div className='main'>
                        <div className='offer-content'>
                        <h2>20% OFF</h2>
                        <p className='offer-description'>Descontos especiais para você!</p>
                        </div>
                    <div className='content'>
                    <div className='category-content'>
                        <h2>Categorias</h2>
                        <ul className='category-list'>
                            <li className='category-item'><button>Novidades</button></li>
                            <li className='category-item'><button>Esfihas</button></li>
                            <li className='category-item'><button>Combo</button></li>
                            <li className='category-item'><button>Bebidas</button></li>
                            <li className='category-item'><button>Sobremesas</button></li>
                        </ul>
                    </div>
                    <div className='product-content'>
                        <h2>Produtos em Destaque</h2>
                        <ul className='product-list'>
                            {listaProdutos.map((produto) => (
                                <li className='product-item' key={produto.id}>
                                    <div className='product-box' >
                                        <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                        <div className='product-info'>
                                            <h2>{produto.nome}</h2>
                                            <p>{produto.descricao}</p>
                                            <h2>R$ {produto.preco.toFixed(2)}</h2>
                                            <button onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    </div>
                </div>
                <footer>
                    <div className='carrinho-box'><button className='' onClick={() => setPagina(2)}>Carrinho</button></div>
                    <p>Itens no carrinho: {contador}</p>
                    <div className='buttons-container'>
                    <div><button onClick={cancelarPedido}>Cancelar</button></div>
                    <div><button onClick={() => setPagina(3)}>Avançar</button></div>
                    </div>
                    <p>&copy; 2024 Las Esfihas. Todos os direitos reservados.</p>
                </footer>
            </section>
        );
    }
    // Aba carrinho de compras
    if(pagina === 2){
        return(
            <section>
                <div className='main'>
                    <h2>Carrinho de Compras</h2>
                    <div>
                        <p>Itens no carrinho: {contador}</p>
                        <ul className='product-list'>
                            <li className='product-item'>
                                <div className='product-box' >
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s" alt="Esfiha de Carne" className='product-image' />
                                    <div className='product-info'>
                                        <h2>Esfiha de Carne</h2>
                                        <p>R$ 5,00</p>
                                        <button onClick={removerDoCarrinho}>Remover</button>
                                    </div>
                                </div>
                            </li>
                            <li className='product-item'>
                                <div className='product-box' >
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s" alt="Esfiha de Carne" className='product-image' />
                                    <div className='product-info'>
                                        <h2>Esfiha de Carne</h2>
                                        <p>R$ 5,00</p>
                                        <button onClick={() => setContador((contador) => contador - 1)}>Remover</button>
                                    </div>
                                </div>
                            </li>
                            <li className='product-item'>
                                <div className='product-box' >
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s" alt="Esfiha de Carne" className='product-image' />
                                    <div className='product-info'>
                                        <h2>Esfiha de Carne</h2>
                                        <p>R$ 5,00</p>
                                        <button onClick={() => setContador((contador) => contador - 1)}>Remover</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button onClick={() => setPagina(1)}>Voltar</button>    
                </div>
            </section>
        );
    }
    // Aba finalização de pedido
    if(pagina === 3){
        return(
            <section>
                <div className='main'>
                    <h2>Finalizar Pedido</h2>
                    <div><h2>Resumo:</h2></div>
                    <div className='product-content'>
                        <p>Itens no carrinho: {contador}</p>
                        <ul className='product-list'>
                            <li className='product-item'>
                                <div className='product-box' >
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s" alt="Esfiha de Carne" className='product-image' />
                                    <div className='product-info'>
                                        <h2>Esfiha de Carne</h2>
                                        <p>R$ 5,00</p>
                                        <button onClick={() => setContador((contador) => contador - 1)}>Remover</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2>Total: R$ 15,00</h2>
                    </div>
                     <div>
                        <button>Finalizar Pedido</button>
                    </div>
                    <button onClick={() => setPagina(1)}>Voltar</button>    
                </div>
            </section>
        );
    }
}
export default Cliente;