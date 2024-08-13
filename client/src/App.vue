<template>
    <header>
        <div class="header-top-bar">
            <span>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </span>
            <span>
                <i class="pi pi-facebook"></i>
                <i class="pi pi-twitter"></i>
                <i class="pi pi-pinterest"></i>
                <i class="pi pi-linkedin"></i>
            </span>
        </div>
        <DesktopNav v-if="!appStore.isMobile()"/>
        <MobileNav v-else/>
    </header>
    <main>
        <router-view></router-view>
    </main>
    <footer>
        <div>
            <span>SHOP NAME</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur impedit dicta totam ipsam quibusdam voluptates voluptas cum magni aliquam excepturi hic sunt iure, itaque ipsum quis accusamus asperiores mollitia fugit?</p>
            <ul>
                <li><i class="pi pi-facebook"></i>Facebook</li>
                <li><i class="pi pi-twitter"></i>Twitter</li>
                <li><i class="pi pi-pinterest"></i>Pinterest</li>
                <li><i class="pi pi-linkedin"></i>Linkedin</li>
            </ul>
        </div>
        <div>
            <span>ABOUT STORE</span>
            <ul>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
                <li>Shipping Policy</li>
                <li>Refund Policy</li>
                <li>FAQ</li>
                <li>Cookies</li>
            </ul>
        </div>
        <div>
            <span>COLLECTIONS</span>
            <ul>
                <li v-for="category in categories" :key="category">{{ category.toUpperCase() }}</li>
            </ul>
        </div>
        <div>
            <span>NEWSLETTER</span>
            <p>Get timely updates from your favorite products.</p>
            <InputText placeholder="Enter your email" />
            <Button label="SUBSCRIBE" severity="info" />
            <span>CONTACT</span>
            <ul>
                <li><i class="pi pi-phone"></i>123-456-7890</li>
                <li><i class="pi pi-envelope"></i>shopname@example.com</li>
                <li><i class="pi pi-map-marker"></i>123 Street, City, Country</li>
                <li><i class="pi pi-globe"></i>www.shopname.com</li>
            </ul>
        </div>
        <div class="divider">
            <span>Copyright © 2024. All rights reserved.</span>
            <span>All photos copyright belongs to their respective owners.</span>
        </div>
    </footer>
    <Toast />
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useAppStore } from './stores/app';
import { useRouter } from 'vue-router';

import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import DesktopNav from '@/components/DesktopNav.vue';
import MobileNav from '@/components/MobileNav.vue';

const appStore = useAppStore();
const categories = ref([]);
const router = useRouter();

onBeforeMount(async () => {
    if(appStore.products.length === 0) await appStore.fetchProducts();

    categories.value = [...new Set(appStore.products.map(product => product.collection))];
})


</script>
<style scoped>
.header-top-bar {
    width: 100%;
    height: 30px;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    gap: 10px;
    padding: 0 30px;
}

.header-top-bar span:first-child {
    font-size: 0.8em;
}

.header-top-bar span:last-child {
    display: flex;
    gap: 10px;
}


main {
    min-height: calc(100vh - 60px - 50px);
    background-color: #f0f0f0;
}

footer {
    width: 100%;
    background-color: var(--dark);
    color: white;
    padding: 7em 18em;
    display: flex;
    flex-flow: row wrap;
    position: relative;
}

footer div:first-child {
    width: 450px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

footer div:nth-child(2) {
    width: 250px;
    display: flex;
    flex-direction: column;
}

footer div:nth-child(3) {
    width: 280px;
}

footer div:nth-child(4) {
    width: 300px;
    display: flex;
    flex-direction: column;
}

footer div:nth-child(4) button{
    margin-top: 1em;
    margin-bottom: 2em;
}


footer div span {
    font-size: 1.5em;
}

footer div:first-child p{
    margin: 0;
    font-size: 0.8em;
    width: 70%;
    text-align: justify;
    text-justify: distribute;
    line-height: 1.7em;
}

footer ul {
    list-style: none;
    padding: 0;
}

footer ul li{
    margin: 0.5em 0;
}

footer ul li i{
    margin-right: 0.5em;
}

.divider {
    width: 70%;
    height: 40px;
    margin: 2em 0;
    position: absolute;
    bottom: 0;
    z-index: 2;
    font-size: 0.6rem;
    border-top: 1px solid white;
    padding-top: 1em;
    display: flex;
    justify-content: space-between;
}

footer .p-inputtext,
footer .p-button {
    border-radius: 0;
}

@media screen and (max-width: 414px), screen and (max-width: 896px)  {
    .header-top-bar {
        display: none;
    }

    footer {
        padding: 7em 2em;
        flex-flow: column wrap;
    }

    .divider{
        font-size: 0.5rem;
    }
}

</style>