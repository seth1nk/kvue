import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import ContactPage from './components/ContactPage.vue';
import ClientList from './components/ClientList.vue';
import ProductList from './components/ProductList.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import ViewClient from './components/ViewClient.vue';
import ViewProduct from './components/ViewProduct.vue';

const routes = [
  { path: '/', component: HomePage },          
  { path: '/about', component: AboutPage },    
  { path: '/contact', component: ContactPage },
  { path: '/clients', component: ClientList },
  { path: '/products', component: ProductList },
  { path: '/login', component: LoginPage },    
  { path: '/register', component: RegisterPage }, 
  { path: '/view-clients/:id', component: ViewClient },
  { path: '/view-products/:id', component: ViewProduct },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;