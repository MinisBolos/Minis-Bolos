function addItemToCart(cartItems, itemToAdd) {
    try {
        const existingItem = cartItems.find(item => item.id === itemToAdd.id);
        
        if (existingItem) {
            return cartItems.map(item => 
                item.id === itemToAdd.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        
        return [...cartItems, { ...itemToAdd, quantity: 1 }];
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        return cartItems;
    }
}

function updateItemQuantity(cartItems, itemId, newQuantity) {
    try {
        if (newQuantity <= 0) {
            return cartItems.filter(item => item.id !== itemId);
        }
        
        return cartItems.map(item => 
            item.id === itemId 
                ? { ...item, quantity: newQuantity } 
                : item
        );
    } catch (error) {
        console.error('Erro ao atualizar quantidade do item:', error);
        return cartItems;
    }
}
