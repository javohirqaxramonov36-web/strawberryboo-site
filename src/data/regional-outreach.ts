export interface RegionalInstitution {
  name: string;
  city: string;
  region: string;
  type: string;
  url: string;
  verification: 'official-page-read' | 'official-domain-recheck' | 'provisional';
}

export const regionalInstitutions: readonly RegionalInstitution[] = [
  { name: 'Andijan State University named after Zahiriddin Muhammad Babur', city: 'Andijan', region: 'Andijan', type: 'State university', url: 'https://www.adu.uz/', verification: 'official-page-read' },
  { name: 'Andijan State Medical Institute', city: 'Andijan', region: 'Andijan', type: 'Medical institute', url: 'https://adti.uz/en/', verification: 'official-page-read' },
  { name: 'Andijan State Technical Institute', city: 'Andijan', region: 'Andijan', type: 'Technical institute', url: 'https://astiedu.uz/', verification: 'official-domain-recheck' },
  { name: 'Fergana State University', city: 'Fergana', region: 'Fergana', type: 'State university', url: 'https://fdu.uz/', verification: 'official-page-read' },
  { name: 'Fergana State Technical University', city: 'Fergana', region: 'Fergana', type: 'Technical university', url: 'https://fstu.uz/', verification: 'official-domain-recheck' },
  { name: 'Kokand University', city: 'Kokand', region: 'Fergana', type: 'University', url: 'https://www.kokanduni.uz/en', verification: 'official-domain-recheck' },
  { name: 'Namangan State University', city: 'Namangan', region: 'Namangan', type: 'State university', url: 'https://namdu.uz/', verification: 'official-page-read' },
  { name: 'Namangan State Technical University', city: 'Namangan', region: 'Namangan', type: 'Technical university', url: 'https://namdtu.uz/en', verification: 'official-page-read' },
  { name: 'Namangan State Pedagogical Institute', city: 'Namangan', region: 'Namangan', type: 'Pedagogical institute', url: 'https://namspi.uz/en/aloqa', verification: 'official-page-read' },
  { name: 'Sharof Rashidov Samarkand State University', city: 'Samarkand', region: 'Samarkand', type: 'State university', url: 'https://www.samdu.uz/en/pages/university', verification: 'official-page-read' },
  { name: 'Samarkand State Medical University', city: 'Samarkand', region: 'Samarkand', type: 'Medical university', url: 'https://www.sammu.uz/en/pages/contact', verification: 'official-page-read' },
  { name: 'Samarkand State Institute of Foreign Languages', city: 'Samarkand', region: 'Samarkand', type: 'Higher-education institute', url: 'https://samdchti.uz/site/contact', verification: 'official-page-read' },
  { name: 'Samarkand Institute of Economics and Service', city: 'Samarkand', region: 'Samarkand', type: 'Higher-education institute', url: 'https://www.sies.uz/en', verification: 'official-page-read' },
  { name: 'Bukhara State University', city: 'Bukhara', region: 'Bukhara', type: 'State university', url: 'https://buxdu.uz/en/', verification: 'official-page-read' },
  { name: 'Bukhara State Technical University', city: 'Bukhara', region: 'Bukhara', type: 'Technical university', url: 'https://bstu.uz/', verification: 'official-page-read' },
  { name: 'Urgench State University named after Abu Rayhan Biruni', city: 'Urgench', region: 'Khorezm', type: 'State university', url: 'https://urdu.uz/en', verification: 'official-domain-recheck' },
  { name: 'Karshi State University', city: 'Qarshi', region: 'Kashkadarya', type: 'State university', url: 'https://qarshidu.uz/en', verification: 'official-page-read' },
  { name: 'Karshi State Technical University', city: 'Qarshi', region: 'Kashkadarya', type: 'Technical university', url: 'https://kstu.uz/en', verification: 'official-domain-recheck' },
  { name: 'Termez State University', city: 'Termez', region: 'Surkhandarya', type: 'State university', url: 'https://tersu.uz/', verification: 'official-page-read' },
  { name: 'Jizzakh State Pedagogical University', city: 'Jizzakh', region: 'Jizzakh', type: 'Pedagogical university', url: 'https://jdpu.uz/en/universitet', verification: 'official-page-read' },
  { name: 'Jizzakh Polytechnic Institute', city: 'Jizzakh', region: 'Jizzakh', type: 'Polytechnic institute', url: 'https://jizpi.uz/en', verification: 'official-page-read' },
  { name: 'Gulistan State University', city: 'Gulistan', region: 'Sirdarya', type: 'State university', url: 'https://guldu.uz/en/', verification: 'official-page-read' },
  { name: 'Navoi State University of Mining and Technologies', city: 'Navoi', region: 'Navoi', type: 'Technical university', url: 'https://nsumt.uz/', verification: 'official-page-read' },
  { name: 'Navoi State Pedagogical Institute', city: 'Navoi', region: 'Navoi', type: 'Pedagogical institute', url: 'https://nspi.uz/', verification: 'provisional' },
  { name: 'Karakalpak State University named after Berdakh', city: 'Nukus', region: 'Karakalpakstan', type: 'State university', url: 'https://karsu.uz/en', verification: 'official-domain-recheck' },
  { name: 'Nukus State Pedagogical Institute named after Ajiniyaz', city: 'Nukus', region: 'Karakalpakstan', type: 'Pedagogical institute', url: 'https://ndpi.uz/', verification: 'official-page-read' },
];
