const params = new URLSearchParams(window.location.search);
const produtoId = params.get('id');
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const login = document.getElementById("botao-logar");

const produtos = [
    {
      id: "camisa1",
      nome: "Camisa Básica",
      preco: 49.9,
      descricao: "Camisa de alta qualidade, perfeita para todas as ocasiões.",
      imagem: "https://cdn.awsli.com.br/600x700/751/751979/produto/29909429/camiseta-basica-masculina-preta-algodao-homem-1-nt1r05773k.jpg"
    },
    {
      id: "camisa2",
      nome: "Camisa Estampada",
      preco: 79.9,
      descricao: "Camisa estampada, ideal para eventos casuais.",
      imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98q-lm6cxaj8z11255"
    }
];

function mostrarProduto(produtoId) {
  console.log(produtoId);
    const produto = produtos.find(p => p.id === produtoId);
    console.log()
    if (produto) {
      localStorage.setItem("produtoSelecionado", JSON.stringify(produto));
      window.location.href = "produto.html";
    } else {
      console.error("Produto não encontrado!");
    }
}

function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (produto) {
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
      atualizarCarrinho();
    } else {
      alert("Produto não encontrado.");
    }
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  if (contador) {
    contador.textContent = carrinho.length;
  }
}

function atualizarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  document.getElementById("contador-carrinho").textContent = carrinho.length;
}

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

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(p => p.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarItensCarrinho();
    atualizarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }
    alert("Compra finalizada com sucesso!");
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", atualizarCarrinho);

document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuarioLogado) {
    loginContainer.innerHTML = `
      <span class="text-gray-800">Olá, ${usuarioLogado.nome}</span>
      <button id="botao-logout" class="ml-4 text-red-500 hover:underline">Sair</button>
    `;

    document.getElementById("botao-logout").addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.reload();
    });
  } else {
    const botaoLogin = document.getElementById("botao-login");
    botaoLogin.addEventListener("click", () => {
      document.getElementById("modal-login").classList.remove("hidden");
    });
  }
});

login.addEventListener("click", function(){
  logar();
});

function logar(){
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-senha").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

  if (usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    alert(`Bem-vindo, ${usuario.nome}!`);
    window.location.reload();
  } else {
    alert("Email ou senha inválidos.");
  }
}

document.addEventListener("click", (event) => {
  const modal = document.getElementById("modal-login");
  if (!modal.contains(event.target) && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }
});

document.getElementById("botao-logout").addEventListener("click", () => {
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
});