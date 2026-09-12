/**
 * Parish details for St Joseph's, Millfield, Sunderland.
 *
 * Edit this file (and notices.ts) to update what appears on the website.
 * Published facts below are taken from official public listings. Do not invent
 * Mass times, clergy names, telephone numbers, or event dates here.
 */

export const parish = {
  name: "St Joseph's Catholic Church",
  shortName: "St Joseph's",
  dedication: "Saint Joseph",
  locality: "Millfield, Sunderland",
  city: "Sunderland",
  denomination: "Roman Catholic",
  diocese: "Diocese of Hexham & Newcastle",
  dioceseUrl: "https://diocesehn.org.uk/church/st-joseph-6/",
  partnership: "D1, Monkwearmouth Partnership",
  cluster: ["St Anne and Holy Family, Sunderland", "St Patrick, Ryhope"],
  address: {
    line1: "Paxton Terrace",
    line2: "Millfield",
    city: "Sunderland",
    postcode: "SR4 6HS",
    country: "United Kingdom",
    note: "The diocesan directory lists the postcode as SR4 6HP. Street-level maps usually show Paxton Terrace as SR4 6HS.",
  },
  welcomeBlurb:
    "A parish church in Millfield, Sunderland, dedicated to Saint Joseph. Whether you are local, visiting family, or looking for a church to pray in, you are welcome here.",
  phone: "0191 534 2346",
  phoneHref: "tel:+441915342346",
  email: "stanne.sunderland@diocesehn.org.uk",
  emailNote:
    "This is the contact address published on the diocesan listing for the parish cluster.",
  map: {
    lat: 54.9071708,
    lon: -1.4082023,
    osmName: "St Joseph's RC Church",
  },
  clergy: [
    { name: "Fr Ligori Alexander OCD" },
    { name: "Fr Louis Aroon OCD" },
  ],
  clergyNote:
    "Names as published by the Diocese of Hexham & Newcastle. Please add roles (Parish Priest, and so on) if you would like them shown.",
  massTimes: {
    sourceLabel: "Diocese of Hexham & Newcastle parish listing",
    sourceUrl: "https://diocesehn.org.uk/church/st-joseph-6/",
    confirmation:
      "Please confirm these times with the parish before travelling, especially around Holy Days and holiday periods.",
    weekend: [
      { day: "Saturday", time: "5.30pm", label: "Vigil Mass" },
      { day: "Sunday", time: "9.30am", label: "Sunday Mass" },
    ],
    weekdayPlaceholder: "Add weekday Mass times here.",
    confessionPlaceholder: "Add Confession / Sacrament of Reconciliation times here.",
    holyDayPlaceholder: "Add Holy Day of Obligation Mass times here.",
    otherPlaceholder:
      "Add Baptism, First Holy Communion, Confirmation, marriage, and funeral arrangements here.",
  },
  school: {
    name: "St Joseph's Catholic Primary School",
    address: "Rutland Street, Sunderland SR4 6HY",
    phone: "0191 510 8484",
    phoneHref: "tel:+441915108484",
    email: "office@stjs.org.uk",
    url: "https://stjs.org.uk/",
  },
  existingSiteUrl: "https://stjos.eu/",
  sources: {
    diocese: "https://diocesehn.org.uk/church/st-joseph-6/",
    takingStock: "https://taking-stock.org.uk/building/sunderland-st-joseph/",
    listedBuildings:
      "https://britishlistedbuildings.co.uk/101207116-church-of-st-joseph-millfield-ward",
    schoolParish: "https://stjs.org.uk/our-parish",
  },
} as const;

export const history = {
  listedGrade: "Grade II",
  opened: "14 October 1907",
  foundationStone: "23 July 1906",
  construction: "1906–7",
  missionEstablished: "1873",
  cost: "about £3,600",
  architects: "Fr John Rogers, with engineer Thomas Axtell",
  style: "Romanesque basilica",
  consecrated: "1938",
  reordered: "2006",
  membersClub: "1978–2013",
};

export function phoneToHref(phone: string): string {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return `tel:${digits}`;
  }
  if (digits.startsWith("0")) {
    return `tel:+44${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}

export function formatAddressLines(): string[] {
  return [
    parish.name,
    parish.address.line1,
    parish.address.line2,
    `${parish.address.city} ${parish.address.postcode}`,
  ];
}

export function googleMapsUrl(): string {
  const { lat, lon } = parish.map;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
}

export function googleDirectionsUrl(): string {
  const { lat, lon } = parish.map;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
}

export function openStreetMapUrl(): string {
  const { lat, lon } = parish.map;
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}`;
}

export function openStreetMapEmbedUrl(): string {
  const { lat, lon } = parish.map;
  const pad = 0.0024;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lon - pad}%2C${lat - pad}%2C${lon + pad}%2C${lat + pad}&layer=mapnik&marker=${lat}%2C${lon}`;
}
