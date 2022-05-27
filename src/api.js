export const getComments = async () =>{
    return [
        {
            id:"1",
            body:"First Comment",
            username:"jack",
            userId:"1",
            parentId:null,
            createdAt: "2021-10-05T14:48:00.000Z"
        },
        {
            id:"2",
            body:"second Comment",
            username:"johm",
            userId:"2",
            parentId:null,
            createdAt: "2021-10-05T14:48:00.000Z"
        },
        {
            id:"3",
            body:"First Comment firt child",
            username:"jack",
            userId:"2",
            parentId:"1",
            createdAt: "2021-10-05T14:48:00.000Z"
        },
        {
            id:"4",
            body:"second Comment second child",
            username:"jack",
            userId:"2",
            parentId:"2",
            createdAt: "2021-10-05T14:48:00.000Z"
        }
    ]
};
export const createComment = async (text,parentId=null) =>{
    return {
        id:Math.random().toString(36).substring(2,9),
        body:text,
        parentId,
        userId:"1",
        username:'john',
        createdAt: new Date().toISOString()
    };
}

export const updateComment = (text)=> {
    return {
        text 
    }
}

export const deleteComment = () => {
    return {};
}