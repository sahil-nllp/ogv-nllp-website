import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';
import { insightsData } from '../../lib/insights-data';
import ArticleVisualizer from './ArticleVisualizer'; 
import ArticleComments from './ArticleComments';

export function generateStaticParams() {
  return insightsData.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = insightsData.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-[#0c0d0c] text-[#e1e3de]">
      
      {/* Background Ambient Glow for the right side */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#fdf5cc]/[0.02] blur-[120px] pointer-events-none" />

      <ArticleVisualizer>
        <div className="relative flex flex-col lg:flex-row w-full">
          
          {/* Left Side: Sticky Media */}
          <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 relative flex-shrink-0 z-10 hidden lg:block border-r border-[#e1e3de]/10 overflow-hidden">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <div className="image-parallax-target absolute w-full h-[120%] -top-[10%] left-0">
               <Image 
                 src={article.coverImage} 
                 alt={article.title}
                 fill
                 className="object-cover"
                 priority
               />
            </div>
            {/* Top Bar for Back Link (Desktop) */}
            <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 bg-gradient-to-b from-[#0c0d0c]/80 to-transparent">
               <Link href="/insights" className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e1e3de]/80 hover:text-white transition-colors">
                  <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  Back to Blog
               </Link>
            </div>
          </div>

          {/* Mobile Cover Image (Only visible on tight screens) */}
          <div className="w-full h-[40vh] relative lg:hidden overflow-hidden block">
             <div className="absolute inset-0 bg-black/30 z-10" />
             <Image 
               src={article.coverImage} 
               alt={article.title}
               fill
               className="object-cover hidden lg:hidden"
               priority
             />
             <div className="absolute top-6 left-6 z-20">
               <Link href="/insights" className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#e1e3de]/80 hover:text-white">
                  <span>←</span> Back
               </Link>
             </div>
          </div>

          {/* Right Side: Scrolling Content */}
          <div className="w-full lg:w-1/2 relative z-10 flex flex-col pt-12 lg:pt-0 bg-[#0c0d0c]/50 backdrop-blur-3xl lg:backdrop-blur-none lg:bg-transparent">
            {/* Nav spacer for desktop since header is absolute */}
            <div className="hidden lg:block h-32 w-full flex-shrink-0" />
            
            <article className="px-6 md:px-12 lg:px-20 py-8 md:py-16 lg:py-0 w-full max-w-3xl mx-auto flex-grow">
               
               <header className="mb-16 ">
                  <div className="flex items-center gap-4 mb-8">
                     <span className="inline-block px-3 py-1 bg-emerald-400/10 text-emerald-400 font-mono text-[9px] uppercase tracking-widest">{article.category}</span>
                     <span className="font-mono text-[9px] text-[#e1e3de]/40 uppercase tracking-widest">{article.date}</span>
                     <span className="w-1 h-1 rounded-full bg-[#e1e3de]/20" />
                     <span className="font-mono text-[9px] text-[#e1e3de]/40 uppercase tracking-widest">{article.readTime}</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl md:text-5xl lg:text-showcase tracking-tighter leading-[1.05] mb-8 text-[#e1e3de] split-headline">
                    {article.title}
                  </h1>
                  
                  <p className="font-sans text-xl md:text-2xl text-[#e1e3de]/60 font-light leading-relaxed split-excerpt">
                    {article.excerpt}
                  </p>
               </header>

               <div className="article-content max-w-[65ch]">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
               </div>

                <div className="flex items-center justify-start gap-4 mt-24 mb-16 opacity-30">
                  <div className="w-1 h-1 rounded-full bg-[#e1e3de]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e1e3de]" />
                  <div className="w-1 h-1 rounded-full bg-[#e1e3de]" />
                </div>

             </article>
          </div>

        </div>
      </ArticleVisualizer>

      {/* Full Width Comments Section Below Split Screen */}
      <section className="relative z-20 w-full bg-[#0c0d0c] px-6 md:px-12 py-16 lg:py-24">
         <div className="max-w-4xl mx-auto">
            <ArticleComments />
         </div>
      </section>

      {/* Global Footer */}
      <div className="relative z-20 w-full bg-[#0c0d0c] border-t border-[#e1e3de]/10">
         <Footer />
      </div>

    </main>
  );
}
