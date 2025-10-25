// Main application logic for Totohax V5
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let balance = 0;
    let selectedGame = null;
    let selectedMethod = null;
    let selectedTime = null;
    let passwordShown = false;
    let passwordAttempts = 0;
    const games = [
        { id: 'freefire', name: 'Free Fire', image: 'http://static.photos/gaming/320x240/1' },
        { id: 'mlbb', name: 'Mobile Legends', image: 'http://static.photos/gaming/320x240/2' },
        { id: 'cod', name: 'Call of Duty', image: 'http://static.photos/gaming/320x240/3' },
        { id: 'pubg', name: 'PUBG', image: 'http://static.photos/gaming/320x240/4' },
        { id: 'honor', name: 'Honor of Kings', image: 'http://static.photos/gaming/320x240/5' },
        { id: 'roblox', name: 'Roblox', image: 'http://static.photos/gaming/320x240/6' },
        { id: 'delta', name: 'Delta Force', image: 'http://static.photos/gaming/320x240/7' },
        { id: 'efootball', name: 'eFootball', image: 'http://static.photos/gaming/320x240/8' },
        { id: 'bloodstrike', name: 'Blood Strike', image: 'http://static.photos/gaming/320x240/9' },
        { id: 'arena', name: 'Arena Breakout', image: 'http://static.photos/gaming/320x240/10' },
        { id: 'hotel', name: 'Hotel Hideaway', image: 'http://static.photos/gaming/320x240/11' },
        { id: 'amongus', name: 'Among Us', image: 'http://static.photos/gaming/320x240/12' }
    ];

    const methods = [
        { id: 'google', name: 'Google', icon: 'globe' },
        { id: 'facebook', name: 'Facebook', icon: 'facebook' },
        { id: 'garena', name: 'Garena', icon: 'box' },
        { id: 'konami', name: 'Konami', icon: 'codesandbox' },
        { id: 'infinite', name: 'Infinite', icon: 'infinity' },
        { id: 'twitter', name: 'Twitter', icon: 'twitter' },
        { id: 'moonton', name: 'Moonton', icon: 'moon' },
        { id: 'apple', name: 'Apple', icon: 'apple' }
    ];

    // DOM elements
    const gameSelection = document.getElementById('game-selection');
    const loginMethodSelection = document.getElementById('login-method-selection');
    const hackBtn = document.getElementById('hack-btn');
    const resultsSection = document.getElementById('results-section');
    const progressSection = document.getElementById('progress-section');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const progressMessages = document.getElementById('progress-messages');
    const hackStatus = document.getElementById('hack-status');
    const balanceDisplay = document.getElementById('balance');
    const topupBtn = document.getElementById('topup-btn');
    const topupModal = document.getElementById('topup-modal');
    const closeTopup = document.getElementById('close-topup');
    const topupAmount = document.getElementById('topup-amount');
    const confirmTopup = document.getElementById('confirm-topup');
    const passwordModal = document.getElementById('password-modal');
    const closePassword = document.getElementById('close-password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordModalTitle = document.getElementById('password-modal-title');
    const passwordModalMessage = document.getElementById('password-modal-message');
    const showPassword = document.getElementById('show-password');
    const resultEmail = document.getElementById('result-email');
    const resultPassword = document.getElementById('result-password');
    const resultMethod = document.getElementById('result-method');
    const resultGame = document.getElementById('result-game');
    const targetUsername = document.getElementById('target-username');
    const processTimeBtns = document.querySelectorAll('.process-time-btn');

    // Initialize game cards
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card bg-gray-700 rounded-lg p-2 flex flex-col items-center cursor-pointer';
        card.dataset.id = game.id;
        
        card.innerHTML = `
            <img src="${game.image}" alt="${game.name}" class="w-16 h-16 object-cover rounded-lg mb-1">
            <span class="text-xs text-center">${game.name}</span>
        `;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.game-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedGame = game;
        });
        
        gameSelection.appendChild(card);
    });

    // Initialize login method cards
    methods.forEach(method => {
        const card = document.createElement('div');
        card.className = 'login-method bg-gray-700 rounded-lg p-2 flex flex-col items-center cursor-pointer';
        card.dataset.id = method.id;
        
        card.innerHTML = `
            <i data-feather="${method.icon}" class="w-5 h-5 mb-1"></i>
            <span class="text-xs text-center">${method.name}</span>
        `;
        
        card.addEventListener('click', () => {
            document.querySelectorAll('.login-method').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedMethod = method;
        });
        
        loginMethodSelection.appendChild(card);
    });

    // Initialize process time buttons
    processTimeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            processTimeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedTime = btn.id;
        });
    });

    // Initialize top up functionality
    topupBtn.addEventListener('click', () => {
        topupModal.classList.remove('hidden');
    });

    closeTopup.addEventListener('click', () => {
        topupModal.classList.add('hidden');
    });

    confirmTopup.addEventListener('click', () => {
        const amount = parseInt(topupAmount.value);
        if (amount >= 100000) {
            balance += amount;
            balanceDisplay.textContent = balance.toLocaleString('id-ID');
            topupModal.classList.add('hidden');
            topupAmount.value = '';
            alert(`Top up successful! Your new balance is Rp ${balance.toLocaleString('id-ID')}`);
        } else {
            alert('Minimum top up amount is Rp 100,000');
        }
    });

    // Initialize hacking functionality
    hackBtn.addEventListener('click', () => {
        if (!selectedGame || !selectedMethod || !selectedTime) {
            alert('Please select game, login method, and processing time');
            return;
        }

        if (!targetUsername.value) {
            alert('Please enter target username/ID/email');
            return;
        }

        const cost = selectedTime === '1-hour' ? 50000 : 30000;
        if (balance < cost) {
            alert(`Insufficient balance. You need Rp ${cost.toLocaleString('id-ID')} for this operation.`);
            return;
        }

        // Deduct balance
        balance -= cost;
        balanceDisplay.textContent = balance.toLocaleString('id-ID');

        // Show progress section
        progressSection.classList.remove('hidden');
        resultsSection.classList.add('hidden');
        passwordShown = false;
        passwordAttempts = 0;

        // Start hacking progress
        simulateHacking();
    });

    function simulateHacking() {
        let progress = 0;
        const totalSteps = 100;
        const intervalTime = selectedTime === '1-hour' ? 30 : 50; // Faster for 1-hour option
        const messages = [
            "Initializing quantum brute-force algorithm...",
            "Bypassing game server encryption...",
            "Injecting AI neural network into target system...",
            "Cracking login credentials...",
            "Extracting account data...",
            "Finalizing operation...",
            "Account successfully compromised!"
        ];

        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            progressPercent.textContent = `${progress}%`;

            // Update status message at certain intervals
            if (progress % 15 === 0) {
                const messageIndex = Math.min(Math.floor(progress / 15), messages.length - 1);
                hackStatus.textContent = messages[messageIndex];
                
                const messageElement = document.createElement('div');
                messageElement.textContent = `[${new Date().toLocaleTimeString()}] ${messages[messageIndex]}`;
                progressMessages.appendChild(messageElement);
                progressMessages.scrollTop = progressMessages.scrollHeight;
            }

            if (progress >= totalSteps) {
                clearInterval(interval);
                hackingComplete();
            }
        }, intervalTime);
    }

    function hackingComplete() {
        // Generate fake results
        const username = targetUsername.value;
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const randomPassword = Math.random().toString(36).slice(2, 10) + Math.floor(Math.random() * 100);
        
        resultEmail.textContent = `${username}@${randomDomain}`;
        resultPassword.textContent = '••••••••';
        resultMethod.textContent = selectedMethod.name;
        resultGame.textContent = selectedGame.name;
        
        // Store the actual password for later reveal
        resultPassword.dataset.actual = randomPassword;
        
        // Show results
        progressSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
    }

    // Password reveal functionality
    showPassword.addEventListener('click', () => {
        if (passwordShown) {
            resultPassword.textContent = '••••••••';
            passwordShown = false;
            showPassword.innerHTML = '<i data-feather="eye" class="w-4 h-4"></i>';
        } else {
            showPasswordModal();
        }
        feather.replace();
    });

    function showPasswordModal() {
        passwordAttempts++;
        
        if (passwordAttempts === 1) {
            passwordModalTitle.textContent = "SECURITY VERIFICATION";
            passwordModalMessage.textContent = "Silahkan lakukan biaya tambahan Rp 30,000 untuk biaya keamanan akun jika tidak akun akan dibatalkan";
        } else if (passwordAttempts === 2) {
            passwordModalTitle.textContent = "ADMIN FEE REQUIRED";
            passwordModalMessage.textContent = "Lakukan biaya tambahan sebesar Rp 50,000 untuk biaya admin dan biaya server jika tidak akun akan ditangguhkan";
        } else {
            passwordModalTitle.textContent = "PAYMENT VERIFICATION FAILED";
            passwordModalMessage.textContent = "Tidak ada riwayat transfer, lakukan pembayaran ulang. Jika sudah, uang bayar ulang akan dikembalikan sebesar Rp 50,000";
        }
        
        passwordModal.classList.remove('hidden');
    }

    closePassword.addEventListener('click', () => {
        passwordModal.classList.add('hidden');
    });

    confirmPassword.addEventListener('click', () => {
        const fee = passwordAttempts === 1 ? 30000 : passwordAttempts === 2 ? 50000 : 50000;
        
        if (balance >= fee) {
            balance -= fee;
            balanceDisplay.textContent = balance.toLocaleString('id-ID');
            
            resultPassword.textContent = resultPassword.dataset.actual;
            passwordShown = true;
            showPassword.innerHTML = '<i data-feather="eye-off" class="w-4 h-4"></i>';
            
            passwordModal.classList.add('hidden');
            feather.replace();
        } else {
            alert(`Insufficient balance. You need Rp ${fee.toLocaleString('id-ID')} for this operation.`);
        }
    });

    // Initialize feather icons
    feather.replace();
});