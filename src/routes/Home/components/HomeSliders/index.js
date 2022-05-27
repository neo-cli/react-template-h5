import React, { useEffect, useRef } from 'react';
import { Carousel } from 'antd';
import { Player, ControlBar  } from 'video-react';
import './index.less'
import 'video-react/dist/video-react.css'; // import css
function HomeSliders(props) {
  const player = useRef(null)
  useEffect(() => {
    if (props.sliders.length === 0) {
      let result = props.getSliders();
      console.log('HomeSliders', result)
    }
  }, [])
  return (
    <Carousel effect="fade" draggable={false} touchMove={false}>
        {
          props.sliders.map((item, index) => (
              <div key={item.id} style={{ position: 'relative' }}>
                <Player
                  ref={player}
                >
                  <source src={item.avatar} type='video/mp4'/>
                  <source src={item.avatar} type='video/ogg'/>
                  <source src={item.avatar} type='video/webm'/>
                  {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type='video/mp4'/> */}
                  <ControlBar autoHide={false} />
                </Player>
                {/* <video
                  autoPlay
                  width={'100%'}
                  data-wf-ignore='true'
                  preload='auto'
                  data-object-fit='cover'
                  controls="controls"
                  x5-video-player-fullscreen='true'
                >
                  <source
                    src={item.avatar}
                    type='video/mp4'
                  ></source>
                  <source
                    src={item.avatar}
                    type='video/ogg'
                  ></source>
                  <source
                    src={item.avatar}
                    type='video/webm'
                  ></source>
                </video> */}
              </div>
          ))
        }
    </Carousel>
  )
}

export default HomeSliders;
