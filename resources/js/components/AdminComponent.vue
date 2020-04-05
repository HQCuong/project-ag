<template>
    <div style="width: 70%; margin:auto">
        <form>
            <div class="form-group">
                <label for="question">Nhập câu hỏi</label>
                <input type="text" class="form-control" id="question" name="question" placeholder="Enter question" style="margin-bottom: 20px;" required>
            </div>
            <div class="form-group">
                <label for="answer1">Nhập đáp án 1</label>
                <input type="text" class="form-control" id="answer1" name="answer1" placeholder="Enter answer" required>
                <div class="form-check"  style="margin-bottom: 30px;">
                    <input class="form-check-input" type="radio" name="check" id="exampleRadios1" value="1">
                    <label class="form-check-label" for="exampleRadios1">
                        Đáp án đúng
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="answer2">Nhập đáp án 2</label>
                <input type="text" class="form-control" id="answer2" name="answer2" placeholder="Enter answer" required>
                <div class="form-check"  style="margin-bottom: 30px;">
                    <input class="form-check-input" type="radio" name="check" id="exampleRadios2" value="2">
                    <label class="form-check-label" for="exampleRadios2">
                        Đáp án đúng
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="answer3">Nhập đáp án 3</label>
                <input type="text" class="form-control" id="answer3" name="answer3" placeholder="Enter answer" required>
                <div class="form-check"  style="margin-bottom: 30px;">
                    <input class="form-check-input" type="radio" name="check" id="exampleRadios3" value="3">
                    <label class="form-check-label" for="exampleRadios3">
                        Đáp án đúng
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="answer4">Nhập đáp án 4</label>
                <input type="text" class="form-control" id="answer4" name="answer4" placeholder="Enter answer" required>
                <div class="form-check"  style="margin-bottom: 30px;">
                    <input class="form-check-input" type="radio" name="check" id="exampleRadios4" value="4">
                    <label class="form-check-label" for="exampleRadios4">
                        Đáp án đúng
                    </label>
                </div>
            </div>
          <button type="submit" class="btn btn-primary" @click="add_question">Submit</button>
        </form>
</div>
</template>

<script>
    export default {
        mounted() {
            console.log('component mounted');
        },
        methods: {
            add_question: (event)=>{
                event.preventDefault();
                var question = $('#question').val();
                var answer1 = $('#answer1').val();
                var answer2 = $('#answer2').val();
                var answer3 = $('#answer3').val();
                var answer4 = $('#answer4').val();
                var check = $("input[type='radio']:checked").val();
                axios.post('/add_question', {
                    question: question,
                    answers: [answer1, answer2, answer3, answer4],
                    check: check
                })  
                .then(res=>{
                    if (res.status = 200) {
                        toastr.success('Thành công');
                        $("input[type='text']").val('');
                    }
                })
                .catch(err=>console.log(err));
            }
        }
    }
</script>
