import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CategorySideMenu() {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        loadAllCategories().then(data => {
            console.log(data);
            setCategories([...data])
        }).catch((error) => {
            console.log("Error");
            toast.error("error while loading categories..")
        })

    }, [])


    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to='/' action={true} className='border-0 text-center'>
                    <b>All Blogs</b>
                </ListGroupItem>

                {
                    categories && categories.map((cat, index) => {
                        return (
                            <ListGroupItem tag={Link} to={'/categories/'+cat.categoryId} className='border-0 shadow' key={index} action={true}>
                                {cat.categorytitle}
                            </ListGroupItem>
                        )
                    })
                }

            </ListGroup>
        </div>
    )
}

export default CategorySideMenu