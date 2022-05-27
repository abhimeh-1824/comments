import React from 'react'
import CommetnForm from './CommetnForm';

const SingleComments = ({comment,replies,
    currentUserId,deleteComment,
    setactiveComment,activeComment,
    addComment,updateComment,
    parentId=null}) => {
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date (comment.createdAt)>fiveMinutes
    const canReply = Boolean(currentUserId)
    const canEdit = currentUserId===comment.userId && !timePassed;
    const canDelete = currentUserId===comment.userId && !timePassed;
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment.id
    const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment.id

    const replyId = parentId ? parentId:comment.id;
    // console.log(replies,createdAt,"replies")
  return (
    <div className='singlecomment'>
        <div className="comment-image-container">
            <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-HD-Image.png" alt="" />
        </div>
        <div className="comment-right-part">
            <div className="comment-content">
                <div className="comment-author">
                    {comment.username}
                </div>
                <div>{createdAt}</div>
            </div>
            
            {!isEditing && <div className="comment-text">{comment.body}</div> }
            {isEditing && (
                <CommetnForm  
                submitLabel="Update"
                hasCancelButton
                initialText = {comment.body}
                handleSubmit = {(text) => updateComment(text,comment.id)}
                handleCancel = {()=>setactiveComment(null)}
                />
            )}
            
            <div className="comment-actions">
                {canReply && <div className="comment-action" onClick={()=>setactiveComment({id:comment.id,type:"replying"})}>Reply</div>}
                {canEdit && <div className="comment-action" onClick={()=>setactiveComment({id:comment.id,type:"editing"})}>Edit</div>}
                {canDelete && <div className="comment-action" onClick={()=>deleteComment(comment.id)}>Delete</div>}

            </div>
            {
                isReplying &&
                (
                    <CommetnForm submitLabel={"Reply"} handleSubmit={(text)=>addComment(text,replyId)}/>
                )
            }
            {
                replies.length>0 && (
                    <div className="replies">
                        {/* {console.log(replies,"replies")} */}
                        {
                            replies.map((reply)=>(
                            <SingleComments comment={reply} 
                            key={reply.id} 
                            currentUserId={currentUserId} 
                            deleteComment = {deleteComment}
                            activeComment = {activeComment}
                            setactiveComment = {setactiveComment}
                            addComment={addComment}
                            updateComment = {updateComment}
                            parentId = {comment.id}
                            replies={[]} 
                            />
                            ))
                        }
                    </div>
                )
            }
        </div>
      
    </div>
  )
}

export default SingleComments
