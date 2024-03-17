import { Request, Response } from "express";

export async function checkSessionIdExists(request: Request, response:Response) {
    const sessionId = request.cookies.sessionId;
    if(!sessionId){
      return response.status(401).send({
        error:'Unathourized'
      })
    }
}