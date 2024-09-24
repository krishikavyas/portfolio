"use client"
import { PiArrowBendUpLeftBold } from "react-icons/pi";

function GoBack() {
  return (
    <a onClick={()=> window.history.back()} ><PiArrowBendUpLeftBold/> Go back </a>
  )
}

export default GoBack