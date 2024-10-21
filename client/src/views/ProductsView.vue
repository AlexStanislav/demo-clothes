<template>
    <div class="spacer"></div>
    <h1>PRODUCTS</h1>
    <section class="products">
        <section class="products-filter">
            <div class="filter-wrapper">
                <h3>CATEGORIES <i v-if="filters.category !== ''" @click="clearFilter('category')"
                        class="pi pi-filter-slash"></i></h3>
                <ul>
                    <li v-for="category in categoriesFilters" :key="category">
                        <CustomRadio :filter="category" :name="'category'" :checked="category === filters.category"
                            @updateFilter="applyFilters('category', category)" />
                    </li>
                </ul>
            </div>
            <div class="filter-wrapper">
                <h3>COLLECTIONS <i v-if="filters.collection !== ''" @click="clearFilter('collection')"
                        class="pi pi-filter-slash"></i></h3>
                <ul>
                    <li v-for="collection in collectionsFilters" :key="collection">
                        <CustomRadio :filter="collection" :name="'collection'"
                            :checked="collection === filters.collection"
                            :amount="appStore.products.filter(product => product.collection === collection).length"
                            @updateFilter="applyFilters('collection', collection)" />
                    </li>
                </ul>
            </div>
            <div class="filter-wrapper">
                <h3>BRANDS <i v-if="filters.brand !== ''" @click="clearFilter('brand')" class="pi pi-filter-slash"></i>
                </h3>
                <ul>
                    <li v-for="brand in brandsFilters" :key="brand">
                        <CustomRadio :filter="brand" :name="'brand'" :checked="brand === filters.brand"
                            :amount="appStore.products.filter(product => product.brand === brand).length"
                            @updateFilter="applyFilters('brand', brand)" />
                    </li>
                </ul>
            </div>
        </section>
        <section class="products-wrapper">
            <header>
                Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ totalRecords }}
                <Select style="border-radius: 0;" v-model="sortOrder" :options="['Ascending', 'Descending']"
                    @change="sortProducts" />
            </header>
            <div class="products-display" v-if="displayProducts.length > 0">
                <ProductCard v-for="product in displayProducts" :key="product.id" :product="product" />
            </div>
            <div class="no-products" v-else>
                <h2>No products found</h2>
            </div>
            <Paginator :rows="6" :totalRecords="totalRecords" @page="onPageChange" :rowsPerPageOptions="[6, 12, 18]">
            </Paginator>
        </section>
    </section>
</template>
<script setup>
import { useAppStore } from '@/stores/app';
import { onMounted, ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import CustomRadio from '@/components/CustomRadio.vue';
import Paginator from 'primevue/paginator';
import Select from 'primevue/select';

const appStore = useAppStore();
const startIndex = ref(0);
const endIndex = ref(6);
const totalRecords = ref(0);
const displayProducts = ref([]);
const sortOrder = ref('Ascending');

const categoriesFilters = ref([]);
const collectionsFilters = ref([]);
const brandsFilters = ref([]);

const currentlyFiltered = ref([]);

const filters = ref({
    category: '',
    collection: '',
    brand: ''
});


onMounted(async () => {
    if (appStore.products.length === 0) {
        await appStore.fetchProducts();
    }

    getCategories();
    getCollections();
    getBrands();

    displayProducts.value = appStore.products.slice(startIndex.value, endIndex.value);
    totalRecords.value = appStore.products.length;
})

function getCategories() {
    categoriesFilters.value = [...new Set(appStore.products.map(product => product.category))];
}

function getCollections() {
    collectionsFilters.value = [...new Set(appStore.products.map(product => product.collection))];
}

function getBrands() {
    brandsFilters.value = [...new Set(appStore.products.map(product => product.brand))];
}


function clearFilter(filter) {
    applyFilters(filter, '');
    sortProducts({ value: sortOrder.value });
}

function applyFilters(filter, value) {
    const filteredProducts = filterProducts(filter, value);
    totalRecords.value = filteredProducts.length;
    sortProducts({ value: sortOrder.value });
}

function filterProducts(filter, value) {
    filters.value[filter] = value;
    const filteredProducts = appStore.products.filter((product) => {

        const categoryMatch = !filters.value.category || product.category === filters.value.category;
        const collectionMatch = !filters.value.collection || product.collection === filters.value.collection;
        const brandMatch = !filters.value.brand || product.brand === filters.value.brand;

        return categoryMatch && collectionMatch && brandMatch;
    });


    currentlyFiltered.value = filteredProducts;
    return filteredProducts;
}

function sortProducts(event) {
    sortOrder.value = event.value;
    let sortedProducts = [];
    if (sortOrder.value === 'Ascending') {
        if (currentlyFiltered.value.length !== 0) {
            sortedProducts = currentlyFiltered.value.sort((a, b) => a.price - b.price);
        }
    } else {
        if (currentlyFiltered.value.length !== 0) {
            sortedProducts = currentlyFiltered.value.sort((a, b) => b.price - a.price);
        }
    }

    displayProducts.value = sortedProducts.slice(startIndex.value, endIndex.value);
    totalRecords.value = sortedProducts.length;
}


function onPageChange(event) {
    startIndex.value = event.first;
    endIndex.value = event.first + event.rows;

    if (currentlyFiltered.value.length === 0) {
        displayProducts.value = appStore.products.slice(startIndex.value, endIndex.value);
    } else {
        displayProducts.value = currentlyFiltered.value.slice(startIndex.value, endIndex.value);
    }
}

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

.products {
    display: flex;
    gap: 80px;
    width: 95%;
    margin: 0 auto;
    padding: 80px 0;
}

.products-wrapper {
    width: 70%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.products-wrapper header {
    width: 98%;
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 1em;
    font-family: 'Montserrat', sans-serif;
}

.products-display {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.no-products {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    font-family: 'Montserrat', sans-serif;
}

.products-filter {
    width: 20%;
    height: 75vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}

.filter-wrapper h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.filter-wrapper h3 i {
    cursor: pointer;
}

.filter-wrapper ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

@media screen and (max-width: 414px),
screen and (max-width: 896px) {
    h1 {
        width: fit-content;
    }

    .products {
        flex-flow: column;
    }

    .products-filter {
        width: 100%;
        height: fit-content;
    }

    .products-wrapper {
        width: 100%;
    }
}
</style>