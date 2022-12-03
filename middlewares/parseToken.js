import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export default async function jwtVerify(req, res, next) {
  console.log("COMIENZA EL MIDDLEWARE");
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(authHeader);
    console.log(`TOKEN: ${token} `);
    const decoded = await jwt.verify(token, process.env.SECRET);
    req.token = decoded;
    console.log(token, decoded);
  }
  console.log("TERMINA EL MIDDLEWARE");
  next();
}
