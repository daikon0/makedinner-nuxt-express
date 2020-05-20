<template>
  <v-app>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <div>
            <v-btn-toggle>
              <v-btn @click="ricebtn">
                丼もの
              </v-btn>
              <v-btn @click="noodlesbtn">
                麺類
              </v-btn>
            </v-btn-toggle>
          </div>
          <div>
            <v-btn-toggle>
              <v-btn @click="lightbtn">
                あっさり
              </v-btn>
              <v-btn @click="heavybtn">
                こってり
              </v-btn>
            </v-btn-toggle>
          </div>
          <v-btn @click="decision">決定</v-btn>
          <div v-if="dish">
            <Dish :dish="dish" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Dish from '@/components/Dish'
export default {
  components: {
    Dish
  },
  data() {
    return {
      rice: false,
      noodles: false,
      light: false,
      heavy: false,
      dish: null,
      oyakodon: {
        dishName: '親子丼',
        dishFile: require('@/static/oyakodon.jpg'),
        dishUrl: 'aaaaaa'
      },
      butadon: {
        dishName: '豚丼',
        dishFile: require('@/static/butadon.jpeg'),
        dishUrl: 'aaaa'
      },
      udon: {
        dishName: 'ぶっかけうどん',
        dishFile: require('@/static/udon.jpeg'),
        dishUrl: 'aaaa'
      },
      yakisoba: {
        dishName: '焼きそば',
        dishFile: require('@/static/yakisoba.jpeg'),
        dishUrl: 'aaaa'
      }
    }
  },
  created() {
    this.$store.dispatch('setTitle', '楽ちん献立')
  },
  methods: {
    ricebtn() {
      this.rice = true
      this.noodles = false
    },
    noodlesbtn() {
      this.rice = false
      this.noodles = true
    },
    lightbtn() {
      this.light = true
      this.heavy = false
    },
    heavybtn() {
      this.light = false
      this.heavy = true
    },
    decision() {
      this.dish = null
      if (this.rice && this.light) {
        this.dish = this.oyakodon
      }
      if (this.rice && this.heavy) {
        this.dish = this.butadon
      }
      if (this.noodles && this.light) {
        this.dish = this.udon
      }
      if (this.noodles && this.heavy) {
        this.dish = this.yakisoba
      }
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
