function WhatsAppButton({ phoneNumber }) {
    try {
        const formattedPhone = phoneNumber.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${formattedPhone}`;
        
        return (
            <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-name="whatsapp-button"
                className="whatsapp-button fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors z-40"
                aria-label="Contato via WhatsApp"
            >
                <i className="fab fa-whatsapp text-2xl"></i>
            </a>
        );
    } catch (error) {
        console.error('Erro no componente WhatsAppButton:', error);
        reportError(error);
        return null;
    }
}
