import {faker} from "@faker-js/faker";
import Cryptr from "cryptr";
import dayjs from "dayjs";
import {Card, CardInsertData, findByTypeAndEmployeeId, insert, TransactionTypes} from "./../repositories/cardRepository.js";
import {Company, findByApiKey} from "./../repositories/companyRepository.js";
import {Employee, findById} from "./../repositories/employeeRepository.js";

const secretKey: string = process.env.CRYPTR_SECRET || "secret_key";
const cryptr = new Cryptr(secretKey);

async function createNewCard(employeeId: number, cardType: TransactionTypes, apiKey: string) {
  await verifyIfCompanyExists(apiKey);
  await verifyIfUserExists(employeeId);
  await verifyIfUserHasCard(cardType, employeeId);
  const cardData: CardInsertData = await formatNewCard(employeeId, cardType);
  await insert(cardData);
}

async function verifyIfUserExists(id: number) {
  const hasUser: Employee = await findById(id);
  if(!hasUser) throw { type: "error_not_found", message: "Usuário não encontrado." }; 
}

async function verifyIfUserHasCard(type: TransactionTypes, id: number) {
  const hasCard: Card = await findByTypeAndEmployeeId(type, id);
  if(!!hasCard) throw { type: "error_conflict", message: "Usuário já possui um cartão desse tipo." };
}

async function verifyIfCompanyExists(apiKey: string) {
  const hasCompany: Company = await findByApiKey(apiKey);
  if(!hasCompany) throw { type: "error_not_found", message: "Empresa não encontrada." };
}

async function formatNewCard(employeeId: number, cardType: TransactionTypes) {
  const number: string = faker.finance.creditCardNumber();
  const securityCode: string = faker.finance.creditCardCVV();
  const { fullName }: { fullName: string } = await findById(employeeId);
  const cardholderName: string = formatName(fullName);
  const expirationDate: string = dayjs().add(5, "year").format("MM/YY");
  const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode: cryptr.encrypt(securityCode),
    expirationDate,
    isVirtual: false,
    isBlocked: true,
    type: cardType,
  }
  return cardData;
}

function formatName(name: string) {
  const nameArray: string[] = name?.split(" ");
  const lastName: string = nameArray.pop() || "";
  const finalNameArray: string[] = [];
  finalNameArray.push(nameArray[0]);

  for(let i = nameArray.length - 1; i > 0; i--) {
    if(nameArray[i].length >= 3) finalNameArray.push(nameArray[i][0]);
  }

  finalNameArray.push(lastName);
  const nameString: string = finalNameArray.join(" ");
  return nameString.toUpperCase();
}

export { createNewCard };