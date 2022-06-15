$(() => {

    let[x,o] = ["x","o"];
	let turns = 0;
    let win_sequences = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
	let gameType;

    function checkWon(elem){
        let win = false
        for(let i = 0; i<8;i++){
            let count = 0;
            for(let j = 0; j<3;j++){
                let sequence = win_sequences[i][j]
                if( $(`#spot${sequence}`).hasClass(elem) ){ count ++ }
            }
            if(count == 3){
                win = true;
                break;
            }
        } return win
    }
	function isTie(player1,player2){
		if(turns == 9){  
            if(gameType == 'm'){
                if(checkWon(player1)) { showResult(`Player ${player1} Win!`); }
                else if(checkWon(player2)) { showResult(`Player ${player1} Win!`); }
				else{showResult('Its a Tie')}
            }
            else if(gameType == 's'){
                if(checkWon('o')) { showResult(`${player1} Win!`); }
                else if(checkWon('x')) { showResult(`${player1} Win!`); }
				else{ showResult('Its a Tie') }
            }
		}
	}
    function displayError(msg,id){
        $(`#show-error${id}`).text(msg);
        $(`#show-error${id}`).fadeIn();
        $(`#show-error${id}`).delay(1000).fadeOut('slow')
    }
	function resetGame(){
		let player = $("input[name='XO']:checked").val();
		$('.col').text('');
		$('.col').removeClass('disable');
		$('.col').removeClass('o');
		$('.col').removeClass('x');
        $('#show-turn').text(`Player ${player}'s Turn`);
		turns = 0;
	}
	function showResult(msg){
		$('#result-text').text(msg)
		$('.result').css('display','flex')
	}
	function multiplayer(current_spot,player1){
		let player2;
		player1 == 'x' ? player2 = 'o': player2 = 'x';
		if(current_spot.hasClass('disable')){
			turns--;
			displayError('This spot is already filled',2);
		} else if(turns%2 == 0){
            $('#show-turn').text(`Player ${player1}'s Turn`);
			current_spot.text(player2);
			current_spot.addClass(`disable ${player2}`);
			if(checkWon(player2)){ showResult(`Player ${player2} Win!`); }
		} else{
            $('#show-turn').text(`Player ${player2}'s Turn`);
			current_spot.text(player1);
			current_spot.addClass(`disable ${player1}`);
			if(checkWon(player1)){ showResult(`Player ${player1}  Win!`); }
		} isTie(player1,player2)
	}

	function single(current_spot,user){
		obj = $('.col')
		let pc;
		user == 'x' ? pc = 'o' : pc = 'x';
		if(current_spot.hasClass('disable')){
			turns--
			displayError('This spot is already filled',2);
		}else{
			turns ++;
			flag = true;
			current_spot.text(user);
			current_spot.addClass(`disable ${user}`);
			if(checkWon(user)){ showResult('You Win!'); }

			if(turns < 9){
				turns++
				while(flag && turns != 9){
					for(let i = Math.floor(Math.random() * 8); i<9; i++){
						if($(obj[i]).text() == ''){
							flag = false;
							$(obj[i]).text(pc);
							$(obj[i]).addClass(`disable ${pc}`);
							if(checkWon(pc)){ showResult('Computer Win!'); }
							break;
						}
					}
				}
			} isTie(user,pc)
		}
	}

	$('#single').click(function () { 
		let plyr = $("input[name='XO']:checked").val()
		if(plyr == undefined){ displayError('Please Select X or O',1)}
		else{
			$('#show-turn').css('display','none')
			$('.choice').css('display','none')
			gameType = 's'
		}
	});
	$('#multi').click(function () { 
		let plyr = $("input[name='XO']:checked").val()
		if(plyr == undefined){ displayError('Please Select X or O',1) }
		else{
			$('#show-turn').text(`Player ${plyr}'s Turn`)
			$('#show-turn').css('display','block')
			$('.choice').css('display','none')
			gameType = 'm'
		}
	});
	$('#container > div').click( function () {
		let id = $(this).attr('id');
		let current = $(`#${id}`);
		let player = $("input[name='XO']:checked").val();

		if(gameType=='m'){
			turns++;
			multiplayer(current,player)
		} else{ single(current,player) }
	});

	$("#play-again").add('#new').click(function (){ 
		resetGame();
		$('.result').css('display','none');
		$('.choice').css('display','flex');
	});

    $('#reset').click(function(){ resetGame() })

});