import { sliderFilterTotal } from "./init.js"
import { renderTable } from "./sales.js"
import { sales, sortByDateDescending } from "./sales.js"

function filterTable() {
    const dataInicial = document.querySelector("#filter-input-date-start").value
    const dataFinal = document.querySelector("#filter-input-date-end").value
    const canalDeVenda = document.querySelector("#filter-select-canal-de-venda").value
    const statusDePagamento = document.querySelector("#filter-select-sts-de-pagamento").value
    const statusDeEntrega = document.querySelector("#filter-select-sts-de-entrega").value
    const arrTotalMinEMax = sliderFilterTotal.noUiSlider.get()

    const totalMin = Number(arrTotalMinEMax[0])
    const totalMax = Number(arrTotalMinEMax[1])

    // Converter datas do formato dd/mm/yyyy HH:mm para Date objects
    function parseDate(dateString) {
        if (!dateString) return null
        
        const [day, month, yearHour] = dateString.split("/")
        const [year, hour] = yearHour.split(" ")
        return new Date(`${year}-${month}-${day}T${hour}`)
    }

    const dataInicialDate = parseDate(dataInicial)
    const dataFinalDate = parseDate(dataFinal)

    const vendasFiltradas = sales.filter(sale => {
        // Converter a data da venda para Date object
        const saleDate = parseDate(sale.date)
        
        // Filtro por data inicial
        if (dataInicialDate && saleDate < dataInicialDate) {
            return false
        }

        // Filtro por data final
        if (dataFinalDate && saleDate > dataFinalDate) {
            return false
        }
        
        // Filtro por canal de venda
        if (canalDeVenda && sale.saleChannel !== canalDeVenda) {
            return false
        }
        
        // Filtro por status de pagamento
        if (statusDePagamento && sale.statusPayment !== statusDePagamento) {
            return false
        }
        
        // Filtro por status de entrega
        if (statusDeEntrega && sale.deliveryStatus !== statusDeEntrega) {
            return false
        }
        
        // Filtro por total (range) - verificar se o valor está dentro do range
        if (sale.total < totalMin || sale.total > totalMax) {
            return false
        }
        
        return true
    })

    sortByDateDescending(vendasFiltradas)
    renderTable(vendasFiltradas)
}

function resetFilter() {
    // Limpar todos os campos do filtro
    document.querySelector("#filter-input-date-start").value = ""
    document.querySelector("#filter-input-date-end").value = ""
    document.querySelector("#filter-select-canal-de-venda").value = ""
    document.querySelector("#filter-select-sts-de-pagamento").value = ""
    document.querySelector("#filter-select-sts-de-entrega").value = ""
    
    // Resetar o slider para valores padrão
    sliderFilterTotal.noUiSlider.set([0, 1000])
    
    // Renderizar tabela com todas as vendas
    renderTable(sales)
}

export { filterTable, resetFilter }
