import { Link } from 'react-router-dom'

import { PATH } from '@/app/routes/path-constants'

const Header = () => {
  // const { data: account, isFetching } = useAccountInfo()
  return (
    <header className="fixed z-[1100] flex h-24 w-full justify-between  border-[2px] border-b-card bg-background">
      <Link preventScrollReset={false} className="flex items-center pl-24" to={PATH.HOME}>
        HOME
      </Link>

      {/* {isFetching ? (
        <div className="flex items-center justify-center pr-24">
          <ReloadIcon className="ml-1 h-6 w-6 animate-spin text-green-600 " />
        </div>
      ) : account ? (
        <DropDownLogo>
          <div className="flex items-center justify-center pr-24">
            <div className="pr-2 text-green-600">
              {account?.name} {account?.ownerId}
            </div>
            <img className="w-10 rounded-full" src="/user.png" alt="userLogo" />
          </div>
        </DropDownLogo>
      ) : ( */}
      {/* <div className="flex flex-col items-center justify-center pr-20">
        <Link preventScrollReset={false} className="flex items-center pl-24" to={PATH.SIGNIN}>
          <Badge className="mb-4 text-white">sing-in</Badge>
        </Link>
        <Link preventScrollReset={false} className="flex items-center pl-24" to={PATH.SIGNUP}>
          <Badge className="text-white">register</Badge>
        </Link>
      </div> */}
      {/* )} */}
    </header>
  )
}

export default Header
