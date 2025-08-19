import { sales } from "./sales.js"

const spanTotalSales = document.querySelector("#total-de-vendas")
const spanNumOfOrders = document.querySelector("#pedidos")
const spanAverageTicket = document.querySelector("#content-ticket-medio")


function renderCards() {
    const totalSales = sales.reduce((acum, sale) => acum + sale.total, 0)
    const numOfOrders = sales.length
    const averageTicket = totalSales / sales.length

    spanTotalSales.innerHTML = `${totalSales.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`
    spanNumOfOrders.innerHTML = `${numOfOrders}`
    spanAverageTicket.innerHTML = `${averageTicket.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`
}


export { renderCards }