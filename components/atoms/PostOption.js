 

const PostOption = ({Icon, className, onClick}) => {
  return <Icon onClick={onClick}  className={`text-gray-600 w-[32px] h-[32px] ${className} cursor-pointer active:scale-50 transition  duration-100 ease-in-out `} /> ;
};

export default PostOption;
