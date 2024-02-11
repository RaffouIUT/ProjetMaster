type Props = {
    progress: number;
}

export default function Progressbar({progress}: Props) {

    return (
        <div className="w-full h-4 bg-black rounded-md overflow-hidden">
            <div className={"h-full bg-blue-500 transition-all"}
                style={{width: `${progress}%` }}
            />
        </div>
    )
}