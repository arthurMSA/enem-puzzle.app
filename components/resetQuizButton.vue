<template>
    <v-btn
        color="primary"
        size="large"
        width="80%"
        to="/quiz"
        :block="isMobile"
    >
        REINICIAR QUIZ
    </v-btn>
</template>
<script>
export default {
    computed: {
        isMobile() {
            return this.$vuetify.display.mobile
        },
    }
}
</script>