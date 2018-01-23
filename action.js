// DOM Grab
const form = document.querySelector('form');
const list = form.querySelector('ul.plate-list');
const input = form.querySelector('input.plate-item');
const submit = form.querySelector('button.send');
const selection = document.querySelector('button.selection');
const removal = document.querySelector('button.removal');



// Variables
var plate_items = [];


// Functions
function add_to_plate(e) {
    e.preventDefault()

    let item = {'name': input.value, 'checked': false}

    update_storage(item)

    let label = list.querySelector('label')

    // Check that the item isn't already on the visual list
    if( !label || item.name != label.textContent ) {
        populate_list(item, list)
    }
    else {
        input.setAttribute('placeholder', "That's already on the list")
    }

    this.reset()
}


function populate_list(item, list) {
    let li = document.createElement('li')

    li.innerHTML = `<input type="checkbox" ${item.checked ? 'checked' : ''}><label>${item.name}</label>`

    li.addEventListener('click', function() { toggle_checked(this.querySelector('input')) })

    list.insertAdjacentElement('beforeend', li)
}


function previous_session() {
    // Immediately exit if there's nothing from previous session
    if(localStorage.length < 1) { return }

    plate_items = JSON.parse( localStorage.getItem('plate_items') )

    list.innerHTML = ''

    plate_items.forEach( (item) => { populate_list(item, list) } )
}


function remove_selected() {
    let checkboxes = Array.from( [...document.querySelectorAll('input:checked')] )
    let selected = checkboxes.map( (checkbox) => { return checkbox.parentElement } )
    
    selected.forEach( (li) => { 
        li.remove()
        remove_from_plate(li.textContent)
    })

    localStorage.clear()
    localStorage.setItem('plate_items', JSON.stringify(plate_items))
}

function remove_from_plate(name) {
    let index = plate_items.findIndex( (obj) => { return obj.name == name});
    plate_items.splice(index, 1)
}


function send_order(e) {
    alert("Yum!")
}


function toggle_checked(element) {
    if( element.checked ) { element.removeAttribute('checked') }
    else { element.setAttribute('checked', true) }

    let item = {'name': `${element.nextSibling.textContent}` , 'checked': element.checked}

    toggle_selection()
    update_storage(item)
}

function toggle_selection(e) {
    // Text
    let boxes = form.querySelectorAll('input[type="checkbox"]')
    let checked = form.querySelectorAll('input:checked')

    if( boxes.length === checked.length ) { 
        selection.textContent = "Deselect All"
    }
    else {
        selection.textContent = "Select All"
    }
}


function update_storage(item) {
    index = plate_items.findIndex( (obj) => { return obj.name == item.name});

    if( index > -1 ) { plate_items[index].checked = item.checked }
    else { plate_items.push(item) }

    localStorage.clear()
    localStorage.setItem('plate_items', JSON.stringify(plate_items))
}










//Events
previous_session()

form.addEventListener('submit', add_to_plate)

selection.addEventListener('click', toggle_selection)

submit.addEventListener('click', send_order)

removal.addEventListener('click', remove_selected)


