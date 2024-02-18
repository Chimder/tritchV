import { PropsWithChildren, ReactNode } from 'react'
import { useAccountSingOut } from '@/shared/features/auth/useSession'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  children: ReactNode
}
export function DropdownLogo({ children }: Props) {
  const { mutate } = useAccountSingOut()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
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
  )
}
