function PixPayment({ orderData, cartItems, onPaymentComplete, onBackClick }) {
    try {
        const qrCodeRef = React.useRef(null);
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Gerar dados do PIX (simulado)
        const pixData = {
            key: "55.276.743/0001-80",
            recipient: "Minis Bolos",
            amount: totalPrice,
            description: `Pedido Minis Bolos - ${cartItems.map(item => `${item.name}(${item.quantity})`).join(', ')}`
        };

        // Gerar string para QR Code do PIX
        const pixString = "00020126980014br.gov.bcb.pix0136538656ee-12d3-4646-8eda-6b351bf0ad150236Pagamento referente a compra no Site5204000053039865802BR592355276743 ALEXANDRO MONT6015Sao Joao de Mer622905255527674300000437586601ASA630413BB";

        
        React.useEffect(() => {
            // Gerar QR Code
            if (qrCodeRef.current) {
                QRCode.toCanvas(qrCodeRef.current, pixString, { width: 200 }, function (error) {
                    if (error) console.error('Erro ao gerar QR Code:', error);
                });
            }
        }, []);
        
        const handleConfirmPayment = () => {
            onPaymentComplete();
        };

        return (
            <div data-name="pix-payment" className="container mx-auto px-4 py-8 max-w-md">
                <div className="flex items-center mb-4">
                    <button 
                        data-name="back-button"
                        onClick={onBackClick}
                        className="text-amber-500 hover:text-amber-700 mr-2"
                    >
                        <i className="fas fa-arrow-left text-xl"></i>
                    </button>
                    <h2 data-name="payment-title" className="text-2xl font-bold text-gray-800">Pagamento via PIX</h2>
                </div>
                
                <div data-name="payment-card" className="bg-white p-6 rounded-lg shadow-md">
                    <div data-name="order-summary" className="mb-4">
                        <h3 className="font-medium text-gray-700 mb-2">Resumo do Pedido</h3>
                        <ul className="space-y-2 mb-3 max-h-32 overflow-y-auto">
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
                    
                    <div data-name="qr-container" className="qr-container my-6">
                        <p className="text-center mb-4">Escaneie o QR Code abaixo para pagar:</p>
                        <div className="qr-code">
                            <canvas ref={qrCodeRef}></canvas>
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Chave PIX: {pixData.key}
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                            <p className="text-blue-700 font-medium">Importante!</p>
                            <p className="text-sm text-blue-600">
                                Por favor, envie o comprovante de pagamento pelo WhatsApp após finalizar a transferência.
                            </p>
                        </div>
                        <button 
                            className="mt-3 bg-amber-500 text-white py-2 px-4 rounded-md button-primary w-full"
                            onClick={handleConfirmPayment}
                        >
                            Já realizei o pagamento
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente PixPayment:', error);
        reportError(error);
        return null;
    }
}
