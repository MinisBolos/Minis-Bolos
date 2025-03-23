// Formatar mensagem para WhatsApp
function formatWhatsAppMessage(orderData, cartItems) {
    try {
        const { delivery, payment } = orderData;
        
        // Formatar itens do pedido
        const itemsList = cartItems.map(item => 
            `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        // Calcular total
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Formatar endereço
        const address = `${delivery.address}, ${delivery.number}${delivery.complement ? ', ' + delivery.complement : ''}`;
        
        // Formatar informações de pagamento
        const paymentInfo = payment.paymentMethod === 'money' 
            ? `Dinheiro (Troco para: R$ ${payment.changeAmount})` 
            : 'PIX (Pagamento confirmado)';
        
        // Montar mensagem completa
        const message = `*Novo Pedido - Doces Delícias*
        
*Itens do Pedido:*
${itemsList}

*Total:* R$ ${total.toFixed(2)}

*Dados para Entrega:*
Nome: ${delivery.name}
Endereço: ${address}
Ponto de Referência: ${delivery.reference || 'Não informado'}

*Pagamento:* ${paymentInfo}

Obrigado pela preferência! 😊`;

        return encodeURIComponent(message);
    } catch (error) {
        console.error('Erro ao formatar mensagem para WhatsApp:', error);
        return encodeURIComponent('Erro ao formatar mensagem do pedido.');
    }
}

// Abrir WhatsApp com mensagem pré-formatada
function openWhatsApp(orderData, cartItems, phoneNumber) {
    try {
        const message = formatWhatsAppMessage(orderData, cartItems);
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.error('Erro ao abrir WhatsApp:', error);
        alert('Erro ao abrir WhatsApp. Por favor, entre em contato diretamente pelo número (21) 97155-0633');
    }
}
