<template>
    <div class="search_container d-flex flex-column">
        <v-text-field
            id="search"
            v-click-outside="onClickOutside"
            @click="showModal = true"
            autocomplete="off"
            name="search"
            v-model="searchText"
            placeholder="相機、螢幕、服裝、折扣..."
            append-icon="fa-search"
            @keyup="handleAutoComplete"
            @click:append="search({ title: searchText, pageNumber: 1 })"
            @keydown.enter="search({ title: searchText, pageNumber: 1 })"
            solo
            dense
        >
        </v-text-field>
        <ul
            class="auto_complete rounded-b-lg"
            v-show="showModal"
        >
            <!-- Loading -->
            <v-progress-linear
                v-show="loading"
                indeterminate
                color="blue darken-2"
            ></v-progress-linear>
            <!-- results -->
            <v-list>
                <v-list-item-group>
                    <v-list-item class="autocomplete_item" v-for="item in autoCompleteItems" :key="item.id" @click="[setInitialState(item.title), switchRoute()]">
                        <v-list-item-avatar>
                            <v-img :src="item.imgUrl" :alt="item.title"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content class="text-button font-weight-bold">
                            <v-list-item-subtitle class="auto_complete__result blue--text">{{ item.title }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <!-- no result text -->
            <p
                class="text-center blue--text caption font-weight-bold pt-4"
                v-show="!autoCompleteItems"
            >
                {{ no_result_text }}
            </p>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        no_result_text: {
            type: String,
            default: '找不到相關的結果'
        }
    },
    data() {
        return {
            searchText: '', //* 使用者輸入的搜尋關鍵字
            selected: null, //* 使用者在 auto-complete 中所選擇的關鍵字
            showModal: false,
        }
    },
    methods: {
        ...mapActions({
            //* 搜尋商品(含分頁)
            search: 'search/searchProductsWithPagination',
            //* 自動補全
            autoComplete: 'search/fetchAutoComplete',
        }),
        handleAutoComplete(e) {
            const code = e.keyCode
            //* 如果為以下按鍵時不執行
            switch (code) {
                case 8:   //* BackSpace
                    break
                case 9:   //* Tab
                    break
                case 16:  //* Shift 
                    break
                case 17:  //* Ctrl
                    break
                case 18:  //* Alt
                    break
                case 20:  //* Caps
                    break
                case 37:  //* 方向鍵左
                    break
                case 38:  //* 方向鍵左
                    break
                case 39:  //* 方向鍵左
                    break
                case 40:  //* 方向鍵左
                    break
                default:
                    this.autoComplete(this.searchText)
                    break
            }
        },
        switchRoute() {
            this.$router.push({
                name: 'search-title-pagination-pageNumber',
                params: { 
                    title: this.selected,
                    pageNumber: 1 //* 預設為第一頁
                },
            })
        },
        setInitialState(title) {
            this.searchText = title
            this.selected = title
            this.showModal = false
        },
        //* 點擊 Search 以外的區域則會關閉 
        onClickOutside () {
            this.showModal = false
        },
    },
    computed: {
        ...mapGetters({
            loading: 'search/getAutoCompleteLoading',
            autoCompleteItems: 'search/getAutoCompleteItems',
        }),
    },
    watch: {
        searchText(val) {
            val ? (this.showModal = true) : (this.showModal = false)
        },
    },
}
</script>

<style lang="scss" scoped>
.search_container {
    position: relative;
    width: 600px;
}
.auto_complete {
    position: absolute;
    overflow-y: auto;
    max-height: fit-content;
    top: 65%;
    padding: 0;
}
ul {
    width: 100%;
    list-style: none;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 4px gray;
}
.autocomplete_item {
    &:hover {
        background: #E0E0E0;
    }
}
</style>
