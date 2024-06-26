import { useState, useMemo, useRef } from 'react'
import { ItemList } from './components/ItemList'
import { ItemModel } from './types'
import { DEFAULT_ITEMS } from './constants'

function App() {
  const [items, setItems] = useState<ItemModel[]>(DEFAULT_ITEMS)
  const [newItems, setNewItems] = useState<ItemModel[]>([])
  const timeoutRefs = useRef<Record<string, number>>({})

  const fruits = useMemo(() => {
    return newItems.filter(item => item.type === 'Fruit')
  }, [newItems])
  const vegetables = useMemo(() => {
    return newItems.filter(item => item.type === 'Vegetable')
  }, [newItems])

  const returnValueToItem = (item: ItemModel) => {
    setItems(prevItems => [...prevItems, item])
    setNewItems(prevNewItems => prevNewItems.filter(e => e.name !== item.name))
  }

  const onMoveToNewItem = (item: ItemModel) => {
    setItems(items.filter(e => e.name !== item.name))
    setNewItems([...newItems, item])

    timeoutRefs.current[item.name] = setTimeout(() => {
      returnValueToItem(item)
      delete timeoutRefs.current[item.name]
    }, 5000)
  }

  const onMoveToItem = (item: ItemModel) => {
    if (timeoutRefs.current[item.name]) {
      clearTimeout(timeoutRefs.current[item.name])
      delete timeoutRefs.current[item.name]
    }
    returnValueToItem(item)
  }

  return (
    <>
      <main className="grid grid-cols-3 gap-6 p-6 h-screen">
        <div className="space-y-2 overflow-y-auto">
          {
            items.map(item => (
              <ItemList
                key={item.name}
                item={item}
                onItemListClick={onMoveToNewItem}
              />
            ))
          }
        </div>

        <div className="border">
          <h6
            className="bg-neutral-200 py-1.5 text-center mx-auto font-semibold"
          >
            Fruit
          </h6>
          <div className='p-2 flex flex-col gap-2'>
            {
              fruits.map(item => (
                <ItemList
                  key={item.name}
                  item={item}
                  onItemListClick={onMoveToItem}
                />
              ))
            }
          </div>
        </div>

        <div className="border-2">
          <h6
            className="bg-neutral-200 py-1.5 text-center mx-auto font-semibold"
          >
            Vegetable
          </h6>
          <div className='p-2 flex flex-col gap-2'>
            {
              vegetables.map(item => (
                <ItemList
                  key={item.name}
                  item={item}
                  onItemListClick={onMoveToItem}
                />
              ))
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default App
