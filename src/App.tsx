import "./App.css";
import { Container } from "./components/common/Container";
import { MyMirror } from "./components/MyMirror/MyMirror";
import { NavBar } from "./components/NavBar/NavBar";
import { Notifications } from "./components/Notification/Notifications";
import {
	CalloutsProvider,
	useInitializeCallouts,
} from "./hooks/callouts/callouts";
import {
	NotificationsProvider,
	useInitializeNotifications,
} from "./hooks/notification_manager";

function App() {
	const callouts = useInitializeCallouts();
	const notification = useInitializeNotifications();

	return (
		<NotificationsProvider value={notification}>
			<CalloutsProvider value={callouts}>
				<Notifications />
				<NavBar />
				<Container>
					{/* <Header></Header> */}
					<MyMirror />
				</Container>
			</CalloutsProvider>
		</NotificationsProvider>
	);
}

export default App;
