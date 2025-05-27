<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр товара</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="product" class="product-details">
      <div class="product-image-container">
        <img
          v-if="product.image"
          :src="`${backendUrl}${product.image.replace('/img/', '/images/')}`"
          alt="Product Image"
          class="product-image"
          @error="handleImageError"
        />
        <span v-else>Нет изображения</span>
      </div>
      <div class="product-info">
        <p><strong>Название:</strong> {{ product.name || '-' }}</p>
        <p><strong>Производитель:</strong> {{ product.manufacturer || '-' }}</p>
        <p><strong>Категория:</strong> {{ product.category || '-' }}</p>
        <p><strong>Цена:</strong> {{ formatPrice(product.price) }}</p>
        <p><strong>Количество на складе:</strong> {{ product.stock_quantity || '-' }}</p>
        <p><strong>Срок годности:</strong> {{ formatDate(product.expiration_date) || '-' }}</p>
        <p><strong>Требуется рецепт:</strong> {{ product.prescription_required ? 'Да' : 'Нет' }}</p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/products')">Вернуться к списку</button>
      </div>
    </div>
    <div v-else class="error-message">Не удалось загрузить данные о товаре.</div>
  </div>
</template>

<script>
export default {
  name: 'ViewProduct',
  data() {
    return {
      product: null,
      loading: true,
      errorMessage: null,
      backendUrl: 'https://knode-nl4t.onrender.com',
    };
  },
  async created() {
    const productId = this.$route.params.id;
    if (!/^\d+$/.test(productId)) {
      this.errorMessage = 'Некорректный ID';
      this.loading = false;
      return;
    }
    await this.fetchProduct(productId);
  },
  methods: {
    async fetchProduct(productId) {
      try {
        const response = await fetch(`${this.backendUrl}/api/view-product/${productId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          if (response.status === 404) {
            throw new Error('Товар не найден');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Отладка
        this.product = data;
      } catch (err) {
        console.error('Ошибка при получении данных товара:', err);
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      if (!date) return 'N/A';
      const d = new Date(date);
      return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },
    formatPrice(price) {
      if (price == null) return '-';
      const numericPrice = parseFloat(price);
      return !isNaN(numericPrice) ? `${numericPrice.toFixed(2)} ₽` : '-';
    },
    handleImageError() {
      console.error('Ошибка загрузки изображения товара');
    },
  },
};
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #ffffff, #ffe6e6);
  color: #3d0000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
  background: linear-gradient(90deg, #d32f2f, #b71c1c);
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-details {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.product-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.product-image-container .product-image {
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.product-image-container .product-image:hover {
  transform: scale(1.05);
}

.product-info {
  text-align: center;
  width: 100%;
  word-wrap: break-word;
}

.product-info p {
  margin: 10px 0;
  color: #3d0000;
  font-size: 1.25rem;
}

.product-info strong {
  color: #3d0000;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #d32f2f, #b71c1c);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.btn-secondary:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.loading-message,
.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: #3d0000;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .product-details {
    padding: 15px;
  }

  .product-image-container .product-image {
    max-width: 120px;
    max-height: 120px;
  }

  .product-info p {
    font-size: 1rem;
  }

  .btn-secondary {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
}
</style>
