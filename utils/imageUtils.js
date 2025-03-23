// Converter arquivo de imagem para Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('Nenhum arquivo fornecido'));
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Redimensionar e comprimir imagem antes de converter para Base64
function resizeAndCompressImage(file, maxWidth = 1000, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('Nenhum arquivo fornecido'));
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                // Calcular novas dimensões mantendo proporção
                let width = img.width;
                let height = img.height;
                
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height * maxWidth / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width * maxHeight / height);
                        height = maxHeight;
                    }
                }
                
                // Criar canvas para redimensionar
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                
                // Desenhar imagem redimensionada
                const ctx = canvas.getContext('2d');
                
                // Limpar o canvas com fundo transparente
                ctx.clearRect(0, 0, width, height);
                
                // Desenhar a imagem
                ctx.drawImage(img, 0, 0, width, height);
                
                // Formato de saída baseado no tipo de arquivo
                // Use PNG para preservar transparência se for PNG
                const outputFormat = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                const dataUrl = canvas.toDataURL(outputFormat, quality);
                resolve(dataUrl);
            };
            img.onerror = error => reject(error);
        };
        reader.onerror = error => reject(error);
    });
}

// Validar se o arquivo é uma imagem
function validateImageFile(file) {
    // Verificar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            message: 'Formato de arquivo inválido. Use JPEG, PNG, GIF ou WebP.'
        };
    }
    
    // Verificar tamanho (máximo 10MB)
    const maxSize = 10 * 2000 * 2000; // 10MB em bytes
    if (file.size > maxSize) {
        return {
            valid: false,
            message: 'Arquivo muito grande. O tamanho máximo é 10MB.'
        };
    }
    
    return { valid: true };
}
