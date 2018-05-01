<template>
  <div>
    <p><strong>ID:</strong> {{ product.id }}</p>
    <p><strong>Price:</strong> {{ product.price - discount | currency}}
      <span v-if="discount > 0">(save {{discount | currency}})</span>
    </p>
    <p><strong>In stock:</strong> {{ product.inStock }}</p>
    <p>{{ product.description }}</p>
  </div>
</template>

<script>
import { products } from "./data/product.js";
export default {
  props : {
    productID : {
      required : true
    }
  },
  data() {
    return {
      products: products,
      product: null,
      discount : 0
    };
  },
  created() {
    this.product = this.getProduct(this.productID);

    if(typeof this.$route.query.discount !== 'undefined'){
      this.discount = this.getDiscount(this.product.price, this.$route.query.discount);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.discount = this.getDiscount(this.product.price, to.query.discount);
    this.product = this.getProduct(to.params.productID);
    next();
  },
  methods: {
    getProduct(productID) {
      let match = null;
      this.products.forEach(product => {
        if (product.id == productID) match = product;
      });
      return match;
    },
    getDiscount(originalPrice, percentage) {
      if(!percentage) {
        return 0;
      }

      return ((originalPrice * percentage) / 100);
    }
  }
};
</script>

<style>

</style>
