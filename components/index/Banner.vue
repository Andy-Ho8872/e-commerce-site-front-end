<template>
    <v-banner two-line :color="backgroundColor" :elevation="elevation">
        <v-avatar slot="icon" size="40">
            <v-icon :icon="icon" :color="iconColor">{{ icon }}</v-icon>
        </v-avatar>
        <span class="banner_text grey--text text--darken-1">{{ text }}</span>
    </v-banner>
</template>

<script>
export default {
    props: {
        elevation: {
            type: [String, Number],
            default: 2,
        },
        icon: {
            type: String,
            default: 'fa-icons'
        },
        iconColor: {
            type: String,
            default: 'teal lighten-1'
        },
        text: {
            type: String,
            default: "Banner Text"
        },
        backgroundColor: {
            type: String,
            default: 'white',
        },
    },
}
</script>

<style lang="scss" scoped>
.banner_text {
    font-size: 1.25em;
}
</style>
