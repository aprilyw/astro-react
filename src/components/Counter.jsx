import React, { useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";

import './Counter.css';


function MyRotatingBox() {
    const myMesh = React.useRef();
    const [active, setActive] = useState(false);
  
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      myMesh.current.rotation.x = a;
    });
  
    return (
      <mesh
        scale={active ? 1.5 : 1}
        onClick={() => setActive(!active)}
        ref={myMesh}
      >
        <boxBufferGeometry />
        <meshPhongMaterial color="royalblue" />
      </mesh>
    );
  }


export default function Counter({ children, count: initialCount }) {
	const [count, setCount] = useState(initialCount);
	const add = () => setCount((i) => i + 1);
	const subtract = () => setCount((i) => i - 1);

	return (
		<>
			<div className="counter">
				<button onClick={subtract}>-</button>
				<pre>{count}</pre>
				<button onClick={add}>+</button>
			</div>
			<div className="counter-message">{children}</div>

			<div className="canvas">
			<Canvas>
        <mesh>
          <boxBufferGeometry />
          <meshPhongMaterial />
        </mesh>
        <ambientLight args={[0xff0000]} intensity={0.1} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
      </Canvas>
			</div>


			<div className="canvas2">
				<Canvas>
				<MyRotatingBox />
                <ambientLight intensity={0.1} />
                <directionalLight />
				</Canvas>
			</div>
		</>
	);
}



