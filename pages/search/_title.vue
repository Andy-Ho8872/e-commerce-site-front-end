<template>
    <v-container>
        <!-- 搜尋成功 -->
        <div v-if="result.length">
            <h2 class="text-center">
                關於
                <span class="blue--text lighten-5">
                    "{{ this.$route.params.title }}"
                </span>
                的搜尋結果
            </h2>
            <v-row>
                <v-col
                    v-for="product in result"
                    :key="product.id"
                    align-self="center"
                    cols="12"
                    lg="2"
                    md="3"
                    sm="4"
                >
                    <!-- 點擊後導覽至該商品 -->
                    <nuxt-link :to="{ name: 'products-id', params: { id: product.id }}">
                        <v-card color="grey lighten-5" width="200" height="400" class="mx-auto my-2 rounded-xl">
                            <!-- 圖片 -->
                            <v-img
                                :src="product.imgUrl"
                                :lazy-src="product.imgUrl"
                            ></v-img>
                            <!-- 名稱 -->
                                <!-- 有縮減 -->
                            <v-card-title v-if="product.title.substring(0, 13).length == 13"
                                class="subtitle-1 font-weight-bold my-1"
                            >
                                {{ product.title.substring(0, 13) }} ...
                            </v-card-title>
                                <!-- 沒縮減 -->
                            <v-card-title v-else
                                class="subtitle-1 font-weight-bold my-1"
                            >
                                {{ product.title }}
                            </v-card-title>
                            <!-- 敘述 (縮減後)-->
                            <v-card-subtitle class="text-truncate">
                                {{ product.description }}
                            </v-card-subtitle>
                            <!-- 標籤 -->
                                <v-chip-group class="ml-2">
                                    <v-chip v-for="tag in product.tags" :key="tag.id" color="primary">
                                        <!-- 判斷標籤的名稱是否相符，因為陣列從 0 起算，所以要減 1 -->
                                        <!-- 圖案 -->
                                        <v-icon size="medium" v-if="tag.title == productTags[tag.id - 1].title">
                                            {{ productTags[tag.id - 1].icon }}
                                        </v-icon>
                                        <!-- 名稱 -->
                                        <span>{{ tag.title }}</span>
                                    </v-chip>
                                </v-chip-group>  
                            <!-- 價格區域 -->
                            <div class="price_zone">
                                <!-- 原價格 -->
                                <v-card-text
                                    :class="[product.discount_rate == 1 ? '' : 'discounted']"
                                >
                                    $ {{ Math.floor(product.unit_price) }}
                                </v-card-text>
                                <!-- 折扣後價格 -->
                                <v-card-text
                                    v-if="product.discount_rate != 1"
                                    class="discounted_price blue--text text--darken-2"
                                >
                                    $ {{ Math.floor(product.unit_price * product.discount_rate) }}
                                </v-card-text>
                            </div>
                        </v-card>
                    </nuxt-link>
                </v-col>
            </v-row>
        </div>
        <!-- 搜尋失敗 -->
        <v-row v-else>
            <h2 class="ma-auto">
                找不到關於
                <span class="blue--text lighten-5">
                    "{{ this.$route.params.title }}"
                </span>
                的搜尋結果
            </h2>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            // 產品標籤
            productTags: [
                {
                    title: '3C產品',
                    icon: 'fa-mobile-alt fa-fw'
                },
                {
                    title: '服裝',
                    icon: 'fa-tshirt fa-fw'
                },
                {
                    title: '背包',
                    icon: 'fa-shopping-bag fa-fw'
                },
                {
                    title: '折扣',
                    icon: 'fa-dollar-sign fa-fw'
                }
            ]
        }
    },
    // 此處的 search function 在 Components/Header.vue 裡
    computed: {
        ...mapGetters({
            // 搜尋結果
            result: 'search/getResult',
        }),
    },
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
// 價格區域--------------------------Start
.price_zone {
    position: relative;
}
.discounted {
    text-decoration: line-through;
}
// 折扣後的價格
.discounted_price {
    position: absolute;
    top: 1rem;
    left: 4rem;
    width: fit-content;
    transform: rotate(-5deg);
    font-size: 1.2rem;
}
// 價格區域--------------------------End
</style>
