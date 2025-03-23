function LogoForm({ onSave, onCancel }) {
    try {
        const [logoImage, setLogoImage] = React.useState(loadLogo());
        const [imagePreview, setImagePreview] = React.useState(loadLogo());
        const [error, setError] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(false);
        
        const handleImageChange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            // Validar imagem
            const validation = validateImageFile(file);
            if (!validation.valid) {
                setError(validation.message);
                return;
            }
            
            setIsLoading(true);
            setError('');
            
            try {
                // Redimensionar e comprimir imagem
                const resizedImage = await resizeAndCompressImage(file, 400, 400, 0.9);
                setImagePreview(resizedImage);
                setLogoImage(resizedImage);
            } catch (err) {
                setError('Erro ao processar a imagem. Tente novamente.');
                console.error('Erro ao processar a imagem:', err);
            } finally {
                setIsLoading(false);
            }
        };
        
        const handleRemoveLogo = () => {
            setLogoImage(null);
            setImagePreview(null);
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            
            // Salvar dados
            saveLogo(logoImage);
            onSave();
            
            // Não é mais necessário recarregar a página, pois as atualizações são detectadas automaticamente
        };

        return (
            <div data-name="logo-form" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold">Editar Logo da Loja</h2>
                        <button 
                            onClick={onCancel}
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
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Logo</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full"
                                    />
                                    {isLoading && (
                                        <div className="loading-spinner"></div>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    Formatos aceitos: JPEG, PNG, GIF, WebP. Tamanho máximo: 5MB
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <strong>Dica:</strong> Use uma imagem com fundo transparente (PNG) para melhor aparência.
                                </p>
                            </div>
                            
                            <div className="mb-6 flex flex-col items-center">
                                <div className="preview-container border rounded-md p-4 w-full flex flex-col items-center">
                                    <h3 className="text-gray-700 mb-3">Visualização</h3>
                                    <div className="bg-white p-3 rounded-md">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Logo preview" 
                                                className="h-24 w-24 object-contain"
                                            />
                                        ) : (
                                            <div className="h-24 w-24 bg-gray-200 rounded-md flex items-center justify-center">
                                                <i className="fas fa-birthday-cake text-gray-400 text-3xl"></i>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {imagePreview && (
                                        <button 
                                            type="button"
                                            onClick={handleRemoveLogo}
                                            className="mt-3 text-red-500 text-sm flex items-center"
                                        >
                                            <i className="fas fa-trash-alt mr-1"></i>
                                            Remover logo
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <p className="text-sm text-gray-500">
                                    <i className="fas fa-info-circle mr-1"></i>
                                    O logo aparecerá no cabeçalho da loja e em outros elementos visuais.
                                </p>
                            </div>
                        </form>
                    </div>
                    
                    <div className="border-t p-4 flex justify-between">
                        <button 
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>
                        <button 
                            className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente LogoForm:', error);
        reportError(error);
        return null;
    }
}
