import Image from 'next/image'
import NavBar from '../components/navbar';
import { useSession, signIn, signOut } from "next-auth/react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faLocationDot, faSliders } from '@fortawesome/free-solid-svg-icons'

export default function Market() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;

  return (
    <>
      <div style={{ height: "calc(100vh - 70px)", backgroundColor: "#FAF4DF" }}
        className="overflow-y-auto">

        <div className="flex flex-row justify-between p-2 border-2 border-b-black">
          <div className="w-fit font-sans text-3xl font-bold">UFO Marketplace</div>
          {(status === "authenticated") &&
            <Image src={userImage} alt={userName} width={42} height={42} className="rounded-full" />}
        </div>
        <div className="flex flex-row items-center w-10/12 mx-auto my-2 border-2 rounded-full border-black">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="m-2" />
          <div className="text-zinc-500">pumpkin seeds</div>
        </div>

        <div className="h-10 flex flex-row justify-between items-center border-2 border-y-black">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon icon={faLocationDot} className="m-2" />
            <div className="text-lg">Bukit Mertajam, Penang</div>
          </div>
          <div>
            <FontAwesomeIcon icon={faSliders} className="m-2" />
          </div>
        </div>

        <div>
          {new Array(10).fill(1).map((x, i) => (
            <div key={i} className="flex flex-col items-center my-4">
              <Image src={`https://source.unsplash.com/random/300x200/?pumpkin,${i}`} alt="seeds"
                width={300} height={150} 
                className="rounded-t-xl w-10/12"
              />
              <div className="bg-white rounded-b-xl w-10/12 p-2">
                <div>{`RM20`}</div>
                <div>Bukit Mertajam, Penang</div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <NavBar />
    </>
  )
}
