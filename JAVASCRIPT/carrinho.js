const WHATSAPP_NUMBER = "553398528315";

function obterCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function atualizarResumo() {
  const carrinho = obterCarrinho();

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0,
  );

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0,
  );

  document.getElementById("cart-items-count").textContent = quantidadeTotal;

  document.getElementById("cart-total-quantity").textContent = quantidadeTotal;

  document.getElementById("cart-total-price").textContent =
    formatarPreco(valorTotal);
}

function renderizarCarrinho() {
  const container = document.getElementById("cart-items-container");

  const carrinho = obterCarrinho();

  if (!container) return;

  if (carrinho.length === 0) {
    container.innerHTML = `
            <div class="empty-cart">
                <h2>Seu carrinho está vazio</h2>

                <p>
                    Adicione algumas semijoias para continuar.
                </p>

                <a href="./index.html">
                    Continuar Comprando
                </a>
            </div>
        `;

    atualizarResumo();

    return;
  }

  container.innerHTML = "";

  carrinho.forEach((item) => {
    const produto = document.createElement("article");

    produto.className = "cart-item";

    produto.innerHTML = `
            <img
                src="${item.imagem}"
                alt="${item.nome}"
                class="cart-item-image">

            <div class="cart-item-info">

                <h3 class="cart-item-title">
                    ${item.nome}
                </h3>

                <p class="cart-item-price">
                    ${formatarPreco(item.preco)}
                </p>

                <div class="cart-item-controls">

                    <button
                        class="quantity-btn"
                        onclick="alterarQuantidade(${item.id}, -1)">

                        -
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        class="quantity-btn"
                        onclick="alterarQuantidade(${item.id}, 1)">

                        +
                    </button>

                    <button
                        class="remove-item-btn"
                        onclick="removerItem(${item.id})">

                        Remover
                    </button>

                </div>

            </div>
        `;

    container.appendChild(produto);
  });

  atualizarResumo();
}

function alterarQuantidade(id, alteracao) {
  const carrinho = obterCarrinho();

  const item = carrinho.find((produto) => produto.id === id);

  if (!item) return;

  item.quantidade += alteracao;

  if (item.quantidade <= 0) {
    removerItem(id);
    return;
  }

  salvarCarrinho(carrinho);

  renderizarCarrinho();
}

function removerItem(id) {
  let carrinho = obterCarrinho();

  carrinho = carrinho.filter((produto) => produto.id !== id);

  salvarCarrinho(carrinho);

  renderizarCarrinho();
}

function limparCarrinho() {
  const confirmar = confirm("Deseja realmente limpar o carrinho?");

  if (!confirmar) return;

  localStorage.removeItem("carrinho");

  renderizarCarrinho();
}

function finalizarPedido() {
  const carrinho = obterCarrinho();

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");

    return;
  }

  let mensagem = "✨ *Novo Pedido - JARDELLE* ✨\n\n";

  carrinho.forEach((item) => {
    const subtotal = item.preco * item.quantidade;

    mensagem +=
      `• ${item.nome}\n` +
      `Quantidade: ${item.quantidade}\n` +
      `Valor unitário: ${formatarPreco(item.preco)}\n` +
      `Subtotal: ${formatarPreco(subtotal)}\n\n`;
  });

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0,
  );

  mensagem += `💎 *Total do Pedido:* ${formatarPreco(total)}\n\n`;

  mensagem += "Olá! Gostaria de finalizar este pedido.";

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    mensagem,
  )}`;

  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrinho();

  document
    .getElementById("checkout-whatsapp")
    ?.addEventListener("click", finalizarPedido);

  document
    .getElementById("clear-cart")
    ?.addEventListener("click", limparCarrinho);
});
