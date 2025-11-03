// model.js - guarda datos y utilidades de negocio (front-end)
const Model = (function(){
    const products = [
        { id: 1, name: "Auriculares inalámbricos", price: 49.99, stock: 10, description: "Sonido HD con cancelación de ruido." },
        { id: 2, name: "Smartwatch deportivo", price: 89.99, stock: 5, description: "Monitor de ritmo cardíaco y sueño." },
        { id: 3, name: "Teclado mecánico RGB", price: 69.99, stock: 8, description: "Interruptores azules, retroiluminado." }
    ];

    const formatPrice = price => `€${price.toFixed(2)}`;

    function getProducts() { return products.slice(); }
    function removeProductById(id){
        const idx = products.findIndex(p => p.id === id);
        if(idx !== -1) products.splice(idx,1);
    }

    return { getProducts, formatPrice, removeProductById };
})();