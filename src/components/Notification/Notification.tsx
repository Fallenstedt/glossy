interface NotificationProps {
	children: string;
}
export function Notification(props: NotificationProps) {
	return (
		<div className="rounded-md text-md font-inter-light text-gray-700 p-4 my-1 bg-green-50">
			{props.children}
		</div>
	);
}
