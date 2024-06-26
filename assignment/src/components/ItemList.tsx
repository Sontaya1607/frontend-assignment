import React from 'react'
import { ItemModel } from "../types"

type Props = {
  item: ItemModel
  onItemListClick?: (item: ItemModel) => void
}

export function ItemList({
  item,
  onItemListClick,
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    onItemListClick?.(item)
  }
  
  return (
    <a
      href="#"
      className="block mx-auto p-2 border-2 font-semibold text-center w-full"
      onClick={handleClick}
    >
      {item.name}
    </a>
  )
}