// Gerar código de pagamento PIX (simulado)
function generatePixCode(orderData, totalAmount) {
    // Em um ambiente real, isso seria gerado por uma API de pagamento
    return {
        qrCode: `pix://docesdelicias@gmail.com?amount=${totalAmount}`,
        expiresAt: new Date(Date.now() + 30 * 60000) // 30 minutos
    };
}
