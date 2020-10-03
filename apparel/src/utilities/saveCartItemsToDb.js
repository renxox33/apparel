import axios from 'axios'

const saveCartItemsToDatabase = async (cartItems, user) => {

    const data = { user, cartItems }

    const response = await axios({
                        method: 'post',
                        url: '/save-cart-to-db',
                        data: data
                    })
    console.log(response)
}

export default saveCartItemsToDatabase