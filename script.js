(function(window, $, undefined){

	var lastScreen = $('.navIntro, .navCollectionMenu, .navDeckMenu, .navTitle, .navCard');
	var nextScreen;
	var lastState = "intro";
	menuBtnDestination = "decks";
	function showScreen(_state){
		$(lastScreen).toggle()
		switch (_state){
			case "intro":
				nextScreen = $('.navIntro');
				break;
			case "collections":
				nextScreen = $('.navCollectionMenu');
				break;
			case "decks":
				nextScreen = $('.navDeckMenu');
				menuBtnDestination = "collections";
				break;
			case "title":
				nextScreen = $('.navTitle');
				break;
			case "cards":
				menuBtnDestination = "decks";
				nextScreen = $('.navCard');
				cardIndex = 0;
				break;
		}
		$('.header').removeClass(lastState);
		$('.header').addClass(_state);
		lastState = _state;
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

	var deck = {};
	function defineDeck(d){
		deck = d.decks["1"].cards;
		showNextCard();
	};


	function clearIntro(){
		showScreen('collections');
	}

	function init(){
		//show splash screen

		//Generate Collections Menu
		$('.collectionsList').html(makeMenu(getDecks(),'deck'));

		//Generate Deck Menu
		$('.deckList').html(makeMenu(getDecks(),'deck'));

		//Load JSON that will define cards
		$.getJSON("sd.json", function(d) {
			defineDeck(d);
    	}).fail( function(d, textStatus, error) {
        	console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    	});

		//Navigation click handlers
		$('.collectionsList .deck').click(function(){
			showScreen("decks");
		});
		$('.deckList .deck').click(function(){
			showScreen("title");
		});
		$('.startDeck').click(function(){
			showScreen("cards");
		});
		$('.abortDeck').click(function(){
			showScreen("decks");
		});
		$('.toMenu').click(function(){
			showScreen(menuBtnDestination);
		});

    	//Set initial state of card
		$(".answer, .confirm").toggle();

		//Card interaction click handlers
		$(".reveal").click(function(){
			flipCard();
		});
		$(".confirm").click(function(){
			showNextCard();
			flipCard();
		});

		//Navigate to Into Slide
		showScreen("intro");
		//Move past Intro Slide after 5 secons
		setTimeout(clearIntro,1000);
	}

	init();
 })(window, jQuery);