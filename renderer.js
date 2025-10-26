console.log('Renderer process loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const tokenInput = document.getElementById('tokenInput');
    const tokenFile = document.getElementById('tokenFile');
    const fileName = document.getElementById('fileName');
    const checkSingleButton = document.getElementById('checkSingleButton');
    const checkFileButton = document.getElementById('checkFileButton');
    const resultsContainer = document.getElementById('resultsContainer');
    const pagination = document.getElementById('pagination');
    
    let allResults = [];
    let currentPage = 1;
    const resultsPerPage = 10;
    
    // File selection handler
    tokenFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            fileName.textContent = file.name;
        } else {
            fileName.textContent = 'Hiçbir dosya seçilmedi';
        }
    });
    
    // Check single token
    checkSingleButton.addEventListener('click', async () => {
        const token = tokenInput.value.trim();
        
        if (!token) {
            alert('Lütfen bir token girin!');
            return;
        }
        
        // Show loading state
        resultsContainer.innerHTML = '<div class="loading">Token kontrol ediliyor...</div>';
        pagination.innerHTML = '';
        
        try {
            // Call Electron backend to check token
            const result = await window.electronAPI.checkToken(token);
            allResults = [result];
            currentPage = 1;
            displayResults();
        } catch (error) {
            resultsContainer.innerHTML = `<div class="error-message">Hata: ${error.message}</div>`;
        }
    });
    
    // Check tokens from file
    checkFileButton.addEventListener('click', async () => {
        if (!tokenFile.files.length) {
            alert('Lütfen bir dosya seçin!');
            return;
        }
        
        const file = tokenFile.files[0];
        const filePath = file.path;
        
        // Show loading state
        resultsContainer.innerHTML = '<div class="loading">Token\'lar kontrol ediliyor...</div>';
        pagination.innerHTML = '';
        
        try {
            // Read file content
            const fileResult = await window.electronAPI.readFile(filePath);
            
            if (!fileResult.success) {
                resultsContainer.innerHTML = `<div class="error-message">Dosya okunamadı: ${fileResult.error}</div>`;
                return;
            }
            
            // Split tokens by line
            const tokens = fileResult.content.split('\n').map(token => token.trim()).filter(token => token.length > 0);
            
            if (tokens.length === 0) {
                resultsContainer.innerHTML = '<div class="error-message">Dosyada hiç token bulunamadı!</div>';
                return;
            }
            
            // Check all tokens
            allResults = [];
            currentPage = 1;
            
            // Process tokens in batches to avoid overwhelming
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                try {
                    const result = await window.electronAPI.checkToken(token);
                    allResults.push(result);
                } catch (error) {
                    allResults.push({
                        valid: false,
                        error: error.message,
                        token: token.substring(0, 10) + '...'
                    });
                }
                
                // Update progress
                resultsContainer.innerHTML = `<div class="loading">Token'lar kontrol ediliyor... (${i+1}/${tokens.length})</div>`;
            }
            
            displayResults();
        } catch (error) {
            resultsContainer.innerHTML = `<div class="error-message">Hata: ${error.message}</div>`;
        }
    });
    
    // Function to display results with pagination
    function displayResults() {
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        const pageResults = allResults.slice(startIndex, endIndex);
        
        if (pageResults.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">Sonuç bulunamadı.</div>';
            renderPagination();
            return;
        }
        
        resultsContainer.innerHTML = '';
        pageResults.forEach(result => {
            const card = createTokenCard(result);
            resultsContainer.appendChild(card);
        });
        
        renderPagination();
    }
    
    // Function to render pagination
    function renderPagination() {
        const totalPages = Math.ceil(allResults.length / resultsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Previous button
        paginationHTML += `
            <button id="prevPage" ${currentPage === 1 ? 'disabled' : ''}>
                Önceki
            </button>
        `;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHTML += `<button class="active">${i}</button>`;
            } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += `<button disabled>...</button>`;
            }
        }
        
        // Next button
        paginationHTML += `
            <button id="nextPage" ${currentPage === totalPages ? 'disabled' : ''}>
                Sonraki
            </button>
        `;
        
        pagination.innerHTML = paginationHTML;
        
        // Add event listeners to pagination buttons
        document.getElementById('prevPage')?.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayResults();
            }
        });
        
        document.getElementById('nextPage')?.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayResults();
            }
        });
    }
    
    // Function to go to a specific page
    window.goToPage = function(page) {
        currentPage = page;
        displayResults();
    };
    
    // Function to create token card
    function createTokenCard(result) {
        const card = document.createElement('div');
        card.className = 'token-card';
        
        if (result.valid) {
            card.innerHTML = `
                <div class="token-header">
                    ${result.avatar ? 
                        `<img src="${result.avatar}" alt="Avatar" class="token-avatar" onerror="this.style.display='none'">` : 
                        `<div class="token-avatar"></div>`}
                    <div>
                        <div class="token-username">${result.username}</div>
                        <div class="token-discriminator">#${result.discriminator}</div>
                    </div>
                    <div class="token-status valid">Geçerli</div>
                </div>
                <div class="token-details">
                    <div class="detail-item">
                        <div class="detail-label">Kullanıcı ID</div>
                        <div class="detail-value token-id">${result.id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">E-posta</div>
                        <div class="detail-value">${result.email}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Telefon</div>
                        <div class="detail-value">${result.phone}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Doğrulanmış</div>
                        <div class="detail-value">${result.verified}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Oluşturulma Tarihi</div>
                        <div class="detail-value created-at">${result.createdAt}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Nitro Durumu</div>
                        <div class="detail-value nitro-detail">${result.hasNitro}</div>
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="token-header">
                    <div class="token-avatar"></div>
                    <div>
                        <div class="token-username">Geçersiz Token</div>
                    </div>
                    <div class="token-status invalid">Geçersiz</div>
                </div>
                <div class="error-message">
                    Token geçersiz: ${result.error}
                </div>
            `;
        }
        
        return card;
    }
});