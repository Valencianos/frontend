<template>
  <div>
    <buttonUI
      button="link__btn filled"
      title="Войти"
      img="../assets/img/icons/cart_logo.svg"
      :alt="Войти"
      text="link__btn_text filled_text"
    ></buttonUI>
  </div>
</template>
<script>
import ButtonUI from '@/ui/ButtonUI.vue'

export default {
  components: { 
    ButtonUI 
  },
  data() {
    return {
    }
  },

}
</script>

<style lang="scss">
  .link__btn {
    padding: 8px 16px;
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 2px;
    outline: none;
    &_text {
      font-weight: 400;
      font-size: 16px;
      line-height: 1.5;
      color: gray;
    }
  }

.filled {
  background-color: blue;
  border: 1px solid blue;
  &_text {
    color: gray;
  }
}

.outline {
  background-color: gray;
  border: 1px solid gray;
  &_text {
    color: gray;
  }
}
</style>