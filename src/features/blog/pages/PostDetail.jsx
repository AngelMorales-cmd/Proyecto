import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, getUsers } from "../api/blogApi";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import Navbar from "../../../components/Navbar";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPostData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [postResponse, usersResponse] = await Promise.all([
        getPostById(id),
        getUsers()
      ]);
      
      setPost(postResponse.data);
      
      // Encontrar el usuario del post
      const postUser = usersResponse.data.find(u => u.id === postResponse.data.userId);
      setUser(postUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Loader />
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ErrorMsg message={error} onRetry={fetchPostData} />
        </div>
      </div>
    );
  }

  if (!post) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Post no encontrado</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/blog/posts" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500 mb-6 text-sm font-medium"
          >
            ← Volver al Blog
          </Link>
          
          <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>
              
              {user && (
                <div className="flex items-center text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 font-bold text-lg">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">@{user.username} • {user.email}</p>
                  </div>
                </div>
              )}
            </header>
            
            <div className="prose max-w-none text-lg">
              <p className="text-gray-700 leading-relaxed mb-6">
                {post.body}
              </p>
            </div>
            
            <footer className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>📄 Post ID: {post.id}</span>
                <span>👤 Autor ID: {post.userId}</span>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;