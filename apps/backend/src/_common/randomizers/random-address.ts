import { rusRegions } from './rus-regions';
import { randInt, randPos } from './rand-int';
export const randomAddress = () => {
  const city = randPos(rusRegions);
  const street = [
    'Центральная',
    'Ленина',
    'Молодежная',
    'Лесная',
    'Школьная',
    'Садовая',
    'Советская',
    'Новая',
    'Заречная',
    'Зеленая',
    'Мира',
    'Пушкина',
    'Лермонтова',
    'Островского',
    'Гоголя',
    'Маяковского',
    'Гагарина',
  ];

  const house =
    Math.random() > 0.5
      ? `${String(randInt(1, 20))}`
      : `${String(randInt(1, 20))}/${String(randInt(1, 4))}`;

  return `${city}, ул.${randPos(street)} ${house}`;
};
