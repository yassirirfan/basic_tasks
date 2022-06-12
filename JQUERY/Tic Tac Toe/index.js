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
        }
        return win
    }

	function isTie(){
		if(turns == 9){  
			if(checkWon('o')) { showResult('Winner: O'); }
			else if(checkWon('x')) { showResult('Winner: X'); }
			else { showResult('Tie Game'); }
		}
	}

	function resetGame(){
		$('.col').text('');
		$('.col').removeClass('disable');
		$('.col').removeClass('o');
		$('.col').removeClass('x');
		turns = 0;
	}

	function showResult(msg){
		$('#result-text').text(msg)
		$('.result').css('display','flex')
	}
	
	function multiplayer(current_spot){
		if(current_spot.hasClass('disable')){
			turns--
			alert('This spot is already filled');
		}
		else if(turns%2 == 0){
			current_spot.text(o);
			current_spot.addClass('disable o');
			if(checkWon('o')){ showResult('Winner: O'); }
		} 
		else{
			current_spot.text(x);
			current_spot.addClass('disable x');
			if(checkWon('x')){ showResult('Winner: X'); }
		}
		isTie()
	}

	function single(current_spot){
		obj = $('.col')
		if(current_spot.hasClass('disable')){
			turns--
			alert('This spot is already filled');
		}
		else{
			turns ++;
			flag = true;
	
			current_spot.text(x);
			current_spot.addClass('disable x');
			if(checkWon('x')){ showResult('Winner: You'); }

			if(turns < 9){
				turns++
				while(flag){
					for(let i = Math.floor(Math.random() * 8); i<9; i++){
						if($(obj[i]).text() == ''){
							flag = false;
							$(obj[i]).text(o);
							$(obj[i]).addClass('disable o');
							if(checkWon('o')){ showResult('Winner: Computer'); }
							break;
						}
					}
				}
			}
			console.log(turns)
			isTie()
		}

	}

	$('#single').click(function () { 
		$('.choice').css('display','none')
		gameType='s'
	});

	$('#multi').click(function () { 
		$('.choice').css('display','none')
		gameType='m'
	});

	$('#container > div').click( function () {
		
		let id = $(this).attr('id');
		let current = $(`#${id}`);

		if(gameType=='m'){
			turns++;
			multiplayer(current)
		}
		else{ single(current) }
	});

	$("#play-again").click(function (){ 
		resetGame();
		$('.result').css('display','none');
		$('.choice').css('display','flex');
	});

});