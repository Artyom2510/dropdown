// Выпадающий список (радиокнопки замаскированные под select)
;(function($) {
	var FormfieldSelect = window.FormfieldSelect || {};
	FormfieldSelect = (function() {
		function FormfieldSelect(element, settings) {
			var _ = this;
			
			_.initOption = {
				open: false,
				close: true,
				disabled: false,
				type: 'select',
				btnSelector: '.formselect-radio__arrow',
				valueSelector: '.formselect-radio__value',
				inputSelector: '.formselect-radio__input',
				listSelector: '.formselect-radio__list',
				itemSelector: '.formselect-radio__item',
				templateSelectValue: _.templateDefaultSelectValue,
				templateSelectInput: _.templateDefaultSelectInput
			};

			_.option = $.extend({}, _.initOption, settings);
			
			_.$select = $(element);
			_.$button = _.$select.find(_.option.btnSelector);
			_.$value = _.$select.find(_.option.valueSelector);
			_.$input = _.$select.find(_.option.inputSelector);
			_.$list = _.$select.find(_.option.listSelector);
			_.$item = _.$select.find(_.option.itemSelector);
			_.arrayOfLabel = [];
	
			_.init();
		}
		return FormfieldSelect;
	}());

	FormfieldSelect.prototype.close = function() {
		var _ = this;
		_.$select.removeClass('open');
		_.$select.addClass('close');
	}

	FormfieldSelect.prototype.open = function() {
		var _ = this;
		_.$select.removeClass('close');
		_.$select.addClass('open');
	}

	FormfieldSelect.prototype.init = function() {
		var _ = this;
		var option = _.option;

		// Открытие и закрытие выпадашки по клику на нее
		_.$button.on('click', function() {
			if (!option.disabled) {
				_.$select.toggleClass('open');
			}
			_.update();
		});

		_.$value.on('click', function() {
			if (!option.disabled) {
				_.$select.toggleClass('open');
			}
			_.update();
		});

		// Изначально закрыт
		if (option.close || !option.open) {
			_.$select.removeClass('open');
		}

		// Изначально открыт
		if (option.open || !option.close) {
			_.$select.addClass('open');
		}

		if( option.type === 'link' ) {
			_.$item.find('a.active').each(function(id, link) {
				var label = $(link).text();
				_.updateArrayOfLabel('add', { label: label, value: null });
			});
		}
		if( option.type === 'select' || option.type === 'multiple' ) {
			_.$item.find('input:checked').each(function(id, input) {
				var label = $(input).parent().children('label').text();
				var value = $(input).val();
				_.updateArrayOfLabel('add', { label: label, value: value });
			});
		}

		$(document).ready(function() {
			_.updateSelectInput(); // Обновляет value
			_.updateSelectValue(); // Обновляет input
			_.addEvents(); // Обновляет события
		});
	}

	FormfieldSelect.prototype.add = function(attr) {
		var _ = this;
		var option = _.option;

		var type = option.type;
		var classNameList = _.$item.eq(0).attr('class').split(/\s+/);
		var className = '';
		var label = '';
		var name = type !== 'link' ? _.$item.children('input').attr('name') : false;
		var value = _.$item.length;

		if (typeof attr === 'object') {
			if (attr.className) {
				if (typeof attr.className === 'object') {
					attr.className.forEach(function(className) {
						classNameList.push(className);
					});
				} else if (typeof attr.className === 'string') {
					classNameList.push(attr.className);
				}
			}
			if (attr.value) {
				value = attr.value;
			}
			label = attr.label || attr.value || value;
		} else if (typeof attr === 'string') {
			label = attr;
		}
		className = classNameList.join(' ');

		var $item = _.templateItem(className, label, name, value);
		_.$list.append($item);
		_.$item = _.$select.find(option.itemSelector);
		_.addEvents();
	}

	FormfieldSelect.prototype.templateItem = function(className, label, name, value) {
		var _ = this;

		switch(_.option.type) {
			case 'link':
				return $(
					'<div class="' + className + '">' +
						'<a href="#">' + label + '</a>' +
					'</div>'
				);
			case 'multiple':
				return $(
					'<li class="' + className + '">' +
						'<input type="checkbox" id="' + name + '"name="' + name + '"value="' + value + '">' +
						'<label for="' + name + '">' + label + '</label>' +
					'</li>'
				);
			case 'select':
				return $(
					'<li class="' + className + '">' +
						'<input type="radio" id="' + name + '-' + value + '"name="' + name + '"value="' + value + '">' +
						'<label for="' + name + '-' + value + '">' + label + '</label>' +
					'</li>'
				);
			default:
				return false;
		}
	}

	FormfieldSelect.prototype.update = function() {
		var _ = this;
		$(document).on('click', function(event) {
			var $formselectRadioAll = _.$select.filter('.open');
			var $formselectRadio = $(event.target).closest(_.$select.filter('.open'));
			if ($formselectRadio.length) { // Если клик внутри formselect-radio
				if ($formselectRadioAll.length > 1) // Если было открыто больше 1 formselect-radio
					$formselectRadioAll.not($formselectRadio).removeClass('open'); // Закрытие всех formselect-radio кроме только что открытого
				return;
			}
			$formselectRadioAll.removeClass('open');
			event.stopPropagation();
		});
	}
	
	FormfieldSelect.prototype.updateArrayOfLabel = function(type, prop) {
		var _ = this;

		var label = prop.label;
		var value = prop.value;

		switch(type) {
			case 'add':
				_.arrayOfLabel.push({
					label: label,
					value: value
				});
				break;
			case 'update':
				_.arrayOfLabel[0].label = label;
				_.arrayOfLabel[0].value = value;
				break;
			case 'remove':
				_.arrayOfLabel = _.arrayOfLabel.filter(function(option) {
					return option.value !== value;
				});
				break;
			default:
				break;
		}
	}

	FormfieldSelect.prototype.addEvents = function() {
		var _ = this;

		switch(_.option.type) {
			case 'link':
					_.$item.find('a').each(function(id, link) {
					if( $(link).data('event') !== 'add' ) {
						$(link)
							.data('event', 'add')
							.on('click', function() {
								_.$item.find('a').removeClass('active');
								$(this).addClass('active');
								_.$select.removeClass('open');
								
								var type = _.arrayOfLabel.length ? 'update' : 'add';
								var label = $(this).text();
			
								_.updateArrayOfLabel(type, { label: label, value: null });
								_.changeOption();
							});
					}
				});
				break;
			case 'multiple':
				var $itemInput = _.$item.find('input');
				$itemInput.each(function(id, input) {
					if( $(input).data('event') !== 'add' ) {
						$(input)
							.data('event', 'add')
							.on('change', function() {
								var type = $(this).is(':checked') ? 'add' : 'remove';
								var label = $(this).siblings('label').text();
								var value = $(this).val();
			
								_.updateArrayOfLabel(type, { label: label, value: value });
								_.changeOption();
							});
					}
				});
				break;
			case 'select':
				var $itemInput = _.$item.find('input');
				var $itemLabel = _.$item.find('label');
				$itemInput.each(function(id, input) {
					if( $(input).data('event') !== 'add' ) {
						$(input)
							.data('event', 'add')
							.on('change', function() {
								var type = _.arrayOfLabel.length ? 'update' : 'add';
								var label = $(this).siblings('label').text();
								var value = $(this).val();
								
								_.updateArrayOfLabel(type, { label: label, value: value });
								_.changeOption();
							});
					}
				});
				$itemLabel.each(function(id, label) {
					if( $(label).data('event') !== 'add' ) {
						$(label)
							.data('event', 'add')
							.on('click', function() {
								_.$select.removeClass('open');
			
								_.changeOption();
							});
					}
				});
				break;
			default:
				break;
		}
	}

	FormfieldSelect.prototype.changeOption = function() {
		var _ = this;
		_.updateSelectInput();
		_.updateSelectValue();
	}

	FormfieldSelect.prototype.templateDefaultSelectValue = function(arr) {
		var _ = this;
		var length = arr.length;
		var text = '';
		
		var substr1 = 'выбран';
		var substr2 = ' пункт';
		if (!length) {
			text = "ничего не выбранно";
		} else if (length === 1) {
			text = arr[0].label;
		} else if (length % 10 === 1 && length > 20) {
			text = substr1 + " " + length + " " + substr2;
		} else if ((length % 10 === 2 || length % 10 === 3 || length % 10 === 4) && (length < 5 || length > 21)) {
			text = substr1 + "но " + length + substr2 +'a\n'; 
		} else {
			text = substr1 + "но " + length + substr2 +'ов\n';
		}

		return text;
	}

	FormfieldSelect.prototype.updateSelectValue = function() {
		var _ = this;
		var value = _.option.templateSelectValue(_.arrayOfLabel);

		_.$value.children().text(value);
	}

	FormfieldSelect.prototype.templateDefaultSelectInput = function(arr) {
		var _ = this;
		var length = arr.length;
		var text = '';

		if (!length) {
			text = "ничего не выбранно";
		} else if (length === 1) {
			text = arr[0].label;
		} else {
			text = arr.reduce(function(res, option, id) {
				return res + (id !== 0 ? ', ' : '') + option.label;
			}, '');
		}

		return text;
	}

	FormfieldSelect.prototype.updateSelectInput = function() {
		var _ = this;
		var value = _.option.templateSelectInput(_.arrayOfLabel);

		_.$value.attr('title', value);
		_.$input.val(value);
	}

	$.fn.formfieldSelect = function() {
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		
		for (i = 0; i < l; i++) {
			if (typeof opt == 'object' || typeof opt == 'undefined') {
				_[i].formfieldSelect = new FormfieldSelect(_[i], opt);
			} else {
				ret = _[i].formfieldSelect[opt].apply(_[i].formfieldSelect, args);
			}
			if (typeof ret != 'undefined') return ret;
		}
		return _;
	}

})(jQuery);

