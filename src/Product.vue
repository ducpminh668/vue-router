<template>
  <div>
    <button @click="goBack" class="btn btn-primary">Back</button>

    <h1>{{ product.name }}</h1>
    <ul class="nav nav-pills">
        <router-link class="presentation"
            :to="{name: 'viewProduct', params: {productID : product.id}}"
            tag="li"
            active-class="active">
            <a>Details</a>
        </router-link>
        <router-link class="presentation"
            :to="{name: 'productReviews', params: {productID : product.id}}"
            tag="li"
            active-class="active">
            <a>Reviews</a>
        </router-link>
    </ul>
    
    <br>
    <router-view></router-view>

    <div v-if="relatedProducts != null" id="related">
      <h2>Related Products</h2>
      <ul>
        <li v-for="(related, index) in relatedProducts" :key="index">
          <router-link :to="{ name: 'viewProduct', params :{productID : related.id} }">
            {{related.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { products } from "./data/product.js";
export default {
  computed: {
    relatedProducts() {
      return [
        { id: 1, name: "MacBook Pro (15 inch)" },
        { id: 2, name: "Samsung Galaxy Note 7" },
        { id: 3, name: "HP Officejet 5740 e-All-in-One-printer" }
      ];
    }
  },
  watch: {
    productID(newValue, oldValue) {
      this.product = this.getProduct(newValue);
    }
  },
  props: {
    productID: {
      required: true
    }
  },
  data() {
    return {
      products: products,
      product: null
    };
  },
  created() {
    this.product = this.getProduct(this.productID);
  },
  methods: {
    getProduct(productID) {
      let match = null;
      this.products.forEach(product => {
        if (product.id == productID) match = product;
      });
      return match;
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>

</style>
