/**
 * Parish notices and weekly news.
 *
 * Replace the placeholder entries below with real notices.
 * Use ISO dates (YYYY-MM-DD) when you know them. Leave date as null if not.
 * Set isPlaceholder to false once an item is ready to publish.
 */

export type Notice = {
  id: string;
  title: string;
  date: string | null;
  body: string;
  isPlaceholder: boolean;
};

export const notices: Notice[] = [
  {
    id: "placeholder-newsletter",
    title: "Parish newsletter",
    date: null,
    isPlaceholder: true,
    body: "Add the latest weekly newsletter here, or a short note pointing people to where they can collect a paper copy after Mass.",
  },
  {
    id: "placeholder-sacraments",
    title: "Baptisms, weddings and funerals",
    date: null,
    isPlaceholder: true,
    body: "Add how to arrange a baptism, marriage, or funeral with the parish office. Do not publish personal details of families without their permission.",
  },
];
