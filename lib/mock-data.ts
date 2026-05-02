export interface Article {
  id: number
  title: string
  author: string
  pages: string
  views: number
  downloads: number
  category: string
  year: number
  issue: string
  language: string
  abstract: string
}

export const currentIssueArticles: Article[] = [
  {
    id: 1,
    title: 'Применение методов машинного обучения в анализе геномных данных',
    author: 'Сейткали А.Б., Нурланов Е.Т.',
    pages: '1–8',
    views: 214,
    downloads: 87,
    category: 'Естественные науки',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'В данной работе рассматривается применение современных алгоритмов машинного обучения для анализа больших геномных данных. Предложен новый подход к классификации генетических вариантов.',
  },
  {
    id: 2,
    title: 'Разработка биоразлагаемых полимеров для медицинских имплантатов',
    author: 'Жаксыбекова М.К.',
    pages: '9–17',
    views: 178,
    downloads: 64,
    category: 'Медицина и здравоохранение',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'Исследование посвящено синтезу и характеристике новых биоразлагаемых полимеров на основе полилактида для использования в медицинских имплантатах.',
  },
  {
    id: 3,
    title: 'Цифровая трансформация агропромышленного комплекса Казахстана',
    author: 'Байсалов Д.Р., Ахметова С.Н.',
    pages: '18–26',
    views: 302,
    downloads: 115,
    category: 'Сельское хозяйство',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'Статья анализирует текущее состояние цифровизации в сельском хозяйстве Казахстана и предлагает пути ускорения внедрения современных технологий.',
  },
  {
    id: 4,
    title: 'Социально-экономические последствия пандемии COVID-19 в Центральной Азии',
    author: 'Касымов Т.А.',
    pages: '27–35',
    views: 389,
    downloads: 143,
    category: 'Социальные науки',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'Комплексное исследование социально-экономических последствий пандемии COVID-19 для стран Центральной Азии с анализом принятых мер государственной поддержки.',
  },
  {
    id: 5,
    title: 'Оптимизация алгоритмов сжатия данных для IoT-устройств',
    author: 'Алиев Р.М., Смирнова О.В.',
    pages: '36–44',
    views: 156,
    downloads: 72,
    category: 'Инжиниринг',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'Предлагается новый алгоритм сжатия данных с малыми вычислительными ресурсами, специально оптимизированный для устройств Интернета вещей с ограниченной памятью.',
  },
  {
    id: 6,
    title: 'Традиционная казахская литература в контексте постколониального дискурса',
    author: 'Дауренбекова Г.Ж.',
    pages: '45–53',
    views: 267,
    downloads: 98,
    category: 'Гуманитарные науки',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'Анализ произведений казахской классической литературы с точки зрения постколониальной теории и современных гуманитарных подходов.',
  },
]

export const allArticles: Article[] = [
  ...currentIssueArticles,
  {
    id: 7,
    title: 'Влияние наночастиц серебра на бактериальные биоплёнки',
    author: 'Тулеубекова А.С.',
    pages: '1–9',
    views: 193,
    downloads: 61,
    category: 'Естественные науки',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Казахский',
    abstract:
      'Зерттеу жұмысы күміс нанобөлшектерінің бактериялық биоплёнкаларға тигізетін әсерін зерттеуге арналған.',
  },
  {
    id: 8,
    title: 'Renewable Energy Potential in the Aral Sea Region',
    author: 'Kenzhebekov N.K., Petrov I.A.',
    pages: '10–19',
    views: 441,
    downloads: 167,
    category: 'Инжиниринг',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'English',
    abstract:
      'This paper evaluates the solar and wind energy potential in the Aral Sea region and proposes an integrated renewable energy framework for the area.',
  },
  {
    id: 9,
    title: 'Эпидемиология сахарного диабета 2 типа в Казахстане',
    author: 'Мусина Л.Е., Баймухамбетов С.Б.',
    pages: '20–29',
    views: 512,
    downloads: 203,
    category: 'Медицина и здравоохранение',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'Систематический обзор эпидемиологических данных по сахарному диабету второго типа в Казахстане за период 2015–2025 годов.',
  },
  {
    id: 10,
    title: 'Қазақстандағы мал шаруашылығы өнімділігін арттыру жолдары',
    author: 'Сәрсенов Б.Т.',
    pages: '30–38',
    views: 178,
    downloads: 55,
    category: 'Сельское хозяйство',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Казахский',
    abstract:
      'Мақалада Қазақстандағы мал шаруашылығы өнімділігін арттырудың негізгі факторлары мен жолдары қарастырылады.',
  },
  {
    id: 11,
    title: 'Городская идентичность в постсоветских городах: сравнительный анализ',
    author: 'Ержанова Р.А., Носов П.В.',
    pages: '39–47',
    views: 334,
    downloads: 128,
    category: 'Социальные науки',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'Русский',
    abstract:
      'Сравнительное исследование формирования городской идентичности в постсоветских городах на примере Алматы, Бишкека и Ташкента.',
  },
  {
    id: 12,
    title: 'Contemporary Kazakh Art and Global Aesthetic Movements',
    author: 'Abenova D.K.',
    pages: '48–56',
    views: 287,
    downloads: 104,
    category: 'Гуманитарные науки',
    year: 2026,
    issue: 'Том 1, №1, 2026',
    language: 'English',
    abstract:
      'This paper examines the integration of contemporary Kazakh visual art into global aesthetic movements while maintaining distinct national characteristics.',
  },
]

export const announcements = [
  {
    id: 1,
    date: '15 апреля 2026',
    title: 'Приём статей для второго выпуска (Том 1, №2, 2026)',
    content:
      'Редакция журнала SOVA объявляет о начале приёма статей для второго номера. Дедлайн подачи — 10 мая 2026 года. Статьи принимаются по всем тематическим направлениям журнала.',
  },
  {
    id: 2,
    date: '1 апреля 2026',
    title: 'Первый выпуск журнала SOVA опубликован',
    content:
      'Редакционная коллегия рада сообщить о выходе первого номера журнала SOVA: Science, Openness, Vision and Advancement. В выпуске представлены 12 статей по ключевым научным направлениям.',
  },
  {
    id: 3,
    date: '10 марта 2026',
    title: 'Журнал SOVA включён в базу данных Google Scholar',
    content:
      'С марта 2026 года все статьи журнала SOVA индексируются в Google Scholar. Это открывает широкие возможности для распространения научных работ авторов среди международного сообщества.',
  },
]
