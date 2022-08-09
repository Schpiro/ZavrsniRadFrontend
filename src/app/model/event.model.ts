export interface Event {
  id: number | undefined;
  creator: number;
  title: string;
  location: string;
  date: string;
  details: string;
  creationDate: string | undefined;
}
