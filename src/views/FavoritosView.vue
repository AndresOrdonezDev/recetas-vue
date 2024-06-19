<script setup>
import Receta from '../components/Receta.vue'
import { useFavoritosStore } from "../stores/favoritos";

const favoritos = useFavoritosStore();

</script>
<template>
  <div>
    <h1 class="text-2xl font-extrabold ml-24">Favoritos</h1>
    
    <p v-if="favoritos.noFavoritos" class="text-center text-fond my-10">No hay favoritos</p>
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-6 mt-10 gap-10 my-10 p-10"
    >
      <Receta
        v-for="receta in favoritos.favoritos"
        :key="receta.idDrink"
        :receta="receta"
      />
    </div>
  </div>
</template>

