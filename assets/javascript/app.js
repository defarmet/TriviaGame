$(document).ready(function() {

var questions = [];
var q_num = 0;
var answer_timeout;
var a_correct = 0;

var Question = {
	question: "",
	answers: [],
	correct: "",
	fun_fact: "",

	write: function() {
		$("#question").text(this.question);
		$("#fact").empty();
		var sequence_1 = shuffle([0, 1, 2, 3]);
		var sequence_2 = [0, 1, 2, 3];
		for (var i = 0; i < 4; i++) {
			var a_div = $("#answer_" + sequence_1[i]);
			a_div.text(this.answers[sequence_2[i]]);
		}
		answer_timeout = setTimeout(timeout, 15000);
	},

	display_answer: function(state) {
		for (var i = 0; i < 4; i++) {
			$("#answer_" + i).empty();
		}
		if (state === "Correct!") {
			a_correct++;
			$("#fact").html(this.fun_fact);
		}
		$("#correct").text(this.correct);
		$("#question").text(state);
		setTimeout(next_question, 10000);
	}
}

function endgame() {
	$("#correct").empty();
	$("#fact").empty();
	$("#question").text("You got " + a_correct + "/"+ questions.length + " answers correct");
	$("#reset").text("Click here to play again.");
}

function reset() {
	q_num = 0;
	a_correct = 0;
	questions = shuffle(questions);
	$("#reset").empty();
	questions[q_num].write();
}

function shuffle(array) {
	for (var i = array.length - 1; i >= 0; i--) {
		var j = Math.floor(Math.random() * array.length);
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}

function next_question() {
	$("#correct").empty();
	q_num++;
	if (questions[q_num]) {
		questions[q_num].write();
	} else {
		endgame();
	}
}

function timeout() {
	questions[q_num].display_answer("Time's up!");
}

function create_question(question, answers, correct, fun_fact) {
	new_question = Object.create(Question);
	new_question.question = question;
	new_question.answers = answers;
	new_question.correct = answers[correct];
	new_question.fun_fact = fun_fact;
	return new_question;
}

questions.push(create_question("Which attraction did not open with Walt Disney World?", ["Peter Pan's Flight", "Pirates of the Caribbean", "Walt Disney's Enchanted Tiki Room", "The Haunted Mansion"], 1, "Pirates of the Caribbean was not originally supposed to be in Walt Disney World. It opened in 1973 due to high demand."));
questions.push(create_question("What is the newest ride open at Walt Disney World?", ["Millenium Falcon: Smuggler's Run", "Star Wars: Rise of the Resistance", "Mickey & Minnie's Runaway Railway", "Avatar Flight of Passage"], 2, "Runaway Railway uses scene transforming technology that has been in development for over 10 years."));
questions.push(create_question("EPCOT recently updated multiple shows around the park. Which one has not opened yet?", ["Wonderous China", "Awesome Planet", "Canada: Far and Wide", "Beauty and the Beast Sing-Along"], 0, "While announced in 2017, the current show, Reflections of China, still plays to this day."));
questions.push(create_question("Which of these characters did not originate in a Disney Park?", ["Chuuby", "Orange Bird", "Figment", "Br'er Rabbit"], 3, "Br'er Rabbit originates from the 1946 film Song of the South. Good luck finding a copy of that film."));
questions.push(create_question("What is the name of the pilot droid from the original Star Tours?", ["C-3PO", "AC-38", "RX-24", "R5-D4"], 2, "RX-24 appears in the wait line for Star Tours: The Adventures Continue. He can be heard saying lines from the  original ride."));

function check_answer() {
	clearTimeout(answer_timeout);
	if ($(this).text() === questions[q_num].correct) {
		questions[q_num].display_answer("Correct!");
	} else {
		questions[q_num].display_answer("Incorrect.");
	}
}

$(".answer").click(check_answer);
$("#reset").click(reset);

});
