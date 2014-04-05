(function(window, $, undefined){

	var lastScreen = $('.navIntro, .navCollectionMenu, .navDeckMenu, .navTitle, .navCard, .navWrapUp, .transitions');
	var nextScreen;
	var lastState = "intro";
	var menuBtnDestination = "decks";

	function flipCard(){
		$(".question, .answer, .reveal, .confirm").toggle();
		$('.card').toggleClass("answerTint");
	}

	function buildMenus(_collections){
		var collectionsMenuHTML = '';
		var deckMenuHTML = '';
		for(var key in _collections){
			collectionsMenuHTML = collectionsMenuHTML +'<div class="deck"><div class="icon"><div class="circle"></div></div><div class="title"><h2>' + _collections[key].name + ' ('+_collections[key].decklist.length+ ')</h2></div></div>\n';
			for (var i = 0; i < _collections[key].decklist.length; i++){
				deckMenuHTML += '<div id="'+ _collections[key].decklist[i] +'"class="deck '+_collections[key].name+'"><div class="icon"><div class="circle"></div></div><div class="title"><h2>deck id is ' + _collections[key].decklist[i] + '</h2></div></div>\n';
			}
		}
		for(i=1; i<10; i++){
			collectionsMenuHTML = collectionsMenuHTML +'<div class="deck"><div class="icon"><div class="circle"></div></div><div class="title"><h2>Empty Collection '+i+' (0)</h2></div></div>\n';
		}
		$('.deckList').html(deckMenuHTML);
		$('.collectionsList').html(collectionsMenuHTML);
	}

	var cardIndex = 0;
	var cardCount = 0;
	function showNextCard(){
		if(cardIndex == cardCount){
			showScreen("wrapUp");
		}
		else{
			thisQ = deck[cardIndex]['q']['image'] === "" ? '<p>' + deck[cardIndex]['q']['text'] + '</p>': '<img src="'+deck[cardIndex]['q']['image']+'">';
			thisA = deck[cardIndex]['a']['image'] === "" ? '<p>' + deck[cardIndex]['a']['text'] + '</p>': '<img src="'+deck[cardIndex]['a']['image']+'">';
			$('.question .cardContent').html(thisQ);
			$('.answer .cardContent').html(thisA);
			$('.icon h5').text(""+(cardIndex+1)+" of "+cardCount);
			resizeMyText($('.question p'));
			resizeMyText($('.answer p'));
			cardIndex += 1;
			flipCard();
		}
	}

	var deck = {};
	var globalJSON = {};
	function defineDeck(d){
		globalJSON = d;
	}

	function setDeck(_id){
		deck = globalJSON.decks[_id].cards;
		cardCount = globalJSON.decks[_id].cardCount;
		console.log(globalJSON.decks[_id]);
		$('#name').text(globalJSON.decks[_id].name);
		$('#description').text('DECK: '+ globalJSON.decks[_id].description);
		$('#cardCount').text(globalJSON.decks[_id].cardCount + ' questions');
		showNextCard();
	}

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

	function showScreen(_state, _id){
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
				setDeck(_id);
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
			default:
				alert("switch case error");
				break;
		}
		$('.header').removeClass(lastState);
		$('.header').addClass(_state);
		lastState = _state;
		$('.transitions').toggle();
		$(lastScreen).toggle();
		$(nextScreen).fadeToggle();
		$('.transitions').fadeToggle();
		lastScreen = nextScreen;
	}

	function init(){
		//Load JSON that will define cards
		$.getJSON("sd_v2.json", function(d) {
			buildMenus(d.collections);
			$('.collectionsList .deck').click(function(){
				showScreen("decks");
			});
			$('.deckList .deck').click(function(){
				showScreen("title", this.id);
			});
			defineDeck(d);
    	}).fail( function(d, textStatus, error) {
        	alert("getJSON failed, status: " + textStatus + ", error: "+error);
    	});
		//Navigation click handlers
		
		
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