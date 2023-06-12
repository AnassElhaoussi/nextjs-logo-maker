import type { NextApiRequest, NextApiResponse } from "next";

export function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req
    if(method !== 'POST') {
        res.status(405).send({message: "Method is not allowed"})
    }
    res.send("Eveything is fine")
}