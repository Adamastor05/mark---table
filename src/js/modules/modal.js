import { resetFormModalNewSale } from "./format.js"
import { addSale } from "./sales.js"
import { datePickerAddSale, datePickerStartFilter, datePickerEndFilter } from "./init.js"
import { filterTable, resetFilter } from "./filterTable.js"


const modalNewSale = document.querySelector(".modal-addSale")
const btnOpenModalAddSale = document.querySelector(".btn-add")
const btnAddSale = document.querySelector("#btn-add-addSale")
const arrBtnsCloseModal = [  // Capitura os dois botões que fecham o modal
    document.querySelector(".btn-close-addSale"), 
    document.querySelector("#btn-cancel-addSale")
]

// ===================================
// Modal de adicionar vendas
btnOpenModalAddSale.addEventListener("click", () => {
    modalNewSale.classList.add("active")
    overlay.classList.add("active")
    document.body.style.overflow = "hidden"

    // Atualiza a data do input de data para hoje ao abrir
    if (datePickerAddSale) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        datePickerAddSale.setDate(today, true);
        datePickerAddSale.input.value = datePickerAddSale.formatDate(today, "d/m/Y H:i");
    }
})

function closeModalNewSale() {
    modalNewSale.classList.remove("active")
    overlay.classList.remove("active")
    document.body.style.overflow = ""

    setTimeout(() => {
        resetFormModalNewSale()
    }, 300); // 300 ms, mesmo tempo que a animação do modal
}

// Itera sobre os botões que fecham o modal
arrBtnsCloseModal.forEach(btn => {
    // adiciona o evento de click nos botões que fecham o modal 
    btn.addEventListener("click", () => {
        closeModalNewSale()
    })
})

btnAddSale.addEventListener("click", () => { 
    addSale()
    closeModalNewSale()
})
// ==========================================================================


const modalFilter = document.querySelector(".modal-filter")
const btnShowModalFil = document.querySelector(".btn-modal-filter")
const btnCloseModalFil = document.querySelector(".btn-close-filter")
const btnRestartFilter = document.querySelector("#filter-btn-restart")
const btnFiltrate = document.querySelector("#filter-btn-filter")

// ==============================
// Modal de filtro

function closeModalFilter() {
    modalFilter.classList.remove("active") 
    overlay.classList.remove("active")
    document.body.style.overflow = "hidden"
}

btnShowModalFil.addEventListener("click", () => {
    modalFilter.classList.add("active") 
    overlay.classList.add("active")
    document.body.style.overflow = "hidden"

    // Atualiza a data do input de data para hoje ao abrir
    if (datePickerEndFilter) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        datePickerEndFilter.setDate(today, true);
        datePickerEndFilter.input.value = datePickerEndFilter.formatDate(today, "d/m/Y H:i");
    }
})

btnCloseModalFil.addEventListener("click", () => {
    closeModalFilter()
})

btnFiltrate.addEventListener("click", () => {
    filterTable()
    closeModalFilter()
})

btnRestartFilter.addEventListener("click", () => {
    resetFilter()
})
// ==========================================================================


const overlay = document.querySelector(".overlay")

// quando clicar fota do modal a função vai identeificar qual modal está aberto e fecha ele
overlay.addEventListener("click", () => {
    if (modalFilter.classList.contains("active")) {
        closeModalFilter();
    }
    if (modalNewSale.classList.contains("active")) {
        closeModalNewSale();
    }
});