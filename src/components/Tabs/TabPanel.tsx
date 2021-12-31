import { Tab } from "@headlessui/react";

export interface TabPanelProps {
	children: React.ReactNode;
}

export function TabPanel(props: TabPanelProps) {
	return <Tab.Panel className="md:h-20 h-auto">{props.children}</Tab.Panel>;
}
