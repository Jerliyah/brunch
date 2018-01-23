// DOM Grab
const form = document.querySelector('form');
const list = form.querySelector('ul.plate-list');
const input = form.querySelector('input.plate-item');
const submit = document.querySelector('button.send');



// Variables
var plate_items = [];


// Functions
function previous_session() {
    // Immediately exit if there's nothing from previous session
    if(localStorage.length < 1) { return }
    plate_items = JSON.parse( localStorage.getItem('plate_items') )

    plate_items.forEach( (item) => { populate_list(item, list) } )
}

function add_to_plate(e) {
    e.preventDefault()

    let item = {'name': input.value, 'checked': false}

    plate_items.push( item )

    populate_list(item, list)

    localStorage.setItem('plate_items', JSON.stringify(plate_items))

    this.reset();
}

function toggle_checked(element) {
    if( element.checked ) {
        element.removeAttribute('checked')
    }
    else {
        element.setAttribute('checked', true)
    }
}

function populate_list(item, list) {
    let li = document.createElement('li')
    li.innerHTML = `<input type="checkbox" ${item.checked ? 'checked' : ''}> <label> ${item.name} </label>`

    li.addEventListener('click', function() { toggle_checked(this.querySelector('input')) })
    
    list.insertAdjacentElement('beforeend', li)
}

function send_order(e) {
    alert("Yum!")
}


//Events
previous_session()

form.addEventListener('submit', add_to_plate)

submit.addEventListener('click', send_order)


