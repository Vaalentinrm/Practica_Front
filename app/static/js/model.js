// app/static/js/model.js

const Model = (function(){
    
    /**
     * Pide los productos a nuestra API del backend.
     */
    async function getProducts() {
        // La API es '/api/productos' definida en main.py
        const response = await fetch('/api/productos');
        if (!response.ok) {
            // Lanza un error para que el Controller lo capture
            throw new Error(`Error ${response.status}: No se pudieron cargar los productos.`);
        }
        const products = await response.json();
        return products;
    }

    /**
     * NUEVO: Envía datos de un nuevo producto a la API.
     * @param {FormData} formData - Los datos del formulario.
     */
    async function createProduct(formData) {
        const response = await fetch('/api/productos', {
            method: 'POST',
            body: formData
            // No 'Content-Type', 'FormData' lo gestiona automáticamente
        });
        
        const data = await response.json();
        
        if (!response.ok) { // 400, 500, etc.
            // Pasa los errores de validación de WTForms al controller
            throw new Error(data.errors ? JSON.stringify(data.errors) : 'Error del servidor');
        }
        
        return data; // Devuelve el producto recién creado
    }

    /**
     * NUEVO: Pide a la API que borre un producto.
     * @param {number} id - El ID del producto a borrar.
     */
    async function deleteProduct(id) {
        const response = await fetch(`/api/producto/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto.');
        }
        
        return await response.json(); // Devuelve {success: true}
    }

    /**
     * Función de utilidad para formatear precios
     */
    const formatPrice = price => `€${price.toFixed(2)}`;

    // Exponemos las funciones
    return { 
        getProducts,
        createProduct, // NUEVO
        deleteProduct, // NUEVO
        formatPrice
    };
})()