// Seletor de data do addSale
const datePickerAddSale = flatpickr("#data-addSale", {
    enableTime: true,
    dateFormat: "d/m/Y H:i",  // Formato: dia/mês/ano
    defaultDate: "today",
    defaultHour: 0,
    defaultMinute: 0,
    maxDate: "today",         // Faz com que a data maxima que pode ser selecionada seja até a data atual 
    locale: "pt",             // Português (precisa importar se quiser completo)
    
    // Usando onDayCreate para adicionar classes personalizadas
    onDayCreate: function(dObj, dStr, fp, dayElem) {
        // Verifica se é sábado (6) ou domingo (0)
        const dayOfWeek = dayElem.dateObj.getDay();  // Corrigido: usar dateObj
        
        // Adiciona a classe 'weekend-day' aos sábados e domingos
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          dayElem.classList.add("weekend-day");
        }
    }
});


const datePickerStartFilter = flatpickr("#filter-input-date-start", {
    enableTime: true,
    dateFormat: "d/m/Y H:i",   // Formato: dia/mês/ano
    defaultHour: 0,
    defaultMinute: 0,
    maxDate: "today",
    locale: "pt",  // Português (precisa importar se quiser completo)
    
    // Usando onDayCreate para adicionar classes personalizadas
    onDayCreate: function(dObj, dStr, fp, dayElem) {
        // Verifica se é sábado (6) ou domingo (0)
        const dayOfWeek = dayElem.dateObj.getDay();  // Corrigido: usar dateObj
        
        // Adiciona a classe 'weekend-day' aos sábados e domingos
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          dayElem.classList.add("weekend-day");
        }
    }
});

const datePickerEndFilter = flatpickr("#filter-input-date-end", {
    enableTime: true,
    dateFormat: "d/m/Y H:i",   // Formato: dia/mês/ano
    defaultHour: 0,
    defaultMinute: 0,
    maxDate: "today",
    locale: "pt",          // Português (precisa importar se quiser completo)
    
    // Usando onDayCreate para adicionar classes personalizadas
    onDayCreate: function(dObj, dStr, fp, dayElem) {
        // Verifica se é sábado (6) ou domingo (0)
        const dayOfWeek = dayElem.dateObj.getDay();  // Corrigido: usar dateObj
        
        // Adiciona a classe 'weekend-day' aos sábados e domingos
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          dayElem.classList.add("weekend-day");
        }
    }
});


// Filtro range do total
const sliderFilterTotal = document.querySelector("#filter-range-total")
const inputFilterTotalMin = document.querySelector("#filter-input-total-min")
const inputFilterTotalMax = document.querySelector("#filter-input-total-max")

noUiSlider.create(sliderFilterTotal, {
    start: [0, 1000],
    connect: true,
    range: {
      min: 0,
      max: 1000
    },
    step: 1,
    tooltips: false,
});

setTimeout(() => {
  console.log(sliderFilterTotal.noUiSlider.get())
}, 0)

// Atualiza os inputs quando o slider mudar
sliderFilterTotal.noUiSlider.on('update', function (values, handle) {
    var value = Math.round(values[handle]);
    if (handle === 0) {
      inputFilterTotalMin.value = `R$ ${value}`;
    } else {
      inputFilterTotalMax.value = `R$ ${value}`;
    }
});

// Quando mudar inputMin
inputFilterTotalMin.addEventListener('change', function () {
    const val = this.value.replace(/\D/g, "")  // Remove tudo que não for dígito
    sliderFilterTotal.noUiSlider.set([val, null]);
});

// Quando mudar inputMax
inputFilterTotalMax.addEventListener('change', function () {
    const val = this.value.replace(/\D/g, "")  // Remove tudo que não for dígito
    sliderFilterTotal.noUiSlider.set([null, val]);
});


export { datePickerAddSale, sliderFilterTotal, datePickerStartFilter, datePickerEndFilter }