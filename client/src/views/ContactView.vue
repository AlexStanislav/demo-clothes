<template>
    <div class="spacer"></div>
    <h1 class="section-title">CONTACT US</h1>
    <section class="contact-wrapper">
        <div>
            <p style="font-weight: bold;">Feel free to contact us with any questions, comments, or concerns. We will get
                back to you as soon as
                possible.</p>
            <p><i class="pi pi-phone"></i> 123-456-7890</p>
            <p><i class="pi pi-envelope"></i> shop@example.com</p>
            <p><i class="pi pi-map-marker"></i> 123 Street, City, Country</p>
            <p><i class="pi pi-globe"></i> www.shopname.com</p>
            <form>
                <InputText placeholder="Enter your name" v-model="formValues.name" />
                <InputText placeholder="Enter your email" v-model="formValues.email" />
                <Textarea placeholder="Enter your message" v-model="formValues.message" />
                <Turnstile :sitekey="sitekey" @verify="tokenVerify" />
                <Button label="SEND" icon="pi pi-send" severity="info" @click="sendMessage()" />
            </form>
        </div>
        <div id="map"></div>
    </section>
</template>
<script setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';

import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { onMounted, ref } from 'vue';

import Turnstile from 'cfturnstile-vue3'

const token = ref(null);
const sitekey = '0x4AAAAAAAgzm3Ws2gMWIZpK'

const formValues = ref({
    name: '',
    email: '',
    message: ''
});

onMounted(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('SHOP NAME')
        .openPopup();
})

function tokenVerify(value) {
    token.value = value
}

function sendMessage() {
    fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formValues.value.name,
            email: formValues.value.email,
            message: formValues.value.message,
            token: token.value
        })
    })
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

.contact-wrapper {
    width: 80%;
    margin: 30px auto;
    display: flex;
    gap: 40px;
}

p {
    display: flex;
    align-items: center;
    gap: 10px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 50px;
}

form .p-inputtext,
form .p-textarea,
form .p-button {
    border-radius: 0;
}

form .p-textarea {
    height: 200px;
    resize: none;
}

#map {
    width: 700px;
    height: 640px;
    border: 1px solid var(--dark);
}

@media screen and (max-width: 414px), screen and (max-width: 896px) {
    h1{
        width: fit-content;
    }
    .contact-wrapper {
        flex-direction: column;
    }

    #map {
        width: 100%;
        height: 300px;
    }
}
</style>