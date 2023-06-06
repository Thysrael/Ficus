<template>
  <div id="loading"></div>
</template>

<script>
export default {
  name: 'SpinLoading'
}
</script>

<style scoped>
body {
  margin-top: 100px;
  color: #66eaae;
  text-align:center;
}

#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #66eaae;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}

</style>
