// DOM Grab
const body = document.querySelector('body');
const form = document.querySelector('form');
const list = form.querySelector('ul.plate-list');
const input = form.querySelector('input.plate-item');
const submit_btn = form.querySelector('button.send');
const select_btn = document.querySelector('button.selection');
const removal_btn = document.querySelector('button.removal');



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


function bring_the_plate() {
    body.innerHTML = `<img src="assets/plate.png" class="plate">
                      <h1 class="plate-text">Imagination</h1>`
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

    toggle_select_text()
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
    e.preventDefault()

    let item_names = plate_items.map( (item, index) => { 
        if( index === plate_items.length - 1) {
            return " and " + item.name 
        }
        else {
            return " " + item.name
        }
    })

    alert(`Looks like we have an order for${item_names}.\n Yum!`)

    bring_the_plate()
}


function toggle_checked(element) {
    if( element.checked ) { 
        element.removeAttribute('checked') 
    }
    else { 
        element.setAttribute('checked', true) 
    }

    let item = {'name': `${element.nextSibling.textContent}` , 'checked': element.checked}

    toggle_select_text()
    update_storage(item)
}


function toggle_select_text() {
    let boxes = form.querySelectorAll('input[type="checkbox"]')
    let checked = form.querySelectorAll('input:checked')

    // Text
    if( boxes.length === checked.length ) { 
        select_btn.textContent = "Deselect All"
    }
    else {
        select_btn.textContent = "Select All"
    }
}


function toggle_selection() {
    let targets = []

    switch( select_btn.textContent ) {
        case "Select All":
            targets = Array.from( [...form.querySelectorAll('input[type="checkbox"]:not(:checked)')] )
            break;

        case "Deselect All":
            targets = Array.from( [...form.querySelectorAll('input[type="checkbox"]:checked')] )
            break;

        default:
            console.log("HEY! Issue with the functions: toggle_selection && toggle_select_text. \n Make sure that the button text fits the cases")
    }

    if( targets.length > 0 ) { 
        targets.forEach( (target) => { toggle_checked(target) })
    }
}


function update_storage(item) {
    index = plate_items.findIndex( (obj) => { return obj.name == item.name});

    if( index > -1 ) { 
        plate_items[index].checked = item.checked 
    }
    else { 
        plate_items.push(item) 
    }

    localStorage.clear()
    localStorage.setItem('plate_items', JSON.stringify(plate_items))
}










//Events
previous_session()

form.addEventListener('submit', add_to_plate)

select_btn.addEventListener('click', toggle_selection)

submit_btn.addEventListener('click', send_order)

removal_btn.addEventListener('click', remove_selected)


