<template>
<div>
  <router-view name="discount"></router-view>
  <div class="container">
    <nav class="navbar navbar-default">
      <div class="contaier-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">E-commerce Inc</router-link>
      </div>

      <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
             <router-link to="/" tag="li" exact active-class="active">
                <a>Products</a>
              </router-link>
              <router-link to="/cart" tag="li" active-class="active">
                <a>Cart</a>
              </router-link>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              
              <div class="pull-right stats">{{ cart.items.length }} <template v-if="cart.items.length == 1">item</template><template v-else>items</template> in cart, totalling {{ cartTotal | currency }}</div>

              <div style="margin-top: 8px; margin-right: 8px;" class="pull-right">
                  <router-link :to="{ name: 'viewProfile' }">My Profile</router-link>
                  &nbsp;
                  <button v-if="auth.isLoggedIn" class="btn btn-primary" @click="auth.isLoggedIn = false">Log out</button>
                  <button v-else class="btn btn-primary" @click="auth.isLoggedIn = true">Log in</button>
            </div>
            </ul>
          </div>
      </div>
    </nav>

    <transition
      enter-active-class="animated fadeInRight"
      mode="out-in">
      <router-view :cart="cart"></router-view>
    </transition>
    </div>
  </div>
</template>

<script>
import { eventBus } from "./main";
import CartMixin from "./mixins/cart";
import { authService } from "./main";

export default {
  mixins: [CartMixin],
  data() {
    return {
      cart: {
        items: []
      },
      auth: authService
    };
  },
  created() {
    eventBus.$on("addItemToCart", data => {
      this.addProductToCart(data.product, data.quantity);
    });
  }
};
</script>

<style>
.flex {
  display: flex;
}
.flex.flex-column {
  flex-direction: column;
}
.flex.flex-row {
  flex-direction: row;
}
.flex.justify-center {
  justify-content: center;
}
.flex.justify-left {
  justify-content: flex-start;
}
.flex.justify-right {
  justify-content: flex-end;
}
.flex.align-center {
  align-items: center;
}
.flex.align-left {
  align-items: flex-start;
}
.flex.align-right {
  align-items: flex-end;
}
/* Navigation */
.navbar .stats {
  margin-top: 15px;
}
</style>