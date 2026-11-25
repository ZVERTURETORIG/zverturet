import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Film,
  Heart,
  Moon,
  Search,
  Settings2,
  Star,
  Sun,
  Ticket,
  X,
} from 'lucide-react';
import mark from './assets/zverturet-mark.png';

const image = (path, size = 'w500') => path.startsWith('http') ? path : `https://image.tmdb.org/t/p/${size}${path}`;

const movies = [
  {
    id: 'dune-2', title: 'Дюна: Часть вторая', original: 'Dune: Part Two', year: 2024, runtime: 166,
    rating: '8.4', genre: 'Фантастика', director: 'Дени Вильнёв', poster: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    description: 'Пол Атрейдес объединяется с Чани и фременами. Их путь меняет судьбу планеты',
  },
  {
    id: 'project-hail-mary', title: 'Проект «Аве Мария»', original: 'Project Hail Mary', year: 2026, runtime: null,
    rating: null, genre: 'Фантастика', director: 'Фил Лорд и Кристофер Миллер',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTkwNzJiYTctNzI3NC00NjE1LTlhYjktY2Q5MTdmMWFmNzcxXkEyXkFqcGc%40._V1_QL75_UX5530_.jpg',
    trailer: 'P0XN3-n-2Lo', description: 'Учитель Райланд Грейс просыпается один на космическом корабле и пытается найти способ спасти Землю.',
  },
  {
    id: 'the-odyssey', title: 'Одиссея', original: 'The Odyssey', year: 2026, runtime: null,
    rating: null, genre: 'Приключения', director: 'Кристофер Нолан',
    poster: 'https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/images/regions/ca/onesheet.jpg',
    trailer: 'f_bKjZeJBBI', description: 'После Троянской войны Одиссей отправляется домой и проходит испытания мифического мира.',
  },
  {
    id: 'toy-story-5', title: 'История игрушек 5', original: 'Toy Story 5', year: 2026, runtime: null,
    rating: null, genre: 'Анимация', director: 'Эндрю Стэнтон и Кенна Харрис',
    poster: 'https://imgix.hoyts.com.au/mx/posters/au/toy-story-5-5bd649fe.jpg',
    trailer: 'c51ND9Hdbw0', description: 'Игрушкам предстоит столкнуться с новым соперником — умным планшетом Лилипад.',
  },
  {
    id: 'scream-7', title: 'Крик 7', original: 'Scream 7', year: 2026, runtime: null,
    rating: null, genre: 'Ужасы', director: 'Кевин Уильямсон',
    poster: 'https://images.squarespace-cdn.com/content/v1/61d3a1dc960d41134f8ac264/12e4a8a2-ebbd-4a5c-8d3a-2e37e4997722/scream-7-movie-poster-2026.jpg',
    trailer: 'UJrghaPJ0RY', description: 'Новый убийца в маске Призрачного лица угрожает Сидни Прескотт и её семье.',
  },
  {
    id: 'mortal-kombat-2', title: 'Мортал Комбат 2', original: 'Mortal Kombat II', year: 2026, runtime: null,
    rating: null, genre: 'Боевик', director: 'Саймон Маккуойд',
    poster: 'https://images.flickdirect.com/movies/mortal-kombat-2/mortal-kombat-2-poster.jpg',
    trailer: 'b24oG7qCwp4', description: 'Чемпионы Земного царства сражаются с Шао Каном, чтобы остановить его тёмное правление.',
  },
  {
    id: 'super-mario-galaxy', title: 'Супер Марио: Галактическое кино', original: 'The Super Mario Galaxy Movie', year: 2026, runtime: null,
    rating: null, genre: 'Анимация', director: 'Аарон Хорват и Майкл Еленик',
    poster: 'https://mario.wiki.gallery/images/0/06/TSMGM_Poster.jpg',
    trailer: 'LX9kXRRJlPw', description: 'Марио и Луиджи отправляются в космическое приключение, чтобы спасти Розалину.',
  },
  {
    id: 'past-lives', title: 'Прошлые жизни', original: 'Past Lives', year: 2023, runtime: 106,
    rating: '7.9', genre: 'Драма', director: 'Селин Сон', poster: '/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    description: 'Двое друзей детства встречаются спустя годы и вспоминают жизнь которая могла бы быть',
  },
  {
    id: 'poor-things', title: 'Бедные-несчастные', original: 'Poor Things', year: 2023, runtime: 141,
    rating: '7.8', genre: 'Фантастика', director: 'Йоргос Лантимос', poster: '/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    description: 'История свободы и взросления в мире который только предстоит открыть',
  },
  {
    id: 'interstellar', title: 'Интерстеллар', original: 'Interstellar', year: 2014, runtime: 169,
    rating: '8.7', genre: 'Фантастика', director: 'Кристофер Нолан', poster: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    description: 'Команда исследователей ищет новый дом для человечества за пределами галактики',
  },
  {
    id: 'grand-budapest', title: 'Отель «Гранд Будапешт»', original: 'The Grand Budapest Hotel', year: 2014, runtime: 100,
    rating: '8.1', genre: 'Комедия', director: 'Уэс Андерсон', poster: '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    description: 'Консьерж и его ученик оказываются в центре истории о пропавшей картине',
  },
  {
    id: 'parasite', title: 'Паразиты', original: 'Parasite', year: 2019, runtime: 132,
    rating: '8.5', genre: 'Триллер', director: 'Пон Джун-хо', poster: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    description: 'Две семьи с разным достатком постепенно оказываются связаны между собой',
  },
  {
    id: 'challengers', title: 'Претенденты', original: 'Challengers', year: 2024, runtime: 131,
    rating: '7.1', genre: 'Драма', director: 'Лука Гуаданьино', poster: '/H6vke7zGiuLsz4v4RPeReb9rsv.jpg',
    description: 'Теннисный матч становится встречей старых чувств и новых амбиций',
  },
  {
    id: 'flow', title: 'Поток', original: 'Flow', year: 2024, runtime: 85,
    rating: '8.0', genre: 'Анимация', director: 'Гинтс Зильбалодис', poster: '/imKSymKBK7o73sajciEmndJoVkR.jpg',
    description: 'Кот и его спутники ищут путь сквозь мир который оказался под водой',
  },
  {
    id: 'oppenheimer', title: 'Оппенгеймер', original: 'Oppenheimer', year: 2023, runtime: 180,
    rating: '8.1', genre: 'Драма', director: 'Кристофер Нолан', poster: '/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    description: 'История физика чья работа изменила ход мировой истории',
  },
  {
    id: 'arrival', title: 'Прибытие', original: 'Arrival', year: 2016, runtime: 116,
    rating: '7.9', genre: 'Фантастика', director: 'Дени Вильнёв', poster: '/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',
    description: 'Лингвист пытается понять язык загадочных гостей с другой планеты',
  },
  {
    id: 'joker', title: 'Джокер', original: 'Joker', year: 2019, runtime: 122,
    rating: '8.2', genre: 'Триллер', director: 'Тодд Филлипс', poster: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    description: 'Портрет человека который постепенно теряет связь с привычным миром',
  },
  {
    id: 'the-batman', title: 'Бэтмен', original: 'The Batman', year: 2022, runtime: 176,
    rating: '7.7', genre: 'Триллер', director: 'Мэтт Ривз', poster: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    description: 'Детективное расследование приводит Бэтмена в самые тёмные уголки города',
  },
  {
    id: 'spider-verse', title: 'Человек-паук: Через вселенные', original: 'Across the Spider-Verse', year: 2023, runtime: 140,
    rating: '8.4', genre: 'Анимация', director: 'Жуаким Дос Сантуш', poster: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    description: 'Майлз Моралес путешествует между мирами и встречает новых героев',
  },
  {
    id: 'whiplash', title: 'Одержимость', original: 'Whiplash', year: 2014, runtime: 107,
    rating: '8.5', genre: 'Драма', director: 'Дэмьен Шазелл', poster: '/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
    description: 'Молодой барабанщик стремится стать лучшим под руководством жёсткого преподавателя',
  },
  {
    id: 'matrix', title: 'Матрица', original: 'The Matrix', year: 1999, runtime: 136,
    rating: '8.2', genre: 'Фантастика', director: 'Лана и Лилли Вачовски', poster: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    description: 'Хакер узнаёт что привычная реальность устроена совсем не так как кажется',
  },
  {
    id: 'everything-everywhere', title: 'Всё везде и сразу', original: 'Everything Everywhere All at Once', year: 2022, runtime: 140,
    rating: '7.7', genre: 'Фантастика', director: 'Дэниэл Шайнерт', poster: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    description: 'Обычная женщина открывает множество версий своей жизни в параллельных мирах',
  },
  {
    id: 'inception', title: 'Начало', original: 'Inception', year: 2010, runtime: 148,
    rating: '8.4', genre: 'Фантастика', director: 'Кристофер Нолан', poster: '/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    description: 'Команда специалистов проникает в сны чтобы изменить ход чужих решений',
  },
  {
    id: 'la-la-land', title: 'Ла-Ла Ленд', original: 'La La Land', year: 2016, runtime: 128,
    rating: '7.9', genre: 'Драма', director: 'Дэмьен Шазелл', poster: '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    description: 'Музыкант и актриса идут к мечте в солнечном Лос-Анджелесе',
  },
  {
    id: 'spirited-away', title: 'Унесённые призраками', original: 'Spirited Away', year: 2001, runtime: 125,
    rating: '8.5', genre: 'Анимация', director: 'Хаяо Миядзаки', poster: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    description: 'Девочка попадает в загадочный мир духов и ищет дорогу домой',
  },
  {
    id: 'shawshank', title: 'Побег из Шоушенка', original: 'The Shawshank Redemption', year: 1994, runtime: 142,
    rating: '8.7', genre: 'Драма', director: 'Фрэнк Дарабонт', poster: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    description: 'Банкир сохраняет надежду и дружбу за стенами тюрьмы',
  },
  {
    id: 'knives-out', title: 'Достать ножи', original: 'Knives Out', year: 2019, runtime: 130,
    rating: '7.9', genre: 'Комедия', director: 'Райан Джонсон', poster: '/pThyQovXQrw2m0s9x82twj48Jq4.jpg',
    description: 'Частный детектив распутывает семейную тайну после неожиданной смерти',
  },
  {
    id: 'coco', title: 'Тайна Коко', original: 'Coco', year: 2017, runtime: 105,
    rating: '8.2', genre: 'Анимация', director: 'Ли Анкрич', poster: '/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
    description: 'Мальчик отправляется в мир предков чтобы найти историю своей семьи',
  },
  {
    id: 'mad-max', title: 'Безумный Макс: Дорога ярости', original: 'Mad Max: Fury Road', year: 2015, runtime: 120,
    rating: '8.1', genre: 'Фантастика', director: 'Джордж Миллер', poster: '/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
    description: 'Погоня через пустыню становится борьбой за свободу',
  },
  {
    id: 'social-network', title: 'Социальная сеть', original: 'The Social Network', year: 2010, runtime: 120,
    rating: '7.7', genre: 'Драма', director: 'Дэвид Финчер', poster: '/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',
    description: 'История создания социальной сети меняет жизнь её основателей',
  },
  {
    id: 'the-menu', title: 'Меню', original: 'The Menu', year: 2022, runtime: 107,
    rating: '7.2', genre: 'Триллер', director: 'Марк Майлод', poster: '/fPtUgMcLIboqlTlPrq0bQpKK8eq.jpg',
    description: 'Ужин на закрытом острове принимает неожиданный оборот',
  },
  {
    id: 'eternal-sunshine', title: 'Вечное сияние чистого разума', original: 'Eternal Sunshine of the Spotless Mind', year: 2004, runtime: 108,
    rating: '8.1', genre: 'Драма', director: 'Мишель Гондри', poster: '/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg',
    description: 'Двое пытаются стереть воспоминания и снова находят друг друга',
  },
  {
    id: 'kill-bill', title: 'Убить Билла', original: 'Kill Bill: Vol. 1', year: 2003, runtime: 111,
    rating: '8.0', genre: 'Триллер', director: 'Квентин Тарантино', poster: '/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg',
    description: 'Невеста возвращается чтобы завершить давний список мести',
  },
  {
    id: 'amelie', title: 'Амели', original: 'Amélie', year: 2001, runtime: 122,
    rating: '8.0', genre: 'Комедия', director: 'Жан-Пьер Жёне', poster: '/oTKduWL2tpIKEmkAqF4mFEAWAsv.jpg',
    description: 'Парижанка меняет жизнь окружающих маленькими добрыми поступками',
  },
];

const upcomingMovies = [
  {
    id: 'violent-night-2', title: 'Жестокая ночь 2', original: 'Violent Night 2', year: 2026, release: '4 декабря 2026', genre: 'Боевик', accent: '#a13732',
    poster: 'https://m.media-amazon.com/images/M/MV5BOTZhNDFmYmUtY2FmNy00MzMxLWI5NDEtNjJmYjdkNjliOWUyXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 'dune-3', title: 'Дюна: Часть третья', original: 'Dune: Part Three', year: 2026, release: '18 декабря 2026', genre: 'Фантастика', accent: '#c88745',
    poster: 'https://images.ctfassets.net/c4ucztjx9pmu/5GKRRV43QjQtzHI8ScLPKg/f88bb5d8ae463cc052e68e2623a4c9ce/DUNE3_CHARACTER_TIMOTHEE_1080x1600px_V01.jpg',
  },
  {
    id: 'avengers-doomsday', title: 'Мстители: Судный день', original: 'Avengers: Doomsday', year: 2026, release: '18 декабря 2026', genre: 'Фантастика', accent: '#476354',
  },
  {
    id: 'angry-birds-3', title: 'Angry Birds в кино 3', original: 'The Angry Birds Movie 3', year: 2026, release: '23 декабря 2026', genre: 'Анимация', accent: '#df684b',
    poster: 'https://image.tmdb.org/t/p/w500/yMWtxGZxeLlbAZSTFqQxYKDH8b4.jpg',
  },
  {
    id: 'children-of-blood-and-bone', title: 'Дети крови и костей', original: 'Children of Blood and Bone', year: 2027, release: '15 января 2027', genre: 'Фэнтези', accent: '#7554a7',
    poster: 'https://m.media-amazon.com/images/M/MV5BNWE1MTlkZDktMGEyZS00NGYwLWE5YzctMTYyNmVhZTNlMjkyXkEyXkFqcGc%40._V1_.jpg',
  },
  {
    id: 'gatto', title: 'Гатто', original: 'Gatto', year: 2027, release: '5 марта 2027', genre: 'Анимация', accent: '#545c81',
    poster: 'https://images.squarespace-cdn.com/content/v1/60241cb68df65b530cd84d95/955ebed0-40a5-492d-9e36-32c2a60d3cd2/Gatto_Teaser_Poster.jpg?format=1200w',
  },
  {
    id: 'exorcist-martyrs', title: 'Экзорцист: Мученики', original: 'The Exorcist: Martyrs', year: 2027, release: '12 марта 2027', genre: 'Ужасы', accent: '#6d393b',
  },
  {
    id: 'sonic-4', title: 'Соник 4 в кино', original: 'Sonic the Hedgehog 4', year: 2027, release: '19 марта 2027', genre: 'Приключения', accent: '#3d78c4',
  },
  {
    id: 'godzilla-kong-supernova', title: 'Годзилла и Конг: Супернова', original: 'Godzilla x Kong: Supernova', year: 2027, release: 'Март 2027', genre: 'Фантастика', accent: '#58635a',
  },
  {
    id: 'zelda', title: 'Легенда о Зельде', original: 'The Legend of Zelda', year: 2027, release: '30 апреля 2027', genre: 'Приключения', accent: '#9c7e3b',
  },
  {
    id: 'star-wars-starfighter', title: 'Звёздные войны: Старфайтер', original: 'Star Wars: Starfighter', year: 2027, release: '28 мая 2027', genre: 'Фантастика', accent: '#526583',
  },
  {
    id: 'how-to-train-your-dragon-2', title: 'Как приручить дракона 2', original: 'How to Train Your Dragon 2', year: 2027, release: '11 июня 2027', genre: 'Приключения', accent: '#47858a',
  },
  {
    id: 'shrek-5', title: 'Шрек 5', original: 'Shrek 5', year: 2027, release: 'Июнь 2027', genre: 'Анимация', accent: '#657c39',
  },
  {
    id: 'spider-man-beyond', title: 'Человек-паук: За пределами вселенных', original: 'Spider-Man: Beyond the Spider-Verse', year: 2027, release: '18 июня 2027', genre: 'Анимация', accent: '#98485e',
  },
  {
    id: 'man-of-tomorrow', title: 'Человек завтрашнего дня', original: 'Man of Tomorrow', year: 2027, release: '9 июля 2027', genre: 'Фантастика', accent: '#4883a7',
  },
  {
    id: 'minecraft-2', title: 'Minecraft 2', original: 'A Minecraft Movie 2', year: 2027, release: '23 июля 2027', genre: 'Приключения', accent: '#678354',
  },
  {
    id: 'simpsons-movie-2', title: 'Новый фильм «Симпсоны»', original: 'The Simpsons Movie (2027)', year: 2027, release: '3 сентября 2027', genre: 'Комедия', accent: '#d9a93c',
  },
  {
    id: 'frozen-3', title: 'Холодное сердце 3', original: 'Frozen 3', year: 2027, release: '24 ноября 2027', genre: 'Анимация', accent: '#668ea8',
  },
  {
    id: 'avengers-secret-wars', title: 'Мстители: Секретные войны', original: 'Avengers: Secret Wars', year: 2027, release: '17 декабря 2027', genre: 'Фантастика', accent: '#8a5148',
  },
  {
    id: 'hunt-for-gollum', title: 'Властелин колец: Охота на Голлума', original: 'The Lord of the Rings: The Hunt for Gollum', year: 2027, release: 'Декабрь 2027', genre: 'Фэнтези', accent: '#867548',
  },
];

const categories = ['Все', ...new Set(movies.map((movie) => movie.genre))];
const trailerVideos = {
  'dune-2': 'Way9Dexny3w',
  'past-lives': 'kA244xewjcI',
  'poor-things': 'RlbR5N6veqw',
  interstellar: 'zSWdZVtXT7E',
  'grand-budapest': '1Fg5iWmQjwk',
  parasite: '5xH0HfJHsaY',
  challengers: 'VobTTbg-te0',
  flow: '82WW9dVbglI',
  oppenheimer: 'bK6ldnjE3Y0',
  arrival: 'tFMo3UJ4B4g',
  joker: 'zAGVQLHvwOY',
  'the-batman': 'mqqft2x_Aa4',
  'spider-verse': 'cqGjhVJWtEg',
  whiplash: '7d_jQycdQGo',
  matrix: 'm8e-FF8MsqU',
  'everything-everywhere': 'wxN1T1uxQ2g',
  inception: 'YoHD9XEInc0',
  'la-la-land': '0pdqf4P9MB8',
  'spirited-away': 'fDUFP7EeXLE',
  shawshank: '6hB3S9bIaco',
  'knives-out': 'qGqiHJTsRkQ',
  coco: 'Rvr68u6k5sI',
  'mad-max': 'hEJnMQG9ev8',
  'social-network': 'lB95KLmpLR4',
  'the-menu': 'C_uTkUGcHv4',
  'eternal-sunshine': 'yE-f1alkq9I',
  'kill-bill': 'ot6C1ZKyiME',
  amelie: '2UT5xaAfxWU',
};
const sessions = [
  { time: '16:40', room: 'Зал 1' },
  { time: '19:20', room: 'Зал 2' },
  { time: '21:45', room: 'Зал 3' },
];
const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const occupiedSeats = ['A4', 'A5', 'B7', 'B8', 'C2', 'C3', 'C10', 'D6', 'D7', 'E5', 'E11', 'F3', 'F4', 'G8', 'G9', 'H2', 'H10', 'I6'];

function readStorage(key, fallback, legacyKey) {
  try {
    const value = localStorage.getItem(key) ?? (legacyKey ? localStorage.getItem(legacyKey) : null);
    if (!value) return fallback;
    const parsed = JSON.parse(value);
    return Array.isArray(fallback) && !Array.isArray(parsed) ? fallback : parsed;
  } catch {
    return fallback;
  }
}

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand--footer' : ''}`} href="#top" aria-label="ZVERTURET — главная">
    <img className="brand__icon" src={mark} alt="" />
    <span className="brand__name">ZVERTURET</span>
  </a>;
}

function App() {
  const [saved, setSaved] = useState(() => readStorage('zverturet:saved', [], 'kadr:saved'));
  const [bookings, setBookings] = useState(() => readStorage('zverturet:bookings', [], 'kadr:bookings'));
  const [activeTab, setActiveTab] = useState('catalog');
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('zverturet:theme') === 'light' ? 'light' : 'dark'; }
    catch { return 'dark'; }
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [category, setCategory] = useState('Все');
  const [upcomingYear, setUpcomingYear] = useState('Все');
  const [query, setQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [toast, setToast] = useState('');
  const searchRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => localStorage.setItem('zverturet:saved', JSON.stringify(saved)), [saved]);
  useEffect(() => localStorage.setItem('zverturet:bookings', JSON.stringify(bookings)), [bookings]);
  useEffect(() => {
    localStorage.setItem('zverturet:theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080808' : '#f8f8f6');
  }, [theme]);

  useEffect(() => {
    function focusSearch(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return undefined;
    function closeOnOutsideClick(event) {
      if (!settingsRef.current?.contains(event.target)) setSettingsOpen(false);
    }
    function closeOnEscape(event) {
      if (event.key === 'Escape') setSettingsOpen(false);
    }
    document.addEventListener('pointerdown', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [settingsOpen]);

  const visibleMovies = useMemo(() => {
    const source = activeTab === 'saved'
      ? movies.filter((movie) => saved.includes(movie.id))
      : activeTab === 'upcoming' ? upcomingMovies : movies;
    const search = query.trim().toLocaleLowerCase('ru');
    return source.filter((movie) => {
      const categoryMatch = activeTab === 'upcoming'
        ? upcomingYear === 'Все' || String(movie.year) === upcomingYear
        : category === 'Все' || movie.genre === category;
      const searchable = `${movie.title} ${movie.original} ${movie.director || ''} ${movie.genre}`.toLocaleLowerCase('ru');
      return categoryMatch && (!search || searchable.includes(search));
    });
  }, [activeTab, category, query, saved, upcomingYear]);

  function toggleSaved(movieId) {
    setSaved((current) => current.includes(movieId)
      ? current.filter((id) => id !== movieId)
      : [...current, movieId]);
  }

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2400);
  }

  function confirmBooking(booking) {
    setBookings((current) => [booking, ...current]);
    setSelectedMovie(null);
    setActiveTab('tickets');
    showToast('Билет добавлен');
  }

  function removeBooking(id) {
    setBookings((current) => current.filter((booking) => booking.id !== id));
    showToast('Бронирование отменено');
  }

  function openCatalog() {
    setActiveTab('catalog');
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  }

  function openTab(tab) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const sectionTitle = activeTab === 'saved' ? 'Избранное' : activeTab === 'tickets' ? 'Билеты' : activeTab === 'upcoming' ? 'Скоро в кино' : 'Фильмы';

  return (
    <div className="app-shell" id="top" data-theme={theme}>
      <header className="topbar">
        <Brand />
        <div className="topbar__right" ref={settingsRef}>
          <button className="settings-button" onClick={() => setSettingsOpen((open) => !open)} aria-label={settingsOpen ? 'Закрыть настройки' : 'Открыть настройки'} aria-expanded={settingsOpen} aria-haspopup="dialog" title="Настройки">
            <Settings2 size={19} />
          </button>
          {settingsOpen && <section className="settings-popover" role="dialog" aria-label="Настройки">
            <h2>Настройки</h2>
            <span className="settings-label">Тема</span>
            <div className="theme-options" role="group" aria-label="Тема оформления">
              <button className={theme === 'light' ? 'theme-option is-active' : 'theme-option'} aria-pressed={theme === 'light'} onClick={() => setTheme('light')}><Sun size={15} /> Светлая</button>
              <button className={theme === 'dark' ? 'theme-option is-active' : 'theme-option'} aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}><Moon size={15} /> Тёмная</button>
            </div>
          </section>}
        </div>
      </header>

      <main>
        {activeTab === 'catalog' && <Feature movie={movies[0]} onOpen={() => setSelectedMovie(movies[0])} onSave={toggleSaved} isSaved={saved.includes(movies[0].id)} />}
        <section className="catalog-section" id="catalog">
          <div className="section-heading">
            <h1>{sectionTitle}</h1>
            {activeTab !== 'tickets' && <div className={`search-box ${mobileSearchOpen ? 'is-open' : ''}`}>
              <button className="search-toggle" aria-label="Открыть поиск" onClick={() => {
                if (window.matchMedia('(max-width: 700px)').matches) {
                  const nextOpen = !mobileSearchOpen;
                  setMobileSearchOpen(nextOpen);
                  if (nextOpen) window.requestAnimationFrame(() => searchRef.current?.focus());
                } else searchRef.current?.focus();
              }}><Search size={17} /></button>
              <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по фильмам" aria-label="Поиск по фильмам" />
              {query && <button className="search-clear" onClick={() => setQuery('')} aria-label="Очистить поиск"><X size={15} /></button>}
              <kbd>⌘ K</kbd>
            </div>}
          </div>

          {activeTab !== 'tickets' && <div className="filter-row">
            {activeTab === 'upcoming' ? <div className="filters" role="group" aria-label="Год премьеры">
              {['Все', '2026', '2027'].map((year) => <button key={year} className={upcomingYear === year ? 'filter-chip is-selected' : 'filter-chip'} onClick={() => setUpcomingYear(year)}>{year}</button>)}
            </div> : <div className="filters" role="group" aria-label="Жанр">
              {categories.map((item) => <button key={item} className={category === item ? 'filter-chip is-selected' : 'filter-chip'} onClick={() => setCategory(item)}>{item}</button>)}
            </div>}
            <span className="result-count">{visibleMovies.length} фильмов</span>
          </div>}

          {activeTab === 'upcoming' && <p className="upcoming-intro">Премьеры конца 2026 и 2027 года. Даты могут отличаться по странам и меняться.</p>}

          {activeTab === 'tickets' ? <TicketList bookings={bookings} onRemove={removeBooking} onBrowse={openCatalog} /> :
            visibleMovies.length > 0 ? <div className="movie-grid">
              {visibleMovies.map((movie) => activeTab === 'upcoming'
                ? <UpcomingCard key={movie.id} movie={movie} />
                : <MovieCard key={movie.id} movie={movie} saved={saved.includes(movie.id)} onToggleSave={toggleSaved} onOpen={() => setSelectedMovie(movie)} />)}
            </div> : <EmptyState savedOnly={activeTab === 'saved'} clearSearch={() => { setQuery(''); setCategory('Все'); }} onBrowse={openCatalog} />}
        </section>
      </main>

      <footer className="footer">
        <Brand footer />
        <span>© 2026</span>
      </footer>

      <nav className="bottom-nav" aria-label="Основная навигация">
        <button className={activeTab === 'catalog' ? 'bottom-nav__button is-active' : 'bottom-nav__button'} onClick={openCatalog} aria-current={activeTab === 'catalog' ? 'page' : undefined}>
          <Film size={17} /><span>Фильмы</span>
        </button>
        <button className={activeTab === 'upcoming' ? 'bottom-nav__button is-active' : 'bottom-nav__button'} onClick={() => openTab('upcoming')} aria-current={activeTab === 'upcoming' ? 'page' : undefined}>
          <CalendarDays size={17} /><span>Скоро</span><small>{upcomingMovies.length}</small>
        </button>
        <button className={activeTab === 'saved' ? 'bottom-nav__button is-active' : 'bottom-nav__button'} onClick={() => openTab('saved')} aria-current={activeTab === 'saved' ? 'page' : undefined}>
          <Heart size={17} /><span>Избранное</span><small>{saved.length}</small>
        </button>
        <button className={activeTab === 'tickets' ? 'bottom-nav__button is-active' : 'bottom-nav__button'} onClick={() => openTab('tickets')} aria-current={activeTab === 'tickets' ? 'page' : undefined}>
          <Ticket size={17} /><span>Билеты</span><small>{bookings.length}</small>
        </button>
      </nav>

      {selectedMovie && <MovieDialog key={selectedMovie.id} movie={selectedMovie} saved={saved.includes(selectedMovie.id)} onToggleSave={toggleSaved} onClose={() => setSelectedMovie(null)} onConfirm={confirmBooking} />}
      {toast && <div role="status" className="toast"><Check size={16} />{toast}</div>}
    </div>
  );
}

function Feature({ movie, onOpen, onSave, isSaved }) {
  return <section className="feature" aria-labelledby="feature-title">
    <div className="feature__poster"><img src={image(movie.backdrop || movie.poster, movie.backdrop ? 'w1280' : 'w500')} alt={`Кадр из фильма ${movie.title}`} /></div>
    <div className="feature__copy">
      <h2 id="feature-title">{movie.title}</h2>
      <div className="feature__meta"><span><Star size={14} fill="currentColor" /> {movie.rating}</span><span>{movie.year}</span><span>{movie.runtime} мин</span><span>{movie.genre}</span></div>
      <div className="feature__actions">
        <button className="button button--solid" onClick={onOpen}>Выбрать места <ArrowRight size={16} /></button>
        <button className={isSaved ? 'button button--outline is-saved' : 'button button--outline'} onClick={() => onSave(movie.id)}><Heart size={16} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Сохранено' : 'В избранное'}</button>
      </div>
    </div>
  </section>;
}

function MovieCard({ movie, saved, onToggleSave, onOpen }) {
  return <article className="movie-card">
    <div className="movie-card__visual">
      <button className="movie-card__poster-trigger" onClick={onOpen} aria-label={`Подробнее о фильме ${movie.title}`}>
        <img src={image(movie.poster)} alt={`Постер ${movie.title}`} loading="lazy" />
        {movie.rating && <span className="movie-card__rating"><Star size={12} fill="currentColor" /> {movie.rating}</span>}
      </button>
      <button className={saved ? 'save-button is-saved' : 'save-button'} onClick={() => onToggleSave(movie.id)} aria-label={saved ? 'Убрать из избранного' : 'Добавить в избранное'}>
        <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
    <div className="movie-card__info">
      <div className="movie-card__topline"><span>{movie.genre}</span><span>{movie.year}</span></div>
      <h2>{movie.title}</h2>
      <div className="movie-card__bottom">{movie.runtime && <span><Clock3 size={13} /> {movie.runtime} мин</span>}<button onClick={onOpen}>Сеансы <ArrowRight size={14} /></button></div>
    </div>
  </article>;
}

function UpcomingCard({ movie }) {
  return <article className="upcoming-card">
    <div className="upcoming-card__poster" style={{ '--poster-accent': movie.accent }}>
      {movie.poster
        ? <img src={movie.poster} alt={`Постер фильма ${movie.title}`} loading="lazy" />
        : <div className="upcoming-card__placeholder" aria-label={`Постер фильма ${movie.title} ещё не вышел`}>
          <span>СКОРО В КИНО</span>
          <strong>{movie.original}</strong>
          <small>{movie.year}</small>
        </div>}
      <span className="upcoming-card__date">{movie.release}</span>
    </div>
    <div className="upcoming-card__info">
      <div className="movie-card__topline"><span>{movie.genre}</span><span>{movie.year}</span></div>
      <h2>{movie.title}</h2>
    </div>
  </article>;
}

function MovieDialog({ movie, saved, onToggleSave, onClose, onConfirm }) {
  const [stage, setStage] = useState('details');
  const [session, setSession] = useState(sessions[1]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const trailerId = movie.trailer || trailerVideos[movie.id];

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  function toggleSeat(seat) {
    setError('');
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  }

  function submitBooking() {
    if (!selectedSeats.length) {
      setError('Выберите место');
      return;
    }
    onConfirm({
      id: `${Date.now()}-${movie.id}`,
      movieId: movie.id,
      movieTitle: movie.title,
      poster: movie.poster,
      session: `${session.time} · ${session.room}`,
      seats: selectedSeats,
      price: selectedSeats.length * 1800,
    });
  }

  return <div className={`dialog-backdrop ${stage === 'booking' ? 'dialog-backdrop--booking' : ''}`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className={`dialog ${stage === 'booking' ? 'dialog--booking' : ''} ${stage === 'details' && trailerId ? 'dialog--with-trailer' : ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <button className="dialog__close" onClick={onClose} aria-label="Закрыть"><X size={18} /></button>
      {stage === 'details' ? <>
        {trailerId ? <div className="dialog__trailer"><iframe src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&rel=0&playsinline=1`} title={`Трейлер: ${movie.title}`} allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div> : <div className="dialog__poster"><img src={image(movie.poster)} alt={`Постер ${movie.title}`} /></div>}
        <div className="dialog__body">
          <div className="dialog__facts"><span>{movie.genre}</span><span>{movie.year}</span>{movie.runtime && <span>{movie.runtime} мин</span>}{movie.rating && <span><Star size={13} fill="currentColor" /> {movie.rating}</span>}</div>
          <h2 id="dialog-title">{movie.title}</h2>
          <p className="dialog__original">{movie.original}</p>
          <p className="dialog__description">{movie.description}</p>
          <div className="dialog__actions">
            <button className="button button--solid" onClick={() => setStage('booking')}>Выбрать места <ArrowRight size={16} /></button>
            <button className={saved ? 'button button--outline is-saved' : 'button button--outline'} onClick={() => onToggleSave(movie.id)}><Heart size={16} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Сохранено' : 'В избранное'}</button>
          </div>
        </div>
      </> : <BookingView movie={movie} session={session} setSession={setSession} selectedSeats={selectedSeats} toggleSeat={toggleSeat} error={error} submitBooking={submitBooking} onBack={() => { setStage('details'); setError(''); }} />}
    </section>
  </div>;
}

function BookingView({ movie, session, setSession, selectedSeats, toggleSeat, error, submitBooking, onBack }) {
  const seatWord = selectedSeats.length === 1 ? 'место' : selectedSeats.length >= 2 && selectedSeats.length <= 4 ? 'места' : 'мест';
  return <div className="booking-content">
    <header className="booking-header">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Назад к фильму</button>
      <span>Бронирование</span>
      <span className="booking-film-name">{movie.title}</span>
    </header>
    <aside className="booking-sidebar">
      <span className="booking-label">Сеансы</span>
      <h2 id="dialog-title">{movie.title}</h2>
      <div className="booking-meta"><span>{movie.year}</span>{movie.runtime && <span>{movie.runtime} мин</span>}<span>{movie.genre}</span></div>
      <div className="booking-section-label">Выберите время</div>
      <div className="session-options">
        {sessions.map((item) => <button key={item.time} onClick={() => setSession(item)} className={session.time === item.time ? 'session-chip is-active' : 'session-chip'}>
          <strong>{item.time}</strong><span>{item.room}</span>
        </button>)}
      </div>
      <p className="booking-price">1 место — 1 800 ₸</p>
    </aside>
    <section className="booking-seats">
      <div className="booking-seats__top"><div><span className="booking-label">Зал · {session.room}</span><h3>Выберите места</h3></div><span className="selected-total">{selectedSeats.length} {seatWord} · {(selectedSeats.length * 1800).toLocaleString('ru-RU')} ₸</span></div>
      <div className="screen-label">ЭКРАН</div>
      <div className="seat-map-scroll">
        <div className="seat-map" role="group" aria-label="Выбор мест">
          {seatRows.map((row) => <div className="seat-row" key={row}><span className="seat-row__label">{row}</span>{seatNumbers.map((number) => {
            const seat = `${row}${number}`;
            const occupied = occupiedSeats.includes(seat);
            const active = selectedSeats.includes(seat);
            return <button key={seat} disabled={occupied} className={`seat ${occupied ? 'is-occupied' : ''} ${active ? 'is-active' : ''}`} onClick={() => toggleSeat(seat)} aria-label={`Место ${seat}${occupied ? ' занято' : ''}`} aria-pressed={active}>{number}</button>;
          })}<span className="seat-row__label">{row}</span></div>)}
        </div>
      </div>
      <div className="seat-legend"><span><i className="legend-seat" /> Свободно</span><span><i className="legend-seat is-picked" /> Выбрано</span><span><i className="legend-seat is-taken" /> Занято</span></div>
      {error && <p className="booking-error" role="alert">{error}</p>}
      <button className="button button--solid booking-submit" onClick={submitBooking}>Забронировать места <Ticket size={16} /></button>
    </section>
  </div>;
}

function TicketList({ bookings, onRemove, onBrowse }) {
  if (!bookings.length) return <div className="empty-state"><Ticket size={25} /><h2>Пока нет билетов</h2><button className="button button--solid" onClick={onBrowse}>Выбрать фильм <ArrowRight size={16} /></button></div>;
  return <div className="ticket-list">{bookings.map((booking) => <article className="ticket-card" key={booking.id}>
    <img className="ticket-card__poster" src={image(booking.poster)} alt="" />
    <div className="ticket-card__main"><h2>{booking.movieTitle}</h2><p>{booking.session}</p><div className="ticket-card__seats">{booking.seats.map((seat) => <span key={seat}>{seat}</span>)}</div></div>
    <div className="ticket-card__price"><strong>{booking.price.toLocaleString('ru-RU')} ₸</strong><button onClick={() => onRemove(booking.id)}>Отменить</button></div>
  </article>)}</div>;
}

function EmptyState({ savedOnly, clearSearch, onBrowse }) {
  return <div className="empty-state">
    {savedOnly ? <Heart size={25} /> : <Search size={25} />}
    <h2>{savedOnly ? 'Пока ничего нет' : 'Фильмы не найдены'}</h2>
    {savedOnly ? <button className="button button--solid" onClick={onBrowse}>К фильмам <ArrowRight size={16} /></button> : <button className="button button--outline" onClick={clearSearch}>Сбросить фильтры</button>}
  </div>;
}

export default App;

