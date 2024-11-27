const params = new URLSearchParams(window.location.search);
const produtoId = params.get('id');
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const produtos = [
    {
      id: "camisa1",
      nome: "Camisa Básica",
      preco: 49.9,
      descricao: "Camisa de alta qualidade, perfeita para todas as ocasiões.",
      imagem: "camisa1.jpg"
    },
    {
      id: "camisa2",
      nome: "Camisa Estampada",
      preco: 79.9,
      descricao: "Camisa estampada, ideal para eventos casuais.",
      imagem: "camisa2.jpg"
    }
];

// Função para mostrar o produto e redirecionar para a página de detalhes
function mostrarProduto(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (produto) {
      localStorage.setItem("produtoSelecionado", JSON.stringify(produto)); // Salvar no localStorage
      window.location.href = "produto.html"; // Redirecionar para a página de detalhes
    } else {
      console.error("Produto não encontrado!");
    }
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (produto) {
      carrinho.push(produto); // Adicionar o produto ao array
      localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Salvar no localStorage
      alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
      atualizarCarrinho(); // Atualizar o contador do carrinho
    } else {
      alert("Produto não encontrado.");
    }
}

// Função para atualizar o contador do carrinho
function atualizarCarrinho() {
    const contador = document.getElementById("contador-carrinho");
    if (contador) {
      contador.textContent = carrinho.length;
    }
}

// Função para carregar os itens do carrinho na página do carrinho
function carregarItensCarrinho() {
    const listaCarrinho = document.getElementById("lista-carrinho");
    
    if (carrinho.length === 0) {
      listaCarrinho.innerHTML = "<p class='text-gray-600'>O carrinho está vazio.</p>";
    } else {
      listaCarrinho.innerHTML = carrinho.map(produto => `
        <div class="flex justify-between items-center border-b py-2">
          <img src="${produto.imagem}" alt="${produto.nome}" class="w-12 h-12 object-cover rounded-md">
          <span>${produto.nome}</span>
          <span class="text-gray-600">R$ ${produto.preco.toFixed(2)}</span>
          <button onclick="removerDoCarrinho('${produto.id}')" class="text-red-500 hover:text-red-700">Remover</button>
        </div>
      `).join('');
    }
}

// Função para remover um item do carrinho
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(p => p.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(carrinho)); // Atualizar no localStorage
    carregarItensCarrinho(); // Recarregar a lista
    atualizarCarrinho(); // Atualizar o contador
}

// Função para finalizar a compra
function finalizarCompra() {
    if (carrinho.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }
    alert("Compra finalizada com sucesso!");
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Limpar o carrinho no localStorage
    window.location.href = "index.html"; // Voltar para a página inicial
}

// Atualizar o contador do carrinho quando a página carregar
document.addEventListener("DOMContentLoaded", atualizarCarrinho);
