const mongoose = require('mongoose')

const ShopItemsSchema = new mongoose.Schema({
    hats: Object,
    sneakers: Object,
    jackets: Object,
    her: Object,
    him: Object

})

module.exports = mongoose.model('ca_shop_item', ShopItemsSchema)