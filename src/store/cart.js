import { defineStore } from "pinia";   
import {ref,computed} from 'vue'

//USAGE
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
//useProductStore
import { useProductStore } from "./product";    


//Composition API
export const useCartStore =defineStore('useCartStore', () => {
    const cart =ref([])

    const add_cart =(id,price,quantity=1) => {
        const data ={
            id,
            price,
            quantity
        }
        
        //find javascript เช็คการเพิ่มข้อมูลซ้ำ
        const findId = cart.value.find(e => e.id == data.id)
        if(findId){
            alert_add_cart_faild()
        }else{
            cart.value.push(data)
            saveToLocalStorage()
            alert_add_cart()
        }
        console.log(cart.value)
    }

    const add_cart_detail = (id, price, quantity) => {
        const data = {
            id,
            price,
            quantity
        }

        const findId = cart.value.find(e => e.id == data.id)

        if(findId) {
            const findIndexProduct = cart.value.findIndex(e => e.id == data.id)
            cart.value[findIndexProduct].quantity = cart.value[findIndexProduct].quantity + quantity
            saveToLocalStorage()
            alert_add_cart()
        } else {
            cart.value.push(data)
            saveToLocalStorage()
            alert_add_cart()
        }
    }


    //สร้างlocal storage 
    const saveToLocalStorage = () =>{
        localStorage.setItem('cart',JSON.stringify(cart.value))
    }

    //เก็บ cart ลงlocal storage
    const loadFromLocalStorage = () => {
        if(localStorage.getItem('cart')){
            cart.value = JSON.parse(localStorage.getItem('cart'))
        }
    }

    const cart_previews =computed(() => {
        const product_store = useProductStore()
        // map คือการลูปarrแล้วreturn arr ตัวใหม่
        return cart.value.map((prd,i) => {
            //หารindex ที่ตรงกัน
            const findIndecProduct =product_store.products.findIndex(e => e.id ==prd.id)
            return {
                product : product_store.products[findIndecProduct],
                quantity : cart.value[i].quantity,
                total_product : product_store.products[findIndecProduct].price * cart.value[i].quantity
            }
        })
    })
    
    const total =computed(() =>{
        //reduce .ใช้หาค่าผลรวม para1 ค่าเริ่มต้น para2 ค่าปัจจุบัน , 0คือ ค่าเริ่มต้นของpara1 
        return cart.value.reduce((sum ,prd) => sum + prd.price * prd.quantity ,0)
    })

    const alert_add_cart = () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "เพิ่มสินค้าเรียบร้อย",
          showConfirmButton: false,
          timer: 1500
        })
    }

    const alert_add_cart_faild = () => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "คุณได้เพิ่มสินค้าไปแล้ว",
          showConfirmButton: false,
          timer: 1500
        })
    }

    const increment_quantity =(i) =>{
        cart.value[i].quantity += 1
        saveToLocalStorage()

    }

    const decrement_quantity =(i) =>{
        cart.value[i].quantity -=1
        saveToLocalStorage()

        if(cart.value[i].quantity == 0){
            cart.value.splice(i, 1)
            saveToLocalStorage()
        }
    }

    const remove_cart =(i) =>{
        cart.value.splice(i, 1)
        saveToLocalStorage()
    }

    const clear_cart=()=>{
        cart.value=[]
        saveToLocalStorage()
    }

    return { cart, add_cart , loadFromLocalStorage, cart_previews, increment_quantity, decrement_quantity, remove_cart, clear_cart, add_cart_detail ,total}

})

