<template>
    <div class="search_container d-flex flex-column">
        <v-text-field
            id="search"
            autocomplete="off"
            name="search"
            v-model="searchText"
            placeholder="相機、螢幕、服裝、折扣..."
            append-icon="fa-search"
            @keyup="handleAutoComplete"
            @click:append="search(searchText)"
            @keydown.enter="search(searchText)"
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
            <li
                class="text-center blue--text text-button font-weight-bold"
                v-for="item in autoCompleteItems"
                :key="item.id"
                @click="[setInitialState(item.title), switchRoute()]"
            >
                {{ item.title }}
            </li>
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
            searchText: '',
            selected: null,
            showModal: false,
        }
    },
    methods: {
        ...mapActions({
            //* 搜尋商品
            search: 'search/searchProducts',
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
                name: 'search-title',
                params: { title: this.selected },
            })
        },
        setInitialState(title) {
            this.searchText = title
            this.selected = title
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
        selected(val) {
            if (val) {
                this.search(val)
            }
        },
    },
    mounted() {
        //* 點擊區域外關閉
        document.addEventListener('click', e => {
            e.target.id === 'search'
                ? (this.showModal = true)
                : (this.showModal = false)
        })
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
    max-height: 300px;
    top: 65%;
    padding: 0;
}
ul {
    width: 100%;
    list-style: none;
    background: rgba(255, 255, 255, 1);
    box-shadow: 1px 1px 4px gray;
}
li {
    cursor: pointer;
    padding: 8px;
    &:hover {
        background: #f5f5f5;
    }
}
</style>
