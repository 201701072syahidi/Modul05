/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer,gamePlaying;
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');

//dice images
var diceimgs = {
 diceimg01: "https://cdn.pbrd.co/images/70YJMCVVR.png",
 diceimg02: 'https://cdn.pbrd.co/images/711lemsMX.png',
 diceimg03: "https://cdn.pbrd.co/images/711NjfjV5.png",
 diceimg04: "https://cdn.pbrd.co/images/712dK3C2z.png",
 diceimg05: "https://cdn.pbrd.co/images/70Zqc4icX.png",
 diceimg06: "https://cdn.pbrd.co/images/712DzRw22.png",
 diceimg11: "https://cdn.pbrd.co/images/713n3lHQN.png",
 diceimg12: 'https://cdn.pbrd.co/images/713JSMJDr.png',
 diceimg13: "https://cdn.pbrd.co/images/HvoZO4Gb.png",
 diceimg14: "https://cdn.pbrd.co/images/HvqN3Kjq.png",
 diceimg15: "https://cdn.pbrd.co/images/714IXBStH.png",
 diceimg16: "https://cdn.pbrd.co/images/714ZovsdD.png"
};
init();
var doublesix,maxscore;
document.getElementById('okmax').addEventListener('click',function(){
	maxscore=document.getElementById('scorenum').value;
	if(!maxscore){
		maxscore=50;
	}
	document.getElementById('curmax').innerHTML='Current Max Score '+maxscore;
	console.log('Current Max Score '+maxscore);
});
document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying) {
		// 1. random number
		var dice = Math.floor(Math.random() * 6) + 1;
		//Dice 2 Value
		var dice2= Math.floor(Math.random() * 6) + 1;
		// 2. display result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = diceimgs['diceimg' + activePlayer + dice];

		//Dice 2
		var diceDOM2 = document.querySelector('.dice2');
		diceDOM2.style.display = 'block';
		diceDOM2.src = diceimgs['diceimg' + activePlayer + dice2];

		document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice+dice2+ '</em>';
		// 3. Update round score if the rolled number is not 1
		if (dice !== 1 && dice2!==1) {
			hideRolledMsg();
			//Double Six
			// if(dice==6 && doublesix==6){
			// 	disableBtn(btnRoll, 1000);
			// 	hideRolledMsg();
			// 	doublesix=0;
			// 	scores[activePlayer]=0;
			// 	document.getElementById('score-'+activePlayer).textContent =scores[activePlayer];
			// 	document.querySelector('.player-'+activePlayer+'-rolled-2').style.visibility = 'visible';
			// 	nextPlayer();
			// 	console.log(doublesix+dice +' Rolled 6 Twice');//Cek output angka 6 yang double
			// }
			// doublesix=dice;
			// roundScore += dice;
			
			// Double Twelve
			if(dice+dice2==12 && doublesix==12){
				disableBtn(btnRoll, 1000);
				hideRolledMsg();
				doublesix=0;
				scores[activePlayer]=0;
				document.getElementById('score-'+activePlayer).textContent =scores[activePlayer];
				document.querySelector('.player-'+activePlayer+'-rolled-2').style.visibility = 'visible';
				nextPlayer();
				console.log(doublesix+(dice+dice2) +' Rolled 6 Twice');
			}
			doublesix=dice+dice2;
			roundScore += dice+dice2;
			console.log(doublesix+' Rolled');//Cek angka yang di hasilkan (kaya log)
			
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//disable button
			doublesix=0;
			disableBtn(btnRoll, 1000);
			hideRolledMsg();
			document.querySelector('.player-'+activePlayer+'-rolled-1').style.visibility = 'visible';
			nextPlayer();		
			console.log(doublesix+' Rolled 1');
		}
	}
	
		
});



document.querySelector('.btn-hold').addEventListener('click', function(){
		if (gamePlaying) {
			disableBtn(btnRoll, 1000);
			// Add current score to global score
			scores[activePlayer] += roundScore;	

			//Update the UI
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

			//check if player won the game

			if (scores[activePlayer] >= maxscore) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner-' + activePlayer);
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
				gamePlaying = false;
				doublesix=0;
				console.log(doublesix+' Winner');
			} else {
				doublesix=0;
				console.log(doublesix+' Hold');
				nextPlayer();
			}
		}
		
		
});


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';
	//Dice 2 element
	document.querySelector('.dice2').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
	
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.add('active-0');
	document.querySelector('.player-0-panel').classList.remove('winner-0');
	document.querySelector('.player-1-panel').classList.remove('winner-1');
	hideRolledMsg();

}

function nextPlayer() {
	//next player
		var icons = document.getElementsByTagName('i');
		for(i=0;i<icons.length;i++){
			icons[i].classList.remove('color-' + activePlayer);
		}
		
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
		activePlayer ===0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		
		for(i=0;i<icons.length;i++){
			icons[i].classList.add('color-' + activePlayer);
		}
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-' + activePlayer);
		document.querySelector('#current-0').textContent = '0';
		document.querySelector('#current-1').textContent = '0';
}

function disableBtn(btn, time) {
	   //disable button
		btn.disabled = true;
      	setTimeout(function(){btn.disabled = false;},time);
}

function hideRolledMsg(){
	document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-0-rolled-2').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-2').style.visibility = 'hidden';
}