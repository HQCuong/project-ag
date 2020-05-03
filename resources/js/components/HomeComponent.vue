<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Agribank cao lộc</div>
                    <button class="btn btn-primary" @click="on_start" v-if="start && !result">Bắt đầu</button>
                    <Time v-if="!start" @time_out="time_out"></Time>
                    <div class="card-body">
                        <Exam v-if="!start" ref="time_out"></Exam>
                        <Result v-if="result"></Result>
                        <Review v-if="review"></Review>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Exam from './ExamComponent.vue';
    import Time from './TimeComponent.vue';
    import Result from './ResultComponent.vue';
    import Review from './ReviewComponent.vue';

    export default {
        computed: {
            start() {
                return this.$store.state.start;
            },
            result() {
                return this.$store.state.result;
            },
            review() {
                return this.$store.state.review;
            }
        },
        created() {
            this.$store.dispatch('get_data');
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            on_start() {
                this.$store.commit('on_start');
            },
            time_out() {
                this.$refs.time_out.finish_test();
            }
        },
        components: {
            Exam,
            Time,
            Result,
            Review
        }
    }
</script>


<style scoped>
    button {
        width: 100px;
        margin: auto;
        margin-top: 10px;
    }
</style>




