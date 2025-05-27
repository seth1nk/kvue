<template>
  <main>
    <div class="container">
      <h1 class="page-title">О нашей аптеке</h1>

      <!-- Блок 1: Наши ценности -->
      <div class="content-block fade-in" ref="block1">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Наши ценности</h2>
            <p class="fs-5">
              Наша онлайн-аптека заботится о вашем здоровье. Мы предлагаем только сертифицированные препараты от проверенных поставщиков. Каждый товар проходит строгий контроль качества перед продажей.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/1.jpg" alt="Наши ценности" class="img-block">
          </div>
        </div>
      </div>

      <!-- Блок 2: Ассортимент -->
      <div class="content-block fade-in" ref="block2">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 image-block order-2 md:order-1">
            <img src="/images/p2.jpg" alt="Ассортимент" class="img-block">
          </div>
          <div class="md:w-1/2 text-block order-1 md:order-2">
            <h2 class="text-2xl font-bold mb-4">Ассортимент</h2>
            <p class="fs-5">
              В нашем каталоге вы найдете лекарственные средства, витамины, косметику, товары для детей и пожилых людей, а также медицинские приборы — всё для комплексного ухода за здоровьем всей семьи.
            </p>
          </div>
        </div>
      </div>

      <!-- Блок 3: Квалифицированная помощь -->
      <div class="content-block fade-in" ref="block3">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Квалифицированная помощь</h2>
            <p class="fs-5">
              Наши опытные фармацевты всегда готовы проконсультировать вас по любым вопросам, связанным с применением лекарств, совместимостью препаратов и выбором аналогов.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/3.jpg" alt="Квалифицированная помощь" class="img-block">
          </div>
        </div>
      </div>

      <!-- Блок 4: Быстрая доставка -->
      <div class="content-block fade-in" ref="block4">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 image-block order-2 md:order-1">
            <img src="/images/2.jpg" alt="Быстрая доставка" class="img-block">
          </div>
          <div class="md:w-1/2 text-block order-1 md:order-2">
            <h2 class="text-2xl font-bold mb-4">Быстрая доставка</h2>
            <p class="fs-5">
              Мы обеспечиваем оперативную доставку заказов по городу и регионам. Также доступна экспресс-доставка жизненно важных препаратов в течение нескольких часов.
            </p>
          </div>
        </div>
      </div>

      <!-- Блок 5: Удобство и безопасность -->
      <div class="content-block fade-in" ref="block5">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/2 text-block">
            <h2 class="text-2xl font-bold mb-4">Удобство и безопасность</h2>
            <p class="fs-5">
              Вы можете оплатить заказ онлайн или при получении. Мы используем современные технологии шифрования данных, чтобы защитить вашу персональную информацию.
            </p>
          </div>
          <div class="md:w-1/2 image-block">
            <img src="/images/p1.jpg" alt="Удобство и безопасность" class="img-block">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'AboutPage',
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
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(90deg, #d32f2f, #b71c1c);
  padding: 1rem;
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

.content-block {
  margin-bottom: 3rem;
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-block {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  color: #1f2937;
}

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
}

.image-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-block {
  max-width: 500px;
  border-radius: 0.25rem;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.img-block:hover {
  transform: scale(1.05);
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
    max-width: 120px;
  }

  .fs-5 {
    font-size: 1rem;
  }

  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>