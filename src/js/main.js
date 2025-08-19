import { renderTable, sales, sortByDateDescending } from "./modules/sales.js"

document.addEventListener("DOMContentLoaded", () => {
    // Se não há vendas carregadas do localStorage, renderizar tabela vazia
    if (sales.length === 0) {
        renderTable(sales)
    }
})