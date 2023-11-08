import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "./io";

export default function(req: NextApiRequest, res: NextApiResponseServerIo) {
    res.status(200).json({ message: 'Hello from Next.js!' })
}