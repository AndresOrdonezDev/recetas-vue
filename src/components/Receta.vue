<script setup>
import {useBebidasStore} from '../stores/bebidas'

const bebidas = useBebidasStore()

 defineProps({
    receta:{
        type:Object
    }
 })
</script>
<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img 
                class="hover:scale-110 rounded-lg transition-transform hover:rotate-1"
                :src="receta.strDrinkThumb" 
                :alt="'receta de' + receta.strDrink"
            >
        </div>
        <div class="p-5">
            <h2 class="font-extrabold truncate">{{ receta.strDrink }}</h2>
            <button 
                type="button"
                class="w-full bg-orange-600 hover:bg-orange-900 text-white rounded-lg p-1 mt-3 mb-4 font-bold text-sm"
                @click="bebidas.seleccionarBebida(receta.idDrink)"
            >
                Ver receta
            </button>
        </div>
        
    </div>
</template>

