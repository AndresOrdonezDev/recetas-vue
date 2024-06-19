import {ref, watch, onMounted, computed} from 'vue'
import { defineStore } from "pinia";
import {useBebidasStore} from './bebidas'
import { useModalStore } from './modal';
import { useNotificacionStore } from './notificaciones';


export const useFavoritosStore = defineStore ('favoritos',()=>{

    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificaciones = useNotificacionStore()
    const favoritos = ref([])

    onMounted(()=>{
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos, ()=>{
        sincronzarLocalStorage()
    },{deep:true})

    function sincronzarLocalStorage (){
        localStorage.setItem('favoritos',JSON.stringify(favoritos.value))

    }

    function existeFavorito(){
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === bebidas.receta.idDrink)
    }

    function eliminarFavorito(){
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)
        notificaciones.texto = 'Eliminado de favoritos!'
        notificaciones.mostrar = true
        notificaciones.error = true
        setTimeout(() => {
            notificaciones.$reset()
        }, 3000);
    }

    function agregarFavorito(){
        favoritos.value.push(bebidas.receta)
        notificaciones.texto = 'Agregado a Favoritos!'
        notificaciones.mostrar = true
        

        setTimeout(() => {
            notificaciones.$reset()
        }, 3500);
    }
    function handleClickFavorito(){
        if(existeFavorito()){
            eliminarFavorito()
        }else{
            agregarFavorito()
        }    
        
        modal.handleClickModal()
    }

    const noFavoritos = computed(()=> favoritos.value.length === 0)

    return {
        favoritos,
        noFavoritos,
        handleClickFavorito,
        existeFavorito,
        
    }
})