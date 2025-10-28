console.log('Renderer process loaded');

// Language translations
const translations = {
  tr: {
    appTitle: "Discord Token Checker",
    appDescription: "Token'larınızı güvenli bir şekilde kontrol edin",
    singleTokenTitle: "Tek Token",
    multiTokenTitle: "Çoklu Token (Dosyadan)",
    tokenPlaceholder: "Discord token'ınızı buraya yapıştırın...",
    fileSelectLabel: "Dosya Seç",
    fileInfoText: "Her satıra bir token yazın (.txt formatında)",
    checkSingleButton: "Tek Token'ı Kontrol Et",
    checkFileButton: "Dosyadaki Token'ları Kontrol Et",
    resultsTitle: "Sonuçlar",
    noFileSelected: "Hiçbir dosya seçilmedi",
    enterTokenAlert: "Lütfen bir token girin!",
    selectFileAlert: "Lütfen bir dosya seçin!",
    checkingToken: "Token kontrol ediliyor...",
    checkingTokens: "Token'lar kontrol ediliyor...",
    fileReadError: "Dosya okunamadı:",
    noTokensInFile: "Dosyada hiç token bulunamadı!",
    resultsNotFound: "Sonuç bulunamadı.",
    validStatus: "Geçerli",
    invalidStatus: "Geçersiz",
    invalidTokenMessage: "Geçersiz Token",
    userIdLabel: "Kullanıcı ID",
    emailLabel: "E-posta",
    phoneLabel: "Telefon",
    verifiedLabel: "Doğrulanmış",
    createdAtLabel: "Oluşturulma Tarihi",
    nitroStatusLabel: "Nitro Durumu",
    noNitro: "No Nitro",
    nitroClassic: "Nitro Classic",
    nitroBoost: "Nitro Boost",
    prevPage: "Önceki",
    nextPage: "Sonraki",
    yes: "Yes",
    no: "No",
    notAvailable: "Not available"
  },
  en: {
    appTitle: "Discord Token Checker",
    appDescription: "Check your tokens securely",
    singleTokenTitle: "Single Token",
    multiTokenTitle: "Multiple Tokens (From File)",
    tokenPlaceholder: "Paste your Discord token here...",
    fileSelectLabel: "Select File",
    fileInfoText: "Write one token per line (.txt format)",
    checkSingleButton: "Check Single Token",
    checkFileButton: "Check Tokens from File",
    resultsTitle: "Results",
    noFileSelected: "No file selected",
    enterTokenAlert: "Please enter a token!",
    selectFileAlert: "Please select a file!",
    checkingToken: "Checking token...",
    checkingTokens: "Checking tokens...",
    fileReadError: "Could not read file:",
    noTokensInFile: "No tokens found in the file!",
    resultsNotFound: "No results found.",
    validStatus: "Valid",
    invalidStatus: "Invalid",
    invalidTokenMessage: "Invalid Token",
    userIdLabel: "User ID",
    emailLabel: "Email",
    phoneLabel: "Phone",
    verifiedLabel: "Verified",
    createdAtLabel: "Created At",
    nitroStatusLabel: "Nitro Status",
    noNitro: "No Nitro",
    nitroClassic: "Nitro Classic",
    nitroBoost: "Nitro Boost",
    prevPage: "Previous",
    nextPage: "Next",
    yes: "Yes",
    no: "No",
    notAvailable: "Not available"
  }
};

// Current language (default is Turkish)
let currentLanguage = 'tr';

// Function to translate text
function translate(key) {
  return translations[currentLanguage][key] || key;
}

// Function to update all translatable elements
function updateTranslations() {
  document.getElementById('appDescription').textContent = translate('appDescription');
  document.getElementById('singleTokenTitle').textContent = translate('singleTokenTitle');
  document.getElementById('multiTokenTitle').textContent = translate('multiTokenTitle');
  document.getElementById('tokenInput').placeholder = translate('tokenPlaceholder');
  document.getElementById('fileSelectLabel').textContent = translate('fileSelectLabel');
  document.getElementById('fileInfoText').textContent = translate('fileInfoText');
  document.getElementById('checkSingleButton').textContent = translate('checkSingleButton');
  document.getElementById('checkFileButton').textContent = translate('checkFileButton');
  document.getElementById('resultsTitle').textContent = translate('resultsTitle');
  
  // Update file name text if it's the default
  const fileNameElement = document.getElementById('fileName');
  if (fileNameElement.textContent === translations.tr.noFileSelected || 
      fileNameElement.textContent === translations.en.noFileSelected) {
    fileNameElement.textContent = translate('noFileSelected');
  }
  
  // Update any existing results
  updateResultsLanguage();
}

// Function to update language in existing results
function updateResultsLanguage() {
  const validStatusElements = document.querySelectorAll('.token-status.valid');
  validStatusElements.forEach(el => {
    el.textContent = translate('validStatus');
  });
  
  const invalidStatusElements = document.querySelectorAll('.token-status.invalid');
  invalidStatusElements.forEach(el => {
    el.textContent = translate('invalidStatus');
  });
  
  const detailLabels = document.querySelectorAll('.detail-label');
  detailLabels.forEach(el => {
    const text = el.textContent;
    if (text.includes('Kullanıcı ID') || text.includes('User ID')) {
      el.textContent = translate('userIdLabel');
    } else if (text.includes('E-posta') || text.includes('Email')) {
      el.textContent = translate('emailLabel');
    } else if (text.includes('Telefon') || text.includes('Phone')) {
      el.textContent = translate('phoneLabel');
    } else if (text.includes('Doğrulanmış') || text.includes('Verified')) {
      el.textContent = translate('verifiedLabel');
    } else if (text.includes('Oluşturulma Tarihi') || text.includes('Created At')) {
      el.textContent = translate('createdAtLabel');
    } else if (text.includes('Nitro Durumu') || text.includes('Nitro Status')) {
      el.textContent = translate('nitroStatusLabel');
    }
  });
  
  const nitroDetails = document.querySelectorAll('.nitro-detail');
  nitroDetails.forEach(el => {
    const text = el.textContent;
    if (text.includes('No Nitro')) {
      el.textContent = translate('noNitro');
    } else if (text.includes('Nitro Classic')) {
      el.textContent = translate('nitroClassic');
    } else if (text.includes('Nitro Boost')) {
      el.textContent = translate('nitroBoost');
    }
  });
  
  const prevButtons = document.querySelectorAll('#prevPage');
  prevButtons.forEach(el => {
    el.textContent = translate('prevPage');
  });
  
  const nextButtons = document.querySelectorAll('#nextPage');
  nextButtons.forEach(el => {
    el.textContent = translate('nextPage');
  });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const tokenInput = document.getElementById('tokenInput');
    const tokenFile = document.getElementById('tokenFile');
    const fileName = document.getElementById('fileName');
    const checkSingleButton = document.getElementById('checkSingleButton');
    const checkFileButton = document.getElementById('checkFileButton');
    const resultsContainer = document.getElementById('resultsContainer');
    const pagination = document.getElementById('pagination');
    const languageSelect = document.getElementById('languageSelect');
    
    let allResults = [];
    let currentPage = 1;
    const resultsPerPage = 10;
    
    // Set initial language
    languageSelect.value = currentLanguage;
    
    // Language change handler
    languageSelect.addEventListener('change', (event) => {
        currentLanguage = event.target.value;
        updateTranslations();
    });
    
    // File selection handler
    tokenFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            fileName.textContent = file.name;
        } else {
            fileName.textContent = translate('noFileSelected');
        }
    });
    
    // Check single token
    checkSingleButton.addEventListener('click', async () => {
        const token = tokenInput.value.trim();
        
        if (!token) {
            alert(translate('enterTokenAlert'));
            return;
        }
        
        // Show loading state
        resultsContainer.innerHTML = `<div class="loading">${translate('checkingToken')}</div>`;
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
            alert(translate('selectFileAlert'));
            return;
        }
        
        const file = tokenFile.files[0];
        const filePath = file.path;
        
        // Show loading state
        resultsContainer.innerHTML = `<div class="loading">${translate('checkingTokens')}</div>`;
        pagination.innerHTML = '';
        
        try {
            // Read file content
            const fileResult = await window.electronAPI.readFile(filePath);
            
            if (!fileResult.success) {
                resultsContainer.innerHTML = `<div class="error-message">${translate('fileReadError')} ${fileResult.error}</div>`;
                return;
            }
            
            // Split tokens by line
            const tokens = fileResult.content.split('\n').map(token => token.trim()).filter(token => token.length > 0);
            
            if (tokens.length === 0) {
                resultsContainer.innerHTML = `<div class="error-message">${translate('noTokensInFile')}</div>`;
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
                resultsContainer.innerHTML = `<div class="loading">${translate('checkingTokens')} (${i+1}/${tokens.length})</div>`;
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
            resultsContainer.innerHTML = `<div class="no-results">${translate('resultsNotFound')}</div>`;
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
                ${translate('prevPage')}
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
                ${translate('nextPage')}
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
            // Translate Nitro status
            let nitroTranslation = translate('noNitro');
            if (result.hasNitro === "Nitro Classic") {
                nitroTranslation = translate('nitroClassic');
            } else if (result.hasNitro === "Nitro Boost") {
                nitroTranslation = translate('nitroBoost');
            } else if (result.hasNitro === "No Nitro") {
                nitroTranslation = translate('noNitro');
            } else {
                nitroTranslation = result.hasNitro;
            }
            
            // Translate verified status
            const verifiedTranslation = result.verified === "Yes" ? translate('yes') : 
                                     result.verified === "No" ? translate('no') : result.verified;
            
            card.innerHTML = `
                <div class="token-header">
                    ${result.avatar ? 
                        `<img src="${result.avatar}" alt="Avatar" class="token-avatar" onerror="this.style.display='none'">` : 
                        `<div class="token-avatar"></div>`}
                    <div>
                        <div class="token-username">${result.username}</div>
                        <div class="token-discriminator">#${result.discriminator}</div>
                    </div>
                    <div class="token-status valid">${translate('validStatus')}</div>
                </div>
                <div class="token-details">
                    <div class="detail-item">
                        <div class="detail-label">${translate('userIdLabel')}</div>
                        <div class="detail-value token-id">${result.id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">${translate('emailLabel')}</div>
                        <div class="detail-value">${result.email}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">${translate('phoneLabel')}</div>
                        <div class="detail-value">${result.phone || translate('notAvailable')}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">${translate('verifiedLabel')}</div>
                        <div class="detail-value">${verifiedTranslation}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">${translate('createdAtLabel')}</div>
                        <div class="detail-value created-at">${result.createdAt}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">${translate('nitroStatusLabel')}</div>
                        <div class="detail-value nitro-detail">${nitroTranslation}</div>
                    </div>
                </div>
            `;
        } else {
            card.innerHTML = `
                <div class="token-header">
                    <div class="token-avatar"></div>
                    <div>
                        <div class="token-username">${translate('invalidTokenMessage')}</div>
                    </div>
                    <div class="token-status invalid">${translate('invalidStatus')}</div>
                </div>
                <div class="error-message">
                    Token geçersiz: ${result.error}
                </div>
            `;
        }
        
        return card;
    }
});
