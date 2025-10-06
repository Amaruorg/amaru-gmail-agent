"use server";

import { headers } from "next/headers";
import { GmailLabelsClient } from "./labels";
import { authService } from "../auth/service";

/**
 * Server action to apply a label to an email
 * Creates the label if it doesn't exist
 */
export async function applyLabelToEmail(
	emailId: string,
	labelName: string,
): Promise<{ success: boolean; message: string; labelId?: string }> {
	try {
		// Get the access token from headers
		const tokenData = await authService.getAccessToken(await headers());

		// Create Gmail Labels client
		const labelsClient = new GmailLabelsClient(tokenData);

		// Apply the label (creates if doesn't exist)
		const label = await labelsClient.applyLabelByName(emailId, labelName);

		return {
			success: true,
			message: `Label "${labelName}" applied successfully`,
			labelId: label.id,
		};
	} catch (error) {
		console.error("Error in applyLabelToEmail action:", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "Failed to apply label",
		};
	}
}

/**
 * Server action to list all labels
 */
export async function listGmailLabels(): Promise<{
	success: boolean;
	labels?: Array<{ id: string; name: string; type: string }>;
	message?: string;
}> {
	try {
		const tokenData = await authService.getAccessToken(await headers());

		const labelsClient = new GmailLabelsClient(tokenData);
		const labels = await labelsClient.listLabels();

		return { success: true, labels };
	} catch (error) {
		console.error("Error in listGmailLabels action:", error);
		return {
			success: false,
			message: error instanceof Error ? error.message : "Failed to list labels",
		};
	}
}
