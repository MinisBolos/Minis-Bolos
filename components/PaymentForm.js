function PaymentForm({ orderData, cartItems, onSubmit, onPixSelected, onBackClick }) {
    try {
        const [paymentMethod, setPaymentMethod] = React.useState('');
        const [changeAmount, setChangeAmount] = React.useState('');
        const [showCardFeeWarning, setShowCardFeeWarning] = React.useState(false);

        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Calcular o total com a taxa da maquininha se for cartão
        const cardFee = 1.50;
        const totalWithCardFee = paymentMethod === 'credit' || paymentMethod === 'debit' 
            ? totalPrice + cardFee 
            : totalPrice;

        React.useEffect(() => {
            // Mostrar aviso de taxa quando selecionar cartão
            setShowCardFeeWarning(paymentMethod === 'credit' || paymentMethod === 'debit');
        }, [paymentMethod]);

        const handleSubmit = (e) => {
            e.preventDefault();
            
            if (paymentMethod === 'pix') {
                onPixSelected({
                    paymentMethod,
                    changeAmount: null,
                    cardFee: null
                });
            } else {
                onSubmit({
                    paymentMethod,
                    changeAmount: paymentMethod === 'money' ? changeAmount : null,
                    cardFee: (paymentMethod === 'credit' || paymentMethod === 'debit') ? cardFee : null
                });
            }
        };

        return (
            <div data-name="payment-form" className="container mx-auto px-4 py-8 max-w-md">
                <div className="flex items-center mb-4">
                    <button 
                        data-name="back-button"
                        onClick={onBackClick}
                        className="text-amber-500 hover:text-amber-700 mr-2"
                    >
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h2 data-name="form-title" className="text-2xl font-bold text-gray-800">Forma de Pagamento</h2>
                </div>
                
                <div data-name="order-summary" className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <h3 className="font-medium text-gray-700 mb-2">Resumo do Pedido</h3>
                    <ul className="space-y-2 mb-3">
                        {cartItems.map(item => (
                            <li key={item.id} className="flex justify-between text-sm">
                                <div className="flex-grow">
                                    <span>{item.name} x {item.quantity}</span>
                                    <p className="text-gray-500 text-xs line-clamp-1">{item.description}</p>
                                </div>
                                <span className="ml-2">R$ {(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    
                    {showCardFeeWarning && (
                        <div className="flex justify-between text-sm border-t pt-2">
                            <span>Taxa da maquininha:</span>
                            <span>R$ {cardFee.toFixed(2)}</span>
                        </div>
                    )}
                    
                    <div className="border-t pt-2 font-bold flex justify-between mt-2">
                        <span>Total:</span>
                        <span className="text-amber-500">R$ {totalWithCardFee.toFixed(2)}</span>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                id="pix"
                                name="paymentMethod"
                                value="pix"
                                checked={paymentMethod === 'pix'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                required
                                className="h-4 w-4 text-amber-500"
                            />
                            <label htmlFor="pix" className="text-gray-700">PIX</label>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                id="credit"
                                name="paymentMethod"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-amber-500"
                            />
                            <label htmlFor="credit" className="text-gray-700">Cartão de Crédito</label>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                id="debit"
                                name="paymentMethod"
                                value="debit"
                                checked={paymentMethod === 'debit'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-amber-500"
                            />
                            <label htmlFor="debit" className="text-gray-700">Cartão de Débito</label>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <input
                                type="radio"
                                id="money"
                                name="paymentMethod"
                                value="money"
                                checked={paymentMethod === 'money'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-amber-500"
                            />
                            <label htmlFor="money" className="text-gray-700">Dinheiro</label>
                        </div>
                    </div>

                    {showCardFeeWarning && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-700">
                            <p><i className="fas fa-info-circle mr-1"></i> Para pagamento com cartão de crédito ou débito, há uma taxa fixa de R$ 1,50 da maquininha.</p>
                        </div>
                    )}

                    {paymentMethod === 'money' && (
                        <div>
                            <label className="block text-gray-700 mb-2">Valor para Troco</label>
                            <input
                                type="number"
                                value={changeAmount}
                                onChange={(e) => setChangeAmount(e.target.value)}
                                required
                                min={totalPrice}
                                step="0.01"
                                className="input-field w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Digite o valor para troco"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-2 px-4 rounded-md button-primary"
                    >
                        {paymentMethod === 'pix' ? 'Pagar com PIX' : 'Finalizar Pedido'}
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente PaymentForm:', error);
        reportError(error);
        return null;
    }
}
