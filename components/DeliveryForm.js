function DeliveryForm({ cartItems, onSubmit, onBackClick }) {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            address: '',
            number: '',
            complement: '',
            reference: ''
        });

        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };

        return (
            <div data-name="delivery-form" className="container mx-auto px-4 py-8 max-w-md">
                <div className="flex items-center mb-4">
                    <button 
                        data-name="back-button"
                        onClick={onBackClick}
                        className="text-amber-500 hover:text-amber-700 mr-2"
                    >
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h2 data-name="form-title" className="text-2xl font-bold text-gray-800">Informações de Entrega</h2>
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
                    <div className="border-t pt-2 font-bold flex justify-between">
                        <span>Total:</span>
                        <span className="text-amber-500">R$ {totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input-field w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Endereço</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="input-field w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Número</label>
                        <input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                            className="input-field w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Complemento</label>
                        <input
                            type="text"
                            name="complement"
                            value={formData.complement}
                            onChange={handleChange}
                            className="input-field w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Ponto de Referência</label>
                        <input
                            type="text"
                            name="reference"
                            value={formData.reference}
                            onChange={handleChange}
                            className="input-field w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-amber-500 text-white py-2 px-4 rounded-md button-primary"
                    >
                        Continuar para Pagamento
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente DeliveryForm:', error);
        reportError(error);
        return null;
    }
}
