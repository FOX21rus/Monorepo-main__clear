
Требуется написать функцию на NestJS
для расчета доходности по следующей формуле:

Доходность = (Nк - No - i + w) ×T×100%/ ( No ×T +  i× ti/T  - w×tw/T),
где Nк -сумма usdt на сегодня, 
No-первоначальная сумма ввода usdt, 
i - сумма ввода usdt в течение периода (не считая первую сумму ввода), 
w - сумма вывода usdt, 
T - количество дней с первой суммы ввода по сегодня, 
ti - количество дней с момента ввода суммы i по сегодня, 
tw - количество дней с момента вывода суммы w по сегодня

Вход функции - userUri, Nк
Выход - доходность в процентах.


Суммы ввода взять из транзакций:
```graphql
type CrescoTransaction
@mongoose
{
    _id:ID
    transactionType:CrescoTransactionTypeEnum
    userUri:String,
    amountUSDT:Float!,
    amountCrescoTokens:Float!,
    status:CrescoTransactionStatus,
    @default(string: "PENDING")
    fromWallet:String!,
    toWallet:String!,
    createdAt:Date!
}

enum CrescoTransactionStatus {
    PENDING
    ROBOT_APPROVED
    APPROVED
    FAILED
}

enum CrescoTransactionTypeEnum {
    CLIENT_BUY_TOKENS,
    CLIENT_SELL_TOKENS,
}
```

В выборках использовать только транзакции со статусом CrescoTransactionStatus.APPROVED 
(обрати внимание, что сгенерированные enum используеются именно в таком виде)
Так же обрати внимание, что Nк берется как входное значение функции.
Ввод средств - CLIENT_BUY_TOKENS
Вывод средств - CLIENT_BUY_TOKENS

Функция будет использована напиши внутри этого класса:
```ts
@Injectable()
export class CrescoTokenRateCalculatorService {
  constructor(
    private readonly crescoTransactionEntityService: CrescoTransactionEntityService,
  ) {
  // you can use crescoTransactionEntityService.mongoose to access mongoose for CrescoTransaction Entity
  }
}

```

# Result

```ts
import { Injectable } from '@nestjs/common';
import { CrescoTransactionEntityService } from '../cresco-transaction-entity/cresco-transaction-entity.service';

@Injectable()
export class CrescoTokenRateCalculatorService {
  constructor(
    private readonly crescoTransactionEntityService: CrescoTransactionEntityService,
  ) {}

  async calculateProfitability(userUri: string, Nk: number): Promise<number> {
    const approvedTransactions = await this.crescoTransactionEntityService.mongoose
      .find({ userUri, status: 'APPROVED' })
      .exec();

    const No = approvedTransactions
      .filter((t) => t.transactionType === 'CLIENT_BUY_TOKENS')
      .shift().amountUSDT;

    const inputTransactions = approvedTransactions.filter(
      (t) => t.transactionType === 'CLIENT_BUY_TOKENS',
    ).slice(1);

    const outputTransactions = approvedTransactions.filter(
      (t) => t.transactionType === 'CLIENT_SELL_TOKENS',
    );

    const T = Math.floor(
      (new Date().getTime() - approvedTransactions[0].createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    const i = inputTransactions.reduce((sum, t) => sum + t.amountUSDT, 0);
    const ti = inputTransactions.reduce(
      (sum, t) =>
        sum +
        Math.floor(
          (new Date().getTime() - t.createdAt.getTime()) / (1000 * 60 * 60 * 24),
        ),
      0,
    );

    const w = outputTransactions.reduce((sum, t) => sum + t.amountUSDT, 0);
    const tw = outputTransactions.reduce(
      (sum, t) =>
        sum +
        Math.floor(
          (new Date().getTime() - t.createdAt.getTime()) / (1000 * 60 * 60 * 24),
        ),
      0,
    );

    const profitability =
      ((Nk - No - i + w) * T * 100) / (No * T + i * (ti / T) - w * (tw / T));

    return profitability;
  }
}

```

Теперь помоги сформировать тестовые данные для кода выше.
Для userUri `email://user-1@domain.com`
Сформируй метод внутри CrescoTokenRateCalculatorService (не дублируй только соседний метод который ты написал выше).
Пусть он называется test__createTransactions
Пусть он удалит все транзакции пользователя `email://user-1@domain.com`,
создаст 5 транзакций на ввод и 2 (маленькие) транзакции на вывод средств, все в разные даты.

Пусть теперь Nk будет в два раза больше, чем итоговый баланс пользователя. 
Это значит, что благодаря активности фонда, капитал удвоился.

Напиши такую функцию и напиши что должна выдать функция calculateProfitability на этих данных (в совокупности с тестовым Nk, который ты тоже напишешь) 
и почему.

# 

Пусть у нас есть следующие транзакции на ввод для пользователя

5000 USDT введено 2023-01-01 (No)
4000 USDT введено 2023-01-15
3000 USDT введено 2023-01-30
2000 USDT введено 2023-02-14
1000 USDT введено 2023-02-28

Кроме того, у нас есть следующие транзакции на вывод:

500 USDT выведено 2023-01-19
1000 USDT выведено 2023-02-09

Пусть значение Nk, которое представляет текущую стоимость активов пользователя, равно 27000 USDT 
(считаем, что удовоилась стоимость портфеля за это время)


что является удвоением чистого капитала пользователя.

Напишите пожалуйста подробный пример расчета, потому что 

Мы рассчитываем доходность с 2023-01-01 (дата первой транзакции на ввод) по 2023-04-01. 

Пусть значение Nk, которое представляет текущую стоимость активов пользователя, равно 27000 USDT, 
что является удвоением чистого капитала пользователя.

Вводы: 5000 + 4000 + 3000 + 2000 + 1000 = 15000 USDT
Выводы: 500 + 1000 = 1500 USDT
Баланс: 15000 - 1500 = 13500 USDT

Nк = 27000
No = 5000
i = 4000 + 3000 + 2000 + 1000 = 10000
w = 500 + 1000 = 1500
T = количество дней с 2023-01-01 по, например, 2023-04-01 (дата до которой считаем доходность) = 90
ti = (15 + 30 + 45 + 60) = 150
tw = (19 + 40) = 59

Доходность = ((27000 - 5000 - 10000 + 1500) * 90 * 100) / (5000 * 90 + 10000 * (150 / 90) - 1500 * (59 / 90)) = (18500 * 90 * 100) / (450000 + 16666.67 - 981.67) = 1665000 / 458684.99 = 36.29%



На основе этих данных, функция calculateProfitability вычисляет доходность инвестиций пользователя за данный период.



{
"_id": {
"$oid": "637e9ba5c2b0963f2b1b1453"
},
"transactionType": "CLIENT_BUY_TOKENS",
"userUri": "email://user-1@domain.com",
"amountUSDT": 20,
"amountCrescoTokens": 2,
"status": "APPROVED",
"fromWallet": "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53c999",
"toWallet": "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53c001",
"createdAt": {
"$date": {
"$numberLong": "1665085306652"
}
},
"__v": 0
}