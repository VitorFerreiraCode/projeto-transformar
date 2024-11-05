// Obtém o modal e o botão de fechar
const modal = document.getElementById('modal'); // Seleciona o elemento do modal pelo ID
const closeButton = document.getElementById('close-button'); // Seleciona o botão de fechar o modal pelo ID

// Adiciona um ouvinte de evento ao botão que abre o modal
document.getElementById('add-form-button').addEventListener('click', function () {
    modal.style.display = 'block'; // Exibe o modal ao clicar no botão de adicionar produto
});

// Adiciona um ouvinte de evento ao botão de fechar
closeButton.addEventListener('click', function () {
    modal.style.display = 'none'; // Fecha o modal ao clicar no botão de fechar
});

// Fecha o modal se o usuário clicar fora dele
window.addEventListener('click', function (event) {
    if (event.target == modal) { // Verifica se o clique foi fora do modal
        modal.style.display = 'none'; // Fecha o modal se a condição for verdadeira
    }
});

// Mantém o modal fechado ao carregar a página
window.onload = function () {
    modal.style.display = 'none'; // Define que o modal comece fechado ao carregar a página
};

// Evento para lidar com o envio do formulário
document.addEventListener("DOMContentLoaded", function () { // Garante que o código seja executado após o carregamento do DOM
    const form = document.getElementById("form"); // Seleciona o formulário pelo ID
    const tableBody = document.querySelector("tbody"); // Seleciona o corpo da tabela onde serão adicionadas as linhas

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        // Obtém os valores dos inputs
        const marca = document.getElementById("marca").value; // Valor do campo de marca
        const modelo = document.getElementById("modelo").value; // Valor do campo de modelo
        const quantidade = parseInt(document.getElementById("quantidade").value); // Valor do campo quantidade, convertido para número inteiro
        const valorUnitario = parseFloat(document.getElementById("valor").value); // Valor do campo de valor unitário, convertido para número decimal
        const valorTotal = (quantidade * valorUnitario).toFixed(2); // Calcula o valor total e formata com 2 casas decimais

        // Cria uma nova linha na tabela
        const newRow = document.createElement("tr"); // Cria um elemento <tr> para representar a nova linha na tabela
        newRow.innerHTML = `
            <td>${tableBody.children.length + 1}</td> <!-- Adiciona ID com base no número de linhas existentes -->
            <td>${marca}</td> <!-- Coluna para a marca -->
            <td>${modelo}</td> <!-- Coluna para o modelo -->
            <td>${quantidade}</td> <!-- Coluna para a quantidade -->
            <td>R$ ${valorUnitario.toFixed(2)}</td> <!-- Coluna para o valor unitário, formatado com 2 casas decimais -->
            <td>R$ ${valorTotal}</td> <!-- Coluna para o valor total, formatado -->
            <td>
                <button class="edit-button" style="display: none;">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="remove-button" style="display: none;">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </td>
        `; // Insere botões de edição e remoção na coluna de ações

        // Adiciona a nova linha ao corpo da tabela
        tableBody.appendChild(newRow); // Insere a nova linha criada na tabela

        // Limpa os campos do formulário
        form.reset(); // Reseta o formulário para apagar os dados preenchidos
        modal.style.display = 'none'; // Oculta o modal após adicionar o produto

        // Adiciona eventos de mouse para a nova linha
        addHoverEffectToRow(newRow); // Adiciona efeitos de hover e eventos aos botões da nova linha
    });

    // Função para adicionar efeitos de hover e ouvir os eventos de edição e remoção à nova linha
    function addHoverEffectToRow(row) {
        const editButton = row.querySelector('.edit-button'); // Seleciona o botão de edição da linha
        const removeButton = row.querySelector('.remove-button'); // Seleciona o botão de remoção da linha

        // Mostra os botões ao passar o mouse
        row.addEventListener('mouseover', function () {
            editButton.style.display = 'inline-block'; // Exibe o botão de edição no hover
            removeButton.style.display = 'inline-block'; // Exibe o botão de remoção no hover
        });

        // Esconde os botões ao sair com o mouse
        row.addEventListener('mouseout', function () {
            editButton.style.display = 'none'; // Oculta o botão de edição ao tirar o mouse da linha
            removeButton.style.display = 'none'; // Oculta o botão de remoção ao tirar o mouse da linha
        });

        // Lida com a edição
        editButton.addEventListener('click', function () {
            const cells = row.querySelectorAll('td'); // Obtém todas as células da linha para extrair os dados

            // Preenche o formulário com os dados da linha
            document.getElementById("marca").value = cells[1].innerText; // Preenche o campo marca com o valor da linha
            document.getElementById("modelo").value = cells[2].innerText; // Preenche o campo modelo com o valor da linha
            document.getElementById("quantidade").value = cells[3].innerText; // Preenche o campo quantidade com o valor da linha
            document.getElementById("valor").value = parseFloat(cells[4].innerText.replace('R$', '').trim()).toFixed(2); // Preenche o campo valor unitário

            modal.style.display = 'block'; // Exibe o modal para permitir edição

            // Remove a linha ao abrir o modal para evitar duplicação
            row.remove(); // Remove a linha editada da tabela
        });

        // Lida com a remoção
        removeButton.addEventListener('click', function () {
            row.remove(); // Remove a linha da tabela ao clicar no botão de remoção
        });
    }
});
