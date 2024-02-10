<template>
  <navbar_product />
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>

import { onMounted } from 'vue'; // onMounted ทำงานเมื่อมีการเรียกใช้
import navbar_product from './components/navbar_product.vue';

//useProductStore แล้ว ประกาศค่าคงที่ เก็บ useProductStore
import { useProductStore } from './store/product';
const product_store = useProductStore()

//useCartStore
import { useCartStore } from './store/cart';
const cart_store =useCartStore()

// product_store ผ่าน onMounted 
onMounted(() => product_store.fetch_product())
onMounted(() => cart_store.loadFromLocalStorage())


</script>

<style lang="scss" scoped>

</style>