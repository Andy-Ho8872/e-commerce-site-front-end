<template>
    <v-container>
        <v-card class="pa-4" rounded="lg" >
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
    </v-container>
</template>

<script>
import userMixin from '~/mixins/userMixin'

export default {
    mixins: [userMixin]
}
</script>
