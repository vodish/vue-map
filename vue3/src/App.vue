<script setup lang="ts">
import { ref, shallowRef, triggerRef } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import type { LngLat, YMap, YMapMarkerProps } from '@yandex/ymaps3-types';
import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapControls,
  YandexMapControl,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  type YandexMapDefaultMarkerSettings,
  YandexMapHint,
  YandexMapListener,
} from 'vue-yandex-maps';

//Можно использовать для различных преобразований
// const map = shallowRef<null | YMap>(null);



const ymSettings = {
  location: {
    center: [37.642393, 55.730649],
    zoom: 15,
  },
  showScaleInCopyrights: false,
}

const markersGeoJsonSource = ref([
  {
    id: '1',
    coordinates: [37.642393, 55.730649] as LngLat,
    // title: 'Точка-1',
    // subtitle: 'Greenland is the Largest Island <br> in North America and the World',
    color: '#00CC00',
    draggable: true,
    // popup: { position: 'top', content: 'Static content that hides marker', hidesMarker: true },

  },
  {
    id: '2',
    coordinates: [37.644133, 55.730611] as LngLat,
    // title: 'Точка-2',
    // subtitle: `The Andes are the world's <br> longest continental <br> mountain range`,
    color: '#108008',
    properties: {
      hint: '<b>Название</b> -- описание',
    },
  },
]);

const markerHandlers = {
  draggable: true,
  onDragEnd,
  onClick,
}



function onDragEnd(e: LngLat) {
  // console.log(this)
  console.log(e) // новые координаты
}

function onClick(e) {
  e.preventDefault()
  formDisplay.value = true;
  // console.log(typeof this)

  console.log(e)
}



function getCoords(tag, e) {
  console.log(tag)
  console.log(e)
  if ( tag !== undefined )  return;

  markersGeoJsonSource.value.push({
    id: 'new' + Date.now(),
    coordinates: e.coordinates,
    color: '#00CC00',
    draggable: true,
  });

  // console.log(e)
}



const formDisplay = ref(false)



</script>
<template>

  <div id="map">
    <YandexMap :settings="ymSettings" width="100%" height="100%">
      <YandexMapDefaultSchemeLayer />

      <YandexMapControls :settings="{ position: 'top left' }">
        <YandexMapControl id="eee" class="eee">
          sdvsdv
        </YandexMapControl>
      </YandexMapControls>

      <YandexMapListener :settings="{ onClick: getCoords }" />


      <YandexMapDefaultFeaturesLayer />
      <YandexMapDefaultMarker v-for="marker in markersGeoJsonSource" :key="marker.id"
        :settings="({ ...marker, ...markerHandlers } as YandexMapDefaultMarkerSettings)" />


      <YandexMapHint hint-property="hint">
        <template #default="{ content }">
          <div class="hint" v-html="content"></div>
        </template>
      </YandexMapHint>


    </YandexMap>
  </div>

  <div class="form" :style="{ display: formDisplay ? 'block' : 'none' }">
    Форма редактирования
    <button @click="formDisplay = false">&times;</button>

    <div v-for="(marker, i) in markersGeoJsonSource" :key="i">{{ marker.coordinates }}</div>
  </div>


</template>



<style scoped>
#map {
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.form {
  display: none;
  width: 50vw;
  height: 50vw;
  border-radius: 25px;
  padding: 25px;
  position: fixed;
  top: 20vh;
  left: 25vh;
  z-index: 2;
  background: white;
  color: black;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
}


.hint {
  position: absolute;
  transform: translate(12px, 12px);
  padding: 10px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 200px;
}

/* .marker {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ff0000;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;
} */
</style>
