<template>
    <v-container>
        <div class="text-center text-h4 mb-6">您選購的商品</div>
        <table class="teal accent lighten-1 rounded-xl">
            <!-- 表格標頭 -->
            <thead class="white--text font-weight-bold">
                <tr>
                    <th v-for="(head, index) in tableHeads" :key="index" class="text-center">
                        {{ head.title }}
                    </th>
                </tr>
            </thead>
            <!-- 表格內容 -->
            <tbody class="teal lighten-4 blue-grey--text text--darken-4">
                <tr v-for="item in userCart" :key="'item' + item.id">
                    <!-- 商品圖片與名稱 -->
                    <td data-title="商品" id="item_image">
                        <div class="justify-start align-center">
                            <img :src="item.imgUrl" :alt="item.title" width="80" height="80">
                            <div>{{ item.title }}</div>
                        </div>
                    </td>
                    <!-- 單價 -->
                    <td data-title="單價" id="item_unit_price">
                        {{ item.unit_price }}
                    </td>
                    <!-- 購買數量 -->
                    <td data-title="數量" id="item_qty">
                        {{ item.product_quantity }}
                    </td>
                    <!-- 總價 -->
                    <td data-title="總價" id="item_subtotal">
                        {{ item.total }}
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 表單 -->
        <v-form ref="form" v-model="valid">
            <v-card class="checkout_warpper my-12 ma-auto" elevation="4">
                <!-- 選擇付款方式 -->
                    <v-card-title>選擇您的付款方式</v-card-title>
                    <v-card-subtitle class="mt-2">
                        <!-- <label class="ma-2 blue blue-grey lighten-4" v-for="payment in payments" :key="payment.id">
                            
                            <input type="radio" name="payment_id" 
                                v-model="form.payment_id"
                                :value="payment.id" 
                                :checked="payment.id == 1"
                            >
                            <div>
                                <v-icon dark>fa-bookmark fa-fw</v-icon>
                                <span>{{ payment.title }}</span>
                            </div>
                        </label> -->
                        <v-chip-group mandatory active-class="deep-purple--text text--accent-4" name="payment_id" v-model="form.payment_id">
                            <v-chip v-for="payment in payments" :key="'payment' + payment.id" :value="payment.id" class="payment_title">
                                {{ payment.title }}
                            </v-chip>
                        </v-chip-group>
                    </v-card-subtitle>
                <!-- 選擇送達地址 -->
                    <v-card-title>輸入您的地址</v-card-title>
                    <v-text-field
                        class="text_field"
                        name="address"
                        v-model="form.address"
                        :rules="[rules.required]"
                        outlined
                        label="您的地址"
                        placeholder="OO市OO區OO路OO號..."
                        hide-details="auto"
                    ></v-text-field>
                <!-- 按鈕與金額顯示 -->
                <div class="d-flex align-center justify-center">
                    <!-- 送出按鈕 -->
                    <v-btn large rounded color="primary" class="create_order_btn ma-4"
                        @click="checkAndCreateOrder"
                        :disabled="!valid" 
                        :loading="loading"
                    >
                        <v-icon>fa-check fa-fw</v-icon>
                        <span>建立訂單</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <!-- 金額小計 -->
                    <div class="subtotal text-h6 mr-8 font-weight-bold">
                        金額小計: <span class="red--text text-lighten-2">{{ subTotal }}</span> 
                    </div>
                </div>
            </v-card>
        </v-form>  
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    head() {
        return {
            title: '建立訂單',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '填上您的付款方式與地址，以便寄送商品。'
                }
            ]
        }
    },
    data() {
        return {
            //* 表格標頭
            tableHeads: [
                { title: '商品' },
                { title: '單價' },
                { title: '數量' },
                { title: '總價' },          
            ],
            //* 表單輸入
            form: {
                //* 預設為現金付款
                payment_id: 1,
                address: ''
            },
            //* 表單驗證
            valid: false,
            rules: {
                required: value => !!value || '此欄位必填',
            },
        }
    },
    computed: {
        ...mapGetters({
            //* 使用者的購物車資料
            userCart: 'cart/getUserCart', 
            cartValidStatus: 'cart/getValidStatus', //? 確認購物車內是否有商品
            //* 後端表單資料
            payments: 'order/getPayments',
            //* loading 狀態
            loading: 'order/getLoading'
        }),
        //* 價格小計
        subTotal() {
            //* 初始為0
            let summary = 0
            // 累加
            this.userCart.forEach(element => {
                summary += Number(element.total) //* 將字串轉換為數字(integer)
            })
            return summary
        },
    },
    methods: {
        ...mapActions({
            //* 建立訂單
            createOrder: 'order/createOrder'
        }),
        checkAndCreateOrder() {
            if(this.userCart.length && this.cartValidStatus) {
                this.createOrder(this.form)
            }
        }
    },
}
</script>


<style lang="scss" scoped>
$border-radius: 50px;
//* 標籤
    //! default (暫不使用) 
// label {
//     display: inline-flex;
//     align-items: center;
//     position: relative;
//     border-radius: $border-radius;
//     box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
//     text-align: center;
//     transition: all 0.5s ease-in-out;
//     cursor: pointer;
//     //? 文字內容
//     div {
//         padding: 12px;
//         letter-spacing: 4px;
//         font-weight: bold;
//     }
//     //? radio 按鈕
//     input[type="radio"] {
//         display: none;
//         //? check 後改變 label 的背景色
//         &:checked + div {
//             background: #1E88E5;
//             color: #FFF;
//             border-radius: $border-radius;

//         }
//     }
// }
.checkout_warpper {
    width: 500px;
}
.text_field {
    width: 350px;
    padding: 16px;
}
</style>