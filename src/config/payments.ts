// =============================================================
// TO'LOV REKVIZITLARI — bitta joydan boshqariladi
// -------------------------------------------------------------
// Har bir usul uchun:
//   enabled: rekvizit tayyor bo'lganda true qiling (UI'da "Tez orada" o'rniga ma'lumot chiqadi)
//   value  : asosiy ko'rsatiladigan qiymat
//            - card uchun: "9860 0801 1818 4466" (4 xonadan bo'sh joy bilan, o'qiladigan format)
//            - click/payme/paynet uchun: rasmiy to'lov IDsi yoki telefon raqami
//   copy   : nusxalash tugmasi nusxalaydigan "toza" qimat (karta uchun bo'shliqsiz raqam)
//   owner  : faqat karta uchun — karta egasining FIO
//   url    : ixtiyoriy — rasmiy to'lov sahifasi havolasi (bo'sh string bo'lsa ko'rsatilmaydi)
//   note   : enabled=false bo'lganda ko'rsatiladigan izoh
// =============================================================

export interface PaymentMethod {
  id: "click" | "payme" | "paynet" | "card";
  label: string;
  enabled: boolean;
  value: string;
  copy?: string;
  owner?: string;
  url: string;
  note: string;
}

export const payments: PaymentMethod[] = [
  {
    id: "click",
    label: "Click",
    enabled: false,
    value: "REKVIZIT_KIRITILMAGAN",
    url: "",
    note: "Rasmiy Click havolasini shu yerga qo'ying.",
  },
  {
    id: "payme",
    label: "Payme",
    enabled: false,
    value: "REKVIZIT_KIRITILMAGAN",
    url: "",
    note: "Rasmiy Payme havolasini shu yerga qo'ying.",
  },
  {
    id: "paynet",
    label: "Paynet",
    enabled: false,
    value: "REKVIZIT_KIRITILMAGAN",
    url: "",
    note: "Rasmiy Paynet havolasini shu yerga qo'ying.",
  },
  {
    id: "card",
    label: "Karta (UZCARD / HUMO)",
    enabled: true,
    value: "9860 0801 1818 4466",
    copy: "9860080118184466",
    owner: "JAVOHIR QAXRAMONOV",
    url: "",
    note: "UZCARD / HUMO karta raqamini shu yerga qo'ying.",
  },
];
