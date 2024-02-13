import { Link } from 'react-router-dom'

import { PATH } from '@/app/routes/path-constants'

// type Props = {};

const Header = () => {
  return (
    <header className="fixed z-[1100] flex h-24 w-full justify-between border-[2px] border-b-card bg-background">

      <Link className="flex items-center pl-24" to={PATH.HOME}>
        HOME
      </Link>
      <div className="flex items-center  pr-24">{/* <ModeToggle /> */}</div>
    </header>
  )
}

export default Header
