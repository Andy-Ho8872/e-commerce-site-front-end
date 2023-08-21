<template>
    <v-container>
        <!-- 已登入 -->
        <v-card class="pa-4" rounded="lg">
            <!-- 用戶編號 -->
            <v-card-subtitle class="font-weight-bold">
                用戶編號:
                <span class="black--text">
                    {{ user.id }}
                </span>
            </v-card-subtitle>
            <!-- 用戶帳號 -->
            <v-card-subtitle class="font-weight-bold">
                用戶帳號:
                <span class="black--text">
                    {{ user.email }}
                </span>
            </v-card-subtitle>
            <!-- 加入時間 -->
            <v-card-subtitle class="font-weight-bold">
                加入時間:
                <span class="black--text">
                    {{ $moment(user.created_at).format('LL') }}
                </span>
                <!-- Relative Time -->
                <span class="gray--text">
                    ({{ $moment(user.created_at).fromNow() }})
                </span>
            </v-card-subtitle>
            <!-- 個人檔案 -->
            <v-divider class="my-6"></v-divider>
            <v-card-subtitle class="font-weight-bold">
                個人檔案:  
                <ul class="user_profile">
                    <li>姓名: {{ user.name || defaultProfileText }}</li>
                    <li>電話: {{ user.phone || defaultProfileText }}</li>
                    <li>地址: {{ user.address || defaultProfileText }}</li>
                </ul>
                <!-- 更新檔案彈出視窗 -->
                <v-dialog v-model="updateProfileDialog" max-width="600px">
                    <v-card>
                        <v-form ref="form" v-model="saveBtnValid">
                        <v-card-title class="font-weight-bold mb-4">新增 / 變更檔案</v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-text-field 
                                        v-model.trim="profile.name"
                                        placeholder="王小明"
                                        :rules="[rules.lettersOnly, rules.required]"
                                        outlined
                                        prepend-inner-icon="fa-id-badge" 
                                        label="姓名" 
                                        name="user_name" 
                                        :value="user.name || null">
                                    </v-text-field>
                                    <v-text-field 
                                        v-model.trim="profile.phone"
                                        placeholder="0912345678"
                                        :rules="[rules.required, rules.numbersOnly]"
                                        maxlength="10"
                                        counter="10"
                                        outlined 
                                        prepend-inner-icon="fa-phone"
                                        label="電話" 
                                        name="user_phone" 
                                        :value="user.phone || null">
                                    </v-text-field>
                                    <v-text-field 
                                        v-model.trim="profile.address"
                                        placeholder="OO市OO區OO路..."
                                        :rules="[rules.required]"
                                        outlined 
                                        prepend-inner-icon="fa-map-marker-alt"
                                        label="地址" 
                                        name="user_address" 
                                        :value="user.address || null">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        </v-form>
                        <!-- 按鈕操作 -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="updateProfileDialog = false" text color="error">取消</v-btn>
                            <v-btn @click="updateProfileAndSetDialog" color="primary" :disabled="!saveBtnValid" :loading="loading">儲存</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- 清空檔案彈出視窗 -->
                <v-dialog v-model="deleteProfileDialog" max-width="600px">
                    <v-card>
                        <v-card-title class="font-weight-bold mb-4">清空檔案</v-card-title>
                        <v-card-text>即將清空您的個人檔案，是否繼續執行?</v-card-text>
                        <!-- 按鈕操作 -->
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="deleteProfileDialog = false" text color="error">取消</v-btn>
                            <v-btn @click="clearProfileAndSetDialog" color="primary" :loading="loading">確認</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- 按鈕操作 -->
                <v-card-actions>
                    <v-btn color="error" outlined :disabled="!deleteBtnValid" @click="deleteProfileDialog = true">清空檔案</v-btn>
                    <v-btn color="primary" @click="[updateProfileDialog = true, initUserProfileInputs()]">變更檔案</v-btn>
                </v-card-actions>
            </v-card-subtitle>
            <!-- 付款方式(信用卡) -->
            <v-card-subtitle class="font-weight-bold">
                信用卡: 
                <v-card class="user_credit_cards pa-4 my-6 white--text" 
                    color="blue darken-1"
                    rounded="lg" 
                    max-width="250"  
                    v-for="(creditCard) in user.credit_cards" :key="'creditCard' + creditCard.id">
                    <div class="credit_card_icon d-flex">
                        <!-- 刪除信用卡按鈕 -->
                        <v-btn class="ma-auto" color="white" icon @click="openAndSetDeleteCreditCardDialog(creditCard)">
                            <v-icon>fa-xmark</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <!-- 性用卡型號 -->
                        <v-icon color="white">fa-brands fa-cc-{{ creditCard.card_type }}</v-icon>
                    </div>
                    <div class="credit_card_number py-4">{{ formattedCreditCardNumber(creditCard.masked_card_number) }}</div>
                    <div class="credit_card_bottom d-flex justify-space-between align-center">
                        <div class="credit_holder_name">
                            <div class="hint_text caption">持有人</div>
                            <div class="card_holder">{{ creditCard.card_holder }}</div>
                        </div>
                        <div class="credit_expiration_date">
                            <div class="hint_text caption">到期日</div>
                            <div class="card_holder">{{ creditCard.card_expiration_date }}</div>
                        </div>
                    </div>
                </v-card>
                <!-- 刪除信用卡彈出視窗 -->
                <v-dialog v-model="deleteCreditCardDialog" max-width="600">
                    <v-card>
                        <v-card-title class="font-weight-bold mb-4">刪除信用卡</v-card-title>
                        <v-card-text>您即將刪除這張信用卡，卡號: {{ formattedCreditCardNumber(currentSelectedCard.masked_card_number) }}。</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error" text @click="deleteCreditCardDialog = false">取消</v-btn>
                            <v-btn color="primary" :loading="loading" @click="deleteUserCreditCard(currentSelectedCard.id)">確認</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- 新增信用卡按鈕 -->
                <v-card-actions>
                    <v-btn color="primary" @click="initCreditCardForm()">新增信用卡</v-btn>
                </v-card-actions>   
            </v-card-subtitle>
            <!-- 填寫表單 -->
            <v-dialog v-model="storeCreditCardDialog" max-width="600">
                <v-card>
                    <v-card-title class="font-weight-bold mb-4">新增信用卡</v-card-title>
                        <v-card-text>
                        <v-form v-model="creditCardValid">
                            <VCleaveInput
                                v-model.trim="creditCard.number"
                                :options="options"
                                :rules="[rules.required]"
                                :append-icon="creditCardIcon"
                                outlined
                                label="卡號"
                            />
                            <v-text-field label="持有人" outlined v-model.trim="creditCard.holder_name" :rules="[rules.required , rules.lettersOnly]"></v-text-field>
                            <v-select label="到期日(月)" outlined :items="months" v-model="creditCard.expiration_month" :rules="[rules.required]"></v-select>
                            <v-select label="到期日(年)" outlined :items="years" v-model="creditCard.expiration_year" :rules="[rules.required]"></v-select>
                            <v-text-field label="安全碼(CVV)" outlined maxlength="3" counter="3" v-model="creditCard.cvv" :rules="[rules.required, rules.numbersOnly]"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="storeCreditCardDialog = false">取消</v-btn>
                        <v-btn color="primary" :loading="loading" :disabled="!creditCardValid" @click="storeUserCreditCard">新增</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 登出 -->
            <v-divider class="my-6"></v-divider>
            <v-card-actions class="btn_container ma-4">
                <v-btn dark color="red lighten-1" @click="logout" :loading="loading">
                    <v-icon>fa-share fa-fw</v-icon>
                    <span>登出</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import userMixin from '~/mixins/userMixin'
import inputRulesMixins from '~/mixins/inputRulesMixin'
import { mapActions, mapGetters } from 'vuex'
import VCleaveInput from "vuetify-cleave";

export default {
    components: {
        VCleaveInput //* 以套件來驗證輸入的信用卡
    },
    head() {
        return {
            title: '個人資料',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: '使用者的帳戶資料'
                }
            ]
        }
    },
    middleware: 'authenticated', //* 要先通過驗證才能訪問此頁面
    mixins: [userMixin, inputRulesMixins],
    data() {
        return {
            // 彈出視窗
            updateProfileDialog: false,
            deleteProfileDialog: false,
            storeCreditCardDialog: false,
            deleteCreditCardDialog: false,
            // 按鈕是否禁用
            saveBtnValid: true,
            deleteBtnValid: false,
            creditCardValid: false,
            // 個人資料預設文字
            defaultProfileText: "尚未填寫",
            // 個人資料欄位
            profile: {
                name: '',
                phone: '',
                address: ''
            },
            //* 信用卡相關欄位 
            creditCard: {
                type: 'known', // 預設
                number: '',
                holder_name: '',
                expiration_month: '',
                expiration_year: '',
                cvv: '',
            },
            creditCardIcon: 'fa-regular fa-credit-card',
            //* cleave.js(套件) 驗證所需的參數
            options: {
                creditCard: true,
                delimiter: '-',
                onCreditCardTypeChanged: (type) => {
                    this.creditCard.type = type //* 表單內 credit card 的 type
                    if(type == 'unknown') this.creditCardIcon = "fa-regular fa-credit-card"
                    if(type == 'visa') this.creditCardIcon = "fa-brands fa-cc-visa"
                    if(type == 'jcb') this.creditCardIcon = "fa-brands fa-cc-jcb"
                    if(type == 'diners') this.creditCardIcon = "fa-brands fa-cc-diners-club"
                    if(type == 'amex') this.creditCardIcon = "fa-brands fa-cc-amex"
                    if(type == 'mastercard') this.creditCardIcon = "fa-brands fa-cc-mastercard"
                    if(type == 'discover') this.creditCardIcon = "fa-brands fa-cc-discover"
                }
            },
            currentSelectedCard: {
                id: '',
                masked_card_number: ''
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
            ]
        }
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
            updateUserProfile: 'auth/updateUserProfile',
            clearUserProfile: 'auth/clearUserProfile',
            addCreditCard: 'auth/addCreditCard',
            deleteCreditCard: 'auth/deleteCreditCard'
        }),
        //* 初始化使用者的輸入欄位預設值
        initUserProfileInputs() {
            if(this.user) {
                //* 若使用者沒有設定，則為 null 
                this.profile = {
                    name: this.user.name || null,
                    phone: this.user.phone || null,
                    address: this.user.address || null,
                }
            }
            return null
        },
        async updateProfileAndSetDialog() {
            await this.updateUserProfile(this.profile)
            this.checkIfProfileValueExists()
            //* 關閉 dialog
            this.updateProfileDialog = false
        },
        async clearProfileAndSetDialog() {
            await this.clearUserProfile()
            await this.initUserProfileInputs()
            this.checkIfProfileValueExists()
            this.deleteProfileDialog = false
        },
        checkIfProfileValueExists() {
            //* 欄位至少要有一個值，否則禁用按鈕 
            if(this.user.name || this.user.phone || this.user.address) {
                this.saveBtnValid = true
            } 
            if(this.profile.name || this.profile.phone || this.profile.address) {
                this.saveBtnValid = true
                this.deleteBtnValid = true
            }
            else {
                this.saveBtnValid = false
                this.deleteBtnValid = false
            }
        },
        openAndSetDeleteCreditCardDialog(creditCard) {
            this.deleteCreditCardDialog = true
            this.currentSelectedCard = {
                id: creditCard.id,
                masked_card_number: creditCard.masked_card_number
            }
        },
        async storeUserCreditCard() {
            await this.addCreditCard(this.creditCard)
            this.storeCreditCardDialog = false
        },
        formattedCreditCardNumber(text) {
            let formattedText = text.split('').join('')
            if (formattedText.length > 0) {
                return formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
        },
        initCreditCardForm() {
            this.storeCreditCardDialog = true
            this.creditCard = {
                type: 'unknown', // 預設
                number: '',
                holder_name: '',
                expiration_month: '',
                expiration_year: '',
                cvv: ''
            }
        },
        async deleteUserCreditCard(currentSelectedCard_id) {
            await this.deleteCreditCard(currentSelectedCard_id)
            this.deleteCreditCardDialog = false
        }
    },
    computed: {
        ...mapGetters({
            loading: 'auth/getLoading'
        })
    },
    mounted() {
        this.initUserProfileInputs()
        this.checkIfProfileValueExists()
    }
}
</script>

<style lang="scss" scoped>
li {
    list-style: none;
    margin: 12px 0;
}
    .btn_container {
        text-align: start;
    }
    @media (max-width: 768px) {
        .btn_container {
            text-align: center;
        }
    }
</style>
