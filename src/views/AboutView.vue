<template>
    <div class="spacer"></div>
    <section class="about-wrapper">
        <h1>ABOUT US</h1>
        <section class="about-text">
            <p>
                Lorem ipsum dolor sit amet Sed accusam consequat voluptua vero sanctus. Dolores vero sadipscing iriure
                ex
                sed tincidunt dolore amet sea vulputate duis tempor invidunt et duo. Ipsum dolores liber tation no autem
                dolore sanctus sea labore gubergren dolor magna magna. Eirmod et takimata et dolores et sit dolor justo
                et vero in accusam rebum ut. Lorem ipsum duo et tempor clita option in et ipsum nonumy mazim sadipscing.
                Est aliquip dolor consequat vero autem aliquyam sit dolor.
                <br><br>
                Takimata tempor invidunt placerat ut dolor
                diam elitr gubergren diam nibh quod sit euismod labore molestie kasd adipiscing. Commodo tempor et lorem
                qui duis diam consequat vero stet et rebum nihil amet. Eu nonumy et no no no dolore ipsum et lorem
                eirmod kasd vero velit.
                <br><br>
                At dolores sed ipsum erat voluptua nisl ut dolores sea aliquyam. Rebum possim
                nonumy voluptua dolore takimata wisi sea augue qui dolor eos et. Aliquyam diam amet nonummy tempor enim
                takimata aliquyam stet dignissim ex clita et ut ipsum. Et labore diam nonumy. Nibh vero diam sanctus
                ipsum tempor. Ipsum nonumy lorem feugait ut. Zzril dolor dolor et et ut volutpat labore diam wisi amet
                accusam. Elitr sed ut molestie sit. Magna illum sit minim nonumy nonumy ut eirmod kasd vel. Liber diam
                ad at sea sit.
            </p>
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="">
        </section>
        <section class="about-text">
            <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="">
            <p>
                Lorem ipsum dolor sit amet Sed accusam consequat voluptua vero sanctus. Dolores vero sadipscing iriure
                ex
                sed tincidunt dolore amet sea vulputate duis tempor invidunt et duo. Ipsum dolores liber tation no autem
                dolore sanctus sea labore gubergren dolor magna magna. Eirmod et takimata et dolores et sit dolor justo
                et vero in accusam rebum ut. Lorem ipsum duo et tempor clita option in et ipsum nonumy mazim sadipscing.
                Est aliquip dolor consequat vero autem aliquyam sit dolor.
                <br><br>
                Takimata tempor invidunt placerat ut dolor
                diam elitr gubergren diam nibh quod sit euismod labore molestie kasd adipiscing. Commodo tempor et lorem
                qui duis diam consequat vero stet et rebum nihil amet. Eu nonumy et no no no dolore ipsum et lorem
                eirmod kasd vero velit.
                <br><br>
                At dolores sed ipsum erat voluptua nisl ut dolores sea aliquyam. Rebum possim
                nonumy voluptua dolore takimata wisi sea augue qui dolor eos et. Aliquyam diam amet nonummy tempor enim
                takimata aliquyam stet dignissim ex clita et ut ipsum. Et labore diam nonumy. Nibh vero diam sanctus
                ipsum tempor. Ipsum nonumy lorem feugait ut. Zzril dolor dolor et et ut volutpat labore diam wisi amet
                accusam. Elitr sed ut molestie sit. Magna illum sit minim nonumy nonumy ut eirmod kasd vel. Liber diam
                ad at sea sit.
            </p>
        </section>
        <section class="about-brands">
            <div class="spacer"></div>
            <h1>OUR BRANDS</h1>
            <div class="brands-wrapper">
                <div class="brand" v-for="brand in brands" :key="brand">
                    {{ brand.toUpperCase() }}
                </div>
            </div>
        </section>
    </section>
</template>
<script setup>
const brands = ['Adidas', 'Apple', 'Asics', 'Casio', 'H&M', 'Hermes', 'Hollister', 'Louis Vuitton', 'Puma', 'Rolex', 'Samsung', 'Versace', 'Zara']
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

.about-wrapper {
    width: 70%;
    margin: 30px auto;
}

.about-text {
    margin-top: 80px;
    display: flex;
    gap: 50px;
}

.about-text img {
    width: 50%;
}

.about-text p {
    width: 50%;
    text-align: justify;
}

.about-brands {
    position: relative;
    padding-bottom: 200px;
}

.brands-wrapper {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    gap: 20px;
    justify-content: center;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
}

.brand{
    font-size: 3em;
    color: var(--light-shade);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.brand:hover{
    color: var(--dark);
}

@media screen and (max-width: 414px) {
    h1{
        width: fit-content;
    }

    .about-text{
        flex-direction: column;
    }

    .about-text img{
        width: 100%;
    }

    .about-text p{
        width: 100%;
    }

    .brands-wrapper{
        top: 40%;
        gap: 10px;
    }

    .brand{
        font-size: 1.25em;
    }
}
</style>