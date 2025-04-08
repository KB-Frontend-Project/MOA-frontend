<template>
    <div class="modal" v-if="isModal" @click="$emit('close')">
      <div class="card page" @click.stop>
        <div class="card-header d-flex align-items-center justify-content-between">
          <div class="title text-center flex-grow-1">Modal</div>
          <button class="close-btn" aria-label="Close" @click="$emit('close')">×</button>
        </div>
        <div class="card-body p-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, commodi. Odit animi
          tempore earum vero quas hic inventore quaerat illum provident perspiciatis, praesentium
          cumque, eligendi quibusdam voluptas. Blanditiis, aliquid enim. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Adipisci error ab recusandae consequatur, quos autem quod
          expedita? Natus, iste fuga magnam itaque libero deserunt voluptatibus, obcaecati veniam,
          esse reiciendis ipsam!
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  // 부모로부터 isModal 값을 props로 받음
  const props = defineProps({
    isModal: {
      type: Boolean,
      required: true,
    },
  })
  
  // 버튼 클릭 시 'close' 이벤트를 부모로 emit
  const emit = defineEmits(['close'])
  </script>
  
  <style scoped>
  .modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .page {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 32rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .card-header {
    background-color: #f8f9fa;
    padding: 1rem;
  }
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.8rem;
    line-height: 1;
    cursor: pointer;
    color: #000;
  }
  .card-body {
    padding: 1.5rem;
    font-size: 1rem;
    color: #333;
  }
  </style>
  