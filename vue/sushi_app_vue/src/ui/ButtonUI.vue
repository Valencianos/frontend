<template>
  <button 
    :class="props.button">
    <img 
      :src="props.img" 
      :alt="props.alt">
    <span 
      :class="props.text">{{ props.title }}</span>
  </button>

</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  button: {
    type: String,
    default: 'default-button',
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: '',
  },
});

</script>

<style lang="scss">

</style>