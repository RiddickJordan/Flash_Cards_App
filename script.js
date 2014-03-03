(function(window, $, undefined){

	var lastScreen = $('.forTitle, .forCard, .forMenu');
	var nextScreen;
	function showScreen(_state){
		$(lastScreen).toggle()
		switch (_state){
			case "menu":
				nextScreen = $('.forMenu');
				break;
			case "title":
				nextScreen = $('.forTitle');
				break;
			case "card":
				nextScreen = $('.forCard');
				cardIndex = 0;
				break;
		}
		$(nextScreen).toggle();
		lastScreen = nextScreen;
	}

	function flipCard(){
		$(".question, .answer, .reveal, .confirm").toggle();
	}

	function resizeMyText(_obj){
		var $quote = _obj;
	    
	    var $numWords = $quote.text().split(" ").length;
	    console.log($numWords)
	    
	    if (($numWords >= 1) && ($numWords < 8)) {
	        $quote.css("font-size", "5rem");
	    }
	    else if (($numWords >= 8) && ($numWords < 20)) {
	        $quote.css("font-size", "4rem");
	    }
	    else if (($numWords >= 20) && ($numWords < 30)) {
	        $quote.css("font-size", "3.5rem");
	    }
	    else if (($numWords >= 30) && ($numWords < 40)) {
	        $quote.css("font-size", "3rem");
	    }
	    else {
	        $quote.css("font-size", "2rem");
	    }
	}

	var cardIndex = 0;
	function showNextCard(){
		thisQ = deck[cardIndex]['q']['text'];
		thisA = deck[cardIndex]['a']['text'];
		$('.question p').text(thisQ);
		$('.answer p').text(thisA); 

		cardIndex += 1;

		resizeMyText($('.question p'));
		resizeMyText($('.answer p'));
	}


	var deck = {};
	function defineDeck(d){
		deck = d.decks["1"].cards;
		console.log(deck);
		showNextCard();
	};

	function initCards(){
		$.getJSON("sd.json", function(d) {
			defineDeck(d);
    	}).fail( function(d, textStatus, error) {
        	console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    	});

		$(".answer").toggle();
		$(".confirm").toggle();

		$(".reveal").click(function(){
			flipCard();
		});

		$(".confirm").click(function(){
			showNextCard();
			flipCard();
		});
	}

	function makeMenu (dataArray, type) {
		menuCount = dataArray.length;
		//menuHTML = "<ul>\n";
		menuHTML = '';
		for (i=0;i<menuCount; i++) {
			if (i == 0) {menuHTML = menuHTML +'<div class="deck"><div class="icon"><div class="circle"></div></div><div class="title"><h2>' + 'Glaucoma Review' + '</h2></div></div>\n'; }
			else{menuHTML = menuHTML +'<div class="deck"><div class="icon"><div class="circle"></div></div><div class="title"><h2>' + dataArray[i].name + '</h2></div></div>\n'; }
			//if (i == 0) {menuHTML = menuHTML + '<li class="selectionMenu" menuType="' + type + '" itemID="' +  dataArray[i].id + '">' + 'Glaucoma Review' + "</li>\n";}
			//else {menuHTML = menuHTML + '<li class="selectionMenu" menuType="' + type + '" itemID="' +  dataArray[i].id + '">' + dataArray[i].name + "</li>\n";}
		}
		//menuHTML = menuHTML + '</ul>';
		//console.log(menuHTML);
		return menuHTML;
	}

	function getDecks() {
		var deckCount = 10;
		var deckObject = [];
		for (i=0;i<deckCount; i++) {
			deckInfo = {"name": "Deck " + i, 'id': "deck-" + i,
			'description': "Description here"};
			deckObject[i]= deckInfo;
		}
		//console.log(deckObject);
		return deckObject;
	}

	function init(){
		initCards();
		$('.deckList').html(makeMenu(getDecks(),'deck'));
		showScreen("menu");

		$('.deck').click(function(){
			showScreen("title");
		});

		$('.startDeck').click(function(){
			
			showScreen("card");
		});

		$('.toMenu').click(function(){
			showScreen("menu");
		});
	}

	init();
	
 })(window, jQuery);