'use client';

import { useState } from 'react';
import { User, MessageCircle, Send } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  role: string;
  content: string;
  date: string;
}

export default function ArticleComments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Dr. Sarah Jenkins',
      role: 'Chief Medical Officer',
      content: 'This decoupling of spatial function from physical structure is exactly what we implemented in our recent expansion. The ability to shift acuity zones saved us during the winter surge.',
      date: '2 days ago'
    },
    {
      id: '2',
      name: 'Marcus Thorne',
      role: 'Lead Architect',
      content: 'Fascinating read. I would be curious to see more telemetry data on how these decentralized nodes handle localized power failures compared to traditional monolithic grids.',
      date: '5 days ago'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        name: userName,
        role: 'Guest Architect',
        content: newComment,
        date: 'Just now'
      };

      setComments([comment, ...comments]);
      setNewComment('');
      setUserName('');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section className="w-full mt-24 pt-16 border-t border-[#e1e3de]/10">
      
      <header className="flex items-center gap-3 mb-10">
        <MessageCircle className="w-5 h-5 text-emerald-400" />
        <h3 className="font-serif text-2xl text-[#e1e3de]">Comments</h3>
        <span className="ml-2 font-mono text-[10px] bg-[#e1e3de]/10 px-2 py-1 rounded-full text-[#e1e3de]/60">
          {comments.length}
        </span>
      </header>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-16 p-6 md:p-8 rounded-2xl bg-[#e1e3de]/[0.02] border border-[#e1e3de]/10 backdrop-blur-xl">
        <div className="flex flex-col gap-6">
          
          <div>
            <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-widest text-[#e1e3de]/50 mb-3">
              Name
            </label>
            <input 
              id="name"
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-transparent border-b border-[#e1e3de]/20 focus:border-emerald-400 py-3 text-[#e1e3de] placeholder:text-[#e1e3de]/30 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-[10px] font-mono uppercase tracking-widest text-[#e1e3de]/50 mb-3">
              Message
            </label>
            <textarea 
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              rows={3}
              className="w-full bg-[#111211] border border-[#e1e3de]/10 focus:border-emerald-400/50 rounded-xl p-4 text-[#e1e3de] placeholder:text-[#e1e3de]/30 outline-none transition-colors resize-none"
              required
            />
          </div>

          <div className="flex justify-end mt-2">
            <button 
              type="submit"
              disabled={isSubmitting || !newComment.trim() || !userName.trim()}
              className="group flex items-center gap-3 bg-[#e1e3de] text-[#0c0d0c] px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-[#e1e3de] transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
              <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </form>

      {/* Comments Feed */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <article key={comment.id} className="flex gap-4 md:gap-6">
            
            <div className="flex-shrink-0 mt-1">
               <div className="w-10 h-10 rounded-full bg-[#e1e3de]/10 flex items-center justify-center border border-[#e1e3de]/20">
                 <User className="w-5 h-5 text-[#e1e3de]/60" />
               </div>
            </div>

            <div className="flex-grow pb-8 border-b border-[#e1e3de]/10">
               <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-3">
                 <span className="font-medium text-[#e1e3de] text-lg">{comment.name}</span>
                 <span className="hidden md:block w-1 h-1 rounded-full bg-[#e1e3de]/30" />
                 <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">{comment.role}</span>
                 <span className="hidden md:block w-1 h-1 rounded-full bg-[#e1e3de]/30" />
                 <span className="font-sans text-sm text-[#e1e3de]/40">{comment.date}</span>
               </div>
               <p className="text-[#e1e3de]/80 leading-relaxed font-light">
                 {comment.content}
               </p>
            </div>

          </article>
        ))}
      </div>

    </section>
  );
}
