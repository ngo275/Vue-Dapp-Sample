<template>
  <div>
    <Metamask/>
    <Counter/>
  </div>
</template>

<script>
import Metamask from '@/components/Metamask'
import Counter from '@/components/Counter'
export default {
  name: 'Main',
  beforeCreate() {
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'Metamask': Metamask,
    'Counter': Counter,
  }
}
</script>

<style scoped>
</style>
