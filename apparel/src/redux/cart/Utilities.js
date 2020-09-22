export const addItemToCart = (cart, itemToAdd) => {
    //check if itemToAdd already exists in cart
    const alreadyExists = cart.find(item => item.id === itemToAdd.id)
    if(alreadyExists){
        return cart.map(item => {
            if(item.id === itemToAdd.id){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            } else{
                return {
                    ...item
                }
            }
        })
    } 

    //if it does, increase the quantity of that item in cart, otherwise add a new object item to cart
    return [ ...cart, { ...itemToAdd, quantity: 1 }]  
}

export const decreaseItemQuantityFromCart = (cart, itemToDecrease) => {
    //check if itemToDecrease is in cart
    var deleteRequired = false
    var newCart
    const itemExists = cart.find(item => item.id === itemToDecrease.id)
    if(itemExists){
    //item exists, check the quantity
    // eslint-disable-next-line 
        newCart = cart.map(item => {
            if(item.id === itemToDecrease.id){
                if(item.quantity > 1){
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                } else if(item.quantity === 1){ 
                    deleteRequired = true
                    return {
                        ...item
                    }
                }
            } else{
                return{
                    ...item
                }
            }
        })

        if(deleteRequired){
          newCart = cart.filter(item => item.id !== itemToDecrease.id)
        }
    }

    return newCart
}

export const removeItemFromCart = (cart, itemToRemove) => {

    return cart.filter(item => item.id !== itemToRemove.id )
}