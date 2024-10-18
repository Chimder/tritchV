import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { PATH } from "@/app/routes/path-constants";

import { useAccountInfo, useSessionQuery } from "./useSession";

interface ProtectedPageProps {
	children: React.ReactNode;
}

export function ProtectedSign({
	children,
}: PropsWithChildren<ProtectedPageProps>) {
	const { data: session, status, isLoading } = useSessionQuery();

	console.log("AUTHSES", session);
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (status === "success" && session.email) {
		return <Navigate to={PATH.HOME} />;
	}

	return <>{children}</>;
}
