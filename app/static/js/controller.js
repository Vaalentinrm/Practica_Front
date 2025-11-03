// app/static/js/controller.js

const Controller = (function(Model, View){
    
    /**
     * Función principal de inicialización.
     * Se ejecuta cuando el DOM está listo.
     */
    async function init() {
        console.log("Controlador inicializado.");
        
        // 1. Buscamos el contenedor en el HTML
        const productListContainer = document.getElementById('product-list-container');
        
        // 2. Si existe (es decir, estamos en la página de productos)...
        if(productListContainer){
            // 3. Pedimos los datos al Modelo (que llamará a la API)
            const products = await Model.getProducts();
            
            // 4. Le pasamos los datos a la Vista para que "pinte" el HTML
            View.renderProductList(productListContainer, products);
            
            // 5. Añadimos los event listeners
            setupEventListeners(productListContainer);
        }

        // Aquí puedes inicializar otras cosas (ej. popup de cookies)
    }

    /**
     * Configura los manejadores de eventos para la lista de productos
     */
    function setupEventListeners(container) {
        container.addEventListener('click', e => {
            const target = e.target;
            
            // Ejemplo: si hacemos clic en un botón de "eliminar"
            if (target.classList.contains('remove-btn')) {
                // Prevenimos que el link '#' navegue
                e.preventDefault(); 
                
                const card = target.closest('.card');
                const id = card.dataset.productId;
                console.log(`Intentando eliminar producto con ID: ${id}`);
                // Aquí llamarías a Model.removeProductById(id)
                // y luego card.remove() si tiene éxito
            }
        });
    }

    // Inicializa el controlador cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', init);

})(Model, View);