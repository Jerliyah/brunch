// DOM Grab
const form = document.querySelector('form');
const list = form.querySelector('ul.plate-list');
const input = form.querySelector('input.plate-item');
const submit = document.querySelector('button.send');
const selection = form.querySelector('button.selection');
const removal = form.querySelector('button.removal');



// Variables
var plate_items = [];


// Functions
function add_to_plate(e) {
    e.preventDefault()

    let item = {'name': input.value, 'checked': false}

    update_storage(item)

    populate_list(item, list)

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


function remove_selected(e) {
    e.preventDefault()
    let selected = Array.from( [...document.querySelectorAll('input:checked')].nextSibling )
    console.log(selected)
}


function send_order(e) {
    alert("Yum!")
}


function toggle_checked(element) {
    if( element.checked ) { element.removeAttribute('checked') }
    else { element.setAttribute('checked', true) }

    let item = {'name': `${element.nextSibling.textContent}` , 'checked': `${element.checked}`}
    update_storage(item)
}


function update_storage(item) {

    index = plate_items.findIndex( (obj) => { return obj.name == item.name});
    console.log(index)
    if( index > -1 ) { plate_items[index].checked = item.checked }
    else { plate_items.push(item) }

    localStorage.clear()
    localStorage.setItem('plate_items', JSON.stringify(plate_items))
}








//Events
previous_session()

form.addEventListener('submit', add_to_plate)

submit.addEventListener('click', send_order)

removal.addEventListener('click', remove_selected)


