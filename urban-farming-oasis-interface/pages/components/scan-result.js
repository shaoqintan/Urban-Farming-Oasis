import Image from 'next/image'
import NavBar from '../../components/navbar';

export default function Result({ soil_type, soil_desc, crops, start_next_pred }) {
// Ambatukamehameha
  return (
    <>
      <div style={{ backgroundColor: "#FAF4DF" }}
        className="flex flex-col items-center justify-center py-8">
        <div className="my-2 w-10/12 text-3xl font-bold text-left">Identified Soil: {soil_type}</div>
        {/* <Image src={"https://source.unsplash.com/random/200x200/?"+soil_type} alt={soil_type}
          width={200} height={200}
          className="rounded-t-lg w-10/12"
        /> */}
        <span className="my-2 w-10/12">{soil_desc}</span>
        <div className="my-2 w-10/12 text-3xl font-bold text-left">Recommended Crops:</div>
        {
          (crops||[]).map((crop, i) => {
            return <div key={i}>
              <div className="bg-white rounded-b-lg w-10/12 text-center text-2xl font-bold p-2 mt-4">{crop["crop_name"]}</div>
              <Image src={"https://source.unsplash.com/random/200x200/?" + crop["crop_name"]} alt={crop["crop_name"]}
                width={200} height={200}
                className="rounded-t-lg w-10/12 mt-4"
              />
              <span className="my-2 w-10/12">{crop["reason"]}</span>
              <div className="w-10/12 text-left py-2 px-4">
                <div className="text-lg">Example crops:</div>
                <ul className="list-disc list-inside">
                  {
                    (crop["examples"]||[]).map((example, j) => {
                      return <li key={j}>{example}</li>
                    })
                  }
                </ul>
              </div></div>
          })
        }
        <button onClick={start_next_pred}
          className="text-white bg-slate-600 px-2 py-1 rounded-md my-2 mt-4 mb-6"
        >Get Another Recommendation</button>
      </div>
    </>
  )
}
