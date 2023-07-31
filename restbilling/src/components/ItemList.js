import React from 'react'
import {Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
const ItemList = ({item}) => {
  const dispatch=useDispatch()

  //update table handler
  const handleAddToTable=()=>{
      dispatch({
        type:'updateTable',
        payload:{ ...item,quantity:1},
      })
  }
  // Food item card
  const { Meta } = Card;
  return (
    <div>
       <Card
    style={{
      width: 240,
      marginBottom:20
    }}
    cover={<img alt={item.name} src={item.image} style={{height:200}} />}
    
  >
    <Meta title={item.name} />
    <div className="item-button">

      {/* item add button */}
    <Button onClick={()=>handleAddToTable()}>Add to Table</Button>
    </div>
  </Card>
    </div>
  )
}

export default ItemList
