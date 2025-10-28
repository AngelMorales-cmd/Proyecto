import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <Link to={`/blog/posts/${post.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden group-hover:scale-[1.02] h-full flex flex-col">
        
        {/* Contenido - SIN imagen con gradiente */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Badge simple */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              📖 Artículo
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {post.body}
          </p>
          
          {/* Footer de la tarjeta */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <span className="text-xs text-gray-500 font-medium">
              ID: #{post.id}
            </span>
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 transition-colors">
              <span className="text-sm font-medium mr-2">Leer más</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;