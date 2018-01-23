// DOM Grab
const form = document.querySelector('form');
const list = form.querySelector('ul.plate-list');
const input = form.querySelector('input.plate-item');
const submit = document.querySelector('button');



// Variables
var plate_items = [];


// Functions


function add_to_plate(e) {
    e.preventDefault()

    let item = {'name': input.value, 'checked': false}

    plate_items.push( item )

    populate_list(item, list)

    localStorage.setItem(item.name, item.checked)

    this.reset();
}

function populate_list(item, list) {
    let li = document.createElement('li')
    li.innerHTML = `<input type="checkbox" ${item.checked ? 'checked' : ''}> <label> ${item.name} </label>`
    list.insertAdjacentElement('beforeend', li)
}

function send_order(e) {
    alert("Yum!")
}


//Events


form.addEventListener('submit', add_to_plate)

submit.addEventListener('click', send_order)


