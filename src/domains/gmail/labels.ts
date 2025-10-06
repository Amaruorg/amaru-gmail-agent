import { gmail_v1, google } from "googleapis";
import type { TokenData } from "./types";

/**
 * Gmail Labels API Client
 */

export interface GmailLabel {
	id: string;
	name: string;
	type: string;
	messageListVisibility?: string | null;
	labelListVisibility?: string | null;
}

export class GmailLabelsClient {
	private gmail: gmail_v1.Gmail;

	constructor(tokenData: TokenData) {
		const oauth2Client = new google.auth.OAuth2();
		oauth2Client.setCredentials({
			access_token: tokenData.accessToken,
			refresh_token: tokenData.refreshToken,
		});

		this.gmail = google.gmail({ version: "v1", auth: oauth2Client });
	}

	/**
	 * List all labels in the user's mailbox
	 */
	async listLabels(): Promise<GmailLabel[]> {
		try {
			const response = await this.gmail.users.labels.list({
				userId: "me",
			});

			return (response.data.labels || []).map((label) => ({
				id: label.id || "",
				name: label.name || "",
				type: label.type || "user",
				messageListVisibility: label.messageListVisibility,
				labelListVisibility: label.labelListVisibility,
			}));
		} catch (error) {
			console.error("Error listing Gmail labels:", error);
			throw new Error("Failed to list Gmail labels");
		}
	}

	/**
	 * Get a specific label by ID
	 */
	async getLabel(labelId: string): Promise<GmailLabel | null> {
		try {
			const response = await this.gmail.users.labels.get({
				userId: "me",
				id: labelId,
			});

			if (!response.data) return null;

			return {
				id: response.data.id || "",
				name: response.data.name || "",
				type: response.data.type || "user",
				messageListVisibility: response.data.messageListVisibility,
				labelListVisibility: response.data.labelListVisibility,
			};
		} catch (error) {
			console.error("Error getting Gmail label:", error);
			return null;
		}
	}

	/**
	 * Create a new label
	 */
	async createLabel(labelName: string): Promise<GmailLabel> {
		try {
			const response = await this.gmail.users.labels.create({
				userId: "me",
				requestBody: {
					name: labelName,
					labelListVisibility: "labelShow",
					messageListVisibility: "show",
				},
			});

			if (!response.data) {
				throw new Error("Failed to create label - no response data");
			}

			return {
				id: response.data.id || "",
				name: response.data.name || "",
				type: response.data.type || "user",
				messageListVisibility: response.data.messageListVisibility,
				labelListVisibility: response.data.labelListVisibility,
			};
		} catch (error: any) {
			// Check if label already exists
			if (error?.code === 409 || error?.message?.includes("already exists")) {
				// Try to find the existing label
				const labels = await this.listLabels();
				const existingLabel = labels.find((label) => label.name.toLowerCase() === labelName.toLowerCase());

				if (existingLabel) {
					return existingLabel;
				}
			}

			console.error("Error creating Gmail label:", error);
			throw new Error(`Failed to create label: ${error.message}`);
		}
	}

	/**
	 * Apply a label to an email
	 */
	async applyLabelToEmail(messageId: string, labelId: string): Promise<boolean> {
		try {
			await this.gmail.users.messages.modify({
				userId: "me",
				id: messageId,
				requestBody: {
					addLabelIds: [labelId],
				},
			});

			return true;
		} catch (error) {
			console.error("Error applying label to email:", error);
			throw new Error("Failed to apply label to email");
		}
	}

	/**
	 * Remove a label from an email
	 */
	async removeLabelFromEmail(messageId: string, labelId: string): Promise<boolean> {
		try {
			await this.gmail.users.messages.modify({
				userId: "me",
				id: messageId,
				requestBody: {
					removeLabelIds: [labelId],
				},
			});

			return true;
		} catch (error) {
			console.error("Error removing label from email:", error);
			throw new Error("Failed to remove label from email");
		}
	}

	/**
	 * Apply a label to an email by label name (creates label if it doesn't exist)
	 */
	async applyLabelByName(messageId: string, labelName: string): Promise<GmailLabel> {
		try {
			// First, check if label exists
			const labels = await this.listLabels();
			let label = labels.find((l) => l.name.toLowerCase() === labelName.toLowerCase());

			// If not, create it
			if (!label) {
				label = await this.createLabel(labelName);
			}

			// Apply the label to the email
			await this.applyLabelToEmail(messageId, label.id);

			return label;
		} catch (error) {
			console.error("Error applying label by name:", error);
			throw new Error("Failed to apply label by name");
		}
	}
}
