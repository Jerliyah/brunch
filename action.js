// DOM Grab
const form = document.querySelector('form');
const plate_list = form.querySelector('ul.plate-list');
const input = form.querySelector('input.plate-item');
const submit = document.querySelector('button');



// Variables
var plate_items = [];


// Functions
function add_to_plate(e) {
    e.preventDefault()

    plate_items.push( {'name': input.value, 'checked': false} )

    plate_list.insertAdjacentHTML('beforeend',
        `<li>
            <input type="checkbox">
            <label> ${input.value} </label>
        </li>`)

    input.value = ''
}

function send_order(e) {
    alert("Yum!")
}


//Events
form.addEventListener('submit', add_to_plate)

submit.addEventListener('click', send_order)


