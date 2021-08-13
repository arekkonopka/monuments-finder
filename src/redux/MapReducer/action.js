export const cordsAction = ({ lat, lon, zoom }) => {
  return { type: "Cords", payload: { lat, lon, zoom } }
}
export const isClickedAction = (e) => {
  return { type: "IsClicked", payload: e }
}
export const arrIndexAction = (e) => {
  return { type: "ArrIndex", payload: e }
}