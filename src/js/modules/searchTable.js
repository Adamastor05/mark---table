import { renderTable, sales } from './sales.js';

document.addEventListener("DOMContentLoaded", () => {

    const inputSearch = document.querySelector(".input-search")

    function searchTable(term) {
        if (!term || typeof term !== "string") {
            return sales
        }

        const termLower = term.toLowerCase()
        return sales.filter(sale => 
            sale.pedido.toString().includes(termLower) ||
            sale.customer.toLowerCase().includes(termLower) ||
            sale.total.toString().includes(termLower) ||
            sale.date.toLowerCase().includes(termLower) ||
            sale.quantityItems.toString().includes(termLower)
        )
    }
    
    inputSearch.addEventListener("input", (event) => {
        const value = event.target.value
        const result = searchTable(value)
        renderTable(result)
    })    
})



