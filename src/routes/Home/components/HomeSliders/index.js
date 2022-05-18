import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import './index.less'

function HomeSliders(props) {
  useEffect(() => {
    if (props.sliders.length === 0) {
      let result = props.getSliders();
      console.log('HomeSliders', result);
    }
  }, []);
  return (
    <Carousel effect="fade" draggable={false} touchMove={false}>
        {
          props.sliders.map((item, index) => (
              <div key={item.id}>
                <video
                  autoPlay
                  width={'100%'}
                  src={item.avatar}
                  data-wf-ignore='true'
                  data-object-fit='cover'
                  controls="controls"
                >
                </video>
              </div>
          ))
        }
    </Carousel>
  )
}

export default HomeSliders;
