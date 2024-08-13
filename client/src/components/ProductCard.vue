<template>
    <section class="product-wrapper">
        <i class="pi pi-trash" v-if="isInWishlist" @click="removeWishlist(product)"></i>
        <i class="pi pi-heart-fill" @click="addWishlist(product)"></i>
        <i class="pi pi-shopping-cart" @click="addToCart(product)"></i>
        <img :src="product.image">
        <div class="product-info">
            <h1>{{ product.name }}</h1>
            <p>${{ product.price }}</p>
        </div>
    </section>
</template>
<script setup>
import { useAppStore } from '@/stores/app';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const toast = useToast();
const appStore = useAppStore();
const router = useRouter();

const isInWishlist = ref(false);

defineProps({
    product: Object
})

onMounted(() => {
    if(router.currentRoute.value.path === '/wishlist') {
        isInWishlist.value = true;
    }
})

function addWishlist(product) {
    appStore.addToWishlist(product);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Product added to wishlist', life: 3000 });
}

function removeWishlist(product) {
    appStore.removeFromWishlist(product);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Product removed from wishlist', life: 3000 });
}

function addToCart(product) {
    const cart = appStore.cart;
    if(cart.find(item => item.id === product.id)) {
        if(product.quantity) {
            product.quantity++;
        } else {
            product.quantity = 2;
        }
    } else {
        product.quantity = 1;
    }
    
    appStore.addToCart(product);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart', life: 3000 });
}

</script>
<style scoped>
.product-wrapper {
    width: 400px;
    display: flex;
    position: relative;
    cursor: pointer;
}

.pi-trash,
.pi-heart-fill {
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--light);
    font-size: 1.5em;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
}

.pi-trash{
    top: 40px;
}

.pi-shopping-cart {
    position: absolute;
    top: 10px;
    left: 10px;
    color: var(--light);
    font-size: 1.5em;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
}

.pi-shopping-cart:hover {
    color: green;
}

.pi-trash:hover{
    color: red;
}
.pi-heart-fill:hover {
    color: orangered;
}

img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.product-info {
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    padding: 2em;
    color: var(--light);
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
    opacity: 0;
}

.product-wrapper:hover .product-info {
    opacity: 1;
}

.product-info h1,
.product-info p {
    margin: 0;
}

.product-info h1 {
    font-size: 1.2em;
    text-transform: uppercase;
}

.product-info p {
    font-size: 1.2em;
}
</style>