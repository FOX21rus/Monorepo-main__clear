import { randPos } from './rand-int';

export const randomVendorName = (idx: number) => {
  const first = [
    'Инновационный',
    'Невероятный',
    'Прибыльный',
    'Фартовый',
    'Асинхронный',
    'Технологичный',
    'Поразительный',
    'Доступный',
    'Быстрый',
    'Надежный',
    'Прелестный',
    'Обаятельный',
    'Легендарный',
    'Бомбический',
  ];
  const second = [
    'Попугай',
    'Создатель Решений',
    'Аутстафф',
    'Поставщик Кадров',
    'Рабовладелец',
    'Эйчар',
  ];

  return {
    name: `${randPos(first)} ${randPos(second)}`,
    logo: {
      name: 'logo.png',
      url: `/examples/vendor-logo/${(idx % 28) + 1}.svg`,
    },
    slug: 'vendor-' + String(idx),
  };
};

export const randomCustomerName = (idx: number) => {
  const names = [
    {
      name: 'Альфа Банк',
      slug: 'alfa',
      logo: { name: '1.png', url: `/examples/customer-logo/alfa.png` },
    },
    {
      name: 'Сбер',
      slug: 'sber',
      logo: { name: '1.png', url: `/examples/customer-logo/sber.png` },
    },
    {
      name: 'Яндекс',
      slug: 'yandex',
      logo: { name: '1.png', url: `/examples/customer-logo/yandex.png` },
    },
    {
      name: 'Тинькофф',
      slug: 'tinkoff',
      logo: { name: '1.png', url: `/examples/customer-logo/tinkoff.png` },
    },
    {
      name: 'ВТБ',
      slug: 'vtb',
      logo: { name: '1.png', url: `/examples/customer-logo/vtb.png` },
    },
  ];
  return names[idx % 5];
};
