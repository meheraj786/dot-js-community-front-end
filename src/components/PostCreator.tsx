import { useEffect, useState } from "react";
import {
  MessageSquare,
  HelpCircle,
  Tag,
  Code,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import { useCreatePostMutation } from "../services/postApi";
import toast, { Toaster } from "react-hot-toast";

type PostType = "thought" | "question" | null;

export default function PostCreator() {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [postType, setPostType] = useState<PostType>(null);
  const [content, setContent] = useState<string>("");
  const [showTagInput, setShowTagInput] = useState<boolean>(false);
  const [tags, setTags] = useState<string>("");
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [codeBlock, setCodeBlock] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [showImageInput, setShowImageInput] = useState<boolean>(false);

  useEffect(() => {
    if (postType !== null) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  }, [postType]);

  const resetForm = () => {
    setContent("");
    setTags("");
    setCodeBlock("");
    setImage("");
    setShowTagInput(false);
    setShowCodeInput(false);
    setShowImageInput(false);
  };

  const handleSubmitPost = async () => {
    if (!content.trim()) {
      alert("Please write something!");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const postData = {
      type: postType,
      content: content.trim(),
      ...(codeBlock.trim() && { codeBlock: codeBlock.trim() }),
      tags: tagArray,
      ...(image.trim() && { image: image.trim() }),
    };

    try {
      await createPost(postData).unwrap();

      resetForm();
      toast.success("Post created successfully!");
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert(error?.data?.message || "Failed to create post. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Toaster position="top-right" />
      <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="bg-black p-4 sm:p-6 border-b border-gray-800">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
            Create Post
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setPostType(() => {
                  if (postType == "thought") {
                    return null;
                  } else {
                    return "thought";
                  }
                })
              }
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
                postType === "thought"
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <MessageSquare size={20} />
              <span className="text-sm sm:text-base">Thought</span>
            </button>
            <button
              onClick={() =>
                setPostType(() => {
                  if (postType == "question") {
                    return null;
                  } else {
                    return "question";
                  }
                })
              }
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
                postType === "question"
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <HelpCircle size={20} />
              <span className="text-sm sm:text-base">Ask</span>
            </button>
          </div>
        </div>
        {isShowing && (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Main Content Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {postType === "thought"
                  ? "Share your thoughts..."
                  : "What do you want to ask?"}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  postType === "thought"
                    ? "Share something interesting with the community..."
                    : "Ask your question here..."
                }
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg placeholder:text-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none text-sm sm:text-base"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs sm:text-sm text-gray-400">
                  {content.length} characters
                </span>
                <span className="text-xs sm:text-sm text-gray-400">
                  {postType === "thought" ? "💭 Thought" : "❓ Question"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowTagInput(!showTagInput)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition text-sm sm:text-base ${
                  showTagInput
                    ? "bg-yellow-400 border-yellow-400 text-black font-semibold"
                    : "border-gray-700 text-gray-300 hover:border-yellow-400 hover:text-yellow-400"
                }`}
              >
                <Tag size={18} />
                <span>Tags</span>
                {tags && (
                  <span className="text-xs">
                    ({tags.split(",").filter((t) => t.trim()).length})
                  </span>
                )}
              </button>

              <button
                onClick={() => setShowCodeInput(!showCodeInput)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition text-sm sm:text-base ${
                  showCodeInput
                    ? "bg-yellow-400 border-yellow-400 text-black font-semibold"
                    : "border-gray-700 text-gray-300 hover:border-yellow-400 hover:text-yellow-400"
                }`}
              >
                <Code size={18} />
                <span>Code</span>
                {codeBlock && <span className="text-xs">(✓)</span>}
              </button>

              <button
                onClick={() => setShowImageInput(!showImageInput)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition text-sm sm:text-base ${
                  showImageInput
                    ? "bg-yellow-400 border-yellow-400 text-black font-semibold"
                    : "border-gray-700 text-gray-300 hover:border-yellow-400 hover:text-yellow-400"
                }`}
              >
                <ImageIcon size={18} />
                <span>Image</span>
                {image && <span className="text-xs">(✓)</span>}
              </button>
            </div>

            {/* Tags Input */}
            {showTagInput && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Add Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="javascript, react, webdev"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-sm sm:text-base"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Separate tags with commas. Example: javascript, react, hooks
                </p>
                {tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.split(",").map((tag, index) => {
                      const trimmedTag = tag.trim();
                      if (!trimmedTag) return null;
                      return (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-400/30"
                        >
                          #{trimmedTag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Code Block Input */}
            {showCodeInput && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Add Code Block
                </label>
                <textarea
                  value={codeBlock}
                  onChange={(e) => setCodeBlock(e.target.value)}
                  placeholder="Paste your code here..."
                  rows={10}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-green-400 placeholder:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition font-mono text-sm resize-none custom-scrollbar"
                />
                {codeBlock && (
                  <button
                    onClick={() => setCodeBlock("")}
                    className="text-red-400 hover:text-red-300 text-sm transition"
                  >
                    Clear code
                  </button>
                )}
              </div>
            )}

            {/* Image Input */}
            {showImageInput && (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Image URL
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-sm sm:text-base"
                />
                <p className="text-xs text-gray-400">Enter a valid image URL</p>
                {image && (
                  <div className="mt-3">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x300?text=Invalid+Image";
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-800">
              <button
                onClick={resetForm}
                disabled={isLoading}
                className="flex-1 py-3 px-4 border-2 border-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPost}
                disabled={isLoading || !content.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>
                      Post {postType === "thought" ? "Thought" : "Question"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
