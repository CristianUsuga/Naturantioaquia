import { response, request } from 'express';


const loginPost = (req = request, res = response)=>{
    console.log(req.body)
}

export {loginPost}