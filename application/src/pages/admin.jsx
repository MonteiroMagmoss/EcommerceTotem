import { useState } from "react";
import { useEffect } from "react";

function Admin({produtos, setProdutos, pedidos, listaUsuarios}) {
    const [currentTime, setCurrentTime] = useState("");
    const [pagina, setPagina] = useState(0);
    const paginas = [
        { id: 1, nome: "Configurações" },
        { id: 2, nome: "Produtos" },
        { id: 3, nome: "Relatórios" }
    ];

    useEffect(() => {
        function updateClock(){
            const date = new Date();

            const data = date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const time = `${hours}:${minutes}`;
            setCurrentTime(`${data} - ${time}`);
        }
        updateClock();
        const intervalId = setInterval(updateClock, 1000);
        return () => clearInterval(intervalId);
    }, []);

    function mudarDisponibilidade(produtoId){
        setProdutos((prev) => 
            prev.map((produto) => 
                produto.id === produtoId 
                    ? {...produto, disponivel: !produto.disponivel} 
                    : produto
            )
        );
    }
    function adicionarProduto(){
        const novoProduto = {
            id: produtos.length + 1,
            nome: "Novo Produto",
            preco: 0,
            categoria: "Novidades",
            quantidade: 0,
            disponivel: true,
            descricao: "Descrição do novo produto",
            imagem: "https://via.placeholder.com/150"
        };
        setProdutos((prev) => [...prev, novoProduto]);

    }
    function removerProduto(produtoId){
        setProdutos((prev) => prev.filter((produto) => produto.id !== produtoId));
    }

    function localizarPagina(paginaId){
        const paginaAtual = paginas.find(p => p.id === paginaId);
        return paginaAtual ? paginaAtual.nome : "";
    }

    return(
        <div className="admin-container">
            <div className="grid grid-cols-1 gap-4 bg-gray-100 p-4 sm:grid-cols-3">
                <button className="w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-md transition" onClick={() => setPagina(1)}>Configurações</button>
                <button className="w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-md transition" onClick={() => setPagina(2)}>Produtos</button>
                <button className="w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-md transition" onClick={() => setPagina(3)}>Relatórios</button>
            </div>
            <h1 className="text-2xl text-primary! font-bold mb-4">{pagina === 0 ? "Administração" : localizarPagina(pagina)}</h1>
            <p className="mb-4">Hora atual: {currentTime}</p>
                {pagina === 0 && (
                    <div>
                        <h2 className="text-primary! text-xl font-semibold mb-2">Bem-vindo à área de administração!</h2>
                    </div>
                )}
                {pagina === 1 && (
                    <>
                        <div>
                            <p>Aqui você pode configurar as opções do sistema.</p>
                        </div>
                        <div className="h-full w-screen grid place-items-center">
                            <h2 className="w-full bg-secondary text-white py-4 rounded-md transition mt-2">Gerenciamento de Usuários</h2>
                            <div className="h-100 w-3/4 overflow-y-auto border p-2 grid place-items-center">
                                <table className="h-50 w-full border-2 mt-4 text-primary ">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border-2 p-5">ID</th>
                                        <th className="border-2 p-5">Email</th>
                                        <th className="border-2 p-5">Cargo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaUsuarios.map(u => (
                                        <tr key={u.id} className="border-t">
                                            <td className="border-2 p-5">{u.id}</td>
                                            <td className="border-2 p-5">{u.email}</td>
                                            <td className="border-2 p-5">{u.cargo.toUpperCase()}</td>
                                        </tr>
                                    ))}
                                    <tr className="border-t">
                                        <td className="border-2 p-10" colSpan="3"><button className="w-full bg-primary hover:bg-primary/80 text-white py-2 p-5 rounded-md transition">Adicionar Usuário</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </>
                )}
                {pagina === 2 && (
                    <>
                        <div>
                            <p>Aqui você pode gerenciar os produtos disponíveis.</p>
                        </div>
                        <div className="h-screen w-screen grid place-items-center">
                            <button className="w-full bg-primary hover:bg-primary/80 text-white py-4 rounded-md transition" onClick={adicionarProduto}>Adicionar Produto</button>
                            <div className="h-screen w-3/4 overflow-y-auto border p-2 grid place-items-center">
                                {produtos.map(produto => (
                                    <div key={produto.id} className="w-full border p-4 rounded-md mb-4">
                                        <h2 className="text-primary text-lg md:text-2xl lg:text-3xl font-semibold">{produto.nome}</h2>
                                        <p className="text-sm md:text-base lg:text-lg">Preço: R$ {produto.preco.toFixed(2)}</p>
                                        <p className="text-sm md:text-base lg:text-lg">Categoria: {produto.categoria}</p>
                                        <p className="text-sm md:text-base lg:text-lg">Quantidade: {produto.quantidade}</p>
                                        <p className="text-sm md:text-base lg:text-lg">Disponível: {produto.disponivel ? "Sim" : "Não"}</p>
                                        <p className="text-sm md:text-base lg:text-lg">Descrição: {produto.descricao}</p>
                                        <div className="flex mt-2">
                                            <button className="w-full p-4 bg-primary hover:bg-primary/80 text-white py-4 px-4 rounded-md transition mr-2" onClick={() => mudarDisponibilidade(produto.id)}>
                                                {produto.disponivel ? "Desativar" : "Ativar"}
                                            </button>
                                            <button className="w-full p-4 bg-red-500 hover:bg-red-600 text-white py-4 px-4 rounded-md transition" onClick={() => removerProduto(produto.id)}>
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </>
                )}
                {pagina === 3 && (
                    <>
                        <div>
                            <p>Aqui você pode visualizar os relatórios de vendas e desempenho.</p>
                        </div>
                        <h2>Total de Pedidos: {pedidos.length}</h2>
                        <h2>
                            Faturamento Total: R${" "}
                            {pedidos.reduce((total, pedidos) => total + pedidos.total, 0).toFixed(2)}
                        </h2>
                        <h2>Pedidos Recentes:</h2>
                        {pedidos.map((pedidos) => (
                            <div key={pedidos.id} className="border p-4 rounded-md mb-4">
                                <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-primary">Pedido #{pedidos.id}</h3>
                                <p className="text-sm md:text-base lg:text-lg">Data: {pedidos.dataHora}</p>
                                <p className="text-sm md:text-base lg:text-lg">Quantidade: {pedidos.quantidadeTotal}</p>
                                <p className="text-sm md:text-base lg:text-lg">Total: R$ {pedidos.total.toFixed(2)}</p>

                                <ul>
                                    {pedidos.itens.map((item) => (
                                        <li key={item.id} className="text-sm text-primary">
                                            {item.nome} - Quantidade: {item.quantidade} - Preço: R$ {(item.preco * item.quantidade).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </>
                )}
        </div>
    );
}

export default Admin;