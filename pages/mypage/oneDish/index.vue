<template>
  <v-app>
    <v-container>
      <div>
        <v-btn-toggle class="my-3 mt-8 btn-width">
          <v-btn block @click="ricebtn">
            丼もの
          </v-btn>
          <v-btn block @click="noodlesbtn">
            麺類
          </v-btn>
        </v-btn-toggle>
      </div>
      <div>
        <v-btn-toggle class="my-3 btn-width">
          <v-btn block @click="lightbtn">
            あっさり
          </v-btn>
          <v-btn block @click="heavybtn">
            こってり
          </v-btn>
        </v-btn-toggle>
      </div>
      <v-btn class="my-5" @click="decision">決定</v-btn>
      <v-row justify="center" align="center">
        <v-col cols="12" md="9">
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
        dishUrl: 'https://park.ajinomoto.co.jp/recipe/card/703024/'
      },
      butadon: {
        dishName: '豚丼',
        dishFile: require('@/static/butadon.jpeg'),
        dishUrl: 'https://cookpad.com/recipe/1134767'
      },
      udon: {
        dishName: 'ぶっかけうどん',
        dishFile: require('@/static/udon.jpeg'),
        dishUrl:
          'https://www.kurashiru.com/recipes/61bf7bb5-24ba-4bec-aac3-170a2ce5382f'
      },
      yakisoba: {
        dishName: '焼きそば',
        dishFile: require('@/static/yakisoba.jpeg'),
        dishUrl:
          'https://www.kurashiru.com/recipes/01e45c0e-7961-4e7d-b332-1f819e8aa10f'
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
.btn-width {
  width: 50%;
}

a {
  text-decoration: none;
}
</style>
