<template>
    <div class="d-flex justify-content-center" v-if ="!product_store.load_products">
        <h2>กำลังโหลดข้อมูลสินค้า</h2>
    </div>
    <div class="row mt-3" v-else>
        <!-- <div class="col md-2" v-for="(product, index) in list" :key="index"> -->
        <div class="col md-2" v-for="(product, index) in search_products" :key="index">    
            <div class="card" style="width: 19rem;">
                <img :src="product.image" alt="" class="card-img-top mx-auto" style="width: 12rem; height: 12rem;">
                <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text">{{ product.category }}</p>
                    <p class="card-text">{{ currencyTHB(product.price) }}</p>
                    <RouterLink :to="`/product_detail/${product.id}`" class="btn btn-primary mx-2">รายละเอียด</RouterLink>
                    <button class="btn btn-success" @click="card_store.add_cart(product.id,product.price)">เพิ่มลงตะกร้า</button>
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { computed } from 'vue'
 
 //useProductStore
import { useProductStore } from '../store/product';
const product_store =useProductStore()

const list = computed(() => product_store.list_products)

const search_products = computed(() => product_store.search_products)

//useCartStore
import { useCartStore } from '../store/cart'
const card_store =useCartStore()

import{ currencyTHB } from '../shared/currency'

</script>

<style lang="scss" scoped>

</style>