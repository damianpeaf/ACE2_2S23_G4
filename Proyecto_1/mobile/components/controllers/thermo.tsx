import { View, Text } from 'react-native'
import React from 'react'
import { Svg } from 'react-native-svg'
// https://www.svgrepo.com/svg/499912/light-bulb
const Thermo = () => {
  return (
    <View >
      {/* Import a svg */}
      <svg width="256px" height="256px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" className="iconify iconify--fxemoji" preserveAspectRatio="xMidYMid meet" fill="#000000">

      <g id="SVGRepo_bgCarrier" stroke-width="0"/>

      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

      <g id="SVGRepo_iconCarrier">

      <path fill="#C4F0F2" d="M322 301.232V71.413C322 34.182 292.232 4 255 4s-67 30.182-67 67.414v229.82c-28 20.659-46.207 53.812-46.207 91.193c0 62.631 50.664 113.403 113.294 113.403S368.24 455.056 368.24 392.426c0-37.382-18.24-70.535-46.24-91.194z"/>

      <path fill="#FF473E" d="M303 332.538V172h-96v160.538c-18 14.088-28.794 35.674-28.794 59.887c0 42.448 34.367 76.859 76.815 76.859s76.772-34.411 76.772-76.859c.001-24.213-10.793-45.799-28.793-59.887z"/>

      <ellipse fill="#FF6E83" cx="255.107" cy="172.222" rx="48.152" ry="11.106"/>

      <path fill="#597B91" d="M239.514 91c0 2.659-2.156 5-4.815 5H188V86h46.7c2.659 0 4.814 2.341 4.814 5zm-4.814 55H188v10h46.7c2.659 0 4.815-2.341 4.815-5c-.001-2.659-2.156-5-4.815-5zm0 60H188v10h46.7c2.659 0 4.815-2.341 4.815-5c-.001-2.659-2.156-5-4.815-5zm.3 60.496V266h-47v10h47v.125c2 0 4.815-2.156 4.815-4.815S237 266.496 235 266.496z"/>

      </g>

      </svg>
      <Text>Thermo</Text>
    </View>
  )
}

export default Thermo