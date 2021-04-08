# jQuery плагин Range slider. Учебное задание

## Краткое описание

Особенности слайдера:

- Неограниченное количество бегунков, бегункам присвоены идентификаторы
- Оптимизация производительности:
  - отрисовка _progress bar_ после события mouseup
  - использование _debounce_ на события mousemove (drag&drop), сокращает количество срабатываний обработчика
  - в коде отсутсвует _querySelectorAll_, все манипуляции с DOM производятся по ссылкам на созданные элементы
  - не используется наследование, используется композиция модулей
  - для отрисовки шкалы используется canvas, не генерируются многочисленные html-элементы, для визуализации делений шкалы
- Поддержка скинов

### Установка:<br/>

Все команды выполняются в терминале вашего IDE. Должны быть установлены свежие node.js и git

1. Перейдите в родительский каталог установки, например 'web-projects' на диске D `cd d:/web-projects`
2. Клонируйте репозиторий (создаст папку jquery-rangeslider-plugin): `git clone https://github.com/nicoproject/jquery-rangeslider-plugin/`<br/>
3. Перейдите в папку проекта: `cd jquery-rangeslider-plugin`<br/>
4. Установите модули для сборки проекта: `npm i`<br/>

---

### Основные команды: <br/>

`npm run dev` - запуск веб-сервера по адресу http://localhost:8000/, режим разработки (_development mode_) <br/>
`npm run build` - сборка в режиме watch, перекомпилируется при изменении в графе зависимостей webpack<br/>
`npm run production` - сборка в режиме production (_produciton mode_), результат сборки (минимизированный и объединенный код) сохраняется в папку _dist_<br/>
`npm run lint:sass` - проверка синтаксиса sass с помощью [Eslint](https://eslint.org/)<br/>
`npm run lint:js` - проверка синтаксиса ts и js-файлов с помощью [Eslint](https://eslint.org/)<br/>
`npm run test` - запуск тестов Jest<br/>
`npm run deploy` - загрузка результата сборки (папка _dist_) в ветку _gh-pages_<br/>

### Демо страница<br/>

[Демо 4 слайдера](https://nicoproject.github.io/jquery-rangeslider-plugin/)

### Тестирование<br/>

Тесты сделаны с использованием Jest framework

### Инициализация слайдера<br/>

`<div class="slider"></div>;`

- `$('.slider').rangeSlider()` - инициализация слайдера с настройками по умолчанию;<br/>
- `$('.slider').rangeSlider(options)` - инициализация слайдера с настройками пользователя, где:<br/>

```javascript
options = {
  id: number,
  step: number,
  scale: {
    min: number,
    max: number,
    isVisible: boolean,
  },
  orientation: string,
  skin: string,
  runners: [
    {
      id: number,
      position: number,
      showTooltip: boolean,
    },
    ...
  ],
}
```

### Конфигурация

|          Поле           |   Тип   | Значение по умолчанию |                     Описание                      |
| :---------------------: | :-----: | :-------------------: | :-----------------------------------------------: |
|           id            | number  |           0           |              Идентификатор слайдера               |
|          step           | number  |           1           |                    Размер шага                    |
|        scale.min        | number  |           0           |            Минимальное значение шкалы             |
|        scale.max        | number  |          150          |            Максимальное значение шкалы            |
|     scale.isVisible     | boolean |         true          |           Переключатель видимости шкалы           |
|       orientation       | string  |      horizontal       | Ориентация слайдера (горизонтальная/вертикальная) |
|          skin           | string  |         city          |   Скин слайдера (city, mario, sonic, impostor)    |
|     runners.[i].id      | number  |           1           |               Идентификатор бегунка               |
|  runners.[i].position   | number  |           1           |        Позиция заданного бегунка на шкале         |
| runners.[i].showTooltip | boolean |         true          |       Показывать tooltip заданного бегунка        |

---

### Архитектура

- Класс **Event**:
  - создает объект-событие;
  - хранит список наблюдателей за заданными событиями (методы);
  - передает данные заданному наблюдателю;<br/>
- Класс **Model**:
  - является базой данных для всего приложения
  - валидирует входящие значения
- Класс **View**:
  - композиционно состоит из _subViews_ для каждого элемента слайдера, а также панели управления;
  - полностью пассивный _View_;
  - получает данные от _Model_, передает данные в Presenter, обновляет данные по команде Presenter ;<br/>
- Класс **Presenter**:
  - связывает Model и View

Каждый компонент создает объект, объекты структурно объединяются в объект Slider, которому доступны все методы и все данные.
С помощью которых производится управление слайдером через панель.

### UML-диаграмма

![uml](https://raw.githubusercontent.com/nicoproject/jquery-rangeslider-plugin/refactor/UML/uml_ts_diagram.png)
