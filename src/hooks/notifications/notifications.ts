import React, { useContext } from "react";
import { useEffect } from "react";

class Notifications {
	public disconnect() {}
}

function createNotifications() {
	let notificiations: Notifications;
	return () => {
		if (!notificiations) {
			notificiations = new Notifications();
		}

		useEffect(() => () => notificiations.disconnect(), []);

		return notificiations;
	};
}

const NotificationsContext = React.createContext<Notifications | undefined>(
	undefined
);
export const useInitializeCallouts = createNotifications();
export const NotificationsProvider = NotificationsContext.Provider;
export function useNotifications() {
	const context = useContext(NotificationsContext);

	if (!context) {
		throw new Error("Failed to create Callouts Context. Was it initalized?");
	}
	return context;
}
