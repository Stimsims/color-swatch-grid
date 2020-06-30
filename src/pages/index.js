import React, { useState, useEffect } from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Select from '../components/Select/index';
import Slider from '../components/Slider/index';
import Button from '../components/Button/v1/Button';
import IconButton from '../components/IconButton/index';
import CookieModal from './../components/CookieModal/CookieModal';
import './../components/styles.css';
import {theme} from './../components/theme';
import ToastTool from './../components/ToastTool/index';
import {sendEvent, sendPageView} from './../utilities/measure';
import { globalHistory } from "@reach/router";
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
const PADDING_RANGE = [0, 20];
const GAP_RANGE = [0, 10];

export function roundTo(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals) || Math.round(value);
}

const convertUnit = (n, u1, u2) => {

  let v;
  if(u1 === u2) v = n;
  if(u1 === MM){
    if(u2 === CM){
      v = n*0.1;
    }else if(u2 === INCH){
      v = n*0.0393701;
    }
  }else if(u1 === CM){
    if(u2 === MM){
      v = n*10;
    }else if(u2 === INCH){
      v = n*0.393701;
    }
  }else if(u1 === INCH){
    if(u2 === MM){
      v =  n*25.4;
    }else if(u2 === CM){
      v = n*2.54;
    }
  }
  return roundTo(v, 1);
}

const IndexPage = () => {
  const [unit, setUnit] = useState(units[0].key);
  const [width, setWidth] = useState(convertUnit(A4[0], MM, unit));
  const [height, setHeight] = useState(convertUnit(A4[1], MM, unit));
  const [columnGap, setColumnGap] = useState(3);
  const [rowGap, setRowGap] = useState(3);
  const [pagePadding, setPagePadding] = useState((PADDING_RANGE[1]-PADDING_RANGE[0])/2);
  const [columnCount, setColumnCount] = useState(3);
  const [rowCount, setRowCount] = useState(3);
  const [showTools, setShowTools] = useState(false);
  const [toast, setToast] = useState({id: null, text: null});
  useEffect(()=>{
    console.log(`pageview ${globalHistory.location.origin + globalHistory.location.pathname}`);
    sendPageView(globalHistory.location.origin + globalHistory.location.pathname);
  }, [])
  const setDimensions = (id) => {
    sendEvent('feature', 'setDimensions', id);
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
    sendEvent('feature', 'unit-change', nUnit);
    setWidth(convertUnit(width, unit, nUnit));
    setHeight(convertUnit(height, unit, nUnit));
    setColumnGap(convertUnit(columnGap, unit, nUnit));
    setRowGap(convertUnit(rowGap, unit, nUnit));
    setPagePadding(convertUnit(pagePadding, unit, nUnit));
    setUnit(nUnit);
  }
  const renderGridItems = (column, row) => {
    let total = column*row;
    let views = [];
    for(let i = 0; i<total; i++){
      views.push(<div key={i} id={i} className={`item item-${i}`} />)
    }
    return views;
  }
  const handlePrint = (id, v) => {
    if(window && window.print){
      sendEvent('feature', 'print', 'available');
      window.print();
      
    }else{
      sendEvent('feature', 'print', 'unavailable');
      setToast({id: `${Math.random()}`, text: 'The print feature was not found in this browser'});
    }
  }
  return <ThemeProvider theme={theme}>
    <Wrapper>

    <Grid width={width} height={height} columnGap={columnGap} rowGap={rowGap} unit={unit}
        rowCount={rowCount} columnCount={columnCount} pagePadding={pagePadding}>
          {renderGridItems(columnCount, rowCount)}
    </Grid>
    <Toggle className="slideDown delay-0">
      {/* <Button onClick={()=>{setShowTools(!showTools)}} text={showTools?'show tools':'hide tools'} /> */}
      <IconButton icon="icon-circle-right" fontSize="3" color="primary" 
        rotate={showTools?'180':''}
        onInput={()=>{
          sendEvent('feature', 'menu', showTools?'closed':'opened');
          setShowTools(!showTools);
        }}
      />
    </Toggle>
    <Print className="slideDown delay-1">
      <IconButton icon="icon-printer" fontSize="3" color="primary" onInput={handlePrint} />
    </Print>
    <Tools className={`${showTools?'showTools':'hideTools'}`}>
      <h1 className="title">Swatch Grid Creator</h1>
      <p>This tool will print a page out with the specified grid parameters. It is recommended to use either A3, A4 or A5 page dimensions.</p>
      <div className="select-unit">
      <Select options={units} text="Select a base unit" value={unit} onChange={handleUnitChange} />
      </div>
      <p>Set page size</p>
      <div className="buttons">
          <Button id={KA3} text="A3" onClick={setDimensions}/>
          <Button id={KA4} text="A4" onClick={setDimensions}/>
          <Button id={KA5} text="A5" onClick={setDimensions}/>
        </div>
      <Slider id="width" text="page width" recieveChange={setWidth} 
        step={0.1} min={0} max={convertUnit(RANGE[0], MM, unit)} value={width} />
      <Slider id="height" text="page height" recieveChange={setHeight} 
        step={0.1} min={0} max={convertUnit(RANGE[1], MM, unit)} value={height} />
      <Slider id="pagePadding" text="page padding" recieveChange={setPagePadding} 
        step={0.1} min={Math.floor(convertUnit(PADDING_RANGE[0], MM, unit))} 
          max={Math.ceil(convertUnit(PADDING_RANGE[1], MM, unit))} value={pagePadding} />

      <Slider id="colCount" text="number of columns" recieveChange={setColumnCount} 
        step={1} min={1} max={10} value={columnCount} />
      <Slider id="rowCount" text="number of rows" recieveChange={setRowCount} 
        step={1} min={1} max={10} value={rowCount} />
        <Slider id="columnGap" text="column gap" recieveChange={setColumnGap} 
        step={0.1} min={0} max={convertUnit(GAP_RANGE[1], MM, unit)} value={columnGap} />
      <Slider id="rowGap" text="row gap" recieveChange={setRowGap} 
        step={0.1} min={0} max={convertUnit(GAP_RANGE[1], MM, unit)} value={rowGap} />
    </Tools>
    <ToastTool {...toast} />
    <CookieModal />
  </Wrapper>
  </ThemeProvider>
}

export default IndexPage;


const getGridFraction = (n) => {
  let r ='';
    for(let i = 0; i<n; i++){
      r += `1fr `;
    }
    return r;
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

 return str;
}

const Toggle = styled.div`
  position: fixed;
  z-index:10;
  top:10px;
  left:10px;
  @media print {
    display: none;
  }
`
const Print = styled.div`
  position: fixed;
  z-index:10;
  top:10px;
  left:60px;
  @media print {
    display: none;
  }
`
const Wrapper = styled.div`
  position: fixed;
  top:0px;left:0px;right:0px;bottom:0px;
  background-color: ${props => props.theme.secondary};
  overflow-y: auto;
  overflow-x: auto;
  max-width:100%;
  max-height:100%;

  ::-webkit-scrollbar {
      height: 18px;
  }
  ::-webkit-scrollbar-track {
      background-color: ${props => props.theme.highlight};
      
  }
  ::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.neutral};
      border-radius: 10px;
  }
`
const Tools = styled.div`
  background-color: ${props => props.theme.highlight};
  color: ${props => props.theme.text};
  width: 280px;
  position: fixed;
  padding: 10px;
  padding-top: 50px;
  box-sizing: border-box;
  max-height: 100%;
  overflow: auto;
  top:0px;
  left: 0px;
  text-align:center;
  .title{
    font-size: 1.5em;
  }
  .select-unit{
    padding-bottom:10px;
    border-bottom: 2px solid ${props => props.theme.text};
  }
  .buttons{
    text-align: center;
  }
  transition: transform 0.5s ease;
  &.showTools{
    transform: translate(0%, 0%) scale(1);
  }
  &.hideTools{
    transform: translate(-100%, 0%) scale(1);
  }
  @media print {
    display: none;
  }
  ::-webkit-scrollbar {
      height: 8px;
  }
  ::-webkit-scrollbar-track {
      background-color: ${props => props.theme.highlight};
      
  }
  ::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.neutral};
      border-radius: 10px;
  }
`

const Grid = styled.div`
  margin: auto;
  background-color: white;
  transform-origin: 0% 0%;
  transform: scale(0.5);
  @media (min-width: 500px){
    transform: scale(1);
  }
  overflow: hidden;
  width: ${props => {
    return `${props.width}${props.unit};`
  }};
  height: ${props => {
    return `${props.height}${props.unit};`
  }};

  padding: ${props => {
    return `${props.pagePadding}${props.unit};`
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
  box-sizing: border-box;
  @media print {
    width: 100%;
    height:100%;
    position:absolute;
    top:0px;
    bottom:0px;
    margin: auto;
    margin-top: 0px !important;
    border: 1px solid;
 
    transform: scale(1);
  }
`
