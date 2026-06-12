function obterCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById("cart-count");

    if (!contador) return;

    const carrinho = obterCarrinho();

    const quantidadeTotal = carrinho.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    contador.textContent = quantidadeTotal;
}

function adicionarAoCarrinho(id) {
    const carrinho = obterCarrinho();

    const produtoSelecionado = produtos.find(
        produto => produto.id === id
    );

    if (!produtoSelecionado) return;

    const itemExistente = carrinho.find(
        item => item.id === id
    );

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: produtoSelecionado.id,
            nome: produtoSelecionado.nome,
            preco: produtoSelecionado.preco,
            imagem: produtoSelecionado.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);

    atualizarContadorCarrinho();

    alert(
        `${produtoSelecionado.nome} foi adicionado ao carrinho.`
    );
}

function adicionarEventosCarrinho() {
    const botoesAdicionar = document.querySelectorAll(
        ".btn-add-cart"
    );

    botoesAdicionar.forEach(botao => {
        botao.addEventListener(
            "click",
            () => {
                const id = Number(
                    botao.dataset.id
                );

                adicionarAoCarrinho(id);
            }
        );
    });
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        atualizarContadorCarrinho();
    }
);
