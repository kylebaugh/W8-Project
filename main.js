  
const destinationsContainer = document.querySelector('#destinations-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/destinations`

const destinationsCallback = ({ data: destinations }) => displayDestinations(destinations)
const errCallback = err => console.log(err)

const getAllDestinations = () => axios.get(baseURL).then(destinationsCallback).catch(errCallback)
const createDestination = body => axios.post(baseURL, body).then(destinationsCallback).catch(errCallback)
const deleteDestination = id => axios.delete(`${baseURL}/${id}`).then(destinationsCallback).catch(errCallback)
const updateDestination = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(destinationsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let destination = document.querySelector('#destination')
    let price = document.querySelector('#price')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        destination: destination.value,
        price: price.value, 
        imageURL: imageURL.value
    }

    createDestination(bodyObj)

    destination.value = ''
    price.value = ''
    imageURL.value = ''
}

function createDestinationCard(destinations) {
    const destinationCard = document.createElement('div')
    destinationCard.classList.add('destination-card')

    destinationCard.innerHTML = `<img alt='destination cover image' src=${destinations.imageURL} class="destination-cover-image"/>
    <p class="destination">${destinations.destination}</p>
    <div class="btns-container">
        <button onclick="updateDestination(${destinations.id}, 'minus')">-</button>
        <p class="price">$${destinations.price}</p>
        <button onclick="updateDestination(${destinations.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteDestination(${destinations.id})">Delete</button>
    `


    destinationsContainer.appendChild(destinationCard)
}

function displayDestinations(arr) {
    destinationsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createDestinationCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllDestinations()
