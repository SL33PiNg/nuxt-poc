<template>
  <div>
    <!-- <div>
      {{ profile }}
    </div> -->
    <code>
      {{ idToken }}
    </code>
    <button @click="getIdToken">Get ID Token</button>
  </div>
</template>

<script setup lang="ts">
import liff from '@line/liff';

const liffId = '2006641539-evaq2D9A'

const profile = ref<any>(null)
const idToken = ref<string | null>('')

onMounted(() => {
  liff.init({ liffId})
  .then(() => {
    if(!liff.isLoggedIn()) {
      liff.login()
    } else {
      liff.getProfile()
      .then(p => {
        console.log(p)
        profile.value = p
      })
      idToken.value = liff.getIDToken()
    }
  })
})

function getIdToken() {
  liff.isLoggedIn() || liff.login()
  idToken.value = liff.getIDToken()
}


function testDev() {
  const a = ref(1)
  console.log(a.value)
  a.value++
  console.log(a.value)
  a.value++
  console.log(a.value)
}



</script>