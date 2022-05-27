import React, { useEffect, useState } from "react";
import { getComments as getCommentsApi, createComment as createCommentApi,deleteComment as deleteCommentApi} from "../api";
import CommetnForm from "./CommetnForm";
import SingleComments from "./SingleComments";

const MultipleComments = ({currentUserId}) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment,setactiveComment] = useState(null)

  const rootComments = backendComments.filter((backendComment)=>backendComment.parentId===null)
  const getReplies = (commendId) =>{
    //   console.log(commendId,"commendId")
      return backendComments.filter((backendComment)=>backendComment.parentId===commendId)
      .sort((a,b)=> new Date(a.createAt).getTime()-new Date(b.createAt).getTime());
  }


const addComment = (text,parentId) =>{
    // console.log("addcommen",text,parentId)
    createCommentApi(text,parentId).then(comment=>{
        setBackendComments([comment,...backendComments])
        setactiveComment(null)
        // console.log(comment,"comment")
    })
}
const deleteComment = (commentId) =>
{
    if(window.confirm("are you sure?"))
    {        const updateBackendComments = backendComments.filter((backendComment)=>backendComment.id !== commentId)
            setBackendComments(updateBackendComments)
        

    }
}

const updateComment = (text,commendId) =>{
    const updateBackendComment = backendComments.map(backendComment=>{
        if(backendComment.id === commendId)
        {
            return {...backendComment,body:text}
        }
        return backendComment
    })
    setBackendComments(updateBackendComment);
    setactiveComment(null)
}


  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);




  return (
    <div className="multipleComents">
        {/* <h3 className="multipleComents-title">Comments</h3> */}
        <div className="comment-form-title">write comment</div>
        <CommetnForm submitLabel = "Write" handleSubmit={addComment}/>
        <div className="multipleComents-container">
        {
            rootComments.map((rootcomment)=>(
                <SingleComments key={rootcomment.id} 
                comment={rootcomment} 
                replies={getReplies(rootcomment.id)}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                setactiveComment = {setactiveComment}
                activeComment = {activeComment}
                addComment = {addComment}
                updateComment = {updateComment}
                
                 />
            )
            )
        }
        </div>
    </div>
  );
};

export default MultipleComments;
