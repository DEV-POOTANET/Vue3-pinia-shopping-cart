<template>
    <h1>ตะกร้าสินค้า</h1>
    <div class="d-flex justify-content-center" v-if ="!product_store.load_products">
        <h2>กำลังโหลดข้อมูลสินค้า</h2>
    </div>
    <table class="table" v-else>
        <thead>
            <tr>
                <th>สินค้า</th>
                <th>ราคา</th>
                <th>จำนวน</th>
                <th>รวม</th>
                <th>ลบสินค้า</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(carts,index) in carts" :key="index">
                <td>
                    <img :src="carts.product.image" alt="" class="img-thumbnail" width="100">
                 {{carts.product.tital}}
                </td>
                <td>{{currencyTHB(carts.product.price)}}บาท</td>
                <td>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.decrement_quantity(index)">-</button>
                    <span class="mx-2">{{ carts.quantity }}</span>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.increment_quantity(index)">+</button>
                </td>
                <td>{{ currencyTHB(carts.total_product) }} บาท</td>
                <td>
                    <button class="btn btn-danger" @click="cart_store.remove_cart(index)">ลบ</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-danger md-5" @click="cart_store.clear_cart()">เคลียตะกร้า</button>
    <button class="btn btn-success md-5 mx-2">รวม {{ currencyTHB(cart_store.total) }}บาท</button>

</template>
 
<script setup>
 import { computed } from 'vue'

 import{ currencyTHB } from '../shared/currency'

 import { useCartStore } from '../store/cart';  
 const cart_store = useCartStore()

 import { useProductStore } from '../store/product';    
 const product_store = useProductStore()

 const carts =computed(() => cart_store.cart_previews)
</script>
 
<style lang="scss" scoped>
 
</style>