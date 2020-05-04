import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  //  const [value, setValue] = useState(props.value || props.options[0].key);
    const handleChange = (ev) => {
        console.log(`Select handleChange value ${ev.target.value}`,ev);
        //setValue(ev.target.value)
        props.onChange(ev.target.value);
    }
    return <label>
    {props.text && <p style={{margin: '0'}}>{props.text}</p>}
    <select value={props.value} onChange={handleChange}>
        {props.options && props.options.map((o, i) => {
            return <option key={o.key} value={o.key}>{o.text}</option>
        })}
    </select>
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