const defaultState = {
  isHidden: false
}

const burgerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "showNavbar":
      return { ...state, isHidden: !state.isHidden }
    default:
      return state
  }

}

export default burgerReducer