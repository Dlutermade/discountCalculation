import { checkout } from "./checkout";
/**
 * author: 莫秉禾 Bill Mo
 */

document.getElementById("app").innerHTML =
  "Your price is $" + checkout(["003", "002", "003", "003", "004"]);
