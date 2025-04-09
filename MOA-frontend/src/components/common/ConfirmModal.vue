<template>
    <!-- 모달 컨테이너 (배경) -->
    <div class="modal" v-if="isModal" @click="$emit('cancel')">
      <!-- 모달 콘텐츠 박스 -->
      <div class="card page" @click.stop>
        <!-- 헤더 -->
        <div class="card-header d-flex align-items-center justify-content-between">
          <div class="title text-center flex-grow-1">{{ title }}</div>
          <!-- 닫기 버튼: 누르면 취소와 동일하게 처리 -->
          <button class="close-btn" aria-label="Close" @click="$emit('cancel')">
            ×
          </button>
        </div>
  
        <!-- 본문 내용 -->
        <div class="card-body p-4">
          {{ message }}
        </div>
  
        <!-- 확인/취소 버튼 (하단) -->
        <div class="card-footer">
          <button class="btn-cancel" @click="$emit('cancel')">
            {{ cancelText }}
          </button>
          <button class="btn-confirm" @click="$emit('confirm')">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    isModal: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: '알림',
    },
    message: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '확인',
    },
    cancelText: {
      type: String,
      default: '취소',
    },
  })
  
  const emit = defineEmits(['confirm', 'cancel'])
  </script>
  
  <style scoped>
  /* 전체 모달 배경 */
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
  
  /* 모달 카드 영역 */
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
  
  /* 헤더 */
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
  
  /* 본문 */
  .card-body {
    padding: 1.5rem;
    font-size: 1rem;
    color: #333;
  }
  
  /* 하단 버튼 영역 */
  .card-footer {
    background-color: #f8f9fa;
    padding: 0.75rem 1rem;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    border-top: 1px solid #dee2e6;
  }
  
  /* 버튼들 예시 스타일 */
  .btn-cancel,
  .btn-confirm {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .btn-cancel {
    background-color: #e9ecef;
  }
  .btn-confirm {
    background-color: #007bff;
    color: #fff;
  }
  </style>
  