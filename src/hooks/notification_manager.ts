import React, { useContext } from "react";

export type SuccessCallback = (message: string) => void;

export class NotificationManager {
	private successCallbacks: SuccessCallback[] = [];

	public success(message: string) {
		this.successCallbacks.forEach((cb) => cb(message));
	}

	public onSuccess(callback: SuccessCallback) {
		this.successCallbacks.push(callback);
		return () => {
			const i = this.successCallbacks.indexOf(callback);
			if (i > -1) {
				this.successCallbacks.splice(i, 1);
			}
		};
	}
}

function createNotifications() {
	let notifications: NotificationManager;
	return () => {
		if (!notifications) {
			notifications = new NotificationManager();
		}

		return notifications;
	};
}

const NotificationContext = React.createContext<
	NotificationManager | undefined
>(undefined);
export const useInitializeNotifications = createNotifications();
export const NotificationsProvider = NotificationContext.Provider;

export function useNotifications() {
	const context = useContext(NotificationContext);

	if (!context) {
		throw new Error(
			"Failed to create Notifications Context. Was it initialized?"
		);
	}

	return context;
}
