<template>
    <v-container>
        <!-- 返回按鈕 -->
        <div class="text-center my-6">
            <nuxt-link :to="{ name: 'order'}">
                <v-btn dark rounded outlined x-large color="light-blue" class="mx-1">
                    <v-icon>fa-long-arrow-alt-left fa-fw</v-icon>
                    返回訂單頁面
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
                <tr v-for="item in userOrder.items" :key="item.id">
                    <!-- 編號 -->
                    <td data-title="商品編號" id="items_id">
                        {{ item.pivot.product_id }}
                    </td>
                    <!-- 名稱 -->
                    <td data-title="商品名稱" id="items_title">
                        {{ item.title }}
                    </td>
                    <!-- 圖片 -->
                    <td data-title="商品圖片" id="items_image">
                        <img :src="item.imgUrl" :alt="item.title" width="80" height="80"/>
                    </td>
                    <!-- 數量 -->
                    <td data-title="購買數量" id="items_qty">
                        {{ item.pivot.product_quantity }}
                    </td>
                    <!-- 金額 -->
                    <td data-title="金額小計" id="items_subtotal">
                        {{ item.subtotal }}
                    </td>
                </tr>
            </tbody>
        </table>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { apiGetSingleOrder } from '../../../APIs/api'

export default {
    // asyncData 的方法，因為要使用 localStorage 取得 User 的 Token，所以如果直接在網址上輸入 order/order_id 的話會報錯。
    // async asyncData({ params }) {
    //     const res = await apiGetSingleOrder(params.id)
    //     return { order: res.data.order }
    // },
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
            fetchSingleOrder: 'order/fetchSingleOrder',
        }),
    },
    computed: {
        ...mapGetters({
            userOrder: 'order/getSingleOrder',
        }),
    },
    mounted() {
        this.fetchSingleOrder(this.$route.params.id)
    },
}
</script>

// <style lang="scss" scoped>
// $letter-spacing: 0.125rem;
// $padding: 10%;
// $td-padding: 1.5rem 0;
// // only for RWD
// $title-font-weight: 600;

// a {
//     text-decoration: none;
// }
// table {
//     width: 100%;
//     border-collapse: collapse;
//     border-bottom: 4px solid;
//     box-shadow: 2px 2px 4px #eceff1;
//     th {
//         letter-spacing: $letter-spacing;
//         padding: 1rem;
//     }
// }
// tbody {
//     text-align: center;
//     td {
//         padding: $td-padding;
//         font-weight: $title-font-weight;
//         letter-spacing: $letter-spacing;
//     }
//     tr {
//         &:hover {
//             transform: scale(1.05);
//         }
//         &:nth-child(even) {
//             background: #fff;
//         }
//     }
// }

// @media (max-width: 768px) {
//     th {
//         display: none;
//     }
//     tbody {
//         td {
//             display: block;
//             position: relative;
//             text-align: right;
//             padding-right: $padding;
//             // 除了最後一個元素之外，其餘的都要加上底線
//             &:not(:last-child) {
//                 border-bottom: 1px solid #b0bec5;
//             }
//             // 表格標題
//             &::before {
//                 content: attr(data-title);
//                 position: absolute;
//                 font-weight: $title-font-weight;
//                 letter-spacing: $letter-spacing;
//                 padding-left: $padding;
//                 left: 0;
//             }
//         }
//     }
// }
</style>
