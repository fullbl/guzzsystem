<template>
  <div class="callback">
    <app-nav></app-nav>
    Callback
  </div>
</template>

<script>
import { setIdToken, setAccessToken } from '../utils/auth';
import AppNav from './AppNav';
export default {
  name: 'Callback',
  components: {
    AppNav,
  },
  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      window.location.href = '/';
    });
  },
};
</script>