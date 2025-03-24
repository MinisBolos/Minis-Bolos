function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onCheckout }) {
    try {
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        if (!isOpen) return null;
        
        const handleRemoveItem = (itemId) => {
            onUpdateQuantity(itemId, 0); // Quantidade 0 remove o item
        };
        
        return (
            <div data-name="cart-container" className="fixed inset-0 z-50 flex">
                <div 
                    data-name="cart-overlay" 
                    className="cart-overlay absolute inset-0" 
                    onClick={onClose}
                ></div>
                <div 
                    data-name="cart-panel" 
                    className={`cart-panel open absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg flex flex-col`}
                >
                    <div data-name="cart-header" className="flex items-center justify-between p-4 border-b">
                        <h2 data-name="cart-title" className="text-xl font-bold text-gray-800">Seu Carrinho</h2>
                        <button 
                            data-name="close-cart-btn"
                            className="text-gray-500 hover:text-gray-700" 
                            onClick={onClose}
                        >
                            <i className="fas fa-times text-lg"></i>
                        </button>
                    </div>
                    
                    <div data-name="cart-items" className="flex-grow overflow-auto p-4">
                        {cartItems.length === 0 ? (
                            <p data-name="empty-cart-message" className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
                        ) : (
                            <ul data-name="cart-items-list" className="space-y-4">
                                {cartItems.map((item) => (
                                    <li 
                                        key={item.id} 
                                        data-name={`cart-item-${item.id}`}
                                        className="flex items-center p-2 border rounded-lg relative"
                                    >
                                        <button
                                            data-name={`remove-item-${item.id}`}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                            onClick={() => handleRemoveItem(item.id)}
                                            title="Remover item"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-16 h-16 object-cover rounded-md mr-3"
                                        />
                                        <div className="flex-grow pr-6">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-amber-500">R$ {item.price.toFixed(2)}</p>
                                            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button 
                                                data-name={`decrease-btn-${item.id}`}
                                                className="quantity-btn w-7 h-7 rounded-full border flex items-center justify-center"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <i className="fas fa-minus text-xs"></i>
                                            </button>
                                            <span data-name={`quantity-${item.id}`} className="w-6 text-center">{item.quantity}</span>
                                            <button 
                                                data-name={`increase-btn-${item.id}`}
                                                className="quantity-btn w-7 h-7 rounded-full border flex items-center justify-center"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <i className="fas fa-plus text-xs"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    <div data-name="cart-footer" className="p-4 border-t">
                        <div data-name="cart-total" className="flex justify-between mb-4">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold text-amber-500">R$ {totalPrice.toFixed(2)}</span>
                        </div>
                        <button 
                            data-name="checkout-btn"
                            className="w-full bg-amber-500 text-white py-2 px-4 rounded-md button-primary"
                            onClick={onCheckout}
                            disabled={cartItems.length === 0}
                        >
                            Finalizar Pedido
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente Cart:', error);
        reportError(error);
        return null;
    }
}
