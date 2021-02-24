<template>
    <div class="d-flex align-center">
        <v-rating
            v-model="rating"
            background-color="yellow darken-2"
            color="yellow darken-3"
            length="5"
            size="16"
            half-increments
            readonly
        >
        </v-rating>
        <span>({{ rating }})</span>
    </div>
</template>

<script>
export default {
    props: {
        'product': Object,
    },
    computed: {
        // 要轉換為 Number 才能使用
        rating() {
            return Number(this.product.rating)
        }
    }
}
</script>
