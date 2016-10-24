"use strict";

$(function() {

	var test = {
		questions: ["Вопрос №1","Вопрос №2","Вопрос №3"],
		answers: [["Вариант ответа №1","Вариант ответа №2","Вариант ответа №3"],
		["Вариант ответа №1","Вариант ответа №2","Вариант ответа №3"],
		["Вариант ответа №1","Вариант ответа №2","Вариант ответа №3"]],
		trueAnswers: [["false","true","false"],
		["false","true","false"],
		["false","true","false"]]
	};

	localStorage.setItem("obj", JSON.stringify(test));

	var returnTest = JSON.parse(localStorage.getItem("obj"));

	var content = tmpl($('#test-template').html(), returnTest);

	$('body').append(content);

	$('.btn').click(function() {

		var questionList = document.querySelectorAll('.question');

		var resault = [];

		for (var i = 0; i < questionList.length; i++) {
		
			var answerVariants = questionList[i].querySelectorAll('input');

			var checkedArr = [];

			for (var j = 0; j < answerVariants.length; j++) {
	
				checkedArr.push(answerVariants[j].checked);

				answerVariants[j].checked = false;
			}

			resault.push(checkedArr);
		}

		if (resault.join() != test.trueAnswers.join()) {

			$('#modal-content').text("Try again, Dude :(");

		} else

		$('#modal-content').text("You are right, Dude!");

		$('#overlay').fadeIn(400, function() {

			$('#modal-form') 
				.css('display', 'block')
				.animate({opacity: 1, top: '50%'}, 200)
			;
		});
	});

	$('#modal-close, #overlay').click(function() {

		$('#modal-form')
			.animate({opacity: 0, top: '45%'}, 200, function() {

				$(this).css('display', 'none');
				$('#overlay').fadeOut(400);
			})
		;
	});
});