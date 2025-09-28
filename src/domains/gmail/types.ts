import { Email } from "@/shared/types/common";

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
