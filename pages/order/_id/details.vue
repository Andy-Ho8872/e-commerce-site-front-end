<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="userOrder.length == 0" class="loading_circle"/>
        <!-- content -->
        <div v-if="order" class="mt-md-12">
            <v-card rounded="lg" max-width="1200" class="d-flex justify-center align-center ma-auto mb-4" elevation="0">
                <v-card-title class="font-weight-bold">
                    <div>訂單編號: #{{ order.id }}</div>
                </v-card-title>
                <!-- 返回按鈕 -->
                <v-spacer></v-spacer>
                <v-btn plain outlined x-large nuxt :to="{ name: 'order'}" color="blue" class="mx-4">
                    <v-icon>fa-long-arrow-alt-left fa-fw</v-icon>
                    <span>訂單總覽</span>
                </v-btn>
            </v-card>
            <v-sheet rounded="lg" max-width="1200" class="ma-auto mb-4 pa-8">
                <v-row>
                    <v-col v-for="item in order.items" :key="'item' + item.pivot.product_id" cols="12" sm="6">
                        <v-card rounded="lg" class="d-flex mb-4" elevation="4">
                            <div class="left my-auto">
                                <v-card-subtitle>
                                    <nuxt-link :to="{ name: 'products-id', params: { id : item.pivot.product_id } }">
                                        <v-img :src="item.imgUrl" :alt="item.title" max-height="80" max-width="80"></v-img>
                                    </nuxt-link>
                                </v-card-subtitle>
                            </div>
                            <div class="right">
                                <v-card-subtitle class="font-weight-bold">
                                    <div class="my-4">商品編號:
                                        <span class="item_id mx-2">#{{ item.pivot.product_id }}</span>
                                    </div>
                                    <div class="my-4 d-flex">
                                        商品名稱:
                                        <div class="item_title mx-2 text-truncate">{{ item.title }}</div>
                                    </div>
                                    <div class="my-4 d-flex" v-if="item.pivot.variation_option_values.length !== 0">
                                        商品規格:
                                        <div class="item_variation_option_values mx-2 text-truncate">
                                            <span v-for="(option, index) in item.pivot.variation_option_values" :key="'option' + index">{{ option }} 、</span>
                                        </div>
                                    </div>
                                    <div class="my-4">購買數量:
                                        <span class="mx-2">{{ item.pivot.product_quantity }}</span>
                                    </div>
                                    <div class="my-4">金額小計:
                                        <span class="mx-2">{{ item.subtotal }}</span>
                                    </div>
                                </v-card-subtitle>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-sheet>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    head() {
        return {
            title: '訂單細項',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '訂單的細項。'
                }
            ]
        }
    },
    methods: {
        ...mapActions({
            //* 撈取單筆訂單 
            fetchSingleOrder: 'order/fetchSingleOrder',
        }),
    },
    computed: {
        ...mapGetters({
            //* 訂單資料 
            userOrder: 'order/getAllOrders',
        }),
        //* 單筆訂單的暫存資料(為避免重複撈取資料) 
        order() {
            return this.userOrder.find(o => o.id == this.$route.params.id)
        }
    },
}
</script>

<style lang="scss" scoped>
.right {
    width: 100%;
}
.item_title {
    width: 50%;
}
</style>