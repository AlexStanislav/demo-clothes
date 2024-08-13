<template>
    <div class="spacer"></div>
    <h1>CART</h1>
    <section class="cart-wrapper">
        <h3 v-if="!appStore.cart.length">EMPTY</h3>
        <section class="cart-items">
            <div class="cart-item" v-for="product in appStore.cart">
                <img :src="product.image" alt="">
                <div class="cart-item-info">
                    <h2>{{ product.name }}</h2>
                    <p>Color: {{ product.colors[product.colors.length - 1].split("")[0].toUpperCase() +
                        product.colors[product.colors.length - 1].slice(1) }}</p>
                    <p>Size: {{ product.sizes[product.sizes.length - 1] }}</p>
                    <p>Collection: {{ product.collection.toUpperCase() }}</p>
                    <p class="quantity">
                        <i class="pi pi-chevron-left" @click="decrementQuantity(product)"></i>
                        {{ product.quantity }}
                        <i class="pi pi-chevron-right" @click="incrementQuantity(product)"></i>
                    </p>
                    <p class="price">${{ product.price * product.quantity }}</p>
                </div>
                <i class="pi pi-times" @click="removeProduct(product)"></i>
            </div>
        </section>
        <section class="cart-footer" v-if="appStore.cart.length">
            <div class="cart-footer-info">
                <div class="delivery-type" v-for="type in deliveryTypes" :key="type">
                    <label :for="type">{{ type }}</label>
                    <input type="radio" :id="type" :value="type" v-model="deliveryMethod">
                </div>
                <div class="cart-total"><span>Total</span> ${{ appStore.cartTotal }}</div>

                <Button label="Checkout" style="border-radius: 0; margin-top: 10px; width: 100%;" severity="info" @click="checkout()"></Button>
                <Button label="Clear cart" style="border-radius: 0; margin-top: 10px; width: 100%;" severity="danger" @click="appStore.clearCart()"></Button>
            </div>
        </section>
    </section>
</template>
<script setup>
import { useAppStore } from '@/stores/app';
import { ref, watch } from 'vue';

import Button from 'primevue/button';

const appStore = useAppStore();

const deliveryMethod = ref('Home Delivery');
const deliveryTypes = ref(['Pickup', 'Home Delivery']);

const removeProduct = (product) => {
    appStore.removeFromCart(product);
}

const incrementQuantity = (product) => {
    const cart = appStore.cart;
    if (cart.find(item => item.id === product.id)) {
        product.quantity++;
    }

    updateCartTotal();
    updateCartCount()
}

const decrementQuantity = (product) => {
    const cart = appStore.cart;
    if (cart.find(item => item.id === product.id)) {
        if (product.quantity > 1) {
            product.quantity--;
        }
    }

    updateCartTotal();
    updateCartCount()
}

function updateCartTotal() {
    const cart = appStore.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    appStore.cartTotal = total;
}

function updateCartCount() {
    const cart = appStore.cart;
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }
    appStore.cartCount = count;
}

function checkout() {
    fetch('http://localhost:8000/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: appStore.cart
        })
    })
    .then(res => res.json())
    .then(data => {
        window.open(data.url, '_blank');
    }).catch(err => {
        console.log(err);
    })
}

watch(deliveryMethod, () => {
    if(deliveryMethod.value === 'Home Delivery') {
        appStore.cartTotal += 5;
    } else {
        appStore.cartTotal -= 5;
    }
})

</script>
<style scoped>
.cart-wrapper {
    width: 70%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 40px;
    position: relative;
}

h1 {
    width: 15%;
    padding: 0.5em;
    margin: 0 auto 0 auto;
    text-align: center;
    border: 1px solid var(--dark);
    font-size: 1.5em;
}

.cart-item {
    width: 100%;
    display: flex;
    gap: 20px;
    background: #fff;
    padding: 20px;
    position: relative;
}

.cart-item img {
    width: 110px;
    height: 110px;
    object-fit: cover;
    object-position: top;
}

.cart-item .pi-times {
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
}

.cart-item-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 0.8em;
    align-items: flex-start;
}

.cart-item-info h2 {
    margin: 0;
}

.cart-item-info p {
    margin: 0;
}

.quantity {
    font-size: 1.7em;
}

.quantity i {
    cursor: pointer;
    font-size: 0.8rem;
    margin: 0 5px;
}

.price {
    margin: 0;
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 2em;
}

.cart-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.cart-footer-info {
    width: 20%;
    background: #fff;
    padding: 20px;
    font-size: 1.2em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.cart-total {
    display: flex;
    gap: 30px;
    margin-top: 1em;
}

.delivery-type{
    display: flex;
    align-items: center;
    gap: 50px;
    font-size: 0.8em;;
}

.delivery-type input{
    width: 20px;
    height: 20px;
}

h3{
    margin: 0;
    font-size: 1.2em;
    font-weight: normal;
    margin-bottom: 10px;
    text-align: center;
}

@media screen and (max-width: 414px), screen and (max-width: 896px) {
    h1{
        width: fit-content;
    }
    .cart-footer-info{
        width: 100%;
    }
}

</style>