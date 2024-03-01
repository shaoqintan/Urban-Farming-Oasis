import Image from 'next/image'
import NavBar from '../components/navbar';

export default function Home() {

  return (
    <>
      <div style={{ height: "calc(100vh - 70px)", backgroundColor: "#FAF4DF"}}
        className="flex flex-col justify-center items-center">
          <Image src="/icon/ufo.png" alt="UFO Logo" width={300} height={300}/>
          <div className="font-sans text-lg font-bold">Urban Farming Oasis - creating greener cities.</div>
        </div>
      <NavBar />
    </>
  )
}
