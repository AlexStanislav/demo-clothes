<template>
    <nav>
        <i class="pi pi-bars" @click="isVisible = true"></i>
        <span>SHOP NAME</span>
        <router-link to="/cart">
            <i class="pi pi-shopping-cart"></i>
        </router-link>
    </nav>
    <Drawer v-model:visible="isVisible" position="left" :showCloseIcon="false">
        <h1>MENU</h1>
        <ul @click="isVisible = false">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">Products</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><router-link to="/wishlist">Wishlist</router-link></li>
        </ul>
    </Drawer>
</template>
<script setup>
import Drawer from 'primevue/drawer';
import { ref } from 'vue';

const isVisible = ref(false);

</script>
<style scoped>
nav {
    width: 100%;
    height: 50px;
    background: var(--dark);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

nav i {
    color: var(--light);
    font-size: 1.5em;
    cursor: pointer;
}

nav span {
    color: var(--light);
    font-size: 1.5em;
    font-weight: bold;
}

nav div{
    display: flex;
    gap: 10px;
}

.p-drawer h1{
    width: fit-content;
    font-size: 1.5em;
    font-weight: bold;
    margin: 0 auto;
    padding: 10px 15px;
    border: 1px solid var(--dark);
}

.p-drawer ul{
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.p-drawer ul li{
    padding: 5px;
}

.p-drawer ul li a{
    text-decoration: none;
    color: var(--dark);
}
</style>