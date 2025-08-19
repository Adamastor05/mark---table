
const arr = [
    {
        nome: "miguel",
        idade: 17
    },

    {
        nome: "miguel",
        idade: 20
    },

    {
        nome: "miguel",
        idade: 30
    }
]

let contador = 0

const idadeTotal = arr.reduce((acum, pessoa) => acum + pessoa.idade, 0)

console.log(contador)