function AdminPanel({ onClose }) {
    try {
        const [activeTab, setActiveTab] = React.useState('cakes');
        const [cakes, setCakes] = React.useState([]);
        const [editingCake, setEditingCake] = React.useState(null);
        const [isAddingCake, setIsAddingCake] = React.useState(false);
        const [isEditingLogo, setIsEditingLogo] = React.useState(false);
        const [isShareCatalogOpen, setIsShareCatalogOpen] = React.useState(false);
        
        React.useEffect(() => {
            // Carregar bolos do localStorage
            const savedCakes = loadCakes();
            setCakes(savedCakes);
        }, []);
        
        const handleSaveCakes = (updatedCakes) => {
            setCakes(updatedCakes);
            saveCakes(updatedCakes);
        };
        
        const handleAddCake = () => {
            setIsAddingCake(true);
            setEditingCake(null);
        };
        
        const handleEditCake = (cake) => {
            setEditingCake(cake);
            setIsAddingCake(false);
        };
        
        const handleDeleteCake = (cakeId) => {
            if (window.confirm('Tem certeza que deseja excluir este bolo?')) {
                const updatedCakes = cakes.filter(cake => cake.id !== cakeId);
                handleSaveCakes(updatedCakes);
            }
        };
        
        const handleCakeSave = (cakeData) => {
            let updatedCakes;
            
            if (editingCake) {
                // Atualizando bolo existente
                updatedCakes = cakes.map(cake => 
                    cake.id === editingCake.id ? { ...cakeData, id: cake.id } : cake
                );
            } else {
                // Adicionando novo bolo
                const newId = cakes.length > 0 
                    ? Math.max(...cakes.map(cake => cake.id)) + 1 
                    : 1;
                updatedCakes = [...cakes, { ...cakeData, id: newId }];
            }
            
            handleSaveCakes(updatedCakes);
            setIsAddingCake(false);
            setEditingCake(null);
        };
        
        const handleCakeFormCancel = () => {
            setIsAddingCake(false);
            setEditingCake(null);
        };
        
        const handleEditLogo = () => {
            setIsEditingLogo(true);
        };
        
        const handleLogoSave = () => {
            setIsEditingLogo(false);
        };
        
        const handleLogoCancel = () => {
            setIsEditingLogo(false);
        };
        
        const handleShareCatalog = () => {
            setIsShareCatalogOpen(true);
        };
        
        const handleShareCatalogClose = () => {
            setIsShareCatalogOpen(false);
        };

        if (isAddingCake || editingCake) {
            return (
                <CakeForm 
                    cake={editingCake} 
                    onSave={handleCakeSave} 
                    onCancel={handleCakeFormCancel} 
                />
            );
        }
        
        if (isEditingLogo) {
            return (
                <LogoForm 
                    onSave={handleLogoSave} 
                    onCancel={handleLogoCancel} 
                />
            );
        }
        
        if (isShareCatalogOpen) {
            return (
                <CatalogShare 
                    onClose={handleShareCatalogClose} 
                />
            );
        }

        return (
            <div data-name="admin-panel" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold">Painel de Administração</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <i className="fas fa-times text-lg"></i>
                        </button>
                    </div>
                    
                    <div className="flex border-b">
                        <button 
                            className={`px-4 py-2 ${activeTab === 'cakes' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('cakes')}
                        >
                            Bolos
                        </button>
                        <button 
                            className={`px-4 py-2 ${activeTab === 'logo' ? 'border-b-2 border-amber-500 text-amber-500' : 'text-gray-600'}`}
                            onClick={() => setActiveTab('logo')}
                        >
                            Logo
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-auto p-4">
                        {activeTab === 'cakes' && (
                            <div>
                                <div className="flex justify-between mb-4">
                                    <h3 className="text-lg font-medium">Gerenciar Bolos</h3>
                                    <div className="flex space-x-2">
                                        <button 
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                            onClick={handleShareCatalog}
                                        >
                                            <i className="fas fa-share-alt mr-2"></i>Compartilhar Catálogo
                                        </button>
                                        <button 
                                            className="bg-amber-500 text-white px-3 py-1 rounded-md"
                                            onClick={handleAddCake}
                                        >
                                            <i className="fas fa-plus mr-2"></i>Adicionar Bolo
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cakes.map(cake => (
                                        <div key={cake.id} className="border rounded-lg p-3 flex">
                                            <img 
                                                src={cake.image} 
                                                alt={cake.name} 
                                                className="w-20 h-20 object-cover rounded-md mr-3"
                                            />
                                            <div className="flex-grow">
                                                <h4 className="font-medium">{cake.name}</h4>
                                                <p className="text-amber-500">R$ {cake.price.toFixed(2)}</p>
                                                <p className="text-gray-500 text-sm line-clamp-2">{cake.description}</p>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <button 
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEditCake(cake)}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteCake(cake.id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {cakes.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <i className="fas fa-birthday-cake text-4xl mb-2"></i>
                                        <p>Nenhum bolo cadastrado. Clique em "Adicionar Bolo" para começar.</p>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {activeTab === 'logo' && (
                            <div>
                                <div className="flex justify-between mb-4">
                                    <h3 className="text-lg font-medium">Logo da Loja</h3>
                                    <button 
                                        className="bg-amber-500 text-white px-3 py-1 rounded-md"
                                        onClick={handleEditLogo}
                                    >
                                        <i className="fas fa-edit mr-2"></i>Editar
                                    </button>
                                </div>
                                
                                <div className="flex flex-col items-center p-6 border rounded-lg">
                                    <div className="flex items-center mb-6">
                                        {loadLogo() ? (
                                            <img 
                                                src={loadLogo()} 
                                                alt="Logo da loja" 
                                                className="h-24 w-24 object-contain"
                                            />
                                        ) : (
                                            <i className="fas fa-birthday-cake text-amber-500 text-5xl"></i>
                                        )}
                                    </div>
                                    
                                    <p className="text-gray-500 text-center">
                                        Clique no botão "Editar" para alterar o logo da loja.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="border-t p-4">
                        <button 
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Erro no componente AdminPanel:', error);
        reportError(error);
        return null;
    }
}
