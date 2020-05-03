<template>
	<div>              
		<button class="btn btn-primary" @click="on_result" v-if="result">Thi lại</button>
        <button class="btn btn-primary" @click="on_review">Đáp án</button>
		<p style="border-bottom: 1px solid gray">Kết quả của bạn</p>
		<p>Số câu đúng: <b>{{score / 2}}</b></p>
        <p>Số câu sai: <b>{{count_wrong}}</b></p>
        <p>Số câu chưa làm: <b>{{all_quest - count_ques}}</b></p>
        <p>Xếp loại: <b>{{on_rank(score)}}</b></p>
        <div class="score">
		  <p>Tổng điểm: </p>
          <h2>{{score}}</h2>
        </div>
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
            count_wrong() {
                return this.$store.state.count_wrong;
            }
        },
        methods: {
        	on_result() {
                this.$store.commit('on_result');
                this.$store.commit('reset_score');
                this.$store.commit('reset_count');
                this.$store.commit('reset_answer');
                this.$store.commit('reset_wrong');
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
            },
            on_rank(score) {
                if(score < 50) {
                    return 'Trượt';
                } else if (score >= 50 && score < 70) {
                    return 'Trung bình';
                } else if (score >= 70 && score < 80) {
                    return 'Khá';
                } else {
                    return "Giỏi";
                }
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

    .score {
        text-align: center;
    }
</style>

