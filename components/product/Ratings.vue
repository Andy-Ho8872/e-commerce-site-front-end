<template>
    <div class="d-flex align-center">
        <v-rating
            class="product_rating"
            v-model="rating"
            dense
            background-color="yellow darken-2"
            color="yellow darken-3"
            length="5"
            :size="size"
            half-increments
            readonly
        >
        </v-rating>
        <span>({{ rating }})</span>
    </div>
</template>

<script>
export default {
    //? passed from components/Product.vue Or pages/search/title.vue
    props: {
        product: {
            type: Object,
            require: true
        },
        size : {
            type: [Number, String],
            default: 12
        }
    },
    computed: {
        //* 要轉換為 Number 才能使用
        rating() {
            return Number(this.product.rating)
        }
    }
}
</script>
