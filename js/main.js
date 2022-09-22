const form = document.getElementById("novoItem")//formulário
const lista = document.getElementById("lista");

/* Getting the items from local storage and parsing them into an array. If there are no items, it
creates an empty array. */
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento);
})


/* Adding an event listener to the form. When the form is submitted, it prevents the default action,
gets the values of the name and quantity, and then calls the function criaElemento. It then resets
the form. */
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    
    criaElemento(itemAtual);

    itens.push(itemAtual);

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
});

/**
 * It creates a new list item, adds a class to it, creates a new strong element, adds the quantity to
 * it, adds the name to the list item, and then adds the list item to the list.
 * @param nome - the name of the item
 * @param quantidade - the number of items
 */
function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    /* Creating a new strong element and adding the quantity to it. */
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    /* Adding the name and quantity to the list item. */
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    /* Adding the new item to the list. */
    lista.appendChild(novoItem);

  
}