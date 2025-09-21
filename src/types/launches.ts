export interface ILaunchesCore {
	core: string;
	flight: number;
	gridfins: boolean;
	legs: boolean;
	reused: boolean;
	landing_attempt: boolean;
	landing_success: string | null;
	landing_type: string | null;
	landpad: string | null;
}

export interface ILaunchesFailure {
	time: number;
	altitude: string | null;
	reason: string;
}

export interface ILaunchesFairing {
	reused: boolean;
	recovery_attempt: boolean;
	recovered: boolean;
	ships: Array<string>;
}

export interface ILaunchesLinks {
	patch: {
		small: string;
		large: string;
	};
	reddit: {
		campaign: string | null;
		launch: string | null;
		media: string | null;
		recovery: string | null;
	};
	flickr: {
		small: Array<string>;
		original: Array<string>;
	};
	presskit: string | null;
	webcast: string;
	youtube_id: string;
	article: string;
	wikipedia: string;
}

export interface ILaunch {
	fairings: Array<ILaunchesFairing>;
	links: ILaunchesLinks;
	static_fire_date_utc: string;
	static_fire_date_unix: number;
	net: boolean;
	window: number;
	rocket: string;
	success: boolean;
	failures: Array<ILaunchesFailure>;
	details: string;
	crew: Array<string>;
	ships: Array<string>;
	capsules: Array<string>;
	payloads: Array<string>;
	launchpad: string;
	flight_number: number;
	name: string;
	date_utc: string;
	date_unix: number;
	date_local: string;
	date_precision: string;
	upcoming: boolean;
	cores: Array<ILaunchesCore>;
	auto_update: true;
	tbd: boolean;
	launch_library_id: string | null;
	id: string;
}

export type LaunchesType = Array<ILaunch>;
