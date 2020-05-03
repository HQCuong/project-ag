<template>
	<div>
		<div v-for="each in questions" v-bind:key="each.id" v-show="each.id == index - 1" style="margin-top: 20px">
				<p class="question">
					{{each.question}}
				</p>
				<p :class="{root_answer: each.answer1.check == 1}" class="get">
					{{each.answer1.answer}}
				</p>
				<p :class="{root_answer: each.answer2.check == 1}" class="get">
					{{each.answer2.answer}}
				</p>
				<p :class="{root_answer: each.answer3.check == 1}" class="get">
					{{each.answer3.answer}}
				</p>
				<p :class="{root_answer: each.answer4.check == 1}" class="get">
					{{each.answer4.answer}}
				</p>
		</div>
		<p v-for="each in answered" v-bind:key=" 'as' + each.id" v-show="each.id == index -1" style="margin-top: 20px; border-top: 1px solid gray;">
			Đáp án đã chọn: <b>{{each.answer}}</b>
		</p>
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
			answered() {
				return this.$store.state.answered;
			}
		},
		methods: {
			change_ques(index) {
				this.index = index;
			}
		}
	}
</script>

<style scopted>
	.pagination {
        justify-content: center;
    }

    .question {
    	border-bottom: 1px solid gray;
    }

    .root_answer {
		background-color: yellow;
    }

    button {
    	display: block;
    	width: 100px;
    	margin: auto;
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