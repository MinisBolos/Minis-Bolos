function CakeForm({ cake = null, onSave, onCancel }) {
    try {
        const [formData, setFormData] = React.useState({
            name: cake ? cake.name : '',
            price: cake ? cake.price : '',
            description: cake ? cake.description : '',
            image: cake ? cake.image : ''
        });
        const [imagePreview, setImagePreview] = React.useState(cake ? cake.image : '');
        const [error, setError] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(false);
        
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };
        
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
                const resizedImage = await resizeAndCompressImage(file);
                setImagePreview(resizedImage);
                setFormData(prev => ({ ...prev, image: resizedImage }));
            } catch (err) {
                setError('Erro ao processar a imagem. Tente novamente.');
                console.error('Erro ao processar a imagem:', err);
            } finally {
                setIsLoading(false);
            }
        };
        
        const handleSubmit = (e) => {
            e.preventDefault();
            
            // Validações
            if (!formData.name.trim()) {
                setError('Nome do bolo é obrigatório');
                return;
            }
            
            if (!formData.price || formData.price <= 0) {
                setError('Preço deve ser maior que zero');
                return;
            }
            
            if (!formData.description.trim()) {
                setError('Descrição é obrigatória');
                return;
            }
            
            if (!formData.image) {
                setError('Imagem é obrigatória');
                return;
            }
            
            // Salvar dados
            onSave({
                ...formData,
                price: parseFloat(formData.price)
            });
        };

        return (
            <div data-name="cake-form" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold">
                            {cake ? 'Editar Bolo' : 'Adicionar Novo Bolo'}
                        </h2>
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
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Nome do Bolo</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Preço (R$)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Descrição</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Imagem</label>
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
                                
                                {imagePreview && (
                                    <div className="mt-4 border rounded-md p-2">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="h-40 object-contain mx-auto"
                                        />
                                    </div>
                                )}
                                
                                <div className="mt-2">
                                    <label className="text-sm text-gray-700">URL da imagem</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="Ou insira uma URL de imagem"
                                        className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                    />
                                </div>
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
                            {isLoading ? 'Processando...' : 'Salvar'}
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente CakeForm:', error);
        reportError(error);
        return null;
    }
}
