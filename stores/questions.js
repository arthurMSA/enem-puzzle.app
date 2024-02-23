import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('questions', {
    state: () => ({}),
    getters: {},
    actions: {
        listQuestions(area) {
            return useApi(`/questions/${area}`)
                .then(({ data: { value } }) => value)
        },
    },
})