// Obtém o modal e o botão de fechar
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-button');

// Adiciona um ouvinte de evento ao botão que abre o modal
document.getElementById('add-form-button').addEventListener('click', function () {
    modal.style.display = 'block'; // Exibe o modal
});

// Adiciona um ouvinte de evento ao botão de fechar
closeButton.addEventListener('click', function () {
    modal.style.display = 'none'; // Oculta o modal
});

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Oculta o modal
    }
});
