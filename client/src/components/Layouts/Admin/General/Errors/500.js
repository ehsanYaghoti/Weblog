const Error500 = (props) => {

    const message = props.message
    console.log(message)

    const reloadHandler = () => {
        window.location.reload()
    }

    return (
        <div dir="ltr" className="fixed bg-slate-100 text-slate-900  w-full h-full  flex items-center justify-center l z-50" >
            <div className="flex flex-col items-start gap-2 h-fit  p-2" >
                <div className="flex flex-col lg:flex-row  lg:items-center md:gap-4" dir="ltr" >
                    <span className=" font-medium w-fit text-xl md:text-3xl" >there is a problem with server contact to programmer</span>
                    <a href="/" className="text-xl text-blue-600 underline ">go to first page</a>
                    <div className=" flex items-center gap-2 " >
                        <span className="txet-xl font-semibold" >Or</span>
                        <button onClick={reloadHandler} className="text-lg font-semibold border-2 bg-slate-800 text-slate-50 border-slate-600 rounded-md px-2 py-1 " >Reload</button>
                    </div>
                </div>
                <span className="text-sm text-slate-600" >{message}</span>

            </div>

        </div>
    )
}


export default Error500;