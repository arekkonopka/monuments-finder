import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [isSearch, setIsSearch] = useState(true)

  const isShowNavbar = useSelector(store => store.burgerReducer.isHidden)
  const onClickSearch = () => setIsSearch(false)

  return (
    <div className={`navbar ${isShowNavbar && 'active'}`}>
      <ul>
        <li>Zaloguj</li>
        {isSearch ?
          <li onClick={onClickSearch}>Wyszukaj</li>
          :
          <div>
            <input type='text' className='searchInput'></input>
            <p>lopka</p>
          </div>}
      </ul>
    </div>
  )
}

export default Navbar
