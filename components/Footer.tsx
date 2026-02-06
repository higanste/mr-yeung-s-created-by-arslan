import { motion } from "framer-motion";

export function Footer({ children }: { children?: React.ReactNode }) {
    return (
        <footer className="w-full py-6 bg-black/80 backdrop-blur-md border-t border-white/5 z-50">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                <div className="flex flex-col gap-1">
                    <p className="text-white hover:text-neon-cyan transition-colors cursor-default">Mr. Yeung: M10E-2</p>
                    <p>Created by <a href="https://www.instagram.com/real.higanste/" target="_blank" className="text-neon-cyan font-bold hover:underline">Arslan</a></p>
                </div>

                <div className="flex items-center gap-4">
                    {children}
                </div>

                <div className="flex items-center gap-8">
                    <FooterLink href="https://chatgpt.com/" label="ChatGPT" color="hover:text-green-500" />
                    <FooterLink href="https://www.instagram.com/real.higanste/" label="Instagram" color="hover:text-neon-pink" />
                    <FooterLink href="https://www.youtube.com/@higanste/shorts" label="YouTube" color="hover:text-red-500" />
                    <FooterLink href="https://vercel.com" label="Vercel" color="hover:text-white" />
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, label, color }: { href: string, label: string, color: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            whileHover={{ scale: 1.1, y: -2 }}
            className={`transition-colors ${color} font-bold`}
        >
            {label}
        </motion.a>
    )
}
