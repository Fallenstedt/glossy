export declare global {
	interface NewRelic {
		addPageAction(name: string, args?: any): void;
	}

	interface Window {
		newrelic: NewRelic;
	}
}
