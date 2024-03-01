// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function listMovies(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    let area = 3.1415926535897 * 3 * 3;
    res.status(200).json({ name: area })
  } else {
    res.send({
      error: "You must sign in to view movies.",
    })
  }
}