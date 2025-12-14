document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        VIDEO_URL: 'https://example.com/promo.mp4',
        CONTACT_URL: 'https://example.com/contact',
        PRICE_1H: 50000,
        PRICE_7H: 30000,
        MIN_TOPUP: 100000,
        credentials: [
            { username: "admin", password: "totohaxv5" },
            { username: "user1", password: "password1" }
        ]
    };

    // State management
    const state = {
        balance: 150000,
        selectedGame: null,
        selectedMethod: null,
        selectedTime: null,
        targetInput: '',
        showPasswordAttempts: 0,
        isProcessing: false
    };

    // DOM elements
    const loadingScreen = document.getElementById('loading-screen');
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');
    const loginForm = document.getElementById('login-form');
    const contactLink = document.getElementById('contact-link');
    const targetInput = document.getElementById('target-input');
    const initiateBtn = document.getElementById('initiate-btn');
    const progressSection = document.getElementById('progress-section');
    const resultSection = document.getElementById('result-section');
    const progressPercent = document.getElementById('progress-percent');
    const progressBar = document.getElementById('progress-bar');
    const progressLog = document.getElementById('progress-log');
    const resultGame = document.getElementById('result-game');
    const resultMethod = document.getElementById('result-method');
    const resultEmail = document.getElementById('result-email');
    const resultPassword = document.getElementById('result-password');
    const showPasswordBtn = document.getElementById('show-password-btn');
    const balanceDisplay = document.querySelector('custom-navbar').shadowRoot.querySelector('#balance');

    // Initialize
    function init() {
        // Simulate video loading
        const video = document.getElementById('promo-video');
        video.src = config.VIDEO_URL;
        
        video.onended = () => {
            loadingScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        };

        // Set contact link
        contactLink.href = config.CONTACT_URL;

        // Update balance display
        updateBalanceDisplay();

        // Event listeners
        loginForm.addEventListener('submit', handleLogin);
        initiateBtn.addEventListener('click', handleInitiate);
        showPasswordBtn.addEventListener('click', handleShowPassword);
    }

    // Handle login
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const isValid = config.credentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        if (isValid) {
            loginScreen.classList.add('hidden');
            mainApp.classList.remove('hidden');
            feather.replace();
        } else {
            alert('Invalid username or password');
        }
    }

    // Game selection
    document.addEventListener('gameSelected', (e) => {
        state.selectedGame = e.detail.name;
        console.log('Game selected:', state.selectedGame);
    });

    // Method selection
    document.addEventListener('methodSelected', (e) => {
        state.selectedMethod = e.detail.name;
        console.log('Method selected:', state.selectedMethod);
    });

    // Time selection
    document.addEventListener('timeSelected', (e) => {
        state.selectedTime = e.detail.duration;
        console.log('Time selected:', state.selectedTime);
    });

    // Handle initiate hacking
    function handleInitiate() {
        state.targetInput = targetInput.value.trim();
        
        if (!state.targetInput) {
            alert('Please enter target ID/Username/Email');
            return;
        }
        
        if (!state.selectedGame) {
            alert('Please select a game');
            return;
        }
        
        if (!state.selectedMethod) {
            alert('Please select a login method');
            return;
        }
        
        if (!state.selectedTime) {
            alert('Please select processing time');
            return;
        }
        
        const price = state.selectedTime === '1 HOUR' ? config.PRICE_1H : config.PRICE_7H;
        
        if (state.balance < price) {
            alert('Insufficient balance. Please top up.');
            return;
        }
        
        // Deduct balance
        state.balance -= price;
        updateBalanceDisplay();
        
        // Start processing
        state.isProcessing = true;
        initiateBtn.disabled = true;
        progressSection.classList.remove('hidden');
        resultSection.classList.add('hidden');
        
        simulateProgress();
    }

    // Simulate hacking progress
    function simulateProgress() {
        let progress = 0;
        const messages1H = [
            "Initializing connection to game servers...",
            "Bypassing initial security protocols...",
            "Analyzing account structure...",
            "Injecting AI modules...",
            "Mapping account vectors...",
            "Prioritizing high-value targets...",
            "Simulating login patterns...",
            "Establishing secure tunnel...",
            "Finalizing data extraction..."
        ];
        
        const messages7H = [
            "Starting low-profile scan...",
            "Identifying weak endpoints...",
            "Running heuristic analysis...",
            "Building behavior model...",
            "Testing vulnerability points...",
            "Adapting to security measures...",
            "Optimizing resource usage...",
            "Preparing data package..."
        ];
        
        const messages = state.selectedTime === '1 HOUR' ? messages1H : messages7H;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressPercent.textContent = `${Math.floor(progress)}%`;
            progressBar.style.width = `${progress}%`;
            
            // Add random logs
            if (progress % 20 < 5) {
                const timestamp = new Date().toLocaleTimeString();
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                const logEntry = document.createElement('div');
                logEntry.innerHTML = `<span class="text-primary">[${timestamp}]</span> ${randomMsg}`;
                progressLog.appendChild(logEntry);
                progressLog.scrollTop = progressLog.scrollHeight;
            }
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    showResults();
                }, 1000);
            }
        }, 300);
    }

    // Show results after processing
    function showResults() {
        state.isProcessing = false;
        progressSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        initiateBtn.disabled = false;
        
        // Generate fake results
        resultGame.textContent = state.selectedGame;
        resultMethod.textContent = state.selectedMethod;
        resultEmail.textContent = `${state.targetInput}@${generateRandomDomain()}`;
        resultPassword.textContent = '••••••••';
        state.generatedPassword = generateRandomPassword();
        
        // Reset password show attempts
        state.showPasswordAttempts = 0;
        showPasswordBtn.innerHTML = feather.icons.eye.toSvg();
    }

    // Handle show password
    function handleShowPassword() {
        state.showPasswordAttempts++;
        
        const modal = document.querySelector('password-modal');
        
        if (state.showPasswordAttempts === 1) {
            modal.setAttribute('message', 'Please pay additional Rp 30.000 for account security fee. If not paid, the account will be canceled.');
            modal.setAttribute('price', '30.000');
            modal.setAttribute('visible', 'true');
        } else if (state.showPasswordAttempts === 2) {
            modal.setAttribute('message', 'Please pay additional Rp 50.000 for admin and server fees. If not paid, the account will be suspended.');
            modal.setAttribute('price', '50.000');
            modal.setAttribute('visible', 'true');
        } else {
            modal.setAttribute('message', 'No payment history found. Please make payment again. If already paid, the additional Rp 50.000 will be refunded.');
            modal.setAttribute('price', '50.000');
            modal.setAttribute('visible', 'true');
        }
    }

    // Handle password modal confirm
    document.addEventListener('passwordPaid', (e) => {
        const price = parseInt(e.detail.price.replace(/\./g, ''));
        
        if (state.balance >= price) {
            state.balance -= price;
            updateBalanceDisplay();
            resultPassword.textContent = state.generatedPassword;
            showPasswordBtn.innerHTML = feather.icons.eye-off.toSvg();
        } else {
            alert('Insufficient balance. Please top up.');
        }
    });

    // Update balance display
    function updateBalanceDisplay() {
        if (balanceDisplay) {
            balanceDisplay.textContent = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(state.balance);
        }
    }

    // Helper functions
    function generateRandomDomain() {
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'protonmail.com'];
        return domains[Math.floor(Math.random() * domains.length)];
    }

    function generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Initialize the app
    init();
});