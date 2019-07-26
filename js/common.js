$(function() {
	$('.formselect-radio').formfieldSelect().formfieldSelect('add', 'Ещё 1 пункт');
	$('.formselect-link').formfieldSelect({type : 'link'}).formfieldSelect('add', 'Ещё 1 пункт');
	$('.form-multiselect').formfieldSelect({type : 'multiple'}).formfieldSelect('add', 'Ещё 1! пункт');
});
