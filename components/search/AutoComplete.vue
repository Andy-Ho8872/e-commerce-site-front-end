<template>
    <div class="search_container d-flex flex-column">
        <v-text-field
            autocomplete="off"
            name="search"
            v-model="searchText"
            placeholder="相機、螢幕、服裝、折扣..."
            append-icon="fa-search"
            @input="autoComplete(searchText)"
            @click:append="search(searchText)"
            solo
            dense
        >
        </v-text-field>
        <!-- @click:append="search(searchText)" -->
        <ul
            class="auto_complete rounded-b-lg"
            id="auto_complete"
            @click="toggleShowModal"
            v-show="showModal"
        >
            <li
                class="text-center blue--text text-button font-weight-bold"
                ref="auto_complete_results"
                v-for="(item, index) in autoCompleteItems"
                :key="item.id"
                @click=";[setSearchText(index), switchRoute()]"
            >
                {{ item.title }}
            </li>
            <p
                class="text-center blue--text caption font-weight-bold pt-4"
                v-if="!autoCompleteItems.length"
            >
                找不到相關的結果
            </p>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
        toggleShowModal(e) {
            e.target.id == 'auto_complete'
                ? (this.showModal = true)
                : (this.showModal = false)
        },
        switchRoute() {
            this.$router.push({
                name: 'search-title',
                params: { title: this.selected },
            })
        },
        setSearchText(index) {
            this.searchText = this.$refs.auto_complete_results[index].innerText
            this.selected = this.$refs.auto_complete_results[index].innerText
        },
    },
    computed: {
        ...mapGetters({
            loading: 'search/getLoading',
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
        document.addEventListener('click', e => {
            if (e.target.id !== "auto_complete") {
                this.showModal = false
            }
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
