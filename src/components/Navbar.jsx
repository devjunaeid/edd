import Image from 'next/image'
import Logo from '../../public/logo.png'
import Link from 'next/link'
import { FiSearch } from "react-icons/fi";
import "./component.css"
function Navbar() {
  return (
    <div className="navbar">
      <Link href={"/"}>
        <Image src={Logo} width={120} height={50} />
      </Link>
      <div>
        <Link prefetch={true} className='search_link' href={"/status"}><FiSearch size={22} />Find Your Projects</Link>
      </div>
    </div>
  )
}

export default Navbar
