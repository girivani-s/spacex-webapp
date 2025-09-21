export interface IHistory {
	links: Record<"article", string>;
	title: string;
	event_date_utc: string;
	event_date_unix: number;
	details: string;
	id: string;
}
