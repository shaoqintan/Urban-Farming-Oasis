import Image from 'next/image'
import NavBar from '../components/navbar';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Settings() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;

  return (
    <>
      <div style={{ height: "calc(100vh - 70px)", backgroundColor: "#FAF4DF" }}
        className="">
        {status === "loading"
          ? <div style={{ height: "calc(100% - 70px)" }}
            className="flex flex-col justify-center items-center">Loading...</div>
          : <div style={{ height: "calc(100% - 70px)" }}
            className="flex flex-col justify-center items-center">
            {status === "authenticated"
              ?
              <div className="flex flex-col justify-center items-center">
                <Image src={userImage} alt={userName}
                  width={150} height={150} className="rounded-full mx-auto" />
                <div className="my-2">Logged in as: {userEmail}</div>
                <button onClick={() => signOut()}
                  className="text-white bg-slate-600 px-2 py-1 rounded-md">Sign out</button>
              </div>
              :
              <div className="flex flex-col justify-center items-center">
                <p>Not signed in.</p>
                <button onClick={() => signIn("github")}
                  className="text-white bg-slate-600 px-2 py-1 rounded-md">Sign in</button>
              </div>
            }
          </div>
        }
      </div>
      <NavBar />
    </>
  )
}
