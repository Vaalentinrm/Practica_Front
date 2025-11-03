// controller.js - orquesta eventos y conecta model + view
const Controller = (function(Model, View){
    function init(){
        // Registro: validación de contraseñas
        const form = document.querySelector('.register-form');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        if(form && confirmPassword){
            confirmPassword.addEventListener('input', () => confirmPassword.setCustomValidity(''));
            form.addEventListener('submit', function (e) {
                if (password.value !== confirmPassword.value) {
                    e.preventDefault();
                    confirmPassword.setCustomValidity("Las contraseñas no coinciden");
                    confirmPassword.reportValidity();
                } else {
                    confirmPassword.setCustomValidity('');
                }
            });
        }

        // Popup términos + cookies
        const popup = document.getElementById('termsCookiesPopup');
        const content = document.getElementById('termsCookiesContent');
        const acceptBtn = document.getElementById('acceptTermsCookiesBtn');
        if(popup){
            if (!localStorage.getItem('acceptedTermsCookies')) {
                popup.style.display = 'flex';
            }
            if(content){
                content.addEventListener('scroll', () => {
                    if (content.scrollTop + content.clientHeight >= content.scrollHeight) {
                        acceptBtn.disabled = false;
                    }
                });
            }
            if(acceptBtn){
                acceptBtn.addEventListener('click', () => {
                    localStorage.setItem('acceptedTermsCookies', 'true');
                    popup.style.display = 'none';
                });
            }
        }

        // Productos list
        const productList = document.getElementById('productList');
        if(productList){
            View.renderProductList(productList, Model.getProducts());
            productList.addEventListener('click', e => {
                const target = e.target;
                if (target.classList.contains('toggle-details')) {
                    const details = target.nextElementSibling;
                    details.classList.toggle('d-none');
                }
                if (target.classList.contains('remove-btn')) {
                    const card = target.closest('.card');
                    const id = parseInt(card.dataset.productId);
                    Model.removeProductById(id);
                    card.remove();
                }
            });
        }
    }

    return { init };
})(Model, View);

// Inicializa cuando DOM esté listo
document.addEventListener('DOMContentLoaded', Controller.init);