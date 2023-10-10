const PopularPosts = ({ post, categoryName }) => {
  return (
    <div>
      <div className="cursor-pointer transition-all duration-300 hover:scale-95">
        <div className="relative">
          <img
            className="w-full h-[200px] object-cover rounded-lg"
            src={`http://localhost:3000/assets/${post.postCover}`}
            alt="bgImage"
          />
          <div className="absolute bottom-4 left-4 text-white font-extrabold text-lg">
            <p className="bg-indigo-800 inline-block p-[6px] text-xs rounded-xl">
              {categoryName}
            </p>
            <p className="hover:text-indigo-600 lg:text-lg text-sm ml-2 mt-1">
              {post.header}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PopularPosts
