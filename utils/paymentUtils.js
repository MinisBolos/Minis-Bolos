// Gerar código de pagamento PIX (simulado)
function generatePixCode(orderData, totalAmount) {
    // Em um ambiente real, isso seria gerado por uma API de pagamento
    return {
        qrCode: `pix://00020126330014br.gov.bcb.pix0111193325817975204000053039865802BR5925ALEXANDRO MONTEIRO DOS SA6015SAO JOAO DE MER62580520SAN2025032420511399650300017br.gov.bcb.brcode01051.0.06304D183?amount=${totalAmount}`,
        expiresAt: new Date(Date.now() + 30 * 60000) // 30 minutos
    };
}
