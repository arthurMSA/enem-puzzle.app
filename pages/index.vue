<template>
    <div class="elevated-page-container">
        <div
            v-if="!isMobile"
        >
            <div
                class="d-flex flex-column align-center justify-center"
                :class="{ 'left-container': !isMobile }"
            >
                <img src="../public/undraw_online_test.svg"/>
            </div>
        </div>
        <HomeRigthContainer/>
    </div>
</template>
<script>
export default {
    computed: {
        isMobile() {
            return this.$vuetify.display.mobile
        },
    },
}
</script>
<style scoped>
.gray-font {
    color: #3c3c51;
}
</style>