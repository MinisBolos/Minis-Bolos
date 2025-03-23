// Salvar dados no localStorage
function saveToLocalStorage(key, data) {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(key, serializedData);
        
        // Disparar evento de atualização de dados
        const updateEvent = new CustomEvent('storage-updated', { 
            detail: { key, data }
        });
        window.dispatchEvent(updateEvent);
        
        return true;
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        return false;
    }
}

// Carregar dados do localStorage
function loadFromLocalStorage(key, defaultValue = null) {
    try {
        const serializedData = localStorage.getItem(key);
        if (serializedData === null) {
            return defaultValue;
        }
        return JSON.parse(serializedData);
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        return defaultValue;
    }
}

// Chaves de armazenamento
const STORAGE_KEYS = {
    CAKES: 'doces_delicias_cakes',
    LOGO: 'doces_delicias_logo',
    SHOP_NAME: 'doces_delicias_shop_name'
};

// Salvar bolos
function saveCakes(cakes) {
    return saveToLocalStorage(STORAGE_KEYS.CAKES, cakes);
}

// Carregar bolos
function loadCakes() {
    return loadFromLocalStorage(STORAGE_KEYS.CAKES, [
        { 
            id: 1, 
            name: 'Chocolate', 
            price: 45.00, 
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
            description: 'Bolo de chocolate macio com cobertura de ganache, decorado com raspas de chocolate belga. Perfeito para os amantes de chocolate.'
        },
        { 
            id: 2, 
            name: 'Morango', 
            price: 40.00, 
            image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500',
            description: 'Bolo leve de baunilha recheado com morangos frescos e cobertura de chantilly. Uma opção refrescante e deliciosa.'
        },
        { 
            id: 3, 
            name: 'Baunilha', 
            price: 35.00, 
            image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500',
            description: 'Clássico bolo de baunilha com massa fofa e cobertura de buttercream. Simples e irresistível para qualquer ocasião.'
        },
        { 
            id: 4, 
            name: 'Red Velvet', 
            price: 50.00, 
            image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500',
            description: 'Bolo vermelho aveludado com recheio e cobertura de cream cheese. Uma combinação sofisticada de sabores.'
        }
    ]);
}

// Salvar logo
function saveLogo(logoUrl) {
    return saveToLocalStorage(STORAGE_KEYS.LOGO, logoUrl);
}

// Carregar logo
function loadLogo() {
    return loadFromLocalStorage(STORAGE_KEYS.LOGO, null);
}

// Salvar nome da loja (mantido por compatibilidade)
function saveShopName(name) {
    return saveToLocalStorage(STORAGE_KEYS.SHOP_NAME, name);
}

// Carregar nome da loja (mantido por compatibilidade)
function loadShopName() {
    return loadFromLocalStorage(STORAGE_KEYS.SHOP_NAME, 'Doces Delícias');
}

// Registrar ouvinte para atualizações de armazenamento entre guias/janelas
window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEYS.CAKES || 
        event.key === STORAGE_KEYS.LOGO || 
        event.key === STORAGE_KEYS.SHOP_NAME) {
        
        // Disparar evento de atualização
        const updateEvent = new CustomEvent('storage-updated', { 
            detail: { key: event.key, data: JSON.parse(event.newValue) }
        });
        window.dispatchEvent(updateEvent);
    }
});
