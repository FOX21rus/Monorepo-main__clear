import {Injectable} from '@nestjs/common';
import xlsx from 'node-xlsx';
import * as fs from 'fs';
import {CrescoDepositsEntityService} from '../../entities/cresco-deposits/cresco-deposits.entity.service';
import {UserEntityService} from "../../entities/user/user.entity.service";
import {HashService} from "../precon/crypto/hash/hash.service";

@Injectable()
export class CrescoParseReportXlsxService {
    constructor(
        private readonly crescoDepositsEntityService: CrescoDepositsEntityService,
        private readonly userEntityService: UserEntityService,
    ) {
    }

    parseLocalFile(path: string) {
        // console.log(__dirname)
        return this.parseXlsxBuffer(fs.readFileSync(path));
    }

    async parseXlsxBuffer(buffer: Buffer) {
        const workSheetsFromBuffer = xlsx.parse(buffer);
        if (!fs.existsSync('public')) fs.mkdirSync('public');
        const sheet0 = workSheetsFromBuffer[0].data;
        fs.writeFileSync(
            'public/dumpCrescoParseReportXlsxService.json',
            JSON.stringify(sheet0, null, 2),
        );
        const colDefs = {
            1: {
                title: 'Данные договора',
                name: 'agreementNo',
            },
            2: {
                title: 'Номер депозита',
                name: 'depositNo',
            },
            3: {
                title: 'Дата начала',
                name: 'startDate',
            },
            4: {
                title: 'Дата окончания',
                name: 'finishDate',
            },
            5: {
                title: 'Валюта договора',
                name: 'currency',
            },
            6: {
                title: 'Процентная ставка',
                name: 'percent',
            },
            7: {
                title: 'Периодичность выплаты',
                name: 'period',
            },
            17: {
                title: 'Сумма депозита',
                name: 'amountInitial',
                isFloat: true,
            },
            18: {
                title: 'Сумма %',
                name: 'amountPercents',
                isFloat: true,
            },
            19: {
                title: 'Итого',
                name: 'amountTotal',
                isFloat: true,
            },

            20: {
                title: 'ФИО',
                name: 'fio',
            },
            21: {
                title: 'Телефон клиента',
                name: 'phone',
                toIntString: true
            },
            22: {
                title: 'Действует/закрыт',
                name: 'isActive',
                trueIfEqual: 'действует',
            },
        };
        const agreementToPhone = {} as Record<string, string>
        const agreementToSignature = {} as Record<string, string>
        const date = sheet0[2][1]?.split('по')?.[1]?.trim() ?? '';
        const depositRecords = sheet0
            .map((row) => {
                return Object.fromEntries(
                    Object.entries(colDefs).map(([idx, def]: any) => {
                        if (def.trueIfEqual) {
                            return [def.name, row[idx] === def.trueIfEqual];
                        }
                        if (def.isFloat) {
                            return [def.name, parseFloat(row[idx])];
                        }
                        if (def.toIntString) {
                            console.log("[phone]",def.name, row[idx])
                            return [def.name, String(row[idx])?.replace?.(/\D/g, '')??""];
                        }
                        return [def.name, row[idx]];
                    }),
                ) as {
                    agreementNo: string;
                    fio: string;
                    phone: string;
                    isActive: string;
                    amountTotal: number;
                    amountInitial: number;
                    amountPercents: number;
                };
            })
            .filter((d) => d.amountTotal !== 0);
        // console.log('depositRecords', depositRecords);

        const deposits = Object.fromEntries(
            depositRecords.map((record) => {
                let phone = record.phone;
                agreementToPhone[record.agreementNo] = phone;
                let signature = record.agreementNo?new HashService().stringToHash(record.agreementNo):null;
                agreementToSignature[record.agreementNo]=signature;
                const attributed = depositRecords.filter((d) => d.fio === record.fio);
                return [record.agreementNo, {attributed, date, phone, signature}];
            }),
        );

        await this.crescoDepositsEntityService.mongoose.findOneAndUpdate(
            {name: 'current'},
            {name: 'current', payload: deposits},
            {new: true, upsert: true},
        );
        console.log({agreementToPhone})



        const p = Object.entries(agreementToPhone).filter(([a, p]) => p?.length > 4).map(
            ([a, p]) => this.userEntityService.mongoose
                .findOneAndUpdate({phone: p}, {
                    $set: {
                        phone: p,
                        agreementName: a,
                        signature: agreementToSignature[a],
                    },
                    $addToSet: {
                        agreementNames: a
                    }
                }, {upsert: true}).then(d => {
                    return this.userEntityService.mongoose
                        .findOneAndUpdate({phone:p,email:{$exists:false}}, {
                            $set: {
                                email: `${p}@customer.cresco.capital`,
                            }})
                }))


        await Promise.all(p);


        // fs.writeFileSync(
        //   'public/deposits.json',
        //   JSON.stringify(parsedData, null, 2),
        // );

        // console.log(sheet0);
        // const headerIdx = sheet0.findIndex((row) => row[1] === '1');
        // console.log('headerIdx', headerIdx);
        // const lastIdx = sheet0.findIndex(
        //   (row, i) => i > headerIdx && row[1] === '',
        // );
        // const parsedData = {} as any;
        // for (let i = headerIdx + 1; i < sheet0.length; i++) {
        //   const line = sheet0[i];
        //   console.log(line);
        //   if (!parsedData[line[1]])
        //     parsedData[line[1]] = {
        //       RUB: {},
        //       USD: {},
        //       EUR: {},
        //       CHF: {},
        //       fio: undefined,
        //       agreementNo: undefined,
        //     } as any;
        //   const currency = line[5];
        //   const fio = line[20];
        //   const agreementNo = line[1];
        //   if (!agreementNo) continue;
        //   parsedData[line[1]]['fio'] = fio;
        //   parsedData[line[1]]['agreementNo'] = agreementNo;
        //   Object.entries(colDefs).forEach(([idx, def]) => {
        //     parsedData[line[1]][currency][def.name] = line[idx];
        //   });
        //
        //   parsedData[line[1]][currency]['amountInitial'] = parseFloat(
        //     parsedData[line[1]][currency]['amountInitial'] || '0',
        //   );
        //   parsedData[line[1]][currency]['amountPercents'] = parseFloat(
        //     parsedData[line[1]][currency]['amountPercents'] || '0',
        //   );
        //   parsedData[line[1]][currency]['amountTotal'] = parseFloat(
        //     parsedData[line[1]][currency]['amountTotal'] || '0',
        //   );
        //   if (parsedData[line[1]][currency]['isActive'] === 'действует')
        //     for (let j = headerIdx + 1; j < sheet0.length; j++) {
        //       if (i === j) continue;
        //
        //       const lineFound = sheet0[j];
        //       const currencyFound = lineFound[5];
        //       const fioFound = lineFound[20];
        //       const agreementNoFound = lineFound[1];
        //       if (
        //         currency !== currencyFound ||
        //         fioFound !== fio ||
        //         agreementNo !== agreementNoFound
        //       )
        //         continue;
        //       // console.log('add',agreementNo,agreementNoFound)
        //       Object.entries(colDefs).forEach(([idx, def]) => {
        //         if (
        //           ['amountInitial', 'amountPercents', 'amountTotal'].includes(
        //             def.name,
        //           )
        //         )
        //           parsedData[line[1]][currency][def.name] += parseFloat(
        //             lineFound[idx] || '0',
        //           );
        //       });
        //     }
        //
        //   if (
        //     parsedData[line[1]][currency]['amountPercents'] &&
        //     parsedData[line[1]][currency]['amountInitial']
        //   ) {
        //     parsedData[line[1]][currency]['growPercentage'] =
        //       parsedData[line[1]][currency]['amountPercents'] /
        //       parsedData[line[1]][currency]['amountInitial'];
        //   } else parsedData[line[1]][currency]['growPercentage'] = 0;
        // }
        // console.log(parsedData);
        //
    }
}
