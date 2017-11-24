<template>
  <div class="callback">
    Attendere ...
  </div>
</template>

<script>
import { setIdToken, setAccessToken } from '../utils/auth';
export default {
  name: 'Callback',
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      window.location.href = '/';
    });
  },
};
</script>