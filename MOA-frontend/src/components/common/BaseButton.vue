<template>
  <button
    v-if="isActive"
    type="button"
    class="btn"
    :class="typeClass + ' ' + _mp"
    :style="styles"
    @click="$emit('click')"
  >
    {{ _text }}
  </button>
  <button v-else disabled type="button" class="btn" :class="_mp" :style="styles">
    {{ _text }}
  </button>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  _isActive: { type: String, required: true },
  _text: { type: String, required: true },
  _textSize: { type: String, required: false },
  _w: { type: String, required: false },
  _h: { type: String, required: false },
  _type: { type: String, required: true },
  _mp: { type: String, required: false },
})

const emit = defineEmits(['click'])

const isActive = ref(true)
const styles = ref('')
const typeClass = ref('')

watchEffect(() => {
  if (props._isActive === false) {
    isActive.value = false
  } else {
    isActive.value = true
  }
})

watchEffect(() => {
  let _width = parseFloat(props._w)
  let _height = parseFloat(props._h)
  if (props._h < 2) {
    _height = 2
  }

  let temp = parseFloat(props._textSize)
  let textSize = `${temp}rem`
  styles.value = `width:${_width}rem; height:${_height}rem; font-size:${textSize}`
})

watchEffect(() => {
  if (props._type == 'fill') {
    typeClass.value = 'btn-success btn-fill'
  } else if (props._type == 'borderline') {
    typeClass.value = 'btn-borderline'
  } else {
    typeClass.value = 'btn-danger'
  }
})
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  padding: 0;
  margin: 0 1rem;
  border: none;
}

button[disabled] {
  background-color: ghostwhite;
  margin: 0;
  border: solid gray 0.001rem;
}

.btn-fill {
  background-color: #43b581;
}

.btn-borderline {
  background-color: white;
  color: #43b581;
  border: solid #43b581 0.01rem;
}
</style>
