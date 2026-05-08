type ButtonProps = {
    buttonName: string,
    onButtonClick?: () => void,
}
export default function Button({ buttonName, onButtonClick }: ButtonProps) {
    return (
        <button className="rounded-full p-2 bg-gray-100 text-zinc-950 font-semibold cursor-pointer" onClick={onButtonClick}>{buttonName}</button>
    )
}