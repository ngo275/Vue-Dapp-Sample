<template>
 <Metamask/>
</template>
<script>
import Metamask from '@/components/Metamask'
export default {
  name: 'Main',
  beforeCreate() {
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'Metamask': Metamask
  }
}
</script>
<style scoped>
</style>
