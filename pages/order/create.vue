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
            <v-card class="checkout_wrapper my-12 ma-auto" elevation="4">
                <!-- 選擇付款方式 -->
                    <v-card-title class="font-weight-bold">選擇您的付款方式</v-card-title>
                    <v-card-subtitle class="mt-2">
                        <v-chip-group mandatory active-class="deep-purple--text text--accent-4" name="payment_id" v-model="form.payment_id">
                            <v-chip v-for="payment in payments" :key="'payment' + payment.id" :value="payment.id" large label class="payment_title">
                                {{ payment.title }}
                            </v-chip>
                        </v-chip-group>
                    </v-card-subtitle>
                <!-- 輸入訂單資訊 -->
                    <v-card-title class="font-weight-bold">輸入訂單詳細資料</v-card-title>
                    <!-- 姓名 -->
                    <v-text-field
                        class="text_field"
                        name="name"
                        v-model="form.name"
                        :rules="[rules.required, rules.lettersOnly]"
                        outlined
                        label="您的姓名"
                        placeholder="王小明"
                        hide-details="auto"
                    ></v-text-field>
                    <!-- 電話 -->
                    <v-text-field
                        class="text_field"
                        name="phone"
                        v-model="form.phone"
                        :rules="[rules.required, rules.numbersOnly]"
                        maxlength="10"
                        outlined
                        label="您的電話"
                        placeholder="0912345678"
                        hide-details="auto"
                    ></v-text-field>
                    <!-- 地址 -->
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
                    <!-- 使用常用資料 -->
                    <v-card-subtitle>
                        <v-switch @click="checkAutoFill" v-model="autoFill" inset label="填入我的個人資料"></v-switch>
                    </v-card-subtitle>
                    <!-- 提醒視窗 -->
                    <v-dialog v-model="dialog" width="600">
                        <v-card>
                            <v-card-title class="font-weight-bold">尚未填寫個人資料</v-card-title>
                            <v-card-text class="font-weight-bold">我們發現您尚未填寫您的個人檔案，是否先進行填寫?</v-card-text>
                            <!-- 按鈕操作 -->
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="dialog = false" color="error" outlined>先不要</v-btn>
                                <v-btn color="primary" nuxt :to="{ name: 'user-account' }">去填寫</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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
                name: '',
                phone: '',
                address: ''
            },
            //* 自動填入資料 
            autoFill: false,
            //* 彈出視窗
            dialog: false,
            //* 表單驗證
            valid: false,
            //* 表單驗證規則 
            rules: {
                numbersOnly: value => {
                    const pattern = /^[\d ]*$/
                    return pattern.test(value) || '電話號碼只能有數字。'
                },
                lettersOnly: value => {
                    const pattern = /^\D*$/
                    return pattern.test(value) || '名字不能包含數字。'
                },
                required: value => !!value || '此欄位必填',
            }
        }
    },
    computed: {
        ...mapGetters({
            //* 使用者個人資料 
            user: 'auth/getUserInfo',
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
        //* 確認是否有使用自動填入功能 
        checkAutoFill() {
            this.checkIfUserHasFilledProfile()
            this.setFormInputs()
        },
        //* 確認使用者是否有填入個人資料
        checkIfUserHasFilledProfile() {
            if(!this.user.name || !this.user.phone || !this.user.address) {
                this.dialog = true // 跳出提醒視窗
                this.autoFill = false
            }
        },
        //* 設定輸入欄位的值
        setFormInputs() {
            if(this.autoFill) {
                this.form.name = this.user.name 
                this.form.phone = this.user.phone
                this.form.address = this.user.address
            } else {
                this.form.name = ''
                this.form.phone = ''
                this.form.address = ''
            }
        },
        //* 建立訂單 
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
.checkout_wrapper {
    width: 500px;
}
.text_field {
    width: 350px;
    padding: 16px;
}
</style>