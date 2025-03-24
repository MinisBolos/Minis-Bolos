function Footer() {
    try {
        const currentYear = new Date().getFullYear();
        
        return (
            <footer data-name="footer" className="bg-purple-900 py-4 border-t" style={{backgroundColor: '#361f64'}}>
                <div className="container mx-auto px-4 text-center">
                    <p data-name="copyright" className="text-white text-sm">
                        &copy; {currentYear} Minis Bolos - Todos os direitos reservados
                    </p>
                    <p data-name="cnpj" className="text-gray-200 text-xs mt-1">
                        CNPJ: 55.276.743/0001-80
                    </p>
                    <p data-name="developer-credit" className="text-gray-200 text-xs mt-3">
                        Aplicativo criado por <span className="font-medium">Alexandro Monteiro</span>
                    </p>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Erro no componente Footer:', error);
        reportError(error);
        return null;
    }
}
