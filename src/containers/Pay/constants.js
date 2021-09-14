import { RiVisaLine } from "react-icons/ri"
import { SiAmericanexpress } from "react-icons/si"
import {
  FaCcMastercard,
  FaCcDinersClub,
  FaCcDiscover,
  FaCcJcb,
} from "react-icons/fa"

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]
export const AMERICANEXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]
export const EXPIRYDATE = [/[0-9]/, /\d/, "/", /\d/, /\d/]
export const CVC = [/[0-9]/, /\d/, /\d/, /\d/]

export const CARDICON = {
  VISA: <RiVisaLine />,
  MASTERCARD: <FaCcMastercard />,
  DISCOVER: <FaCcDiscover />,
  AMERICAN_EXPRESS: <SiAmericanexpress />,
  DINERS_CLUB: <FaCcDinersClub />,
  JCB: <FaCcJcb />,
}

export const CARDARR = [
  "VISA",
  "MASTERCARD",
  "AMERICAN_EXPRESS",
  "DISCOVER",
  "DINERS_CLUB",
  "JCB",
]

export const COLORARR = [
  ["#20bdff", "#5433ff"],
  ["#ff4b1f", "#ff9068"],
  ["#ffb347", "#ffcc33"],
  ["#D38312", "#A83279"],
  ["#83a4d4", "#b6fbff"],
  ["#fbd3e9", "#bb377d"],
]
