<template>
    <nav>
        <span class="logo">SHOP NAME</span>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">Products</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li class="cart-icon-wrapper" @click="openCart()">
                <i class="pi pi-shopping-cart"></i>
                <span class="cart-count">{{ appStore.cartCount }}</span>
            </li>
            <li class="favorite-icon-wrapper" @click="openWishList()">
                <i class="pi pi-heart"></i>
                <span class="favorite-count">{{ appStore.wishlistCount }}</span>
            </li>
        </ul>
    </nav>
</template>
<script setup>
import { useAppStore } from '@/stores/app';
import { useRouter } from 'vue-router';



function openWishList() {
    router.push('/wishlist');
}

function openCart() {
    router.push('/cart');
}

const appStore = useAppStore();
const router = useRouter();

</script>
<style scoped>
nav {
    width: 100%;
    height: 60px;
    padding: 2% 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

nav .logo {
    font-size: 2em;
    font-weight: bold;
}

nav ul {
    display: flex;
    gap: 20px;
    list-style: none;
    font-size: 1.1em;
}

nav ul li a {
    text-decoration: none;
    color: var(--dark);
    transition: all 0.1s ease-in-out;
}

nav ul li a:hover {
    color: var(--dark-shade);
}

.favorite-icon-wrapper,
.cart-icon-wrapper {
    position: relative;
    cursor: pointer;
}

.favorite-icon-wrapper i,
.cart-icon-wrapper i {
    font-size: 1.5em;
}

.favorite-icon-wrapper .favorite-count,
.cart-icon-wrapper .cart-count {
    background-color: var(--dark);
    color: white;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7em;
    position: absolute;
    top: -1px;
    right: -5px;
    padding-bottom: 0.2em;
}
</style>