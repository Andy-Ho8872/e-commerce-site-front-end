<template>
    <div class="text-center">
        <v-progress-circular :size="size" color="primary" indeterminate></v-progress-circular>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type:[String, Number],
            default: 50
        }
    }
}
</script>
