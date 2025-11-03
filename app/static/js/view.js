// view.js - funciones que manipulan el DOM
const View = (function(){
    function createProductCard(product){
        const card = document.createElement('div');
        card.className = "card mb-3 shadow-sm col-12 col-sm-6 col-md-4 product-card";
        card.dataset.productId = product.id;
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text fw-bold">${Model.formatPrice(product.price)}</p>
                <button class="btn btn-success toggle-details">Ver detalles</button>
                <div class="details mt-2 d-none">
                    <p>${product.description}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <button class="btn btn-outline-danger btn-sm remove-btn">Eliminar producto</button>
                </div>
            </div>
        `;
        return card;
    }

    function renderProductList(container, products){
        container.innerHTML = '';
        products.forEach(p => container.appendChild(createProductCard(p)));
    }

    return { renderProductList };
})();