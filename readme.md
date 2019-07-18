# FormSelect

### Пример инициализации

```javascript
$('.formselect-radio').formfieldSelect();
```

### Опции

Option | Type | Default | Description
------ | ---- | ------------- | -----------
`open` | boolean | false | При значении равном `false` список закрыт (свернут)
`close` | boolean | true | Аналогичен `open` `false`
`disabled` | boolean | false | Отключает возможность открытие списка
`type` | string | 'select' | Обычный селект на радиокнопках
`type` | string | 'link' | Обычный селект на ссылках
`type` | string | 'multiple' | Мультиселект на чекбоксах (выбор нескольки вариантов)
`btnSelector` | string | '.your-class' | Включает переключение состояния селекта по клику на кнопку с данным классом
`valueSelector` | string | '.your-class2' | Включает переключение состояния селекта по клику на значение (value) с данным классом
`inputSelector` | string | '.your-class3' | Класс input[type="hidden"]
`listSelector` | string | '.your-class4' | Класс списка
`itemSelector` | string | '.your-class5' | Класс эл-та списка используетя для обновления значения (value)

#### Методы
```javascript
// Закроет список
$('.formselect-radio').formfieldSelect('close');

//Добавит эл-т в конец списка
$('.formselect-radio').formfieldSelect('add', "new item");

// После любого из методов можно продолжать цепочку вызовов
$('.formselect-radio').formfieldSelect('open').css({'backgroundColor' : '#000', 'margin-top' : "25px"});
```

Method | Argument | Description
------ | -------- | -----------
`open` | | Открывает список
`close` | | Закрывает список
`add` | string | Добавляет эл-т списка, получает имя эл-та. Наприммер: 'новый пункт'


