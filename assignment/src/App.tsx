import { useState, useRef } from 'react'
import { ItemList } from './components/ItemList'
import { ItemModel } from './types'
import { DEFAULT_ITEMS } from './constants'

function App() {
  const [items, setItems] = useState<ItemModel[]>(DEFAULT_ITEMS)
  const [fruits, setFruits] = useState<ItemModel[]>([])
  const [vegetables, setVegetables] = useState<ItemModel[]>([])

  const timeoutRefs = useRef<Record<string, number>>({})

  const moveItem = (item: ItemModel) => {
    if (item.type === 'Fruit') {
      setFruits([...fruits, item])
    } else {
      setVegetables([... vegetables, item])
    }
    setItems(items.filter(e => e.name !== item.name))

    timeoutRefs.current[item.name] = setTimeout(() => {
      moveItemBack(item)
      delete timeoutRefs.current[item.name]
    }, 3000)
  }

  const moveItemBack = (item: ItemModel) => {
    if (timeoutRefs.current[item.name]) {
      clearTimeout(timeoutRefs.current[item.name])
      delete timeoutRefs.current[item.name]
    }

    if (item.type === 'Fruit') {
      setFruits(fruits => fruits.filter(f => f.name !== item.name))
    } else {
      setVegetables(vegetables => vegetables.filter(v => v.name !== item.name))
    }
    setItems(items => [...items, item])
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
                onItemListClick={moveItem}
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
                  onItemListClick={moveItemBack}
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
                  onItemListClick={moveItemBack}
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
