import { useEffect, useState } from 'react'
import { DepartmentModel, UserModel } from './types'

const API_URL = 'https://dummyjson.com/users'

function transformToGroupByDepartment(users: UserModel[]): Record<string, DepartmentModel> {
  const group: Record<string, DepartmentModel> = {}

  for (const user of users) {
    const {
      firstName,
      lastName,
      age,
      gender,
      hair,
      company,
      address,
    } = user
    const department = company.department ?? 'UNKNOWN'

    if (!group[department]) {
      group[department] = {
        male: 0,
        female: 0,
        ageRange: '0-0',
        hair: {},
        addressUser: {},
      }
    }

    // Update gender count
    if (gender === 'male') {
      group[department].male += 1;
    } else if (gender === 'female') {
      group[department].female += 1;
    }
    
    // Update age range
    const minAge = Math.min(Number.MAX_VALUE, age)
    const maxAge = Math.max(Number.MIN_VALUE, age)
    group[department].ageRange = `${minAge}-${maxAge}`;
    
    // Update hair color count
    if (!group[department].hair[ hair.color]) {
      group[department].hair[ hair.color] = 1
    } else {
      group[department].hair[ hair.color] += 1
    }
    
    // Update address user
    group[department].addressUser[`${firstName}${lastName}`] = address.postalCode
  }

  return group
}

function Test2() {
  const [group, setGroup] = useState<Record<string, DepartmentModel>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL)
        const { users } = await response.json()
        setGroup(transformToGroupByDepartment(users))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return <pre style={{ fontSize: '12px' }}>{JSON.stringify(group, null, 4)}</pre>
}

export default Test2