<template>
  <div>
    <h1>{{ msg }}</h1>
    <b-container>
      <div class="row">
        <div class="col">
            <b-form-group
              label="Add New Recipe"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group
                label="Coffee Name:"
                label-align-sm="right"
                label-for="nested-coffee-name"
              >
                <b-form-input v-model="coffeeName" id="nested-coffee-name"></b-form-input>
              </b-form-group>

              <b-form-group
                label="Coffee Weight:"
                label-align-sm="right"
                label-for="nested-coffee-weight"
              >
                <b-form-input v-model="coffeeWeight" id="nested-coffee-weight"></b-form-input>
              </b-form-group>

              <b-form-group
                label="Water Weight:"
                label-align-sm="right"
                label-for="nested-water-weight"
              >
                <b-form-input v-model="waterWeight" id="nested-water-weight"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Grind Size:"
                label-align-sm="right"
                label-for="nested-grind-size"
              >
                <b-form-input v-model="coffeeGrind" id="nested-grind-size"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Water Temp:"
                label-align-sm="right"
                label-for="nested-water-temp"
              >
                <b-form-input v-model="waterTemp" id="nested-water-temp"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Brew Time:"
                label-align-sm="right"
                label-for="nested-brew-time"
              >
                <b-form-input v-model="brewtime" id="nested-brew-time"></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="3"
                label="Brew Method:"
                label-align-sm="right"
                class="mb-0"
              >
                <b-form-radio-group
                  class="pt-2"
                  :options="['Aeropress', 'Coldbrew', 'Espresso', 'French Press', 'Moka Pot', 'Pour Over']"
                  v-model="brewMethod"
                ></b-form-radio-group>
              </b-form-group>
              <select v-model="coffeeRating">
                <option disabled value>Please select one</option>
                <option>Good</option>
                <option>Bad</option>
              </select>

              <div>
                <b-button pill type="submit" @click="submit">Submit</b-button>
              </div>
            </b-form-group>
        </div> <!-- end col -->
        <div class="col">
          <h2>Past cups of coffee: </h2>
          <coffee-list-item 
            :coffee-item="coffee" 
            v-for="coffee in coffeeList"
            :key="coffee.id"
          ></coffee-list-item>
        </div> <!-- end col -->
      </div> <!-- end row -->
    </b-container> <!--  end container -->
  </div>
</template>

<script>
import {HTTP} from '../http-constants';
import CoffeeListItem from './CoffeeListItem.vue'
export default {
  name: "CoffeeTracker",
  props: {
    msg: String
  },
  components: {
    CoffeeListItem
  },
  mounted(){
    HTTP.get('/recipes')
      .then(response => {
        // eslint-disable-next-line
        console.log(response.data)
        this.coffeeList= response.data
      })
      .catch(e => {
        this.errors = e
      })
  },
  data() {
    return {
      coffeeName: "",
      coffeeWeight: 0,
      coffeeGrind: 0,
      waterTemp: 0,
      waterWeight: 0,
      brewtime: 0,
      coffeeList: [{grind: 3, coffeename:'Columbian', 
                   waterweight:200, coffeeweight:20, watertemp: 100, roast:4, brewtime:90}],
      coffeeRating: "",
      brewMethod: "",
      message: ""
    };
  },
  methods: {
    submit: function() {
      let coffeeObj = {
        name: this.coffeeName,
        weight: this.coffeeWeight,
        grind: this.coffeeGrind,
        temp: this.waterTemp,
        time: this.brewTime,
        rating: this.coffeeRating,
        method: this.brewMethod
      };
      this.coffeeList.push(coffeeObj);
    },
    getRecipes: function() {
      HTTP.get('/recipes')
        .then(response => {
          // eslint-disable-next-line
          console.log('hello')
          this.coffeeList= response.data.message
        })
        .catch(e => {
          this.errors = e
        })
    }
  }
};
</script>