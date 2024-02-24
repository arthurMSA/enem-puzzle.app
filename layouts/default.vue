<template>
    <div>
      <div class="d-flex">
        <div class="bg-left-container"></div>
        <div :class="{'bg-right-container': !isMobile}"></div>
      </div>
        <div
            v-if="!isMobile"
            class="elevated-page"
        >
            <NuxtPage></NuxtPage>
        </div>
        <div
            v-else
            class="py-6"
        >
            <NuxtPage></NuxtPage>
        </div>
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
<style>
.bg-left-container {
    width: 65vw;
}
.bg-right-container {
    background-color: #A5D0FB;
    width: 35vw;
    height: 100vh;
}
.elevated-page {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    width: 90vw;
    height: 90vh;
    -webkit-box-shadow: 0px 0px 30px 0px rgba(85, 85, 85, 0.219);
    -moz-box-shadow: 0px 0px 30px 0px rgba(85, 85, 85, 0.219);
    box-shadow: 0px 0px 30px 0px rgba(85, 85, 85, 0.219);
    border-radius: 5px;
}
.elevated-page-container {
    height: 100%;
    width: 100%;
    display: flex;
}
.right-container {
    width: 30vw;
    height: 100%;
}
.left-container {
    width: 60vw;
    height: 100%;
}
</style>