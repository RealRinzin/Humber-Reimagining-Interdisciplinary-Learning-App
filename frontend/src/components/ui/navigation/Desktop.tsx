
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom, faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
export default function DesktopNavigation() {
  return (
    <>
      <header className='flex flex-col md:flex-row justify-between place-items-center px-20 md:py-6 md:px-20 text-white'>
        <h2 className=''>Spaces <FontAwesomeIcon icon={faAtom} size="1x" />Project</h2>
        <nav className='flex flex-col md:flex-row  place-items-center justify-end gap-5'>
          <div id="hb_search" className='rounded-xl relative'>
            <input type="text" className='py-1 px-5 rounded-xl focus:outline-none' placeholder='Search...' />
            <FontAwesomeIcon icon={faMagnifyingGlass} size='1x' className='absolute top-2 right-2' />
          </div>
          <ul className='flex gap-5 justify-evenly'>
            <li><a href=""> <FontAwesomeIcon icon={faHouse} size="1x" /></a></li>
            <li><a href=""> <FontAwesomeIcon icon={faAtom} size="1x" /></a></li>
            <li><a href=""> <FontAwesomeIcon icon={faUser} size="1x" /></a></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
