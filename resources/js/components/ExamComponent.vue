<template>
	<div class="container">
		<form action="">
			<div v-for="each in questions" v-bind:key="each.id" v-show="each.id == index - 1">
				<p>
					{{each.question}}
				</p>
				<div class="form-check"  style="margin-bottom: 30px;" @click="count_ques">
	                <input class="form-check-input" type="radio" :name="'check'+each.id" :id="'exampleRadios'+each.id" value="1" :data-id="each.id" :data-text="each.answer1.answer">
	                <label class="form-check-label" :for="'exampleRadios'+each.id">
	                	{{each.answer1.answer}}
	                </label>
             	</div>
				<div class="form-check"  style="margin-bottom: 30px;" @click="count_ques">
	                <input class="form-check-input" type="radio" :name="'check'+each.id" :id="'exampleRadios'+each.id+1" value="2" :data-id="each.id" :data-text="each.answer2.answer">
	                <label class="form-check-label" :for="'exampleRadios'+each.id+1">
	                	{{each.answer2.answer}}
	                </label>
             	</div>
				<div class="form-check"  style="margin-bottom: 30px;" @click="count_ques">
	                <input class="form-check-input" type="radio" :name="'check'+each.id" :id="'exampleRadios'+each.id+2" value="3" :data-id="each.id" :data-text="each.answer3.answer">
	                <label class="form-check-label" :for="'exampleRadios'+each.id+2">
	                	{{each.answer3.answer}}
	                </label>
             	</div>
				<div class="form-check"  style="margin-bottom: 30px;" @click="count_ques">
	                <input class="form-check-input" type="radio" :name="'check'+each.id" :id="'exampleRadios'+each.id+3" value="4" :data-id="each.id" :data-text="each.answer4.answer">
	                <label class="form-check-label" :for="'exampleRadios'+each.id+3">
	                	{{each.answer4.answer}}
	                </label>
             	</div>
			</div>
			<paginate class="pagination"
	            :page-count="50"
	            :click-handler="change_ques"
	            :prev-text="'<<'"
	            :next-text="'>>'"
	            :container-class="'pagination'"
	            :page-class="'page-item'"
	            :page-link-class="'page-link'"
	            :prev-class="'page-item'"
	            :next-class="'page-item'"
	            :prev-link-class="'page-link'"
	            :next-link-class="'page-link'"
	            :active-class="'active'">
	        </paginate>
        	<input type="submit" value="Nộp bài" class="btn btn-primary" id="confirm" @click.prevent="finish_test">
        </form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				index: 1
			}
		},
		computed: {
			questions() {
				return this.$store.state.arr_questions;
			},
			root_result() {
				return this.$store.state.root_result;
			},
			answered() {
				return this.$store.state.answered;
			}
		},
		methods: {
			change_ques(index) {
				this.index = index;
			},
			count_ques() {
				var arr_radio = $("input[type='radio']:checked");
				this.$store.commit('on_count', {
					count: arr_radio.length
				});
			},
			finish_test() {
				this.$store.commit('on_start');
				clearInterval(loop);


				var arr_radio = $("input[type='radio']:checked");
				for (var i = 0; i < arr_radio.length; i++) {
					if (arr_radio[i]) {
						for (var j = this.answered.length; j <= arr_radio[i].attributes[5].value; j++) {
							if (j == arr_radio[i].attributes[5].value) {
								this.$store.commit('on_answer', {
									answered: {id:j, answer: arr_radio[i].attributes[6].value}					
								})
							} else {
								this.$store.commit('on_answer', {
									answered: {id:j, answer: 'Chưa làm'}					
								})
							}
						}
					} 
				}
				for(var i =  this.answered.length; i < this.questions.length; i++) {
					this.$store.commit('on_answer', {
						answered: {id:i, answer: 'Chưa làm'}					
					})
				}
				// console.log(this.$store.state.answered);
				var arr_result = [];
				for(var i = 0; i < this.questions.length; i++) {
					if (arr_radio[i]) {
						// console.log(arr_radio[i].attributes);
						for(var j = arr_result.length; j <= arr_radio[i].attributes[5].value; j++) {
							if (j == arr_radio[i].attributes[5].value) {
								arr_result.push(arr_radio[i].value);
							} else {
								arr_result.push('f');
							}
						}
					}
				}
				// console.log(arr_result);	

				for(var i = 0; i < arr_result.length; i++){
					if (arr_result[i] != 'f') {
						if(this.root_result[i][arr_result[i] - 1][1] == 1){
							this.$store.commit('on_score');
						} else {
							this.$store.commit('on_wrong');
						}
					} else {
						continue;
					}
				}
				// console.log(this.$store.state.score);


				this.$store.commit('on_result');
			}
		}
	}
</script>

<style scoped>
	.box-exam{
		width: 99%;
	}

	p {
		border-bottom: 1px solid gray;
	}

	.pagination {
        justify-content: center;
    }

	#confirm {
		display: block;
		margin: auto;
		margin-top: 50px;
	}

	@media (max-width: 415px) {
		.pagination {
        	font-size: 0.9rem;
    	}
	}
	@media (max-width: 390px) {
		.pagination {
        	font-size: 0.8rem;
    	}
	}

	@media (max-width: 375px) {
		.pagination {
        	font-size: 0.7rem;
    	}
	}

	@media (max-width: 360px) {
		.pagination {
        	font-size: 0.6rem;
    	}
	}

	@media (max-width: 345px) {
		.pagination {
        	font-size: 0.5rem;
    	}
	}

	@media (max-width: 325px) {
		.pagination {
        	font-size: 0.4rem;
    	}
	}
</style>

