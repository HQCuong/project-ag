<template>
	<div>              
		<button class="btn btn-primary" @click="on_result" v-if="result">Thi lại</button>
        <button class="btn btn-primary" @click="on_review">Đáp án</button>
		<p style="border-bottom: 1px solid gray">Kết quả của bạn</p>
		<p>Số câu đúng: {{score / 2}}</p>
        <p>Số chưa làm: {{all_quest - count_ques}}</p>
		<p>Tổng điểm: {{score}}</p>
	</div>
</template>

<script>
	export default {	
		computed: {
            result() {
                return this.$store.state.result;
            },
            score() {
            	return this.$store.state.score;
            },
            count_ques() {
                return this.$store.state.count_ques;
            },
            all_quest() {
                return this.$store.state.arr_questions.length;
            },
        },
        methods: {
        	on_result() {
                this.$store.commit('on_result');
                this.$store.commit('reset_score');
                this.$store.commit('reset_count');
                this.$store.commit('reset_answer');
                this.$store.commit('on_review', {check:false});
                this.$store.commit('reset_data');
                var data_loop = setInterval(()=>{
                    console.log('loading');
                    if(this.all_quest == 0) {
                        this.$store.dispatch('get_data');  
                        clearInterval(data_loop);    
                    }
                }, 500);
            },
            on_review() {
                this.$store.commit('on_review', {check:true});
            }
        },
	}
</script>

<style scoped>
	button {
		display: block;
        width: 100px;
        margin: auto;
        margin-bottom: 20px;
    }
</style>

