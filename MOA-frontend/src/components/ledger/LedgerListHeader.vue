<template>
  <div class="outer">
    <div class="container separate">
      <span class="rounded-pill">분류</span>
    </div>
    <div class="container datediv">
      <span>날짜</span>
    </div>
    <div class="container textdiv"><span>카테고리</span></div>
    <div class="container textdiv">
      <span>거래처</span>
    </div>
    <div class="container amount">
      <span> 금액 </span>
    </div>
    <div class="container textdiv"><span>메모</span></div>
    <div class="container author"><span> 작성자 </span></div>
    <div class="container bc"></div>
    <div class="container bc"></div>
  </div>
</template>

<style scoped>
span {
  margin: 0;
  font-size: 1.15rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
span.rounded-pill {
  background-color: white;
  color: black;
  width: 4rem;
  height: 1.75rem;
  justify-content: start;
  padding-left: 0.25rem;
}

div.outer {
  display: flex;
  margin: 0.5rem;
  background-color: white;
}

div.container {
  /* border: solid black 1px; */
  border-bottom: solid #ecfcf3 2px;
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

div.separate {
  width: 25rem;
}

div.datediv {
  width: 50rem;
  justify-content: start;
}

div.amount {
  padding-right: 0.5rem;
  justify-content: end;
  width: 50rem;
}

div.textdiv {
  padding-left: 0.5rem;
  justify-content: start;
}

div.author {
  width: 30rem;
}

div.bc {
  padding: 0;
  width: 40rem;
}
</style>

<script setup></script>
