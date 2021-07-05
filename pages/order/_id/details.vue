<template>
    <v-container>
        <!-- loading -->
        <LoadingCircle v-if="userOrder.length == 0"/>
        <!-- content -->
        <div v-if="order">
            <!-- 返回按鈕 -->
            <div class="text-center my-6">
                <nuxt-link :to="{ name: 'order'}">
                    <v-btn dark rounded outlined x-large color="light-blue" class="mx-1">
                        <v-icon>fa-long-arrow-alt-left fa-fw</v-icon>
                        訂單總覽
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
                    <tr v-for="item in order.items" :key="item.id">
                        <!-- 編號 -->
                        <td data-title="商品編號" id="items_id">
                            <span>{{ item.pivot.product_id }}</span>
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
                            <span>{{ item.subtotal }}</span>
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

// <style lang="scss" scoped>
$letter-spacing: 0.125rem;
$padding: 10%;
$td-padding: 1.5rem 0;
//? only for RWD
$title-font-weight: 600;

a {
    text-decoration: none;
}
table {
    width: 100%;
    border-collapse: collapse;
    border-bottom: 4px solid;
    box-shadow: 2px 2px 4px #eceff1;
    th {
        letter-spacing: $letter-spacing;
        padding: 1rem;
    }
}
tbody {
    text-align: center;
    td {
        padding: $td-padding;
        font-weight: $title-font-weight;
        letter-spacing: $letter-spacing;
        max-width: 200px;
    }
    tr {
        &:hover {
            transform: scale(1.035);
            transition: all .3s ease-out;
        }
        &:nth-child(even) {
            background: #fff;
        }
    }
}

@media (max-width: 768px) {
    th {
        display: none;
    }
    tbody {
        td {
            max-width: 100%;
            display: block;
            position: relative;
            text-align: right;
            padding-right: $padding;
            //* 除了最後一個元素之外，其餘的都要加上底線
            &:not(:last-child) {
                border-bottom: 1px solid #b0bec5;
            }
            //* 表格標題
            &::before {
                content: attr(data-title);
                position: absolute;
                font-weight: $title-font-weight;
                letter-spacing: $letter-spacing;
                padding-left: $padding;
                left: 0;
            }
            span {
                display: flex;
                flex-wrap: wrap;
                padding-left: 40%;
                justify-content: flex-end;
                align-items: center;
                // text-align: justify; //! default
                text-align: end; 
            }
        }
    }
}
</style>