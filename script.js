/**
 * Arcadia Rent - Main JavaScript File
 * Versi 2.0 - Fully Optimized
 */

document.addEventListener('DOMContentLoaded', () => {
    // ====================== KONFIGURASI ======================
    const CONFIG = {
        CART_STORAGE_KEY: 'arcadiaCart',
        DEFAULT_IMAGE: 'https://via.placeholder.com/300',
        CURRENCY_FORMAT: {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }
    };

    // ====================== DATA PRODUK ======================
    const PRODUCTS = [
        // Konsol
        {
            id: 'ps5-disk',
            type: 'console',
            name: 'PlayStation 5 Disk Edition',
            image: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/2/27/9014a585-c8f1-4b46-bebe-4a2e69b92902.jpg',
            price: 150000,
            description: 'Konsol PS5 standar dengan drive disk, nikmati game fisik & digital.'
        },
        {
            id: 'ps5-digital',
            type: 'console',
            name: 'PlayStation 5 Digital Edition',
            image: 'https://awsimages.detik.net.id/visual/2023/10/11/ps5-playstationcom_169.png',
            price: 130000,
            description: 'Konsol PS5 versi digital ramping, khusus game unduhan.'
        },
        {
            id: 'ps4-pro',
            type: 'console',
            name: 'PlayStation 4 Pro',
            image: 'https://images.tokopedia.net/img/cache/700/OJWluG/2022/6/24/0b210adb-16a9-43b8-b47c-a1e33716ade4.jpg',
            price: 100000,
            description: 'PS4 Pro dengan performa 4K, grafis lebih tajam.'
        },
        {
            id: 'ps4-slim',
            type: 'console',
            name: 'PlayStation 4 Slim',
            image: 'https://images-cdn.ubuy.co.id/64c004160e5b630ac57e7c49-sony-playstation-4-500gb-slim-system.jpg',
            price: 80000,
            description: 'PS4 Slim, lebih ringkas, hemat daya, dan ringan.'
        },
        // Permainan
        {
            id: 'game-god-of-war',
            type: 'game',
            name: 'God of War Ragnarök',
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg',
            price: 50000,
            description: 'Petualangan epik Kratos & Atreus di mitologi Nordik.'
        },
        {
            id: 'game-fifa',
            type: 'game',
            name: 'EA Sports FC 25',
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2669320/ec3fb7747fd8080ef53d7686e0d98c5abe1f51f1/header.jpg',
            price: 40000,
            description: 'Game sepak bola realistis terbaru.'
        },
        {
            id: 'game-spiderman',
            type: 'game',
            name: 'Marvel\'s Spider-Man 2',
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2651280/header.jpg',
            price: 55000,
            description: 'Bertarung sebagai Peter Parker & Miles Morales.'
        },
        {
            id: 'game-cod',
            type: 'game',
            name: 'Call of Duty: Modern Warfare III',
            image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/header.jpg',
            price: 45000,
            description: 'Game tembak-menembak militer intens.'
        },
        // Perangkat VR & Aksesoris
        {
            id: 'vr-psvr2',
            type: 'vr-accessory',
            name: 'PlayStation VR2',
            image: 'https://mms.businesswire.com/media/20230222005126/en/1718672/5/PSVR2_16X9.jpg',
            price: 70000,
            description: 'Headset VR generasi terbaru untuk PS5.'
        },
        {
            id: 'acc-dualsense',
            type: 'vr-accessory',
            name: 'DualSense Controller',
            image: 'https://eshop.hkcsl.com/on/demandware.static/-/Sites-master-hkt-hk/default/dwb97b9adb/images/4128511scol/4128511_1__2.jpg',
            price: 25000,
            description: 'Kontroler haptik canggih untuk PS5.'
        },
        {
            id: 'acc-dualshock4',
            type: 'vr-accessory',
            name: 'DualShock 4 Controller',
            image: 'https://plazakamera.com/wp-content/uploads/2023/08/Jual-PS4-DualShock-4-Wireless-Controller-Black-harga-terbaik.jpg',
            price: 20000,
            description: 'Kontroler standar untuk PS4.'
        },
        {
            id: 'acc-monitor',
            type: 'vr-accessory',
            name: 'Monitor Gaming 24"',
            image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-177785231/lg_lg_24gs60f-b_monitor_gaming_24-inch_ultra_gear_full_hd_180_hz_ips_1ms_-gtg-_hdr10_full02_ivlspdj1.jpeg',
            price: 60000,
            description: 'Monitor Full HD responsif untuk pengalaman gaming.'
        }
    ];

    // ====================== STATE MANAGEMENT ======================
    let cart = JSON.parse(localStorage.getItem(CONFIG.CART_STORAGE_KEY)) || [];

    // ====================== DOM ELEMENTS ======================
    const DOM = {
        consoleList: document.getElementById('console-list'),
        gameList: document.getElementById('game-list'),
        vrAccessoriesList: document.getElementById('vr-accessories-list'),
        cartItems: document.getElementById('cart-items'),
        cartTotal: document.getElementById('cart-total'),
        cartCount: document.getElementById('cart-count'),
        emptyCartMessage: document.getElementById('empty-cart-message'),
        checkoutBtn: document.getElementById('checkout-btn'),
        checkoutSection: document.getElementById('checkout-section'),
        cartSection: document.getElementById('cart'),
        checkoutForm: document.getElementById('checkout-form'),
        checkoutConfirmation: document.getElementById('checkout-confirmation'),
        backToCartBtn: document.getElementById('back-to-cart-btn'),
        continueShoppingBtn: document.getElementById('continue-shopping-btn'),
        exploreBtn: document.getElementById('exploreBtn')
    };

    // ====================== UTILITY FUNCTIONS ======================
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', CONFIG.CURRENCY_FORMAT).format(amount);
    };

    const safeQuerySelector = (selector, parent = document) => {
        const element = parent.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    };

    const safeGetElementById = (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID ${id} not found`);
        }
        return element;
    };

    // ====================== CART FUNCTIONS ======================
    const saveCart = () => {
        localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
    };

    const updateCartCount = () => {
        if (DOM.cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            DOM.cartCount.textContent = totalItems;
        }
    };

    const addToCart = (productId) => {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        renderCart();
        showToast(`${product.name} berhasil ditambahkan ke keranjang!`);
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
        showToast('Produk dihapus dari keranjang.');
    };

    const updateCartQuantity = (productId, newQuantity) => {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (newQuantity > 0) {
                cart[itemIndex].quantity = newQuantity;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        renderCart();
    };

    // ====================== RENDER FUNCTIONS ======================
    const createProductCard = (product) => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <img src="${product.image || CONFIG.DEFAULT_IMAGE}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${formatRupiah(product.price)} / Hari</p>
            <button class="btn primary-btn add-to-cart-btn" data-id="${product.id}">
                Tambah ke Keranjang
            </button>
        `;
        return div;
    };

    const renderProductsByType = (type, containerElement) => {
        if (!containerElement) return;

        containerElement.innerHTML = '';
        const filteredProducts = PRODUCTS.filter(p => p.type === type);
        
        if (filteredProducts.length === 0) {
            containerElement.innerHTML = '<p class="no-products">Tidak ada produk tersedia</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            containerElement.appendChild(card);
        });

        // Add event listeners to all add-to-cart buttons
        containerElement.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                addToCart(productId);
            });
        });
    };

    const renderCart = () => {
        if (!DOM.cartItems || !DOM.cartTotal || !DOM.emptyCartMessage || !DOM.checkoutBtn) {
            return;
        }

        DOM.cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            DOM.emptyCartMessage.style.display = 'block';
            DOM.checkoutBtn.disabled = true;
        } else {
            DOM.emptyCartMessage.style.display = 'none';
            DOM.checkoutBtn.disabled = false;

            cart.forEach(item => {
                const product = PRODUCTS.find(p => p.id === item.id);
                if (product) {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.className = 'cart-item';
                    cartItemDiv.innerHTML = `
                        <img src="${product.image || CONFIG.DEFAULT_IMAGE}" alt="${product.name}">
                        <div class="cart-item-details">
                            <h4>${product.name}</h4>
                            <p>${formatRupiah(product.price)} / Hari</p>
                        </div>
                        <div class="cart-item-actions">
                            <label for="qty-${item.id}">Jumlah Hari:</label>
                            <input type="number" id="qty-${item.id}" min="1" 
                                   value="${item.quantity}" data-id="${item.id}" 
                                   class="item-quantity">
                            <button class="btn remove-btn" data-id="${item.id}">
                                <i class="fas fa-trash-alt"></i> Hapus
                            </button>
                        </div>
                    `;
                    DOM.cartItems.appendChild(cartItemDiv);
                    total += product.price * item.quantity;
                }
            });

            // Add event listeners for quantity changes and remove buttons
            DOM.cartItems.querySelectorAll('.item-quantity').forEach(input => {
                input.addEventListener('change', (e) => {
                    const productId = e.target.dataset.id;
                    const newQuantity = parseInt(e.target.value);
                    updateCartQuantity(productId, newQuantity);
                });
            });

            DOM.cartItems.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.currentTarget.dataset.id;
                    removeFromCart(productId);
                });
            });
        }

        DOM.cartTotal.textContent = formatRupiah(total);
        saveCart();
    };

    // ====================== UI HELPERS ======================
    const showToast = (message, duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    };

    const toggleSection = (section, show) => {
        if (section) {
            if (show) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        }
    };

    // ====================== FORM HANDLERS ======================
    const handleCheckoutSubmit = (e) => {
        e.preventDefault();

        const formData = {
            nama: DOM.checkoutForm.querySelector('#nama')?.value,
            email: DOM.checkoutForm.querySelector('#email')?.value,
            telepon: DOM.checkoutForm.querySelector('#telepon')?.value,
            alamat: DOM.checkoutForm.querySelector('#alamat')?.value,
            startDate: DOM.checkoutForm.querySelector('#start-date')?.value,
            endDate: DOM.checkoutForm.querySelector('#end-date')?.value
        };

        // Basic validation
        if (!formData.nama || !formData.email || !formData.telepon || !formData.alamat || !formData.startDate || !formData.endDate) {
            showToast('Harap lengkapi semua bidang formulir!');
            return;
        }

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);

        if (start > end) {
            showToast('Tanggal selesai harus setelah tanggal mulai!');
            return;
        }

        // Calculate rental duration
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        // Calculate total
        let total = 0;
        const rentedItems = cart.map(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (product) {
                const itemTotal = product.price * item.quantity * diffDays;
                total += itemTotal;
                return {
                    name: product.name,
                    quantity: item.quantity,
                    days: diffDays,
                    pricePerDay: product.price,
                    total: itemTotal
                };
            }
            return null;
        }).filter(Boolean);

        // Simulate successful checkout
        showToast(`Checkout berhasil! Total: ${formatRupiah(total)}`);
        
        // Reset cart
        cart = [];
        saveCart();
        renderCart();
        
        // Show confirmation
        toggleSection(DOM.checkoutForm, false);
        toggleSection(DOM.checkoutConfirmation, true);
    };

    // ====================== TAB HANDLERS ======================
    const openTab = (evt, tabName) => {
        // Hide all tab content
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });

        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // Show the current tab and mark button as active
        const tab = document.getElementById(tabName);
        if (tab) {
            tab.style.display = 'block';
            tab.classList.add('active');
        }

        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add('active');
        }
    };

    const showRegisterTab = (e) => {
        e.preventDefault();
        openTab(e, 'register');
        const registerBtn = document.querySelector('.auth-tabs .tab-button:nth-child(1)');
        if (registerBtn) registerBtn.click();
    };

    // ====================== EVENT LISTENERS ======================
    const setupEventListeners = () => {
        // Explore button
        if (DOM.exploreBtn) {
            DOM.exploreBtn.addEventListener('click', () => {
                const consolesSection = document.getElementById('consoles');
                if (consolesSection) {
                    consolesSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Checkout button
        if (DOM.checkoutBtn) {
            DOM.checkoutBtn.addEventListener('click', () => {
                if (cart.length === 0) {
                    showToast('Keranjang Anda kosong!');
                    return;
                }
                toggleSection(DOM.cartSection, false);
                toggleSection(DOM.checkoutSection, true);
                
                // Set minimum dates
                const today = new Date().toISOString().split('T')[0];
                const startDateInput = DOM.checkoutForm.querySelector('#start-date');
                const endDateInput = DOM.checkoutForm.querySelector('#end-date');
                if (startDateInput) startDateInput.min = today;
                if (endDateInput) endDateInput.min = today;
            });
        }

        // Back to cart button
        if (DOM.backToCartBtn) {
            DOM.backToCartBtn.addEventListener('click', () => {
                toggleSection(DOM.checkoutSection, false);
                toggleSection(DOM.cartSection, true);
            });
        }

        // Continue shopping button
        if (DOM.continueShoppingBtn) {
            DOM.continueShoppingBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }

        // Checkout form submit
        if (DOM.checkoutForm) {
            DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
        }

        // Register form submit
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const password = registerForm.querySelector('#reg-password').value;
                const confirmPassword = registerForm.querySelector('#reg-confirm-password').value;
                
                if (password !== confirmPassword) {
                    showToast('Password dan konfirmasi tidak cocok!');
                    return;
                }

                if (!registerForm.querySelector('#terms-agree').checked) {
                    showToast('Anda harus menyetujui syarat dan ketentuan!');
                    return;
                }

                showToast('Pendaftaran berhasil!');
                registerForm.reset();
                openTab(e, 'login');
            });
        }

        // Login form submit
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Login berhasil!');
                loginForm.reset();
            });
        }

        // Contact form submit
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Pesan Anda telah terkirim!');
                contactForm.reset();
            });
        }
    };

    // ====================== INITIALIZATION ======================
    const init = () => {
        // Render products
        renderProductsByType('console', DOM.consoleList);
        renderProductsByType('game', DOM.gameList);
        renderProductsByType('vr-accessory', DOM.vrAccessoriesList);

        // Render cart
        renderCart();
        updateCartCount();

        // Hide checkout section by default
        toggleSection(DOM.checkoutSection, false);
        toggleSection(DOM.checkoutConfirmation, false);

        // Setup all event listeners
        setupEventListeners();

        // Initialize auth tabs if exists
        const firstTabButton = document.querySelector('.auth-tabs .tab-button');
        if (firstTabButton) {
            firstTabButton.click();
        }
    };

    // Start the application
    init();
});

// Add CSS for toast messages if not exists
if (!document.querySelector('style[data-toast-style]')) {
    const style = document.createElement('style');
    style.setAttribute('data-toast-style', '');
    style.textContent = `
        .toast-message {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: #28a745;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
        }
        .toast-message.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}