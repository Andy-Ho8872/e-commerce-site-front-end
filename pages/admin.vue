<template>
<div class="custom_container d-flex">
    <v-card width="350">
        <v-list>
            <v-list-group :value="true" prepend-icon="mdi-account-circle">
                <template v-slot:activator>
                    <v-list-item-title>商品管理</v-list-item-title>
                </template>
                <v-list-group :value="true" no-action sub-group>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>商品</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in productLinks"
                        :key="'productLink' + item.id"
                        nuxt
                        :to="item.to"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
                <v-list-group no-action sub-group>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>標籤</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in tagLinks"
                        :key="'tagLink' + item.id"
                        nuxt
                        :to="item.to"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
        </v-list>
    </v-card>
    <nuxt-child/>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    middleware: ['authenticated', 'admin'], //* 要先通過驗證才能訪問此頁面
    data() {
        return {
            group: null,
            productLinks: [
                {
                    id: 1,
                    title: '所有',
                    icon: 'fa-box',
                    to: { name: 'admin-product' },
                },
            ],
            tagLinks: [
                {
                    id: 3,
                    title: '所有',
                    icon: 'fa-box',
                    to: { name: 'admin-tag-all' },
                },
            ]
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/getUserInfo',
        }),
    },
}
</script>

<style></style>
