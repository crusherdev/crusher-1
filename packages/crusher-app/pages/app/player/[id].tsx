import React from "react";
import { Suspense } from "react";

import { TestReportScreen } from "@ui/containers/testReport/testReportScreen";
import { SidebarTopBarLayout } from "@ui/layout/DashboardBase";
import { LivePlayer } from "@ui/containers/livePlayer/livePlayer";

function App() {
	return (
			<Suspense fallback={<div>loading...</div>}>
				<LivePlayer />
			</Suspense>
	);
}

export default App;
