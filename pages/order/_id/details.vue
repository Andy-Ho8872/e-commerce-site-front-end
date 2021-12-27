<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="userOrder.length == 0" class="loading_circle"/>
        <!-- content -->
        <div v-if="order">
            <!-- 返回按鈕 -->
            <div class="text-center my-6">
                <nuxt-link :to="{ name: 'order'}">
                    <v-btn dark rounded outlined x-large color="light-blue" class="mx-1">
                        <v-icon>fa-long-arrow-alt-left fa-fw</v-icon>
                        <span>訂單總覽</span>
                    </v-btn>
                </nuxt-link>
            </div>
            <!-- 表格內容 -->
            <table class="light-blue darken-1 rounded-xl">
                <!-- 標題 -->
                <thead class="white--text font-weight-bold">
                    <tr>
                        <th v-for="(head, index) in tableHeads" :key="index" class="text-center">
                            {{ head.title }}
                        </th>
                    </tr>
                </thead>
                <!-- 細項 -->
                <tbody class="grey lighten-3 blue-grey--text text--darken-4">
                    <tr v-for="item in order.items" :key="'item' + item.pivot.product_id">
                        <!-- 編號 -->
                        <td data-title="商品編號" id="items_id">
                            <span class="blue--text">#{{ item.pivot.product_id }}</span>
                        </td>
                        <!-- 名稱 -->
                        <td data-title="商品名稱" id="items_title">
                            <span>{{ item.title }}</span>
                        </td>
                        <!-- 圖片 -->
                        <td data-title="商品圖片" id="items_image">
                            <img :src="item.imgUrl" :alt="item.title" width="80" height="80"/>
                        </td>
                        <!-- 數量 -->
                        <td data-title="購買數量" id="items_qty">
                            <span>{{ item.pivot.product_quantity }}</span>
                        </td>
                        <!-- 金額 -->
                        <td data-title="金額小計" id="items_subtotal">
                            <span class="red--text">{{ item.subtotal }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
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
    data() {
        return {
            tableHeads: [
                { title: '商品編號' },
                { title: '商品名稱' },
                { title: '商品圖片' },
                { title: '購買數量' },
                { title: '金額小計' },
            ],
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