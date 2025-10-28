import { useEffect, useState } from "react";
import { getPosts, simulateError } from "../api/blogApi";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import Navbar from "../../../components/Navbar";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular error aleatorio (20% de probabilidad)
      simulateError();
      
      const response = await getPosts();
      setPosts(response.data.slice(0, 12)); // Mostrar solo 12 posts
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <Loader />
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ErrorMsg message={error} onRetry={fetchPosts} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header mejorado */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <span className="text-3xl">📚</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Nuestro Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Descubre artículos fascinantes, comparte conocimiento y únete a nuestra comunidad de lectores apasionados.
            </p>
          </div>
          
          {/* Grid de posts mejorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Footer estadísticas */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{posts.length}</div>
                <div className="text-sm text-gray-500">Artículos</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-gray-500">Autores</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-500">Lectores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;