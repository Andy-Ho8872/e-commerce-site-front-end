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
            default: 2
        },
        icon: {
            type: String,
        },
        iconColor: {
            type: String,
        },
        text: {
            type: String,
            require: true,
        },
        backgroundColor: {
            type: String,
        },
    },
}
</script>

<style lang="scss" scoped>
.banner_text {
    font-size: 1.25em;
}
</style>