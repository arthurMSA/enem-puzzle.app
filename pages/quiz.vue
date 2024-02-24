<template>
    <div class="elevated-page-container">
        <div
            class="d-flex flex-column align-center justify-center px-16"
            :class="{ 'left-container': !isMobile }"
        >
            <pointsView
                v-if="isMobile"
                class="mb-4"
                :points="points"
            />
            <v-skeleton-loader
                v-if="loading"
                class="mb-16"
                type="paragraph"
                heigth="200"
                :style="{ 'width': '90%' }"
            />
            <v-window
                v-model="currentQuestion.index"
                v-else
            >
                <v-window-item
                    v-for="(question, index) in questions"
                    :transition="false"
                    :key="question._id['$oid']"
                    :value="index"
                >
                    <v-card
                        elevation="0"
                        color="transparent"
                        class="overflow-auto"
                    >
                        <v-card-text class="pa-0">
                            <div class="text-h5 text-primary mb-10 font-weight-bold">
                                QUESTÃO {{ index+1 }}
                            </div>
                            <v-img
                                :src="question.imagem"
                                max-height="200"
                                max-width="300"
                            />
                            <div class="mb-4">
                                {{question['texto']}}
                            </div>
                            <div
                                v-for="(option, optionIndex) in question['alternativas']"
                                class="question-option mb-4 px-4 py-4 rounded-lg"
                                :class="getOptionsBackgroundColor(question._id['$oid'], optionIndex)"
                                :key="optionIndex"
                                @click="selectedAnswer = optionIndex"
                            >
                                {{ option }}
                            </div>
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
            <v-btn
                v-if="!isFinished"
                :loading="loadingSendButton"
                class="ml-auto"
                color="primary"
                :block="isMobile"
                @click="getNextBtnAction"
            >
                {{ getNextBtnLabel }}
            </v-btn>
            <v-btn
                v-else
                class="w-100 mt-8"
                color="success"
                to="/finished"
                size="large"
            >
                FINALIZAR QUIZ
            </v-btn>
        </div>
        <div
            v-if="!isMobile"
            class="right-container d-flex flex-column align-center"
        >
            <pointsView
                class="mt-8"
                :points="points"
            />
            <div
                v-if="currentQuestion.question !== null"
                class="d-flex flex-column text-primary text-center align-self-center my-auto"
            >
                <div>
                    <v-icon
                        size="100"
                        class="mr-2"
                    >
                        {{ currentQuestionInfo.areaIcon }}
                    </v-icon>
                    <div class="font-weight-bold text-h5">
                        {{ currentQuestionInfo.area.toUpperCase() }}
                    </div>
                    <div class="font-weight-bold text-caption">
                        {{ currentQuestionInfo.theme }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useQuestionStore } from '@/stores/questions'
import { useAnswerStore } from '@/stores/answer'
import { mapState, mapActions } from 'pinia'

export default {
    data() {
        return {
            loading: false,
            loadingSendButton: false,
            questions: [],
            answers: {},
            selectedAnswer: null,
            isFinished: false,
            currentQuestion: {
                index: 0,
                id: '',
                question: null,
            },
            currentArea: '',
            areas: [
                'biologia',
                'português',
                'literatura',
                'física',
                'quimica',
                'matemática',
            ],
        }
    },
    async created() {
        this.loading = true
        this.currentArea = this.areas[0]
        this.questions = await this.listQuestions(this.currentArea)
        this.currentQuestion.index = 0
        this.currentQuestion.id = this.questions[0]._id['$oid']
        this.currentQuestion.question = this.questions[0]
        this.loading = false
    },
    methods: {
        ...mapActions(useQuestionStore, ['listQuestions']),
        ...mapActions(useAnswerStore, ['sendAnswer', 'setPoints']),
        questionAlrearyAswered(questionId) {
            return Object.keys(this.answers).includes(questionId)
        },
        async sendAnswerQuestion() {
            if (this.selectedAnswer !== null) {
                try {
                    const questionId = this.currentQuestion.id
                    this.loadingSendButton = true
                    const responseAnswer = await this.sendAnswer({
                        questionId,
                        answer: this.parseAnswer(this.selectedAnswer)
                    })
                    this.loadingSendButton = false
                    this.addPoints(responseAnswer.points)
                    this.answers[questionId] = {
                        selectedAnswerIndex: this.selectedAnswer,
                        ...responseAnswer,
                    }
                    this.selectedAnswer = null
                } catch (error) {
                    //snackbar error
                } finally {
                    if (this.isLastAnswer) {
                        if ((this.currentAreaIndex + 1) === Object.keys(this.areas).length) {
                            this.isFinished = true
                        }
                    }
                }
            }

        },
        addPoints({ gain, loss }) {
            this.setPoints(this.points + gain)
            if (this.points - loss < 0) return
            this.setPoints(this.points - loss)
        },
        async goToNextQuestion() {
            if (this.isLastAnswer) {
                this.currentArea = this.areas[this.currentAreaIndex + 1]
                const newQuestions = await this.listQuestions(this.currentArea)
                this.questions = [
                    ...this.questions,
                    ...newQuestions,
                ]
            }
            const newIndex = this.currentQuestion.index + 1
            this.currentQuestion.index = newIndex
            const newQuestion = this.questions[newIndex]
            this.currentQuestion.id = newQuestion._id['$oid']
            this.currentQuestion.question = newQuestion
        },
        parseAnswer(answerNumber) {
            return {
                0: 'a',
                1: 'b',
                2: 'c',
                3: 'd',
                4: 'e',
            }[answerNumber]
        },
        getOptionsBackgroundColor(questionId, optionIndex) {
            const validationClassesColor = {}
            if (this.questionAlrearyAswered(questionId)) {
                const answerIsCorrect = this.parseAnswer(this.answers[questionId].selectedAnswerIndex) == this.answers[questionId].correctAnswer
                if (this.answers[questionId].selectedAnswerIndex === optionIndex) {
                    validationClassesColor['bg-error'] = !answerIsCorrect
                    validationClassesColor['bg-success'] = answerIsCorrect
                }
                if (!answerIsCorrect && this.answers[questionId].correctAnswer === this.parseAnswer(optionIndex)) {
                    validationClassesColor['bg-success'] = true
                }
            }
            return {
                'question-option-active': this.selectedAnswer == optionIndex && !this.questionAlrearyAswered(questionId),
                ...validationClassesColor,
            }
        }
    },
    computed: {
        ...mapState(useAnswerStore, ['points']),
        isMobile() {
            return this.$vuetify.display.mobile
        },
        getNextBtnLabel() {
            if (this.isFinished) return 'FINALIZAR'
            if (this.questionAlrearyAswered(this.currentQuestion.id)) return 'PRÓXIMA'
            return 'RESPONDER'
        },
        getNextBtnAction() {
            if (this.isFinished) {
                this.$router.push('/finished')
                return
            }
            if (this.questionAlrearyAswered(this.currentQuestion.id)) {
                return this.goToNextQuestion
            }
            return this.sendAnswerQuestion
            
        },
        currentQuestionInfo() {
            if (this.currentQuestion.question == null) return
            const {
                disciplina,
                tematica,
            } = this.currentQuestion.question
            return {
                area: disciplina,
                areaIcon: this.areasIconDict[disciplina],
                theme: tematica,
            }
        },
        areasIconDict() {
            return {
                'biologia': 'mdi-dna',
                'português': 'mdi-chat',
                'literatura': 'mdi-book-open-outline',
                'física': 'mdi-atom',
                'quimica': 'mdi-test-tube',
                'matemática': 'mdi-pi',
            }
        },
        isLastAnswer() {
            return Object.keys(this.answers).length === this.questions.length
        },
        currentAreaIndex() {
            return this.areas.indexOf(this.currentArea)
        },
    }
}
</script>
<style scoped>
.question-option {
    background-color: #f7f7f7;
}
.question-option:hover {
    -webkit-box-shadow: 0px 0px 10px 0px rgba(85, 85, 85, 0.219);
    -moz-box-shadow: 0px 0px 10px 0px rgba(85, 85, 85, 0.219);
    box-shadow: 0px 0px 10px 0px rgba(85, 85, 85, 0.219);
    cursor: pointer;
}
.question-option-active {
    -webkit-box-shadow: 0px 0px 20px 0px rgba(49, 49, 49, 0.219);
    -moz-box-shadow: 0px 0px 20px 0px rgba(49, 49, 49, 0.219);
    box-shadow: 0px 0px 20px 0px rgba(49, 49, 49, 0.219);
    background-color: #A5D0FB;
}
</style>