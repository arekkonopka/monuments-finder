const initialState = { lat: 12.91494, lon: 100.8712, zoom: 18, isClicked: false, arrIndex: '' }

const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Cords': {
      return { ...state, lat: action.payload.lat, lon: action.payload.lon, zoom: action.payload.zoom }
    }
    case 'IsClicked': {
      return { ...state, isClicked: action.payload }
    }
    case 'ArrIndex': {
      return { ...state, arrIndex: action.payload }
    }
    default:
      return state
  }
}

export default MapReducer