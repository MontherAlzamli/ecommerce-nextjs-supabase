import type { NextApiRequest, NextApiResponse } from "next";
import app from "../../../server/app";

// The Express backend runs inside this Next.js API route.
// Express parses the body itself, so Next's body parser is turned off.
export const config = {
  api: { bodyParser: false, externalResolver: true },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return (app as any)(req, res);
}
