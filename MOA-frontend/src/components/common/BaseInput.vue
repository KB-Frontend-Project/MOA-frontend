<template>
  <input
    v-if="_type == 'text'"
    type="text"
    class="form-control"
    :placeholder="_ph"
    :style="styles"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    v-else-if="_type === 'password'"
    type="password"
    class="form-control"
    :placeholder="_ph"
    :style="styles"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    v-else-if="_type === 'date'"
    type="date"
    class="form-control"
    :placeholder="_ph"
    :style="styles"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <input
    v-else-if="_type === 'amount'"
    type="text"
    class="form-control"
    :placeholder="_ph"
    :style="styles"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { ref, reactive, watchEffect } from 'vue'

const props = defineProps({
  _type: { type: String, required: true },
  _ph: { type: String, default: '' },
  _w: { type: String, default: '100' },
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])

const styles = ref('')

watchEffect(() => {
  const temp = parseInt(props._w)
  styles.value = `width: ${temp}%`
})
</script>

<style scoped>
input {
  margin: 1rem;
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-color: #d2f8e8;
}

input::placeholder {
  color: gainsboro;
}

.form-control:focus {
  border-color: #43b581;
  box-shadow: 0px 0px 10px -2px #fff;
}
</style>
