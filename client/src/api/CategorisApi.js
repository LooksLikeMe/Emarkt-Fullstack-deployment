import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CategorisApi = () => {
    const [categories, setCategories] = useState([])


    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('/api/categories')
            console.log(res)
        }
        getCategories()
    })
  return (
    <div>CategorisApi</div>
  )
}

export default CategorisApi