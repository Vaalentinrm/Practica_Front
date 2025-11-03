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
        
        // 'product.image_path' es la URL que construimos en 'to_dict()'
        const imageUrl = product.image_path; 
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}" style="width:100%; height:140px; object-fit:contain; background:#fafafa; border-radius:8px;">
            <h4>${product.name}</h4>
            <p><strong>${Model.formatPrice(product.price)}</strong></p>
            
            `;
        return card;
    }

    /**
     * Renderiza la lista completa de productos en el contenedor.
     * @param {HTMLElement} container - El div (product-list-container)
     * @param {Array<object>} products - La lista de productos
     */
    function renderProductList(container, products){
        // 1. Limpiamos el mensaje "Cargando..."
        container.innerHTML = '';
        
        // 2. Si no hay productos, mostramos un mensaje
        if(products.length === 0){
            container.innerHTML = '<p>No hay productos disponibles. <a href="/nuevo">Crea el primero</a>.</p>';
            return;
        }

        // 3. Creamos y añadimos cada tarjeta
        products.forEach(p => {
            container.appendChild(createProductCard(p));
        });
    }

    // Exponemos la función que el Controlador necesita
    return { 
        renderProductList 
    };
})();