import './asset/style/style.sass';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import MenuBurger from './components/MenuBurger';
import dataTestContainer from './data/dataTestContainer.json'
import Loader from './components/Loader';

const api = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN

function App() {
  const [popup, setPopup] = useState('')
  const [isRender, setIsRender] = useState(true)
  const [viewport, setViewport] = useState({
    width: 100,
    height: 100,
    latitude: 52.237049,
    longitude: 21.017532,
    zoom: 6,
    mapboxApiAccessToken: api,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRender(false)
    }, 3000);
    return () => clearTimeout(timeout)
  }, [])
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])


  const onClickMarker = (monument) => {
    setPopup(monument)
  }
  const onClosePopUp = () => {
    setPopup(false)
  }


  return (
    <div className='map'>
      {isRender ? <Loader /> :
        <ReactMapGL
          {...viewport}
          width='100vw'
          height='100vh'
          onViewportChange={nextViewport => setViewport(nextViewport)}
        >
          <Navbar />
          <MenuBurger />



          {dataTestContainer.map(monument => {
            return (
              <div key={monument.id}>
                <Marker
                  latitude={monument.latitude}
                  longitude={monument.longitude}
                  onClick={() => onClickMarker(monument)}
                ><span role='img' aria-label='marker'>🔻</span>
                </Marker>

                {popup && <Popup
                  latitude={popup.latitude}
                  longitude={popup.longitude}
                  closeButton={true}
                  closeOnClick={true}
                  onClose={onClosePopUp}
                  anchor='bottom'
                >
                  <h3>{popup.identification}</h3>
                  <p>Miejscowość: {popup.place_name}</p>
                  <p>Województwo: {popup.voivodeship_name}</p>
                  <p>Data powstania: {popup.dating_of_obj ? popup.dating_of_obj : 'brak danych'}</p>
                </Popup>}
              </div>
            )
          })}


        </ReactMapGL>}
    </div>
  )
}

export default App;
