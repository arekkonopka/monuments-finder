import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { arrIndexAction } from '../redux/MapReducer/action';

const ChooseBar = ({ data }) => {
  const arrIndex = useSelector(state => state.MapReducer.arrIndex)
  const dispatch = useDispatch()

  const selectArrInc = () => {
    if (arrIndex < data.length) {
      dispatch(arrIndexAction(arrIndex + 1))
    }
    else {
      dispatch(arrIndexAction(0))
    }
  }

  const selectArrDec = () => {

    if (arrIndex > 0) {
      dispatch(arrIndexAction(arrIndex - 1))
    }
    else {
      dispatch(arrIndexAction(data.length))
    }
  }
  const onClickArrowLeft = () => {
    selectArrDec()
  }
  const onClickArrowRight = () => {
    selectArrInc()
  }
  console.log(arrIndex)
  return (
    <div className='choose-bar'>
      <FontAwesomeIcon icon={faArrowLeft} className='icon' onClick={onClickArrowLeft} />
      <FontAwesomeIcon icon={faArrowRight} className='icon' onClick={onClickArrowRight} />
      {arrIndex}
    </div>
  )
}

export default ChooseBar
