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
			btnSelector: '.formselect-radio__arrow',
			valueSelector: '.formselect-radio__value',
			inputSelector: '.formselect-radio__input',
			listSelector: '.formselect-radio__list',
			templateSelectValue: function(arr) {
				var length = arr.length;
				var text = '';

				var substr1 = 'выбран';
				var substr2 = ' город';
				
				if (!length) {
					text = "город не выбран";
				} else if (length === 1) {
					text = arr[0].label;
				} else if (length % 10 === 1 && length > 20) {
					text = substr1 + " " + length + " " + substr2;
				} else if ((length % 10 === 2 || length % 10 === 3 || length % 10 === 4) && (length < 5 || length > 21)) {
					text = substr1 + "но " + length + substr2 +'a\n'; 
				} else {
					text = substr1 + "но " + length + substr2 +'ов\n';
				}
				console.log(text);
				return text;
			}
		})
		.formfieldSelect('add', {
			label: 'ssss',
			className: 'more-info'
		});
});
