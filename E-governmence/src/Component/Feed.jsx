import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecentReports from './MakeReports';

const categories = ['All', 'Mine', 'Resolved', 'In Progress', 'Rejected'];

const getStatusColor = (status) => {
  switch (status) {
    case 'Resolved':
      return 'bg-green-100 text-green-700';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'In Progress':
      return 'bg-blue-100 text-blue-700';
    case 'Rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentStates, setCommentStates] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3001/submit-report');
        setAllPosts(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filteredPosts =
    activeCategory === 'All'
      ? allPosts
      : activeCategory === 'Mine'
      ? []
      : allPosts.filter((post) => post.status === activeCategory);

  const toggleComments = (postId) => {
    setCommentStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        showComments: !prev[postId]?.showComments,
      },
    }));
  };

  const handleCommentChange = (postId, value) => {
    setCommentStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        newComment: value,
      },
    }));
  };

  const handlePostComment = (postId) => {
    console.log('Posting comment for', postId, commentStates[postId]?.newComment);
    setCommentStates((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        newComment: '',
      },
    }));
  };

  const handleVote = async (postId, type) => {
    const updatedPosts = allPosts.map((post) => {
      if (post.id === postId) {
        const newVotes = type === 'up' ? (post.upvotes || 0) + 1 : (post.upvotes || 0) - 1;
        return { ...post, upvotes: newVotes };
      }
      return post;
    });
    setAllPosts(updatedPosts);

    // Optional: update backend
    try {
      await axios.patch(`http://localhost:3001/submit-report/${postId}/vote`, {
        type,
      });
    } catch (err) {
      console.error('Vote failed', err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-4">Your Complaints & Posts</h1>

      {/* Category Filter */}
      <div className="flex gap-4 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-black text-white'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : activeCategory === 'Mine' ? (
        <RecentReports />
      ) : (
        <div className="flex flex-col gap-6">
          {filteredPosts.map((post) => {
            const showComments = commentStates[post.id]?.showComments || false;
            const newComment = commentStates[post.id]?.newComment || '';

            return (
              <div key={post.id} className="bg-white rounded-md shadow-sm border p-4 flex gap-4">
                {/* Votes column */}
                <div className="flex flex-col items-center w-10 text-gray-600">
                  <button onClick={() => handleVote(post.id, 'up')} className="hover:text-orange-500 text-lg">
                    ▲
                  </button>
                  <span className="font-semibold text-sm">{post.upvotes || 0}</span>
                  <button onClick={() => handleVote(post.id, 'down')} className="hover:text-blue-500 text-lg">
                    ▼
                  </button>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-sm text-black font-bold">{post.id} ~ {post.description}</span>
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>

                  {post.photo && (
                    <img
                      src={post.photo}
                      alt="post"
                      className="w-full max-h-64 object-cover rounded mb-2"
                    />
                  )}

                  <div className="text-sm text-gray-500 flex gap-4">
                    <button onClick={() => toggleComments(post.id)} className="hover:underline">
                      💬 {post.comments?.length || 0} Comments
                    </button>
                  </div>

                  {showComments && (
                    <div className="mt-3">
                      {/* Comment List */}
                      {post.comments && post.comments.length > 0 ? (
                        <div className="space-y-2 mb-2">
                          {post.comments.map((comment, index) => (
                            <div key={index} className="bg-gray-100 px-3 py-2 rounded text-sm">
                              {comment}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 mb-2">No comments yet.</p>
                      )}

                      {/* Add Comment */}
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          className="flex-1 border rounded px-3 py-1 text-sm"
                        />
                        <button
                          onClick={() => handlePostComment(post.id)}
                          className="bg-black text-white px-3 py-1 rounded text-sm"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredPosts.length === 0 && (
            <p className="text-gray-500 text-center mt-10">No posts in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
