import axios from 'axios'

const saveCartItemsToDatabase = async (cartItems, user) => {

    const data = { user, cartItems }

    await axios({
                        method: 'post',
                        url: '/save-cart-to-db',
                        data: data
                    })
}

export default saveCartItemsToDatabase