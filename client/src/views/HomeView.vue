<template>
    <section class="carousel-wrapper">
        <Carousel :value="carouselItems" :numVisible="1" :numScroll="1" :circular="true" :showIndicators="false" :autoplayInterval="4000">
            <template #item="slotProps">
                <div class="carousel-item">
                    <img :src="slotProps.data.image" :alt="slotProps.data.Title" />
                    <div class="carousel-text" :style="{ top: slotProps.data.position.top, left: slotProps.data.position.left, right: slotProps.data.position.right, bottom: slotProps.data.position.bottom}">
                        <h1>{{ slotProps.data.title }}</h1>
                        <p>{{ slotProps.data.description }}</p>
                    </div>
                </div>
            </template>
        </Carousel>
    </section>
    <h1 class="section-title">COLLECTIONS</h1>
    <section class="collections-wrapper">
        <header>
            <ul>
                <li class="collection-category" v-for="category in collectionCategories" :key="category" @click="selectCategory">
                    {{ category?.toUpperCase() }}
                </li>
            </ul>
        </header>
        <section class="products-wrapper">
            <ProductCard v-for="product in collectionPorducts" :key="product.id" :product="product" />
        </section>
    </section>
</template>
<script setup>
import Carousel from 'primevue/carousel';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useAppStore } from '@/stores/app';

import ProductCard from '@/components/ProductCard.vue';

const appStore = useAppStore();
const collectionCategories = ref([]);
const selectedCategory = ref('new');
const collectionPorducts = ref([]);

onBeforeMount(async () => {
    window.scrollTo(0, 0);
    
    if(appStore.products.length === 0) {
        await appStore.fetchProducts();
    }

    getCollectionCategories();
});

onMounted(() => {
    const categoryElement = document.querySelectorAll('.collection-category')[0];
    const activeCategoryElement = categoryElement;
    if (activeCategoryElement) {
        activeCategoryElement.classList.add('active-category');
        selectedCategory.value = activeCategoryElement.textContent.trim();
    }
    setTimeout(() => {
        collectionPorducts.value = appStore.products.filter(product => product.collection === selectedCategory.value.toLowerCase());
    }, 300);
})

function getCollectionCategories() {
    const tempArray = []
    appStore.products.forEach(product => {
        if(!tempArray.includes(product.collection)) {
            tempArray.push(product.collection);
        }
    })

    collectionCategories.value = [...new Set(tempArray)];
}

function selectCategory(e) {
    const allCategories = document.querySelectorAll('.collection-category');

    allCategories.forEach(category => {
        if(category === e.target) {
            category.classList.add('active-category');
            selectedCategory.value = category.innerText;
        } else {
            category.classList.remove('active-category');
        }
    })
}
const carouselItems = [
    {
        title: 'Ethereal',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, laboriosam? Dolores, quae. Consequuntur, quia.',
        image: 'https://images.unsplash.com/photo-1486308510493-aa64833637bc?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        position: {
            top: '35%',
            left: 'initial',
            right: '3%',
            bottom: 'initial'
        }
    },
    {
        title: 'Modern',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, laboriosam? Dolores, quae. Consequuntur, quia.',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        position: {
            top: '35%',
            left: 'initial',
            right: '10%',
            bottom: 'initial'
        }
    },
    {
        title: 'Minimal',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, laboriosam? Dolores, quae. Consequuntur, quia.',
        image: 'https://images.unsplash.com/photo-1507702553912-a15641e827c8?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        position: {
            top: '35%',
            left: '10%',
            right: 'initial',
            bottom: 'initial'
        }
    }
]

watch(selectedCategory, () => {
    collectionPorducts.value = appStore.products.filter(product => product.collection === selectedCategory.value.toLowerCase());
})
</script>
<style scoped>
.carousel-wrapper {
    width: 100%;
    padding-top: 40px;
}

.carousel-item {
    position: relative;
}

.carousel-item img {
    width: 100%;
    height: 700px;
    object-fit: cover;
}

.carousel-text {
    width: 520px;
    height: 220px;
    position: absolute;
    z-index: 3;
    border: 2px solid var(--dark);
    text-align: justify;
    padding: 20px 40px;
    text-justify: distribute;
}

.carousel-text h1 {
    font-size: 4rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: 90px;
    text-align: center;
    color: var(--dark);
    opacity: 0;
    position: absolute;
    transition: all 1s ease-in-out;
}

.carousel-text p {
    width: 80%;
    color: var(--dark);
    font-size: 1.1em;
    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: 140px;
    opacity: 0;
    position: absolute;
    transition: all 1.2s ease-in-out;
}

.p-carousel-item-active .carousel-text h1{
    margin-top: 0px;
    opacity: 1;
}

.p-carousel-item-active .carousel-text p{
    margin-top: 90px;
    opacity: 1;
}

.section-title {
    width: fit-content;
    text-align: center;
    font-size: 2rem;
    margin: 50px auto;
    border: 1px solid var(--dark);
    padding: 0.5em 1em;
}

.collections-wrapper {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.collections-wrapper header {
    display: flex;
    justify-content: center;
}

.collections-wrapper header ul {
    display: flex;
    gap: 20px;
    list-style: none;
    font-size: 1.1em;
    margin: 0;
    padding: 0;
}

.collections-wrapper header ul li {
    cursor: pointer;
    background: var(--dark);
    color: var(--light);
    padding: 0.5em 1em;
    transition: all 0.3s ease-in-out;
    border: 1px solid var(--dark);
}

.collections-wrapper header ul li:hover {
    background: var(--light);
    color: var(--dark);
}

.active-category {
    background: var(--light) !important;
    color: var(--dark) !important;
}

.products-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
    margin: 40px 0;
}

@media screen and (max-width: 414px), screen and (max-width: 896px)  {
    .carousel-item img {
        width: 100%;
        height: 300px;
        object-fit: contain;
    }

    .carousel-text {
        display: none;
    }

    .collections-wrapper header ul{
        flex-flow: row wrap;
        justify-content: center;
        gap: 5px;
    }
    .collections-wrapper header ul li {
        font-size: 0.8em;
    }
}

</style>
