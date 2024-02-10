//Defining a Store
import { defineStore } from "pinia";

import axios from "axios";

import{ ref,computed } from 'vue';  //computed เมื่อค่าข้างในมีการเปลี่ยนแปลง computed จะถูกเรียกใช้งาน

export const useProductStore =defineStore('useProductStore',()=>{
    const products = ref([])

    const input = ref('')
    //เมื่อ API มีการเพิ่มcomputedจะถูกเรียกนำข้อมูลมาเก็บในlist_products และ return ออก
    const list_products =computed(() => products.value)

    // load_product เช็คการ โหลดข้อมูลเพื่อนำไปแสดงหน้า home product
    const load_products = computed(() => products.value.length > 0)

    const fetch_product =async()=>{
        await axios.get(`${import.meta.env.VITE_API}`)
        .then((response) => {
            products.value = response.data
            //console.log(products.value)
        }).catch((err) =>{
            console.log(err)
        })
    }

    const search_products =computed(() => {
        if(input.value.length < 3) return products.value
        
        return products.value.filter((prd) => {
            if(prd.title.toLowerCase().includes(input.value.toLowerCase()) == false){
                return false
            }else{
                return prd.title.toLowerCase().includes(input.value.toLowerCase())
            }
        })
        ///toLowerCase แปลงเป็ยพิมพ์เล็ก
    })


    return{ products, fetch_product,list_products,load_products,input,search_products }
})