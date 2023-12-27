import { BiLoaderAlt } from 'react-icons/bi';

export default function Loader() {
    return(
      <div className="w-full h-full fixed top-0 left-0 bg-indigo-400 text-white flex justify-center items-center font-black z-40 flex-col" >
        <div className="flex flex-col justify-center items-center animate-spin">
            <BiLoaderAlt color={'white'} size={100} />
        </div>
      </div>
    );
}