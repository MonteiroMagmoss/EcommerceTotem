import { useState } from 'react'
import { useEffect } from 'react';
import './cliente.css';


function Cliente({setUsuario, produtos = [], pedidos, setPedidos} ) {
    const [pagina, setPagina] = useState(0);
    const [carrinho, setCarrinho] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Novidades");

    const produtosFiltrados = produtos.filter((produto) => {
        if(categoriaSelecionada === "Novidades"){
            return true;
        }
        return produto.categoria === categoriaSelecionada;
    });
    useEffect(() => {
        console.log("Carrinho atualizado:", carrinho);
    }, [carrinho]);

    function selecionarCategoria(categoriaNome){
        setCategoriaSelecionada(categoriaNome);
    }

    function adicionarProduto(produtoId){
        setCarrinho((carrinho) => {
            const produto = produtos.find((produto) => produto.id === produtoId);
            if(!produto) return carrinho;

            if(carrinho.some((item) => item.id === produtoId)){
                return carrinho.map((item) => 
                    item.id === produtoId
                        ? {...item, quantidade: item.quantidade + 1}
                            : item);
            } else {
                return [...carrinho, {...produto, quantidade: 1}];
            }
        });
    }
    function contarProdutos(){
        return carrinho.reduce((total, produto) => total + produto.quantidade, 0);
    }

    function removerDoCarrinho(produtoId){
        setCarrinho((carrinho) => {
            const produto = carrinho.find((item) => item.id === produtoId);
            if(!produto) return carrinho;
            if(produto.quantidade > 1){
                return carrinho.map((item) => 
                    item.id === produtoId
                        ? {...item, quantidade: item.quantidade - 1}
                            : item);
            } else {
                    return carrinho.filter((item) => item.id !== produtoId);
            }
        });
    }
    function limparProdutoDoCarrinho(produtoId){
        setCarrinho((carrinho) => {
            const produto = carrinho.find((item) => item.id === produtoId);
            if(produto){
                return carrinho.filter((item) => item.id !== produtoId);
            } else {
                return carrinho;
            }
        })
    };
    
    function finalizarPedido(){
        if(carrinho.length === 0){
            alert("O carrinho está vazio!");
            return;
        }
        const novoPedido ={
        id: Date.now(),
        dataHora: new Date().toLocaleString("pt-BR"),
        itens: carrinho.map((produto) => ({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade
        })),
        total: carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0),
        quantidadeTotal: contarProdutos(),
        };
        setPedidos((prevPedidos) => [...prevPedidos, novoPedido])

        alert("Pedido finalizado com sucesso!");
        setCarrinho([]);
        setPagina(0);
    }

    function cancelarPedido(){
        setCarrinho([]);
        setPagina(0);
    }
    // Aba início
    if(pagina === 0){
        return(
            <section>
                <div className='main'>
                    <h2>Bem Vindo ao Las Esfihas</h2>
                    <p>Explore nosso cardápio e aproveite nossas ofertas especiais! Clique na imagem para começar o pedido!</p>
                    <button onClick={() => setPagina(1)} className='btn-inicio'>
                        <img className='img-inicio' src="https://blog.biglar.com.br/wp-content/uploads/2022/10/iStock-537521984-1.jpeg" alt="img-Início" />
                    </button>
                    <button onClick={() => setUsuario(null)} className='cliente-button'>Sair</button>
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
                                {produtosFiltrados.map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className={`product-box ${!produto.disponivel ? "opacity-60" : ""}`} >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <h3>R$ {produto.preco.toFixed(2)}</h3>
                                                <p>{produto.descricao}</p>
                                                <div className='buttons-count'>
                                                    <button disabled={!produto.disponivel} className={`add-button ${!produto.disponivel ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => adicionarProduto(produto.id)}>{produto.disponivel ? "Adicionar ao Carrinho" : "Indisponível"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {categoriaSelecionada === "Esfihas" && (
                            <ul className='product-list'>
                                {produtosFiltrados.map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className={`product-box ${!produto.disponivel ? "opacity-60" : ""}`} >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button disabled={!produto.disponivel} className={`add-button ${!produto.disponivel ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => adicionarProduto(produto.id)}>{produto.disponivel ? "Adicionar ao Carrinho" : "Indisponível"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {categoriaSelecionada === "Bebidas" && (
                            <ul className='product-list'>
                                {produtosFiltrados.map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className={`product-box ${!produto.disponivel ? "opacity-60" : ""}`} >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button disabled={!produto.disponivel} className={`add-button ${!produto.disponivel ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => adicionarProduto(produto.id)}>{produto.disponivel ? "Adicionar ao Carrinho" : "Indisponível"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {categoriaSelecionada === "Sobremesas" && (
                            <ul className='product-list'>
                                {produtosFiltrados.map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className={`product-box ${!produto.disponivel ? "opacity-60" : ""}`} >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button disabled={!produto.disponivel} className={`add-button ${!produto.disponivel ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => adicionarProduto(produto.id)}>{produto.disponivel ? "Adicionar ao Carrinho" : "Indisponível"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        
                        {categoriaSelecionada === "Combo" && (
                            <ul className='product-list'>
                                {produtosFiltrados.map((produto) => (
                                    <li className='product-item' key={produto.id}>
                                        <div className={`product-box ${!produto.disponivel ? "opacity-60" : ""}`} >
                                            <img src={produto.imagem} alt={produto.nome} className='product-image' />
                                            <div className='product-info'>
                                                <h2>{produto.nome}</h2>
                                                <p>{produto.descricao}</p>
                                                <h2>R$ {produto.preco.toFixed(2)}</h2>
                                                <div className='buttons-count'>
                                                    <button disabled={!produto.disponivel} className={`add-button ${!produto.disponivel ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => adicionarProduto(produto.id)}>{produto.disponivel ? "Adicionar ao Carrinho" : "Indisponível"}</button>
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
                <footer className='footer'>
                    <div className='carrinho-box'><button className='cliente-button' onClick={() => setPagina(2)}>Carrinho</button></div>
                    <p>Itens no carrinho: {contarProdutos()}</p>
                    <div className='buttons-container'>
                        <div><button className='cliente-button' onClick={cancelarPedido}>Cancelar</button></div>
                        <div><button className='cliente-button' onClick={() => setPagina(3)}>Avançar</button></div>
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
                                                <div><button className='cliente-button' onClick={() => adicionarProduto(produto.id)}>+</button></div>
                                                <div><button className='cliente-button' onClick={() => removerDoCarrinho(produto.id)}>-</button></div>
                                            </div>
                                        </div>
                                        <div className='remove-area'>
                                            <button className='remove-button' onClick={() => limparProdutoDoCarrinho(produto.id)}>X</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='buttons-container'>
                        <button className='cliente-button' onClick={() => setPagina(1)}>Voltar</button>  
                    </div>  
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
                    <div className='product-content'>
                    <div><h2>Resumo: <p>Itens no carrinho: {contarProdutos()}</p> </h2></div>
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
                        <h2 className='text-price'>Total: R$ {carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0).toFixed(2)}</h2>
                    </div>
                    <div className='buttons-container'>
                        <div><button className='cliente-button' onClick={() => setPagina(1)}>Voltar</button></div>    
                        <div><button className='cliente-button' onClick={finalizarPedido}>Finalizar Pedido</button></div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Cliente;