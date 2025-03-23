function CartIcon({ itemCount, onClick }) {
    try {
        return (
            <div 
                data-name="cart-icon" 
                className="relative cursor-pointer" 
                onClick={onClick}
            >
                <i className="fas fa-shopping-cart text-white text-2xl"></i>
                {itemCount > 0 && (
                    <span 
                        data-name="cart-badge"
                        className="cart-badge bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                        {itemCount}
                    </span>
                )}
            </div>
        );
    } catch (error) {
        console.error('Erro no componente CartIcon:', error);
        reportError(error);
        return null;
    }
}
