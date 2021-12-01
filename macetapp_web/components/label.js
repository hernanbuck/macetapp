
export default function Label({ lblFor, className, children }) {
    return (<label htmlFor={lblFor} className={`mt-5 text-white xs:font-normal xs:w-4/5 xs:bg-opacity-90 ${className}`}>{children} </label>)
}