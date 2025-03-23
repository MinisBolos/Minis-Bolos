function CatalogShare({ onClose }) {
    try {
        const [catalogLink, setCatalogLink] = React.useState('');
        const [copied, setCopied] = React.useState(false);
        const [whatsappMessage, setWhatsappMessage] = React.useState('');
        const [error, setError] = React.useState('');
        
        React.useEffect(() => {
            // Gerar link do catálogo
            const currentUrl = window.location.href.split('?')[0]; // Remove qualquer parâmetro existente
            const catalogUrl = `${currentUrl}?catalog=true`;
            setCatalogLink(catalogUrl);
            
            // Gerar mensagem para WhatsApp
            const shopName = loadShopName();
            const message = `Olá! Confira nosso catálogo de bolos deliciosos. Clique no link: ${catalogUrl}`;
            setWhatsappMessage(encodeURIComponent(message));
        }, []);
        
        const handleCopyLink = () => {
            try {
                navigator.clipboard.writeText(catalogLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                setError('Não foi possível copiar o link. Por favor, copie manualmente.');
                console.error('Erro ao copiar para área de transferência:', err);
            }
        };
        
        const handleWhatsAppShare = () => {
            const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        };
        
        const handleQRCodeDownload = () => {
            try {
                const canvas = document.getElementById('catalog-qrcode');
                if (canvas) {
                    const link = document.createElement('a');
                    link.download = 'catalogo-bolos-qrcode.png';
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                }
            } catch (err) {
                setError('Não foi possível baixar o QR Code. Tente novamente.');
                console.error('Erro ao baixar QR Code:', err);
            }
        };
        
        React.useEffect(() => {
            // Gerar QR Code
            if (catalogLink) {
                const qrCodeContainer = document.getElementById('catalog-qrcode-container');
                if (qrCodeContainer) {
                    qrCodeContainer.innerHTML = '';
                    const canvas = document.createElement('canvas');
                    canvas.id = 'catalog-qrcode';
                    qrCodeContainer.appendChild(canvas);
                    
                    QRCode.toCanvas(canvas, catalogLink, { 
                        width: 200,
                        margin: 2,
                        color: {
                            dark: '#000000',
                            light: '#ffffff'
                        }
                    }, function(error) {
                        if (error) {
                            console.error('Erro ao gerar QR code:', error);
                            setError('Erro ao gerar QR Code');
                        }
                    });
                }
            }
        }, [catalogLink]);

        return (
            <div data-name="catalog-share" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold">Compartilhar Catálogo</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <i className="fas fa-times text-lg"></i>
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-auto p-4">
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                                <p>{error}</p>
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">Link do Catálogo</h3>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={catalogLink}
                                    readOnly
                                    className="flex-grow p-2 border border-gray-300 rounded-l-md bg-gray-50"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className={`p-2 ${copied ? 'bg-green-500' : 'bg-amber-500'} text-white rounded-r-md transition-colors`}
                                >
                                    {copied ? (
                                        <React.Fragment>
                                            <i className="fas fa-check mr-1"></i> Copiado
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <i className="fas fa-copy mr-1"></i> Copiar
                                        </React.Fragment>
                                    )}
                                </button>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">QR Code</h3>
                            <div className="flex flex-col items-center">
                                <div id="catalog-qrcode-container" className="bg-white p-4 rounded-lg shadow-sm mb-2"></div>
                                <button
                                    onClick={handleQRCodeDownload}
                                    className="text-amber-500 hover:text-amber-700 text-sm"
                                >
                                    <i className="fas fa-download mr-1"></i> Baixar QR Code
                                </button>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">Compartilhar via</h3>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={handleWhatsAppShare}
                                    className="flex flex-col items-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    <i className="fab fa-whatsapp text-2xl"></i>
                                    <span className="text-xs mt-1">WhatsApp</span>
                                </button>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(catalogLink)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <i className="fab fa-facebook text-2xl"></i>
                                    <span className="text-xs mt-1">Facebook</span>
                                </a>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                            <p className="text-blue-700 text-sm">
                                <i className="fas fa-info-circle mr-1"></i>
                                Quando os clientes acessarem este link, verão apenas o catálogo de produtos, sem opções de administração.
                            </p>
                        </div>
                    </div>
                    
                    <div className="border-t p-4">
                        <button 
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 w-full"
                            onClick={onClose}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente CatalogShare:', error);
        reportError(error);
        return null;
    }
}
