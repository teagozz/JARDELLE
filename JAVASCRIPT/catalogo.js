const produtos = [
    {
        id: 1,
        nome: "Colar Dourado Elegance",
        descricao: "Semijoia banhada a ouro 18k.",
        preco: 149.90,
        imagem: "./IMG/colar-elegance.jpg"
    },
    {
        id: 2,
        nome: "Brinco Pérola Clássico",
        descricao: "Design sofisticado para qualquer ocasião.",
        preco: 89.90,
        imagem: "./IMG/brinco-perola.jpg"
    },
    {
        id: 3,
        nome: "Pulseira Crystal",
        descricao: "Acabamento refinado e brilho intenso.",
        preco: 119.90,
        imagem: "./IMG/pulseira-crystal.jpg"
    },
    {
        id: 4,
        nome: "Anel Shine",
        descricao: "Delicadeza e elegância em cada detalhe.",
        preco: 99.90,
        imagem: "./IMG/anel-shine.jpg"
    }
];

function renderizarProdutos() {
    const container = document.getElementById("products-container");

    if (!container) return;

    container.innerHTML = "";

    produtos.forEach(produto => {
        const slide = document.createElement("div");

        slide.className = "swiper-slide";

        slide.innerHTML = `
            <article class="product-card">

                <div class="product-image-container">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        class="product-image">

                </div>

                <div class="product-info">

                    <h3 class="product-name">

                        ${produto.nome}

                    </h3>

                    <p class="product-description">

                        ${produto.descricao}

                    </p>

                    <p class="product-price">

                        R$ ${produto.preco.toFixed(2).replace(".", ",")}

                    </p>

                    <div class="product-actions">

                        <button
                            class="btn-add-cart"
                            data-id="${produto.id}">

                            Adicionar ao Carrinho

                        </button>

                        <a
                            href="https://wa.me/553398528315?text=${encodeURIComponent(
                                `Olá! Gostaria de mais informações sobre "${produto.nome}".`
                            )}"
                            target="_blank"
                            class="btn-whatsapp">

                            <i class="fa-brands fa-whatsapp"></i>

                            Consultar Informações

                        </a>

                    </div>

                </div>

            </article>
        `;

        container.appendChild(slide);
    });

    inicializarSwiper();

    adicionarEventosCarrinho();
}

function inicializarSwiper() {
    new Swiper(".products-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: produtos.length > 3,

        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        breakpoints: {
            640: {
                slidesPerView: 2
            },

            1024: {
                slidesPerView: 3
            }
        }
    });
}

document.addEventListener(
    "DOMContentLoaded",
    renderizarProdutos
);
