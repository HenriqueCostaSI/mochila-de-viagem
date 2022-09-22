const form = document.getElementById("novoItem")//formulário
const lista =document.getElementById("lista");

/* Adding an event listener to the form. When the form is submitted, it prevents the default action,
gets the values of the name and quantity, and then calls the function criaElemento. It then resets
the form. */
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    
    criaElemento(nome.value, quantidade.value);

    nome.value = '';
    quantidade.value = '';
});

/**
 * It creates a new list item, adds a class to it, creates a new strong element, adds the quantity to
 * it, adds the name to the list item, and then adds the list item to the list.
 * @param nome - the name of the item
 * @param quantidade - the number of items
 */
function criaElemento(nome, quantidade) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    /* Creating a new strong element and adding the quantity to it. */
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;

    /* Adding the name and quantity to the list item. */
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    /* Adding the new item to the list. */
    lista.appendChild(novoItem);



    
   /* Saving the name and quantity to local storage. */
    localStorage.setItem("nome", nome);
    localStorage.setItem("quantidade", quantidade);
}