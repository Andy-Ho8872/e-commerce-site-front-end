<template>
    <v-card class="my-6 d-flex" :color="background">
        <v-img
            :src="require('~/static/index/Fire.svg')"
            max-width="24"
            max-height="24"
            class="my-auto mx-2"
        ></v-img>
        <v-card-title>{{ text }}</v-card-title>
    </v-card>
</template>

<script>
export default {
    props: {
        'text': {
            type: String,
            require: true
        },
        'background': {
            type: String,
        }
    },
}
</script>
