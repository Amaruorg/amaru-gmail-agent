export interface Email {
	id: string;
	subject: string;
	from: string;
	snippet: string;
	date?: string;
	labels?: string[];
	isRead?: boolean;
}

export interface EmailHeader {
	name: string;
	value: string;
}

export interface EmailListParams {
	maxResults?: number;
	pageToken?: string;
	query?: string;
}

export interface EmailListResponse {
	emails: Email[];
	nextPageToken?: string;
	totalCount?: number;
}

export interface TokenData {
	accessToken: string;
	refreshToken?: string;
}
