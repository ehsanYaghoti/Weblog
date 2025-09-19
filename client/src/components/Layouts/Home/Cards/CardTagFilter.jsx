import { Link } from "react-router-dom";



const CardTagFilter = ({tags , userTags , isAuthenticated}) => {

    return (
        <div className="flex flex-col items-center justify-between w-full min-h-96 h-fit mt-5 ml-4 p-4 rounded-md border border-solid border-gray-400 shadow-lg bg-white  dark:shadow-slate-500/50 dark:border-none dark:bg-gradient-to-br dark:from-10% dark:from-[rgb(36,45,57)] dark:via-50% dark:via-[rgb(16,37,60)] dark:to-100% dark:to-[rgb(0,0,0)] ">
            <div className="flex flex-col items-center gap-4 w-full ">
                <span className="h-fit text-center font-[600] text-xl ">
                    <Link to="/tags">Most favourite Tags</Link>
                </span>
                <div className="flex items-start flex-wrap h-fit ">
                    {tags.map((tag) => {
                        return (
                            <Link
                                title={`${tag.explain !== null ? tag.explain : ""}`}
                                to={`/tag/${tag.slug}`}
                                key={tag._id}
                                className="h-fit mx-2 my-2 px-4 py-2 rounded-md bg-gray-800 text-white dark:bg-teal-800 "
                            >
                                #{tag.name}
                            </Link>
                        );
                    })}
                </div>
                {isAuthenticated && (
                    <>
                        <span className="h-fit text-center font-[600] text-xl ">
                            <Link to="/tags">followed Tags</Link>
                        </span>
                        <div className="flex items-start flex-wrap h-fit ">
                            {userTags.map((tag) => {
                                return (
                                    <Link
                                        to={`/tag/${tag.slug}`}
                                        key={tag._id}
                                        className="h-fit mx-2 my-2 px-4 py-2 rounded-md bg-gray-800 text-white dark:bg-teal-800"
                                    >
                                        #{tag.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <div className="h-fit self-center justify-self-end flex text-center   ">
                <Link
                    to="/tags"
                    className="flex items-center gap-2 text-blue-500 hover:opacity-60 font-[600] text-xl"
                >
                    <span>All Tags</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default CardTagFilter;
