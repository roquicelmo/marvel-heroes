import { BiMessageError } from "react-icons/bi";

export const Error = ({ tryAgain, message }) => {

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <BiMessageError className="text-gray-300" size={128} />
            <div className="text-xl font-bold text-gray-400">{message || 'Ops, ocorreu um erro ao buscar os dados.'}</div>
            {tryAgain && (
                <button className="cursor-pointer py-3 px-5 transition-colors bg-gray-400 hover:bg-gray-500 rounded-full text-white" onClick={tryAgain}>Tentar novamente</button>
            )}
        </div>
    )
}