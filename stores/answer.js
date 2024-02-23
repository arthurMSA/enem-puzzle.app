import { defineStore } from 'pinia'

export const useAnswerStore = defineStore('answerse', {
    state: () => ({
        points: 0,
    }),
    getters: {},
    actions: {
        setPoints(points) {
            this.points = points
        },
        sendAnswer({ questionId, answer }) {
            return useApi('/answer', {
                method: 'POST',
                body: {
                    questionId,
                    answer,
                }
            }).then(({ data: { value } }) => value)
        }
    },
    persist: true
})