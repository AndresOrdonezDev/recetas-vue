<script setup>
    import {useBebidasStore} from '../stores/bebidas'
    import Receta from '../components/Receta.vue';
    const bebidas = useBebidasStore()
</script>
<template>
    <div>
        <h1 class="text-2xl font-extrabold ml-10">Listado de recetas encontradas</h1>

        <div class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-6 mt-5 gap-10 my-10 p-10">

            <Receta
                v-for="receta in bebidas.recetas" 
                :key="receta.idDrink"
                :receta="receta"
            />
        </div>
        <h1 class="text-2xl font-extrabold ml-10 mb-10">By Andres Ordoñez</h1>
    </div>
</template>


