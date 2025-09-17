
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid  } from '@fortawesome/free-solid-svg-icons';
import { faBookmark   } from '@fortawesome/free-regular-svg-icons';


function SaveBtn({ saveCount, isAuthenticated , _id , buttonLoading, savedByThisUser , saveHandler }) {

    return (
        <button disabled={isAuthenticated || !buttonLoading ? false : true} className={`flex items-center justify-center h-6 w-8 gap-1 py-1 px-1 rounded-md  border border-solid border-blue-50  hover:bg-opacity-90 hover:text-blue-400  dark:hover:text-white dark:border-none cursor-pointer
            ${isAuthenticated && savedByThisUser ?
                'bg-blue-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-blue-500/50' : 'bg-blue-50 text-blue-200 dark:bg-blue-700 dark:bg-opacity-40 dark:text-blue-400  '
            }`}
            onClick={e => saveHandler(e , _id , savedByThisUser, 'podcast')}
        >
            <FontAwesomeIcon icon={
                isAuthenticated ?
                    savedByThisUser ? faBookmarkSolid : faBookmark
                    : faBookmark
            } />
            {saveCount}
        </button>
    )
}

export default SaveBtn;
