<template>
    <div class="mt-8">
        <v-icon
            color="primary"
            size="30"
        >
            mdi-trophy
        </v-icon>
        <span class="ml-4 text-h6">
            {{ points }} PONTOS
        </span>
    </div>
</template>
<script>
export default {
    props: {
        points: {
            type: Number,
            required: true,
        },
    },
}
</script>
