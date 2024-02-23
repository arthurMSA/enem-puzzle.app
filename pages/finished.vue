<template>
    <div class="elevated-page-container">
        <div class="left-container d-flex flex-column align-center justify-center">
            <v-icon
                color="primary"
                size="100"
            >
                mdi-trophy
            </v-icon>
            <div class="text-h5">
                {{ ranking.label.toUpperCase() }}
            </div>
            <div class="text-h6">
                {{ points }} PONTOS
            </div>
        </div>
        <div class="right-container d-flex flex-column align-center justify-center">
            <div class="text-h6 w-75 gray-font text-center mb-8">
                BORA TREINAR MAIS?
            </div>
            <v-btn
                color="primary"
                size="large"
                width="80%"
                to="/quiz"
                @click="this.setPoints(0)"
            >
                REINICIAR QUIZ
            </v-btn>
        </div>
    </div>
</template>
<script>
import { useAnswerStore } from '@/stores/answer'
import { mapState, mapActions } from 'pinia'

export default {
    data() {
        return {
            ranking: {},
            rankingRules: [
                {
                    label: 'Novato',
                    min: 0,
                    max: 45,
                },
                {
                    label: 'Conhecedor',
                    min: 46,
                    max: 90,
                },
                {
                    label: 'Expert',
                    min: 91,
                    max: 170,
                },
                {
                    label: 'Mestre Do ENEM',
                    min: 171,
                    max: null,
                },
            ]
        }
    },
    created() {
        this.getRanking()
    },
    methods: {
        ...mapActions(useAnswerStore, ['setPoints']),
        getRanking() {
            this.rankingRules.forEach((ranking) => {
                if (this.points > ranking.min) {
                    if (ranking.max === null || this.points <= ranking.max) {
                        console.log(ranking)
                        this.ranking = ranking
                    }
                }
            })
        }
    },
    computed: {
        ...mapState(useAnswerStore, ['points']),
    }
}
</script>