import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from '../components/Select/index';
import Slider from '../components/Slider/index';
import Button from '../components/Button/v1/Button';
/*
  A3: 297mm X 420mm
  A4: 210mm X 297mm
  A5: 148mm X 210mm
*/
const MM = 'mm';
const CM = 'cm';
const INCH = 'in';
const KA4 = 'A4', KA3 = 'A3', KA5 = 'A5';
const units = [{key:  MM, text: 'millimeters'}, {key: CM, text: 'centimeters'}, {key: INCH, text: 'inches'}];
const A3 = [297, 420];
const A4 = [210, 297];
const A5 = [148, 210];
const RANGE = [500, 800];
const GAP_RANGE = [20, 20];

const convertUnit = (n, u1, u2) => {
  if(u1 === u2) return n;
  if(u1 === MM){
    if(u2 === CM){
      return n*0.1;
    }else if(u2 === INCH){
      return n*0.0393701;
    }
  }else if(u1 === CM){
    if(u2 === MM){
      return n*10;
    }else if(u2 === INCH){
      return n*0.393701;
    }
  }else if(u1 === INCH){
    if(u2 === MM){
      return n*25.4;
    }else if(u2 === CM){
      return n*2.54;
    }
  }
  throw Error(`unknown unit 1 ${u1} or 2 ${u2}`);
}
const testConvertUnit = () => {
  console.log(`test convert 0.5cm to cm ${convertUnit(0.5, CM, CM)}`);
  //5mm -> 0.19685 inch
  console.log(`test convert 5mm to 0.19685inches ${convertUnit(5, MM, INCH)}`);
    //5mm -> 0.5 CM
    console.log(`test convert 5mm to 0.5cm ${convertUnit(5, MM, CM)}`);
  //0.5 CM -> 0.5mm
  console.log(`test convert 0.5cm to 5mm ${convertUnit(0.5, CM, MM)}`);
  //5cm -> 1.9685inch
  console.log(`test convert 5cm to 1.9685inch ${convertUnit(5, CM, INCH)}`);
  //1.9685inch -> 5cm
  console.log(`test convert 1.9685inch to 5cm ${convertUnit(1.9685, INCH, CM)}`);
}
testConvertUnit();
const IndexPage = () => {
  const [unit, setUnit] = useState(units[0].key);
  const [width, setWidth] = useState(convertUnit(A4[0], MM, unit));
  const [height, setHeight] = useState(convertUnit(A4[1], MM, unit));
  const [columnGap, setColumnGap] = useState(3);
  const [rowGap, setRowGap] = useState(3);
  const [columnCount, setColumnCount] = useState(3);
  const [rowCount, setRowCount] = useState(3);
  
  const setDimensions = (id) => {
    if(id === KA3){
      setWidth(convertUnit(A3[0], MM, unit))
      setHeight(convertUnit(A3[1], MM, unit))
    }else if(id === KA4){
      setWidth(convertUnit(A4[0], MM, unit))
      setHeight(convertUnit(A4[1], MM, unit))
    }else if(id === KA5){
      setWidth(convertUnit(A5[0], MM, unit))
      setHeight(convertUnit(A5[1], MM, unit))
    }
  }
  const handleUnitChange = (nUnit) => {
    setWidth(convertUnit(width, unit, nUnit));
    setHeight(convertUnit(height, unit, nUnit));
    setColumnGap(convertUnit(columnGap, unit, nUnit));
    setRowGap(convertUnit(rowGap, unit, nUnit));
    setUnit(nUnit);
  }
  const renderGridItems = (column, row) => {
    let total = column*row;
    let views = [];
    for(let i = 0; i<total; i++){
      views.push(<div className={`item item-${i}`} />)
    }
    return views;
  }
  console.log(`grid width ${width} height ${height} columnGap ${columnGap} rowGap ${rowGap} unit ${unit}`);
  return <Wrapper>
    <Tools>
    <h1 className="title">Swatch Grid Creator</h1>
    <div className="select-unit">
    <Select options={units} text="Select a base unit" value={unit} onChange={handleUnitChange} />
    </div>
    <div className="buttons">
        <Button id={KA3} text="A3" onClick={setDimensions}/>
        <Button id={KA4} text="A4" onClick={setDimensions}/>
        <Button id={KA5} text="A5" onClick={setDimensions}/>
      </div>
    <Slider id="width" text="select page width" recieveChange={setWidth} 
      step={0.1} min={0} max={convertUnit(RANGE[0], MM, unit)} value={width} />
    <Slider id="height" text="select page height" recieveChange={setHeight} 
      step={0.1} min={0} max={convertUnit(RANGE[1], MM, unit)} value={height} />
      <Slider id="columnGap" text="select column gap" recieveChange={setColumnGap} 
      step={0.1} min={0} max={convertUnit(GAP_RANGE[0], MM, unit)} value={columnGap} />
    <Slider id="rowGap" text="select row gap" recieveChange={setRowGap} 
      step={0.1} min={0} max={convertUnit(GAP_RANGE[1], MM, unit)} value={rowGap} />
    <Slider id="colCount" text="number of columns" recieveChange={setColumnCount} 
      step={1} min={1} max={10} value={columnCount} />
    <Slider id="rowCount" text="number of rows" recieveChange={setRowCount} 
      step={1} min={1} max={10} value={rowCount} />
    </Tools>
    <Grid width={width} height={height} columnGap={columnGap} rowGap={rowGap} unit={unit}
        rowCount={rowCount} columnCount={columnCount}>
          {renderGridItems(columnCount, rowCount)}
        {/* <div className="item item-a" />
        <div className="item item-b" />
        <div className="item item-c" />
        <div className="item item-d" /> */}
    </Grid>
  </Wrapper>
}

export default IndexPage;

const getGridFraction = (n) => {
  let r ='';
    for(let i = 0; i<n; i++){
      r += `1fr `;
    }
    console.log(`getGridFraction n ${n} r ${r}`);
    return r;
}
const colors = ['red', 'green', 'blue', 'purple', 'black', 'grey', 'yellow', 'pink', 'magenta', 'cyan', 'coral']
const getColor = (index) => {
  console.log(`getColor index ${index} colors ${colors.length} remainder ${(index)%colors.length} 
  color ${colors[(index)%colors.length]}`);
  return colors[(index)%colors.length];
}
const getGridItems = (columns, rows) => {
 let str = '', counter = 0;
 for(let r = 1; r<=rows; r++){
    for(let c = 1; c<=columns; c++){
      str += `
        .item-${counter}{
          grid-column-start: ${c};
          grid-column-end: ${c};
          grid-row-start: ${r};
          grid-row-end: ${r};
          border: 2px solid black;
        }
      `
      counter++;
    }
  }

 console.log(`getGridItems columns ${columns} rows ${rows} return ${str}`);
 return str;
}

const Wrapper = styled.div`
  position: fixed;
  top:0px;left:0px;right:0px;bottom:0px;
  background-color: grey;
  overflow: auto;

`
const Tools = styled.div`
  background-color: pink;
  width: 300px;
  position: absolute;
  padding: 10px;
  top:0px;
  left: 0px;
  text-align:center;
  .title{
    font-size: 1.5em;
  }
  .select-unit{
    padding-bottom:10px;
    border-bottom: 2px solid black;
  }
  .buttons{
    text-align: center;
  }
`

const Grid = styled.div`
  margin: auto;
  background-color: white;
  width: ${props => {
    return `${props.width}${props.unit};`
  }};
  height: ${props => {
    return `${props.height}${props.unit};`
  }};
 
  padding: ${props => {
    return `${props.rowGap}${props.unit} ${props.columnGap}${props.unit};`
  }};

  display: grid;
  column-gap: ${props => {
    return `${props.columnGap}${props.unit};`
  }};
  row-gap: ${props => {
    return `${props.rowGap}${props.unit};`
  }};
  justify-items: stretch;
  align-items: stretch;
  grid-template-columns: ${props => {
    return getGridFraction(props.columnCount);
  }};
  grid-template-rows: ${props => {
    return getGridFraction(props.rowCount);
  }};
  .item{
    border: 2px solid cyan;
  }
  ${props => getGridItems(props.columnCount, props.rowCount)}

`
/*
  grid-template-rows: ${props => {
    return getGridFraction(props.rowCount);
  }};
  .item-a{
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;
    background-color: pink;
  }
  .item-b{
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 1;
    background-color: purple;
  }
  .item-c{
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 2;
    grid-row-end: 2;
    background-color: red;
  }
  .item-d{
    grid-column-start: 3;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 2;
    background-color: cyan;
  }
*/