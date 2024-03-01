import Image from 'next/image'
import NavBar from '../components/navbar';
import { useSession, signIn, signOut } from "next-auth/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faEye, faShareFromSquare, faComment, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export default function Community() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;

  return (
    <>
      <div style={{ height: "calc(100vh - 70px)", backgroundColor: "#FAF4DF" }}
        className="">
        <div className="flex flex-row justify-between p-2 border-2 border-b-black">
          <div className="w-fit font-sans text-3xl font-bold">UFO Community</div>
          {(status === "authenticated") &&
            <Image src={userImage} alt={userName} width={42} height={42} className="rounded-full" />}
        </div>

        {status === "loading"
          ? <div style={{ height: "calc(100% - 70px)" }}
            className="flex flex-col justify-center items-center">Loading...</div>
          : (
            status === "authenticated"
              ?
              <div style={{ height: "calc(100% - 70px)" }}
                className="overflow-y-auto">
                <div className="flex overflow-x-auto px-1">
                  {/* stories */}
                  <Image src={userImage} alt={userName}
                    width={100} height={100}
                    className="w-20 h-20 mx-1 my-2 rounded-full"
                  />
                  {new Array(10).fill(0).map((x, i) =>
                    <Image key={i} src={`https://source.unsplash.com/random/100x100/?flower,${i}`} alt="Mock Users"
                      width={100} height={100}
                      className="w-20 h-20 mx-1 my-2 rounded-full border-4 border-lime-700"
                    />
                  )}
                </div>
                <div className="w-10/12 mx-auto my-2 flex flex-row justify-between items-center p-2 border-2 rounded-full border-slate-500">
                  {/* create post */}
                  <div className="mx-2">What&rsquo;s on your mind?</div>
                  <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faImage} className="m-2" />
                    <div className="mx-2">⋮</div>
                  </div>
                </div>
                <div className="">
                  {/* posts */}
                  {new Array(10).fill(0).map((x, i) =>
                    <div key={i} className="w-10/12 mx-auto my-4 rounded border-2 border-slate-500">
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                          <Image src={`https://source.unsplash.com/random/80x80/?flower,${i}`}
                            alt="Mock Users"
                            width={80} height={80}
                            className="rounded-full w-10 h-10 m-2"
                          />
                          <div className="flex flex-col w-fit p-1">
                            <div className="text-lg">Rosy Rose</div>
                            <div className="text-sm">16 Feb 2023</div>
                          </div>
                        </div>
                        <div className="mx-2">⋮</div>
                      </div>
                      <div className="p-2">{
                        Math.random() > 0.5
                          ?
                          <div>Can I grow strawberries in Malaysia?</div>
                          :
                          <div>
                            <div>look at my fruits!! 😍</div>
                            <Image src={`https://source.unsplash.com/random/300x200/?fruit,${Math.floor(Math.random() * 10)}`}
                              alt="fruit"
                              width={300} height={200}
                              className="w-full rounded"
                            />
                          </div>
                      }</div>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row w-fit">
                          <FontAwesomeIcon icon={faEye} className="m-2" />
                          <div className="my-1">{Math.floor(Math.random() * 100)}</div>
                        </div>
                        <div className="flex flex-row mx-2">
                          <div className="flex flex-row w-fit">
                            <FontAwesomeIcon icon={faShareFromSquare} className="m-2" />
                            <div className="my-1">{Math.floor(Math.random() * 100)}</div>
                          </div>
                          <div className="flex flex-row w-fit">
                            <FontAwesomeIcon icon={faComment} className="m-2" />
                            <div className="my-1">{Math.floor(Math.random() * 100)}</div>
                          </div>
                          <div className="flex flex-row w-fit">
                            <FontAwesomeIcon icon={faThumbsUp} className="m-2" />
                            <div className="my-1">{Math.floor(Math.random() * 100)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              :
              <div style={{ height: "calc(100% - 70px)" }}
                className="flex flex-col justify-center items-center">
                <p>Sign in to view content.</p>
                <button onClick={() => signIn("github")}
                  className="text-white bg-slate-600 px-2 py-1 rounded-md">Sign in</button>
              </div>
          )
        }
      </div>
      <NavBar />
    </>
  )
}
