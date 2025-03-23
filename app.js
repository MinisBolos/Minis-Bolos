function App() {
    try {
        const [step, setStep] = React.useState(1);
        const [cartItems, setCartItems] = React.useState([]);
        const [isCartOpen, setIsCartOpen] = React.useState(false);
        const [orderData, setOrderData] = React.useState({
            delivery: null,
            payment: null
        });
        const [isAdminOpen, setIsAdminOpen] = React.useState(false);
        const [isCatalogMode, setIsCatalogMode] = React.useState(false);
        
        // Número de WhatsApp da empresa
        const companyWhatsApp = "5521971550633"; // Formato internacional sem símbolos

        // Verificar se está no modo catálogo
        React.useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('catalog') === 'true') {
                setIsCatalogMode(true);
            }
        }, []);

        const handleAddToCart = (cake) => {
            setCartItems(addItemToCart(cartItems, cake));
        };

        const handleUpdateQuantity = (itemId, newQuantity) => {
            setCartItems(updateItemQuantity(cartItems, itemId, newQuantity));
        };

        const handleCartClick = () => {
            setIsCartOpen(true);
        };

        const handleCloseCart = () => {
            setIsCartOpen(false);
        };

        const handleCheckout = () => {
            if (cartItems.length > 0) {
                setIsCartOpen(false);
                setStep(2);
            }
        };

        const handleDeliverySubmit = (deliveryData) => {
            setOrderData(prev => ({ ...prev, delivery: deliveryData }));
            setStep(3);
        };

        const handlePaymentSubmit = (paymentData) => {
            setOrderData(prev => ({ ...prev, payment: paymentData }));
            
            // Se o pagamento for em dinheiro, redirecionar para WhatsApp
            if (paymentData.paymentMethod === 'money') {
                alert('Pedido realizado com sucesso! Redirecionando para o WhatsApp...');
                setTimeout(() => {
                    openWhatsApp(
                        {...orderData, payment: paymentData}, 
                        cartItems, 
                        companyWhatsApp
                    );
                    resetOrder();
                }, 1000);
            }
        };
        
        const handlePixSelected = (paymentData) => {
            setOrderData(prev => ({ ...prev, payment: paymentData }));
            setStep(4); // Ir para tela de pagamento PIX
        };
        
        const handlePixPaymentComplete = () => {
            // Redirecionar para WhatsApp após pagamento PIX confirmado
            alert('Pagamento confirmado! Redirecionando para o WhatsApp...');
            setTimeout(() => {
                openWhatsApp(orderData, cartItems, companyWhatsApp);
                resetOrder();
            }, 1000);
        };
        
        const resetOrder = () => {
            setStep(1);
            setCartItems([]);
            setOrderData({ delivery: null, payment: null });
        };

        const handleBackFromDelivery = () => {
            setStep(1);
        };
        
        const handleBackFromPayment = () => {
            setStep(2);
        };
        
        const handleBackFromPix = () => {
            setStep(3);
        };
        
        // Funções para administração
        const handleOpenAdmin = () => {
            setIsAdminOpen(true);
        };
        
        const handleCloseAdmin = () => {
            setIsAdminOpen(false);
        };
        
        // Tecla de atalho para abrir painel admin (Ctrl+Shift+A)
        React.useEffect(() => {
            const handleKeyDown = (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                    setIsAdminOpen(true);
                }
            };
            
            window.addEventListener('keydown', handleKeyDown);
            
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, []);

        return (
            <div data-name="app-container" className="min-h-screen bg-gray-50">
                <Header 
                    cartItems={cartItems} 
                    onCartClick={handleCartClick} 
                    onAdminClick={handleOpenAdmin} 
                    isCatalogMode={isCatalogMode}
                />
                <main className="page-transition">
                    {step === 1 && <CakeList onAddToCart={handleAddToCart} />}
                    {step === 2 && <DeliveryForm cartItems={cartItems} onSubmit={handleDeliverySubmit} onBackClick={handleBackFromDelivery} />}
                    {step === 3 && (
                        <PaymentForm 
                            orderData={orderData} 
                            cartItems={cartItems} 
                            onSubmit={handlePaymentSubmit}
                            onPixSelected={handlePixSelected}
                            onBackClick={handleBackFromPayment}
                        />
                    )}
                    {step === 4 && (
                        <PixPayment 
                            orderData={orderData} 
                            cartItems={cartItems} 
                            onPaymentComplete={handlePixPaymentComplete} 
                            onBackClick={handleBackFromPix}
                        />
                    )}
                </main>
                <Cart 
                    isOpen={isCartOpen} 
                    onClose={handleCloseCart} 
                    cartItems={cartItems} 
                    onUpdateQuantity={handleUpdateQuantity} 
                    onCheckout={handleCheckout} 
                />
                <WhatsAppButton phoneNumber={companyWhatsApp.substring(2)} />
                {isAdminOpen && !isCatalogMode && <AdminPanel onClose={handleCloseAdmin} />}
                
                {isCatalogMode && (
                    <div className="fixed bottom-0 left-0 right-0 text-white p-2 text-center" style={{backgroundColor: '#361f64'}}>
                        <p className="text-sm">
                            Você está visualizando o catálogo de produtos. Para fazer um pedido, adicione itens ao carrinho.
                        </p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Erro no componente App:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
