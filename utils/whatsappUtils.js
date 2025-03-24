// Formatar mensagem para WhatsApp
function formatWhatsAppMessage(orderData, cartItems) {
    try {
        const { delivery, payment } = orderData;
        
        // Formatar itens do pedido
        const itemsList = cartItems.map(item => 
            `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        // Calcular total
        let total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Adicionar taxa de cartão se aplicável
        let taxInfo = '';
        if (payment.cardFee) {
            taxInfo = `\nTaxa da maquininha: R$ ${payment.cardFee.toFixed(2)}`;
            total += payment.cardFee;
        }
        
        // Formatar endereço
        const address = `${delivery.address}, ${delivery.number}${delivery.complement ? ', ' + delivery.complement : ''}`;
        
        // Formatar informações de pagamento
        let paymentInfo = '';
        switch(payment.paymentMethod) {
            case 'money':
                paymentInfo = `Dinheiro (Troco para: R$ ${payment.changeAmount})`;
                break;
            case 'pix':
                paymentInfo = 'PIX (Pagamento confirmado)';
                break;
            case 'credit':
                paymentInfo = 'Cartão de Crédito';
                break;
            case 'debit':
                paymentInfo = 'Cartão de Débito';
                break;
            default:
                paymentInfo = payment.paymentMethod;
        }
        
        // Montar mensagem completa
        const message = `*Novo Pedido - Minis Bolos*
        
*Itens do Pedido:*
${itemsList}${taxInfo}

*Total:* R$ ${total.toFixed(2)}

*Dados para Entrega:*
Nome: ${delivery.name}
Endereço: ${address}
Ponto de Referência: ${delivery.reference || 'Não informado'}

*Pagamento:* ${paymentInfo}

Obrigado pela preferência! 😊 Seu Pedido Sai em 10 Minutos `;

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
