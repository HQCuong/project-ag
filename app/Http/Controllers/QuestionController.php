<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Answer;

class QuestionController extends Controller
{
    public function add_question_answer(Request $request) {
    	$question = new Question;
    	$question->question = request()->question;
    	$question->save();
    	$id = $question->orderBy('id_question', 'DESC')->first()->id_question;
    	$check = request()->check;
    	$arr_answer = request()->answers;
    	for($i = 1; $i <= 4; $i++) {
    		$answer = new Answer;
    		$answer->answer = $arr_answer[$i-1];
    		if($i == $check) {
    			$answer->check = 1;
    		} else {
    			$answer->check = 0;
    		}
    		$answer->id_question = $id;
    		$answer->save();
    	}
    	return redirect()->route('view_admin');
    }

    public function get_question_answer() {
        $question = Question::with('answers')->inRandomOrder()->take(50)->get();
        return $question;
    }
}
