import { createRouter, createWebHistory } from 'vue-router'

//หน้าแรก
import home_produsts from '../views/home_products.vue'
//หน้ารายละเอียดสินค้า
import product_detail from '../views/product_detail.vue'
//หน้าตะกร้า
import cart_caet from '../views/cart_cart.vue'

const routes = [
  {
    path: '/',
    name: 'home_produsts',
    component: home_produsts
  },
  {
    path: '/product_detail/:id',
    name: 'product_detail',
    component: product_detail
  },
  {
    path: '/cart',
    name: 'cart_caet',
    component: cart_caet
  },

]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router