// ipt = input  slt = select
const iptCustomerName = document.querySelector("#name-custumer-addSale")
const iptTotalValue = document.querySelector("#value-sale-addSale")
const sltpaymentStatus = document.querySelector("#status-pagamento-addSale")
const sltDeliveryMethod = document.querySelector("#modalidade-entrega-addSale")
const sltDeliveryStatus = document.querySelector("#status-entrega-addSale")
const sltSaleChannel = document.querySelector("#canal-de-venda-addSale")
const iptDate = document.querySelector("#data-addSale")
const iptQtyItems = document.querySelector("#qtd-de-itens-addSale")

// Formata o input de valor 
iptTotalValue.addEventListener('input', (event) => {
    let value = event.target.value;

    // Remove tudo que não for dígito
    value = value.replace(/[^\d]/g, '');

    if (value.length === 0) {
        event.target.value = '';
        return;
    }

    // Garante que tenha pelo menos 3 dígitos para funcionar a formatação
    if (value.length === 1) {
        value = `00${value}`;
    } else if (value.length === 2) {
        value = `0${value}`;
    }

    // Converte a string para inteiro
    const intValue = parseInt(value, 10);

    // Divide por 100 para considerar os centavos
    const floatValue = intValue / 100;

    // Formata com separador de milhar e vírgula como separador decimal
    const formattedValue = floatValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Atualiza o campo
    event.target.value = formattedValue;
});

function resetFormModalNewSale() {
    // Inputs
    iptCustomerName.value = "";
    iptTotalValue.value = "";
    iptQtyItems.value = "";

    // Selects
    sltpaymentStatus.value = "";
    sltDeliveryMethod.value = "";
    sltDeliveryStatus.value = "";
    sltSaleChannel.value = "";
}

function formartarValor(param) {
    const separado = param.replace(/([a-z])([A-Z])/g, "$1 $2")
    const formatado = separado.toLowerCase() 
    return formatado.charAt(0).toUpperCase() + formatado.slice(1)
}

function formatarStatusPagamento(string) {
    if (string === "pago") {
        return "Pago"
    
    } else if (string === "aguardando-pagamento") {
        return "Aguardando pagamento"
    
    } else if (string === "cancelado") {
        return "Cancelado"
    
    } else {
        return ""
    }
}

function formatarStatusEntrega(string) {
    if (string === "entregue") {
        return "Entregue"
    
    } else if (string === "a-caminho") {
        return "A caminho"
    
    } else if (string === "em-preparacao") {
        return "Em preparacao"
    
    } else {
        return ""
    }
}

export { resetFormModalNewSale, formartarValor, formatarStatusPagamento, formatarStatusEntrega }