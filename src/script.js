// Obtém o modal e o botão de fechar
const modal = document.getElementById('modal');
const closeButton = document.getElementById('close-button');

// Adiciona um ouvinte de evento ao botão que abre o modal
document.getElementById('add-form-button').addEventListener('click', function () {
    modal.style.display = 'block'; // Exibe o modal
});

// Adiciona um ouvinte de evento ao botão de fechar
closeButton.addEventListener('click', function () {
    modal.style.display = 'none'; // Fecha o modal
});

// Fecha o modal se o usuário clicar fora dele
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Mantém o modal fechado ao carregar a página
window.onload = function () {
    modal.style.display = 'none'; // Garante que o modal comece fechado
};

// Evento para lidar com o envio do formulário
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const tableBody = document.querySelector("tbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtém os valores dos inputs
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const quantidade = parseInt(document.getElementById("quantidade").value);
        const valorUnitario = parseFloat(document.getElementById("valor").value);
        const valorTotal = (quantidade * valorUnitario).toFixed(2);

        // Cria uma nova linha na tabela
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td>
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>${quantidade}</td>
            <td>R$ ${valorUnitario.toFixed(2)}</td>
            <td>R$ ${valorTotal}</td>
            <td>
                <button class="edit-button" style="display: none;">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="remove-button" style="display: none;">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `;

        // Adiciona a nova linha ao corpo da tabela
        tableBody.appendChild(newRow);

        // Limpa os campos do formulário
        form.reset();
        modal.style.display = 'none'; // Oculta o modal

        // Adiciona eventos de mouse para a nova linha
        addHoverEffectToRow(newRow);
    });

    // Função para adicionar efeitos de hover e ouvir os eventos de edição e remoção à nova linha
    function addHoverEffectToRow(row) {
        const editButton = row.querySelector('.edit-button');
        const removeButton = row.querySelector('.remove-button');

        // Mostra os botões ao passar o mouse
        row.addEventListener('mouseover', function () {
            editButton.style.display = 'inline-block';
            removeButton.style.display = 'inline-block';
        });

        // Esconde os botões ao sair com o mouse
        row.addEventListener('mouseout', function () {
            editButton.style.display = 'none';
            removeButton.style.display = 'none';
        });

        // Lida com a edição
        editButton.addEventListener('click', function () {
            const cells = row.querySelectorAll('td');

            // Preenche o formulário com os dados da linha
            document.getElementById("marca").value = cells[1].innerText;
            document.getElementById("modelo").value = cells[2].innerText;
            document.getElementById("quantidade").value = cells[3].innerText;
            document.getElementById("valor").value = parseFloat(cells[4].innerText.replace('R$', '').trim()).toFixed(2);

            modal.style.display = 'block'; // Exibe o modal para edição

            // Remove a linha ao abrir o modal para evitar duplicação
            row.remove();
        });

        // Lida com a remoção
        removeButton.addEventListener('click', function () {
            row.remove(); // Remove a linha da tabela
        });
    }
});
