export function Appbar ({user}) {
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Paytm App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello {user}
            </div>
            <div className="rounded-full bg-slate-200 h-12 w-12 flex justify-center ml-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}