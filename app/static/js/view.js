// app/static/js/view.js

const View = (function(){
    
    /**
     * Crea la tarjeta HTML para un solo producto.
     * @param {object} product - El objeto producto (viene de la API)
     */
    function createProductCard(product){
        const card = document.createElement('div');
        card.className = "card";
        card.dataset.productId = product.id; // Guardamos el ID en el HTML
        
        const imageUrl = product.image_path; 
        
        // AÑADIDO: Botón de borrado
        card.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}" style="width:100%; height:140px; object-fit:contain; background:#fafafa; border-radius:8px;">
            <h4>${product.name}</h4>
            <p><strong>${Model.formatPrice(product.price)}</strong></p>
            <div class="card-actions">
                <button class="delete-btn" title="Eliminar producto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 3.25A2.25 2.25 0 0 1 7.25 1h1.5A2.25 2.25 0 0 1 11 3.25V5h-6v-.75ZM11 6V3.25A.75.75 0 0 0 10.25 2.5h-1.5A.75.75 0 0 0 8 3.25V6H4.75a.75.75 0 0 0 0 1.5h.56l.66 6.6a.75.75 0 0 0 .74.65h3.58a.75.75 0 0 0 .74-.65l.66-6.6h.56a.75.75 0 0 0 0-1.5H11Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
            `;
        return card;
    }

    /**
     * NUEVO: Crea una tarjeta "esqueleto" de carga.
     */
    function createSkeletonCard() {
        const card = document.createElement('div');
        card.className = "skeleton-card";
        card.innerHTML = `
            <div class="img"></div>
            <div class="line"></div>
            <div class="line-short"></div>
        `;
        return card;
    }

    /**
     * Renderiza la lista completa de productos en el contenedor.
     * @param {HTMLElement} container - El div (product-list-container)
     * @param {Array<object>} products - La lista de productos
     */
    function renderProductList(container, products){
        container.innerHTML = ''; // Limpiamos esqueletos o mensajes
        
        if(products.length === 0){
            container.innerHTML = '<p>No hay productos disponibles. <a href="/nuevo">Crea el primero</a>.</p>';
            return;
        }

        products.forEach(p => {
            container.appendChild(createProductCard(p));
        });
    }

    /**
     * NUEVO: Renderiza el estado de carga con esqueletos.
     */
    function renderLoading(container) {
        container.innerHTML = ''; // Limpiamos
        // Muestra 4 esqueletos
        for (let i = 0; i < 4; i++) {
            container.appendChild(createSkeletonCard());
        }
    }

    /**
     * NUEVO: Renderiza un estado de error.
     */
    function renderError(container, message) {
        container.innerHTML = `<p class="form-message error" style="display:block;">${message}</p>`;
    }
    
    /**
     * NUEVO: Elimina una tarjeta del DOM.
     */
    function removeCard(productId) {
        const card = document.querySelector(`.card[data-product-id="${productId}"]`);
        if (card) {
            card.remove();
        }
    }

    /**
     * NUEVO: Muestra un mensaje en el formulario (para AJAX).
     */
    function showFormMessage(message, type = 'success') {
        const container = document.getElementById('form-message-container');
        container.innerHTML = `<div class="form-message ${type}">${message}</div>`;
    }
    
    /**
     * NUEVO: Limpia los mensajes del formulario.
     */
    function clearFormMessage() {
        const container = document.getElementById('form-message-container');
        container.innerHTML = '';
    }

    // Exponemos las funciones
    return { 
        renderProductList,
        renderLoading, // NUEVO
        renderError,   // NUEVO
        removeCard,    // NUEVO
        showFormMessage, // NUEVO
        clearFormMessage // NUEVO
    };
})();