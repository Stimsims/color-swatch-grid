import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = (props) => {
  //  const [value, setValue] = useState(props.value || props.options[0].key);
    const handleChange = (ev) => {
        console.log(`Select handleChange value ${ev.target.value}`,ev);
        //setValue(ev.target.value)
        props.onChange(ev.target.value);
    }
    return <label>
    {props.text && <p style={{margin: '0'}}>{props.text}</p>}
    <SelectView value={props.value} onChange={handleChange} >
        {props.options && props.options.map((o, i) => {
            return <option key={o.key} value={o.key}>{o.text}</option>
        })}
    </SelectView>
</label>
}

Select.propTypes = {
    text: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }))
}

export default Select;

const SelectView = styled.select`
    font-size: 1.2em;
    outline: 3px solid ${props => props.theme.primary};
`