<template>
    <v-container>
        <h2>
            <span class="blue--text lighten-5">"{{ this.$route.params.title }}"</span> 的搜尋結果
        </h2>
        <v-row>
            <v-col
                v-for="product in result"
                :key="product.id"
                class="col-md-4"
                align-self="start"
                cols="8"
                lg="2"
                md="3"
                sm="4"
            >
                <v-card color="grey lighten-5" width="200" height="400">
                    <v-img
                        :src="product.imgUrl"
                        :lazy-src="product.imgUrl"
                    ></v-img>
                    <v-card-title>
                        {{ product.title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ product.description }}
                    </v-card-subtitle>
                    <v-card-text>
                        {{ product.unit_price }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            // 搜尋結果
            result: 'search/getResult',
        }),
    },
}
</script>

<style lang="scss"></style>
