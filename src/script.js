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

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const tableBody = document.querySelector("tbody");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtém os valores dos inputs
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;
        const quantidade = document.getElementById("quantidade").value;
        const valor = parseFloat(document.getElementById("valor").value);
        const valorTotal = quantidade * valor;

        // Cria uma nova linha na tabela
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td>
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>${quantidade}</td>
            <td>${valor.toFixed(2)}</td>
            <td>${valorTotal.toFixed(2)}</td>
            <td>
                <button class="edit-button">Editar</button>
                <button class="remove-button">Remover</button>
            </td>
        `;

        tableBody.appendChild(newRow);
        form.reset();

        // Adiciona evento para o botão de remover
        newRow.querySelector(".remove-button").addEventListener("click", function () {
            newRow.remove();
            updateRowIds();
        });

        // Adiciona evento para o botão de editar
        newRow.querySelector(".edit-button").addEventListener("click", function () {
            editRow(newRow);
        });
    });

    // Função para editar uma linha
    function editRow(row) {
        const cells = row.querySelectorAll("td");
        const marca = cells[1].textContent;
        const modelo = cells[2].textContent;
        const quantidade = cells[3].textContent;
        const valor = cells[4].textContent;

        document.getElementById("marca").value = marca;
        document.getElementById("modelo").value = modelo;
        document.getElementById("quantidade").value = quantidade;
        document.getElementById("valor").value = valor;

        // Remove a linha após editar
        row.remove();
        updateRowIds();
    }

    // Função para atualizar os IDs da tabela
    function updateRowIds() {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1; // Atualiza o ID da linha
        });
    }
});

