/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import $ from 'jquery';
window.Vue = require('vue');
import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);
import Vuex from 'vuex'
Vue.use(Vuex);

// Vuex
const store = new Vuex.Store({
  state: {
    start: true,
    result: false,
    arr_questions: [],
    root_result: [],
    answered: [],
    score: 0,
    count_ques: 0,
    review: false
  },
  mutations: {
    on_start(state) {
    	state.start = !state.start;
    },
    on_result(state) {
    	state.result = !state.result;
    },
    on_score(state){
    	state.score += 2;
    },
    reset_score(state){
    	state.score = 0;
    },
    on_count(state, payload) {
    	state.count_ques = payload.count
    },
    reset_count(state) {
    	state.count_ques = 0;
    },
    on_answer(state, payload) {
    	state.answered.push(payload.answered);
    },
    reset_answer(state) {
    	state.answered = [];
    },
    on_review(state, payload) {
    	state.review = payload.check;
    },
    reset_data(state) {
    	state.root_result = [];
    	state.arr_questions = [];
    }
  },
  actions: {
  	get_data({state, commit, rootState}) {
  		axios.get('api/get_data')
  		.then(res=>{	
  			var result = res.data;
  			for(var i = 0; i < result.length; i++) {
  				var question = result[i].question;
  				var answer1 = result[i].answers[0].answer;
  				var answer2 = result[i].answers[1].answer;
  				var answer3 = result[i].answers[2].answer;
  				var answer4 = result[i].answers[3].answer;
  				var check1 = result[i].answers[0].check;
  				var check2 = result[i].answers[1].check;
  				var check3 = result[i].answers[2].check;
  				var check4 = result[i].answers[3].check;
  				var obj = {
  					id: i,
  					question: question,
  					answer1: {
  						answer: answer1,
  						check: check1
  					},
  					answer2: {
  						answer: answer2,
  						check: check2
  					},
  					answer3: {
  						answer: answer3,
  						check: check3
  					},
  					answer4: {
  						answer: answer4,
  						check: check4
  					},
  				}
  				rootState.root_result.push([[answer1, check1], [answer2, check2], [answer3, check3], [answer4, check4]]);
  				rootState.arr_questions.push(obj);
  			}
  			// console.log(rootState.arr_questions);
  			// console.log(rootState.root_result);
  		})
  		.catch(err=>console.log(err));
  	}
  }
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('admin-component', require('./components/AdminComponent.vue').default);
Vue.component('home-component', require('./components/HomeComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store
});
