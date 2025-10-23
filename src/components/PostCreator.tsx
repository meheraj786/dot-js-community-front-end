import { useState } from "react";
import { MessageSquare, HelpCircle, Tag, Code, X, Send } from "lucide-react";

type PostType = "thought" | "question";

interface CodeBlock {
  id: string;
  code: string;
  language: string;
}

export default function PostCreator() {
  const [postType, setPostType] = useState<PostType>("thought");
  const [content, setContent] = useState<string>("");
  const [showTagInput, setShowTagInput] = useState<boolean>(false);
  const [tags, setTags] = useState<string>("");
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("javascript");

  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "cpp",
    "html",
    "css",
    "react",
    "node",
    "sql",
  ];

  const handleAddCodeBlock = () => {
    if (currentCode.trim()) {
      const newBlock: CodeBlock = {
        id: Date.now().toString(),
        code: currentCode,
        language: currentLanguage,
      };
      setCodeBlocks([...codeBlocks, newBlock]);
      setCurrentCode("");
      setShowCodeInput(false);
    }
  };

  const handleRemoveCodeBlock = (id: string) => {
    setCodeBlocks(codeBlocks.filter((block) => block.id !== id));
  };

  const handleSubmitPost = () => {
    if (!content.trim()) {
      alert("Please write something!");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const post = {
      type: postType,
      content,
      tags: tagArray,
      codeBlocks,
      timestamp: new Date().toISOString(),
    };

    console.log("Post submitted:", post);
    alert("Post created successfully! (This is a demo)");

    setContent("");
    setTags("");
    setCodeBlocks([]);
    setShowTagInput(false);
    setShowCodeInput(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-primary rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-black p-4 sm:p-6">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
            Create Post
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setPostType("thought")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
                postType === "thought"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <MessageSquare size={20} />
              <span className="text-sm sm:text-base">Thought</span>
            </button>
            <button
              onClick={() => setPostType("question")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
                postType === "question"
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <HelpCircle size={20} />
              <span className="text-sm sm:text-base">Ask</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {/* Main Content Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder:text-white/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none text-sm sm:text-base"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs sm:text-sm text-white">
                {content.length} characters
              </span>
              <span className="text-xs sm:text-sm text-white">
                {postType === "thought" ? "💭 Thought" : "❓ Question"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowTagInput(!showTagInput)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition text-sm sm:text-base ${
                showTagInput
                  ? "bg-yellow-400 border-yellow-400 text-white font-semibold"
                  : "border-gray-300 text-gray-700 hover:border-yellow-400 hover:text-yellow-600"
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
                  ? "bg-yellow-400 border-yellow-400 text-white font-semibold"
                  : "border-gray-300 text-gray-700 hover:border-yellow-400 hover:text-yellow-600"
              }`}
            >
              <Code size={18} />
              <span>Code Block</span>
              {codeBlocks.length > 0 && (
                <span className="text-xs">({codeBlocks.length})</span>
              )}
            </button>
          </div>

          {showTagInput && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="javascript, react, webdev"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-sm sm:text-base"
              />
              <p className="text-xs text-white mt-2">
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
                        className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        #{trimmedTag}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {showCodeInput && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Add Code Block
                </label>
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition font-mono text-sm bg-gray-900 text-green-400 resize-none"
              />
              <button
                onClick={handleAddCodeBlock}
                className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition text-sm sm:text-base"
              >
                Add Code Block
              </button>
            </div>
          )}

          {/* Display Added Code Blocks */}
          {codeBlocks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">
                Code Blocks ({codeBlocks.length})
              </h3>
              {codeBlocks.map((block) => (
                <div
                  key={block.id}
                  className="bg-gray-900 rounded-lg p-4 relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 text-xs font-semibold uppercase">
                      {block.language}
                    </span>
                    <button
                      onClick={() => handleRemoveCodeBlock(block.id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <pre className="text-green-400 text-xs sm:text-sm overflow-x-auto">
                    <code>{block.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setContent("");
                setTags("");
                setCodeBlocks([]);
                setShowTagInput(false);
                setShowCodeInput(false);
              }}
              className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPost}
              className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <Send size={18} />
              <span>
                Post {postType === "thought" ? "Thought" : "Question"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
