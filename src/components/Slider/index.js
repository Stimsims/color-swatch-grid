import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Slider, Handles, Tracks, Rail } from 'react-compound-slider';
import styled from 'styled-components';
import {roundTo} from './../utilities';

const sliderStyle = {  // Give the slider some width
  position: 'relative',
  height: 80,
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: '#8B9CB6',
}

export function Handle({
    handle: { id, value, percent },
    getHandleProps
  }) {
    return (
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          marginLeft: -15,
          marginTop: 25,
          zIndex: 2,
          width: 30,
          height: 30,
          border: 0,
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '50%',
          backgroundColor: '#2C4870',
          color: '#333',
        }}
        {...getHandleProps(id)}
      >
        <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -20 }}>
          {roundTo(value, 2)}
        </div>
      </div>
    )
  }

  function Track({ source, target, getTrackProps }) {
    return (
      <div
        style={{
          position: 'absolute',
          height: 10,
          zIndex: 1,
          marginTop: 35,
          backgroundColor: '#546C91',
          borderRadius: 5,
          cursor: 'pointer',
          left: `${source.percent}%`,
          width: `${target.percent - source.percent}%`,
        }}
        {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
      />
    )
  }

const SliderView = (props) => {
    const handleChange=(value) => {
        console.log(`Slider onChange props.value ${props.value} value`, value);
        props.recieveChange(roundTo(value[0], 2));
    }
    return  <SliderWrapper key={props.id}>
        {props.text && <p className="slider-label">{props.text}</p>}
        <Slider key={`${props.id}-slider`}
        className="slider"
    rootStyle={sliderStyle}
    domain={[props.min || 0, props.max || 100]}
    step={props.step || 1}
    mode={2}
    values={[props.value || 1]}
    onChange={handleChange} 
  >
    <Rail>
      {({ getRailProps }) => (
        <div style={railStyle} {...getRailProps()} />
      )}
    </Rail>
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              getHandleProps={getHandleProps}
            />
          ))}
        </div>
      )}
    </Handles>
    <Tracks right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Tracks>
  </Slider>
    </SliderWrapper>
}

SliderView.propTypes = {

}

export default SliderView;

const SliderWrapper = styled.div`
    width:100%;
    text-align:center;
    .slider{
        flex: 1;
        margin:0px 10px;
        box-sizing: border-box;
    }
    .slider-label{
        margin:0px 10px;
        box-sizing: border-box;
    }

`