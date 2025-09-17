import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faheartSolid  } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';


function LikeBtn({likeCount , likedByThisUser  , isAuthenticated , _id , buttonLoading , likeHandler}) {
    return (
        <button id={`likeOf-${_id}`} disabled={isAuthenticated || !buttonLoading ? false : true} className={`flex items-center gap-1 h-6 w-8  p-1 rounded-md  border border-solid border-red-50 hover:bg-opacity-90  hover:text-red-400 dark:hover:text-white dark:border-none cursor-pointer
                ${isAuthenticated ?
                likedByThisUser ? 'bg-red-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-red-400/50' : 'bg-red-50 text-red-200 dark:bg-red-600 dark:bg-opacity-30 dark:text-red-400 '
                : ''
            } `} onClick={e => likeHandler(e, _id, likedByThisUser, 'podcast')} >
            <FontAwesomeIcon icon={
                isAuthenticated ?
                    likedByThisUser ? faheartSolid : faHeart
                    : faHeart
            } />
            {likeCount}
        </button>
    )
}

export default LikeBtn;
