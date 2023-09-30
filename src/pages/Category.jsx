import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap';
import CategorySideMenu from '../components/CategorySideMenu';
import { deletePostService, loadPostCategoryWise } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Category() {

    const [posts, setPosts] = useState([])

    const { categoryId } = useParams();

    useEffect(() => {
        loadPostCategoryWise(categoryId).then(data => {
            setPosts([...data])
        }).catch(error => {
            console.log(error);
            toast.error("error while loading posts")
        })
    }, [categoryId])



    ///function to delete post

    function deletePost(post) {
        //goiong to delete post
        deletePostService(post.postId).then(res => {
            console.log(res)
            toast.success("post is deleted....")

            let newPostContent = post.filter(p => p.postId != post.postId)
            setPosts([...newPostContent])

        }).catch(error => {
            console.log(error)
            toast.error("error while deleting post!!")
        })
    }


    return (

        <Base>

            <Container className='mt-3'>
                <Row>
                    <Col md={2}>
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        {posts.length > 0 ? <h1>Blogs couont ({posts.length})</h1> : ''}


                        {
                            posts && posts.map((post, index) => (
                                <Post post={post} key={index} deletePost={deletePost} />
                            ))
                        }

                        {posts.length <= 0 ? <h3>No posts in this category</h3> : ''}

                    </Col>
                </Row>
            </Container>


        </Base>
    )
}

export default Category