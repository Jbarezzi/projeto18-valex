import Cryptr from "cryptr";

const secretKey: string = process.env.CRYPTR_SECRET!;
const cryptr = new Cryptr(secretKey);

export default cryptr;