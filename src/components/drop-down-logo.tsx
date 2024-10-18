import { ReactNode } from "react";
import { useAccountSingOut } from "@/features/auth/useSession";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
	children: ReactNode;
}
export function DropDownLogo({ children }: Props) {
	const { mutate } = useAccountSingOut();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>GitHub</DropdownMenuItem>
				<DropdownMenuItem className="">Support</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => mutate()}
					className="flex items-center justify-center bg-red-400"
				>
					LogOut
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
