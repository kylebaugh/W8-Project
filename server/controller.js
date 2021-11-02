const destinations = require('./db.json');
let globalID = 4


module.exports = {
    getDestinations: (req, res) => res.status(200).send(destinations),

    deleteDestination: (req, res) =>{
        let index = destinations.findIndex(elem => elem.id === +req.params.id)
        destinations.splice(index, 1)
        res.status(200).send(destinations)
    },

    createDestination: (req, res) => {
        let {destination, price, imageURL} = req.body
        let newDestination = {
            id: globalID,
            destination,
            price,
            imageURL
        }
        destinations.push(newDestination)
        res.status(200).send(destinations)
        globalID++
    },

    updateDestination: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        
        let index = destinations.findIndex(elem => +elem.id === +id)

        if (destinations[index].price - 50 < 0 && type === 'minus') {
            res.status(200).send('cant go below zero')
        } else if (type === 'minus') {
            destinations[index].price = +destinations[index].price - 50
            res.status(200).send(destinations)
        } else if (type === 'plus') {
            destinations[index].price = +destinations[index].price + 50
            res.status(200).send(destinations)
        } else {
            res.sendStatus(400).send('you messed up')
        }
    }
}