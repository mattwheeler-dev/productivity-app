export type Task = {
	id: number;
	user_id: string;
	title: string;
	details: string;
	due_date?: string;
	completed: boolean;
	created_at: string;
};
