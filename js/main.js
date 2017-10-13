/*** Game and design by RedFoc ***/

var canvas, stage, curState;

canvas = document.getElementById("canvas");
stage = new createjs.Stage(canvas);

createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", tick);

function tick(){
	stage.update();
}

var deal, hit, double, stand, buttons, chips, chipsSheet, btnPlay, btnClear;
var txtCash;
var Cash = 500; //Default cash/money value
var txtPlayer;
var txtBet;
var playerValue;
var Bet = 10;
var cardPack;
var Gameover; //Container to store push/win/lose or blackjack image
var chipsMove = new createjs.Container();
var Cards = new createjs.Container();
var Sound = true;
var isFullscreen = false;
var saveMoney = false; //Set 'true' if you want to save current player money using localStorage

var progressbar;

var bitmapFont = new createjs.SpriteSheet({
	"animations": {
		"0": {"frames": [0]},
		"1": {"frames": [1]},
		"2": {"frames": [2]},
		"3": {"frames": [3]},
		"4": {"frames": [4]},
		"5": {"frames": [5]},
		"6": {"frames": [6]},
		"7": {"frames": [7]},
		"8": {"frames": [8]},
		"9": {"frames": [9]},
	},
	"images": ["font/spritefont.png"],
	"frames": {"width":31,"height":40,"count":10,"regX":15,"regY":20}
});

//Load all assets before game start
function load(){
	var bg = new createjs.Bitmap('assets/img/bgMenu.png');

	progressbar = new createjs.Shape();
	progressbar.graphics.beginFill('white').drawRect(0,0,752,15);
	progressbar.setTransform(264, 440);

	border = new createjs.Shape();
	border.graphics.beginStroke('white').drawRect(0,0,757,19);
	border.setTransform(262, 438);

	var title = new createjs.Bitmap('assets/img/gameTitle.png');
	title.setTransform(640, 244);
	title.regX = 447;
	title.regY = 130;

	stage.addChild(bg,title,progressbar, border);

	manifest = [
		{src:"img/bgMenu.png", id: "bgMenu"},
		{src:"img/moneyBar.png", id: "moneyBar"},
		{src:"img/btnMenu.png", id: "btnMenu"},
		{src:"img/btnFullscreen.png", id: "btnFullscreen"},
		{src:"img/btnSound.png", id: "btnSound"},
		{src:"img/btnPlay.png", id: "btnPlay"},
		{src:"img/btnClear.png", id: "btnClear"},
		{src:"img/bgGame.png", id: "bgGame"},
		{src:"img/gameTitle.png", id: "gameTitle"},
		{src:"img/cards.png", id: "cards"},
		{src:"img/hit.png", id: "hit"},
		{src:"img/stand.png", id: "stand"},
		{src:"img/deal.png", id: "deal"},
		{src:"img/double.png", id: "double"},
		{src:"img/chips.png", id: "chips"},
		{src:"img/betBar.png", id: "betBar"},
		{src:"img/valueBar.png", id: "valueBar"},
		//
		{src:"img/blackjack.png", id: "blackjack"},
		{src:"img/push.png", id: "push"},
		{src:"img/win.png", id: "win"},
		{src:"img/lose.png", id: "lose"},
		//CardsClubs
		{src:"img/cardClubs2.png", id:"cardClubs2"},
		{src:"img/cardClubs3.png", id:"cardClubs3"},
		{src:"img/cardClubs4.png", id:"cardClubs4"},
		{src:"img/cardClubs5.png", id:"cardClubs5"},
		{src:"img/cardClubs6.png", id:"cardClubs6"},
		{src:"img/cardClubs7.png", id:"cardClubs7"},
		{src:"img/cardClubs8.png", id:"cardClubs8"},
		{src:"img/cardClubs9.png", id:"cardClubs9"},
		{src:"img/cardClubs10.png", id:"cardClubs10"},
		{src:"img/cardClubsA.png", id:"cardClubsA"},
		{src:"img/cardClubsJ.png", id:"cardClubsJ"},
		{src:"img/cardClubsQ.png", id:"cardClubsQ"},
		{src:"img/cardClubsK.png", id:"cardClubsK"},
		//CardsDiamonds
		{src:"img/cardDiamonds2.png", id:"cardDiamonds2"},
		{src:"img/cardDiamonds3.png", id:"cardDiamonds3"},
		{src:"img/cardDiamonds4.png", id:"cardDiamonds4"},
		{src:"img/cardDiamonds5.png", id:"cardDiamonds5"},
		{src:"img/cardDiamonds6.png", id:"cardDiamonds6"},
		{src:"img/cardDiamonds7.png", id:"cardDiamonds7"},
		{src:"img/cardDiamonds8.png", id:"cardDiamonds8"},
		{src:"img/cardDiamonds9.png", id:"cardDiamonds9"},
		{src:"img/cardDiamonds10.png", id:"cardDiamonds10"},
		{src:"img/cardDiamondsA.png", id:"cardDiamondsA"},
		{src:"img/cardDiamondsJ.png", id:"cardDiamondsJ"},
		{src:"img/cardDiamondsQ.png", id:"cardDiamondsQ"},
		{src:"img/cardDiamondsK.png", id:"cardDiamondsK"},
		//CardsHearts
		{src:"img/cardHearts2.png", id:"cardHearts2"},
		{src:"img/cardHearts3.png", id:"cardHearts3"},
		{src:"img/cardHearts4.png", id:"cardHearts4"},
		{src:"img/cardHearts5.png", id:"cardHearts5"},
		{src:"img/cardHearts6.png", id:"cardHearts6"},
		{src:"img/cardHearts7.png", id:"cardHearts7"},
		{src:"img/cardHearts8.png", id:"cardHearts8"},
		{src:"img/cardHearts9.png", id:"cardHearts9"},
		{src:"img/cardHearts10.png", id:"cardHearts10"},
		{src:"img/cardHeartsA.png", id:"cardHeartsA"},
		{src:"img/cardHeartsJ.png", id:"cardHeartsJ"},
		{src:"img/cardHeartsQ.png", id:"cardHeartsQ"},
		{src:"img/cardHeartsK.png", id:"cardHeartsK"},
		//CardsSpades
		{src:"img/cardSpades2.png", id:"cardSpades2"},
		{src:"img/cardSpades3.png", id:"cardSpades3"},
		{src:"img/cardSpades4.png", id:"cardSpades4"},
		{src:"img/cardSpades5.png", id:"cardSpades5"},
		{src:"img/cardSpades6.png", id:"cardSpades6"},
		{src:"img/cardSpades7.png", id:"cardSpades7"},
		{src:"img/cardSpades8.png", id:"cardSpades8"},
		{src:"img/cardSpades9.png", id:"cardSpades9"},
		{src:"img/cardSpades10.png", id:"cardSpades10"},
		{src:"img/cardSpadesA.png", id:"cardSpadesA"},
		{src:"img/cardSpadesJ.png", id:"cardSpadesJ"},
		{src:"img/cardSpadesQ.png", id:"cardSpadesQ"},
		{src:"img/cardSpadesK.png", id:"cardSpadesK"},
		//Card Back
		{src:"img/cardBack_red4.png", id:"cardBack_red4"},
		//Load all sound
		{src:"sound/Click.ogg", id:"Click"},
		{src:"sound/cardPlace.ogg", id:"cardPlace"},
		{src:"sound/chipsCollide.ogg", id:"chipsCollide"},
		{src:"sound/chipsHandle.ogg", id:"chipsHandle"},
		{src:"sound/cardShove.ogg", id:"cardShove"},
		{src:"sound/Push.ogg", id:"Push"},
		{src:"sound/youWin.ogg", id:"youWin"},
		{src:"sound/youLose.ogg", id:"youLose"},
	];

	preload = new createjs.LoadQueue(true);
	preload.installPlugin(createjs.Sound);
	preload.on("complete", handleComplete);
	preload.on("progress", loadProgress);
	preload.loadManifest(manifest, true,"assets/");
}

function loadProgress(){
	progressbar.scaleX = preload.progress;
}
//All files loaded
function handleComplete(){
	stage.removeAllChildren();
	menu();
}
//Shortcut to call/show image using preload
function img(e){
	return preload.getResult(e);
}
//Shortcut function to play sound
function playSound(id){
	if(Sound == true){
		createjs.Sound.play(id);
	}
}

function menu(){
	curState = "menu";
	
	var Background = new createjs.Bitmap(img("bgMenu"));

	stage.addChild(Background);

	var title = new createjs.Bitmap(img('gameTitle'));
	title.setTransform(640, 244);
	title.regX = title.getBounds().width/2;
	title.regY = title.getBounds().height/2;

	btnPlay = new createjs.Bitmap(img("btnPlay"));
	btnPlay.setTransform(640, 458);
	btnPlay.regX = btnPlay.getBounds().width/2;
	btnPlay.regY = btnPlay.getBounds().height/2;

	stage.addChild(btnPlay, title);

	btnPlay.addEventListener("click", Play);

	//Load saved money if localStorage (saveMoney) 'true'.
	if(saveMoney == true){
		var savedCash = localStorage.getItem('cash');
		if(savedCash !== null){
			Cash = savedCash;
		}
	}

	drawHeader();
}

function Play(){
	playSound('Click');
	createjs.Tween.get(btnPlay)
		.to({scaleX: 0.9,scaleY:0.9},100)
		.to({scaleX: 1,scaleY:1},100)
		.call(gameInit);
}

function gameInit(){
	stage.removeAllChildren();
	curState = "game";

	game();

	buttons = stage.addChild(new createjs.Container());

	deal = new createjs.Bitmap(img('deal'));
	deal.setTransform(145, 640);
	deal.regX = deal.getBounds().width/2;
	deal.regY = deal.getBounds().height/2;
	deal.name = 'deal';

	double = new createjs.Bitmap(img('double'));
	double.setTransform(924, 640);
	double.regX = double.getBounds().width/2;
	double.regY = double.getBounds().height/2;
	double.name = 'double';

	stand = new createjs.Bitmap(img('stand'));
	stand.setTransform(145, 640);
	stand.regX = stand.getBounds().width/2;
	stand.regY = stand.getBounds().height/2;
	stand.name = 'stand';

	hit = new createjs.Bitmap(img('hit'));
	hit.setTransform(1120, 640);
	hit.regX = hit.getBounds().width/2;
	hit.regY = hit.getBounds().height/2;
	hit.name = 'hit';

	chipsSheet = new createjs.SpriteSheet({
		"images": [img('chips')],
		"frames": {"width":100,"height":100,"count":4,"regX":50,"regY":50},
		"animations": {
			"animate": [0,3]
		}
	})

	chips = stage.addChild(new createjs.Container());

	for(i=4; i>0; i--){
		var chip = new createjs.Sprite(chipsSheet);
		chip.x = 744+(112*i);
		chip.y = 640;
		chip.gotoAndStop(i-1);
		chips.addChild(chip);
		chip.on('click', chipsClick);
	}

	buttons.addChild(deal,double,hit,stand);

	buttons.on('click', buttonClick);

	buttonVisible();
}

var valueBar1, valueBar2;

function game(){
	var Background = new createjs.Bitmap(img("bgGame"));
	stage.addChild(Background);

	valueBar1 = new createjs.Bitmap(img('valueBar'));
	valueBar1.setTransform(424, 432);
	valueBar1.regX = valueBar1.getBounds().width/2;
	valueBar1.regY = valueBar1.getBounds().height/2;

	valueBar2 = new createjs.Bitmap(img('valueBar'));
	valueBar2.setTransform(424, 208);
	valueBar2.regX = valueBar2.getBounds().width/2;
	valueBar2.regY = valueBar2.getBounds().height/2;

	cardPack = new createjs.Bitmap(img("cards"));
	cardPack.setTransform(1128, 220);
	cardPack.regX = cardPack.getBounds().width/2;
	cardPack.regY = cardPack.getBounds().height/2;

	var betBar = new createjs.Bitmap(img('betBar'));
	betBar.setTransform(640, 522);
	betBar.regX = betBar.getBounds().width/2;
	betBar.regY = betBar.getBounds().height/2;

	Bet = 10;

	txtBet = new createjs.BitmapText(Bet.toString(), bitmapFont);
	txtBet.textAlign = "center";
	txtBet.setTransform(630, 536);
	txtBet.scaleX = txtBet.scaleY = 0.7;

	btnClear = new createjs.Bitmap(img('btnClear'));
	btnClear.setTransform(176, 424);
	btnClear.regX = btnClear.getBounds().width/2;
	btnClear.regY = btnClear.getBounds().height/2;

	btnClear.on('click', function(){
		Bet = 10;
		updateBet();

		btnClear.alpha = 0;
		chipsMove.removeAllChildren();
	});

	txtPlayer = new createjs.BitmapText("", bitmapFont);
	txtPlayer.setTransform(valueBar1.x, valueBar1.y);
	txtPlayer.scaleX = txtPlayer.scaleY = 0.8;
	txtPlayer.textAlign = "center";

	txtDealer = new createjs.BitmapText("", bitmapFont);
	txtDealer.setTransform(valueBar2.x, valueBar2.y);
	txtDealer.scaleX = txtDealer.scaleY = 0.8;
	txtDealer.textAlign = "center";

	stage.addChild(Cards, cardBack, cardPack, chipsMove);
	stage.addChild(valueBar1, valueBar2, txtPlayer, betBar, txtBet, txtDealer, btnClear);

	//Hide valueBar on game start
	valueBar('hide');

	Gameover = stage.addChild(new createjs.Container());

	drawHeader();
}

function valueBar(e){
	if(e == 'hide'){
		valueBar1.alpha = valueBar2.alpha = 0;
		txtDealer.text = txtPlayer.text = "";
	}
	else{
		valueBar1.alpha = valueBar2.alpha = 1;
	}
}

function drawHeader(){

	var moneyBar = new createjs.Bitmap(img("moneyBar"));
	moneyBar.setTransform(148, 44);
	moneyBar.regX = moneyBar.getBounds().width/2;
	moneyBar.regY = moneyBar.getBounds().height/2;

	var btnSound = new createjs.Bitmap(img("btnSound"));
	btnSound.setTransform(1144, 44);
	btnSound.regX = btnSound.getBounds().width/2;
	btnSound.regY = btnSound.getBounds().height/2;
	btnSound.name = 'sound';

	var btnMenu = new createjs.Bitmap(img("btnMenu"));
	btnMenu.setTransform(1072, 44);
	btnMenu.regX = btnMenu.getBounds().width/2;
	btnMenu.regY = btnMenu.getBounds().height/2;
	btnMenu.name = 'menu';

	var btnFullscreen = new createjs.Bitmap(img("btnFullscreen"));
	btnFullscreen.setTransform(1216, 44);
	btnFullscreen.regX = btnFullscreen.getBounds().width/2;
	btnFullscreen.regY = btnFullscreen.getBounds().height/2;
	btnFullscreen.name = 'fullscreen';

	buttonUI = new createjs.Container();
	stage.addChild(moneyBar,buttonUI);

	if(curState == "game"){
		buttonUI.addChild(btnMenu);
	}

	buttonUI.addChild(btnSound,btnFullscreen);
	buttonUI.on('click', btnUItween);

	//Fullscreen button
	btnFullscreen.on('click', function(){
		if(isFullscreen == false){
			screenfull.request();
			isFullscreen = true;
		}
		else {
			screenfull.exit();
			isFullscreen = false;
		}
	})

	if(Sound == false){
		btnSound.alpha = 0.4;
	}

	// Current Cash
	txtCash = new createjs.BitmapText(Cash.toString(), bitmapFont);
	txtCash.setTransform(110, 45);
	txtCash.scaleX = txtCash.scaleY = 0.7;
	stage.addChild(txtCash);

	
}

function buttonClick(e){
	playSound('Click');

	if(isReady == true && curPlayer == "player"){
		isReady = false;
		createjs.Tween.get(e.target)
			.to({scaleX:0.8, scaleY:0.8},100)
			.to({scaleX:1, scaleY:1},100)
			.call(function(){
				var name = e.target.name;
				
				//Button click
				if(name == "deal"){
					if(Cash > 0){
						Deal();
					}
					//Show the alert if cash equal to 0
					else{
						alert("YOU DON'T HAVE ENOUGH MONEY!");
					}
				}
				else if(name == "stand"){
					if(curPlayer == "player"){
						Dealer();
					}
				}
				else if(name == "double"){
					Double();
				}
				else if(name == "hit"){
					double.alpha = 0;

					if(isTween == false && curPlayer == "player"){
						Hit();
					}
				}
			})
	}
}

var chipsReady = true;

//On chip clicked
function chipsClick(e){
	var value = e.target.currentFrame;

	var result = checkBetValue(value);

	if(Bet <= Cash-result && chipsReady == true){
		chipsReady = false;
		playSound('chipsHandle');
		createjs.Tween.get(e.target)
			.to({scaleX:0.9, scaleY:0.9},100)
			.to({scaleX:1, scaleY:1},100)
			.call(function(){
				setBet(value);
				spawnChips(value);
				chipsReady = true;
			});
	}
	else if(Bet > Cash-result){
		alert("YOU DON'T HAVE ENOUGH MONEY!");
	}
}

//Checking if current bet les than cash to avoid minus cash/money
function checkBetValue(e){
	//10
	if (e == 0){
		return 10;
	}
	//20
	else if (e == 1){
		return 20;
	}
	//50
	else if (e == 2){
		return 50;
	}
	//100
	else if (e == 3){
		return 100;
	}
}
//Spawn and animate chips
function spawnChips(e){
	var randX = Math.round(Math.random()*150+100);
	var randY = Math.round(Math.random()*200+150);

	var chip = new createjs.Sprite(chipsSheet);
	chip.gotoAndStop(e);
	chip.x = -50;
	chip.y = 260;
	chipsMove.addChild(chip);

	createjs.Tween.get(chip)
		.to({x:randX, y:randY}, 300)
		.call(function(){
			playSound('chipsCollide');
		})
}

function setBet(e){
	//10
	if (e == 0){
		Bet += 10;
	}
	//20
	else if (e == 1){
		Bet += 20;
	}
	//50
	else if (e == 2){
		Bet += 50;
	}
	//100
	else if (e == 3){
		Bet += 100;
	}

	updateBet();

	if(btnClear.alpha == 0){
		btnClear.alpha = 1;
	}
}


function updateBet(){
	txtBet.text = Bet.toString();
	txtBet.regX = txtBet.getBounds().width/2;
	txtBet.x = canvas.width/2+12;
}

var buttonUI;

function btnUItween(e){
	var child = e.target;
	createjs.Tween.get(child)
		.to({scaleX:0.9,scaleY:0.9},100)
		.to({scaleX:1,scaleY:1},100)
		.call(function(){
			btnUI(e);
		})
}

function btnUI(e){
	var name = e.target.name;
	
	if(name == 'menu'){
		//Go to main menu
		stage.removeAllChildren();
		chipsMove.removeAllChildren();
		Cards.removeAllChildren();
		cardBack.removeAllChildren();
		menu();
	}
	else if(name == 'sound'){
		//Set sound
		if(Sound == true){
			Sound = false;
			e.target.alpha = 0.4;
		}
		else {
			Sound = true;
			e.target.alpha = 1;
		}
	}
}

function updateCash(){
	txtCash.text = Cash.toString();

	//Save current money
	if(saveMoney == true){
		localStorage.setItem('cash', Cash);
	}
}

function Deal(){
	cardReset();
	valueBar('show');

	btnClear.alpha = 0;

	playerValue = 0;

	Hit();

	Cash -= Bet;
	updateCash();

	hit.alpha = stand.alpha = double.alpha = 1;
	deal.alpha = 0;
	chips.alpha = 0;

	if(Bet == 10 && chipsMove.children.length == 0){
		spawnChips(0);
	}

	if(Cash < Bet*2){
		double.alpha = 0;
	}
}

function Double(){
	Cash -= Bet;
	Bet *= 2;
	updateBet();
	updateCash();
	Hit();

	if(playerValue <= 21){
		Dealer();
	}
}

function cardReset(){
	var max = Cards.children.length;

	Cards.removeAllChildren();
	cardBack.removeAllChildren();
	Gameover.removeAllChildren();

	playerValue = 0;
	dealerValue = 0;

	playerHitCount = 0;
	dealerHitCount = 0;
}

function generateCard(){

	var rand = Math.round(Math.random()*4);

	if (rand == 3) {
		var rand2 = Math.round(Math.random()*3+1);

		if(rand2 == 1) {
			return "A";
		}

		if(rand2 == 2) {
			return "J";
		}

		if(rand2 == 3) {
			return "Q";
		}

		if(rand2 == 4) {
			return "K";
		}
	}

	else {
		var value = Math.round(Math.random()*8+2);
		return value;
	}
}

function Hit(){

	var random =  generateCard();
	playerValue += checkCard(random);

	playerHitCount++;

	addCard('player', random, playerHitCount);

	if (playerValue > 21){
		flipCard(dealerFlip.a, dealerFlip.b);
		setTimeout(checkWinner, 800);
	}
}

curPlayer = "player";

function checkCard(e){
	if(e <= 10){
		return e;
	}

	else{
		if(e == "J" || e == "Q" || e == "K") {
			return 10;
		}
		else if(e == "A"){
			if(playerHitCount <= 1 || dealerHitCount <= 1){
				return 11;
			}
			else {
				return 1;
			}
		}
	}
}

var dealerValue, dealerValueVisible, txtDealer;
var playerHitCount = 0;
var dealerHitCount = 0;

function Dealer(){
	curPlayer = "dealer";

	stage.addChild(txtDealer);

	flipCard(dealerFlip.a, dealerFlip.b);
	if(dealerValue < 18){
		dealerHit();
	}
	else {
		setTimeout(checkWinner, 500);
	}
}

function dealerHit(){
	var random = generateCard();
	dealerValue += checkCard(random);
	dealerHitCount++;

	addCard('dealer', random, dealerHitCount);
}

function buttonVisible(){
	hit.alpha = stand.alpha = double.alpha = 0;
	deal.alpha = 1;
	chips.alpha = 1;

	isReady = true;
	curPlayer = "player";
	btnClear.alpha = 0;

	valueBar('hide');
}

function checkWinner(){
	hit.alpha = double.alpha = stand.alpha = 0;

	if (playerValue == dealerValue){
		push();
	}

	else if (playerValue > dealerValue){
		
		if (playerValue > 21){
			playerLose();
		}

		else if (playerValue <= 21){
			playerWin();
		}
	}

	else if (playerValue < dealerValue){

		if (dealerValue <= 21) {
			playerLose();
		}

		else if (dealerValue > 21){
			playerWin();
		}
	}

	setTimeout(cardsUp, 4000);
}
//Move all cards to top of canvas
function cardsUp(){
	var num = Cards.children.length;
	Gameover.removeAllChildren();

	for(i=0; i<num; i++){
		var child = Cards.getChildAt(i);

		createjs.Tween.get(child)
			.to({x:640, y:-200}, 350)
			.call(function(){
				Cards.removeAllChildren();

				Bet = 10;
				updateBet();

				buttonVisible();
			})
	}
}


//Spawn bitmap image for push, you win, you lose and blackjack
function addImage(e){
	var result = new createjs.Bitmap(img(e));
	result.setTransform(canvas.width/2, 376);
	result.regX = result.getBounds().width/2;
	result.regY = result.getBounds().height/2;

	Gameover.addChild(result);
}

//Animate chips after gameover
function getChips(e){
	var num = chipsMove.children.length;

	if(e == "win"){
		for(var i=0; i<num; i++){
			var child = chipsMove.getChildAt(i);
			createjs.Tween.get(child)
				.to({x:350, y:780}, 500)
				.call(function(){
					chipsMove.removeAllChildren();
				})
		}
	}

	else if(e == "lose"){
		for(var i=0; i<num; i++){
			var child = chipsMove.getChildAt(i);
			createjs.Tween.get(child)
				.to({x:300, y:-50}, 500)
				.call(function(){
					chipsMove.removeAllChildren();
				})
		}
	}

	else if(e == "push"){
		for(var i=0; i<num; i++){
			var child = chipsMove.getChildAt(i);
			createjs.Tween.get(child)
				.to({x:-190, y:260}, 300)
				.call(function(){
					chipsMove.removeAllChildren();
				})
		}
	}
}

function playerWin(){
	addImage('win');
	getChips('win');
	playSound('youWin');

	Cash += Bet*2;
	updateCash();
}

function playerLose(){
	addImage('lose');
	getChips('lose');
	playSound('youLose');
}

function push(){
	addImage('push');
	getChips('push');
	playSound('Push');

	Cash += Bet;
	updateCash();
}

function blackjack(){
	addImage('blackjack');
	getChips('win');
	playSound('youWin');

	flipCard(dealerFlip.a, dealerFlip.b);
	setTimeout(cardsUp, 4000);

	Cash += Bet*2;
	updateCash();

	buttonVisible();
}

//Generate random type of cards
function randomCard(){
		var num = Math.round(Math.random()*3+1);

		if (num == 1){
			return "Clubs";
		}

		else if (num == 2){
			return "Diamonds";
		}

		else if (num == 3){
			return "Spades";
		}

		else if (num == 4){
			return "Hearts";
		}
	}

var cardBack = new createjs.Container();
var isTween = false;
var isReady = true;

//Create or spawn a card
function addCard(e, random, hitcount){
	var cardSpeed = 400;
	var cardType = randomCard();
	playSound('cardShove');

	if(e == "player"){
		var posX = 640+(25*hitcount);
		var posY = 371;
		isTween = true;

		var card = new createjs.Bitmap(img('card'+cardType+random));
		card.setTransform(cardPack.x, cardPack.y);
		card.regX = card.getBounds().width/2;
		card.regY = card.getBounds().height/2;
		card.name = e;
		card.alpha = 0;

		var cardB = new createjs.Bitmap(img('cardBack_red4'));
		cardB.setTransform(card.x, card.y);
		cardB.regX = cardB.getBounds().width/2;
		cardB.regY = cardB.getBounds().height/2;
		
		Cards.addChild(card);
		cardBack.addChild(cardB);

		createjs.Tween.get(cardB)
			.to({x:posX, y:posY}, cardSpeed)
			.call(function(){
				

				//rePos(e);
				setCardPosition(e);
				playSound('cardPlace');
			})
	}

	if(e == "dealer"){
		var posX = 640+(25*hitcount);
		var posY = 148;

		var card = new createjs.Bitmap(img('card'+cardType+random));
		card.setTransform(cardPack.x, cardPack.y);
		card.regX = card.getBounds().width/2;
		card.regY = card.getBounds().height/2;
		card.name = e;
		card.alpha = 0;

		var cardB = new createjs.Bitmap(img('cardBack_red4'));
		cardB.setTransform(card.x, card.y);
		cardB.regX = cardB.getBounds().width/2;
		cardB.regY = cardB.getBounds().height/2;
		
		Cards.addChild(card);
		cardBack.addChild(cardB);

		createjs.Tween.get(cardB)
			.to({x:posX, y:posY}, cardSpeed)
			.call(function(){
				setCardPosition(e);
				playSound('cardPlace');

				if(curPlayer == "dealer"){

					if(dealerValue < 18){
						dealerHit();
					}
					else {
						setTimeout(checkWinner, 500);
					}
				}

				
			})
	}
}

//Store dealer flip card, to use in the future
var dealerFlip = {
	a: 0,
	b: 0,
}

function setCardPosition(e){
	var num = cardBack.children.length;

	if(e == "player"){
		for(i=0; i<num; i++){
			if(Cards.children[i].name == e){
				var child = cardBack.getChildAt(i);
				var childCard = Cards.getChildAt(i);
				var target = child.x-25;

				createjs.Tween.get(childCard)
					.to({x:target},100);

				createjs.Tween.get(child)
					.to({x:target},100)
					.call(function(){
						flipCard(child, childCard);
						isTween = false;
						txtPlayer.text = playerValue.toString();
						txtPlayer.regX = txtPlayer.getBounds().width/2;
						txtPlayer.x = valueBar1.x+12;

						//On start
						if(playerHitCount < 2){
							Hit();
							dealerHit();
						}

						if (playerHitCount == 2 && playerValue == 21){
							//BLACKJACK
							setTimeout(blackjack, 1100);
							playerHitCount = 10;
						}
					});
			}
		}
	}

	if(e == "dealer"){
		for(i=0; i<num; i++){
			if(Cards.children[i].name == e){
				var child = cardBack.getChildAt(i);
				var childCard = Cards.getChildAt(i);
				var target = child.x-25;

				createjs.Tween.get(childCard)
					.to({x:target},100);

				createjs.Tween.get(child)
					.to({x:target},100)
					.call(function(){

						dealerFlip.a = child;
						dealerFlip.b = childCard;

						if(dealerHitCount == 1 || curPlayer == "dealer"){
							flipCard(child, childCard);
						}

						/*else {
							dealerFlip.a = child;
							dealerFlip.b = childCard;
						}*/

						if(dealerHitCount < 2){
							dealerHit();
						}
					});
			}
		}
	}
}

function flipCard(e, i){
	createjs.Tween.get(e)
		.to({scaleX:0},100)
		.call(function(){
			
			var child = i;
			child.alpha = 1;

			child.x = e.x;
			child.y = e.y;
			child.scaleX = 0;
			createjs.Tween.get(child)
				.to({scaleX:1},100)
				.call(function(){
					if(dealerHitCount >= 2){
						isReady = true;
					}
					if(dealerHitCount == 1 || curPlayer == "dealer" || playerValue > 21){
						txtDealer.text = dealerValue.toString();
						txtDealer.regX = txtDealer.getBounds().width/2;
						txtDealer.x = valueBar1.x+12;
					}
				})
		})
}

(function () {
  
  var game = {
	  element: document.getElementById('canvas'),
	  width: canvas.width,
	  height: canvas.height
  },
  
  resizeGame = function () {
		
	  var viewport, newGameWidth, newGameHeight, newGameX, newGameY;
				
	  // Get the dimensions of the viewport
	  viewport = {
		  width: window.innerWidth,
		  height: window.innerHeight
	  };
	  
	  // Determine game size
	  if (game.height / game.width > viewport.height / viewport.width) {
		newGameHeight = viewport.height;
		newGameWidth = newGameHeight * game.width / game.height;  
	  } else {
		newGameWidth = viewport.width;
		newGameHeight = newGameWidth * game.height / game.width;		 
	  }
  
	  game.element.style.width = newGameWidth + "px";
	  game.element.style.height = newGameHeight + "px";
	  
	  newGameX = (viewport.width - newGameWidth) / 2;
	  newGameY = (viewport.height - newGameHeight) / 2;

	  // Set the new padding of the game so it will be centered
	  game.element.style.padding = newGameY + "px " + newGameX + "px";
  };
  
  window.addEventListener("resize", resizeGame);
  resizeGame();
}())