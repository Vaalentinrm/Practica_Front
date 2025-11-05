// app/static/js/controller.js

const Controller = (function(Model, View){
    
    /**
     * Función principal de inicialización.
     */
    function init() {
        console.log("Controlador profesional inicializado.");
        
        // 1. Configurar el modo oscuro en todas las páginas
        setupThemeSwitcher();
        
        // 2. Lógica de la página de "Productos"
        const productListContainer = document.getElementById('product-list-container');
        if(productListContainer){
            loadProducts(productListContainer);
            setupProductEventListeners(productListContainer);
        }

        // 3. Lógica de la página "Nuevo"
        const newProductForm = document.getElementById('form-nuevo-producto');
        if (newProductForm) {
            setupNewProductForm(newProductForm);
        }
    }

    /**
     * NUEVO: Carga los productos con estado de carga
     */
    async function loadProducts(container) {
        // 1. Mostrar estado de carga "esqueleto"
        View.renderLoading(container);
        
        try {
            // 2. Simular un retraso para ver el esqueleto (opcional, pero bueno para demo)
            await new Promise(res => setTimeout(res, 500)); 
            
            // 3. Pedir datos al Modelo
            const products = await Model.getProducts();
            
            // 4. Pintar los datos reales
            View.renderProductList(container, products);
            
        } catch (error) {
            console.error("Error en loadProducts:", error);
            // 5. Mostrar error si la API falla
            View.renderError(container, error.message);
        }
    }

    /**
     * Configura los manejadores de eventos para la lista de productos
     */
    function setupProductEventListeners(container) {
        container.addEventListener('click', async (e) => {
            const target = e.target;
            
            // NUEVO: Lógica de borrado
            if (target.classList.contains('delete-btn')) {
                e.preventDefault(); 
                
                const card = target.closest('.card');
                const id = card.dataset.productId;
                
                if (confirm(`¿Seguro que quieres eliminar el producto con ID: ${id}?`)) {
                    try {
                        await Model.deleteProduct(id);
                        View.removeCard(id); // Elimina del DOM
                    } catch (error) {
                        alert(error.message); // Muestra error
                    }
                }
            }
        });
    }

    /**
     * NUEVO: Configura el formulario de "Nuevo Producto" para AJAX
     */
    function setupNewProductForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Previene el envío HTML
            View.clearFormMessage();
            
            const submitButton = document.getElementById('submit-button');
            submitButton.disabled = true; // Previene doble clic
            submitButton.textContent = 'Enviando...';

            const formData = new FormData(form);

            try {
                // Llama al Modelo para usar la API POST
                const newProduct = await Model.createProduct(formData);
                
                View.showFormMessage(`¡Producto "${newProduct.name}" creado con éxito!`, 'success');
                form.reset(); // Limpia el formulario

            } catch (error) {
                console.error(error.message);
                // Muestra errores de validación de WTForms
                let errorMsg = 'Error al crear el producto. Revisa los campos.';
                if (error.message.includes('{')) { // Es un JSON de errores
                    const errors = JSON.parse(error.message);
                    errorMsg = Object.values(errors).map(err => err[0]).join('<br>');
                }
                View.showFormMessage(errorMsg, 'error');
            } finally {
                // Reactiva el botón
                submitButton.disabled = false;
                submitButton.textContent = 'Crear';
            }
        });
    }

    /**
     * NUEVO: Configura el interruptor de modo oscuro
     */
    function setupThemeSwitcher() {
        const switcher = document.getElementById('theme-switcher');
        if (!switcher) return;

        switcher.addEventListener('click', () => {
            const currentTheme = document.documentElement.dataset.theme || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        });
    }

    // Inicializa el controlador cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', init);

})(Model, View)