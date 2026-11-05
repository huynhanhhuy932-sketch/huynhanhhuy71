// --- 1. DỮ LIỆU SẢN PHẨM MẪU ---
const products = [
    {
        id: 1,
        name: "Áo T-Shirt Oversize Cotton Graphic Karen",
        category: "Áo T-Shirt",
        price: 290000,
        originalPrice: 380000,
        rating: 5,
        reviews: 38,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        description: "Áo phông phom dáng Oversize trẻ trung, vải Cotton 100% 2 chiều thoáng mát, in chất lượng cao không bong tróc.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Đen", "Trắng"]
    },
    {
        id: 2,
        name: "Áo Sơ Mi Lụa Cổ Tàu Luxury",
        category: "Áo Sơ Mi",
        price: 450000,
        originalPrice: 550000,
        rating: 5,
        reviews: 42,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
        description: "Áo sơ mi cổ tàu phong cách lịch lãm, chất liệu lụa tổng hợp cao cấp chống nhăn, phù hợp đi học và dự tiệc.",
        sizes: ["M", "L", "XL"],
        colors: ["Trắng", "Xanh Thẫm"]
    },
    {
        id: 3,
        name: "Quần Jeans Slim-Fit Co Giãn Premium",
        category: "Quần Jeans",
        price: 520000,
        originalPrice: 650000,
        rating: 4,
        reviews: 29,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
        description: "Quần Jeans Slim-Fit co giãn nhẹ giúp vận động thoải mái, tông màu xanh denim tôn dáng cực chuẩn.",
        sizes: ["29", "30", "31", "32"],
        colors: ["Xanh Denim", "Đen Trơn"]
    },
    {
        id: 4,
        name: "Áo Khoác Denim Jacket Urban Style",
        category: "Áo Khoác",
        price: 680000,
        originalPrice: 850000,
        rating: 5,
        reviews: 27,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
        description: "Áo khoác Denim bụi bặm phong cách dạo phố cá tính, chất vải bò dày dặn, may tỉ mỉ từng chi tiết.",
        sizes: ["M", "L", "XL"],
        colors: ["Xanh Bạc", "Đen Khoáng"]
    },
    {
        id: 5,
        name: "Kính Râm Thời Trang Urban Elite",
        category: "Phụ Kiện",
        price: 250000,
        originalPrice: 350000,
        rating: 4,
        reviews: 15,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
        description: "Mắt kính chống tia UV400 bảo vệ mắt hoàn hảo, gọng kim loại mạ mờ sang trọng.",
        sizes: ["Freesize"],
        colors: ["Đen Gold"]
    },
    {
        id: 6,
        name: "Túi Xách Da Bò Karen Signature",
        category: "Phụ Kiện",
        price: 890000,
        originalPrice: 1100000,
        rating: 5,
        reviews: 53,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
        description: "Túi xách da tổng hợp cao cấp Karen, khóa mạ vàng tinh xảo, dung tích rộng đựng đồ thoải mái.",
        sizes: ["Freesize"],
        colors: ["Đen", "Nâu Cà Phê"]
    }
];

// --- 2. DỮ LIỆU ĐÁNH GIÁ MẪU ---
let reviewsData = [
    {
        name: "Trần Minh Tuấn",
        rating: 5,
        date: "20/10/2026",
        text: "Áo T-Shirt mặc rất mát, chất vải dày dặn đúng chuẩn Cotton. Giao hàng đến Gò Vấp rất nhanh!"
    },
    {
        name: "Lê Thị Thu Thảo",
        rating: 5,
        date: "18/10/2026",
        text: "Quần Jeans form chuẩn đẹp, co giãn tốt. Sẽ tiếp tục ủng hộ shop HUY KAREN dài dài."
    }
];

// --- 3. QUẢN LÝ TRẠNG THÁI ---
let cart = [];
let activeCategory = "All";
let currentModalProduct = null;
let selectedSize = "";
let selectedColor = "";
let modalQty = 1;
let currentStarInput = 5;

// Khởi tạo trang web khi tải xong
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    renderReviews();
    updateCartUI();
});

// --- 4. HIỂN THỊ SẢN PHẨM ---
function renderProducts(items) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="no-products">
                <i class="fa-solid fa-box-open"></i>
                <p>Không tìm thấy sản phẩm phù hợp!</p>
            </div>
        `;
        return;
    }

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
                <span class="badge-sale">SALE</span>
            </div>
            <div class="product-info">
                <span class="product-cat">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${getStarsHTML(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-bottom">
                    <div class="price-box">
                        <span class="price-current">${product.price.toLocaleString("vi-VN")}đ</span>
                        <span class="price-old">${product.originalPrice.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <div class="card-actions">
                        <button class="btn-icon" title="Xem chi tiết"
                            onclick="openProductModal(${product.id})">
                            <i class="fa-regular fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-cart-add" title="Thêm giỏ hàng"
                            onclick="quickAddToCart(${product.id})">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Tạo các ngôi sao đánh giá
function getStarsHTML(rating) {
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else {
            stars += '<i class="fa-regular fa-star" style="color: #cbd5e1;"></i>';
        }
    }

    return stars;
}

// --- 5. TÌM KIẾM VÀ LỌC SẢN PHẨM ---
function filterCategory(category, button) {
    activeCategory = category;

    document.querySelectorAll(".pill-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    applyFilters();
}

function handleSearch() {
    applyFilters();
}

function applyFilters() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const sortValue = document.getElementById("sortSelect").value;

    let filtered = products.filter(product => {
        const matchCategory =
            activeCategory === "All" || product.category === activeCategory;

        const matchQuery =
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query);

        return matchCategory && matchQuery;
    });

    if (sortValue === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
}

// --- 6. XEM CHI TIẾT SẢN PHẨM ---
function openProductModal(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    currentModalProduct = product;
    modalQty = 1;
    selectedSize = product.sizes[0] || "";
    selectedColor = product.colors[0] || "";

    document.getElementById("modalImg").src = product.image;
    document.getElementById("modalCat").innerText = product.category;
    document.getElementById("modalTitle").innerText = product.name;
    document.getElementById("modalRating").innerHTML =
        getStarsHTML(product.rating) +
        ` <span style="font-size:0.8rem; color:var(--text-muted);">(${product.reviews} đánh giá)</span>`;
    document.getElementById("modalPrice").innerText =
        product.price.toLocaleString("vi-VN") + "đ";
    document.getElementById("modalOldPrice").innerText =
        product.originalPrice.toLocaleString("vi-VN") + "đ";
    document.getElementById("modalDesc").innerText = product.description;
    document.getElementById("modalQty").innerText = modalQty;

    // Hiển thị các nút chọn size
    const sizeContainer = document.getElementById("sizeSelector");
    sizeContainer.innerHTML = "";

    product.sizes.forEach(size => {
        const button = document.createElement("button");
        button.className = `opt-btn ${size === selectedSize ? "selected" : ""}`;
        button.innerText = size;

        button.onclick = () => {
            selectedSize = size;

            document.querySelectorAll("#sizeSelector .opt-btn").forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");
        };

        sizeContainer.appendChild(button);
    });

    // Hiển thị các nút chọn màu
    const colorContainer = document.getElementById("colorSelector");
    colorContainer.innerHTML = "";

    product.colors.forEach(color => {
        const button = document.createElement("button");
        button.className = `opt-btn ${color === selectedColor ? "selected" : ""}`;
        button.innerText = color;

        button.onclick = () => {
            selectedColor = color;

            document.querySelectorAll("#colorSelector .opt-btn").forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");
        };

        colorContainer.appendChild(button);
    });

    document.getElementById("productModal").classList.add("active");
}

function closeProductModal() {
    document.getElementById("productModal").classList.remove("active");
}

function changeModalQty(value) {
    modalQty = Math.max(1, modalQty + value);
    document.getElementById("modalQty").innerText = modalQty;
}

function addModalToCart() {
    if (!currentModalProduct) return;

    addToCart({
        id: currentModalProduct.id,
        name: currentModalProduct.name,
        price: currentModalProduct.price,
        image: currentModalProduct.image,
        size: selectedSize,
        color: selectedColor,
        qty: modalQty
    });

    closeProductModal();
    showToast("Đã thêm sản phẩm vào giỏ hàng!");
    openCartDrawer();
}

// --- 7. QUẢN LÝ GIỎ HÀNG ---
function quickAddToCart(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.sizes[0] || "Freesize",
        color: product.colors[0] || "Mặc định",
        qty: 1
    });

    showToast("Đã thêm vào giỏ hàng!");
    openCartDrawer();
}

function addToCart(item) {
    const existIndex = cart.findIndex(product =>
        product.id === item.id &&
        product.size === item.size &&
        product.color === item.color
    );

    if (existIndex > -1) {
        cart[existIndex].qty += item.qty;
    } else {
        cart.push(item);
    }

    updateCartUI();
}

function updateCartQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    updateCartUI();
}

function updateCartUI() {
    const cartBody = document.getElementById("cartBody");
    const cartBadge = document.getElementById("cartBadge");
    const cartTotal = document.getElementById("cartTotal");

    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.innerText = totalCount;

    cartBody.innerHTML = "";

    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 40px 0;">
                <i class="fa-solid fa-bag-shopping" style="font-size: 2.5rem; margin-bottom: 12px;"></i>
                <p>Giỏ hàng của bạn đang trống</p>
            </div>
        `;
    } else {
        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
                <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-meta">Size: ${item.size} | Màu: ${item.color}</div>
                    <div style="font-weight: 800; font-size: 0.9rem;">
                        ${(item.price * item.qty).toLocaleString("vi-VN")}đ
                    </div>
                    <div class="qty-picker" style="margin-top: 6px;">
                        <button onclick="updateCartQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty(${index}, 1)">+</button>
                    </div>
                </div>
            `;

            cartBody.appendChild(div);
        });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartTotal.innerText = total.toLocaleString("vi-VN") + "đ";
}

function openCartDrawer() {
    document.getElementById("cartDrawer").classList.add("active");
}

function closeCartDrawer() {
    document.getElementById("cartDrawer").classList.remove("active");
}

// --- 8. THANH TOÁN VÀ ĐẶT HÀNG ---
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("Giỏ hàng trống! Vui lòng chọn sản phẩm.");
        return;
    }

    closeCartDrawer();
    document.getElementById("checkoutModal").classList.add("active");
}

function closeCheckoutModal() {
    document.getElementById("checkoutModal").classList.remove("active");
}

function processCheckout(event) {
    event.preventDefault();

    closeCheckoutModal();
    cart = [];
    updateCartUI();

    document.getElementById("successModal").classList.add("active");
}

function closeSuccessModal() {
    document.getElementById("successModal").classList.remove("active");
}

// --- 9. HỆ THỐNG ĐÁNH GIÁ ---
function renderReviews() {
    const list = document.getElementById("reviewsList");
    list.innerHTML = "";

    reviewsData.forEach(review => {
        const card = document.createElement("div");
        card.className = "review-card";

        card.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-stars">${getStarsHTML(review.rating)}</div>
            <p class="review-text">${review.text}</p>
        `;

        list.appendChild(card);
    });
}

function setRating(value) {
    currentStarInput = value;

    const stars = document.querySelectorAll("#starInput i");

    stars.forEach((star, index) => {
        if (index < value) {
            star.className = "fa-solid fa-star active";
        } else {
            star.className = "fa-solid fa-star";
        }
    });
}

function submitReview(event) {
    event.preventDefault();

    const name = document.getElementById("revName").value;
    const comment = document.getElementById("revComment").value;

    reviewsData.unshift({
        name: name,
        rating: currentStarInput,
        date: new Date().toLocaleDateString("vi-VN"),
        text: comment
    });

    renderReviews();
    document.getElementById("reviewForm").reset();
    setRating(5);
    showToast("Cảm ơn bạn đã gửi đánh giá!");
}

// --- 10. THÔNG BÁO VÀ MENU MOBILE ---
function showToast(message) {
    const toast = document.getElementById("toastMsg");
    document.getElementById("toastText").innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function toggleMobileMenu() {
    document.getElementById("navMenu").classList.toggle("active");
}

function closeMobileMenu() {
    document.getElementById("navMenu").classList.remove("active");
}