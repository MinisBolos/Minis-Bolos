function CakeList({ onAddToCart }) {
    try {
        const [cakes, setCakes] = React.useState([]);
        
        React.useEffect(() => {
            // Carregar bolos do localStorage
            const savedCakes = loadCakes();
            setCakes(savedCakes);
            
            // Ouvir por atualizações nos dados
            const handleStorageUpdate = (event) => {
                if (event.detail.key === STORAGE_KEYS.CAKES) {
                    setCakes(event.detail.data);
                }
            };
            
            window.addEventListener('storage-updated', handleStorageUpdate);
            
            // Também ouvir por atualizações de outras guias/janelas
            window.addEventListener('storage', (event) => {
                if (event.key === STORAGE_KEYS.CAKES) {
                    try {
                        const updatedCakes = JSON.parse(event.newValue);
                        setCakes(updatedCakes);
                    } catch (error) {
                        console.error('Erro ao processar dados atualizados:', error);
                    }
                }
            });
            
            return () => {
                window.removeEventListener('storage-updated', handleStorageUpdate);
                window.removeEventListener('storage', handleStorageUpdate);
            };
        }, []);

        return (
            <div data-name="cake-list" className="container mx-auto px-4 py-6">
                <h2 data-name="section-title" className="text-xl font-bold text-gray-800 mb-4">Escolha seu Bolo</h2>
                <div data-name="cake-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {cakes.map((cake) => (
                        <div
                            key={cake.id}
                            data-name={`cake-card-${cake.id}`}
                            className="cake-card bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img
                                src={cake.image}
                                alt={cake.name}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">{cake.name}</h3>
                                <p className="text-amber-500 font-bold mt-1 text-sm">R$ {cake.price.toFixed(2)}</p>
                                <p className="text-gray-600 text-xs mt-1 h-16 overflow-y-auto line-clamp-3">{cake.description}</p>
                                <button
                                    className="mt-2 w-full bg-amber-500 text-white py-1 px-2 rounded-md button-primary text-sm"
                                    onClick={() => onAddToCart(cake)}
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {cakes.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Nenhum bolo disponível no momento.</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Erro no componente CakeList:', error);
        reportError(error);
        return null;
    }
}
