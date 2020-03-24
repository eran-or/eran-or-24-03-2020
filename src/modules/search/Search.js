
import React, { useState, useEffect, memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"
import { isEnglish } from "../../base/helpers/isEnglish"
import { Toast } from "react-bootstrap"
import Autowhatever from 'react-autowhatever'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import IsolatedScroll from 'react-isolated-scroll'
import theme from './search.module.css'
import {debounce} from 'lodash'

const Search = ({ onClick, items, defaultValue, onChange, onBlur}) => {
  const [value, setValue] = useState(defaultValue)
  const [error, setErrorMsg] = useState("")
  const [disabled, setDisable] = useState(true)
  const [highlightedItemIndex, setHighlitedItemIndex] = useState(null)
  const [highlightedSectionIndex, setHighlightedSectionIndex] = useState(null)
  
  function renderItemsContainer({ children, containerProps }) {
    const { ref, ...restContainerProps } = containerProps;
    const callRef = isolatedScroll => {
      if (isolatedScroll !== null) {
        ref(isolatedScroll.component);
      }
    };
  
    return (
      <IsolatedScroll ref={callRef} {...restContainerProps}>
        {children}
      </IsolatedScroll>
    );
  }

  function renderItem(item, { value }) {
    const text = `${item.name}, ${item.keyCode}`
    const matches = match(text, value.trim());
    const parts = parse(text, matches);
    return (
      <span>
        {
          parts.map((part, index) => {
            
            const className = part.highlight ? theme.highlight : null;
            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    );
  }

  function findItemElement(startNode) {
    let node = startNode;
  
    do {
      if (node.getAttribute('data-item-index') !== null) {
        return node;
      }
  
      node = node.parentNode;
    } while (node !== null);
  
    console.error('Clicked item:', startNode); // eslint-disable-line no-console
    throw new Error('Couldn\'t find the clicked item element');
  }

  const itemProps = ({ itemIndex }) => ({
    'data-item-index': itemIndex,
    onMouseEnter (event, { sectionIndex, itemIndex }) {
      setHighlightedSectionIndex(sectionIndex)
      setHighlitedItemIndex(itemIndex)
    },
    onMouseLeave(){
      setHighlightedSectionIndex(null)
      setHighlitedItemIndex(null)

    },
    onMouseDown: event => {
      const clickedItem = findItemElement(event.target);
      const clickedItemIndex = clickedItem.getAttribute('data-item-index');
      const value = `${items[clickedItemIndex].name}, ${items[clickedItemIndex].keyCode}` 
      debounced.cancel()
      setValue(value);
      if(!disabled) { onClick(value.trim()) }
      
    }
  });
  const handleChange = value => {
    if (!isEnglish(value)) {
      setErrorMsg("Only English Allowed")
      setDisable(true)
    }else{
      if(value.trim()){
        setDisable(false)
        onChange(value)
      }else{
        onBlur()
        setDisable(true)
      }
    }
  }

  const debounced = debounce(handleChange, 1000)

  const onFocus = _ => {
    setValue('')
  }
  

  const inputProps = {
    placeholder: 'City, ContryCode',
    onChange: e => {
      const value = e.target.value
      setValue(value)
      handleChange(value)
    },
    onFocus,
    onBlur,
    value
  }

  return (
      <div className={theme.searchWrapper}>
        <SearchIcon style={{position:'absolute', top:'13px',zIndex:'2', left:'4px', ...(disabled? {pointerEvents: "none", opacity: "0.4"} : { cursor: "pointer" })}} 
        width="24" height="24" fill={disabled? "#A9A9A9" : "#007bff"} onClick={() =>{
          if(!disabled) { onClick(value.trim()) }
          } } />
         <Autowhatever
            items={items}
            renderItemsContainer={renderItemsContainer}
            renderItem={renderItem}
            renderItemData={{ value }}
            inputProps={inputProps}
            highlightedSectionIndex={highlightedSectionIndex}
            highlightedItemIndex={highlightedItemIndex}
            itemProps={itemProps}
            theme={theme}
          />
      {!!error && <Toast style={{position:"absolute", width: "100%", top:'60px', zIndex:2}} onClose={() => setErrorMsg("")} show={!!error} delay={20000} autohide>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>}
    </div>
  );
}

export default memo(Search);