// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载热销产品
    loadFeaturedProducts();
    
    // 初始化购物车
    initCart();
});

// 加载热销产品
function loadFeaturedProducts() {
    const productsContainer = document.getElementById('featured-products');
    
    // 模拟产品数据
    const products = [
        {
            id: 1,
            name: '舒适纯棉运动袜',
            price: 29.9,
            originalPrice: 39.9,
            image: 'images/products/product1.jpg',
            rating: 4.5,
            sold: 1234
        },
        {
            id: 2,
            name: '商务男士正装袜',
            price: 49.9,
            originalPrice: 69.9,
            image: 'images/products/product2.jpg',
            rating: 4.8,
            sold: 856
        },
        {
            id: 3,
            name: '可爱卡通儿童袜',
            price: 19.9,
            originalPrice: 29.9,
            image: 'images/products/product3.jpg',
            rating: 4.6,
            sold: 2341
        },
        {
            id: 4,
            name: '时尚女士蕾丝袜',
            price: 39.9,
            originalPrice: 59.9,
            image: 'images/products/product4.jpg',
            rating: 4.7,
            sold: 678
        }
    ];
    
    // 清空容器
    productsContainer.innerHTML = '';
    
    // 生成产品HTML
    products.forEach(product => {
        const productCard = `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <div class="mb-2">
                            <span class="price">¥${product.price}</span>
                            <span class="original-price">¥${product.originalPrice}</span>
                        </div>
                        <div class="mb-2">
                            <span class="text-warning">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                            <span class="text-muted">(${product.rating})</span>
                        </div>
                        <p class="text-muted">已售 ${product.sold} 件</p>
                        <div class="mt-auto">
                            <a href="pages/product-detail.html?id=${product.id}" class="btn btn-outline-primary btn-sm me-2">查看详情</a>
                            <button class="btn btn-primary btn-sm add-to-cart" data-product-id="${product.id}">加入购物车</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        productsContainer.innerHTML += productCard;
    });
    
    // 添加加入购物车事件监听
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
}

// 初始化购物车
function initCart() {
    // 从localStorage获取购物车数据
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 更新购物车数量显示
    updateCartCount(cart);
}

// 添加到购物车
function addToCart(productId) {
    // 获取购物车数据
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 查找产品是否已在购物车中
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        // 如果已存在，增加数量
        existingItem.quantity++;
    } else {
        // 如果不存在，添加到购物车
        // 这里应该从产品数据中获取产品信息，简化处理
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    
    // 保存到localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 更新购物车数量显示
    updateCartCount(cart);
    
    // 显示成功提示
    alert('已添加到购物车！');
}

// 更新购物车数量显示
function updateCartCount(cart) {
    const cartCount = document.querySelector('.badge');
    if (cartCount) {
        // 计算购物车中的总数量
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}