// ======================================
// KATALOG UMKM KULINER MEDAN
// DATABASE PRODUK
// ======================================

const products = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    category: "Makanan",
    price: 18000,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
    description: "Nasi goreng lezat dengan topping spesial."
  },
  {
    id: 2,
    name: "Mie Ayam",
    category: "Makanan",
    price: 15000,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600",
    description: "Mie dengan ayam dan bumbu pilihan."
  },
  {
    id: 3,
    name: "Burger Beef",
    category: "Makanan",
    price: 22000,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    description: "Burger daging sapi dengan sayuran segar."
  },
  {
    id: 4,
    name: "Pizza Keju",
    category: "Makanan",
    price: 30000,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    description: "Pizza dengan keju melimpah."
  },
  {
    id: 5,
    name: "Sate Ayam",
    category: "Makanan",
    price: 20000,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600",
    description: "Sate ayam dengan bumbu kacang."
  },
  {
    id: 6,
    name: "Kentang Goreng",
    category: "Camilan",
    price: 12000,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
    description: "Kentang goreng renyah dan gurih."
  },
  {
    id: 7,
    name: "Donat Cokelat",
    category: "Camilan",
    price: 10000,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600",
    description: "Donat lembut dengan topping cokelat."
  },
  {
    id: 8,
    name: "Risoles",
    category: "Camilan",
    price: 8000,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600",
    description: "Camilan gurih dengan isian lezat."
  },
  {
    id: 9,
    name: "Es Kopi Susu",
    category: "Minuman",
    price: 15000,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    description: "Kopi susu dingin dan menyegarkan."
  },
  {
    id: 10,
    name: "Jus Jeruk",
    category: "Minuman",
    price: 12000,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600",
    description: "Jus jeruk segar kaya vitamin."
  },
  {
    id: 11,
    name: "Matcha Latte",
    category: "Minuman",
    price: 18000,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600",
    description: "Minuman matcha creamy."
  },
  {
    id: 12,
    name: "Strawberry Smoothie",
    category: "Minuman",
    price: 17000,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600",
    description: "Minuman strawberry yang segar."
  }
];

// ======================================
// PENGATURAN APLIKASI
// ======================================

// GANTI dengan nomor WhatsApp pemilik UMKM.
// Gunakan kode negara 62, tanpa tanda + atau angka 0 di depan.

const WHATSAPP_NUMBER = "+62 815-3769-4006";

// ======================================
// LOCAL STORAGE
// ======================================

let cart = JSON.parse(localStorage.getItem("kulinerCart")) || [];

function saveCart() {
  localStorage.setItem("kulinerCart", JSON.stringify(cart));
}

// ======================================
// FORMAT RUPIAH
// ======================================

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

// ======================================
// TAMPILKAN PRODUK
// ======================================

function displayProducts(category = "Semua", keyword = "") {
  const container = document.getElementById("productList");

  const filtered = products.filter(product => {
    const cocokKategori =
      category === "Semua" || product.category === category;

    const cocokNama =
      product.name.toLowerCase().includes(keyword.toLowerCase());

    return cocokKategori && cocokNama;
  });

  if (filtered.length === 0) {
    container.innerHTML =
      `<div class="col-12 text-center text-secondary p-5">
        Produk tidak ditemukan.
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(product => `
    <div class="col-6 col-md-6 col-xl-4">
      <div class="card product-card">

        <img
          src="${product.image}"
          class="product-img"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x400/f7e2d6/765747?text=${encodeURIComponent(product.name)}'">

        <div class="card-body">
          <span class="category-badge">
            ${product.category}
          </span>

          <h6 class="fw-bold mt-2">${product.name}</h6>

          <p class="small text-secondary">
            ${product.description}
          </p>

          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <span class="price">${rupiah(product.price)}</span>

            <button
              class="btn btn-main btn-sm"
              onclick="addToCart(${product.id})">
              <i class="bi bi-plus-lg"></i> Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// ======================================
// TAMBAH KE KERANJANG
// ======================================

function addToCart(id) {
  const product = products.find(item => item.id === id);

  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
}

// ======================================
// TAMBAH / KURANGI JUMLAH
// ======================================

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  renderCart();
}

// ======================================
// HAPUS SATU PRODUK
// ======================================

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
  renderCart();
}

// ======================================
// HAPUS SEMUA KERANJANG
// ======================================

function clearCart() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  if (confirm("Yakin ingin menghapus semua produk?")) {
    cart = [];
    saveCart();
    renderCart();
  }
}

// ======================================
// HITUNG TOTAL BELANJA
// ======================================

function getTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

// ======================================
// TAMPILKAN KERANJANG
// ======================================

function renderCart() {
  const container = document.getElementById("cartItems");

  const cartCount = document.getElementById("cartCount");

  const totalPrice = document.getElementById("totalPrice");

  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="bi bi-cart-x" style="font-size:45px"></i>
        <p>Keranjang masih kosong.</p>
        <small>Silakan pilih produk terlebih dahulu.</small>
      </div>
    `;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">

        <div class="d-flex justify-content-between gap-2">
          <div>
            <strong>${item.name}</strong>
            <div class="small text-secondary">
              ${rupiah(item.price)} / produk
            </div>
          </div>

          <button
            class="btn btn-sm text-danger"
            onclick="removeItem(${item.id})"
            title="Hapus produk">
            <i class="bi bi-trash3"></i>
          </button>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-2">

          <div class="d-flex align-items-center gap-2">
            <button class="quantity-btn"
              onclick="changeQuantity(${item.id}, -1)">
              −
            </button>

            <strong>${item.quantity}</strong>

            <button class="quantity-btn"
              onclick="changeQuantity(${item.id}, 1)">
              +
            </button>
          </div>

          <strong class="price">
            ${rupiah(item.price * item.quantity)}
          </strong>
        </div>

      </div>
    `).join("");
  }

  totalPrice.textContent = rupiah(getTotal());

  calculateChange();
}

// ======================================
// METODE PEMBAYARAN
// ======================================

function getPayment() {
  const selected = document.querySelector(
    'input[name="payment"]:checked'
  );

  return selected ? selected.value : "Tunai";
}

function updatePayment() {
  const method = getPayment();

  const cashSection = document.getElementById("cashSection");

  const paymentInfo = document.getElementById("paymentInfo");

  if (method === "Tunai") {
    cashSection.style.display = "block";
    paymentInfo.style.display = "none";
  }

  else if (method === "QRIS") {
    cashSection.style.display = "none";
    paymentInfo.style.display = "block";

    paymentInfo.innerHTML = `
      <strong><i class="bi bi-qr-code"></i> Pembayaran QRIS</strong>
      <p class="mb-0 mt-1">
        Silakan lakukan pembayaran melalui QRIS
        milik penjual. Konfirmasi pembayaran kepada admin.
      </p>
    `;
  }

  else if (method === "Transfer Bank") {
    cashSection.style.display = "none";
    paymentInfo.style.display = "block";

    paymentInfo.innerHTML = `
      <strong><i class="bi bi-bank"></i> Transfer Bank</strong>
      <p class="mb-0 mt-1">
        Silakan transfer ke rekening bank milik penjual.
        Nomor rekening dikonfirmasi melalui WhatsApp.
      </p>
    `;
  }

  calculateChange();
}

// ======================================
// KALKULATOR KEMBALIAN
// ======================================

function calculateChange() {
  const cashInput = document.getElementById("cashAmount");

  const changeElement = document.getElementById("changeAmount");

  if (getPayment() !== "Tunai") {
    changeElement.textContent = rupiah(0);
    return;
  }

  const cash = Number(cashInput.value) || 0;

  const total = getTotal();

  const change = cash - total;

  if (cash === 0) {
    changeElement.textContent = rupiah(0);
    changeElement.style.color = "#765747";
  }

  else if (change < 0) {
    changeElement.textContent =
      "Kurang " + rupiah(Math.abs(change));

    changeElement.style.color = "red";
  }

  else {
    changeElement.textContent = rupiah(change);
    changeElement.style.color = "green";
  }
}

// ======================================
// CHECKOUT VIA WHATSAPP
// ======================================

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang belanja masih kosong!");
    return;
  }

  const name = document.getElementById("customerName").value.trim();

  const phone = document.getElementById("customerPhone").value.trim();

  if (!name || !phone) {
    alert("Silakan isi nama dan nomor WhatsApp!");
    return;
  }

  const method = getPayment();

  const total = getTotal();

  const cash = Number(
    document.getElementById("cashAmount").value
  ) || 0;

  if (method === "Tunai" && cash < total) {
    alert("Uang pembayaran masih kurang!");
    return;
  }

  let message = "";

  message += "*PESANAN KULINER MEDAN*\n";
  message += "========================\n\n";

  message += "*Data Pelanggan*\n";
  message += "Nama: " + name + "\n";
  message += "WhatsApp: " + phone + "\n\n";

  message += "*Daftar Pesanan*\n";

  cart.forEach((item, index) => {
    message +=
      (index + 1) + ". " +
      item.name + "\n" +
      "   " + item.quantity + " x " +
      rupiah(item.price) + " = " +
      rupiah(item.price * item.quantity) + "\n";
  });

  message += "\n========================\n";
  message += "*TOTAL: " + rupiah(total) + "*\n\n";

  message += "*Metode Pembayaran:* " + method + "\n";

  if (method === "Tunai") {
    message += "Uang Dibayar: " + rupiah(cash) + "\n";
    message += "Kembalian: " + rupiah(cash - total) + "\n";
  }

  message += "\nMohon konfirmasi pesanan saya. Terima kasih!";

  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}

// ======================================
// FILTER KATEGORI
// ======================================

let activeCategory = "Semua";

document.querySelectorAll(".filter-btn").forEach(button => {

  button.addEventListener("click", function() {

    activeCategory = this.dataset.category;

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("btn-main");
      btn.classList.add("btn-outline-secondary");
    });

    this.classList.remove("btn-outline-secondary");
    this.classList.add("btn-main");

    displayProducts(
      activeCategory,
      document.getElementById("searchInput").value
    );
  });

});

// ======================================
// PENCARIAN PRODUK
// ======================================

document.getElementById("searchInput")
  .addEventListener("input", function() {

    displayProducts(activeCategory, this.value);

  });

// ======================================
// EVENT PEMBAYARAN
// ======================================

document.querySelectorAll('input[name="payment"]')
  .forEach(input => {

    input.addEventListener("change", updatePayment);

  });

document.getElementById("cashAmount")
  .addEventListener("input", calculateChange);

// ======================================
// JALANKAN APLIKASI
// ======================================

displayProducts();

renderCart();

updatePayment();