$(function() {
	$('.formselect-radio').formfieldSelect().formfieldSelect('add', 'Ещё 1 пункт');
	$('.formselect-link').formfieldSelect({type : 'link'}).formfieldSelect('add', 'Ещё 1 пункт');
	$('.form-multiselect').formfieldSelect({type : 'multiple', itemSelector: '.formselect-radio__item.formselect-radio__item_mark'}).formfieldSelect('add', 'Ещё 1! пункт');
});
