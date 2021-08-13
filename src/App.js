import './asset/style/style.sass';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import MenuBurger from './components/MenuBurger';
import Loader from './components/Loader';
import uuid from 'react-uuid'
import { useSelector, useDispatch } from 'react-redux';
import { cordsAction } from './redux/MapReducer/action';
import ChooseBar from './components/ChooseBar';
import { isClickedAction, arrIndexAction } from './redux/MapReducer/action';

const api = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN

function App() {

  const cords = useSelector(state => state.MapReducer)
  const isClickedMarker = useSelector(state => state.MapReducer.isClicked)
  const arrIndex = useSelector(state => state.MapReducer.arrIndex)
  const dispatch = useDispatch()

  const [popup, setPopup] = useState('')
  const [restaurants, setRestaurants] = useState('')
  const [isRender, setIsRender] = useState(true)
  const [viewport, setViewport] = useState({
    width: 100,
    height: 100,
    latitude: Number(cords.lat),
    longitude: Number(cords.lon),
    zoom: 14,
    mapboxApiAccessToken: api,
  });

  useEffect(() => {
    fetch("https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "2c5c05843cmsh136b95722d23850p1e252bjsne3bb3462f888",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
      }
    })
      .then(res => res.json())
      .then(res => {
        setIsRender(false)
        setRestaurants(res?.data)
      })
      .catch(err => {
        console.error(err);
      });

  }, [])


  const onClickMarker = (restaurant) => {
    setPopup(restaurant)
    dispatch(cordsAction({ lat: restaurant.latitude, lon: restaurant.longitude, zoom: 14 }))
    dispatch(isClickedAction(true))
    dispatch(arrIndexAction(restaurants.indexOf(restaurant)))

    setViewport({
      ...viewport,
      latitude: Number(cords.lat) - 0.006,
      longitude: Number(cords.lon),
      zoom: cords.zoom,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    })
  }

  const onClosePopUp = () => {
    setPopup(false)
    dispatch(arrIndexAction(''))
    setViewport({
      ...viewport,
      zoom: 13,
    })
    dispatch(isClickedAction(false))

  }

  return (
    <div className='map'>

      <ReactMapGL
        {...viewport}
        width='100vw'
        height='100vh'
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        {isRender ? <Loader classProps={'loader-div'} /> : <Loader classProps={''} />}
        <Navbar />
        <MenuBurger />
        {isClickedMarker && <ChooseBar data={restaurants} />}

        {
          restaurants ?
            restaurants?.map(restaurant => {
              return (
                <div key={uuid()}>
                  <Marker
                    latitude={restaurant.latitude && restaurant.longitude ? Number(restaurant.latitude) : 0}
                    longitude={restaurant.latitude && restaurant.longitude ? Number(restaurant.longitude) : 0}
                    onClick={() => onClickMarker(restaurant)}
                  >
                    <span role='img' aria-label='marker'>🔻</span>
                  </Marker>

                  {
                    arrIndex ? <Popup
                      latitude={Number(restaurants[arrIndex].latitude)}
                      longitude={Number(restaurants[arrIndex].longitude)}
                      closeButton={true}
                      closeOnClick={false}
                      onClose={onClosePopUp}
                      anchor='top'
                    >
                      <img src={popup.photo && popup.photo.images.small.url} alt="restaurant image" />
                      <h3>Restauracja: {popup.name}</h3>
                      <p>Adress: {popup.address}</p>
                      <p>Ocena: {popup.rating}</p>
                    </Popup> : popup && <Popup
                      latitude={Number(popup.latitude)}
                      longitude={Number(popup.longitude)}
                      closeButton={true}
                      closeOnClick={true}
                      onClose={onClosePopUp}
                      anchor='top'
                    >
                      <img src={popup.photo && popup.photo.images.small.url} alt="restaurant image" />
                      <h3>Restauracja: {popup.name}</h3>
                      <p>Adress: {popup.address}</p>
                      <p>Ocena: {popup.rating}</p>
                    </Popup>}
                </div>
              )
            })
            : ''
        }

      </ReactMapGL>
    </div >
  )
}

export default App;
