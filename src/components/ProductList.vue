<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <div class="app-container">
      <h1 class="page-title">Список товаров</h1>
      <div style="text-align: center; margin-bottom: 20px;">
        <router-link to="/products/create" class="btn-primary">Добавить товар</router-link>
      </div>
      <div class="table-container">
        <table class="styled-table products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Производитель</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Срок годности</th>
              <th>Рецепт</th>
              <th>Изображение</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in products" :key="item.id">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ item.name || '-' }}</td>
              <td>{{ item.manufacturer || '-' }}</td>
              <td>{{ item.category || '-' }}</td>
              <td>{{ formatPrice(item.price) }}</td>
              <td>{{ item.stock_quantity || '-' }}</td>
              <td>{{ formatDate(item.expiration_date) || '-' }}</td>
              <td>{{ item.prescription_required ? 'Да' : 'Нет' }}</td>
              <td>
                <img
                  v-if="item.image"
                  :src="`${backendUrl}${item.image.replace('/img/', '/images/')}`"
                  alt="Product Image"
                  class="product-image"
                  @error="handleImageError(item)"
                />
                <span v-else>-</span>
              </td>
              <td>
                <div class="action-buttons">
                  <router-link :to="`/product/${item.id}`" class="action-btn view-icon">
                    <i class="fas fa-eye"></i>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!products.length" class="no-data">Нет товаров</p>
        <div class="pagination" v-if="totalPages > 1">
          <button @click="prevPage" :disabled="currentPage === 1">← Предыдущая</button>
          <span>Страница {{ currentPage }} из {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Следующая →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      backendUrl: 'https://knode-nl4t.onrender.com',
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(`${this.backendUrl}/api/products?page=${this.currentPage}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          if (response.status === 401) {
            this.$router.push('/login');
            return;
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); // Debug: Inspect price field
        this.products = data.products || [];
        this.totalPages = data.totalPages || 0;
        this.currentPage = data.currentPage || 1;
      } catch (err) {
        console.error('Ошибка при загрузке товаров:', err);
        this.products = [];
        this.totalPages = 0;
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchProducts();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchProducts();
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
    handleImageError(item) {
      console.error(`Failed to load image for product ${item.id}: ${item.image}`);
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
  justify-content: center;
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
}

.btn-primary {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: #d32f2f;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}

.btn-primary:hover {
  background: #b71c1c;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.table-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.styled-table.products-table {
  width: 100%;
  min-width: 600px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.styled-table.products-table th,
.styled-table.products-table td {
  padding: 10px 8px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid rgba(183, 28, 28, 0.3);
  border-right: 1px solid rgba(183, 28, 28, 0.3);
  white-space: normal;
  word-break: break-word;
  color: #3d0000;
  font-size: 0.85rem;
}

.styled-table.products-table th {
  background: rgba(255, 235, 238, 0.5);
  color: #3d0000;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.styled-table.products-table th:last-child,
.styled-table.products-table td:last-child {
  border-right: none;
}

.styled-table.products-table tbody tr:last-child td {
  border-bottom: none;
}

.styled-table.products-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.7);
}

.styled-table.products-table tbody tr:hover {
  background: rgba(211, 47, 47, 0.1);
  transition: background 0.3s ease;
}

/* Ширины столбцов */
.styled-table.products-table th:nth-child(1),
.styled-table.products-table td:nth-child(1) {
  width: 5%;
  min-width: 40px;
  max-width: 60px;
}

.styled-table.products-table th:nth-child(2),
.styled-table.products-table td:nth-child(2) {
  width: 15%;
  min-width: 100px;
  max-width: 150px;
}

.styled-table.products-table th:nth-child(3),
.styled-table.products-table td:nth-child(3) {
  width: 15%;
  min-width: 80px;
  max-width: 120px;
}

.styled-table.products-table th:nth-child(4),
.styled-table.products-table td:nth-child(4) {
  width: 10%;
  min-width: 80px;
  max-width: 120px;
}

.styled-table.products-table th:nth-child(5),
.styled-table.products-table td:nth-child(5) {
  width: 10%;
  min-width: 60px;
  max-width: 100px;
}

.styled-table.products-table th:nth-child(6),
.styled-table.products-table td:nth-child(6) {
  width: 10%;
  min-width: 60px;
  max-width: 100px;
}

.styled-table.products-table th:nth-child(7),
.styled-table.products-table td:nth-child(7) {
  width: 10%;
  min-width: 80px;
  max-width: 120px;
}

.styled-table.products-table th:nth-child(8),
.styled-table.products-table td:nth-child(8) {
  width: 8%;
  min-width: 60px;
  max-width: 80px;
}

.styled-table.products-table th:nth-child(9),
.styled-table.products-table td:nth-child(9) {
  width: 8%;
  min-width: 60px;
  max-width: 80px;
}

.styled-table.products-table th:nth-child(10),
.styled-table.products-table td:nth-child(10) {
  width: 10%;
  min-width: 60px;
  max-width: 80px;
}

.product-image {
  max-width: 50px;
  max-height: 50px;
  border-radius: 8px;
  object-fit: cover;
  vertical-align: middle;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
  color: #3d0000;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
  padding: 20px 0;
}

.pagination button {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: #d32f2f;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.pagination button:disabled {
  background: #b0bec5;
  cursor: not-allowed;
  box-shadow: none;
}

.pagination button:hover:not(:disabled) {
  background: #b71c1c;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.pagination span {
  color: #3d0000;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #d32f2f;
  color: #ffffff;
  font-size: 1rem;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.action-btn:hover {
  background: #b71c1c;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.view-icon:hover {
  background: #2e7d32;
}

@media (max-width: 768px) {
  .app-container {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .table-container {
    padding: 10px;
  }

  .styled-table.products-table th,
  .styled-table.products-table td {
    padding: 6px;
    font-size: 0.8rem;
  }

  .products-table th,
  .products-table td {
    min-width: 30px;
  }

  .product-image {
    max-width: 40px;
    max-height: 40px;
  }

  .pagination button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  .action-btn {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
}
</style>
