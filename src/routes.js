import ProductList from './ProductList.vue';
import Cart from './Cart.vue';
import ViewProduct from './ViewProduct.vue';
import Product from './Product.vue';
import ProductReviews from './ProductReviews.vue';
import SpecialOffer from './SpecialOffer.vue';
import ViewProfile from './ViewProfile.vue';
import { authService } from './main';

export const routes = [
    { path: '', components: {
        default : ProductList,
        discount : SpecialOffer
    } },
    { path: '/cart', component: Cart },
    {
        path: '/product/:productID?', props: true, name: 'product', component: Product, children: [
            { path: 'details', name: 'viewProduct', props: true, component: ViewProduct },
            { path: 'reviews', name: 'productReviews', props: true, component: ProductReviews },
        ]
    },
    {
        path : '/user/profile',
        name : 'viewProfile',
        component : ViewProfile,
        meta : {
            isAuthRequired : true
        }
    },
    { path: '*', component: { template: '<h1>page not found</h1>' } }
];