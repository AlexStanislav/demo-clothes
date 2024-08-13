<template>
    <div class="spacer"></div>
    <h1>WISHLIST</h1>
    <section class="wishlist">
        <ProductCard v-for="product in appStore.wishlist" :key="product.id" :product="product" />
    </section>
</template>
<script setup>
import { useAppStore } from '@/stores/app';
import ProductCard from '@/components/ProductCard.vue';

const appStore = useAppStore();

</script>
<style scoped>

h1 {
    width: 15%;
    padding: 0.5em;
    margin: 0 auto 0 auto;
    text-align: center;
    border: 1px solid var(--dark);
    font-size: 1.5em;
}

.wishlist{
    width: 90%;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    padding: 40px 0;
}

@media screen and (max-width: 414px), screen and (max-width: 896px) {
    h1{
        width: fit-content;
    }
}
</style>