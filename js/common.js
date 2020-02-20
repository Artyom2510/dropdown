$(function() {
	$('.formselect-radio')
		.formfieldSelect()
		.formfieldSelect('add', 'Ещё 1 пункт');

	$('.formselect-link')
		.formfieldSelect({
			type : 'link'
		})
		.formfieldSelect('add', 'Ещё 1 пункт')
		.formfieldSelect('add', 'Ещё 2й пункт');

	$('.form-multiselect')
		.formfieldSelect({
			type : 'multiple',
			btnSelector: '.formselect-radio__resow',
			valueSelector: '.formselect-radio__value',
			inputSelector: '.formselect-radio__input',
			listSelector: '.formselect-radio__list',
			templateSelectValue: function(res) {
				var length = res.length;
				var text = '';

				var substr1 = 'выбран';
				var substr2 = ' город';
				
				if (!length) {
					text = "город не выбран";
				} else if (length === 1) {
					text = res[0].label;
				} else if (length % 10 === 1 && length > 20) {
					text = substr1 + " " + length + " " + substr2;
				} else if ((length % 10 === 2 || length % 10 === 3 || length % 10 === 4) && (length < 5 || length > 21)) {
					text = substr1 + "но " + length + substr2 +'a\n'; 
				} else {
					text = substr1 + "но " + length + substr2 +'ов\n';
				}
				return text;
			}
		})
		.formfieldSelect('add', {
			label: 'ssss',
			className: 'more-info'
		});

		// $(document).on('keydown', function(e) {
		// 	switch(e.keyCode) {
		// 		// case 13:
		// 		// 	if (!$('.formselect-link').hasClass('open')) {
		// 		// 		$('.formselect-link').formfieldSelect('open');
		// 		// 	}
		// 		case 38:
		// 		case 87:
		// 			allItems.eq(currentItem > 0 ? --currentItem : 0).focus();
		// 			break;
		// 		case 40:
		// 		case 83:
		// 			allItems.eq(currentItem < lengthItems - 1 ? ++currentItem : lengthItems - 1).focus();
		// 			break;
		// 	}
		// });

// function validateBattlefield(field) {
// 	var res = [0, 0, 0, 0];
// 	for(var i = 0; i < 9; i++) {
// 		for(var j = 0; j < 9; j++) {
// 			if (field[i][j] === 1) {
// 				if (field[i + 1][j + 1] === 1 || field[i + 1][j] === 1 && field[i][j + 1] === 1) {
// 					return false;
// 				} else if (field[i + 1][j] !== 1 && field[i][j + 1] === 1) {
// 					var cnt = 1;
					
// 					console.log(cnt);
// 					res[cnt - 1]++;
// 				} else if (field[i + 1][j] === 1 && field[i][j + 1] !== 1) {
// 					console.log('asdadsdsa');
// 				} else {
// 					res[length - 1]++;
// 				}
// 			}
// 				// if (field[i + 1][j] !== 1 && field[i][j + 1] !== 1 && field[i - 1][j] !== 1 && field[i][j - 1] !== 1) {
// 				// 	res[3]++;
// 				// } else if (field[i + 1][j] === 1 && field[i][j + 1] !== 1) {
					
// 				// }
// 			} 
// 		}
// 		console.log(res);
// 	}
// 	validateBattlefield(
// 		[[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
// 		 [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
// 		 [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
// 		 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// 		 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
// 		 [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
// 		 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
// 		 [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
// 		 [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
// 		 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

function Range(r) {

	

	let arr = [];
	const sub = r.split('..');
	let min = sub[0];
	let max = sub[1];
	console.log(min, max);
	if (isNaN(min) && isNaN(max)) {
		let length = max.charCodeAt() - min.charCodeAt();
		// if (incl.charCodeAt() >= min.charCodeAt() && incl.charCodeAt() <= max.charCodeAt()) {
		// 	console.log(true);
		// }
		for(i = 0; i < length + 1; i++) {
			let char = min.charCodeAt() + i;
			arr.push(String.fromCharCode(char));
		}
	} else {
		let length = max - min;
		// if (incl >= min && incl <= max) {
		// 	console.log(true);
		// }
		for(let i = 0; i < length + 1; i++) {
			arr.push(min++);
		}
	}
	console.log(arr);
}
var myRange = new Range('0..10');
myRange.each(function(r) {
  console.log(r);
});
});
