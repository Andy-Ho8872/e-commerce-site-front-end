<template>
    <v-container>
        <div class="text-center text-h4 mb-6">您選購的商品</div>
        <table class="teal accent lighten-1 rounded-xl">
            <thead class="white--text font-weight-bold">
                <tr>
                    <th v-for="(head, index) in tableHeads" :key="index" class="text-center">
                        {{ head.title }}
                    </th>
                </tr>
            </thead>
            <tbody class="teal lighten-4 blue-grey--text text--darken-4">
                <tr v-for="item in userCart" :key="item.id">
                    <td data-title="商品" id="item_image">
                        <div class="justify-start align-center">
                            <img :src="item.imgUrl" :alt="item.title" width="80" height="80">
                            <div>{{ item.title }}</div>
                        </div>
                    </td>
                    <td data-title="單價" id="item_unit_price">
                        {{ item.unit_price }}
                    </td>
                    <td data-title="數量" id="item_qty">
                        {{ item.product_quantity }}
                    </td>
                    <td data-title="總價" id="item_subtotal">
                        {{ item.total }}
                    </td>
                </tr>
            </tbody>
        </table>
        
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            tableHeads: [
                { title: '商品' },
                { title: '單價' },
                { title: '數量' },
                { title: '總價' },          
            ],
        }
    },
    computed: {
        ...mapGetters({
            userCart: 'cart/getUserCart', // 使用者的購物車資料
        }),
        // 價格小計
        subTotal() {
            // 初始為0
            let summary = 0
            // 累加
            this.userCart.forEach(element => {
                summary += Number(element.total) // 將字串轉換為數字(integer)
            })
            return summary
        },
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