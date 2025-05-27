<template>
  <main>
    <div class="container">
      <h1 class="page-title">Наши сотрудники</h1>

      <!-- Фотогалерея сотрудников -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-center mb-6">Профессионалы, которые заботятся о вашем здоровье</h2>
        <div class="employees-row">
          <div class="employee-card photo-card fade-in" v-for="(employee, index) in employees" :key="index" :style="{ animationDelay: index * 0.2 + 's' }">
            <div class="card">
              <img :src="employee.image" :alt="employee.name" class="card-img-top">
              <div class="card-body">
                <h3 class="card-title">{{ employee.name }}</h3>
                <p class="card-text text-red-600">{{ employee.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      employees: [
        {
          name: 'Иванова Ольга Петровна',
          role: 'Главный фармацевт',
          image: '/images/t1.jpg'
        },
        {
          name: 'Петров Андрей Сергеевич',
          role: 'Менеджер по продажам',
          image: '/images/t2.jpg'
        },
        {
          name: 'Смирнова Елена Алексеевна',
          role: 'Консультант по здоровью',
          image: '/images/t3.jpg'
        },
        {
          name: 'Кузнецов Максим Игоревич',
          role: 'Логист',
          image: '/images/t4.jpg'
        },
        {
          name: 'Алексеев Дмитрий Владимирович',
          role: 'Финансовый директор',
          image: '/images/t5.jpg'
        },
        {
          name: 'Сидорова Наталья Сергеевна',
          role: 'HR-менеджер',
          image: '/images/t6.jpg'
        }
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

.mb-12 {
  margin-bottom: 3rem;
}

.text-block {
  padding: 1rem;
}

.text-2xl {
  font-size: 1.5rem;
  color: #1f2937;
}

.font-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.fs-5 {
  font-size: 1.25rem;
  color: #4b5563;
}

.employees-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.employee-card {
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.employee-card:hover {
  transform: perspective(1000px) rotateY(5deg) scale(1.03);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.card {
  display: flex;
  flex-direction: column;
}

.card-img-top {
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid #ffffff;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 1rem;
  text-align: center;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.875rem;
  font-weight: 600;
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

  .card-img-top {
    height: 150px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>