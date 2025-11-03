// app/static/js/model.js

const Model = (function(){
    
    /**
     * Pide los productos a nuestra API del backend.
     * Es una función 'async' porque 'fetch' tarda un tiempo.
     */
    async function getProducts() {
        try {
            // Llama a la nueva ruta de API que creamos
            const response = await fetch('/api/productos');
            if (!response.ok) {
                // Si el servidor responde con un error (ej. 404, 500)
                throw new Error(`Error ${response.status}: No se pudieron cargar los productos.`);
            }
            const products = await response.json();
            return products;
        } catch (error) {
            console.error("Error en Model.getProducts:", error);
            // Devolvemos un array vacío para que la UI no se rompa
            return [];
        }
    }

    /**
     * Función de utilidad para formatear precios
     */
    const formatPrice = price => `€${price.toFixed(2)}`;

    // Exponemos las funciones que el Controlador puede usar
    return { 
        getProducts, 
        formatPrice
        // (Aquí irían removeProductById, etc., si implementamos el DELETE)
    };
})();