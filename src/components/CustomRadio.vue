<template>
    <label class="filter-radio">
        <div>{{ filter.toUpperCase() }} ({{ amount }})</div>
        <input type="radio" :checked="checked" :value="filter" v-bind="{ ...$attrs }" :name="$attrs.name" @change="updateFilter">
        <span></span>
    </label>
</template>
<script setup>

const props = defineProps(['filter', 'name', 'checked', 'amount']);

const emit = defineEmits(['updateFilter']);

function updateFilter() {
    emit('updateFilter', props.filter);
}

</script>
<style scoped>
.filter-radio {
    display: block;
    position: relative;
    cursor: pointer;
    padding-left: 25px;
    margin-bottom: 12px;
    font-size: 1em;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-family: 'Montserrat', sans-serif;
}

.filter-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.filter-radio span {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
}

.filter-radio:hover input~span {
    background-color: #ccc;
}

.filter-radio input:checked~span {
    border: 2px solid var(--dark-shade);
}

.filter-radio span:after {
    content: "";
    position: absolute;
    display: none;
}

.filter-radio input:checked~span:after {
    display: block;
}

.filter-radio span:after {
    content: "\2713";
    top: -3px;
    left: 2px;
    width: 12px;
    height: 12px;
    color: var(--dark-shade);
    font-weight: bold;
}
</style>