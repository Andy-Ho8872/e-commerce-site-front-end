<template>
    <v-container class="checkout_wrapper">
        <v-card>
            <v-card-title class="font-weight-bold">
                <div>確認品項</div>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined nuxt :to="{ name: 'cart' }">修改</v-btn>
            </v-card-title>
            <v-list two-line>
                <v-list-item v-for="item in userCart" :key="'item' + item.id">
                    <v-list-item-avatar rounded="lg" size="60">
                        <v-img :src="item.imgUrl"></v-img>
                    </v-list-item-avatar>
                    <!-- 規格與價格 -->
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>
                            <div class="my-2">規格: 
                                <span v-if="item.variation_option_values.length">{{ item.variation_option_values }}</span>
                                <span v-else>無</span>
                            </div>
                            <div>${{ Math.floor(item.unit_price) }} x {{ item.product_quantity }}</div>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                    <!-- 總價 -->
                    <v-list-item-action-text class="text-subtitle-1 font-weight-bold">${{ item.total }}</v-list-item-action-text>
                </v-list-item>
            </v-list>
        </v-card>
        <!-- 表單 -->
        <v-form ref="form" v-model="valid">
            <v-card class="my-12 ma-auto" elevation="4">
                <!-- 選擇付款方式 -->
                    <v-card-title class="font-weight-bold">選擇您的付款方式</v-card-title>
                    <v-card-subtitle class="mt-2">
                        <v-chip-group mandatory active-class="deep-purple--text text--accent-4" name="payment_id" v-model="form.payment_id">
                            <v-chip v-for="payment in payments" :key="'payment' + payment.id" :value="payment.id" large label @click="checkPaymentMethod(payment)" class="payment_title">
                                {{ payment.title }}
                            </v-chip>
                        </v-chip-group>
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <div v-if="!creditCardFormDisabled">
                        <v-card-title class="font-weight-bold">選擇刷卡帳戶</v-card-title>
                        <!-- 信用卡輸入欄位 -->
                        <v-card-text>
                            <VCleaveInput
                                class="text_field"
                                v-model="form.creditCard.number"
                                :options="options"
                                :rules="[rules.required]"
                                :append-icon="creditCardIcon"
                                outlined
                                label="卡號"
                            />
                            <v-text-field class="text_field" label="持有人" outlined v-model="form.creditCard.holder_name" :rules="[rules.required]"></v-text-field>
                            <v-select class="text_field" label="到期日(月)" outlined :items="months" v-model="form.creditCard.expiration_month" :rules="[rules.required]"></v-select>
                            <v-select class="text_field" label="到期日(年)" outlined :items="years" v-model="form.creditCard.expiration_year" :rules="[rules.required]"></v-select>
                            <v-text-field class="text_field" label="安全碼(CVV)" outlined maxlength="3" counter="3" v-model="form.creditCard.cvv" :rules="[rules.required, rules.numbersOnly]"></v-text-field>
                        </v-card-text>
                        <!-- 自動填入我的信用卡 -->
                        <v-card-subtitle>
                            <v-switch @click="[autoFillCreditCard = !autoFillCreditCard, fillCreditCardInfo()]" inset label="填入我的信用卡"></v-switch>
                        </v-card-subtitle>
                        <!-- 選擇已經輸入的信用卡 -->
                        <v-dialog max-width="600" v-model="selectCreditCardDialog">
                            <v-card v-if="!user.credit_cards.length">
                                <v-card-title class="font-weight-bold">填寫資料</v-card-title>
                                <v-card-text>請先至個人資料填寫信用卡。</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" text @click="selectCreditCardDialog = false">先不要</v-btn>
                                    <v-btn color="primary" nuxt :to="{ name: 'user-account' }">去填寫</v-btn>
                                </v-card-actions>
                            </v-card>
                            <v-card v-else>
                                <v-card-title class="font-weight-bold">選擇信用卡</v-card-title>
                                <v-card-text>
                                    <v-radio-group>
                                        <v-radio v-for="(creditCard, index) in user.credit_cards" :key="'creditCard' + creditCard.id" :label="`卡號: ${creditCard.masked_card_number}`" @click="setCurrentSelectedCreditCardInputs(index)"></v-radio>
                                    </v-radio-group>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" outlined @click="selectCreditCardDialog = false">關閉</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                <!-- 輸入訂單資訊 -->
                    <v-card-title class="font-weight-bold">輸入訂單詳細資料</v-card-title>
                    <!-- 姓名 -->
                    <v-card-text>
                        <v-text-field
                            class="text_field"
                            name="buyer_name"
                            v-model.trim="form.user_profile.buyer_name"
                            :rules="[rules.required, rules.lettersOnly]"
                            outlined
                            label="您的姓名"
                            placeholder="王小明"
                        ></v-text-field>
                        <!-- 電話 -->
                        <v-text-field
                            class="text_field"
                            name="buyer_phone"
                            v-model.trim="form.user_profile.buyer_phone"
                            :rules="[rules.required, rules.numbersOnly]"
                            maxlength="10"
                            outlined
                            label="您的電話"
                            placeholder="0912345678"
                        ></v-text-field>
                        <!-- 地址 -->
                        <v-text-field
                            class="text_field"
                            name="address"
                            v-model.trim="form.user_profile.address"
                            :rules="[rules.required]"
                            outlined
                            label="您的地址"
                            placeholder="OO市OO區OO路OO號..."
                        ></v-text-field>
                    </v-card-text>
                    <!-- 使用常用資料 -->
                    <v-card-subtitle>
                        <v-switch @click="autoFillUserProfile" v-model="autoFillProfile" inset label="填入我的個人資料"></v-switch>
                    </v-card-subtitle>
                    <v-divider></v-divider>
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
                <!-- 金額小計 -->
                <div class="subtotal text-right text-h6 font-weight-bold ma-4">
                    金額小計: <span class="red--text text-lighten-2">{{ subTotal }}</span> 
                </div>
                <v-divider></v-divider>
                <!-- 送出按鈕 -->
                <div class="text-right">
                    <v-btn large color="primary" class="create_order_btn ma-6"
                        @click="checkAndCreateOrder"
                        :disabled="!valid" 
                        :loading="loading"
                    >
                        <v-icon>fa-check fa-fw</v-icon>
                        <span>建立訂單</span>
                    </v-btn> 
                </div>
            </v-card>
        </v-form>  
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import inputRulesMixins from '~/mixins/inputRulesMixin'
import VCleaveInput from "vuetify-cleave";

export default {
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    mixins:[inputRulesMixins],
    components: {
        VCleaveInput, //* 以套件來驗證輸入的信用卡
    },
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
            //* 是否開啟信用卡表單
            creditCardFormDisabled: true,
            //* 自動填入資料 
            autoFillProfile: false,
            autoFillCreditCard: false,
            //* 表單輸入
            form: {
                //* 預設為現金付款
                payment_id: 1,
                //* 購買者資訊 
                user_profile: {
                    buyer_name: '',
                    buyer_phone: '',
                    address: ''
                },
                //* 信用卡相關欄位(有勾選刷卡付款後才需要填入)
                creditCard: {
                    type: 'unknown', // 預設
                    number: '',
                    holder_name: '',
                    expiration_month: '',
                    expiration_year: '',
                    cvv: '', 
                },  
            },
            creditCardIcon: 'fa-regular fa-credit-card',
            //* cleave.js(套件) 驗證所需的參數
            options: {
                creditCard: true,
                delimiter: '-',
                onCreditCardTypeChanged: (type) => {
                    this.form.creditCard.type = type //* 表單內 credit card 的 type
                    if(type == 'unknown') this.creditCardIcon = "fa-regular fa-credit-card"
                    if(type == 'visa') this.creditCardIcon = "fa-brands fa-cc-visa"
                    if(type == 'jcb') this.creditCardIcon = "fa-brands fa-cc-jcb"
                    if(type == 'diners') this.creditCardIcon = "fa-brands fa-cc-diners-club"
                    if(type == 'amex') this.creditCardIcon = "fa-brands fa-cc-amex"
                    if(type == 'mastercard') this.creditCardIcon = "fa-brands fa-cc-mastercard"
                    if(type == 'discover') this.creditCardIcon = "fa-brands fa-cc-discover"
                }
            },
            // 有效日期(月)
            months: [
                '01',
                '02',
                '03',
                '04',
                '05',
                '06',
                '07',
                '08',
                '09',
                '10',
                '11',
                '12',
            ],
            // 有效日期(年)
            years: [
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
            ],
            //* 彈出視窗
            dialog: false,
            selectCreditCardDialog: false,
            //* 表單驗證
            valid: false,
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
        autoFillUserProfile() {
            this.checkIfUserHasProfile()
            this.setUserProfileInputs()
        },
        //* 確認使用者是否有填入個人資料
        checkIfUserHasProfile() {
            if(!this.user.name || !this.user.phone || !this.user.address) {
                this.dialog = true // 跳出提醒視窗
                this.autoFill = false
            }
        },
        //* 確認使用者是否有填入信用卡
        checkIfUserHasCreditCard() {
            if(this.user.credit_cards.length) {
                return true
            }
            return false
        },
        //* 檢查使用者的付款方式 
        checkPaymentMethod(payment) {
            payment.title == "刷卡付款" ? this.creditCardFormDisabled = false : this.creditCardFormDisabled = true
        },
        //* 設定輸入欄位的值(購買者資訊)
        setUserProfileInputs() {
            if(this.autoFillProfile) {
                this.form.user_profile.buyer_name = this.user.name
                this.form.user_profile.buyer_phone = this.user.phone
                this.form.user_profile.address = this.user.address
            } else {
                this.form.user_profile.buyer_name = ''
                this.form.user_profile.buyer_phone = ''
                this.form.user_profile.address = ''
            } 
        },
        //* 切換自動輸入欄位功能 
        fillCreditCardInfo() {
            if(this.autoFillCreditCard) {
                this.selectCreditCardDialog = true
                this.setCurrentSelectedCreditCardInputs()
            } else {
                this.selectCreditCardDialog = false
                this.form.creditCard.type = 'unknown'
                this.form.creditCard.number = ''
                this.form.creditCard.holder_name = ''
                this.form.creditCard.expiration_month = ''
                this.form.creditCard.expiration_year = ''
                this.form.creditCard.cvv = ''
            }
        },
        //* 設定輸入欄位的值(信用卡) 預設為第一張
        setCurrentSelectedCreditCardInputs(index = 0) {
            if(this.autoFillCreditCard && this.checkIfUserHasCreditCard()) {
                this.form.creditCard.type = this.user.credit_cards[index].card_type
                this.form.creditCard.number = this.user.credit_cards[index].card_number
                this.form.creditCard.holder_name = this.user.credit_cards[index].card_holder
                this.form.creditCard.expiration_month = this.user.credit_cards[index].card_expiration_date.substring(0, 2)
                this.form.creditCard.expiration_year = this.user.credit_cards[index].card_expiration_date.substring(3, 5)
                this.form.creditCard.cvv = this.user.credit_cards[index].card_CVV
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
// table 的 style 在 main.css 
.checkout_wrapper {
    max-width: 50%;
}
.text_field {
    width: 350px;
}
@media (max-width: 1280px) {
    .checkout_wrapper {
        max-width: 75%;
    }
}
@media (max-width: 768px) {
    .checkout_wrapper {
        max-width: 100%;
    }
}
</style>