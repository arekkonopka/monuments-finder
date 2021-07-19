import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showBar } from '../redux/BurgerReducer/action'

const MenuBurger = () => {
  const [active, setActive] = useState(false)

  const dispatch = useDispatch()

  const onClick = () => {
    setActive(!active)
    dispatch(showBar())
  }
  return (

    <div className='menu-burger' onClick={onClick}>
      <span className={`menu menu-burger1 ${active && 'active'}`}></span>
      <span className={`menu menu-burger2 ${active && 'active'}`}></span>
      <span className={`menu menu-burger3 ${active && 'active'}`}></span>
      <span className={`menu menu-burger4 ${active && 'active'}`}></span>
    </div>

  )
}

export default MenuBurger
