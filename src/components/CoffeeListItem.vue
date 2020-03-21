<template>
  <div>
    <div id="example-1">
        {{ coffeeItem.coffeename }} => 
        Use {{coffeeItem.coffeeweight }} grams for {{ coffeeItem.brewtime}} seconds @ {{ coffeeItem.watertemp }} degrees.
    </div>
  </div>
</template>
<script>
export default {
  name: "CoffeeListItem",
  props: {
    coffeeItem: Object
  },
  data() {
    return {};
  },
  methods: {}
};
</script>