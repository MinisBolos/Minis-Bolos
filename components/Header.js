function Header({ cartItems, onCartClick, onAdminClick, isCatalogMode = false }) {
    try {
        const [logoUrl, setLogoUrl] = React.useState(loadLogo());
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        React.useEffect(() => {
            // Ouvir por atualizações no logo
            const handleStorageUpdate = (event) => {
                if (event.detail.key === STORAGE_KEYS.LOGO) {
                    setLogoUrl(event.detail.data);
                }
            };
            
            window.addEventListener('storage-updated', handleStorageUpdate);
            
            // Também ouvir por atualizações de outras guias/janelas
            window.addEventListener('storage', (event) => {
                if (event.key === STORAGE_KEYS.LOGO) {
                    try {
                        const updatedLogo = JSON.parse(event.newValue);
                        setLogoUrl(updatedLogo);
                    } catch (error) {
                        console.error('Erro ao processar logo atualizado:', error);
                    }
                }
            });
            
            return () => {
                window.removeEventListener('storage-updated', handleStorageUpdate);
                window.removeEventListener('storage', handleStorageUpdate);
            };
        }, []);
        
        return (
            <header data-name="header" className="bg-purple-900 shadow-md py-3" style={{backgroundColor: '#361f64'}}>
                <div data-name="header-container" className="container mx-auto px-4 flex items-center justify-between">
                    <div data-name="logo-container" className="flex items-center">
                        {logoUrl ? (
                            <img 
                                src={logoUrl} 
                                alt="Logo" 
                                className="h-00 w-20 object-contain"
                            />
                        ) : (
                            <i className="fas fa-birthday-cake text-white text-4xl"></i>
                        )}
                    </div>
                    <div className="flex items-center">
                        {!isCatalogMode && (
                            <button 
                                data-name="admin-button"
                                onClick={onAdminClick}
                                className="mr-4 text-white hover:text-amber-200"
                                title="Administração (Ctrl+Shift+A)"
                            >
                                <i className="fas fa-cog"></i>
                            </button>
                        )}
                        <CartIcon itemCount={totalItems} onClick={onCartClick} />
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Erro no componente Header:', error);
        reportError(error);
        return null;
    }
}
