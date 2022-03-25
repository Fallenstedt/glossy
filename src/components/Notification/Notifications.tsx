import { Transition } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import { useNotifications } from "../../hooks/notification_manager";
import { Notification } from "./Notification";

export function Notifications() {
	const notifications = useNotifications();
	const [msg, setMsg] = useState<string | undefined>(undefined);
	const [show, setShow] = useState(false);

	const handleSuccess = useCallback((message) => {
		setMsg(message);
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, 2500);
	}, []);

	useEffect(() => {
		const unsubscribe = notifications.onSuccess(handleSuccess);

		return () => unsubscribe();
	});

	return (
		<Transition
			show={show}
			enter="transition ease-out duration-100"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition ease-in duration-75"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="absolute top-0 w-full flex justify-center">
				<Notification>{msg ?? ""}</Notification>
			</div>
		</Transition>
	);
}
