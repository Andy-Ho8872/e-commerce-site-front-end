<template>
    <v-container class="my-auto">
        <LoadingCircle v-if="!product"/>
        <!-- 商品 -->
        <v-row v-if="product">
            <v-col>
                <v-card
                    class="d-flex flex-wrap justify-space-between rounded-lg ma-auto"
                    :width="width"
                    :elevation="elevation"
                    :color="color"
                >
                    <!-- 圖片 -->
                    <div class="half">
                        <v-img :src="product.imgUrl" :alt="product.title" class="rounded-lg ma-6"></v-img>
                    </div>
                    <!-- 詳細資訊 -->
                    <div class="half">
                        <!-- 名稱 -->
                        <v-card-title class="product_title justify-center font-weight-bold">
                            {{ product.title }}
                        </v-card-title>
                        <!-- 價格 -->
                        <v-card-subtitle>
                            <!-- 評級 -->
                            <Ratings :product="product" size="20" class="my-4"/>
                        </v-card-subtitle>
                        <v-card-text class="title">
                            <v-sheet rounded="lg" class="pa-2">
                                <!-- 原價 -->
                                <span class="product_original_price" :class="[product.discount_rate == 1 ? '' : 'discounted']">
                                    $ {{ Math.floor(product.unit_price) }}
                                </span>
                                <!-- 折價後 -->
                                <span class="product_discounted_price mx-2 blue--text text-h5" v-if="product.discount_rate != 1">
                                    $ {{ Math.floor(product.unit_price * product.discount_rate) }}
                                </span>
                                <!-- 折扣標籤 -->
                                <v-badge tile :content="`${product.discount_rate * 10} 折`" v-if="product.discount_rate != 1"></v-badge>
                            </v-sheet>
                        </v-card-text>
                        <v-card-text>
                            <!-- 標籤 -->
                            <Tags :product="product"/>
                        </v-card-text>
                        <!-- 選擇規格 -->
                        <v-card-text v-if="product.variations.length">
                            <div v-for="(variation, variationIndex) in product.variations" :key="variation.id" class="d-flex align-top">
                                <div class="flex_text_title font-weight-bold pt-2">{{ variation.title }}</div>
                                <v-chip-group column class="ml-4">
                                    <v-chip filter outlined small label color="indigo" 
                                        v-for="(option, index) in variation.options" 
                                        :key="`option_${index}`"
                                        :value="option"
                                        @click="setOptionValues(option, variationIndex)">
                                        {{ option }}
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </v-card-text>
                        <!-- 輸入數量 -->
                        <v-card-text>
                            <div class="d-flex align-center">
                                <div class="flex_text_title font-weight-bold">數量</div>
                                <div class="input_container ml-4">
                                    <!-- 減少按鈕 -->
                                    <v-btn
                                        class="decrement_btn"
                                        @click="changeCount(-1)"
                                        fab
                                        x-small
                                        depressed
                                        outlined
                                        color="error"
                                    >
                                        <v-icon>fa-minus fa-fw</v-icon>
                                    </v-btn>
                                    <!-- 輸入數量 -->
                                    <input
                                        class="input_field lighten-2 text-center"
                                        name="product_quantity"
                                        type="number"
                                        autocomplete="off"
                                        @blur="validateInput(productPayload.quantity)"
                                        v-model.number="productPayload.quantity"
                                    />
                                    <!-- 增加按鈕 -->
                                    <v-btn
                                        class="increment_btn"
                                        @click="changeCount(1)"
                                        fab
                                        x-small
                                        depressed
                                        outlined
                                        color="indigo"
                                    >
                                        <v-icon>fa-plus fa-fw</v-icon>
                                    </v-btn>
                                </div>
                                <div>還剩 {{ product.stock_quantity }} 個</div>
                            </div>
                        </v-card-text>
                        <!-- 購買按鈕-->
                        <div class="purchase_btn text-center">
                            <v-btn
                                @click="addItemToCart(productPayload)"
                                class="ma-3 rounded-lg"
                                tile
                                x-large
                                depressed
                                color="primary"
                            >
                                <span>放入購物車</span>
                            </v-btn>
                        </div>
                    </div>
                </v-card>
                <!-- 商品詳情 -->
                <v-card :width="width" :elevation="elevation" :color="color" class="rounded-lg ma-auto my-6">
                    <v-card-title class="font-weight-bold">商品詳情</v-card-title>
                    <!-- 庫存數量 -->
                    <v-card-text class="product_stock_quantity text-subtitle-1">
                        庫存數量: {{ product.stock_quantity }}
                    </v-card-text>
                    <!-- 上架日期 -->
                    <v-card-text class="product_created_at text-subtitle-1">
                        上架日期: 
                        {{ $moment(product.created_at).format('ll') }} 
                        ({{ $moment(product.created_at).fromNow() }})
                    </v-card-text>
                    <!-- 更動日期 -->
                    <v-card-text class="product_updated_at text-subtitle-1">
                        更動日期: 
                        {{ $moment(product.updated_at).format('ll') }} 
                        ({{ $moment(product.updated_at).fromNow() }})
                    </v-card-text>
                </v-card>
                <!-- 商品資訊 -->
                <v-card :width="width" :elevation="elevation" :color="color" class="rounded-lg ma-auto my-6">
                    <v-card-title class="font-weight-bold">商品資訊</v-card-title>
                    <v-card-text class="product_description text-subtitle-1 text-justify">
                        {{ product.description }}
                    </v-card-text>
                </v-card>
                <!-- 猜你喜歡 -->
                <div class="guess_you_like_container my-8 mx-auto" :style="{ 'max-width': width + 'px' }">
                    <Banner text="猜你喜歡"/>
                    <ProductGrid :data="youMayLikeProducts" cols="6" lg="3"/>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    head() {
        if (this.product) {
            return {
                title: this.product.title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: '優質的購物網站，全網最便宜都在這。'
                    }
                ]
            }
        }
    },
    validate({ params }) {
        return /^\d+$/.test(params.id)
    },
    data() {
        return {
            //* 商品卡片 style
            width: 900,
            elevation: 4,
            color: 'grey lighten-4',
            //* 暫存資料
            productPayload: {
                id: this.$route.params.id,
                quantity: 1, //* 產品當前數量 預設 1 個
                optionValues: [] //* 產品規格
            },
        }
    },
    computed: {
        ...mapGetters({
            products: 'product/getViewedProducts',
            youMayLikeProducts: 'product/getYouMayLikeProducts'
        }),
        product() {
            return this.products.find(product => product.id == this.$route.params.id)
        }
    },
    methods: {
        ...mapActions({
            setGlobalMessage: 'globalMessage/setFlashMessage',
            //* 新增至購物車(包含數量)
            addToCartWithQuantity: 'cart/addToCartWithQuantity',
            //* 撈取商品 
            fetchSingleProduct: 'product/fetchSingleProduct',
            //* 猜你喜歡商品 
            fetchYouMayLikeProducts: 'product/fetchYouMayLikeProducts'
        }),
        //* 點擊按鈕變更購買數量
        changeCount(value) {
            this.productPayload.quantity += value
            //* 當前購買數量
            const inputVal = this.productPayload.quantity
            //* 數量驗證 
            switch (true) {
                case inputVal < 1: //* 數字將不會小於 1
                    this.productPayload.quantity = 1
                    break;
                case inputVal > this.product.stock_quantity: //* 數字將不大於 庫存
                    this.productPayload.quantity = this.product.stock_quantity
                    break;
            }
        },
        //* 選擇產品規格
        setOptionValues(option = 'null', variationIndex) {
            const duplicated = this.productPayload.optionValues.includes(option)
            if(!duplicated) {
                this.productPayload.optionValues[variationIndex] = option
            } 
        },
        addItemToCart(payload) {
            let optionValueLength = this.productPayload.optionValues.length
            //* 如果有規格需選擇
            if (this.product.variations.length !== 0) {
                if(optionValueLength !== this.product.variations.length) {
                    const message = {
                        type: 'error',
                        text: '請點選商品規格',
                    }
                    this.setGlobalMessage(message)
                } else {
                    this.addToCartWithQuantity(payload)
                }
            } else {
                this.addToCartWithQuantity(payload)
            }
        },
        //* 購買數量輸入驗證
        validateInput(value) {
            //* 只接受數字且第一個數不可為 0
            const pattern = /^[1-9]\d{0,}/gi
            //* 正則表達式的結果
            const valid = pattern.test(value)
            //* 使用者輸入的值
            const inputVal = this.productPayload.quantity
            switch (true) {
                case !valid || inputVal < 1:
                    this.productPayload.quantity = 1
                    break;
                case inputVal > this.product.stock_quantity:
                    this.productPayload.quantity = this.product.stock_quantity
            }
        },
        resetProductPayload() {
            this.productPayload = {
                id: this.$route.params.id,
                quantity: 1, //* 產品當前數量 預設 1 個
                optionValues: [] //* 產品規格
            }
        },
    },
    async created() {
        await this.fetchSingleProduct(this.$route.params.id) 
        // 若是商品有包含標籤，則撈取猜你喜歡的商品
        if(this.product.tags.length != 0) {
            this.fetchYouMayLikeProducts(this.product.tags[0].id)
        }
    },
    mounted() {
        this.resetProductPayload()
    }
}
</script>

<style lang="scss" scoped>
.half {
    width: 50%;
}
.discounted {
    text-decoration: line-through;
}
.flex_text_title {
    width: 42px;
}
//* 購買按鈕
.purchase_btn span {
    width: 6rem;
}
.input_container {
    width: 180px;
}
input {
    width: 20%;
    padding: 2px 0;
    outline: none;
}
//? RWD
@media (max-width: 768px) {
    .half {
        width: 100%;
    }
}
</style>
