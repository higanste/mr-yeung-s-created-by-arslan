export function Footer() {
    return (
        <footer className="w-full py-8 mt-12 border-t border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <div className="flex flex-col gap-1">
                    <p className="text-white font-medium">Mr. Yeung: M10E-2 • E Slot • DCI-25/26</p>
                    <p>Created with ❤️ by <span className="text-neon-cyan font-bold">Arslan</span></p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="https://x.com/higanste" target="_blank" className="hover:text-neon-cyan transition-colors">X (Twitter)</a>
                    <a href="https://www.instagram.com/real.higanste/" target="_blank" className="hover:text-neon-pink transition-colors">Instagram</a>
                    <a href="https://www.youtube.com/@higanste/shorts" target="_blank" className="hover:text-neon-red transition-colors">YouTube</a>
                </div>

                <div className="text-xs text-gray-600">
                    <p>Creative Producer: ChatGPT</p>
                    <p>Powered by Vercel</p>
                </div>
            </div>
        </footer>
    );
}
