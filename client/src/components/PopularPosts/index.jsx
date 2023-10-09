const PopularPosts = ({ post }) => {
  return (
    <div>
      <div className="cursor-pointer transition-all duration-300 hover:scale-95">
        <img
          className="w-full h-[200px] object-cover rounded-lg"
          src={`http://localhost:3000/assets/${post.postCover}`}
          alt="bgImage"
        />
      </div>
    </div>
  )
}
export default PopularPosts
