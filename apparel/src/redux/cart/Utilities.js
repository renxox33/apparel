export const addItemToCart = (cart, itemToAdd) => {
    console.log(itemToAdd)

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