const inventoryAction = require('./Types')

const loadInventory = (inventory) => {

    return{
        type: inventoryAction.LOAD_INVENTORY,
        payload: inventory
    }
}

module.exports = loadInventory