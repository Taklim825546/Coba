// --- 1. SETUP VARIABEL ---
        const html = document.documentElement;
        
        // Elemen Dark Mode
        const themeBtn = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        // Elemen Mobile Menu
        const menuBtn = document.getElementById('menu-btn');
        const menuIcon = document.getElementById('menu-icon');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        // Elemen Scroll & Navbar
        const navBar = document.querySelector('nav');
        const navTitle = document.getElementById('nav-title');
        const navLinks = document.getElementById('nav-links');
        const navActions = document.getElementById('mobile-nav-actions'); // ID baru
        const heroSection = document.getElementById('home');

        // --- 2. FITUR DARK MODE ---
        function initTheme() {
            if (localStorage.getItem('theme') === 'dark') {
                html.classList.add('dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }
        initTheme(); // Jalankan saat load

        themeBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });

        // --- 3. FITUR MOBILE MENU ---
        function toggleMenu() {
            const isHidden = mobileMenu.classList.contains('hidden');

            if (isHidden) {
                // Buka Menu
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.replace('opacity-0', 'opacity-100');
                    mobileMenu.style.maxHeight = "500px";
                }, 10);
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                // Tutup Menu
                mobileMenu.classList.replace('opacity-100', 'opacity-0');
                mobileMenu.style.maxHeight = "0px";
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 500);
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        }

        menuBtn.addEventListener('click', toggleMenu);

        // Tutup menu otomatis saat link diklik
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Cek jika menu sedang terbuka, baru tutup
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
            });
        });

        // --- 4. FITUR UBAH WARNA SAAT SCROLL ---
        function updateNavColors() {
            // Cek apakah elemen hero ada (untuk mencegah error di halaman lain)
            if (!heroSection) return;

            const threshold = heroSection.offsetHeight - 100;
            const isScrolled = window.scrollY > threshold;

            // Daftar elemen yang perlu diubah warnanya
            const elementsToChange = [navTitle, navLinks, navActions];

            if (isScrolled) {
                // -- KONDISI: DI BAWAH (Diluar Hero) --
                navBar.classList.add('shadow-md');
                
                elementsToChange.forEach(el => {
                    if (el) {
                        el.classList.remove('text-white');
                        // Jadi Hitam, tapi kalau Dark Mode jadi Putih
                        el.classList.add('text-slate-900', 'dark:text-white'); 
                    }
                });
            } else {
                // -- KONDISI: DI ATAS (Dalam Hero) --
                navBar.classList.remove('shadow-md');

                elementsToChange.forEach(el => {
                    if (el) {
                        el.classList.add('text-white');
                        // Hapus class warna lain supaya paksa Putih
                        el.classList.remove('text-slate-900', 'dark:text-white');
                    }
                });
            }
        }

        // Jalankan fungsi scroll
        window.addEventListener('scroll', updateNavColors);
        // Jalankan sekali saat loading agar warnanya pas sejak awal
        updateNavColors();
        
        
        // --- 5. FITUR KIRIM KE WHATSAPP (PPDB) ---
        function kirimKeWhatsApp(event) {
            event.preventDefault(); // Mencegah halaman refresh saat tombol ditekan

            // 1. Ambil data dari input
            const nama = document.getElementById('nama-siswa').value;
            const sekolah = document.getElementById('asal-sekolah').value;
            const wa = document.getElementById('nomor-wa').value;

            // 2. Nomor Admin (Saya ambil dari footer kamu: 0838-1851-0248)
            // Format harus 628... (tanpa 0 di depan)
            const nomorAdmin = "6283818510248"; 

            // 3. Buat template pesan
            const pesan = `Halo Admin MTs Al Ihsan, saya berminat mendaftar.%0A%0A` +
                          `📝 *Data Calon Siswa* %0A` +
                          `Nama: ${nama}%0A` +
                          `Asal Sekolah: ${sekolah}%0A` +
                          `No. WA: ${wa}%0A%0A` +
                          `Mohon infonya lebih lanjut. Terima kasih.`;

            // 4. Buka WhatsApp
            const url = `https://wa.me/${nomorAdmin}?text=${pesan}`;
            window.open(url, '_blank');
        }