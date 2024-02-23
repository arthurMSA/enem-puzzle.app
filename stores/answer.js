import { defineStore } from 'pinia'

export const useAnswerStore = defineStore('answerse', {
    state: () => ({}),
    getters: {},
    actions: {
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
})