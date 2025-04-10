<template>
  <div class="container text-center">
    <!-- 제일 위 줄 -->
    <div class="d-flex justify-content-center align-items-center mb-4">
      <img src="../assets/image 40.png" alt="" style="width: 7rem" />

      <div class="d-flex flex-column align-items-center mx-4">
        <div>모아찌 님의 계좌 통장을 흔들어서 부자되세요₩!@@!#!@#ㄸ$@</div>
        <div>현재까지 얼마 모아찌 ? - 100,000,000원</div>
      </div>

      <img src="../assets/image 40.png" alt="" style="width: 7rem" />
    </div>

    <hr />

    <!-- 은행 정보 + 버튼들 -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center gap-2">
        <div>국민은행</div>
        <div>652321-43-231232</div>
      </div>

      <div class="d-flex gap-2">
        <BaseButton _text="흔들기" _type="fill" _w="3.5rem" _h="1.5rem" />
        <BaseButton _text="연동 해지" _type="" _w="4.5rem" _h="1.5rem" />
      </div>
    </div>

    <hr />

    <!-- 맨 아래 버튼 -->
    <div class="d-flex justify-content-center">
      <BaseButton _text="연동하기" _type="fill" _w="30rem" />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
</script>
