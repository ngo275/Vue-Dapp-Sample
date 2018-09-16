<template>
  <div v-if="isInjected" class="counter container">
    <h1>Counter on Smart Contract</h1>
    <div class="wrapper">
      <v-btn v-on:click="handleClick">
        CLICK HERE!!
      </v-btn>
      <h3 class="label">Count is {{value}}</h3>
    </div>
    <img v-if="pending" id="loader" src="https://loading.io/spinners/spinner/lg.ajax-spinner-preloader.gif">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'counter',
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  },
  data () {
    return {
      value: null,
      pending: false,
      event: null
    }
  },
  computed: mapState({
    isInjected: state => state.web3.isInjected,
    contractInstance: state => state.contractInstance,
  }),
  watch: {
    contractInstance (instance, prevInstance) {
      if (!prevInstance && instance) {
        this.loadValue()
      }
    },
  },
  methods: {
    loadValue () {
      this.contractInstance().value((err, result) => {
        if (err) {
          console.log(err)
        } else {
          this.value = parseInt(result)
        }
      })
    },
    handleClick (event) {
      console.log('clicked', event.target.innerHTML)
      this.event = null
      this.pending = true
      this.contractInstance().increment({
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          const Increment = this.contractInstance().Increment()
          Increment.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              this.event = result.args
              this.value = parseInt(result.args._value)
              this.pending = false
            }
          })
        }
      })
    }
  },
}
</script>

<style scoped>
.counter {
  margin-top: 50px;
  text-align:center;
}
.wrapper {
  margin-top: 40px;
}
.label {
  margin-top: 24px;
}
#loader {
  width:150px;
}
*{
  color: #444444;
}
</style>
