const form = document.getElementById("novoItem")//formulário
const lista = document.getElementById("lista");

/* Getting the items from local storage and parsing them into an array. If there are no items, it
creates an empty array. */
const itens = JSON.parse(localStorage.getItem("itens")) || [];

/* Iterating through the array of items and calling the function criaElemento for each item. */
itens.forEach( (elemento) => {
    criaElemento(elemento);
})




/* It's adding an event listener to the form. When the form is submitted, it prevents the default
action, gets the name and quantity from the form, checks if the item already exists in the array,
creates a new object with the name and quantity from the form, checks if the item already exists in
the array. If it does, it updates the item's quantity. If it doesn't, it creates a new item and adds
it to the array. It then updates the local storage with the new array. Finally, it clears the form. */
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    /* Checking if the item already exists in the array. */
    const existe = itens.find(elemento => elemento.nome === nome.value);

    /* Creating a new object with the name and quantity from the form. */
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }


    
    /* Checking if the item already exists in the array. If it does, it updates the item's quantity. If
    it doesn't, it creates a new item and adds it to the array. */
    if (existe){
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        /* It's updating the item in the array. */
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

     }else{
        /* It's checking if the array is empty, and if it is, it sets the id to 0. If it isn't, it sets
        the id to the id of the last item in the array. */
        itemAtual.id = itens[itens.lenght - 1] ? (itens[itens.lenght-1]).id  : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);

     }

     
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';

});



/**
 * It creates a new list item, adds the class "item" to it, creates a new element, adds the quantity to
 * it, adds a new attribute to the element, adds the quantity and name to the list item, and finally
 * adds the new item to the list.
 * @param item - The item that will be added to the list.
 */
function criaElemento(item) {

    /* Creating a new list item and adding the class "item" to it. */
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    
    /* Creating a new element and adding the quantity to it. */
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;

    /* Adding a new attribute to the element. */
    numeroItem.dataset.id = item.id;

    
    /* Adding the quantity and name to the list item. */
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;


    novoItem.appendChild(botaoDeleta(item.id));


    /* Adding the new item to the list. */
    lista.appendChild(novoItem);

  
}


/**
 * It finds the element with the data-id attribute that matches the id of the item passed in, and then
 * updates the innerHTML of that element to the value of the item's quantity
 * @param item - the object that contains the id and quantity
 */
function atualizaElemento(item) {

    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}



function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function (){
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}


/**
 * It removes the element from the DOM and from the array.
 * @param tag - the element that will be deleted
 * @param id - the id of the item to be deleted
 */
function deletaElemento (tag, id) {

    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
}   