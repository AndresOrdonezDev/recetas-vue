<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useBebidasStore } from "../stores/bebidas";
import { useNotificacionStore } from "../stores/notificaciones";

const route = useRoute();
const store = useBebidasStore();

const notificaciones = useNotificacionStore()

const paginaInicio = computed(() => route.name === "home");

const handleSubmit = ()=>{
    if(Object.values(store.busqueda).includes('')){
        notificaciones.texto = 'Los campos del formulario son obligatorios'
        notificaciones.error = true
        notificaciones.mostrar = true
        return
    }
    store.obtenerRecetas()
}

</script>

<template>
    <header
        class="bg-slate-800"
        :class="{header : paginaInicio}"
    >
        <div class="mx-auto container px-10 py-8">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink
                        :to="{name: 'home'}"
                    >
                        <img class="w-16" src="/img/logo.svg" alt="Logotipo" />
                    </RouterLink>
                </div>

                <nav class="flex gap-3 text-white ">
                    <RouterLink
                        :to="{name: 'home'}"
                        class="uppercase font-bold text-xs"
                        active-class="text-orange-500"
                    >
                        Inicio
                    </RouterLink>

                    <RouterLink
                        :to="{name: 'favoritos'}"
                        class="uppercase font-bold text-xs"
                        active-class="text-orange-500"
                    >
                        Favoritos
                    </RouterLink>
                </nav>
            </div>


            <form
                v-if="paginaInicio"
                class="md:w-1/2 xl:w-1/3 bg-orange-400 my-28 p-6 rounded-lg shadow space-y-3"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-2">
                    <label
                        class="block text-white uppercase font-extrabold text-xs"
                        for="ingrediente">Nombre o Ingredientes</label>
                    <input 
                        id="ingrediente"
                        type="text"
                        class="p-1 w-full rounded-lg focus:outline-none text-sm"
                        placeholder="Vodka, Tequila, etc"
                        v-model="store.busqueda.nombre"
                    >
                </div>

                <div class="space-y-4">
                    <label
                        class="block text-white uppercase font-extrabold text-xs"
                        for="categoria">Categoría</label>
                    <select 
                        id="categoria"
                        class="p-1 w-full rounded-lg focus:outline-none text-sm"
                        v-model="store.busqueda.categoria"
                    >
                        <option value="">-- Seleccione -- </option>
                        <option
                            v-for="categoria in store.categorias"
                            :key="categoria.strCategory"
                            :value="categoria.strCategory"
                        >{{ categoria.strCategory }}</option>
                    </select>
                </div>
                    
                <input
                    type="submit"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase text-sm"
                    value="Buscar Recetas"
                />
            </form>
        </div>

    </header>
</template>

<style>
    .header {
        background-image: url('/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>