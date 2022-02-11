export enum NotifcationType {
	SUCCESS,
}
interface NotificationProps {
	type: NotifcationType;
	message: string;
}
export function Notification(props: NotificationProps) {
	return <div>{props.message}</div>;
}
