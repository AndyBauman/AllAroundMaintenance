/**
 * Stage 7 language landing pages.
 * Keep reviewed: false until a native speaker signs off — pages stay noindex and out of the sitemap.
 */

export type LangCode = "ru" | "uk" | "es";

export type LanguagePage = {
  code: LangCode;
  /** BCP 47 html lang */
  htmlLang: string;
  /** Native label for the footer switch */
  nativeName: string;
  /** English label */
  englishName: string;
  path: `/${LangCode}`;
  title: string;
  description: string;
  h1: string;
  intro: string;
  servicesHeading: string;
  servicesBody: string;
  areasHeading: string;
  areasBody: string;
  phonesHeading: string;
  estimateHeading: string;
  estimateBody: string;
  languageNote: string;
  licensesHeading: string;
  cta: string;
  /** Native-speaker review gate */
  reviewed: boolean;
  updated: string;
};

export const LANGUAGE_PAGES: LanguagePage[] = [
  {
    code: "ru",
    htmlLang: "ru",
    nativeName: "Русский",
    englishName: "Russian",
    path: "/ru",
    title: "All Around Maintenance — обслуживание домов на русском",
    description:
      "Семейная компания с 1999 года: крыши, желоба, сайдинг и террасы в Portland, OR и Vancouver, WA. Можно обсудить проект на русском. (503) 209-2023 · (360) 772-0224.",
    h1: "Ремонт и обслуживание домов — говорим по-русски",
    intro:
      "All Around Maintenance Inc. — семейный подрядчик в агломерации Portland (Орегон) и Vancouver (Вашингтон) с 1999 года. Мы ремонтируем и обслуживаем крыши, желоба, сайдинг, террасы и выполняем другие работы по дому для владельцев, ТСЖ и бизнеса.",
    servicesHeading: "Чем мы занимаемся",
    servicesBody:
      "Осмотр и ремонт кровли, удаление мха, чистка и ремонт желобов, восстановление террас, мойка фасадов, ремонт сайдинга и заборов, устранение сухой гнили, мелкий ремонт и вывоз мусора. Не выполняем канализацию, септик и фундаментные работы.",
    areasHeading: "Где работаем",
    areasBody:
      "Метро Portland, OR и Vancouver, WA, включая Gresham, Beaverton, Hillsboro, Tigard, Lake Oswego, Camas, Washougal, Battle Ground, Ridgefield, Longview, Kelso и соседние районы.",
    phonesHeading: "Телефоны",
    estimateHeading: "Бесплатная смета",
    estimateBody:
      "Опишите задачу по телефону или через форму заявки. Мы отвечаем в тот же день и присылаем постатейную смету в течение одного рабочего дня — без обязательств.",
    languageNote:
      "Вы можете обсудить проект на русском языке. Мы не обещаем конкретного сотрудника или что на объекте обязательно будет бригада, говорящая только по-русски — но общение по смете и объёму работ на русском доступно.",
    licensesHeading: "Лицензии",
    cta: "Позвонить или запросить смету",
    reviewed: false,
    updated: "2026-11-26",
  },
  {
    code: "uk",
    htmlLang: "uk",
    nativeName: "Українська",
    englishName: "Ukrainian",
    path: "/uk",
    title: "All Around Maintenance — обслуговування дому українською",
    description:
      "Сімейна компанія з 1999 року: дахи, ринви, сайдинг і тераси в Portland, OR та Vancouver, WA. Можна обговорити проєкт українською. (503) 209-2023 · (360) 772-0224.",
    h1: "Ремонт і обслуговування дому — спілкуємося українською",
    intro:
      "All Around Maintenance Inc. — сімейний підрядник у метрополії Portland (Орегон) і Vancouver (Вашингтон) з 1999 року. Ми ремонтуємо та обслуговуємо дахи, ринви, сайдинг, тераси й виконуємо інші роботи по дому для власників, ОСББ та бізнесу.",
    servicesHeading: "Що ми робимо",
    servicesBody:
      "Огляд і ремонт покрівлі, видалення моху, чищення та ремонт ринв, відновлення терас, миття фасадів, ремонт сайдингу й парканів, усунення сухої гнилі, дрібний ремонт і вивіз сміття. Не виконуємо каналізацію, септик і фундаментні роботи.",
    areasHeading: "Де працюємо",
    areasBody:
      "Метро Portland, OR і Vancouver, WA, зокрема Gresham, Beaverton, Hillsboro, Tigard, Lake Oswego, Camas, Washougal, Battle Ground, Ridgefield, Longview, Kelso та сусідні райони.",
    phonesHeading: "Телефони",
    estimateHeading: "Безкоштовний кошторис",
    estimateBody:
      "Опишіть завдання телефоном або через форму заявки. Ми відповідаємо того ж дня й надсилаємо постатейний кошторис протягом одного робочого дня — без зобов’язань.",
    languageNote:
      "Ви можете обговорити проєкт українською. Ми не обіцяємо конкретну людину чи що на об’єкті обов’язково буде бригада, яка говорить лише українською — але спілкування щодо кошторису й обсягу робіт українською доступне.",
    licensesHeading: "Ліцензії",
    cta: "Зателефонувати або запросити кошторис",
    reviewed: false,
    updated: "2026-11-26",
  },
  {
    code: "es",
    htmlLang: "es",
    nativeName: "Español",
    englishName: "Spanish",
    path: "/es",
    title: "All Around Maintenance — mantenimiento del hogar en español",
    description:
      "Empresa familiar desde 1999: techos, canaletas, revestimiento y terrazas en Portland, OR y Vancouver, WA. Puede hablar del proyecto en español. (503) 209-2023 · (360) 772-0224.",
    h1: "Reparación y mantenimiento del hogar — atendemos en español",
    intro:
      "All Around Maintenance Inc. es un contratista familiar en el área metropolitana de Portland (Oregón) y Vancouver (Washington) desde 1999. Reparamos y mantenemos techos, canaletas, revestimiento, terrazas y otros trabajos de la casa para propietarios, HOA y negocios.",
    servicesHeading: "Qué hacemos",
    servicesBody:
      "Inspección y reparación de techos, eliminación de musgo, limpieza y reparación de canaletas, restauración de terrazas, lavado a presión, reparación de revestimiento y cercas, pudrición seca, trabajos generales y retiro de escombros. No hacemos alcantarillado, sépticos ni cimientos.",
    areasHeading: "Dónde trabajamos",
    areasBody:
      "El área de Portland, OR y Vancouver, WA, incluyendo Gresham, Beaverton, Hillsboro, Tigard, Lake Oswego, Camas, Washougal, Battle Ground, Ridgefield, Longview, Kelso y comunidades cercanas.",
    phonesHeading: "Teléfonos",
    estimateHeading: "Presupuesto gratis",
    estimateBody:
      "Cuéntenos el trabajo por teléfono o con el formulario. Respondemos el mismo día y enviamos un presupuesto detallado en un día hábil, sin obligación.",
    languageNote:
      "Puede hablar del proyecto en español. No prometemos una persona específica ni que en la obra haya siempre un equipo que solo hable español; sí puede coordinar el alcance y el presupuesto en español.",
    licensesHeading: "Licencias",
    cta: "Llamar o pedir presupuesto",
    reviewed: false,
    updated: "2026-11-26",
  },
];

export function getLanguagePage(code: string): LanguagePage | undefined {
  return LANGUAGE_PAGES.find((p) => p.code === code);
}

export function publishedLanguagePages(): LanguagePage[] {
  return LANGUAGE_PAGES.filter((p) => p.reviewed);
}

/** hreflang map for alternates.languages (paths without domain). */
export function hreflangLanguages(): Record<string, string> {
  return {
    en: "/",
    ru: "/ru",
    uk: "/uk",
    es: "/es",
    "x-default": "/",
  };
}
