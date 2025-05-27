<template>
  <main>
    <div class="container">
      <h1 class="page-title">Добро пожаловать в нашу онлайн-аптеку</h1>

      <!-- Блок с карточками -->
      <div class="flex flex-col sm:flex-row gap-6 mb-10 justify-center">
        <div class="image-block-centered card fade-in" v-for="(service, index) in services" :key="index" :style="{ animationDelay: index * 0.2 + 's' }">
          <img :src="service.image" :alt="service.name" class="img-block h-48 w-full object-cover">
          <div class="card-body">
            <h5 class="text-xl font-bold text-center mb-3">{{ service.name }}</h5>
          </div>
        </div>
      </div>

      <!-- Блок "Ваше здоровье — наш приоритет" -->
      <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-12">
        <div class="content-block card fade-in" :style="{ animationDelay: '0.2s' }">
          <h4 class="text-2xl font-bold mb-4 text-center">Ваше здоровье — наш приоритет</h4>
          <ul class="text-lg space-y-4">
            <li class="flex items-center bg-white bg-opacity-20 p-3 rounded-lg fade-in" v-for="(reason, index) in reasons" :key="index" :style="{ animationDelay: (index + 1) * 0.2 + 's' }">
              <span class="text-green-500 mr-3 text-2xl">✅</span>
              <span class="text-gray-600">{{ reason }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      services: [
        {
          name: 'Лекарства',
          image: '/images/1.jpg'
        },
        {
          name: 'Витамины',
          image: '/images/2.jpg'
        },
        {
          name: 'Аптека',
          image: '/images/3.jpg'
        }
      ],
      reasons: [
        'Доступные цены на сертифицированные препараты',
        'Индивидуальный подход к каждому клиенту',
        'Удобный поиск и заказ лекарств онлайн',
        'Надежная защита ваших данных'
      ]
    };
  },
  mounted() {
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      this.$el.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
      });
    } catch (err) {
      console.error('Error setting up IntersectionObserver:', err);
    }
  }
}
</script>

<style scoped>
body {
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 2.5rem;
  text-align: center;
  background: linear-gradient(90deg, #d32f2f, #b71c1c);
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fs-5 {
  font-size: 1.25rem;
  color: #4b5563;
}

.text-center {
  text-align: center;
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

@media (min-width: 640px) {
  .sm\:flex-row {
    flex-direction: row;
  }
}

.gap-6 {
  gap: 1.5rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.image-block-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.img-block {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1.5rem;
}

.text-xl {
  font-size: 1.25rem;
  color: #1f2937;
}

.font-bold {
  font-weight: 700;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.875rem;
  color: #4b5563;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .md\:grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.content-block {
  padding: 1.5rem;
  background: linear-gradient(90deg, #d32f2f, #b71c1c);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-2xl {
  font-size: 1.5rem;
  color: #ffffff;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}

.text-green-500 {
  color: #10b981;
}

.text-gray-600 {
  color: #ffffff;
}

.bg-opacity-20 {
  background-color: rgba(255, 255, 255, 0.2);
}

.p-3 {
  padding: 0.75rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .img-block {
    height: 150px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .text-xl {
    font-size: 1rem;
  }

  .text-lg {
    font-size: 0.875rem;
  }
}
</style>