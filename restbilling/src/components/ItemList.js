import React from 'react'
import {Button, Card } from 'antd';

const ItemList = ({item}) => {
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
    <Button>Add to Table</Button>
    </div>
  </Card>
    </div>
  )
}

export default ItemList
