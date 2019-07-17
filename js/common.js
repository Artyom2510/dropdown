$(function() {
	$('.formselect-radio').formfieldSelect();
	$('.formselect-link').formfieldSelect();
	$('.formselect-link').formfieldSelect('add', 'Ещё 1 пункт');
	$('.form-multiselect').formfieldSelect({type : 'multiple'});
});
