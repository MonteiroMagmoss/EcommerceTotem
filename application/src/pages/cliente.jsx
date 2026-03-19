import { useState } from 'react'
import { useEffect } from 'react';
import React from 'react';
import './cliente.css';


function Cliente({setUsuario}) {
    const [pagina, setPagina] = useState(0);
    const [contador, setContador] = useState(0);
    const [carrinho, setCarrinho] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Novidades");

    useEffect(() => {
        console.log("Carrinho atualizado:", carrinho);
    }, [carrinho]);

    const listaPaginas = [
        {id: 0, nome: "Inicio"},
        {id: 1, nome: "Home"},
        {id: 2, nome: "Carrinho"},
        {id: 3, nome: "Finalizar Pedido"}
    ];
    const listaProdutos = [
        {id: 1, nome: "Esfiha de Carne", preco: 1.90, categoria: "Esfihas", quantidade: 0, descricao: "Deliciosa esfiha de carne moída temperada com especiarias, perfeita para os amantes de sabores intensos.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y_C29erAmx0VhdwHuoZugr9SAihBIw-Buw&s"},
        {id: 2, nome: "Esfiha de Frango", preco: 5.00, categoria: "Esfihas", quantidade: 0, descricao: "Saboroso pedaço de frango grelhado, recheado com queijo e temperado com especiarias.", imagem: "https://receitadaboa.com.br/wp-content/uploads/2024/07/esfiha-frango.jpg"},
        {id: 3, nome: "Esfiha de Queijo", preco: 2.40, categoria: "Esfihas", quantidade: 0, descricao: "Deliciosa esfiha recheada com queijo derretido e temperada com especiarias.", imagem: "https://img.cdndsgni.com/preview/10136544.jpg"},
        {id: 4, nome: "Esfiha de Calabresa", preco: 3.50, categoria: "Esfihas", quantidade: 0, descricao: "Esfiha saborosa recheada com calabresa e temperada com especiarias.", imagem: "https://www.seara.com.br/wp-content/uploads/2025/09/esfiha-aberta-de-calabresa-portal-minha-receita.webp"},
        {id: 5, nome: "Esfiha de Chocolate", preco: 6.30, categoria: "Esfihas", quantidade: 0, descricao: "Esfiha saborosa recheada com chocolate e temperada com especiarias.", imagem: "https://www.casadaesfihaamericana.com.br/painel/dashboard/uploads/galeria/imagens/imagem_galeria__casa_da_esfiha__0__1472480520__2908162016092200.jpg"},
        {id: 6, nome: "Coca Cola 350ml", preco: 7.50, categoria: "Bebidas", quantidade: 0, descricao: "Refrigerante de cola, perfeito para acompanhar suas refeições.", imagem: "https://http2.mlstatic.com/D_NQ_NP_829445-MLB105502797065_012026-O.webp"},
        {id: 7, nome: "Pepsi Cola 350ml", preco: 7.50, categoria: "Bebidas", quantidade: 0, descricao: "Refrigerante de cola, perfeito para acompanhar suas refeições.", imagem: "https://assets.instabuy.app.br/ib.item.image.large/l-2ed8914eb3a444e79b74e5b836a401fe.jpeg"},
        {id: 8, nome: "Água 500ml", preco: 9.50, categoria: "Bebidas", quantidade: 0, descricao: "Garrafa d'água, perfeito para acompanhar suas refeições.", imagem: "https://drogariamoderna.vtexassets.com/arquivos/ids/251997/agua-crystal-s-gas-15ml_587745.jpg?v=638151218022670000"},
        {id: 9, nome: "Pudim", preco: 7.90, categoria: "Sobremesas", quantidade: 0, descricao: "Delicioso pudim de leite condensado, perfeito para finalizar suas refeições.", imagem: "https://bocadoforno.com.br/wp-content/uploads/2024/11/pudim-de-leite-condensado.webp"},
        {id: 10, nome: "Milkshake", preco: 9.50, categoria: "Sobremesas", quantidade: 0, descricao: "Delicioso milkshake de leite condensado, perfeito para finalizar suas refeições.", imagem: "https://images.metroimg.com/2024/09/12175623/milkshake-1.jpg"},
        {id: 11, nome: "Esfiha de Carne + Coca Cola + Pudim", preco: 12.90, categoria: "Combo", quantidade: 0, descricao: "Combo completo com esfiha de carne, coca cola e pudim.", imagem: "https://www.acumae.com.br/static/team/2019/0320/15512792358899.jpeg"}
    ];
    const listaCategorias = [
        {id: 1, nome: "Novidades"},
        {id: 2, nome: "Esfihas"},
        {id: 3, nome: "Combo"},
        {id: 4, nome: "Bebidas"},
        {id: 5, nome: "Sobremesas"}
    ];
    
    function selecionarCategoria(categoriaNome){
        setCategoriaSelecionada(categoriaNome);
    }

    function adicionarProduto(produtoId){
        setCarrinho((carrinho) => {
            const produto = listaProdutos.find((produto) => produto.id === produtoId);
            if(produto){
                if(carrinho.some((item) => item.id === produtoId)){
                    return carrinho.map((item) => 
                        item.id === produtoId
                             ? {...item, quantidade: item.quantidade + 1}
                                 : item);
                } else {
                    return [...carrinho, {...produto, quantidade: 1}];
                }
            }
        });
    }
    function contarProdutos(){
        return carrinho.reduce((total, produto) => total + produto.quantidade, 0);
    }

    function removerDoCarrinho(produtoId){
        setCarrinho((carrinho) => {
            const produto = carrinho.find((item) => item.id === produtoId);
            if(produto){
                if(produto.quantidade > 1){
                    return carrinho.map((item) => 
                        item.id === produtoId
                             ? {...item, quantidade: item.quantidade - 1}
                                 : item);
                } else {
                    return carrinho.filter((item) => item.id !== produtoId);
                }
            }
        });
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
                    <button onClick={() => setPagina(1)} className='btn-inicio'>
                        <img className='img-inicio' src="https://blog.biglar.com.br/wp-content/uploads/2022/10/iStock-537521984-1.jpeg" alt="img-Início" />
                    </button>
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
                            <li className='category-item'><button onClick={() => selecionarCategoria("Novidades")}>Novidades</button></li>
                            <li className='category-item'><button onClick={() => selecionarCategoria("Esfihas")}>Esfihas</button></li>
                            <li className='category-item'><button onClick={() => selecionarCategoria("Combo")}>Combo</button></li>
                            <li className='category-item'><button onClick={() => selecionarCategoria("Bebidas")}>Bebidas</button></li>
                            <li className='category-item'><button onClick={() => selecionarCategoria("Sobremesas")}>Sobremesas</button></li>
                        </ul>
                    </div>
                    <div className='product-content'>
                        <h2>Produtos em Destaque</h2>
                        {categoriaSelecionada === "Novidades" && (
                            <ul className='product-list'>
                                {listaProdutos.map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className='product-box' >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <h3>R$ {produto.preco.toFixed(2)}</h3>
                                                <p>{produto.descricao}</p>
                                                <div className='buttons-count'>
                                                    <button className='add-button' onClick={() => adicionarProduto(produto.id)}>Adicionar ao Carrinho</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {categoriaSelecionada === "Esfihas" && (
                            <ul className='product-list'>
                                {listaProdutos.filter((produto) => produto.categoria === "Esfihas").map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className='product-box' >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button className='add-button' onClick={() => adicionarProduto(produto.id)}>Adicionar ao Carrinho</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {categoriaSelecionada === "Bebidas" && (
                            <ul className='product-list'>
                                {listaProdutos.filter((produto) => produto.categoria === "Bebidas").map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className='product-box' >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button className='add-button' onClick={() => adicionarProduto(produto.id)}>Adicionar ao Carrinho</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {categoriaSelecionada === "Sobremesas" && (
                            <ul className='product-list'>
                                {listaProdutos.filter((produto) => produto.categoria === "Sobremesas").map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className='product-box' >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button className='add-button' onClick={() => adicionarProduto(produto.id)}>Adicionar ao Carrinho</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        {categoriaSelecionada === "Combo" && (
                            <ul className='product-list'>
                                {listaProdutos.filter((produto) => produto.categoria === "Combo").map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className='product-box' >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button className='add-button' onClick={() => adicionarProduto(produto.id)}>Adicionar ao Carrinho</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    </div>
                </div>
                <footer>
                    <div className='carrinho-box'><button className='' onClick={() => setPagina(2)}>Carrinho</button></div>
                    <p>Itens no carrinho: {contarProdutos()}</p>
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
                        <p>Itens no carrinho: {contarProdutos()}</p>
                        <ul className='product-list'>
                            {carrinho.map((produto) => (
                                <li className='product-item' key={produto.id}>
                                    <div className='product-box' >
                                        <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                        <div className='product-info'>
                                            <h2>{produto.nome}</h2>
                                            <p>Quantidade: {produto.quantidade}</p>
                                            <h2>R$ {(produto.preco * produto.quantidade).toFixed(2)}</h2>
                                            <div className='buttons-count'>
                                                <div><button onClick={() => adicionarProduto(produto.id)}>+</button></div>
                                                <div><button onClick={() => removerDoCarrinho(produto.id)}>-</button></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
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
                        <p>Itens no carrinho: {contarProdutos()}</p>
                        <ul className='product-list'>
                            {carrinho.map((produto) => (
                                <li className='product-item' key={produto.id}>
                                    <div className='product-box' >
                                        <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                        <div className='product-info'>
                                            <h2>{produto.nome}</h2>
                                            <p>Quantidade: {produto.quantidade}</p>
                                            <h2>R$ {(produto.preco * produto.quantidade).toFixed(2)}</h2>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Total: R$ {carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0).toFixed(2)}</h2>
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