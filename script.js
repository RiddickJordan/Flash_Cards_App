(function(window, $, undefined){

	var lastScreen = $('.navIntro, .navCollectionMenu, .navDeckMenu, .navTitle, .navCard, .navWrapUp');
	var nextScreen;
	var lastState = "intro";
	menuBtnDestination = "decks";

	function flipCard(_flipTo){
		$(".question, .answer, .reveal, .confirm").toggle();
		$('.card').toggleClass("answerTint");
	}

	function showScreen(_state){
		switch (_state){
			case "intro":
				nextScreen = $(".navIntro");
				break;
			case "collections":
				$('.title h1').text("ShuffleDeck Collections");
				nextScreen = $('.navCollectionMenu');
				break;
			case "decks":
				$('.title h1').text("REVIEW SESSION: Glaucoma Basics");
				$('.toMenu div').text("BACK");
				menuBtnDestination = "collections";
				nextScreen = $('.navDeckMenu');
				break;
			case "title":
				nextScreen = $('.navTitle');
				break;
			case "cards":
				$('.title h1').text("REVIEW SESSION: Glaucoma Basics");
				$('.toMenu div').text("DECKS");
				cardIndex = 0;
				showNextCard();
				if( $('.card').hasClass("answerTint") ){
					flipCard();
				}
				menuBtnDestination = "decks";
				nextScreen = $('.navCard');
				break;
			case "wrapUp":
				nextScreen = $('.navWrapUp');
				break;
		}
		$('.header').removeClass(lastState);
		$('.header').addClass(_state);
		lastState = _state;
		$(lastScreen).toggle();
		$(nextScreen).fadeToggle();
		lastScreen = nextScreen;
	}

	var cardIndex = 0;
	var cardCount = 0;
	function showNextCard(){
		if(cardIndex == cardCount){
			showScreen("wrapUp");
		}
		else{
			thisQ = deck[cardIndex]['q']['text'];
			thisA = deck[cardIndex]['a']['text'];
			$('.question p').text(thisQ);
			$('.answer p').text(thisA); 
			$('.icon h5').text(""+(cardIndex+1)+" of "+cardCount);
			resizeMyText($('.question p'));
			resizeMyText($('.answer p'));
			cardIndex += 1;
			flipCard();
		}
	}


	function makeMenu (dataArray, type) {
		menuCount = dataArray.length;
		menuHTML = '';
		for (i=0;i<menuCount; i++) {
			if (i == 0) {menuHTML = menuHTML +'<div class="deck"><div class="icon"><div class="circle"></div></div><div class="title"><h2>' + 'Glaucoma Review' + '</h2></div></div>\n'; }
			else{menuHTML = menuHTML +'<div class="deck"><div class="icon"><div class="circle"></div></div><div class="title"><h2>' + dataArray[i].name + '</h2></div></div>\n'; }
		}
		return menuHTML;
	}

	function getDecks(_menuType) {
		var deckCount = 10;
		var deckObject = [];
		for (i=0;i<deckCount; i++) {
			deckInfo = {"name": _menuType+" " + i, 'id': _menuType+"-" + i,
			'description': "Description here"};
			deckObject[i]= deckInfo;
		}
		//console.log(deckObject);
		return deckObject;
	}

	function buildCollectionMenu(_collections){
		collectionsMenuHTML = '';
		for(var key in _collections){
			console.log(_collections[key]);
			collectionsMenuHTML = collectionsMenuHTML +'<div class="deck"><div class="icon"><div class="circle"></div></div><div class="title"><h2>' + _collections[key].name + ' ('+_collections[key].decklist.length+ ')</h2></div></div>\n';
		}

		return collectionsMenuHTML;
	}

	var deck = {};
	function defineDeck(d){
		deck = d.decks["1"].cards;
		cardCount = deck.length;
		showNextCard();
	};

	function resizeMyText(_obj){
		var $quote = _obj;
	    var $numWords = $quote.text().split(" ").length;
	    if (($numWords < 20)) {
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
	var theJSON = {};
	function makeGlobal(_json){
		theJSON = _json;
	}

	function init(){
		//Load JSON that will define cards
		$.getJSON("sd_v2.json", function(d) {
			console.log(d);
			$('.collectionsList').html(buildCollectionMenu(d.collections));
			$('.collectionsList .deck').click(function(){
				showScreen("decks");
			});

			defineDeck(d);
    	}).fail( function(d, textStatus, error) {
        	console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    	});

		//Generate Collections Menu
		

		//Generate Deck Menu
		$('.deckList').html(makeMenu(getDecks('Deck'),'deck'));


		//Navigation click handlers
		
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

    	//Set initial state of card system
		$(".answer, .confirm, .wrapUp").toggle();

		//Card interaction click handlers
		$(".reveal").click(function(){
			flipCard();
		});
		$(".confirm").click(function(){
			showNextCard();
		});

		//Navigate to Into Slide
		showScreen("intro");
		//Move past Intro Slide after 5 secons
		setTimeout(function(){
			showScreen('collections');
		},5000);
	}

	init();
 })(window, jQuery);