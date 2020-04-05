<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
	// Khoa chinh
    protected $primaryKey = 'id_question';

    // Timestamps
    public $timestamps = false;

    // 1 quest many answer
    public function answers() {
    	return $this->hasMany(Answer::class, 'id_question');
    }
}
