<template>
    <v-container>
        <!-- action btn -->
        <v-btn color="primary" @click="[dialogToCreate = true, resetFormInput()]">新增商品標籤</v-btn>
        <!-- table -->
        <table class="elevation-2 mt-16">
            <!-- header -->
            <thead>
                <tr>
                    <th class="text-left">
                        序號
                    </th>
                    <th class="text-left">
                        名稱
                    </th>
                    <th class="text-right pr-16">
                        操作
                    </th>
                </tr>
            </thead>
            <!-- content -->
            <tbody>
                <tr v-for="(tag, index) in productTags" :key="tag.id">
                    <td class="text-left px-4" data-title="序號">
                        <span>#{{ index + 1 }}</span>
                    </td>
                    <td class="text-left px-4" data-title="名稱">
                        <span>{{ tag.title }}</span>
                    </td>
                    <td class="text-right px-4" data-title="操作">
                        <div class="action_btns">
                            <v-btn color="error" outlined  @click="[dialogToDelete = true, setFormInput(index)]">刪除</v-btn>
                            <v-btn color="primary" @click="[dialogToUpdate = true, setFormInput(index)]">編輯</v-btn>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 彈出視窗(新增) -->
        <v-dialog v-model="dialogToCreate" max-width="600">
            <v-card>
                <v-card-title class="font-weight-bold">新增商品標籤</v-card-title>
                <v-form v-model="createValid">
                    <v-card-subtitle>
                        <v-text-field label="標籤名稱" :rules="[rules.required]" v-model="formInput.tag_title"></v-text-field>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="dialogToCreate = false">取消</v-btn>
                        <v-btn color="primary" :disabled="!createValid" @click="[storeProductTag({ tag_title: formInput.tag_title}) ,resetFormInput(), dialogToCreate = false]">新增</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- 彈出視窗(修改) -->
        <v-dialog v-model="dialogToUpdate" max-width="600">
            <v-card>
                <v-card-title class="font-weight-bold">修改商品標籤</v-card-title>
                <v-form v-model="updateValid">
                    <v-card-subtitle>
                        <v-text-field label="標籤名稱" :rules="[rules.required]" v-model="formInput.tag_title"></v-text-field>
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="dialogToUpdate = false">取消</v-btn>
                        <v-btn color="primary" :disabled="!updateValid" @click="[updateProductTag({ tag_id: formInput.tag_id, tag_title: formInput.tag_title }), dialogToUpdate = false]">修改</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <!-- 彈出視窗(刪除) -->
        <v-dialog v-model="dialogToDelete" max-width="600">
            <v-card>
                <v-card-title class="font-weight-bold">刪除標籤 - {{ formInput.tag_title }}</v-card-title>
                <v-card-text>您確定要刪除這個標籤嗎?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="dialogToDelete = false">取消</v-btn>
                    <v-btn color="primary" @click="[deleteProductTag({ tag_id: formInput.tag_id }), dialogToDelete = false]">確認</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import inputRulesMixin from '~/mixins/inputRulesMixin'

export default {
    mixins: [inputRulesMixin],
    data() {
        return {
            //* 表單是否通過驗證 
            createValid: false,
            updateValid: false,
            //* 彈出視窗
            dialogToCreate: false,
            dialogToUpdate: false,
            dialogToDelete: false,
            //* 表單資料
            storeInput: {
                tag_title: ''
            },
            formInput: {
                tag_id: 0,
                tag_title: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            productTags: 'admin/getProductTags'
        }),
    },
    methods: {
        ...mapActions({
            updateProductTag: 'admin/updateProductTag',
            storeProductTag: 'admin/storeProductTag',
            deleteProductTag: 'admin/deleteProductTag'
        }),
        setFormInput(index) {
            //* 載入並設置該標籤的資訊
            this.formInput = {
                tag_id: this.productTags[index].id,
                tag_title: this.productTags[index].title
            }
        },
        resetFormInput() {
            this.formInput = {
                tag_id: 0,
                tag_title: ''
            }
        }
    },
}
</script>

<style>

</style>