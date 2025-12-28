import React, { useState } from "react";

const ArticleCard = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);
  const themeColor = article.isUpdated ? "bg-blue-600" : "bg-emerald-500";

  return (
    <div
      className={`relative w-full rounded-2xl bg-white p-10
        border border-black/5
        shadow-xl shadow-black/10
        flex flex-col items-center text-center
        transition-transform duration-300
        ${isHovered ? "-translate-y-2" : "translate-y-0"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Accent bar */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2
        h-1.5 w-20 rounded-b-lg ${themeColor}`}
      />

      {/* Header */}
      <div className="w-full flex flex-col items-center gap-3 mb-5">
        <span
          className={`px-4 py-1 rounded-full text-[11px] font-extrabold
          uppercase tracking-widest
          ${
            article.isUpdated
              ? "bg-blue-50 text-blue-700"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {article.isUpdated ? "Recently Updated" : "Original Report"}
        </span>

        <h3 className="text-[26px] font-extrabold text-slate-800 leading-tight">
          {article.title}
        </h3>
      </div>

      {/* Content */}
      <p className="text-slate-600 text-[17px] leading-relaxed mb-8 w-full text-center">
        {article.content}
      </p>

      {/* Footer */}
      <div className="w-full flex flex-col items-center gap-4 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>

          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "No date"}
        </div>

        <a
          href={article.originalUrl}
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 hover:bg-blue-700
          text-white font-semibold text-[15px]
          px-6 py-2.5 rounded-xl
          shadow-md shadow-blue-600/30
          transition-colors duration-200"
        >
          Read Original Article
        </a>
      </div>

      {/* References */}
      {article.isUpdated && article.references?.length > 0 && (
        <div className="w-full mt-8 bg-slate-50 p-6 rounded-2xl">
          <h4 className="mb-4 flex justify-center items-center gap-2
            text-xs font-bold uppercase tracking-wide text-slate-500">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Supporting Sources
          </h4>

          <ul className="list-none space-y-2">
            {article.references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-500 break-all hover:underline opacity-80"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
