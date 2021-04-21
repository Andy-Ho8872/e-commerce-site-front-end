<template>
    <v-container>
        <LoadingCircle v-if="!user"/>
        <v-card class="pa-4" rounded="lg" v-else>
            <div class="d-flex justify-center align-center text-center text-h6 font-weight-bold">
                歡迎回來 {{ user.email }}
            </div>
            <!-- tabs -->
            <v-tabs centered v-model="tab">
                <v-tab v-for="(item, index) in items" :key="index">
                    <v-icon>{{ item.icon }}</v-icon>
                    <span>{{ item.title }}</span>
                </v-tab>
            </v-tabs>
            <!-- 分隔線 -->
            <v-divider class="mt-6"></v-divider>
            <!-- tab items -->
            <v-tabs-items v-model="tab">
                <!-- 個人資料 -->
                <v-tab-item>
                    <v-card flat>
                        <!-- 用戶編號 -->
                        <v-card-subtitle>
                            用戶編號: 
                            <span class="font-weight-bold black--text">
                                {{ user.id }}
                            </span>
                        </v-card-subtitle>
                        <!-- 用戶帳號 -->
                        <v-card-subtitle>
                            用戶帳號: 
                            <span class="font-weight-bold black--text">
                                {{ user.email }}
                            </span>
                        </v-card-subtitle>
                        <!-- 加入時間 -->
                        <v-card-subtitle>
                            加入時間: 
                            <span class="font-weight-bold black--text">
                                {{ user.created_at }}
                            </span>
                        </v-card-subtitle>
                    </v-card>
                </v-tab-item>
                <!-- 我的訂單 -->
                <v-tab-item>
                    <v-card flat v-if="! userOrder.length" class="ma-4 pa-4">
                        <h2>您目前沒有任何訂單。</h2>
                    </v-card>
                    <v-card flat v-for="order in userOrder" :key="order.id">
                        <nuxt-link :to="{ name: 'order-details-id', params: { id: order.id }}">
                            <!-- 訂單編號 -->
                            <v-card-subtitle>
                                訂單編號: 
                                <span class="font-weight-bold black--text">
                                    {{ order.id }}
                                </span>
                            </v-card-subtitle>
                            <!-- 送達地址 -->
                            <v-card-subtitle>
                                送達地址: 
                                <span class="font-weight-bold black--text">
                                    {{ order.address }}
                                </span>
                            </v-card-subtitle>
                            <!-- 付款狀態 -->
                            <v-card-subtitle>
                                貨物狀態: 
                                <span class="font-weight-bold black--text">
                                    {{ order.status_id }}
                                </span>
                            </v-card-subtitle>
                            <!-- 訂購時間 -->
                            <v-card-subtitle>
                                訂購時間: 
                                <span class="font-weight-bold black--text">
                                    {{ order.created_at.substring(0, 10) }}
                                </span>
                            </v-card-subtitle>
                            <!-- 分隔線 -->
                            <v-divider></v-divider>
                        </nuxt-link>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            tab: null,
            items: [
                {
                    icon: 'fa-address-book fa-fw',
                    title: '個人資料',
                },
                {
                    icon: 'fa-list-alt fa-fw',
                    title: '我的訂單',
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            // 使用者的資料
            user: 'auth/getUserInfo',
            // 訂單資料
            userOrder: 'order/getAllOrders'
        }),
    },
}
</script>