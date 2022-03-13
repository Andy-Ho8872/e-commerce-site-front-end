<template>
    <v-card width="300" class="card_item_preview">
        <v-list v-if="items.length">
            <v-subheader>購物車內的商品</v-subheader>
            <v-divider></v-divider>
            <v-list-item v-for="item in slicedItems" :key="item.id">
                <v-list-item-avatar>
                    <v-img :src="item.imgUrl" :alt="item.title"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="text-truncate">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action class="blue--text">${{ Math.floor(item.unit_price * item.discount_rate) }}</v-list-item-action>
            </v-list-item>
        </v-list>
        <template v-else>
            <v-img :src="require('~/static/cart/EmptyCart.svg')" alt="EmptyCart.svg"
                class="mx-auto my-4" 
                max-width="200"
                max-height="200">
            </v-img>
            <div class="font-weight-bold text-center text-body-1 my-4">購物車是空的</div>
        </template>
        <v-subheader v-if="restItemLength">還有 {{ restItemLength }} 件商品</v-subheader>
    </v-card>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            require: true
        }
    },
    computed: {
        //* 最多顯示 5 個 
        slicedItems() {
            return this.items.slice(0, 5)
        },
        //* 超過 5 個後的剩餘數量
        restItemLength() {
            if(this.items.length > this.slicedItems.length) {
                return this.items.length - this.slicedItems.length
            }
        }
    }
}
</script>



<style lang="scss" scoped>
.card_item_preview {
    top: 90%;
}
</style>