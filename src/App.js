import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Environment, KeyboardControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Ecctrl, { EcctrlJoystick } from 'ecctrl'

import Lights from './Lights'
import Map from './Map'
import CharacterModel from './CharacterModel'

export default function App() {
  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] }
  ]

  return (
    <>
      <EcctrlJoystick />
      <Canvas
        shadows
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse') {
            e.target.requestPointerLock()
          }
        }}>
        <Perf position="top-left" />
        <Environment background files="/night.hdr" />
        <Lights />
        <Suspense fallback={null}>
          <Physics timeStep="vary">
            <KeyboardControls map={keyboardMap}>
              <Ecctrl debug>
                <CharacterModel />
              </Ecctrl>
            </KeyboardControls>
            <Map />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}
