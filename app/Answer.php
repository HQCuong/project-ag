<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
	// Ten bang
    protected $primaryKey = 'id_answer';

    // Timestamp
    public $timestamps = false;

    // 1 answer 1 quest
    public function question() {
    	return $this->belongsTo(Question::class, 'id_question');
    }
}
