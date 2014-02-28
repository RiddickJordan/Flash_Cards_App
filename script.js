(function(window, $, undefined){

	$(".card, .footer, .toMenu, .titleSlide").toggle();

	function showScreen(_state){
		//HIDE ERRYTHING
		switch (_state){
			case "menu":
				//show that menu
				break;
			case "title":
				//show that title
				break;
			case "card":
				//show that card
				break;
		}
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
		$('.term p').text(thisQ);
		$('.definition p').text(thisA); 

		cardIndex += 1;

		resizeMyText($('.term p'));
		resizeMyText($('.definition p'));
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

		$(".definition").toggle();
		$(".confirm").toggle();

		$(".reveal").click(function(){
			$(".term, .definition, .confirm").toggle();
			$(this).toggle();
		});

		$(".confirm").click(function(){
			showNextCard();
			$(".term, .definition, .reveal").toggle();
			$(this).toggle();
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

	
	$('.deckList').html(makeMenu(getDecks(),'deck'));

	$('.deck').click(function(){
		$('.deckList, .titleSlide').toggle();
	});

	$('.startDeck').click(function(){
		initCards();
		$('.titleSlide, .card, .footer, .toMenu').toggle();
	});

	$('.toMenu').click(function(){
		$('.card, .footer, .toMenu, .deckList').toggle();
		
	});

	
 })(window, jQuery);