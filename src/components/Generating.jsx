import { loading } from "../assets";

const Generating = ({className}) => {
    return (
        <div className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${className || ""} text-base`}>
            <img
                className="w-5 h-5 mr-4"
                src={loading}
                alt="loading" 
            />
            AI is Generating
        </div>
    )
}

export default Generating;

// the classname here is a default classname, If you need to alter in in parent component, you can do that, alter height or add other properties to it. 
