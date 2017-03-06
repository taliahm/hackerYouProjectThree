
$(function(){
//Functions to get random coordinates for background icons
	getRandomArray = function(array){
		var randomArrayItem = Math.floor(Math.random() * array.length);
		return array[randomArrayItem];
	}

 	function randomNumber (n) {
  		return Math.floor(Math.random() * n);
  	};

	function randomStyle(element){
		var cssOne = randomNumber(100);
		var cssTwo = randomNumber(100);
		var styles = {left: cssOne + "%", top: cssTwo + "%"};
		element.css(styles);
	};

	var divImageArray = $('.background > div.imgContain');

divImageArray.each(function(){
	randomStyle($(this));
});

//Set Result Variables to be used later
	
	var jobResult;
	var loveResult;
	var kidResult;

//Click function to play game
	 $('#play').on('click', function(){
	 	$('.introSection').hide();
	 	$('.homeSection').fadeIn();
	 });
 //Show/Hide instructions on click
	 $('#howToPlay').on('click', function(event) {
	 	event.stopPropagation();
	 	$('.instructions').toggle();	
	 	 });

	 $('.background').on('click', function(){
	 	$('.instructions').hide();
	 })
	 
//Click function to toggle to next question
	 $('#homeButton').on('click', function(){
	 	$('.homeSection').hide();
	 	$('.jobSection').fadeIn();
	 });

//Click function to toggle from Job to Love Section
var allPush = [];
	$('#jobButton').on('click', function(event){
		event.preventDefault();
		var jobAnswer = [$('#job1').val(), $('#job2').val(), $('#job3').val(), $('#job4').val()];
		allPush.push($('#job1').val(), $('#job2').val(), $('#job3').val(), $('#job4').val());
		// console.log(allPush);
		var jobNoRepeats = _.uniq(jobAnswer);
			if (jobAnswer.length !== jobNoRepeats.length){
					$('.jobSection').show();
					$('#alertJob').show();
				}
			else if (jobAnswer.length === jobNoRepeats.length) {
						jobResult = getRandomArray(jobAnswer);
						$('.jobSection').hide();
						$('.loveSection').fadeIn();		

					}
	});  //End of Job Button Event

//Click function to toggle from Love to Kid Section

	$('#loveButton').on('click', function(event){
		event.preventDefault();
		var loveAnswer = [$('#love1').val(), $('#love2').val(), $('#love3').val(), $('#love4').val()];
		allPush.push($('#love1').val(), $('#love2').val(), $('#love3').val(), $('#love4').val());
		// console.log(allPush);
		var loveNoRepeats = _.uniq(loveAnswer);
			if(loveNoRepeats.length !== loveAnswer.length){
				$('.loveSection').show();
				$('#alertLove').show();
			}
			else if (loveNoRepeats.length === loveAnswer.length){
				loveResult = getRandomArray(loveAnswer);
				$('.loveSection').hide();
				$('.kidSection').fadeIn();
			}
	}); //End of Love Button Event

	// Create Array to Show Results on page
	function textToPage(array){
		 var newName = [];
		 // console.log(newName);
		for (var i = 0; i < array.length; i++) {	
			newName.push(`<p class="textResult"> ${array[i]} </p>`)
		}
		return newName;
	};

	function startResultShow(elem){
		elem.fadeIn( "slow", function() {
    		elem.delay(2000).fadeOut("slow", function(){
    			console.log('animation DONE');
    			startResultShow(elem.next());
    		});
  		});
	};

	 var mashArray = ['a mansion', 'an apartment', 'a shack', 'a house'];
//Click function to toggle from Kid Section to Tabulating Section
	$('#kidButton').on('click', function(event){
		event.preventDefault();
		var kidAnswer = [$('#kid1').val(), $('#kid2').val(), $('#kid3').val(), $('#kid4').val()];
		allPush.push($('#kid1').val(), $('#kid2').val(), $('#kid3').val(), $('#kid4').val());
		var kidNoRepeats =_.uniq(kidAnswer);
		if(kidNoRepeats.length !== kidAnswer.length){
			$('.kidSection').show();
			$('#alertKids').show();
		}

		else if (kidNoRepeats.length === kidAnswer.length){
			kidResult = getRandomArray(kidAnswer);
			$('.kidSection').hide();
			$('.tabSection').fadeIn();
			var mashHTML = textToPage(mashArray).concat(textToPage(allPush));
			$('.tab').html(mashHTML);
			console.log(mashHTML);
			var firstP = $('.tab > p:first-child');
			startResultShow(firstP);

			


			// $(this).hide().next("p").show( "slow");
			// $('.tab').html(mashHTML);
			// $('.tab > p').each(function(item){
			// 	console.log($(this)[item]);
				// .toggle(5000, function(){
				// 	p.toggle();
				
				
			};
		
	}); //End of Love Button Event

	//Getting Random Number to display on page
	 var showRandomNumber = Math.ceil(Math.random()*10);
	 $('#randomNum').text(showRandomNumber);

	 //Getting User's fortune
	
	 var mashResult = getRandomArray(mashArray);
//Click function to show final results
	 $('#showResults').on('click', function(){
	 	 $('.tabSection').hide();
	 	 $('.fortuneSection').fadeIn();
		 $('#mashAnswer').text(`You're going to live in ${mashResult}`).delay(3000).fadeIn(500);
		 if (jobResult)
		 $('#jobAnswer').text(`You will work as a(n) ${jobResult}`).delay(500).fadeIn(500);
		 $('#loveAnswer').text(`You will spend your life with ${loveResult}`);
		 $('#kidAnswer').text(`You'll have ${kidResult} kid(s)`);
		 $('.share').append(`<a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Mash%20told%20me%20I'm%20going%20to%20have%20${kidResult}%20kid(s)%20with%20${loveResult}%20http://bit.ly/2lZw6z7">Share your fortune on Twitter</a>`); 
	});
//Restart Click Function
	 $('#restart').on('click', function(){
	 	window.location.reload(true)
	 });

}); //End of jQuery Function


