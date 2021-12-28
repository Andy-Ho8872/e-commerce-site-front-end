<template>
    <v-dialog v-model="dialog" persistent max-width="600" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="error" outlined v-bind="attrs" v-on="on">
                <span>刪除</span>
            </v-btn>
        </template>
        <v-card>
            <!-- 卡片標題 -->
            <v-card-title class="headline font-weight-bold">
                刪除這筆訂單?
            </v-card-title>
            <!-- 卡片內容 -->
            <v-card-subtitle class="order_id font-weight-bold mt-4">您確定要刪除訂單編號 <span class="blue--text">#{{ order.id }}</span> 嗎?</v-card-subtitle>
            <v-card-subtitle>
                <v-divider></v-divider>
                <v-subheader>訂單商品內容</v-subheader>
                <!-- 商品內容 -->
                    <v-list>
                        <v-list-item v-for="item in order.items" :key="'item' + item.pivot.product_id">
                            <!-- 圖片 -->
                            <v-list-item-avatar>
                                <v-img :src="item.imgUrl" :alt="item.title"></v-img>
                            </v-list-item-avatar>
                            <!-- 名稱 -->
                            <v-list-item-content>
                                {{ item.title }}
                            </v-list-item-content>
                            <!-- 數量 -->
                            <div>x {{ item.pivot.product_quantity }}</div>
                        </v-list-item>
                    </v-list>
            </v-card-subtitle>
            <!-- 按鈕群組 -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="dialog = false">
                    <span class="font-weight-bold">返回</span>
                </v-btn>
                <v-btn color="red darken-1" outlined @click="[dialog = false, deleteSingleOrder(order.id)]"
                    class="delete_btn ma-4 pa-4 white--text" 
                    :loading="loading" 
                    :disabled="loading"
                    >
                    <span class="font-weight-bold">刪除</span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import orderMixin from '~/mixins/orderMixin'

export default {
    mixins:[orderMixin],
    props: {
        order: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            dialog: false
        }
    }
}
</script>
