// =============================================================
// TO'LOV REKVIZITLARI — bitta joydan boshqariladi
// -------------------------------------------------------------
// Haqiqiy rekvizitlarni shu fayldan to'ldiring.
// Har bir usul uchun:
//   enabled: rekvizit tayyor bo'lganda true qiling (UI'da "Tez orada" o'rniga ma'lumot chiqadi)
//   value  : asosiy qiymat
//            - card uchun: "8600 1234 5678 9012" (UZCARD/HUMO raqami)
//            - click/payme/paynet uchun: rasmiy to'lov IDsi yoki telefon raqami
//   url    : ixtiyoriy — rasmiy to'lov sahifasi havolasi (bo'sh string bo'lsa ko'rsatilmaydi)
//   note   : enabled=false bo'lganda ko'rsatiladigan izoh
// =============================================================

export interface PaymentMethod {
  id: "click" | "payme" | "paynet" | "card";
  label: string;
  enabled: boolean;
  value: string;
  url: string;
  note: string;
}

export const payments: PaymentMethod[] = [
  {
    id: "click",
    label: "Click",
    enabled: false,
    value: "REKVIZIT_KIRITILMAGAN", // <-- Click rekvizitini shu yerga qo'ying
    url: "",                        // <-- Click to'lov sahifasi URL (ixtiyoriy)
    note: "Rasmiy Click havolasini shu yerga qo'ying.",
  },
  {
    id: "payme",
    label: "Payme",
    enabled: false,
    value: "REKVIZIT_KIRITILMAGAN", // <-- Payme rekvizitini shu yerga qo'ying
    url: "",                        // <-- Payme to'lov sahifasi URL (ixtiyoriy)
    note: "Rasmiy Payme havolasini shu yerga qo'ying.",
  },
  {
    id: "paynet",
    label: "Paynet",
    enabled: false,
    value: "REKVIZIT_KIRITILMAGAN", // <-- Paynet rekvizitini shu yerga qo'ying
    url: "",                        // <-- Paynet to'lov sahifasi URL (ixtiyoriy)
    note: "Rasmiy Paynet havolasini shu yerga qo'ying.",
  },
  {
    id: "card",
    label: "Karta (UZCARD / HUMO)",
    enabled: false,
    value: "8600 XXXX XXXX XXXX", // <-- Karta raqamini shu yerga qo'ying
    url: "",
    note: "UZCARD / HUMO karta raqamini shu yerga qo'ying.",
  },
];
