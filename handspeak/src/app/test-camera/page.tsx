import Camera from "@/components/Camera";
import { Suspense } from "react";

export default function TestCamera() {
	return (
		<Suspense fallback={<p>Loading</p>}>
			<Camera />
		</Suspense>
	);
}
