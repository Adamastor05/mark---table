import { renderCards } from "./cards.js"
import { resetFormModalNewSale, formartarValor, formatarStatusPagamento, formatarStatusEntrega } from "./format.js"

let sales = []
let contadorDePedido = 1001






// Funções simples para localStorage
function saveSalesToLocalStorage() {
    localStorage.setItem('sales', JSON.stringify(sales))
}

function loadSalesFromLocalStorage() {
    const savedSales = localStorage.getItem('sales')
    if (savedSales) {
        sales = JSON.parse(savedSales)
        // Atualizar o contador para o próximo pedido
        if (sales.length > 0) {
            contadorDePedido = Math.max(...sales.map(sale => sale.pedido)) + 1
        }
        // Renderizar os dados carregados
        sortByDateDescending(sales)
        renderTable(sales)
        renderCards()
    }
}

// Função para limpar localStorage (fácil de remover depois)
function clearLocalStorage() {
    localStorage.removeItem('sales')
    sales = []
    contadorDePedido = 1001
    renderTable(sales)
    renderCards()
}

// Carregar vendas do localStorage ao iniciar
loadSalesFromLocalStorage()






                                            
function addSale() {
    const customerName = document.querySelector("#name-custumer-addSale").value.trim()
    const totalValue = document.querySelector("#value-sale-addSale").value.trim().replace(/\./g, '').replace(',', '.') // Substitui ponto (separador de milhar) por nada e vírgula (decimal) por ponto
    const paymentStatus = document.querySelector("#status-pagamento-addSale").value
    const deliveryStatus = document.querySelector("#status-entrega-addSale").value
    const deliveryMethod = document.querySelector("#modalidade-entrega-addSale").value
    const saleChannel = document.querySelector("#canal-de-venda-addSale").value
    const dateValue = document.querySelector("#data-addSale").value
    const qtyItems = document.querySelector("#qtd-de-itens-addSale").value.trim()

    console.log(dateValue)

    const sale = {
        pedido: contadorDePedido, // id incremental que inicia no 1001 depois 1002 etc...
        customer: customerName,  
        total: Number(totalValue),
        statusPayment: paymentStatus,
        deliveryMethod: deliveryMethod,
        deliveryStatus: deliveryStatus,
        saleChannel: saleChannel,
        date: dateValue,
        quantityItems: Number(qtyItems)
    };

    console.log(sale)

    sales.push(sale) // adiciona o objeto "sale" ao array "sales"
    saveSalesToLocalStorage() // salva no localStorage
    sortByDateDescending(sales) // chama a função que ordena as vendas de forma decrescente para que as vendas mais recentes fiquem sempre em cima
    renderTable(sales) // chama a função que renderiza a tabela
    renderCards() // chama a função que renderiza os cards
    resetFormModalNewSale() // chama a função que limpa os inputs e selects do modalNewSale
    contadorDePedido++
}

function sortByDateDescending(arrSales) {
    // Ordena as vendas da mais recente para a mais antiga
    arrSales.sort((a, b) => {
        const [dayA, monthA, yearHourA] = a.date.split("/");
        const [yearA, hourA] = yearHourA.split(" ");
        const dateA = new Date(`${yearA}-${monthA}-${dayA}T${hourA}`);

        const [dayB, monthB, yearHourB] = b.date.split("/");
        const [yearB, hourB] = yearHourB.split(" ");
        const dateB = new Date(`${yearB}-${monthB}-${dayB}T${hourB}`);

        return dateB - dateA; // ordem decrescente
    });
}

function renderTable(salesList) {
    const tbody = document.querySelector("tbody")
    tbody.innerHTML = ""

    salesList.forEach(sale => {
        const tr = document.createElement("tr") 
        
        tr.innerHTML = `
            <td class="td-pedido"> #${sale.pedido} </td>
            
            <td class="td-data"> ${sale.date} </td>

            <td class="td-cliente"> ${sale.customer} </td>

            <td class="td-canal-de-venda"> ${formartarValor(sale.saleChannel)} </td>

            <td class="td-total"> ${sale.total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} </td>

            <td class="td-status-de-pagamento">
                <div class="conteiner-status-de-pagamento">
                    <span class="content-status-de-pagamento ${sale.statusPayment}">
                        ${formatarStatusPagamento(sale.statusPayment)}
                    </span>
                </div>
            </td>

            <td class="td-itens"> ${sale.quantityItems} ${sale.quantityItems == 1 ? "item" : "itens"} </td>

             <td class="td-status-de-entrega">
                <div class="conteiner-status-de-entrega">
                    <span class="content-status-de-entrega ${sale.deliveryStatus}">
                        ${formatarStatusEntrega(sale.deliveryStatus)}
                    </span>
                </div>
            </td>

            <td class="td-acoes">
                <button class="btn-acoes">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </td>
        `

        tbody.appendChild(tr)
    })
}


// Ordenação inicial
let currentSort = {
    index: null,
    order: 'asc' // 'asc' para crescente, 'desc' para decrescente
};

// Seletor para os cabeçalhos da tabela
const ths = document.querySelectorAll("th");

// Adicionando evento de clique para os cabeçalhos
ths.forEach((th, index) => {
    th.addEventListener("click", () => {
        // Alternar entre ascendente e descendente
        currentSort.order = currentSort.index === index && currentSort.order === 'asc' ? 'desc' : 'asc';
        currentSort.index = index;

        // Ordenar a tabela
        sortTable(index, currentSort.order);
    });
});

function sortTable(index, order) {
    const tbody = document.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr")); // Captura os elementos "tr" dentro de tbody e transforma o nodeList em um Array usando o Array.from()

    // Ordena as linhas da tabela com base no conteúdo da célula
    rows.sort((a, b) => {
        const aText = a.children[index].textContent.trim();
        const bText = b.children[index].textContent.trim();

        // Tenta converter para número, data ou mantém como texto
        const aVal = isNaN(Date.parse(aText))  // Verifica se aText pode ser convertido em uma data
            ? (isNaN(aText) // Se não for uma data, verifica se é um número
                ? aText // Se não for número nem data, mantém como texto
                : Number(aText)) // Caso seja um número, converte o texto para número
            : new Date(aText); // Se for uma data válida, converte para objeto Date

        // Essa faz o mesmo que a da de cima porem com a variavel "bVal"
        const bVal = isNaN(Date.parse(bText)) ? (isNaN(bText) ? bText : Number(bText)) : new Date(bText);


        // Comparar os valores e retornar a ordenação
        return (aVal > bVal ? 1 : aVal < bVal ? -1 : 0) * (order === 'asc' ? 1 : -1);
    });


    // Atualiza a tabela com a ordem correta
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));

    // Função para atualizar os icones
    updateSortIcons(index, order)
}

// Função para atualizar os ícones de ordenação (seta para cima e seta para baixo)
function updateSortIcons(index, order) {
    // Seleciona todos os cabeçalhos (th) da tabela
    const ths = document.querySelectorAll("th");

    // Para cada cabeçalho da tabela
    ths.forEach((th, i) => {
        // Encontra o ícone dentro do cabeçalho (seta)
        const icon = th.querySelector("i");

        // Se for o cabeçalho clicado (a coluna sendo ordenada)
        if (i === index) {
            // Se a ordenação for crescente (asc), mostra a seta para cima
            if (order === 'asc') {
                icon.classList.remove("fa-arrow-down"); // Remove a seta para baixo
                icon.classList.add("fa-arrow-up"); // Adiciona a seta para cima
            } else { // Se a ordenação for decrescente (desc), mostra a seta para baixo
                icon.classList.remove("fa-arrow-up"); // Remove a seta para cima
                icon.classList.add("fa-arrow-down"); // Adiciona a seta para baixo
            }
            icon.style.color = "#9FA6BC"

        } else {
            // Se não for o cabeçalho clicado, remove ambos os ícones de seta
            icon.classList.remove("fa-arrow-up", "fa-arrow-down");
        }
    });
}


export { addSale, sortByDateDescending, renderTable, sales, clearLocalStorage }