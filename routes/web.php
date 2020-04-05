<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home',['guess'=>'true']);
});

Auth::routes(['register' => false]);

Route::get('/admin', 'HomeController@index')->name('view_admin');

Route::post('/add_question', 'QuestionController@add_question_answer')->middleware('auth');

Route::post('/check_result', function(Request $Request) {
	return request()->all();
});

