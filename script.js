 // sample product data
    const products = [
      {id:1,title:'Klasik Pilihan: Seni Membaca',author:'A. Curator',price:75000,img:'',tag:'Klasik'},
      {id:2,title:'Fiksi Futuristik',author:'B. Penulis',price:98000,img:'',tag:'Fiksi'},
      {id:3,title:'Panduan Kafe & Buku',author:'C. Guide',price:65000,img:'',tag:'Panduan'},
      {id:4,title:'Cerita Pendek Modern',author:'D. Story',price:52000,img:'',tag:'Cerita'},
      {id:5,title:'Sejarah Ringkas',author:'E. Histor',price:88000,img:'',tag:'Non-Fiksi'},
      {id:6,title:'Resep Kopi & Baca',author:'F. Chef',price:72000,img:'',tag:'Lifestyle'}
    ];

    const grid = document.getElementById('product-grid');
    const cart = [];

    function formatRupiah(n){return 'Rp'+n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')}

    function renderProducts(list){
      grid.innerHTML = '';
      list.forEach(p=>{
        const el = document.createElement('div'); el.className='card';
        el.innerHTML = `
          <div style="display:flex;gap:12px;align-items:flex-start">
            <div style="width:86px;height:120px;border-radius:8px;background:linear-gradient(135deg,rgba(77,208,225,0.06),rgba(123,97,255,0.04));display:flex;align-items:center;justify-content:center"> <div style="font-weight:700">BK</div></div>
            <div style="flex:1">
              <div style="font-weight:700">${p.title}</div>
              <div class="meta">${p.author} • ${p.tag}</div>
              <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
                <div class="price">${formatRupiah(p.price)}</div>
                <div>
                  <button class="small" style="padding:8px 10px;border-radius:10px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:var(--muted);margin-right:8px" onclick="quickView(${p.id})">Lihat</button>
                  <button class="btn" onclick="addToCart(${p.id})">Beli</button>
                </div>
              </div>
            </div>
          </div>
        `;
        grid.appendChild(el);
      })
    }

    function addToCart(id){
      const prod = products.find(p=>p.id===id);
      const existing = cart.find(c=>c.id===id);
      if(existing) existing.qty++;
      else cart.push({id:prod.id,title:prod.title,price:prod.price,qty:1});
      renderCart();
      document.getElementById('cart-modal').classList.add('open');
    }

    function renderCart(){
      const el = document.getElementById('cart-items'); el.innerHTML='';
      let total=0;
      cart.forEach(item=>{
        total += item.price*item.qty;
        const div = document.createElement('div'); div.className='cart-item';
        div.innerHTML = `<div style="flex:1">${item.title}<div class=\"muted\">${item.qty} x ${formatRupiah(item.price)}</div></div><div>${formatRupiah(item.price*item.qty)}</div>`;
        el.appendChild(div);
      });
      document.getElementById('cart-total').innerText = formatRupiah(total);
    }

    function toggleCart(){
      document.getElementById('cart-modal').classList.toggle('open');
    }

    function checkout(){
      alert('Fitur checkout demo. Silakan hubungi pemilik lewat formulir kontak.');
    }

    function quickView(id){
      const p = products.find(x=>x.id===id);
      alert(`${p.title}\n\nPenulis: ${p.author}\nHarga: ${formatRupiah(p.price)}`);
    }

    function doSearch(){
      const q = document.getElementById('search').value.toLowerCase();
      const filtered = products.filter(p=>p.title.toLowerCase().includes(q)||p.author.toLowerCase().includes(q)||p.tag.toLowerCase().includes(q));
      renderProducts(filtered);
    }

    function submitContact(e){e.preventDefault();alert('Terima kasih, pesan Anda telah dikirim (demo).');e.target.reset();}
    function scrollTo(sel){document.querySelector(sel).scrollIntoView({behavior:'smooth'})}

    // mobile menu behavior (simple)
    document.getElementById('mobile-menu').addEventListener('click',()=>{
      const ul = document.querySelector('nav ul');
      if(ul.style.display==='flex') ul.style.display='none'; else ul.style.display='flex';
      ul.style.flexDirection='column'; ul.style.position='absolute'; ul.style.right='18px'; ul.style.background='rgba(2,6,10,0.7)'; ul.style.padding='12px'; ul.style.borderRadius='10px';
    })

    // init
    renderProducts(products);
    document.getElementById('open-cart').addEventListener('click',toggleCart);
    
    
// script.js
// Selektor yang cocok dengan HTML kamu
const mobileBtn = document.getElementById('mobile-menu'); // tombol menu
const nav = document.querySelector('nav');                 // elemen nav
const navList = document.querySelector('nav ul');         // daftar menu (ul)

// Safety: jika elemen tidak ada, hentikan
if (!mobileBtn || !nav || !navList) {
  console.warn('script.js: elemen navbar tidak ditemukan. Periksa id dan struktur HTML.');
} else {
  // Toggle class 'open' pada <nav> ul saat tombol ditekan
  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();               // jangan teruskan click ke document
    navList.classList.toggle('open');
    // pastikan style flex-column ketika mobile
    if (navList.classList.contains('open')) {
      navList.style.display = 'flex';
      navList.style.flexDirection = 'column';
      navList.style.position = 'absolute';
      navList.style.right = '18px';
      navList.style.background = 'rgba(2,6,10,0.7)';
      navList.style.padding = '12px';
      navList.style.borderRadius = '10px';
    } else {
      navList.style.display = ''; // kembalikan ke default CSS
    }
  });

  // Bila klik terjadi di mana pun pada dokumen:
  // - jika target tidak berada dalam <nav> (meng-include tombol), maka tutup menu
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navList.classList.contains('open')) {
      navList.classList.remove('open');
      navList.style.display = '';
    }
  });

  // Untuk hover-out: tutup ketika mouse meninggalkan area navbar
  // (berguna untuk desktop; mobile mengabaikan mouseleave)
  nav.addEventListener('mouseleave', () => {
    if (navList.classList.contains('open')) {
      navList.classList.remove('open');
      navList.style.display = '';
    }
  });

  // Untuk perangkat sentuh: tutup jika ada touchstart di luar navbar
  document.addEventListener('touchstart', (e) => {
    if (!nav.contains(e.target) && navList.classList.contains('open')) {
      navList.classList.remove('open');
      navList.style.display = '';
    }
  }, {passive: true});
}



