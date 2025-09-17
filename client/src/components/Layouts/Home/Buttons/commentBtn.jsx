import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function CommentBtn({link , commentCount}) {

    return (
        <Link to={link} className='flex items-center justify-center h-6 w-8 gap-1 py-1 px-1 rounded-md border border-solid border-gray-100 bg-gray-100  text-gray-500 hover:bg-gray-500  hover:text-white dark:bg-gray-700 dark:bg-opacity-50  dark:border-none dark:shadow-md dark:shadow-gray-500/50  dark:text-gray-300 cursor-pointer ' >
            <FontAwesomeIcon icon={faComment} />
            {commentCount}
        </Link >
    )
}

export default CommentBtn;
