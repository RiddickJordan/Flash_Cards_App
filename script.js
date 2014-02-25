(function(window, $, undefined){

	$(".card, .footer, .toMenu").toggle();
	
	function initCards(){
		$(".definition").toggle();
		$(".confirm").toggle();

		$(".reveal").click(function(){
			$(".term").toggle();
			$(".definition").toggle();

			$(".confirm").toggle();
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
		console.log(menuHTML);
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
		console.log(deckObject);
		return deckObject;
	}

	
	$('.deckList').html(makeMenu(getDecks(),'deck'));
	$('.deck').click(function(){
		$('.deckList').toggle();
		$('.card, .footer, .toMenu').toggle();
		initCards();
	});

	
 })(window, jQuery);