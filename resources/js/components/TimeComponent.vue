<template>
	<div>
		<div id="time">
			<p id="minutes"></p>
			<p>:</p>
			<p id="seconds"></p>
		</div>
		<div id="count_ques">
			<p>số câu đã làm: {{count_ques}} trên tổng 30</p>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			count_ques() {
				return this.$store.state.count_ques;
			}
		},
		mounted() {
			$(document).ready(()=>{
				$('#minutes').html("29");
			    $('#seconds').html("59");
			    var m =  $('#minutes').html();
			    var s =  $('#seconds').html();
			    window.loop = setInterval(()=>{
			      if(s == 0) {
			        if(m != 0) {
			            s = 59;
			            $('#seconds').html(s);
			            m--;
			            $('#minutes').html(m);
			        } else {
			        	this.$emit('time_out');
			            clearInterval(loop);
			        }
			      }
			      else {
			        s--;
			        $('#seconds').html(s);
			      }
			    }, 1000);
			});
		}
	}
</script>

<style scoped>
	#time {
		display: flex;
		flex-direction: row;
		width: 50px;
		margin: auto;
		margin-top: 20px;
	}

	#count_ques{
		width: 200px;
		margin: auto;
		text-align: center;
	}
</style>