<template>
    <v-dialog v-model="dialog" persistent max-width="290" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" dark v-bind="attrs" v-on="on">
                <v-icon>fa-trash-alt fa-fw</v-icon>
                <span>刪除</span>
            </v-btn>
        </template>
        <v-card>
            <!-- 卡片標題 -->
            <v-card-title class="headline">
                刪除這筆訂單?
            </v-card-title>
            <!-- 卡片內容 -->
            <v-card-text>您確定要刪除訂單編號 - <span class="font-weight-bold">{{ order.id }}</span> 嗎?</v-card-text>
            <!-- 按鈕群組 -->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                    <v-icon>fa-long-arrow-alt-left fa-fw</v-icon>
                    <span class="font-weight-bold">返回</span>
                </v-btn>
                <v-btn color="red darken-1" text @click="[dialog = false, deleteSingleOrder(order.id)]"
                    class="ma-4 pa-4 white--text" 
                    :loading="loading" 
                    :disabled="loading"
                    >
                    <v-icon>fa-trash-alt fa-fw</v-icon>
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
