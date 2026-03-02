
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom, faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
export default function DesktopNavigation() {
  return (
    <>
      <header className='flex justify-between place-items-center py-6 px-20 text-white'>
        <h2 className=''>Spaces <FontAwesomeIcon icon={faAtom} size="1x" />Project</h2>
        <nav className='flex place-items-center justify-end gap-5'>
          <div id="hb_search" className='rounded-xl relative'>
            <input type="text" className='py-1 px-5 rounded-xl' placeholder='Search...' />
            <FontAwesomeIcon icon={faMagnifyingGlass} size='1x' className='absolute top-2 right-2' />
          </div>
          <ul className='flex gap-5'>
            <li><a href=""> <FontAwesomeIcon icon={faHouse} size="1x" /></a></li>
            <li><a href=""> <FontAwesomeIcon icon={faAtom} size="1x" /></a></li>
            <li><a href=""> <FontAwesomeIcon icon={faUser} size="1x" /></a></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
