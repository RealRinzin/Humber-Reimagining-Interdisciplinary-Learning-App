
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
export default function DesktopNavigation() {
  return (
    <>
      <header className='flex justify-between place-items-center py-6 px-20 text-white'>
        <h2>Spaces <FontAwesomeIcon icon={faAtom} size="1x" />Project</h2>
        <nav>
          <ul className='flex gap-5 place-items-center'>
            <input id="hb_search" type="text" className='p-3 rounded-xl' placeholder='Search' />
            <li><a href=""> <FontAwesomeIcon icon={faHouse} size="2x" /></a></li>
            <li><a href=""> <FontAwesomeIcon icon={faAtom} size="2x" /></a></li>
            <li><a href=""> <FontAwesomeIcon icon={faUser} size="2x" /></a></li>
          </ul>
        </nav>
      </header>
    </>
  )
}
