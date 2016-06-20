import {Book} from "../classes/Book";

export var aBook:Book[] = [

    new Book(
        "Совершенный код",
        [
            { firstName: "Стив", lastName: "Макконел" }
        ],
        896,
        "Питер, Русская Редакция",
        '2007',
        '01.01.2007',
        "5-469-00822-3",
        null
    ),

    new Book(
        "Рефакторинг",
        [
            {firstName: "Мартин", lastName: "Фаулер"},
            { firstName: "Кент", lastName: "Бек" }
        ],
        432,
        "Символ-Плюс",
        '2008',
        '01.01.2008',
        "978-5-93286-045-8",
        null
    ),

    new Book(
        "Паттерны проектирования",
        [
            {firstName: "Эрих", lastName: "Гамма"},
            { firstName: "Ричард", lastName: "Хелм" },
            { firstName: "Ральф", lastName: "Джонсон" },
            { firstName: "Джон", lastName: "Влиссидес" }
        ],
        366,
        "Питер",
        '2016',
        '01.01.2016',
        "978-5-459-01720-5",
        null
    )

];