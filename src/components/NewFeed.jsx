/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { deletePostService, loadAllPosts, loadSearchedPosts } from '../services/post-service'
import { Col, Input, Row } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
export const NewFeed = () => {
    const [titleSearch,setTitleSearch] = useState('')

     ///function to delete post

  function deletePost(post){
    //goiong to delete post
    deletePostService(post.postId).then(res =>{
      console.log(res)
      toast.success("post is deleted....")      
      
    let newPostContent= postContent.content.filter(p=>p.postId!=post.postId)
    setPostContent({...postContent,content:newPostContent})

    }).catch(error =>{
      console.log(error)
      toast.error("error while deleting post!!")
    })
}




    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNo: ''
    })

    const [curruntPage,setCurruntPage] = useState(0)

    useEffect(() => {

        //load all post from server
        changePage(curruntPage)
    }, [curruntPage])

    const changePage = (pageNo = 0, pageSize = 5) => {
        if (pageNo > postContent.pageNo && postContent.lastPage == true) return;
        if (pageNo < postContent.pageNo && postContent.pageNo == 0) return;
    
        loadAllPosts(pageNo, pageSize).then(data => {
            setPostContent({
                content:[...postContent.content,...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNo: data.pageNo
            })
           
            // window.scroll(0, 0)
        }).catch(error => {
            toast.error("Error in loading post....")
        })
    }

    

    const searchPost = (titleSearch, pageNo = 0, pageSize = 5) => {

        if (pageNo > postContent.pageNo && postContent.lastPage == true) return;
        if (pageNo < postContent.pageNo && postContent.pageNo == 0) return;
 
            pageNo = parseInt(pageNo, 10) || 0;
            pageSize = parseInt(pageSize, 10) || 5;
            
        loadSearchedPosts(titleSearch,pageNo, pageSize).then(data => {
            setPostContent({
                content:[...postContent.content,...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNo: data.pageNo
            })
            toast.success("succed in loading searched post after api....")
            // window.scroll(0, 0)
        }).catch(error => {
            toast.error("Error in loading searched post....")
        })
    }


        const changePageInfinite=()=>{
            console.log("paged nchanged");
           setCurruntPage(curruntPage+1)
        }

    return (
        <div>
            <div className="container-Fluid">
                <Row>
                    <Col md={{
                        size: 12
                    }
                    }>

                        <h1>Blog counts ({postContent?.totalElements}) </h1>

                        {/* <Input type='text' placeholder='search post by title' onChange={searchPost} value={titleSearch} /> */}
                        <Input
                            type='text'
                            placeholder='Search post by title'
                            value={titleSearch}
                            onChange={(e) => setTitleSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault(); // Prevent the default behavior (e.g., form submission)
                                    searchPost(titleSearch);
                                }
                            }}
                        />


                        <InfiniteScroll
                         dataLength={postContent.content.length}
                         next={changePageInfinite}
                         hasMore={!postContent.lastPage}
                        >


                            {
                                postContent?.content.map((post) => (
                                    <Post post={post} key={post.postId} deletePost={deletePost}/>
                                ))
                            }


                        </InfiniteScroll>

                    </Col>
                </Row>
            </div>
        </div>
    )
}







                     /* 
                     <Container className='text-center m-3'>
                         <Pagination size=''>
                             <PaginationItem disabled={postContent.pageNo == 0}
                                 onClick={() => changePage(postContent.pageNo-1)}
                             >
                                 <PaginationLink previous>
                                     Previous
                                 </PaginationLink>
                             </PaginationItem>
                             {
                                 [...Array(postContent.totalPages)].map((item, index) => (
                                     <PaginationItem onClick={() => changePage(index)}
                                         key={index} active={index == postContent.pageNo}>
                                         <PaginationLink >
                                             {index + 1}
                                         </PaginationLink>
                                     </PaginationItem>
                                 ))
                             }
                             <PaginationItem disabled={postContent.lastPage}
                                 onClick={() => changePage(1+postContent.pageNo)} >
                                 <PaginationLink last>
                                     Next
                                 </PaginationLink>
                             </PaginationItem>
                         </Pagination>
                     </Container> */
